/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { AccordionController } from "./accordion";

describe("AccordionController", () => {
  const items = ["section-1", "section-2", "section-3"];

  test("defaults all closed", () => {
    const ctrl = new AccordionController({ items });
    expect(ctrl.getOpenItems()).toEqual([]);
    expect(ctrl.isOpen("section-1")).toBe(false);
  });

  test("toggle opens an item", () => {
    const ctrl = new AccordionController({ items });
    ctrl.toggle("section-1");
    expect(ctrl.isOpen("section-1")).toBe(true);
  });

  test("single mode closes other items", () => {
    const ctrl = new AccordionController({ items });
    ctrl.toggle("section-1");
    ctrl.toggle("section-2");
    expect(ctrl.isOpen("section-1")).toBe(false);
    expect(ctrl.isOpen("section-2")).toBe(true);
  });

  test("multiple mode keeps items open", () => {
    const ctrl = new AccordionController({ items, multiple: true });
    ctrl.toggle("section-1");
    ctrl.toggle("section-2");
    expect(ctrl.isOpen("section-1")).toBe(true);
    expect(ctrl.isOpen("section-2")).toBe(true);
  });

  test("toggle closes open item", () => {
    const ctrl = new AccordionController({ items, defaultValue: ["section-1"] });
    ctrl.toggle("section-1");
    expect(ctrl.isOpen("section-1")).toBe(false);
  });

  test("onChange fires with current open items", () => {
    const fn = mock((_v: string[]) => {});
    const ctrl = new AccordionController({ items, onChange: fn });
    ctrl.toggle("section-2");
    expect(fn).toHaveBeenCalledWith(["section-2"]);
  });

  test("navigation helpers", () => {
    const ctrl = new AccordionController({ items });
    expect(ctrl.getNextItem("section-3")).toBe("section-1");
    expect(ctrl.getPrevItem("section-1")).toBe("section-3");
    expect(ctrl.getFirstItem()).toBe("section-1");
    expect(ctrl.getLastItem()).toBe("section-3");
  });
});
