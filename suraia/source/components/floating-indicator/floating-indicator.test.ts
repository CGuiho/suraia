/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, test } from "bun:test";
import { FloatingIndicatorController } from "./floating-indicator";

describe("FloatingIndicatorController", () => {
  test("initial state is hidden without target", () => {
    const ctrl = new FloatingIndicatorController();
    expect(ctrl.isVisible()).toBe(false);
    expect(ctrl.getStyle()["--suraia-floating-indicator-opacity"]).toBe("0");
  });

  test("getStyle computes target offset relative to root", () => {
    const ctrl = new FloatingIndicatorController({
      rootRect: { x: 10, y: 20, width: 300, height: 50 },
      targetRect: { x: 40, y: 25, width: 80, height: 32 },
    });
    const style = ctrl.getStyle();
    expect(style["--suraia-floating-indicator-x"]).toBe("30px");
    expect(style["--suraia-floating-indicator-y"]).toBe("5px");
    expect(style["--suraia-floating-indicator-width"]).toBe("80px");
  });

  test("setTargetRect toggles visibility", () => {
    const ctrl = new FloatingIndicatorController();
    ctrl.setTargetRect({ x: 0, y: 0, width: 10, height: 10 });
    expect(ctrl.isVisible()).toBe(true);
    expect(ctrl.getDataAttributes()["data-suraia-visible"]).toBe("true");
  });
});
