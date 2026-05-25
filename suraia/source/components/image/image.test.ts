/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { ImageController } from "./image";

describe("ImageController", () => {
  test("initial state defaults", () => {
    const ctrl = new ImageController({ src: "original.jpg" });
    expect(ctrl.getSrc()).toBe("original.jpg");
    expect(ctrl.getAlt()).toBe("");
    expect(ctrl.getFit()).toBe("cover");
    expect(ctrl.getRadius()).toBe("none");
    expect(ctrl.isError()).toBe(false);
  });

  test("initial state with options", () => {
    const ctrl = new ImageController({
      src: "original.jpg",
      alt: "alternative text",
      fit: "contain",
      radius: "md",
      fallbackSrc: "fallback.jpg",
    });
    expect(ctrl.getSrc()).toBe("original.jpg");
    expect(ctrl.getAlt()).toBe("alternative text");
    expect(ctrl.getFit()).toBe("contain");
    expect(ctrl.getRadius()).toBe("md");
    expect(ctrl.getFallbackSrc()).toBe("fallback.jpg");
  });

  test("setters update values", () => {
    const ctrl = new ImageController({ src: "original.jpg" });
    ctrl.setSrc("new.jpg");
    ctrl.setAlt("new alt");
    ctrl.setFit("fill");
    ctrl.setRadius("lg");
    ctrl.setFallbackSrc("new_fallback.jpg");
    expect(ctrl.getSrc()).toBe("new.jpg");
    expect(ctrl.getAlt()).toBe("new alt");
    expect(ctrl.getFit()).toBe("fill");
    expect(ctrl.getRadius()).toBe("lg");
    expect(ctrl.getFallbackSrc()).toBe("new_fallback.jpg");
  });

  test("handleError returns fallbackSrc", () => {
    const ctrl = new ImageController({
      src: "original.jpg",
      fallbackSrc: "fallback.jpg",
    });
    expect(ctrl.getSrc()).toBe("original.jpg");
    ctrl.handleError();
    expect(ctrl.isError()).toBe(true);
    expect(ctrl.getSrc()).toBe("fallback.jpg");
  });

  test("getDataAttributes returns correct attributes", () => {
    const ctrl = new ImageController({ src: "original.jpg", radius: "xl", fit: "contain" });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("Image");
    expect(attrs["data-suraia-radius"]).toBe("xl");
    expect(attrs["data-suraia-fit"]).toBe("contain");
    expect(attrs["data-suraia-error"]).toBeUndefined();

    ctrl.handleError();
    const attrsError = ctrl.getDataAttributes();
    expect(attrsError["data-suraia-error"]).toBe("");
  });
});
