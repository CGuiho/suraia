/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { AppShellController };
export type { AppShellControllerOptions };

interface AppShellControllerOptions {
  headerHeight?: string | number;
  footerHeight?: string | number;
  navbarWidth?: string | number;
  asideWidth?: string | number;
  padding?: string | number;
  fixed?: boolean;
}

class AppShellController {
  private headerHeight?: string | number;
  private footerHeight?: string | number;
  private navbarWidth?: string | number;
  private asideWidth?: string | number;
  private padding: string | number;
  private fixed: boolean;

  constructor(options: AppShellControllerOptions = {}) {
    this.headerHeight = options.headerHeight;
    this.footerHeight = options.footerHeight;
    this.navbarWidth = options.navbarWidth;
    this.asideWidth = options.asideWidth;
    this.padding = options.padding ?? 'md';
    this.fixed = options.fixed ?? true;
  }

  public getHeaderHeight() { return this.headerHeight; }
  public getFooterHeight() { return this.footerHeight; }
  public getNavbarWidth() { return this.navbarWidth; }
  public getAsideWidth() { return this.asideWidth; }
  public getPadding() { return this.padding; }
  public isFixed() { return this.fixed; }

  public getStyle(): Record<string, string | undefined> {
    const toPx = (val?: string | number) => {
      if (val === undefined) return undefined;
      return typeof val === 'number' ? `${val}px` : val;
    };

    return {
      '--suraia-shell-header-h': toPx(this.headerHeight),
      '--suraia-shell-footer-h': toPx(this.footerHeight),
      '--suraia-shell-navbar-w': toPx(this.navbarWidth),
      '--suraia-shell-aside-w': toPx(this.asideWidth),
      '--suraia-shell-padding': typeof this.padding === 'number' 
        ? `${this.padding}px` 
        : `var(--suraia-space-${this.padding}, ${this.padding})`,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-fixed': this.fixed ? 'true' : undefined,
    };
  }
}
