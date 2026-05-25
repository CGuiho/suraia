/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, mock, test } from "bun:test";
import { ScrollerController } from "./scroller";

describe("ScrollerController", () => {
  test("initial state clamps index", () => {
    const ctrl = new ScrollerController({ itemCount: 5, visibleCount: 2, index: 10 });
    expect(ctrl.getIndex()).toBe(3);
  });

  test("scrollNext and scrollPrevious update index", () => {
    const onChange = mock((_index: number) => {});
    const ctrl = new ScrollerController({ itemCount: 5, visibleCount: 2, onChange });
    ctrl.scrollNext();
    expect(ctrl.getIndex()).toBe(1);
    ctrl.scrollPrevious();
    expect(ctrl.getIndex()).toBe(0);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test("loop wraps at boundaries", () => {
    const ctrl = new ScrollerController({ itemCount: 3, visibleCount: 1, loop: true });
    ctrl.scrollPrevious();
    expect(ctrl.getIndex()).toBe(2);
    ctrl.scrollNext();
    expect(ctrl.getIndex()).toBe(0);
  });

  test("getTrackStyle uses visible count for percentage offset", () => {
    const ctrl = new ScrollerController({ itemCount: 5, visibleCount: 2, index: 2 });
    expect(ctrl.getTrackStyle()["--suraia-scroller-offset"]).toBe("-100%");
  });
});
