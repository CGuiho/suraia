/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { HoverCardController } from "./hover-card";

describe("HoverCardController", () => {
  test("defaults", () => {
    const ctrl = new HoverCardController();
    expect(ctrl.isOpened()).toBe(false);
    expect(ctrl.getOpenDelay()).toBe(300);
    expect(ctrl.getCloseDelay()).toBe(400);
    expect(ctrl.getPosition()).toBe("bottom");
    expect(ctrl.hasArrow()).toBe(false);
  });

  test("open and close without delays", () => {
    const ctrl = new HoverCardController({ openDelay: 0, closeDelay: 0 });
    ctrl.open();
    expect(ctrl.isOpened()).toBe(true);
    ctrl.close();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("open with delay using setTimeout", async () => {
    const onOpen = mock(() => {});
    const ctrl = new HoverCardController({ openDelay: 10, onOpen });
    
    ctrl.open();
    expect(ctrl.isOpened()).toBe(false);
    
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(ctrl.isOpened()).toBe(true);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test("close with delay using setTimeout", async () => {
    const onClose = mock(() => {});
    const ctrl = new HoverCardController({ opened: true, closeDelay: 10, onClose });
    
    ctrl.close();
    expect(ctrl.isOpened()).toBe(true);
    
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(ctrl.isOpened()).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("cancel clears timers", () => {
    const ctrl = new HoverCardController({ openDelay: 1000 });
    ctrl.open();
    ctrl.cancel();
    expect(ctrl.isOpened()).toBe(false);
  });
});
