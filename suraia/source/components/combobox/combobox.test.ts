/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { ComboboxController, type ComboboxOption } from "./combobox";

const testData: ComboboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
];

describe("ComboboxController", () => {
  test("initializes correctly", () => {
    const ctrl = new ComboboxController({ data: testData });
    expect(ctrl.getValue()).toBeNull();
    expect(ctrl.getInputValue()).toBe("");
    expect(ctrl.isOpened()).toBe(false);
  });

  test("selects option", () => {
    const fn = mock((_v: string | null) => {});
    const ctrl = new ComboboxController({ data: testData, onChange: fn });
    ctrl.open();
    ctrl.selectOption(testData[1]!);
    expect(ctrl.getValue()).toBe("vue");
    expect(ctrl.getInputValue()).toBe("Vue");
    expect(ctrl.isOpened()).toBe(false);
    expect(fn).toHaveBeenCalledWith("vue");
  });

  test("does not select disabled options", () => {
    const ctrl = new ComboboxController({ data: testData });
    ctrl.selectOption(testData[2]!);
    expect(ctrl.getValue()).toBeNull();
  });

  test("filters options when input changes", () => {
    const ctrl = new ComboboxController({ data: testData });
    ctrl.setInputValue("re");
    const filtered = ctrl.getFilteredOptions();
    expect(filtered.length).toBe(1);
    expect(filtered[0]!.value).toBe("react");
  });

  test("allows custom value if configured", () => {
    const ctrl = new ComboboxController({ data: testData, allowCustomValue: true });
    ctrl.setInputValue("angular");
    expect(ctrl.getValue()).toBe("angular");
  });
});

