/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { PaginationController } from "./pagination";

describe("PaginationController", () => {
  test("defaults", () => {
    const ctrl = new PaginationController({ total: 10 });
    expect(ctrl.getValue()).toBe(1);
    expect(ctrl.getTotal()).toBe(10);
    expect(ctrl.canPrev()).toBe(false);
    expect(ctrl.canNext()).toBe(true);
  });

  test("next and prev", () => {
    const fn = mock((_p: number) => {});
    const ctrl = new PaginationController({ total: 10, onChange: fn });
    ctrl.next();
    expect(ctrl.getValue()).toBe(2);
    expect(fn).toHaveBeenCalledWith(2);
    ctrl.prev();
    expect(ctrl.getValue()).toBe(1);
  });

  test("clamps to boundaries", () => {
    const ctrl = new PaginationController({ total: 5, value: 5 });
    ctrl.next();
    expect(ctrl.getValue()).toBe(5);
    ctrl.setPage(1);
    ctrl.prev();
    expect(ctrl.getValue()).toBe(1);
  });

  test("first and last", () => {
    const ctrl = new PaginationController({ total: 20, value: 10 });
    ctrl.first();
    expect(ctrl.getValue()).toBe(1);
    ctrl.last();
    expect(ctrl.getValue()).toBe(20);
  });

  test("getRange for small total", () => {
    const ctrl = new PaginationController({ total: 5, value: 3 });
    expect(ctrl.getRange()).toEqual([1, 2, 3, 4, 5]);
  });

  test("getRange includes dots for large total", () => {
    const ctrl = new PaginationController({ total: 20, value: 10 });
    const range = ctrl.getRange();
    expect(range).toContain("dots");
    expect(range[0]).toBe(1);
    expect(range[range.length - 1]).toBe(20);
    expect(range).toContain(10);
  });
});
