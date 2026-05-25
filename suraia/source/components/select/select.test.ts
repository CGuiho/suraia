/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { SelectController } from "./select";

const testData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte", disabled: true },
];

describe("SelectController", () => {
  test("defaults", () => {
    const ctrl = new SelectController({ data: testData });
    expect(ctrl.getValue()).toBeNull();
    expect(ctrl.isOpened()).toBe(false);
    expect(ctrl.getSelectedLabel()).toBe("");
  });

  test("select sets value and closes", () => {
    const fn = mock((_v: string | null) => {});
    const ctrl = new SelectController({ data: testData, onChange: fn });
    ctrl.open();
    ctrl.select("vue");
    expect(ctrl.getValue()).toBe("vue");
    expect(ctrl.getSelectedLabel()).toBe("Vue");
    expect(ctrl.isOpened()).toBe(false);
    expect(fn).toHaveBeenCalledWith("vue");
  });

  test("select ignores disabled options", () => {
    const ctrl = new SelectController({ data: testData });
    ctrl.select("svelte");
    expect(ctrl.getValue()).toBeNull();
  });

  test("clear resets value", () => {
    const fn = mock((_v: string | null) => {});
    const ctrl = new SelectController({ data: testData, value: "react", clearable: true, onChange: fn });
    ctrl.clear();
    expect(ctrl.getValue()).toBeNull();
    expect(fn).toHaveBeenCalledWith(null);
  });

  test("search filters options", () => {
    const ctrl = new SelectController({ data: testData, searchable: true });
    ctrl.setSearchQuery("re");
    const filtered = ctrl.getFilteredOptions();
    expect(filtered.length).toBe(1);
    expect(filtered[0]!.value).toBe("react");
  });

  test("keyboard ArrowDown opens then navigates", () => {
    const ctrl = new SelectController({ data: testData });
    const event = { key: "ArrowDown", preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    ctrl.handleKeyDown(event);
    expect(ctrl.isOpened()).toBe(true);
    ctrl.handleKeyDown(event);
    expect(ctrl.getHoveredIndex()).toBe(0);
  });

  test("keyboard Escape closes", () => {
    const ctrl = new SelectController({ data: testData });
    ctrl.open();
    ctrl.handleKeyDown({ key: "Escape" } as KeyboardEvent);
    expect(ctrl.isOpened()).toBe(false);
  });

  test("keyboard Enter selects hovered", () => {
    const fn = mock((_v: string | null) => {});
    const ctrl = new SelectController({ data: testData, onChange: fn });
    ctrl.open();
    ctrl.hoverNext();
    const event = { key: "Enter", preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    ctrl.handleKeyDown(event);
    expect(ctrl.getValue()).toBe("react");
  });
});
