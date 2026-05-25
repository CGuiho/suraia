/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { TextInputController } from "./text-input";

describe("TextInputController", () => {
  test("defaults", () => {
    const ctrl = new TextInputController();
    expect(ctrl.getValue()).toBe("");
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.isRequired()).toBe(false);
    expect(ctrl.hasError()).toBe(false);
  });

  test("setValue calls onChange", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new TextInputController({ onChange: fn });
    ctrl.setValue("hello");
    expect(ctrl.getValue()).toBe("hello");
    expect(fn).toHaveBeenCalledWith("hello");
  });

  test("setValue does nothing when disabled", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new TextInputController({ disabled: true, onChange: fn });
    ctrl.setValue("test");
    expect(ctrl.getValue()).toBe("");
    expect(fn).not.toHaveBeenCalled();
  });

  test("validate required", () => {
    const ctrl = new TextInputController({ required: true });
    expect(ctrl.validate()).toBe(false);
    ctrl.setValue("x");
    expect(ctrl.validate()).toBe(true);
  });

  test("validate not required", () => {
    const ctrl = new TextInputController();
    expect(ctrl.validate()).toBe(true);
  });

  test("error state", () => {
    const ctrl = new TextInputController({ error: "Required" });
    expect(ctrl.hasError()).toBe(true);
    expect(ctrl.getError()).toBe("Required");
  });
});
