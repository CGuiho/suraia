/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { AspectRatioController } from "./aspect-ratio";

describe("AspectRatioController", () => {
  test("defaults to 1", () => {
    const ctrl = new AspectRatioController();
    expect(ctrl.getRatio()).toBe(1);
    expect(ctrl.getStyle()['--suraia-ratio']).toBe("1");
  });

  test("can change ratio", () => {
    const ctrl = new AspectRatioController({ ratio: 16 / 9 });
    expect(ctrl.getRatio()).toBe(16 / 9);
    expect(ctrl.getStyle()['--suraia-ratio']).toBe(String(16 / 9));
  });
});
