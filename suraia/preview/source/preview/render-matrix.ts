/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { renderMatrix };

import type { BlueprintRecord } from "../blueprints/types";
import { renderPreviewHtml, getBaseStyles } from "./render-preview";

interface MatrixCell {
  label: string;
  html: string;
}

const MAX_MATRIX_CELLS = 24;

function renderMatrix(blueprint: BlueprintRecord): MatrixCell[] {
  const cells: MatrixCell[] = [];

  const variantKeys = Object.keys(blueprint.variants);
  const variantCombinations = generateCombinations(blueprint, variantKeys);

  const capped =
    variantCombinations.length > MAX_MATRIX_CELLS
      ? variantCombinations.slice(0, MAX_MATRIX_CELLS)
      : variantCombinations;

  for (const combo of capped) {
    const label = combo
      .map((c) => c.value)
      .filter(Boolean)
      .join(" / ");
    cells.push({
      label: label || "default",
      html: renderPreviewHtml(blueprint, {
        variants: comboToRecord(combo),
        states: [],
        attributes: getDefaultAttributes(blueprint),
        colorScheme: "light",
        width: "100%",
      }),
    });
  }

  for (const state of blueprint.states) {
    const defaultVariants: Record<string, string> = {};
    for (const [key, def] of Object.entries(blueprint.variants)) {
      defaultVariants[key] = def.default || def.options[0] || "";
    }
    cells.push({
      label: `state: ${state}`,
      html: renderPreviewHtml(blueprint, {
        variants: defaultVariants,
        states: [state],
        attributes: getDefaultAttributes(blueprint),
        colorScheme: "light",
        width: "100%",
      }),
    });
  }

  const defaultVariants: Record<string, string> = {};
  for (const [key, def] of Object.entries(blueprint.variants)) {
    defaultVariants[key] = def.default || def.options[0] || "";
  }

  cells.push({
    label: "dark theme",
    html: renderPreviewHtml(blueprint, {
      variants: defaultVariants,
      states: [],
      attributes: getDefaultAttributes(blueprint),
      colorScheme: "dark",
      width: "100%",
    }),
  });

  if (variantCombinations.length > MAX_MATRIX_CELLS) {
    cells.push({
      label: "",
      html: "",
    });
  }

  return cells;
}

interface VariantChoice {
  key: string;
  value: string;
}

function generateCombinations(
  blueprint: BlueprintRecord,
  keys: string[]
): VariantChoice[][] {
  if (keys.length === 0) return [[]];

  const [first, ...rest] = keys;
  if (!first) return [[]];

  const variant = blueprint.variants[first];
  if (!variant || !variant.options || variant.options.length === 0) {
    return generateCombinations(blueprint, rest);
  }

  const subCombos = generateCombinations(blueprint, rest);
  const result: VariantChoice[][] = [];

  for (const option of variant.options) {
    for (const sub of subCombos) {
      result.push([{ key: first, value: option }, ...sub]);
    }
  }

  return result;
}

function comboToRecord(
  combo: VariantChoice[]
): Record<string, string> {
  const rec: Record<string, string> = {};
  for (const c of combo) {
    rec[c.key] = c.value;
  }
  return rec;
}

function getDefaultAttributes(
  blueprint: BlueprintRecord
): Record<string, string | boolean | number> {
  const attrs: Record<string, string | boolean | number> = {};
  for (const [key, def] of Object.entries(blueprint.attributes)) {
    attrs[key] = def.default ?? (def.type === "boolean" ? false : "");
  }
  return attrs;
}

function _matrixTruncatedNotice(blueprint: BlueprintRecord): string {
  return `Matrix truncated: ${blueprint.name} has too many combinations. Showing first ${MAX_MATRIX_CELLS}.`;
}

export { getBaseStyles, _matrixTruncatedNotice };
