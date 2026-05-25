/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { PillsInputController } from "./pills-input";

describe("PillsInputController", () => {
  test("initializes correctly", () => {
    const ctrl = new PillsInputController();
    expect(ctrl.getValue()).toBe("");
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.isFocused()).toBe(false);
  });

  test("sets values and triggers onChange", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new PillsInputController({ onChange: fn });
    ctrl.setValue("Hello");
    expect(ctrl.getValue()).toBe("Hello");
    expect(fn).toHaveBeenCalledWith("Hello");
  });

  test("handles focus and blur states", () => {
    const ctrl = new PillsInputController();
    ctrl.handleFocus();
    expect(ctrl.isFocused()).toBe(true);
    ctrl.handleBlur();
    expect(ctrl.isFocused()).toBe(false);
  });
});
