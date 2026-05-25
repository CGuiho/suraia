/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { SkeletonController } from "./skeleton";

describe("SkeletonController", () => {
  test("defaults", () => {
    const ctrl = new SkeletonController();
    expect(ctrl.isVisible()).toBe(false);
    expect(ctrl.isCircle()).toBe(false);
    expect(ctrl.isAnimated()).toBe(true);
  });

  test("animate disabled when visible", () => {
    const ctrl = new SkeletonController({ visible: true, animate: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-visible"]).toBe("");
    expect(attrs["data-suraia-animate"]).toBeUndefined();
  });

  test("circle skeleton", () => {
    const ctrl = new SkeletonController({ circle: true, height: "40px", width: "40px" });
    expect(ctrl.isCircle()).toBe(true);
    const style = ctrl.getStyle();
    expect(style["height"]).toBe("40px");
    expect(style["width"]).toBe("40px");
  });

  test("setVisible transitions to visible", () => {
    const ctrl = new SkeletonController();
    expect(ctrl.isVisible()).toBe(false);
    ctrl.setVisible(true);
    expect(ctrl.isVisible()).toBe(true);
  });
});
