/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { SwitchController } from "./switch";

describe("SwitchController", () => {
  test("defaults", () => {
    const ctrl = new SwitchController();
    expect(ctrl.isChecked()).toBe(false);
    expect(ctrl.isDisabled()).toBe(false);
  });

  test("toggle", () => {
    const fn = mock((_c: boolean) => {});
    const ctrl = new SwitchController({ onChange: fn });
    ctrl.toggle();
    expect(ctrl.isChecked()).toBe(true);
    expect(fn).toHaveBeenCalledWith(true);
  });

  test("toggle disabled", () => {
    const fn = mock((_c: boolean) => {});
    const ctrl = new SwitchController({ disabled: true, onChange: fn });
    ctrl.toggle();
    expect(ctrl.isChecked()).toBe(false);
    expect(fn).not.toHaveBeenCalled();
  });

  test("setChecked", () => {
    const ctrl = new SwitchController();
    ctrl.setChecked(true);
    expect(ctrl.isChecked()).toBe(true);
  });
});
