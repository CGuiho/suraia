/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { KbdController } from "./kbd";

describe("KbdController", () => {
  test("instantiation", () => {
    const ctrl = new KbdController();
    expect(ctrl).toBeDefined();
  });
});
