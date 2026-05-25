/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { TreeSelectController } from "./tree-select";

const testTree = [
  {
    value: "tech",
    label: "Technology",
    children: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
    ],
  },
  {
    value: "design",
    label: "Design",
    children: [
      { value: "figma", label: "Figma", disabled: true },
      { value: "sketch", label: "Sketch" },
    ],
  },
];

describe("TreeSelectController", () => {
  test("initializes correctly", () => {
    const ctrl = new TreeSelectController({ data: testTree });
    expect(ctrl.getValue()).toBeNull();
    expect(ctrl.isOpened()).toBe(false);
  });

  test("flattens only expanded nodes", () => {
    const ctrl = new TreeSelectController({ data: testTree });
    let visible = ctrl.flattenTree();
    // initially technology and design are top-level visible nodes
    expect(visible.map(n => n.value)).toEqual(["tech", "design"]);

    ctrl.toggleExpand("tech");
    visible = ctrl.flattenTree();
    expect(visible.map(n => n.value)).toEqual(["tech", "react", "vue", "design"]);
  });

  test("selects value in single select mode", () => {
    const fn = mock((_v: string | string[] | null) => {});
    const ctrl = new TreeSelectController({ data: testTree, onChange: fn });
    ctrl.selectNode("react");
    expect(ctrl.getValue()).toBe("react");
    expect(fn).toHaveBeenCalledWith("react");
  });

  test("toggles values in multi select mode", () => {
    const ctrl = new TreeSelectController({ data: testTree, multiple: true });
    ctrl.selectNode("react");
    ctrl.selectNode("vue");
    expect(ctrl.getValue()).toEqual(["react", "vue"]);
    ctrl.selectNode("react");
    expect(ctrl.getValue()).toEqual(["vue"]);
  });

  test("keyboard navigates correctly", () => {
    const ctrl = new TreeSelectController({ data: testTree });
    ctrl.open();
    expect(ctrl.getHoveredValue()).toBe("tech");

    // ArrowRight expands
    const rightEvent = { key: "ArrowRight", preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    ctrl.handleKeyDown(rightEvent);
    expect(ctrl.isExpanded("tech")).toBe(true);

    // ArrowDown moves down to react
    const downEvent = { key: "ArrowDown", preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    ctrl.handleKeyDown(downEvent);
    expect(ctrl.getHoveredValue()).toBe("react");
  });
});
