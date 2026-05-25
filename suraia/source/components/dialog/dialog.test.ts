/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { DialogController } from "./dialog";

describe("DialogController", () => {
  test("defaults", () => {
    const ctrl = new DialogController();
    expect(ctrl.isOpened()).toBe(false);
    expect(ctrl.getTitle()).toBeUndefined();
    expect(ctrl.hasCloseButton()).toBe(true);

    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-opened']).toBeUndefined();
  });

  test("open and close triggers", () => {
    const onClose = mock(() => {});
    const ctrl = new DialogController({
      title: "Confirm Delete",
      onClose,
    });
    expect(ctrl.getTitle()).toBe("Confirm Delete");

    ctrl.setOpened(true);
    expect(ctrl.isOpened()).toBe(true);
    expect(ctrl.getDataAttributes()['data-suraia-opened']).toBe("true");

    ctrl.close();
    expect(ctrl.isOpened()).toBe(false);
    expect(onClose).toHaveBeenCalled();
  });
});
