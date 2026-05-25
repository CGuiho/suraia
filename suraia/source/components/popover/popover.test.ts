/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { PopoverController } from "./popover";

describe("PopoverController", () => {
  test("defaults", () => {
    const ctrl = new PopoverController();
    expect(ctrl.isOpened()).toBe(false);
    expect(ctrl.getPosition()).toBe("bottom");
    expect(ctrl.hasArrow()).toBe(true);
    expect(ctrl.getOffset()).toBe(8);
  });

  test("open and close triggers callbacks", () => {
    const onOpen = mock(() => {});
    const onClose = mock(() => {});
    const ctrl = new PopoverController({ onOpen, onClose });

    ctrl.open();
    expect(ctrl.isOpened()).toBe(true);
    expect(onOpen).toHaveBeenCalledTimes(1);

    ctrl.close();
    expect(ctrl.isOpened()).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("toggle changes state", () => {
    const ctrl = new PopoverController();
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(true);
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("handleDocumentClick outside closes popover", () => {
    const ctrl = new PopoverController({ opened: true });
    
    const mockTarget = { contains: () => false } as unknown as HTMLElement;
    const mockPopover = { contains: () => false } as unknown as HTMLElement;
    
    const mockEvent = {
      target: {}
    } as unknown as MouseEvent;

    ctrl.handleDocumentClick(mockEvent, mockTarget, mockPopover);
    expect(ctrl.isOpened()).toBe(false);
  });

  test("handleDocumentClick inside does not close", () => {
    const ctrl = new PopoverController({ opened: true });
    
    const mockTarget = { contains: () => false } as unknown as HTMLElement;
    const mockPopover = { contains: () => true } as unknown as HTMLElement;
    
    const mockEvent = {
      target: {}
    } as unknown as MouseEvent;

    ctrl.handleDocumentClick(mockEvent, mockTarget, mockPopover);
    expect(ctrl.isOpened()).toBe(true);
  });

  test("handleKeyDown Escape closes popover", () => {
    const ctrl = new PopoverController({ opened: true });
    ctrl.handleKeyDown({ key: "Escape" } as KeyboardEvent);
    expect(ctrl.isOpened()).toBe(false);
  });
});
