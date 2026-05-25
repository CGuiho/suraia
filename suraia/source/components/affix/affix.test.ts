/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { AffixController } from "./affix";

describe("AffixController", () => {
  test("defaults", () => {
    const ctrl = new AffixController();
    expect(ctrl.getTop()).toBeUndefined();
    expect(ctrl.getBottom()).toBeUndefined();
    expect(ctrl.getLeft()).toBeUndefined();
    expect(ctrl.getRight()).toBeUndefined();
    expect(ctrl.getZIndex()).toBe(100);
  });

  test("getStyle with numerical offsets", () => {
    const ctrl = new AffixController({ bottom: 20, right: 30, zIndex: 200 });
    const style = ctrl.getStyle();
    expect(style["--suraia-affix-bottom"]).toBe("20px");
    expect(style["--suraia-affix-right"]).toBe("30px");
    expect(style["--suraia-affix-z-index"]).toBe("200");
    expect(style["--suraia-affix-top"]).toBeUndefined();
  });

  test("getStyle with string values", () => {
    const ctrl = new AffixController({ top: "2rem", left: "10%" });
    const style = ctrl.getStyle();
    expect(style["--suraia-affix-top"]).toBe("2rem");
    expect(style["--suraia-affix-left"]).toBe("10%");
  });
});
