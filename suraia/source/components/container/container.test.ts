/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { ContainerController } from "./container";

describe("ContainerController", () => {
  test("defaults", () => {
    const ctrl = new ContainerController();
    expect(ctrl.getSize()).toBe("md");
    expect(ctrl.isFluid()).toBe(false);
    expect(ctrl.getDataAttributes()["data-suraia-fluid"]).toBeUndefined();
  });

  test("fluid", () => {
    const ctrl = new ContainerController({ fluid: true });
    expect(ctrl.isFluid()).toBe(true);
    expect(ctrl.getDataAttributes()["data-suraia-fluid"]).toBe("");
  });

  test("custom size", () => {
    const ctrl = new ContainerController({ size: "xl" });
    expect(ctrl.getDataAttributes()["data-suraia-size"]).toBe("xl");
  });
});
