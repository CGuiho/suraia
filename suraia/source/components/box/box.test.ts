/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { BoxController } from "./box";

describe("BoxController", () => {
  test("defaults to div", () => {
    const ctrl = new BoxController();
    expect(ctrl.getComponent()).toBe("div");
  });

  test("can change component tag", () => {
    const ctrl = new BoxController({ component: "span" });
    expect(ctrl.getComponent()).toBe("span");
    ctrl.setComponent("button");
    expect(ctrl.getComponent()).toBe("button");
  });
});
