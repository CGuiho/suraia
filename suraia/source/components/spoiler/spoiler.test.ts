/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, mock, test } from "bun:test";
import { SpoilerController } from "./spoiler";

describe("SpoilerController", () => {
  test("initial state defaults", () => {
    const ctrl = new SpoilerController();
    expect(ctrl.isExpanded()).toBe(false);
    expect(ctrl.getMaxHeight()).toBe(120);
    expect(ctrl.getControlLabel()).toBe("Show more");
  });

  test("toggle changes expanded state and calls onToggle", () => {
    const onToggle = mock((_expanded: boolean) => {});
    const ctrl = new SpoilerController({ onToggle });
    ctrl.toggle();
    expect(ctrl.isExpanded()).toBe(true);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  test("getStyle reflects collapsed and expanded height", () => {
    const ctrl = new SpoilerController({ maxHeight: 80 });
    expect(ctrl.getStyle()["--suraia-spoiler-max-height"]).toBe("80px");
    ctrl.setExpanded(true);
    expect(ctrl.getStyle()["--suraia-spoiler-max-height"]).toBe("none");
  });
});
