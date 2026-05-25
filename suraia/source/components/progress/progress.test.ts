/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { ProgressController } from "./progress";

describe("ProgressController", () => {
  test("defaults", () => {
    const ctrl = new ProgressController();
    expect(ctrl.getValue()).toBe(0);
    expect(ctrl.isStriped()).toBe(false);
    expect(ctrl.isAnimated()).toBe(false);
  });

  test("clamps value 0-100", () => {
    const ctrl = new ProgressController({ value: 150 });
    expect(ctrl.getValue()).toBe(100);
    ctrl.setValue(-10);
    expect(ctrl.getValue()).toBe(0);
  });

  test("getBarStyle returns width percentage", () => {
    const ctrl = new ProgressController({ value: 45 });
    expect(ctrl.getBarStyle()["width"]).toBe("45%");
  });

  test("getAriaAttributes", () => {
    const ctrl = new ProgressController({ value: 75 });
    const aria = ctrl.getAriaAttributes();
    expect(aria["aria-valuenow"]).toBe("75");
    expect(aria["aria-valuemin"]).toBe("0");
    expect(aria["aria-valuemax"]).toBe("100");
  });

  test("striped and animated data attributes", () => {
    const ctrl = new ProgressController({ striped: true, animated: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-striped"]).toBe("");
    expect(attrs["data-suraia-animated"]).toBe("");
  });
});
