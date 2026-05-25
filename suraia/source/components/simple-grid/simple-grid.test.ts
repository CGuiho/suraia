/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { SimpleGridController } from "./simple-grid";

describe("SimpleGridController", () => {
  test("defaults", () => {
    const ctrl = new SimpleGridController();
    expect(ctrl.getCols()).toBe(1);
    expect(ctrl.getSpacing()).toBe("md");
    expect(ctrl.getVerticalSpacing()).toBeUndefined();
    
    const styles = ctrl.getStyle();
    expect(styles['--suraia-grid-cols']).toBe("1");
    expect(styles['--suraia-grid-spacing']).toBe("var(--suraia-space-md, md)");
    expect(styles['--suraia-grid-vertical-spacing']).toBeUndefined();
  });

  test("custom spacing and columns", () => {
    const ctrl = new SimpleGridController({
      cols: 4,
      spacing: "xs",
      verticalSpacing: "lg",
    });
    expect(ctrl.getCols()).toBe(4);
    expect(ctrl.getSpacing()).toBe("xs");
    expect(ctrl.getVerticalSpacing()).toBe("lg");

    const styles = ctrl.getStyle();
    expect(styles['--suraia-grid-cols']).toBe("4");
    expect(styles['--suraia-grid-spacing']).toBe("var(--suraia-space-xs, xs)");
    expect(styles['--suraia-grid-vertical-spacing']).toBe("var(--suraia-space-lg, lg)");
  });
});
