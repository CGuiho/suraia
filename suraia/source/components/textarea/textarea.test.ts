/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { TextareaController } from "./textarea";

describe("TextareaController", () => {
  test("defaults", () => {
    const ctrl = new TextareaController();
    expect(ctrl.getValue()).toBe("");
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.isAutosize()).toBe(false);
    expect(ctrl.hasError()).toBe(false);
  });

  test("setValue calls onChange", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new TextareaController({ onChange: fn });
    ctrl.setValue("hello\nworld");
    expect(ctrl.getValue()).toBe("hello\nworld");
    expect(fn).toHaveBeenCalledWith("hello\nworld");
  });

  test("setValue does nothing when disabled", () => {
    const ctrl = new TextareaController({ disabled: true });
    ctrl.setValue("test");
    expect(ctrl.getValue()).toBe("");
  });

  test("validate required", () => {
    const ctrl = new TextareaController({ required: true });
    expect(ctrl.validate()).toBe(false);
    ctrl.setValue("x");
    expect(ctrl.validate()).toBe(true);
  });

  test("autosize options", () => {
    const ctrl = new TextareaController({ autosize: true, minRows: 2, maxRows: 10 });
    expect(ctrl.isAutosize()).toBe(true);
    expect(ctrl.getMinRows()).toBe(2);
    expect(ctrl.getMaxRows()).toBe(10);
  });
});
