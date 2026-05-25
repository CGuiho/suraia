/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { BlockquoteController } from "./blockquote";

describe("BlockquoteController", () => {
  test("initial state defaults", () => {
    const ctrl = new BlockquoteController();
    expect(ctrl.getColor()).toBe("primary");
  });

  test("initial state with options", () => {
    const ctrl = new BlockquoteController({
      color: "red",
    });
    expect(ctrl.getColor()).toBe("red");
  });

  test("setColor updates color", () => {
    const ctrl = new BlockquoteController();
    ctrl.setColor("blue");
    expect(ctrl.getColor()).toBe("blue");
  });

  test("getDataAttributes returns correct attributes", () => {
    const ctrl = new BlockquoteController();
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("Blockquote");
  });
});
