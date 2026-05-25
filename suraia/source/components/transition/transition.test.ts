/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, test } from "bun:test";
import { TransitionController } from "./transition";

describe("TransitionController", () => {
  test("initial state defaults to unmounted fade", () => {
    const ctrl = new TransitionController();
    expect(ctrl.isMounted()).toBe(false);
    expect(ctrl.getState()).toBe("exited");
    expect(ctrl.getTransition()).toBe("fade");
  });

  test("setMounted changes state", () => {
    const ctrl = new TransitionController();
    ctrl.setMounted(true);
    expect(ctrl.isMounted()).toBe(true);
    expect(ctrl.getState()).toBe("entered");
  });

  test("keepMounted keeps node mounted while exited", () => {
    const ctrl = new TransitionController({ keepMounted: true });
    expect(ctrl.isMounted()).toBe(true);
    expect(ctrl.getState()).toBe("exited");
  });

  test("getStyle resolves transition variables", () => {
    const ctrl = new TransitionController({ transition: "slide-up", duration: 250 });
    const style = ctrl.getStyle();
    expect(style["--suraia-transition-duration"]).toBe("250ms");
    expect(style["--suraia-transition-transform"]).toBe("translateY(0.5rem)");
  });
});
