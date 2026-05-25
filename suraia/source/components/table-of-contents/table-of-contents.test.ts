/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { TableOfContentsController } from "./table-of-contents";

describe("TableOfContentsController", () => {
  const headings = [
    { id: "intro", text: "Introduction", level: 2 },
    { id: "usage", text: "Usage Guidelines", level: 2 },
    { id: "details", text: "Advanced Details", level: 3 },
  ];

  test("initial states and default headings", () => {
    const ctrl = new TableOfContentsController({ headings, activeId: "intro" });
    expect(ctrl.getHeadings()).toBe(headings);
    expect(ctrl.getActiveId()).toBe("intro");
    expect(ctrl.isHeadingActive("intro")).toBe(true);
    expect(ctrl.isHeadingActive("details")).toBe(false);
  });

  test("setActiveId triggers callback and updates active status", () => {
    const fn = mock((_id: string | null) => {});
    const ctrl = new TableOfContentsController({ headings, activeId: "intro", onChange: fn });
    ctrl.setActiveId("details");
    expect(ctrl.getActiveId()).toBe("details");
    expect(ctrl.isHeadingActive("intro")).toBe(false);
    expect(ctrl.isHeadingActive("details")).toBe(true);
    expect(fn).toHaveBeenCalledWith("details");
  });

  test("setHeadings replaces structure data", () => {
    const ctrl = new TableOfContentsController();
    const newHeadings = [{ id: "one", text: "One", level: 2 }];
    ctrl.setHeadings(newHeadings);
    expect(ctrl.getHeadings()).toEqual(newHeadings);
  });
});
