/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { StackController } from "./stack";

describe("StackController", () => {
  test("defaults", () => {
    const ctrl = new StackController();
    expect(ctrl.getGap()).toBe("md");
    expect(ctrl.getAlign()).toBe("stretch");
    expect(ctrl.getJustify()).toBe("flex-start");
  });

  test("custom options", () => {
    const ctrl = new StackController({ gap: "xl", align: "center", justify: "space-between" });
    expect(ctrl.getGap()).toBe("xl");
    expect(ctrl.getAlign()).toBe("center");
    expect(ctrl.getJustify()).toBe("space-between");
  });

  test("getStyle returns CSS custom properties", () => {
    const ctrl = new StackController({ gap: "8px" });
    const style = ctrl.getStyle();
    expect(style["--suraia-stack-gap"]).toBe("8px");
    expect(style["--suraia-stack-align"]).toBe("stretch");
  });

  test("setters update values", () => {
    const ctrl = new StackController();
    ctrl.setGap("lg");
    ctrl.setAlign("flex-end");
    ctrl.setJustify("center");
    expect(ctrl.getGap()).toBe("lg");
    expect(ctrl.getAlign()).toBe("flex-end");
    expect(ctrl.getJustify()).toBe("center");
  });
});
