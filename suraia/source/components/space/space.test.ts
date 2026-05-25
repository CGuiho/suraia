/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { SpaceController } from "./space";

describe("SpaceController", () => {
  test("defaults to no dimensions", () => {
    const ctrl = new SpaceController();
    expect(ctrl.getHeight()).toBeUndefined();
    expect(ctrl.getWidth()).toBeUndefined();
  });

  test("accepts height and width options", () => {
    const ctrl = new SpaceController({ h: "16px", w: "8px" });
    expect(ctrl.getHeight()).toBe("16px");
    expect(ctrl.getWidth()).toBe("8px");
  });

  test("getStyle returns correct inline styles", () => {
    const ctrl = new SpaceController({ h: "24px" });
    const style = ctrl.getStyle();
    expect(style["height"]).toBe("24px");
    expect(style["min-height"]).toBe("24px");
    expect(style["width"]).toBeUndefined();
  });

  test("setHeight and setWidth update dimensions", () => {
    const ctrl = new SpaceController();
    ctrl.setHeight("32px");
    ctrl.setWidth("16px");
    expect(ctrl.getHeight()).toBe("32px");
    expect(ctrl.getWidth()).toBe("16px");
  });
});
