/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { GridController } from "./grid";

describe("GridController", () => {
  test("defaults", () => {
    const ctrl = new GridController();
    expect(ctrl.getColumns()).toBe(12);
    expect(ctrl.isGrow()).toBe(false);
    expect(ctrl.getStyle()["--suraia-grid-columns"]).toBe("12");
  });

  test("custom columns", () => {
    const ctrl = new GridController({ columns: 6 });
    expect(ctrl.getStyle()["--suraia-grid-columns"]).toBe("6");
  });

  test("grow data attribute", () => {
    const ctrl = new GridController({ grow: true });
    expect(ctrl.getDataAttributes()["data-suraia-grow"]).toBe("");
  });
});
