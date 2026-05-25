/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { FileInputController } from "./file-input";

describe("FileInputController", () => {
  test("defaults", () => {
    const ctrl = new FileInputController();
    expect(ctrl.getValue()).toBeNull();
    expect(ctrl.isMultiple()).toBe(false);
    expect(ctrl.getAccept()).toBeUndefined();
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.isRequired()).toBe(false);
    expect(ctrl.isClearable()).toBe(false);
    expect(ctrl.getFilesNames()).toBe('');
  });

  test("single file assignment", () => {
    const onChange = mock(() => {});
    const ctrl = new FileInputController({ onChange });
    const file = new File(["data"], "invoice.pdf", { type: "application/pdf" });

    ctrl.setValue(file);
    expect(ctrl.getValue()).toBe(file);
    expect(ctrl.getFilesNames()).toBe("invoice.pdf");
    expect(onChange).toHaveBeenCalled();
  });

  test("multiple files assignment", () => {
    const ctrl = new FileInputController({
      multiple: true,
      clearable: true,
    });
    const file1 = new File(["data1"], "img1.png", { type: "image/png" });
    const file2 = new File(["data2"], "img2.png", { type: "image/png" });

    ctrl.setValue([file1, file2]);
    expect(ctrl.getFilesNames()).toBe("img1.png, img2.png");

    ctrl.clear();
    expect(ctrl.getValue()).toBeNull();
  });

  test("handleFilesChange", () => {
    const ctrl = new FileInputController({ multiple: true });
    const file = new File(["data"], "test.csv", { type: "text/csv" });
    const fileList = {
      0: file,
      length: 1,
      item: (index: number) => file,
    } as unknown as FileList;

    ctrl.handleFilesChange(fileList);
    expect(ctrl.getValue()).toEqual([file]);
  });
});
