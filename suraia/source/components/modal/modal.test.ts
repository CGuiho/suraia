/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { ModalController } from "./modal";

describe("ModalController", () => {
  test("defaults", () => {
    const ctrl = new ModalController();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("open and close", () => {
    const fn = mock(() => {});
    const ctrl = new ModalController({ onClose: fn });
    ctrl.open();
    expect(ctrl.isOpened()).toBe(true);
    ctrl.close();
    expect(ctrl.isOpened()).toBe(false);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("handleOverlayClick closes when closeOnClickOutside is true", () => {
    const ctrl = new ModalController({ opened: true });
    ctrl.handleOverlayClick();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("handleOverlayClick does nothing when closeOnClickOutside is false", () => {
    const ctrl = new ModalController({ opened: true, closeOnClickOutside: false });
    ctrl.handleOverlayClick();
    expect(ctrl.isOpened()).toBe(true);
  });

  test("handleKeyDown Escape closes modal", () => {
    const ctrl = new ModalController({ opened: true });
    const event = { key: "Escape" } as KeyboardEvent;
    ctrl.handleKeyDown(event);
    expect(ctrl.isOpened()).toBe(false);
  });

  test("handleKeyDown Escape does nothing when closeOnEscape is false", () => {
    const ctrl = new ModalController({ opened: true, closeOnEscape: false });
    const event = { key: "Escape" } as KeyboardEvent;
    ctrl.handleKeyDown(event);
    expect(ctrl.isOpened()).toBe(true);
  });

  test("getDataAttributes reflects opened state", () => {
    const ctrl = new ModalController({ opened: true });
    expect(ctrl.getDataAttributes()["data-suraia-opened"]).toBe("");
    ctrl.close();
    expect(ctrl.getDataAttributes()["data-suraia-opened"]).toBeUndefined();
  });
});
