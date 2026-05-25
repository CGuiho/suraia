/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { NumberInputController } from "./number-input";

describe("NumberInputController", () => {
  test("defaults", () => {
    const ctrl = new NumberInputController();
    expect(ctrl.getValue()).toBe(0);
    expect(ctrl.isDisabled()).toBe(false);
  });

  test("increment and decrement", () => {
    const fn = mock((_v: number) => {});
    const ctrl = new NumberInputController({ value: 5, step: 2, onChange: fn });
    ctrl.increment();
    expect(ctrl.getValue()).toBe(7);
    ctrl.decrement();
    expect(ctrl.getValue()).toBe(5);
  });

  test("clamps to min/max", () => {
    const ctrl = new NumberInputController({ value: 10, min: 0, max: 10 });
    ctrl.increment();
    expect(ctrl.getValue()).toBe(10);
    ctrl.setValue(-5);
    expect(ctrl.getValue()).toBe(0);
  });

  test("precision rounding", () => {
    const ctrl = new NumberInputController({ step: 0.1, precision: 2 });
    ctrl.setValue(1.005);
    expect(ctrl.getValue()).toBe(1.01);
  });

  test("canIncrement/canDecrement", () => {
    const ctrl = new NumberInputController({ value: 10, max: 10 });
    expect(ctrl.canIncrement()).toBe(false);
    expect(ctrl.canDecrement()).toBe(true);
  });

  test("disabled", () => {
    const ctrl = new NumberInputController({ disabled: true });
    ctrl.increment();
    expect(ctrl.getValue()).toBe(0);
  });
});
