/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { ColorSwatchController } from "./color-swatch";

describe("ColorSwatchController", () => {
  test("initial state defaults", () => {
    const ctrl = new ColorSwatchController();
    expect(ctrl.getColor()).toBe("#000000");
    expect(ctrl.getSize()).toBe("md");
    expect(ctrl.getRadius()).toBe("full");
    expect(ctrl.isWithShadow()).toBe(true);
  });

  test("initial state with options", () => {
    const ctrl = new ColorSwatchController({
      color: "#ff0000",
      size: "lg",
      radius: "md",
      withShadow: false,
    });
    expect(ctrl.getColor()).toBe("#ff0000");
    expect(ctrl.getSize()).toBe("lg");
    expect(ctrl.getRadius()).toBe("md");
    expect(ctrl.isWithShadow()).toBe(false);
  });

  test("setters update values", () => {
    const ctrl = new ColorSwatchController();
    ctrl.setColor("#00ff00");
    ctrl.setSize("xs");
    ctrl.setRadius("xs");
    ctrl.setWithShadow(true);
    expect(ctrl.getColor()).toBe("#00ff00");
    expect(ctrl.getSize()).toBe("xs");
    expect(ctrl.getRadius()).toBe("xs");
    expect(ctrl.isWithShadow()).toBe(true);
  });

  test("getStyle returns background-color", () => {
    const ctrl = new ColorSwatchController({ color: "blue" });
    const style = ctrl.getStyle();
    expect(style["background-color"]).toBe("blue");
  });

  test("getDataAttributes returns correct attributes", () => {
    const ctrl = new ColorSwatchController({ size: "xl", radius: "full", withShadow: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("ColorSwatch");
    expect(attrs["data-suraia-size"]).toBe("xl");
    expect(attrs["data-suraia-radius"]).toBe("full");
    expect(attrs["data-suraia-shadow"]).toBe("");
  });
});
