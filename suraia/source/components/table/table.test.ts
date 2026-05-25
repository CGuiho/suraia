/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { TableController } from "./table";

describe("TableController", () => {
  test("defaults", () => {
    const ctrl = new TableController();
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-striped"]).toBeUndefined();
    expect(attrs["data-suraia-with-row-borders"]).toBe("");
  });

  test("striped and hover", () => {
    const ctrl = new TableController({ striped: true, highlightOnHover: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-striped"]).toBe("");
    expect(attrs["data-suraia-highlight-on-hover"]).toBe("");
  });

  test("all borders", () => {
    const ctrl = new TableController({ withTableBorder: true, withColumnBorders: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-with-table-border"]).toBe("");
    expect(attrs["data-suraia-with-column-borders"]).toBe("");
  });

  test("sticky header", () => {
    const ctrl = new TableController({ stickyHeader: true });
    expect(ctrl.getDataAttributes()["data-suraia-sticky-header"]).toBe("");
  });
});
