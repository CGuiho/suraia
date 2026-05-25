/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { ThemeIconController } from "./theme-icon";

describe("ThemeIconController", () => {
  test("initial state defaults", () => {
    const ctrl = new ThemeIconController();
    expect(ctrl.getVariant()).toBe("filled");
    expect(ctrl.getSize()).toBe("md");
    expect(ctrl.getColor()).toBe("primary");
    expect(ctrl.getRadius()).toBe("sm");
  });

  test("initial state with options", () => {
    const ctrl = new ThemeIconController({
      variant: "outline",
      size: "lg",
      color: "success",
      radius: "md",
    });
    expect(ctrl.getVariant()).toBe("outline");
    expect(ctrl.getSize()).toBe("lg");
    expect(ctrl.getColor()).toBe("success");
    expect(ctrl.getRadius()).toBe("md");
  });

  test("setters update values", () => {
    const ctrl = new ThemeIconController();
    ctrl.setVariant("light");
    ctrl.setSize("xl");
    ctrl.setColor("error");
    ctrl.setRadius("full");
    expect(ctrl.getVariant()).toBe("light");
    expect(ctrl.getSize()).toBe("xl");
    expect(ctrl.getColor()).toBe("error");
    expect(ctrl.getRadius()).toBe("full");
  });

  test("getDataAttributes returns correct attributes", () => {
    const ctrl = new ThemeIconController({ variant: "gradient", size: "xs", radius: "lg" });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("ThemeIcon");
    expect(attrs["data-suraia-variant"]).toBe("gradient");
    expect(attrs["data-suraia-size"]).toBe("xs");
    expect(attrs["data-suraia-radius"]).toBe("lg");
  });
});
