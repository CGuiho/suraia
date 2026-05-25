/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { TypographyController } from "./typography";

describe("TypographyController", () => {
  test("initializes correctly with defaults", () => {
    const ctrl = new TypographyController();
    expect(ctrl.getVariant()).toBe("p");
    expect(ctrl.getWeight()).toBe("normal");
    expect(ctrl.getAlign()).toBe("left");
    expect(ctrl.getTagName()).toBe("p");
    expect(ctrl.getColor()).toBeUndefined();
  });

  test("resolves correct tag names per variant", () => {
    expect(new TypographyController({ variant: "h1" }).getTagName()).toBe("h1");
    expect(new TypographyController({ variant: "blockquote" }).getTagName()).toBe("blockquote");
    expect(new TypographyController({ variant: "code" }).getTagName()).toBe("code");
    expect(new TypographyController({ variant: "lead" }).getTagName()).toBe("p");
  });

  test("generates expected styles and data attrs", () => {
    const ctrl = new TypographyController({
      variant: "h3",
      weight: "bold",
      align: "center",
      color: "#ff0000",
    });

    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-variant"]).toBe("h3");
    expect(attrs["data-suraia-weight"]).toBe("bold");
    expect(attrs["data-suraia-align"]).toBe("center");
    expect(ctrl.getStyle()["color"]).toBe("#ff0000");
  });

  test("setters updates correctly", () => {
    const ctrl = new TypographyController();
    ctrl.setVariant("h6");
    ctrl.setWeight("medium");
    ctrl.setAlign("justify");
    ctrl.setColor("blue");
    expect(ctrl.getVariant()).toBe("h6");
    expect(ctrl.getWeight()).toBe("medium");
    expect(ctrl.getAlign()).toBe("justify");
    expect(ctrl.getColor()).toBe("blue");
  });
});
