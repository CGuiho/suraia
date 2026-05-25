/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { BadgeController } from "./badge";

describe("BadgeController", () => {
  test("initial state defaults", () => {
    const ctrl = new BadgeController();
    expect(ctrl.getVariant()).toBe("filled");
    expect(ctrl.getSize()).toBe("md");
    expect(ctrl.getColor()).toBe("primary");
    expect(ctrl.isFullWidth()).toBe(false);
    expect(ctrl.isCircle()).toBe(false);
  });

  test("initial state with options", () => {
    const ctrl = new BadgeController({
      variant: "dot",
      size: "lg",
      color: "error",
      fullWidth: true,
      circle: false,
    });
    expect(ctrl.getVariant()).toBe("dot");
    expect(ctrl.getSize()).toBe("lg");
    expect(ctrl.getColor()).toBe("error");
    expect(ctrl.isFullWidth()).toBe(true);
  });

  test("setVariant updates variant", () => {
    const ctrl = new BadgeController();
    ctrl.setVariant("outline");
    expect(ctrl.getVariant()).toBe("outline");
  });

  test("setSize updates size", () => {
    const ctrl = new BadgeController();
    ctrl.setSize("xl");
    expect(ctrl.getSize()).toBe("xl");
  });

  test("setColor updates color", () => {
    const ctrl = new BadgeController();
    ctrl.setColor("success");
    expect(ctrl.getColor()).toBe("success");
  });

  test("getDataAttributes returns correct attributes", () => {
    const ctrl = new BadgeController({ variant: "light", size: "sm", fullWidth: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("Badge");
    expect(attrs["data-suraia-variant"]).toBe("light");
    expect(attrs["data-suraia-size"]).toBe("sm");
    expect(attrs["data-suraia-block"]).toBe("");
    expect(attrs["data-suraia-circle"]).toBeUndefined();
  });
});
