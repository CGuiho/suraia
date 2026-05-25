/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { PasswordInputController } from "./password-input";

describe("PasswordInputController", () => {
  test("defaults hidden", () => {
    const ctrl = new PasswordInputController();
    expect(ctrl.isVisible()).toBe(false);
    expect(ctrl.getInputType()).toBe("password");
  });

  test("toggleVisibility", () => {
    const ctrl = new PasswordInputController();
    ctrl.toggleVisibility();
    expect(ctrl.isVisible()).toBe(true);
    expect(ctrl.getInputType()).toBe("text");
    ctrl.toggleVisibility();
    expect(ctrl.getInputType()).toBe("password");
  });

  test("setValue", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new PasswordInputController({ onChange: fn });
    ctrl.setValue("secret123");
    expect(ctrl.getValue()).toBe("secret123");
    expect(fn).toHaveBeenCalledWith("secret123");
  });

  test("disabled prevents setValue", () => {
    const ctrl = new PasswordInputController({ disabled: true });
    ctrl.setValue("x");
    expect(ctrl.getValue()).toBe("");
  });
});
