/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { AlertController } from "./alert";

describe("AlertController", () => {
  test("defaults", () => {
    const ctrl = new AlertController();
    expect(ctrl.getVariant()).toBe("light");
    expect(ctrl.getColor()).toBe("info");
    expect(ctrl.hasCloseButton()).toBe(false);
    expect(ctrl.isClosed()).toBe(false);
  });

  test("with options", () => {
    const ctrl = new AlertController({ variant: "filled", color: "error", withCloseButton: true });
    expect(ctrl.getVariant()).toBe("filled");
    expect(ctrl.getColor()).toBe("error");
    expect(ctrl.hasCloseButton()).toBe(true);
  });

  test("close sets closed state and calls onClose", () => {
    const fn = mock(() => {});
    const ctrl = new AlertController({ onClose: fn });
    ctrl.close();
    expect(ctrl.isClosed()).toBe(true);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("getDataAttributes", () => {
    const ctrl = new AlertController({ variant: "outline", color: "warning" });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-component"]).toBe("Alert");
    expect(attrs["data-suraia-variant"]).toBe("outline");
    expect(attrs["data-suraia-color"]).toBe("warning");
  });
});
