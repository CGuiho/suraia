/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { MultiSelectController } from "./multi-select";

const testData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
];

describe("MultiSelectController", () => {
  test("initializes correctly", () => {
    const ctrl = new MultiSelectController({ data: testData });
    expect(ctrl.getValue()).toEqual([]);
    expect(ctrl.isOpened()).toBe(false);
  });

  test("toggles select values", () => {
    const fn = mock((_v: string[]) => {});
    const ctrl = new MultiSelectController({ data: testData, onChange: fn });
    ctrl.selectValue("react");
    expect(ctrl.getValue()).toEqual(["react"]);
    expect(fn).toHaveBeenCalledWith(["react"]);

    ctrl.selectValue("vue");
    expect(ctrl.getValue()).toEqual(["react", "vue"]);

    ctrl.selectValue("react");
    expect(ctrl.getValue()).toEqual(["vue"]);
  });

  test("does not select disabled options", () => {
    const ctrl = new MultiSelectController({ data: testData });
    ctrl.selectValue("svelte");
    expect(ctrl.getValue()).toEqual([]);
  });

  test("deselects values", () => {
    const ctrl = new MultiSelectController({ data: testData, value: ["react", "vue"] });
    ctrl.deselectValue("react");
    expect(ctrl.getValue()).toEqual(["vue"]);
  });

  test("keyboard backspace removes last item when search is empty", () => {
    const ctrl = new MultiSelectController({ data: testData, value: ["react", "vue"] });
    ctrl.handleKeyDown({ key: "Backspace" } as KeyboardEvent);
    expect(ctrl.getValue()).toEqual(["react"]);
  });
});
