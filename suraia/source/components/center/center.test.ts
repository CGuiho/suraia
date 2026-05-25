/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { CenterController } from "./center";

describe("CenterController", () => {
  test("defaults", () => {
    const ctrl = new CenterController();
    expect(ctrl.isInline()).toBe(false);
    expect(ctrl.getDataAttributes()['data-suraia-inline']).toBeUndefined();
  });

  test("inline mode", () => {
    const ctrl = new CenterController({ inline: true });
    expect(ctrl.isInline()).toBe(true);
    expect(ctrl.getDataAttributes()['data-suraia-inline']).toBe("true");
  });
});
