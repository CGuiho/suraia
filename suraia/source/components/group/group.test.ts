/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { GroupController } from "./group";

describe("GroupController", () => {
  test("defaults", () => {
    const ctrl = new GroupController();
    expect(ctrl.getGap()).toBe("md");
    expect(ctrl.getAlign()).toBe("center");
    expect(ctrl.getJustify()).toBe("flex-start");
    expect(ctrl.getWrap()).toBe("nowrap");
    expect(ctrl.isGrow()).toBe(false);
  });

  test("grow with preventGrowOverflow", () => {
    const ctrl = new GroupController({ grow: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-grow"]).toBe("");
    expect(attrs["data-suraia-prevent-grow-overflow"]).toBe("");
  });

  test("grow without preventGrowOverflow", () => {
    const ctrl = new GroupController({ grow: true, preventGrowOverflow: false });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-grow"]).toBe("");
    expect(attrs["data-suraia-prevent-grow-overflow"]).toBeUndefined();
  });

  test("getStyle returns CSS custom properties", () => {
    const ctrl = new GroupController({ gap: "8px", wrap: "wrap" });
    const style = ctrl.getStyle();
    expect(style["--suraia-group-gap"]).toBe("8px");
    expect(style["--suraia-group-wrap"]).toBe("wrap");
  });
});
