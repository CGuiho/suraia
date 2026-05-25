/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { RatingController } from "./rating";

describe("RatingController", () => {
  test("defaults", () => {
    const ctrl = new RatingController();
    expect(ctrl.getValue()).toBe(0);
    expect(ctrl.getCount()).toBe(5);
    expect(ctrl.getFractions()).toBe(1);
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.isReadOnly()).toBe(false);
  });

  test("setValue clamps and snaps to fraction", () => {
    const fn = mock((_v: number) => {});
    const ctrl = new RatingController({ count: 5, fractions: 2, onChange: fn });
    
    ctrl.setValue(3.4);
    expect(ctrl.getValue()).toBe(3.5);
    expect(fn).toHaveBeenCalledWith(3.5);

    ctrl.setValue(6);
    expect(ctrl.getValue()).toBe(5);

    ctrl.setValue(-1);
    expect(ctrl.getValue()).toBe(0);
  });

  test("hoverValue management", () => {
    const fn = mock((_v: number | null) => {});
    const ctrl = new RatingController({ onHover: fn });
    ctrl.setHoverValue(4);
    expect(ctrl.getHoverValue()).toBe(4);
    expect(fn).toHaveBeenCalledWith(4);
    ctrl.setHoverValue(null);
    expect(ctrl.getHoverValue()).toBe(null);
  });

  test("increment and decrement by fraction", () => {
    const ctrl = new RatingController({ value: 3, fractions: 2 });
    ctrl.increment();
    expect(ctrl.getValue()).toBe(3.5);
    ctrl.decrement();
    expect(ctrl.getValue()).toBe(3.0);
  });

  test("disabled and readOnly prevent changes", () => {
    const ctrl1 = new RatingController({ value: 2, disabled: true });
    ctrl1.setValue(4);
    expect(ctrl1.getValue()).toBe(2);

    const ctrl2 = new RatingController({ value: 2, readOnly: true });
    ctrl2.setValue(4);
    expect(ctrl2.getValue()).toBe(2);
  });

  test("getItemFillPercentage", () => {
    const ctrl = new RatingController({ value: 3.5, count: 5, fractions: 2 });
    expect(ctrl.getItemFillPercentage(0)).toBe(100);
    expect(ctrl.getItemFillPercentage(1)).toBe(100);
    expect(ctrl.getItemFillPercentage(2)).toBe(100);
    expect(ctrl.getItemFillPercentage(3)).toBe(50);
    expect(ctrl.getItemFillPercentage(4)).toBe(0);

    const highlightCtrl = new RatingController({ value: 3.5, highlightSelectedOnly: true, fractions: 2 });
    expect(highlightCtrl.getItemFillPercentage(3)).toBe(100); // Math.round(3.5) = 4 -> index 3
    expect(highlightCtrl.getItemFillPercentage(2)).toBe(0);
  });

  test("keyboard handling", () => {
    const ctrl = new RatingController({ value: 2 });
    ctrl.handleKeyDown({ key: "ArrowRight", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(3);
    ctrl.handleKeyDown({ key: "Home", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(0);
    ctrl.handleKeyDown({ key: "End", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toBe(5);
  });
});
