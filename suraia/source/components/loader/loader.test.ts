/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { LoaderController } from "./loader";

describe("LoaderController", () => {
  test("defaults", () => {
    const ctrl = new LoaderController();
    expect(ctrl.getType()).toBe("oval");
    expect(ctrl.getSize()).toBe("md");
    expect(ctrl.getColor()).toBe("primary");
    expect(ctrl.getClassName()).toBe("suraia-loader suraia-loader-oval");
    expect(ctrl.getChildCount()).toBe(0);
  });

  test("bars type", () => {
    const ctrl = new LoaderController({ type: "bars" });
    expect(ctrl.getClassName()).toBe("suraia-loader suraia-loader-bars");
    expect(ctrl.getChildCount()).toBe(4);
  });

  test("dots type", () => {
    const ctrl = new LoaderController({ type: "dots" });
    expect(ctrl.getChildCount()).toBe(3);
  });
});
