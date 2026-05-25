/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { CodeController } from "./code";

describe("CodeController", () => {
  test("initial state defaults", () => {
    const ctrl = new CodeController();
    expect(ctrl.isBlock()).toBe(false);
    expect(ctrl.getColor()).toBe("primary");
  });

  test("initial state with options", () => {
    const ctrl = new CodeController({
      block: true,
      color: "red",
    });
    expect(ctrl.isBlock()).toBe(true);
    expect(ctrl.getColor()).toBe("red");
  });

  test("setters update values", () => {
    const ctrl = new CodeController();
    ctrl.setBlock(true);
    ctrl.setColor("blue");
    expect(ctrl.isBlock()).toBe(true);
    expect(ctrl.getColor()).toBe("blue");
  });

  test("getDataAttributes returns correct attributes", () => {
    const ctrl = new CodeController({ block: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("Code");
    expect(attrs["data-suraia-block"]).toBe("");
  });
});
