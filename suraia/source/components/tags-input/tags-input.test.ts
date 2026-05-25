/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { TagsInputController } from "./tags-input";

describe("TagsInputController", () => {
  test("initializes correctly", () => {
    const ctrl = new TagsInputController();
    expect(ctrl.getValue()).toEqual([]);
    expect(ctrl.getInputValue()).toBe("");
  });

  test("adds tags on enter", () => {
    const fn = mock((_v: string[]) => {});
    const ctrl = new TagsInputController({ onChange: fn });
    ctrl.setInputValue("React");
    ctrl.handleKeyDown({ key: "Enter", preventDefault: mock(() => {}) } as unknown as KeyboardEvent);
    expect(ctrl.getValue()).toEqual(["React"]);
    expect(ctrl.getInputValue()).toBe("");
    expect(fn).toHaveBeenCalledWith(["React"]);
  });

  test("adds tags on split character delimiter", () => {
    const ctrl = new TagsInputController({ splitChars: [","] });
    ctrl.setInputValue("React,");
    expect(ctrl.getValue()).toEqual(["React"]);
    expect(ctrl.getInputValue()).toBe("");
  });

  test("respects duplicate constraints", () => {
    const ctrl = new TagsInputController({ allowDuplicates: false });
    ctrl.addTag("Vue");
    ctrl.addTag("Vue");
    expect(ctrl.getValue()).toEqual(["Vue"]);
  });

  test("respects maxTags constraints", () => {
    const ctrl = new TagsInputController({ maxTags: 2 });
    ctrl.addTag("React");
    ctrl.addTag("Vue");
    ctrl.addTag("Angular");
    expect(ctrl.getValue()).toEqual(["React", "Vue"]);
  });

  test("removes tags via removeTag or Backspace", () => {
    const ctrl = new TagsInputController({ value: ["React", "Vue"] });
    ctrl.removeTag("React");
    expect(ctrl.getValue()).toEqual(["Vue"]);

    ctrl.handleKeyDown({ key: "Backspace" } as KeyboardEvent);
    expect(ctrl.getValue()).toEqual([]);
  });
});
