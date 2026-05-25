/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { RollingNumberController } from "./rolling-number";

describe("RollingNumberController", () => {
  test("initial states", () => {
    const ctrl = new RollingNumberController({ value: 123 });
    expect(ctrl.getValue()).toBe(123);
    expect(ctrl.getPreviousValue()).toBe(123);
    expect(ctrl.getDigits()).toEqual(["1", "2", "3"]);
  });

  test("updating value tracks history", () => {
    const ctrl = new RollingNumberController({ value: 123 });
    ctrl.setValue(456);
    expect(ctrl.getValue()).toBe(456);
    expect(ctrl.getPreviousValue()).toBe(123);
    expect(ctrl.getDigits()).toEqual(["4", "5", "6"]);
    expect(ctrl.getPreviousDigits()).toEqual(["1", "2", "3"]);
  });

  test("getting digit offsets", () => {
    const ctrl = new RollingNumberController();
    expect(ctrl.getDigitOffset("0")).toBe(0);
    expect(ctrl.getDigitOffset("2")).toBe(-20);
    expect(ctrl.getDigitOffset("9")).toBe(-90);
  });

  test("attributes and styles", () => {
    const ctrl = new RollingNumberController({ duration: 800, size: "lg" });
    expect(ctrl.getDataAttributes()["data-suraia-size"]).toBe("lg");
    expect(ctrl.getStyle()["--suraia-rolling-duration"]).toBe("800ms");
  });
});
