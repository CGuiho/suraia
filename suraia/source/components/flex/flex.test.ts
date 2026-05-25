/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { FlexController } from "./flex";

describe("FlexController", () => {
  test("defaults", () => {
    const ctrl = new FlexController();
    const style = ctrl.getStyle();
    expect(style["--suraia-flex-direction"]).toBe("row");
    expect(style["--suraia-flex-wrap"]).toBe("nowrap");
    expect(style["--suraia-flex-justify"]).toBe("flex-start");
    expect(style["--suraia-flex-align"]).toBe("stretch");
  });

  test("custom options", () => {
    const ctrl = new FlexController({ direction: "column", wrap: "wrap", justify: "center", align: "flex-end" });
    const style = ctrl.getStyle();
    expect(style["--suraia-flex-direction"]).toBe("column");
    expect(style["--suraia-flex-wrap"]).toBe("wrap");
    expect(style["--suraia-flex-justify"]).toBe("center");
    expect(style["--suraia-flex-align"]).toBe("flex-end");
  });
});
