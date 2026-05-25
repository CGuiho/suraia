/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { MarkController } from "./mark";

describe("MarkController", () => {
  test("defaults", () => {
    const ctrl = new MarkController();
    expect(ctrl.getColor()).toBeUndefined();
    expect(ctrl.getStyle()['background-color']).toBeUndefined();
  });

  test("custom color", () => {
    const ctrl = new MarkController({ color: "pink" });
    expect(ctrl.getColor()).toBe("pink");
    expect(ctrl.getStyle()['background-color']).toBe("pink");
  });
});
