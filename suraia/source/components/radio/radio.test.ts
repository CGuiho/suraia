/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { RadioController } from "./radio";

describe("RadioController", () => {
  test("defaults", () => {
    const ctrl = new RadioController();
    expect(ctrl.getValue()).toBe("");
    expect(ctrl.isChecked()).toBe(false);
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.hasError()).toBe(false);
  });

  test("select sets checked and fires onChange", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new RadioController({ value: "opt1", onChange: fn });
    ctrl.select();
    expect(ctrl.isChecked()).toBe(true);
    expect(fn).toHaveBeenCalledWith("opt1");
  });

  test("select does nothing when disabled", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new RadioController({ disabled: true, onChange: fn });
    ctrl.select();
    expect(ctrl.isChecked()).toBe(false);
    expect(fn).not.toHaveBeenCalled();
  });

  test("deselect clears checked", () => {
    const ctrl = new RadioController({ checked: true });
    ctrl.deselect();
    expect(ctrl.isChecked()).toBe(false);
  });

  test("error state", () => {
    const ctrl = new RadioController({ error: "Pick one" });
    expect(ctrl.hasError()).toBe(true);
    expect(ctrl.getError()).toBe("Pick one");
  });
});
