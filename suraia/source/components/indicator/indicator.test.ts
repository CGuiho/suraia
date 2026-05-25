/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { IndicatorController } from "./indicator";

describe("IndicatorController", () => {
  test("initial state defaults", () => {
    const ctrl = new IndicatorController();
    expect(ctrl.getPosition()).toBe("top-end");
    expect(ctrl.getSize()).toBe("md");
    expect(ctrl.getColor()).toBe("primary");
    expect(ctrl.getRadius()).toBe("full");
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.isProcessing()).toBe(false);
    expect(ctrl.isInline()).toBe(true);
    expect(ctrl.isWithBorder()).toBe(false);
  });

  test("initial state with options", () => {
    const ctrl = new IndicatorController({
      position: "bottom-start",
      size: "lg",
      color: "error",
      radius: "md",
      disabled: true,
      processing: true,
      inline: false,
      withBorder: true,
    });
    expect(ctrl.getPosition()).toBe("bottom-start");
    expect(ctrl.getSize()).toBe("lg");
    expect(ctrl.getColor()).toBe("error");
    expect(ctrl.getRadius()).toBe("md");
    expect(ctrl.isDisabled()).toBe(true);
    expect(ctrl.isProcessing()).toBe(true);
    expect(ctrl.isInline()).toBe(false);
    expect(ctrl.isWithBorder()).toBe(true);
  });

  test("setters update values", () => {
    const ctrl = new IndicatorController();
    ctrl.setPosition("top-start");
    ctrl.setSize("sm");
    ctrl.setColor("warning");
    ctrl.setRadius("xs");
    ctrl.setDisabled(true);
    ctrl.setProcessing(true);
    ctrl.setInline(false);
    ctrl.setWithBorder(true);
    expect(ctrl.getPosition()).toBe("top-start");
    expect(ctrl.getSize()).toBe("sm");
    expect(ctrl.getColor()).toBe("warning");
    expect(ctrl.getRadius()).toBe("xs");
    expect(ctrl.isDisabled()).toBe(true);
    expect(ctrl.isProcessing()).toBe(true);
    expect(ctrl.isInline()).toBe(false);
    expect(ctrl.isWithBorder()).toBe(true);
  });

  test("getDataAttributes returns correct attributes for root", () => {
    const ctrl = new IndicatorController({ inline: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("Indicator");
    expect(attrs["data-suraia-inline"]).toBe("");

    const ctrl2 = new IndicatorController({ inline: false });
    const attrs2 = ctrl2.getDataAttributes();
    expect(attrs2["data-suraia-inline"]).toBeUndefined();
  });

  test("getIndicatorDataAttributes returns correct attributes for dot", () => {
    const ctrl = new IndicatorController({
      position: "top-end",
      size: "md",
      radius: "full",
      disabled: true,
      processing: true,
      withBorder: true,
    });
    const attrs = ctrl.getIndicatorDataAttributes();
    expect(attrs["data-suraia-position"]).toBe("top-end");
    expect(attrs["data-suraia-size"]).toBe("md");
    expect(attrs["data-suraia-radius"]).toBe("full");
    expect(attrs["data-suraia-disabled"]).toBe("");
    expect(attrs["data-suraia-processing"]).toBe("");
    expect(attrs["data-suraia-border"]).toBe("");
  });
});
