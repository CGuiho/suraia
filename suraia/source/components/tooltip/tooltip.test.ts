/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { TooltipController } from "./tooltip";

describe("TooltipController", () => {
  test("defaults", () => {
    const ctrl = new TooltipController();
    expect(ctrl.getLabel()).toBe("");
    expect(ctrl.getPosition()).toBe("top");
    expect(ctrl.hasArrow()).toBe(false);
    expect(ctrl.isOpened()).toBe(false);
  });

  test("open/close without delay", () => {
    const ctrl = new TooltipController();
    ctrl.open();
    expect(ctrl.isOpened()).toBe(true);
    ctrl.close();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("with options", () => {
    const ctrl = new TooltipController({ label: "Help", position: "bottom", withArrow: true });
    expect(ctrl.getLabel()).toBe("Help");
    expect(ctrl.getPosition()).toBe("bottom");
    expect(ctrl.hasArrow()).toBe(true);
  });

  test("destroy clears timers", () => {
    const ctrl = new TooltipController({ openDelay: 1000 });
    ctrl.open();
    ctrl.destroy();
    // Should not throw
    expect(ctrl.isOpened()).toBe(false);
  });
});
