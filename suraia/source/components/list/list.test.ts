/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, test } from "bun:test";
import { ListController } from "./list";

describe("ListController", () => {
  test("initial state defaults", () => {
    const ctrl = new ListController();
    expect(ctrl.getType()).toBe("unordered");
    expect(ctrl.getTagName()).toBe("ul");
  });

  test("ordered list maps to ol tag", () => {
    const ctrl = new ListController({ type: "ordered" });
    expect(ctrl.getTagName()).toBe("ol");
  });

  test("addItem and removeItem update items", () => {
    const ctrl = new ListController();
    ctrl.addItem({ id: "a", label: "Alpha" });
    ctrl.addItem({ id: "b", label: "Beta" });
    ctrl.removeItem("a");
    expect(ctrl.getItems()).toEqual([{ id: "b", label: "Beta" }]);
  });

  test("data attributes include spacing and padding", () => {
    const ctrl = new ListController({ spacing: "lg", withPadding: false, center: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-spacing"]).toBe("lg");
    expect(attrs["data-suraia-with-padding"]).toBe("false");
    expect(attrs["data-suraia-center"]).toBe("true");
  });
});
