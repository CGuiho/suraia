/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { AnchorController } from "./anchor";

describe("AnchorController", () => {
  test("defaults to hover underline", () => {
    const ctrl = new AnchorController();
    expect(ctrl.getUnderline()).toBe("hover");
  });

  test("always underline", () => {
    const ctrl = new AnchorController({ underline: "always" });
    expect(ctrl.getUnderline()).toBe("always");
  });

  test("never underline", () => {
    const ctrl = new AnchorController({ underline: "never" });
    expect(ctrl.getUnderline()).toBe("never");
  });
});
