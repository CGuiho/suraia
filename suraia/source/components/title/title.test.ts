/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { TitleController } from "./title";

describe("TitleController", () => {
  test("initial state defaults", () => {
    const ctrl = new TitleController();
    expect(ctrl.getOrder()).toBe(1);
    expect(ctrl.getSize()).toBeUndefined();
    expect(ctrl.getTagName()).toBe("h1");
    expect(ctrl.getVisualSize()).toBe("h1");
    expect(ctrl.isTruncate()).toBe(false);
    expect(ctrl.getLineClamp()).toBeUndefined();
  });

  test("initial state with options", () => {
    const ctrl = new TitleController({ order: 3, size: "h5", truncate: true, lineClamp: 2 });
    expect(ctrl.getOrder()).toBe(3);
    expect(ctrl.getSize()).toBe("h5");
    expect(ctrl.getTagName()).toBe("h3");
    expect(ctrl.getVisualSize()).toBe("h5");
    expect(ctrl.isTruncate()).toBe(true);
    expect(ctrl.getLineClamp()).toBe(2);
  });

  test("setOrder updates tag name", () => {
    const ctrl = new TitleController();
    ctrl.setOrder(4);
    expect(ctrl.getOrder()).toBe(4);
    expect(ctrl.getTagName()).toBe("h4");
  });

  test("setSize overrides visual size without changing order", () => {
    const ctrl = new TitleController({ order: 2 });
    ctrl.setSize("h6");
    expect(ctrl.getOrder()).toBe(2);
    expect(ctrl.getTagName()).toBe("h2");
    expect(ctrl.getVisualSize()).toBe("h6");
  });

  test("getDataAttributes returns correct attributes", () => {
    const ctrl = new TitleController({ order: 2, size: "h4" });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("Title");
    expect(attrs["data-suraia-order"]).toBe("2");
    expect(attrs["data-suraia-size"]).toBe("h4");
    expect(attrs["data-suraia-truncate"]).toBeUndefined();
  });
});
