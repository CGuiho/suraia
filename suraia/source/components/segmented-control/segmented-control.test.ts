/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { SegmentedControlController } from "./segmented-control";

describe("SegmentedControlController", () => {
  const data = ["list", "grid", "gallery"];

  test("defaults to first item", () => {
    const ctrl = new SegmentedControlController({ data });
    expect(ctrl.getValue()).toBe("list");
    expect(ctrl.isActive("list")).toBe(true);
    expect(ctrl.isActive("grid")).toBe(false);
  });

  test("setValue changes active", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new SegmentedControlController({ data, onChange: fn });
    ctrl.setValue("grid");
    expect(ctrl.getValue()).toBe("grid");
    expect(fn).toHaveBeenCalledWith("grid");
  });

  test("setValue ignores same value", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new SegmentedControlController({ data, onChange: fn });
    ctrl.setValue("list");
    expect(fn).not.toHaveBeenCalled();
  });

  test("setValue does nothing when disabled", () => {
    const ctrl = new SegmentedControlController({ data, disabled: true });
    ctrl.setValue("grid");
    expect(ctrl.getValue()).toBe("list");
  });

  test("selectNext wraps", () => {
    const ctrl = new SegmentedControlController({ data, value: "gallery" });
    ctrl.selectNext();
    expect(ctrl.getValue()).toBe("list");
  });

  test("selectPrev wraps", () => {
    const ctrl = new SegmentedControlController({ data, value: "list" });
    ctrl.selectPrev();
    expect(ctrl.getValue()).toBe("gallery");
  });
});
