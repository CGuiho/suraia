/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { NavLinkController } from "./nav-link";

describe("NavLinkController", () => {
  test("defaults", () => {
    const ctrl = new NavLinkController();
    expect(ctrl.isActive()).toBe(false);
    expect(ctrl.isOpened()).toBe(false);
    expect(ctrl.isDisabled()).toBe(false);
  });

  test("toggle opens children", () => {
    const fn = mock((_o: boolean) => {});
    const ctrl = new NavLinkController({ hasChildren: true, onChange: fn });
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(true);
    expect(fn).toHaveBeenCalledWith(true);
  });

  test("toggle does nothing without children", () => {
    const ctrl = new NavLinkController();
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("toggle does nothing when disabled", () => {
    const ctrl = new NavLinkController({ hasChildren: true, disabled: true });
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("setActive", () => {
    const ctrl = new NavLinkController();
    ctrl.setActive(true);
    expect(ctrl.isActive()).toBe(true);
  });
});
