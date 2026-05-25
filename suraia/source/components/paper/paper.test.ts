/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { PaperController } from "./paper";

describe("PaperController", () => {
  test("defaults", () => {
    const ctrl = new PaperController();
    expect(ctrl.getShadow()).toBe("none");
    expect(ctrl.getRadius()).toBe("md");
    expect(ctrl.hasBorder()).toBe(false);
  });

  test("with options", () => {
    const ctrl = new PaperController({ shadow: "lg", radius: "xl", withBorder: true });
    expect(ctrl.getShadow()).toBe("lg");
    expect(ctrl.getRadius()).toBe("xl");
    expect(ctrl.hasBorder()).toBe(true);
  });

  test("getDataAttributes omits shadow when none", () => {
    const ctrl = new PaperController();
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-shadow"]).toBeUndefined();
    expect(attrs["data-suraia-with-border"]).toBeUndefined();
  });

  test("getDataAttributes includes shadow when set", () => {
    const ctrl = new PaperController({ shadow: "md", withBorder: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-shadow"]).toBe("md");
    expect(attrs["data-suraia-with-border"]).toBe("");
  });
});
