/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { BreadcrumbsController } from "./breadcrumbs";

describe("BreadcrumbsController", () => {
  test("defaults", () => {
    const ctrl = new BreadcrumbsController();
    expect(ctrl.getItems()).toEqual([]);
    expect(ctrl.getSeparator()).toBe("/");
  });

  test("isLast", () => {
    const ctrl = new BreadcrumbsController({ items: [{ label: "Home", href: "/" }, { label: "Page" }] });
    expect(ctrl.isLast(0)).toBe(false);
    expect(ctrl.isLast(1)).toBe(true);
  });
});
