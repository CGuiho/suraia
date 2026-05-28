/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { buildControlState, getDefaultControlState, buildControlInputs };
export type { ControlState };

import type { BlueprintRecord } from "../blueprints/types";

interface ControlState {
  variants: Record<string, string>;
  states: string[];
  attributes: Record<string, string | boolean | number>;
  colorScheme: "light" | "dark";
  width: string;
}

function getDefaultControlState(blueprint: BlueprintRecord): ControlState {
  const variants: Record<string, string> = {};
  for (const [key, def] of Object.entries(blueprint.variants)) {
    variants[key] = def.default || def.options[0] || "";
  }

  const attributes: Record<string, string | boolean | number> = {};
  for (const [key, def] of Object.entries(blueprint.attributes)) {
    attributes[key] = def.default ?? (def.type === "boolean" ? false : "");
  }

  return {
    variants,
    states: [],
    attributes,
    colorScheme: "light",
    width: "100%",
  };
}

interface ControlInput {
  key: string;
  type: "select" | "toggle" | "switch" | "input";
  label: string;
  options?: string[];
  value: string | boolean | number;
  attrType?: string;
}

function buildControlState(
  blueprint: BlueprintRecord,
  current: ControlState,
  key: string,
  value: string | boolean | number
): ControlState {
  const next = {
    ...current,
    variants: { ...current.variants },
    states: [...current.states],
    attributes: { ...current.attributes },
  };

  if (key in blueprint.variants) {
    next.variants[key] = String(value);
  } else if (blueprint.states.includes(key)) {
    if (value === true || value === "true") {
      if (!next.states.includes(key)) {
        next.states.push(key);
      }
    } else {
      next.states = next.states.filter((s) => s !== key);
    }
  } else if (key in blueprint.attributes) {
    next.attributes[key] = value;
  }

  return next;
}

function buildControlInputs(
  blueprint: BlueprintRecord,
  controls: ControlState
): ControlInput[] {
  const inputs: ControlInput[] = [];

  for (const [key, def] of Object.entries(blueprint.variants)) {
    inputs.push({
      key,
      type: "select",
      label: key,
      options: def.options,
      value: controls.variants[key] ?? def.default ?? def.options[0] ?? "",
    });
  }

  for (const state of blueprint.states) {
    inputs.push({
      key: state,
      type: "toggle",
      label: state,
      value: controls.states.includes(state),
    });
  }

  for (const [key, def] of Object.entries(blueprint.attributes)) {
    const val = controls.attributes[key];
    if (def.type === "boolean") {
      inputs.push({
        key,
        type: "switch",
        label: key,
        value: val === true || val === "true",
        attrType: def.type,
      });
    } else if (def.enum && def.enum.length > 0) {
      inputs.push({
        key,
        type: "select",
        label: key,
        options: def.enum,
        value: String(val ?? def.default ?? ""),
        attrType: def.type,
      });
    } else {
      inputs.push({
        key,
        type: "input",
        label: key,
        value: val ?? def.default ?? "",
        attrType: def.type,
      });
    }
  }

  return inputs;
}
