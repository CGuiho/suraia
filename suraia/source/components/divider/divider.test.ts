/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { DividerController } from "./divider";

describe("DividerController", () => {
  test("defaults", () => {
    const ctrl = new DividerController();
    expect(ctrl.getOrientation()).toBe("horizontal");
    expect(ctrl.getSize()).toBe("xs");
    expect(ctrl.hasLabel()).toBe(false);
    expect(ctrl.getLabelPosition()).toBe("center");
  });

  test("with label", () => {
    const ctrl = new DividerController({ label: "OR", labelPosition: "left" });
    expect(ctrl.hasLabel()).toBe(true);
    expect(ctrl.getLabel()).toBe("OR");
    expect(ctrl.getLabelPosition()).toBe("left");
  });

  test("vertical orientation", () => {
    const ctrl = new DividerController({ orientation: "vertical" });
    expect(ctrl.getOrientation()).toBe("vertical");
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-orientation"]).toBe("vertical");
  });

  test("getDataAttributes with label", () => {
    const ctrl = new DividerController({ label: "Section" });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-with-label"]).toBe("");
  });

  test("getDataAttributes without label", () => {
    const ctrl = new DividerController();
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-with-label"]).toBeUndefined();
  });
});
