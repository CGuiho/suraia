/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, mock, test } from "bun:test";
import { ColorInputController } from "./color-input";

describe("ColorInputController", () => {
  test("initial state defaults", () => {
    const ctrl = new ColorInputController();
    expect(ctrl.getValue()).toBe("#7950f2");
    expect(ctrl.getFormat()).toBe("hex");
    expect(ctrl.isDisabled()).toBe(false);
  });

  test("setValue updates value and fires onChange", () => {
    const onChange = mock((_value: string) => {});
    const ctrl = new ColorInputController({ onChange });
    ctrl.setValue("#ffffff");
    expect(ctrl.getValue()).toBe("#ffffff");
    expect(onChange).toHaveBeenCalledWith("#ffffff");
  });

  test("disabled input ignores value updates", () => {
    const onChange = mock((_value: string) => {});
    const ctrl = new ColorInputController({ value: "#000000", disabled: true, onChange });
    ctrl.setValue("#ffffff");
    expect(ctrl.getValue()).toBe("#000000");
    expect(onChange).not.toHaveBeenCalled();
  });

  test("validates common CSS color formats", () => {
    const ctrl = new ColorInputController();
    expect(ctrl.isValidValue("#fff")).toBe(true);
    expect(ctrl.isValidValue("rgba(121, 80, 242, 0.5)")).toBe(true);
    expect(ctrl.isValidValue("hsl(255, 86%, 63%)")).toBe(true);
    expect(ctrl.isValidValue("not-a-color")).toBe(false);
  });

  test("getDataAttributes reflects invalid state", () => {
    const ctrl = new ColorInputController({ value: "broken" });
    expect(ctrl.getDataAttributes()["data-suraia-invalid"]).toBe("true");
  });
});
