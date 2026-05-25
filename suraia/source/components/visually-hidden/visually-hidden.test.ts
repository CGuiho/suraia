/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { VisuallyHiddenController } from "./visually-hidden";

describe("VisuallyHiddenController", () => {
  test("instantiation", () => {
    const ctrl = new VisuallyHiddenController();
    expect(ctrl).toBeDefined();
  });
});
