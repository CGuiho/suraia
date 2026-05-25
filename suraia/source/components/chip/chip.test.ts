/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { ChipController } from "./chip";

describe("ChipController", () => {
  test("defaults", () => {
    const ctrl = new ChipController();
    expect(ctrl.isChecked()).toBe(false);
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.getType()).toBe("checkbox");
    expect(ctrl.getVariant()).toBe("outline");
    expect(ctrl.getSize()).toBe("sm");
  });

  test("checked and toggling events", () => {
    const onChange = mock(() => {});
    const ctrl = new ChipController({
      checked: true,
      onChange,
    });
    expect(ctrl.isChecked()).toBe(true);

    ctrl.toggle();
    expect(ctrl.isChecked()).toBe(false);
    expect(onChange).toHaveBeenCalled();
  });

  test("disabled prevents state toggle", () => {
    const ctrl = new ChipController({ disabled: true });
    ctrl.setChecked(true);
    expect(ctrl.isChecked()).toBe(false);
  });

  test("data attributes rendering details", () => {
    const ctrl = new ChipController({
      size: "lg",
      variant: "filled",
      type: "radio",
    });
    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-size']).toBe("lg");
    expect(attrs['data-suraia-variant']).toBe("filled");
    expect(attrs['data-suraia-type']).toBe("radio");
  });
});
