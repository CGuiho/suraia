/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { SemiCircleProgressController } from "./semi-circle-progress";

describe("SemiCircleProgressController", () => {
  test("defaults", () => {
    const ctrl = new SemiCircleProgressController();
    expect(ctrl.getValue()).toBe(0);
    expect(ctrl.getSize()).toBe(200);
    expect(ctrl.getThickness()).toBe(16);
    expect(ctrl.getColor()).toBe("primary");
  });

  test("path metrics calculations", () => {
    const ctrl = new SemiCircleProgressController({ size: 100, thickness: 10 });
    expect(ctrl.getRadius()).toBe(45); // (100 - 10) / 2 = 45
    expect(ctrl.getPathLength()).toBeCloseTo(Math.PI * 45);
    expect(ctrl.getPathData()).toBe("M 5 95 A 45 45 0 0 1 95 95");
  });

  test("stroke metrics calculations at 50%", () => {
    const ctrl = new SemiCircleProgressController({ value: 50, size: 200, thickness: 16 });
    const length = ctrl.getPathLength();
    expect(ctrl.getStrokeDasharray()).toBe(`${length} ${length}`);
    expect(ctrl.getStrokeDashoffset()).toBeCloseTo(length * 0.5);
  });

  test("getAriaAttributes", () => {
    const ctrl = new SemiCircleProgressController({ value: 75 });
    const aria = ctrl.getAriaAttributes();
    expect(aria["role"]).toBe("progressbar");
    expect(aria["aria-valuenow"]).toBe("75");
    expect(aria["aria-valuemin"]).toBe("0");
    expect(aria["aria-valuemax"]).toBe("100");
  });
});
