/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { BurgerController } from "./burger";

describe("BurgerController", () => {
  test("defaults closed", () => {
    const ctrl = new BurgerController();
    expect(ctrl.isOpened()).toBe(false);
    expect(ctrl.getDataAttributes()["data-suraia-opened"]).toBeUndefined();
  });

  test("toggle opens and fires callback", () => {
    const fn = mock((_o: boolean) => {});
    const ctrl = new BurgerController({ onToggle: fn });
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(true);
    expect(fn).toHaveBeenCalledWith(true);
    expect(ctrl.getDataAttributes()["data-suraia-opened"]).toBe("");
  });

  test("toggle again closes", () => {
    const ctrl = new BurgerController({ opened: true });
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(false);
  });
});
