/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { CollapseController } from "./collapse";

describe("CollapseController", () => {
  test("defaults", () => {
    const ctrl = new CollapseController();
    expect(ctrl.isOpened()).toBe(false);
    expect(ctrl.getTransitionDuration()).toBe(200);
    expect(ctrl.getTransitionTimingFunction()).toBe("ease");
  });

  test("toggle opens and closes", () => {
    const ctrl = new CollapseController();
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(true);
    ctrl.toggle();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("getStyle compiles duration and timing", () => {
    const ctrl = new CollapseController({ transitionDuration: 300, transitionTimingFunction: "ease-in-out" });
    const style = ctrl.getStyle();
    expect(style["--suraia-collapse-duration"]).toBe("300ms");
    expect(style["--suraia-collapse-timing"]).toBe("ease-in-out");
  });

  test("getDataAttributes reflects opened state", () => {
    const ctrl = new CollapseController({ opened: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-opened"]).toBe("");
  });

  test("animate open triggers transitions", () => {
    const fn = mock(() => {});
    const ctrl = new CollapseController({ opened: true, onTransitionEnd: fn });
    
    const listeners: Record<string, Function[]> = {};
    const mockElement = {
      scrollHeight: 150,
      offsetHeight: 150,
      style: { height: "" },
      setAttribute: mock(() => {}),
      addEventListener: mock((event: string, cb: Function) => {
        listeners[event] = listeners[event] || [];
        listeners[event]!.push(cb);
      }),
      removeEventListener: mock((event: string, cb: Function) => {
        const list = listeners[event] || [];
        const index = list.indexOf(cb);
        if (index > -1) list.splice(index, 1);
      }),
    } as unknown as HTMLElement;

    ctrl.animate(mockElement);
    expect(mockElement.style.height).toBe("150px");
    expect(mockElement.setAttribute).toHaveBeenCalledWith("aria-hidden", "false");
    
    const cb = listeners["transitionend"]?.[0];
    if (cb) cb();
    
    expect(mockElement.style.height).toBe("auto");
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
