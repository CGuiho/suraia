/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { NotificationController } from "./notification";

describe("NotificationController", () => {
  test("defaults", () => {
    const ctrl = new NotificationController();
    expect(ctrl.getMessage()).toBe("");
    expect(ctrl.getColor()).toBe("primary");
    expect(ctrl.hasCloseButton()).toBe(true);
    expect(ctrl.isClosed()).toBe(false);
  });

  test("close fires onClose", () => {
    const fn = mock(() => {});
    const ctrl = new NotificationController({ onClose: fn });
    ctrl.close();
    expect(ctrl.isClosed()).toBe(true);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("with title and message", () => {
    const ctrl = new NotificationController({ title: "Success", message: "Saved!", color: "success" });
    expect(ctrl.getTitle()).toBe("Success");
    expect(ctrl.getMessage()).toBe("Saved!");
    expect(ctrl.getColor()).toBe("success");
  });

  test("destroy clears timer", () => {
    const ctrl = new NotificationController({ autoClose: 5000 });
    ctrl.show();
    ctrl.destroy();
    expect(ctrl.isClosed()).toBe(false);
  });
});
