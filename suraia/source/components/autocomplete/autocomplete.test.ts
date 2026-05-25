/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { AutocompleteController } from "./autocomplete";

const testData = ["React", "Vue", "Angular", "Svelte"];

describe("AutocompleteController", () => {
  test("initializes correctly", () => {
    const ctrl = new AutocompleteController({ data: testData });
    expect(ctrl.getValue()).toBe("");
    expect(ctrl.isOpened()).toBe(false);
  });

  test("filters suggestions and opens on typing", () => {
    const ctrl = new AutocompleteController({ data: testData });
    ctrl.setValue("t");
    expect(ctrl.getValue()).toBe("t");
    expect(ctrl.isOpened()).toBe(true);
    const filtered = ctrl.getFilteredOptions();
    expect(filtered.length).toBe(2); // React, Svelte
  });

  test("closes dropdown on select", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new AutocompleteController({ data: testData, onChange: fn });
    ctrl.setValue("re");
    const filtered = ctrl.getFilteredOptions();
    ctrl.selectSuggestion(filtered[0]!);
    expect(ctrl.getValue()).toBe("React");
    expect(ctrl.isOpened()).toBe(false);
    expect(fn).toHaveBeenCalledWith("React");
  });
});
