/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { MenuController } from "./menu";

describe("MenuController", () => {
  test("defaults", () => {
    const ctrl = new MenuController();
    expect(ctrl.isOpened()).toBe(false);
    expect(ctrl.getHoveredIndex()).toBe(-1);
  });

  test("toggle", () => {
    const ctrl = new MenuController();
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(true);
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("hoverNext wraps", () => {
    const ctrl = new MenuController();
    ctrl.setItemCount(3);
    ctrl.open();
    ctrl.hoverNext(); expect(ctrl.getHoveredIndex()).toBe(0);
    ctrl.hoverNext(); expect(ctrl.getHoveredIndex()).toBe(1);
    ctrl.hoverNext(); expect(ctrl.getHoveredIndex()).toBe(2);
    ctrl.hoverNext(); expect(ctrl.getHoveredIndex()).toBe(0);
  });

  test("selectItem closes when closeOnItemClick", () => {
    const ctrl = new MenuController({ opened: true });
    ctrl.setItemCount(3);
    ctrl.hoverNext();
    ctrl.selectItem();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("keyboard ArrowDown opens then navigates", () => {
    const ctrl = new MenuController();
    ctrl.setItemCount(3);
    const event = { key: "ArrowDown", preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    ctrl.handleKeyDown(event);
    expect(ctrl.isOpened()).toBe(true);
    ctrl.handleKeyDown(event);
    expect(ctrl.getHoveredIndex()).toBe(0);
  });

  test("keyboard Escape closes", () => {
    const ctrl = new MenuController({ opened: true });
    ctrl.handleKeyDown({ key: "Escape" } as KeyboardEvent);
    expect(ctrl.isOpened()).toBe(false);
  });
});
