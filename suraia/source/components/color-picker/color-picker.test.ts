/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, mock, test } from "bun:test";
import { ColorPickerController } from "./color-picker";

describe("ColorPickerController", () => {
  test("initial state defaults", () => {
    const ctrl = new ColorPickerController();
    expect(ctrl.getValue()).toBe("#7950f2");
    expect(ctrl.getFormat()).toBe("hex");
    expect(ctrl.getAlpha()).toBe(1);
  });

  test("setValue updates and calls onChange", () => {
    const onChange = mock((_value: string) => {});
    const ctrl = new ColorPickerController({ onChange });
    ctrl.setValue("#ffffff");
    expect(ctrl.getValue()).toBe("#ffffff");
    expect(onChange).toHaveBeenCalledWith("#ffffff");
  });

  test("setAlpha clamps to range", () => {
    const ctrl = new ColorPickerController({ alpha: 2 });
    expect(ctrl.getAlpha()).toBe(1);
    ctrl.setAlpha(-1);
    expect(ctrl.getAlpha()).toBe(0);
  });

  test("selectSwatch only accepts configured swatches", () => {
    const ctrl = new ColorPickerController({ swatches: ["#000000", "#ffffff"] });
    ctrl.selectSwatch("#ffffff");
    expect(ctrl.getValue()).toBe("#ffffff");
    ctrl.selectSwatch("#ff0000");
    expect(ctrl.getValue()).toBe("#ffffff");
  });

  test("data attributes reflect format and alpha support", () => {
    const ctrl = new ColorPickerController({ format: "rgba", withAlpha: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-format"]).toBe("rgba");
    expect(attrs["data-suraia-with-alpha"]).toBe("true");
  });
});
