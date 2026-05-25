/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { RangeSliderController } from "./range-slider";

describe("RangeSliderController", () => {
  test("defaults", () => {
    const ctrl = new RangeSliderController();
    expect(ctrl.getValue()).toEqual([20, 80]);
    expect(ctrl.getMin()).toBe(0);
    expect(ctrl.getMax()).toBe(100);
    expect(ctrl.getStep()).toBe(1);
    expect(ctrl.getPercentages()).toEqual([20, 80]);
  });

  test("setValue and setValueAtIndex clamp & change values", () => {
    const fn = mock((_v: [number, number]) => {});
    const ctrl = new RangeSliderController({ onChange: fn });
    ctrl.setValue([10, 90]);
    expect(ctrl.getValue()).toEqual([10, 90]);
    expect(fn).toHaveBeenCalledWith([10, 90]);

    ctrl.setValueAtIndex(0, 40);
    expect(ctrl.getValue()).toEqual([40, 90]);
  });

  test("setValueAtIndex does not allow first thumb to cross second", () => {
    const ctrl = new RangeSliderController({ value: [30, 70] });
    ctrl.setValueAtIndex(0, 80);
    expect(ctrl.getValue()).toEqual([70, 70]);
  });

  test("setValueAtIndex does not allow second thumb to cross first", () => {
    const ctrl = new RangeSliderController({ value: [30, 70] });
    ctrl.setValueAtIndex(1, 20);
    expect(ctrl.getValue()).toEqual([30, 30]);
  });

  test("increment and decrement on both thumbs", () => {
    const ctrl = new RangeSliderController({ value: [30, 70], step: 5 });
    ctrl.increment(0);
    expect(ctrl.getValue()).toEqual([35, 70]);
    ctrl.decrement(1);
    expect(ctrl.getValue()).toEqual([35, 65]);
  });

  test("setToMin and setToMax", () => {
    const ctrl = new RangeSliderController({ value: [30, 70] });
    ctrl.setToMin(0);
    expect(ctrl.getValue()).toEqual([0, 70]);
    ctrl.setToMax(1);
    expect(ctrl.getValue()).toEqual([0, 100]);
  });

  test("disabled prevents changes", () => {
    const ctrl = new RangeSliderController({ value: [30, 70], disabled: true });
    ctrl.setValueAtIndex(0, 10);
    expect(ctrl.getValue()).toEqual([30, 70]);
  });

  test("commitValue fires onChangeEnd", () => {
    const fn = mock((_v: [number, number]) => {});
    const ctrl = new RangeSliderController({ value: [30, 70], onChangeEnd: fn });
    ctrl.commitValue();
    expect(fn).toHaveBeenCalledWith([30, 70]);
  });

  test("getAriaAttributes", () => {
    const ctrl = new RangeSliderController({ value: [30, 70], min: 0, max: 100 });
    const aria0 = ctrl.getAriaAttributes(0);
    expect(aria0["aria-valuenow"]).toBe("30");
    expect(aria0["aria-valuemin"]).toBe("0");
    expect(aria0["aria-valuemax"]).toBe("70");

    const aria1 = ctrl.getAriaAttributes(1);
    expect(aria1["aria-valuenow"]).toBe("70");
    expect(aria1["aria-valuemin"]).toBe("30");
    expect(aria1["aria-valuemax"]).toBe("100");
  });
});
