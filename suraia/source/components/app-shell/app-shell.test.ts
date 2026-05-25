/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { AppShellController } from "./app-shell";

describe("AppShellController", () => {
  test("defaults", () => {
    const ctrl = new AppShellController();
    expect(ctrl.getHeaderHeight()).toBeUndefined();
    expect(ctrl.getFooterHeight()).toBeUndefined();
    expect(ctrl.getNavbarWidth()).toBeUndefined();
    expect(ctrl.getAsideWidth()).toBeUndefined();
    expect(ctrl.getPadding()).toBe("md");
    expect(ctrl.isFixed()).toBe(true);

    const styles = ctrl.getStyle();
    expect(styles['--suraia-shell-header-h']).toBeUndefined();
    expect(styles['--suraia-shell-padding']).toBe("var(--suraia-space-md, md)");

    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-fixed']).toBe("true");
  });

  test("custom widths and sizes", () => {
    const ctrl = new AppShellController({
      headerHeight: 60,
      footerHeight: "4rem",
      navbarWidth: 250,
      asideWidth: "300px",
      padding: 20,
      fixed: false,
    });
    expect(ctrl.getHeaderHeight()).toBe(60);
    expect(ctrl.isFixed()).toBe(false);

    const styles = ctrl.getStyle();
    expect(styles['--suraia-shell-header-h']).toBe("60px");
    expect(styles['--suraia-shell-footer-h']).toBe("4rem");
    expect(styles['--suraia-shell-navbar-w']).toBe("250px");
    expect(styles['--suraia-shell-aside-w']).toBe("300px");
    expect(styles['--suraia-shell-padding']).toBe("20px");

    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-fixed']).toBeUndefined();
  });
});
