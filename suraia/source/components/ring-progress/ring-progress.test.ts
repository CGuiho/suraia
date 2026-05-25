/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { RingProgressController } from "./ring-progress";

describe("RingProgressController", () => {
  test("defaults", () => {
    const ctrl = new RingProgressController();
    expect(ctrl.getValue()).toBe(0);
    expect(ctrl.getSize()).toBe(120);
    expect(ctrl.getThickness()).toBe(12);
    expect(ctrl.hasRoundCaps()).toBe(false);
    expect(ctrl.getSections()).toEqual([]);
  });

  test("single value is normalized into a section", () => {
    const ctrl = new RingProgressController({ value: 60 });
    expect(ctrl.getValue()).toBe(60);
    expect(ctrl.getSections()).toEqual([{ value: 60, color: "primary" }]);
  });

  test("size and thickness configuration", () => {
    const ctrl = new RingProgressController({ size: 100, thickness: 10 });
    expect(ctrl.getRadius()).toBe(45); // (100 - 10) / 2
    expect(ctrl.getCircumference()).toBeCloseTo(2 * Math.PI * 45);
  });

  test("section calculations", () => {
    const ctrl = new RingProgressController({
      size: 120,
      thickness: 12,
      sections: [
        { value: 40, color: "blue" },
        { value: 20, color: "green" }
      ]
    });

    const calculations = ctrl.getSectionCalculations();
    expect(calculations).toHaveLength(2);

    const circumference = ctrl.getCircumference();

    // Section 1
    expect(calculations[0]?.value).toBe(40);
    expect(calculations[0]?.color).toBe("blue");
    expect(calculations[0]?.strokeDashoffset).toBeCloseTo(circumference * 0.6);
    expect(calculations[0]?.transform).toBe("rotate(-90 60 60)");

    // Section 2 starts at -90 + (40% of 360) = -90 + 144 = 54
    expect(calculations[1]?.value).toBe(20);
    expect(calculations[1]?.color).toBe("green");
    expect(calculations[1]?.strokeDashoffset).toBeCloseTo(circumference * 0.8);
    expect(calculations[1]?.transform).toBe("rotate(54 60 60)");
  });

  test("getAriaAttributes", () => {
    const ctrl = new RingProgressController({ value: 42 });
    const aria = ctrl.getAriaAttributes();
    expect(aria["role"]).toBe("progressbar");
    expect(aria["aria-valuenow"]).toBe("42");
    expect(aria["aria-valuemin"]).toBe("0");
    expect(aria["aria-valuemax"]).toBe("100");
  });
});
