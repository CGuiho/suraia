/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, mock, test } from "bun:test";
import { FloatingWindowController } from "./floating-window";

describe("FloatingWindowController", () => {
  test("initial state defaults", () => {
    const ctrl = new FloatingWindowController();
    expect(ctrl.isOpened()).toBe(false);
    expect(ctrl.getSize()).toEqual({ width: 360, height: 240 });
  });

  test("open close and toggle call onOpenChange", () => {
    const onOpenChange = mock((_opened: boolean) => {});
    const ctrl = new FloatingWindowController({ onOpenChange });
    ctrl.open();
    expect(ctrl.isOpened()).toBe(true);
    ctrl.close();
    expect(ctrl.isOpened()).toBe(false);
    expect(onOpenChange).toHaveBeenCalledTimes(2);
  });

  test("moveBy changes position", () => {
    const ctrl = new FloatingWindowController({ position: { x: 10, y: 20 } });
    ctrl.moveBy({ x: 5, y: -10 });
    expect(ctrl.getPosition()).toEqual({ x: 15, y: 10 });
  });

  test("setSize clamps to min and max", () => {
    const ctrl = new FloatingWindowController({
      minSize: { width: 100, height: 100 },
      maxSize: { width: 300, height: 300 },
    });
    ctrl.setSize({ width: 20, height: 400 });
    expect(ctrl.getSize()).toEqual({ width: 100, height: 300 });
  });
});
