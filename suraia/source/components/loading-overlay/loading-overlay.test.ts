/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { LoadingOverlayController } from "./loading-overlay";

describe("LoadingOverlayController", () => {
  test("defaults", () => {
    const ctrl = new LoadingOverlayController();
    expect(ctrl.isVisible()).toBe(false);
    expect(ctrl.getBlur()).toBe(0);
    expect(ctrl.getOverlayOpacity()).toBe(0.6);
    expect(ctrl.getOverlayColor()).toBe("#fff");
    expect(ctrl.getZIndex()).toBe(400);
  });

  test("show, hide, and toggle", () => {
    const ctrl = new LoadingOverlayController();
    ctrl.show();
    expect(ctrl.isVisible()).toBe(true);
    ctrl.hide();
    expect(ctrl.isVisible()).toBe(false);
    ctrl.toggle();
    expect(ctrl.isVisible()).toBe(true);
  });

  test("getStyle handles 3-digit hex", () => {
    const ctrl = new LoadingOverlayController({ overlayColor: "#000", overlayOpacity: 0.5, blur: 5, zIndex: 500 });
    const style = ctrl.getStyle();
    expect(style["--suraia-loading-overlay-bg"]).toBe("rgba(0, 0, 0, 0.5)");
    expect(style["--suraia-loading-overlay-blur"]).toBe("5px");
    expect(style["--suraia-loading-overlay-z-index"]).toBe("500");
  });

  test("getStyle handles 6-digit hex", () => {
    const ctrl = new LoadingOverlayController({ overlayColor: "#ffffff", overlayOpacity: 0.8 });
    const style = ctrl.getStyle();
    expect(style["--suraia-loading-overlay-bg"]).toBe("rgba(255, 255, 255, 0.8)");
  });

  test("getDataAttributes reflects visible state", () => {
    const ctrl = new LoadingOverlayController({ visible: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-visible"]).toBe("");
  });
});
