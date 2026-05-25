/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { HueSliderController } from "./hue-slider";

describe("HueSliderController", () => {
  test("defaults", () => {
    const ctrl = new HueSliderController();
    expect(ctrl.getValue()).toBe(0);
    expect(ctrl.getStep()).toBe(1);
    expect(ctrl.isDisabled()).toBe(false);
  });

  test("setValue clamps and fires onChange", () => {
    const fn = mock((_v: number) => {});
    const ctrl = new HueSliderController({ onChange: fn });
    ctrl.setValue(180);
    expect(ctrl.getValue()).toBe(180);
    expect(ctrl.getPercentage()).toBe(50);
    expect(fn).toHaveBeenCalledWith(180);

    ctrl.setValue(400);
    expect(ctrl.getValue()).toBe(360);

    ctrl.setValue(-50);
    expect(ctrl.getValue()).toBe(0);
  });

  test("increment and decrement", () => {
    const ctrl = new HueSliderController({ value: 180, step: 10 });
    ctrl.increment();
    expect(ctrl.getValue()).toBe(190);
    ctrl.decrement();
    expect(ctrl.getValue()).toBe(180);
  });

  test("disabled prevents changes", () => {
    const ctrl = new HueSliderController({ value: 90, disabled: true });
    ctrl.setValue(270);
    expect(ctrl.getValue()).toBe(90);
  });

  test("keyboard handling", () => {
    const ctrl = new HueSliderController({ value: 180, step: 10 });
    ctrl.handleKeyDown({ key: "ArrowRight", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(190);
    ctrl.handleKeyDown({ key: "Home", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(0);
    ctrl.handleKeyDown({ key: "End", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(360);
  });
});
