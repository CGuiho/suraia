/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { NativeSelectController } from "./native-select";

describe("NativeSelectController", () => {
  test("defaults", () => {
    const ctrl = new NativeSelectController({
      options: ["A", "B"],
    });
    expect(ctrl.getValue()).toBe("A");
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.hasError()).toBe(false);
    expect(ctrl.isRequired()).toBe(false);

    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-disabled']).toBeUndefined();
    expect(attrs['data-suraia-error']).toBeUndefined();
  });

  test("value assignment and events", () => {
    const onChange = mock(() => {});
    const ctrl = new NativeSelectController({
      options: [
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
      ],
      onChange,
    });
    
    ctrl.setValue("b");
    expect(ctrl.getValue()).toBe("b");
    expect(onChange).toHaveBeenCalled();
  });

  test("errors and required states", () => {
    const ctrl = new NativeSelectController({
      options: ["A"],
      error: "Invalid option selection",
      required: true,
    });
    expect(ctrl.hasError()).toBe(true);
    expect(ctrl.isRequired()).toBe(true);

    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-error']).toBe("true");
    expect(attrs['data-suraia-required']).toBe("true");
  });
});
