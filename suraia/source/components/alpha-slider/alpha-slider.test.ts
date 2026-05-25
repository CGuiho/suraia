/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { AlphaSliderController } from "./alpha-slider";

describe("AlphaSliderController", () => {
  test("defaults", () => {
    const ctrl = new AlphaSliderController();
    expect(ctrl.getValue()).toBe(1);
    expect(ctrl.getStep()).toBe(0.01);
    expect(ctrl.getColor()).toBe("#000000");
    expect(ctrl.isDisabled()).toBe(false);
  });

  test("setValue clamps and fires onChange", () => {
    const fn = mock((_v: number) => {});
    const ctrl = new AlphaSliderController({ onChange: fn });
    ctrl.setValue(0.5);
    expect(ctrl.getValue()).toBe(0.5);
    expect(ctrl.getPercentage()).toBe(50);
    expect(fn).toHaveBeenCalledWith(0.5);

    ctrl.setValue(1.5);
    expect(ctrl.getValue()).toBe(1.0);

    ctrl.setValue(-0.5);
    expect(ctrl.getValue()).toBe(0.0);
  });

  test("increment and decrement", () => {
    const ctrl = new AlphaSliderController({ value: 0.5, step: 0.1 });
    ctrl.increment();
    expect(ctrl.getValue()).toBe(0.6);
    ctrl.decrement();
    expect(ctrl.getValue()).toBe(0.5);
  });

  test("disabled prevents changes", () => {
    const ctrl = new AlphaSliderController({ value: 0.8, disabled: true });
    ctrl.setValue(0.2);
    expect(ctrl.getValue()).toBe(0.8);
  });

  test("keyboard handling", () => {
    const ctrl = new AlphaSliderController({ value: 0.5, step: 0.1 });
    ctrl.handleKeyDown({ key: "ArrowRight", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(0.6);
    ctrl.handleKeyDown({ key: "Home", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(0.0);
    ctrl.handleKeyDown({ key: "End", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(1.0);
  });
});
