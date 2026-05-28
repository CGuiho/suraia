/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { createControlsPanel };

import type { BlueprintRecord } from "../blueprints/types";
import {
  buildControlInputs,
  buildControlState,
} from "../preview/apply-controls";

import type { ControlState } from "../preview/apply-controls";

export type { ControlState };

function createControlsPanel(
  blueprint: BlueprintRecord,
  current: ControlState,
  onChange: (state: ControlState) => void
): HTMLElement {
  const panel = document.createElement("div");
  panel.className = "wb-controls-panel";

  const heading = document.createElement("h3");
  heading.className = "wb-controls-heading";
  heading.textContent = "Controls";
  panel.appendChild(heading);

  const scroller = document.createElement("div");
  scroller.className = "wb-controls-scroller";
  panel.appendChild(scroller);

  const variantKeys = Object.keys(blueprint.variants);
  const hasStates = blueprint.states.length > 0;
  const hasAttrs = Object.keys(blueprint.attributes).length > 0;

  if (!variantKeys.length && !hasStates && !hasAttrs) {
    const empty = document.createElement("p");
    empty.className = "wb-controls-empty";
    empty.textContent = "No controls available for this component.";
    scroller.appendChild(empty);
  }

  const inputs = buildControlInputs(blueprint, current);

  for (const input of inputs) {
    const row = document.createElement("div");
    row.className = "wb-control-row";

    const label = document.createElement("label");
    label.className = "wb-control-label";
    label.textContent = input.label;
    row.appendChild(label);

    if (input.type === "select" && input.options) {
      const sel = document.createElement("select");
      sel.className = "wb-control-select";
      for (const opt of input.options) {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        if (String(input.value) === opt) option.selected = true;
        sel.appendChild(option);
      }
      sel.addEventListener("change", () => {
        const next = buildControlState(
          blueprint,
          current,
          input.key,
          sel.value
        );
        onChange(next);
      });
      row.appendChild(sel);
    } else if (input.type === "toggle" || input.type === "switch") {
      const sw = document.createElement("input");
      sw.type = "checkbox";
      sw.className = "wb-control-toggle";
      if (input.value === true || input.value === "true") sw.checked = true;
      sw.addEventListener("change", () => {
        const next = buildControlState(
          blueprint,
          current,
          input.key,
          sw.checked
        );
        onChange(next);
      });
      row.appendChild(sw);
    } else {
      const inp = document.createElement("input");
      inp.type = "text";
      inp.className = "wb-control-input";
      inp.value = String(input.value);
      inp.addEventListener("input", () => {
        const next = buildControlState(
          blueprint,
          current,
          input.key,
          inp.value
        );
        onChange(next);
      });
      row.appendChild(inp);
    }

    scroller.appendChild(row);
  }

  const divider = document.createElement("hr");
  divider.className = "wb-controls-divider";
  scroller.appendChild(divider);

  const themeRow = document.createElement("div");
  themeRow.className = "wb-control-row";

  const themeLabel = document.createElement("label");
  themeLabel.className = "wb-control-label";
  themeLabel.textContent = "Theme";
  themeRow.appendChild(themeLabel);

  const themeSel = document.createElement("select");
  themeSel.className = "wb-control-select";
  for (const opt of ["light", "dark"]) {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    if (current.colorScheme === opt) option.selected = true;
    themeSel.appendChild(option);
  }
  themeSel.addEventListener("change", () => {
    onChange({
      ...current,
      colorScheme: themeSel.value as "light" | "dark",
    });
  });
  themeRow.appendChild(themeSel);
  scroller.appendChild(themeRow);

  const widthRow = document.createElement("div");
  widthRow.className = "wb-control-row";

  const widthLabel = document.createElement("label");
  widthLabel.className = "wb-control-label";
  widthLabel.textContent = "Width";
  widthRow.appendChild(widthLabel);

  const widthSel = document.createElement("select");
  widthSel.className = "wb-control-select";
  for (const opt of [
    { label: "100%", value: "100%" },
    { label: "Desktop (1024px)", value: "1024px" },
    { label: "Tablet (768px)", value: "768px" },
    { label: "Mobile (375px)", value: "375px" },
  ]) {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    if (current.width === opt.value) option.selected = true;
    widthSel.appendChild(option);
  }
  widthSel.addEventListener("change", () => {
    onChange({ ...current, width: widthSel.value });
  });
  widthRow.appendChild(widthSel);
  scroller.appendChild(widthRow);

  return panel;
}
