/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { SliderController } from "./slider";

describe("SliderController", () => {
  test("defaults", () => {
    const ctrl = new SliderController();
    expect(ctrl.getValue()).toBe(0);
    expect(ctrl.getMin()).toBe(0);
    expect(ctrl.getMax()).toBe(100);
    expect(ctrl.getStep()).toBe(1);
    expect(ctrl.getPercentage()).toBe(0);
  });

  test("setValue clamps and fires onChange", () => {
    const fn = mock((_v: number) => {});
    const ctrl = new SliderController({ onChange: fn });
    ctrl.setValue(50);
    expect(ctrl.getValue()).toBe(50);
    expect(ctrl.getPercentage()).toBe(50);
    expect(fn).toHaveBeenCalledWith(50);
  });

  test("setValue clamps out-of-range values", () => {
    const ctrl = new SliderController({ min: 0, max: 100 });
    ctrl.setValue(150);
    expect(ctrl.getValue()).toBe(100);
    ctrl.setValue(-10);
    expect(ctrl.getValue()).toBe(0);
  });

  test("increment and decrement", () => {
    const ctrl = new SliderController({ value: 50, step: 5 });
    ctrl.increment();
    expect(ctrl.getValue()).toBe(55);
    ctrl.decrement();
    expect(ctrl.getValue()).toBe(50);
  });

  test("snap to step", () => {
    const ctrl = new SliderController({ step: 10 });
    ctrl.setValue(23);
    expect(ctrl.getValue()).toBe(20);
    ctrl.setValue(27);
    expect(ctrl.getValue()).toBe(30);
  });

  test("keyboard Home/End", () => {
    const ctrl = new SliderController({ value: 50 });
    ctrl.handleKeyDown({ key: "Home", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(0);
    ctrl.handleKeyDown({ key: "End", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(100);
  });

  test("disabled prevents changes", () => {
    const ctrl = new SliderController({ disabled: true });
    ctrl.setValue(50);
    expect(ctrl.getValue()).toBe(0);
  });

  test("commitValue fires onChangeEnd", () => {
    const fn = mock((_v: number) => {});
    const ctrl = new SliderController({ value: 30, onChangeEnd: fn });
    ctrl.commitValue();
    expect(fn).toHaveBeenCalledWith(30);
  });

  test("getAriaAttributes", () => {
    const ctrl = new SliderController({ value: 42, min: 0, max: 100 });
    const aria = ctrl.getAriaAttributes();
    expect(aria["aria-valuenow"]).toBe("42");
    expect(aria["aria-valuemin"]).toBe("0");
    expect(aria["aria-valuemax"]).toBe("100");
  });
});
