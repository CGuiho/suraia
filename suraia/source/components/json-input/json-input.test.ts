/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, mock, test } from "bun:test";
import { JsonInputController } from "./json-input";

describe("JsonInputController", () => {
  test("initial state defaults", () => {
    const ctrl = new JsonInputController();
    expect(ctrl.getValue()).toBe("");
    expect(ctrl.shouldFormatOnBlur()).toBe(false);
    expect(ctrl.isAutosize()).toBe(true);
  });

  test("setValue updates and calls onChange", () => {
    const onChange = mock((_value: string) => {});
    const ctrl = new JsonInputController({ onChange });
    ctrl.setValue('{"ok":true}');
    expect(ctrl.getValue()).toBe('{"ok":true}');
    expect(onChange).toHaveBeenCalledWith('{"ok":true}');
  });

  test("parse reports valid and invalid JSON", () => {
    const ctrl = new JsonInputController({ value: '{"count":2}' });
    expect(ctrl.parse()).toEqual({ valid: true, value: { count: 2 } });
    ctrl.setValue("{");
    expect(ctrl.parse().valid).toBe(false);
  });

  test("format pretty prints valid JSON", () => {
    const ctrl = new JsonInputController({ value: '{"count":2}' });
    expect(ctrl.format()).toBe(true);
    expect(ctrl.getValue()).toBe('{\n  "count": 2\n}');
  });

  test("disabled input ignores updates", () => {
    const ctrl = new JsonInputController({ value: "{}", disabled: true });
    ctrl.setValue("[]");
    expect(ctrl.getValue()).toBe("{}");
  });
});
