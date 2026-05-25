/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, mock, test } from "bun:test";
import { MaskInputController } from "./mask-input";

describe("MaskInputController", () => {
  test("initial state applies mask", () => {
    const ctrl = new MaskInputController({ value: "1234567890", mask: "(999) 999-9999" });
    expect(ctrl.getValue()).toBe("(123) 456-7890");
    expect(ctrl.isComplete()).toBe(true);
  });

  test("setValue updates masked value and calls onChange", () => {
    const onChange = mock((_value: string) => {});
    const ctrl = new MaskInputController({ mask: "99/99", onChange });
    ctrl.setValue("123");
    expect(ctrl.getValue()).toBe("12/3_");
    expect(onChange).toHaveBeenCalledWith("12/3_");
  });

  test("supports alpha and alphanumeric tokens", () => {
    const ctrl = new MaskInputController({ mask: "aa-**" });
    expect(ctrl.applyMask("ab12")).toBe("ab-12");
  });

  test("disabled input ignores updates", () => {
    const ctrl = new MaskInputController({ value: "12", mask: "999", disabled: true });
    ctrl.setValue("123");
    expect(ctrl.getValue()).toBe("12_");
  });

  test("data attributes reflect completion", () => {
    const ctrl = new MaskInputController({ value: "12", mask: "999" });
    expect(ctrl.getDataAttributes()["data-suraia-complete"]).toBe("false");
  });
});
