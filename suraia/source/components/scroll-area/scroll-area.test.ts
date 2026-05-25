/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, test } from "bun:test";
import { ScrollAreaController } from "./scroll-area";

describe("ScrollAreaController", () => {
  test("initial state defaults to hover visibility", () => {
    const ctrl = new ScrollAreaController();
    expect(ctrl.getScrollbarVisibility()).toBe("hover");
  });

  test("setScrollbarVisibility updates visibility mode", () => {
    const ctrl = new ScrollAreaController({ scrollbarVisibility: "auto" });
    ctrl.setScrollbarVisibility("always");
    expect(ctrl.getScrollbarVisibility()).toBe("always");
  });

  test("calculateThumbStyles returns no thumb when content fits", () => {
    const ctrl = new ScrollAreaController();
    expect(ctrl.calculateThumbStyles(200, 150, 0)).toEqual({ size: 0, offset: 0 });
  });

  test("calculateThumbStyles maps scroll position to thumb offset", () => {
    const ctrl = new ScrollAreaController();
    expect(ctrl.calculateThumbStyles(100, 400, 150)).toEqual({ size: 25, offset: 38 });
  });

  test("getDataAttributes reflects component and visibility", () => {
    const ctrl = new ScrollAreaController({ scrollbarVisibility: "never" });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("ScrollArea");
    expect(attrs["data-suraia-scrollbar-visibility"]).toBe("never");
  });
});
