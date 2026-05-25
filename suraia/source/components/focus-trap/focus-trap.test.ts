/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { FocusTrapController } from "./focus-trap";

describe("FocusTrapController", () => {
  test("initial states", () => {
    const ctrl = new FocusTrapController({ active: false });
    expect(ctrl.isActive()).toBe(false);
    ctrl.setActive(true);
    expect(ctrl.isActive()).toBe(true);
  });

  test("findFocusableElements returns matching elements", () => {
    const ctrl = new FocusTrapController();
    const container = {
      querySelectorAll: mock((_selector: string) => [
        {
          tabIndex: 0,
          getBoundingClientRect: () => ({ width: 10, height: 10 }),
        },
        {
          tabIndex: -1,
          getBoundingClientRect: () => ({ width: 10, height: 10 }),
        },
      ]),
    } as unknown as HTMLElement;

    Object.defineProperty(globalThis, "window", {
      value: {
        getComputedStyle: () => ({ visibility: "visible" }),
      },
      configurable: true,
    });

    const res = ctrl.findFocusableElements(container);
    expect(res.length).toBe(1);
  });

  test("handleTabKey wraps forward and backward", () => {
    const ctrl = new FocusTrapController();
    const el1 = { focus: mock(() => {}) } as unknown as HTMLElement;
    const el2 = { focus: mock(() => {}) } as unknown as HTMLElement;
    const container = {} as HTMLElement;

    ctrl.findFocusableElements = () => [el1, el2];

    const evTab = { key: "Tab", shiftKey: false, preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    
    Object.defineProperty(globalThis, "document", {
      value: {
        activeElement: el2,
      },
      writable: true,
      configurable: true,
    });

    const handled = ctrl.handleTabKey(evTab, container);
    expect(handled).toBe(true);
    expect(el1.focus).toHaveBeenCalled();
    expect(evTab.preventDefault).toHaveBeenCalled();

    const evShiftTab = { key: "Tab", shiftKey: true, preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    
    Object.defineProperty(globalThis, "document", {
      value: {
        activeElement: el1,
      },
      writable: true,
      configurable: true,
    });

    const handledShift = ctrl.handleTabKey(evShiftTab, container);
    expect(handledShift).toBe(true);
    expect(el2.focus).toHaveBeenCalled();
  });
});
