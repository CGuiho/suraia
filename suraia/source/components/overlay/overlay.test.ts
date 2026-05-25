/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { OverlayController } from "./overlay";

describe("OverlayController", () => {
  test("defaults", () => {
    const ctrl = new OverlayController();
    expect(ctrl.isFixed()).toBe(false);
    expect(ctrl.getBlur()).toBe(0);
    expect(ctrl.getZIndex()).toBe(200);
  });

  test("getStyle computes rgba", () => {
    const ctrl = new OverlayController({ color: "#000000", opacity: 0.5, blur: 4 });
    const style = ctrl.getStyle();
    expect(style["--suraia-overlay-color"]).toBe("rgba(0, 0, 0, 0.5)");
    expect(style["--suraia-overlay-blur"]).toBe("4px");
  });

  test("fixed data attribute", () => {
    const ctrl = new OverlayController({ fixed: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-fixed"]).toBe("");
  });
});
