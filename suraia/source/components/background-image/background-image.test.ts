/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { BackgroundImageController } from "./background-image";

describe("BackgroundImageController", () => {
  test("initial state", () => {
    const ctrl = new BackgroundImageController({ src: "test.png" });
    expect(ctrl.getSrc()).toBe("test.png");
    expect(ctrl.getRadius()).toBe("none");
  });

  test("initial state with options", () => {
    const ctrl = new BackgroundImageController({
      src: "test.png",
      radius: "md",
    });
    expect(ctrl.getSrc()).toBe("test.png");
    expect(ctrl.getRadius()).toBe("md");
  });

  test("setters update values", () => {
    const ctrl = new BackgroundImageController({ src: "test.png" });
    ctrl.setSrc("updated.png");
    ctrl.setRadius("lg");
    expect(ctrl.getSrc()).toBe("updated.png");
    expect(ctrl.getRadius()).toBe("lg");
  });

  test("getStyle returns url", () => {
    const ctrl = new BackgroundImageController({ src: "test.png" });
    const style = ctrl.getStyle();
    expect(style["background-image"]).toBe('url("test.png")');
  });

  test("getDataAttributes returns correct attributes", () => {
    const ctrl = new BackgroundImageController({ src: "test.png", radius: "xs" });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("BackgroundImage");
    expect(attrs["data-suraia-radius"]).toBe("xs");
  });
});
