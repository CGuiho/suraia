/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { PinInputController } from "./pin-input";

describe("PinInputController", () => {
  test("defaults", () => {
    const ctrl = new PinInputController();
    expect(ctrl.getLength()).toBe(4);
    expect(ctrl.getValue()).toBe("");
    expect(ctrl.getType()).toBe("number");
    expect(ctrl.isMasked()).toBe(false);
    expect(ctrl.isDisabled()).toBe(false);
  });

  test("initial value and input masking", () => {
    const ctrl = new PinInputController({
      length: 6,
      value: "123",
      mask: true,
    });
    expect(ctrl.getLength()).toBe(6);
    expect(ctrl.getValue()).toBe("123");
    expect(ctrl.isMasked()).toBe(true);
    expect(ctrl.getValues()).toEqual(["1", "2", "3", "", "", ""]);
  });

  test("setValue and character management", () => {
    const onChange = mock(() => {});
    const onComplete = mock(() => {});
    const ctrl = new PinInputController({
      length: 4,
      onChange,
      onComplete,
    });

    ctrl.setValue("12");
    expect(ctrl.getValue()).toBe("12");
    expect(onChange).toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();

    ctrl.setCharacter(2, "3");
    ctrl.setCharacter(3, "4");
    expect(ctrl.getValue()).toBe("1234");
    expect(onComplete).toHaveBeenCalled();
  });

  test("input type numeric sanitization", () => {
    const ctrl = new PinInputController({
      type: "number",
    });
    ctrl.setValue("1a2b3");
    expect(ctrl.getValue()).toBe("123");
  });

  test("input type alphanumeric sanitization", () => {
    const ctrl = new PinInputController({
      type: "alphanumeric",
    });
    ctrl.setValue("1a2b!");
    expect(ctrl.getValue()).toBe("1a2b");
  });
});
