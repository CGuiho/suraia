/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { OverflowListController } from "./overflow-list";

describe("OverflowListController", () => {
  const testItems = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

  test("initial states", () => {
    const ctrl = new OverflowListController({ items: testItems, visibleCount: 3 });
    expect(ctrl.getVisibleCount()).toBe(3);
    expect(ctrl.getCollapsePosition()).toBe("end");
    expect(ctrl.getOverflowCount()).toBe(2);
    expect(ctrl.getOverflowLabel()).toBe("+2 more");
  });

  test("slicing visible items at end", () => {
    const ctrl = new OverflowListController({ items: testItems, visibleCount: 3, collapsePosition: "end" });
    expect(ctrl.getVisibleItems()).toEqual(["Apple", "Banana", "Cherry"]);
    expect(ctrl.getOverflowItems()).toEqual(["Date", "Elderberry"]);
  });

  test("slicing visible items at start", () => {
    const ctrl = new OverflowListController({ items: testItems, visibleCount: 2, collapsePosition: "start" });
    expect(ctrl.getVisibleItems()).toEqual(["Date", "Elderberry"]);
    expect(ctrl.getOverflowItems()).toEqual(["Apple", "Banana", "Cherry"]);
  });

  test("no overflow when items are within limit", () => {
    const ctrl = new OverflowListController({ items: ["Apple", "Banana"], visibleCount: 5 });
    expect(ctrl.getVisibleItems().length).toBe(2);
    expect(ctrl.getOverflowCount()).toBe(0);
    expect(ctrl.getOverflowItems()).toEqual([]);
  });

  test("changing settings dynamically", () => {
    const ctrl = new OverflowListController({ items: testItems });
    ctrl.setVisibleCount(4);
    expect(ctrl.getVisibleItems().length).toBe(4);
    expect(ctrl.getOverflowCount()).toBe(1);
  });
});
