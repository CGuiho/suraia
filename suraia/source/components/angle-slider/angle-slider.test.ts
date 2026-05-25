/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { AngleSliderController } from "./angle-slider";

describe("AngleSliderController", () => {
  test("defaults", () => {
    const ctrl = new AngleSliderController();
    expect(ctrl.getValue()).toBe(0);
    expect(ctrl.getStep()).toBe(1);
    expect(ctrl.isDisabled()).toBe(false);
  });

  test("setValue wraps and snaps", () => {
    const fn = mock((_v: number) => {});
    const ctrl = new AngleSliderController({ onChange: fn, step: 5 });
    
    ctrl.setValue(47);
    expect(ctrl.getValue()).toBe(45);
    expect(fn).toHaveBeenCalledWith(45);

    // wrapping positive values
    ctrl.setValue(370);
    expect(ctrl.getValue()).toBe(10);

    // wrapping negative values
    ctrl.setValue(-10);
    expect(ctrl.getValue()).toBe(350);

    // exactly 360 wraps to 0
    ctrl.setValue(360);
    expect(ctrl.getValue()).toBe(0);
  });

  test("increment and decrement wrap correctly", () => {
    const ctrl = new AngleSliderController({ value: 350, step: 10 });
    ctrl.increment();
    expect(ctrl.getValue()).toBe(0);
    ctrl.decrement();
    expect(ctrl.getValue()).toBe(350);
  });

  test("disabled prevents changes", () => {
    const ctrl = new AngleSliderController({ value: 90, disabled: true });
    ctrl.setValue(180);
    expect(ctrl.getValue()).toBe(90);
  });

  test("calculateAngleFromCoords", () => {
    const ctrl = new AngleSliderController({ step: 1 });
    
    // Top (12 o'clock, dx = 0, dy = -10) -> Should be 0 degrees
    let angle = ctrl.calculateAngleFromCoords(50, 40, 50, 50);
    expect(angle).toBe(0);

    // Right (3 o'clock, dx = 10, dy = 0) -> Should be 90 degrees
    angle = ctrl.calculateAngleFromCoords(60, 50, 50, 50);
    expect(angle).toBe(90);

    // Bottom (6 o'clock, dx = 0, dy = 10) -> Should be 180 degrees
    angle = ctrl.calculateAngleFromCoords(50, 60, 50, 50);
    expect(angle).toBe(180);

    // Left (9 o'clock, dx = -10, dy = 0) -> Should be 270 degrees
    angle = ctrl.calculateAngleFromCoords(40, 50, 50, 50);
    expect(angle).toBe(270);
  });

  test("keyboard handling", () => {
    const ctrl = new AngleSliderController({ value: 180, step: 10 });
    ctrl.handleKeyDown({ key: "ArrowRight", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(190);
    ctrl.handleKeyDown({ key: "Home", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(0);
    ctrl.handleKeyDown({ key: "End", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(350); // 360 - 10
  });
});
