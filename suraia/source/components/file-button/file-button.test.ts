/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { FileButtonController } from "./file-button";

describe("FileButtonController", () => {
  test("defaults", () => {
    const ctrl = new FileButtonController();
    expect(ctrl.isMultiple()).toBe(false);
    expect(ctrl.getAccept()).toBeUndefined();
    expect(ctrl.isDisabled()).toBe(false);

    const inputAttrs = ctrl.getInputAttributes();
    expect(inputAttrs.type).toBe("file");
    expect(inputAttrs.multiple).toBeUndefined();
    expect(inputAttrs.disabled).toBeUndefined();
    expect(inputAttrs.style).toBe("display: none;");
  });

  test("multiple and accept values", () => {
    const ctrl = new FileButtonController({
      multiple: true,
      accept: "image/*",
      disabled: true,
    });
    expect(ctrl.isMultiple()).toBe(true);
    expect(ctrl.getAccept()).toBe("image/*");
    expect(ctrl.isDisabled()).toBe(true);

    const inputAttrs = ctrl.getInputAttributes();
    expect(inputAttrs.multiple).toBe("true");
    expect(inputAttrs.accept).toBe("image/*");
    expect(inputAttrs.disabled).toBe("true");
  });

  test("selectFiles invokes onChange callback", () => {
    const onChange = mock(() => {});
    const ctrl = new FileButtonController({ onChange });
    
    // Simulate selectFiles with null / mock FileList
    ctrl.selectFiles(null);
    expect(onChange).not.toHaveBeenCalled();

    // Create a mock File array
    const file = new File(["test"], "test.png", { type: "image/png" });
    const fileList = {
      0: file,
      length: 1,
      item: (index: number) => file,
    } as unknown as FileList;

    ctrl.selectFiles(fileList);
    expect(onChange).toHaveBeenCalled();
  });
});
