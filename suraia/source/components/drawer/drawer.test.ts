/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { DrawerController } from "./drawer";

describe("DrawerController", () => {
  test("defaults", () => {
    const ctrl = new DrawerController();
    expect(ctrl.isOpened()).toBe(false);
    expect(ctrl.getPosition()).toBe("left");
  });

  test("open and close", () => {
    const fn = mock(() => {});
    const ctrl = new DrawerController({ onClose: fn });
    ctrl.open();
    expect(ctrl.isOpened()).toBe(true);
    ctrl.close();
    expect(ctrl.isOpened()).toBe(false);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("handleOverlayClick closes", () => {
    const ctrl = new DrawerController({ opened: true });
    ctrl.handleOverlayClick();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("handleKeyDown Escape", () => {
    const ctrl = new DrawerController({ opened: true });
    ctrl.handleKeyDown({ key: "Escape" } as KeyboardEvent);
    expect(ctrl.isOpened()).toBe(false);
  });

  test("position right", () => {
    const ctrl = new DrawerController({ position: "right" });
    expect(ctrl.getPosition()).toBe("right");
  });
});
