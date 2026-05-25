/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { TextController } from "./text";

describe("TextController", () => {
  test("initial state defaults", () => {
    const ctrl = new TextController();
    expect(ctrl.getSize()).toBe("md");
    expect(ctrl.getVariant()).toBe("text");
    expect(ctrl.getTruncate()).toBeUndefined();
    expect(ctrl.getLineClamp()).toBeUndefined();
    expect(ctrl.isInline()).toBe(false);
    expect(ctrl.isInherit()).toBe(false);
    expect(ctrl.isSpan()).toBe(false);
    expect(ctrl.getTagName()).toBe("p");
  });

  test("initial state with options", () => {
    const ctrl = new TextController({
      size: "lg",
      variant: "gradient",
      truncate: "start",
      lineClamp: 3,
      inline: true,
      inherit: true,
      span: true,
    });
    expect(ctrl.getSize()).toBe("lg");
    expect(ctrl.getVariant()).toBe("gradient");
    expect(ctrl.getTruncate()).toBe("start");
    expect(ctrl.getLineClamp()).toBe(3);
    expect(ctrl.isInline()).toBe(true);
    expect(ctrl.isInherit()).toBe(true);
    expect(ctrl.isSpan()).toBe(true);
    expect(ctrl.getTagName()).toBe("span");
  });

  test("setSize updates size", () => {
    const ctrl = new TextController();
    ctrl.setSize("xl");
    expect(ctrl.getSize()).toBe("xl");
  });

  test("setVariant updates variant", () => {
    const ctrl = new TextController();
    ctrl.setVariant("gradient");
    expect(ctrl.getVariant()).toBe("gradient");
  });

  test("setTruncate updates truncate", () => {
    const ctrl = new TextController();
    ctrl.setTruncate("end");
    expect(ctrl.getTruncate()).toBe("end");
    ctrl.setTruncate(undefined);
    expect(ctrl.getTruncate()).toBeUndefined();
  });

  test("setLineClamp updates lineClamp", () => {
    const ctrl = new TextController();
    ctrl.setLineClamp(5);
    expect(ctrl.getLineClamp()).toBe(5);
  });

  test("getDataAttributes returns correct attributes", () => {
    const ctrl = new TextController({ size: "sm", truncate: "end" });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("Text");
    expect(attrs["data-suraia-size"]).toBe("sm");
    expect(attrs["data-suraia-variant"]).toBe("text");
    expect(attrs["data-suraia-truncate"]).toBe("end");
    expect(attrs["data-suraia-line-clamp"]).toBeUndefined();
  });
});
