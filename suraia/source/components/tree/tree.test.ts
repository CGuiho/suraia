/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { TreeController } from "./tree";

describe("TreeController", () => {
  const getSampleNodes = () => [
    {
      id: "root-1",
      label: "Root 1",
      children: [
        { id: "child-1-1", label: "Child 1.1" },
        { id: "child-1-2", label: "Child 1.2", children: [{ id: "grandchild-1", label: "Grandchild 1" }] },
      ],
      expanded: true,
    },
    { id: "root-2", label: "Root 2" },
  ];

  test("finding nodes", () => {
    const ctrl = new TreeController({ nodes: getSampleNodes() });
    const node = ctrl.findNode("grandchild-1");
    expect(node).not.toBeNull();
    expect(node!.label).toBe("Grandchild 1");

    expect(ctrl.findNode("non-existent")).toBeNull();
  });

  test("toggle expansion", () => {
    const fn = mock(() => {});
    const ctrl = new TreeController({ nodes: getSampleNodes(), onToggleExpand: fn });
    ctrl.toggleNodeExpand("root-1");
    const node = ctrl.findNode("root-1");
    expect(node!.expanded).toBe(false);
    expect(fn).toHaveBeenCalled();
  });

  test("selecting nodes and clearing others", () => {
    const fn = mock(() => {});
    const ctrl = new TreeController({ nodes: getSampleNodes(), onSelect: fn });
    ctrl.selectNode("child-1-1");
    expect(ctrl.findNode("child-1-1")!.selected).toBe(true);
    expect(fn).toHaveBeenCalled();

    ctrl.selectNode("root-2");
    expect(ctrl.findNode("root-2")!.selected).toBe(true);
    expect(ctrl.findNode("child-1-1")!.selected).toBe(false);
  });

  test("keyboard navigation down", () => {
    const ctrl = new TreeController({ nodes: getSampleNodes() });
    const ev = { key: "ArrowDown", preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    const res = ctrl.handleKeyDown(ev, "root-1");
    expect(res.newActiveId).toBe("child-1-1");
  });
});
