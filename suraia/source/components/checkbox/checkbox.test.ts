/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { CheckboxController } from "./checkbox";

describe("CheckboxController", () => {
  test("defaults", () => {
    const ctrl = new CheckboxController();
    expect(ctrl.isChecked()).toBe(false);
    expect(ctrl.isIndeterminate()).toBe(false);
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.hasError()).toBe(false);
  });

  test("toggle changes checked state", () => {
    const fn = mock((_checked: boolean) => {});
    const ctrl = new CheckboxController({ onChange: fn });
    ctrl.toggle();
    expect(ctrl.isChecked()).toBe(true);
    expect(fn).toHaveBeenCalledWith(true);
    ctrl.toggle();
    expect(ctrl.isChecked()).toBe(false);
    expect(fn).toHaveBeenCalledWith(false);
  });

  test("toggle does nothing when disabled", () => {
    const fn = mock((_checked: boolean) => {});
    const ctrl = new CheckboxController({ disabled: true, onChange: fn });
    ctrl.toggle();
    expect(ctrl.isChecked()).toBe(false);
    expect(fn).not.toHaveBeenCalled();
  });

  test("toggle clears indeterminate", () => {
    const ctrl = new CheckboxController({ indeterminate: true });
    expect(ctrl.isIndeterminate()).toBe(true);
    ctrl.toggle();
    expect(ctrl.isIndeterminate()).toBe(false);
    expect(ctrl.isChecked()).toBe(true);
  });

  test("setChecked clears indeterminate", () => {
    const ctrl = new CheckboxController({ indeterminate: true });
    ctrl.setChecked(true);
    expect(ctrl.isChecked()).toBe(true);
    expect(ctrl.isIndeterminate()).toBe(false);
  });

  test("error state", () => {
    const ctrl = new CheckboxController({ error: "Required" });
    expect(ctrl.hasError()).toBe(true);
    expect(ctrl.getError()).toBe("Required");
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-error"]).toBe("");
  });
});
