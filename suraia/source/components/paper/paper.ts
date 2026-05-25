/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { PaperController };
export type { PaperControllerOptions };

interface PaperControllerOptions {
  shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: string;
  withBorder?: boolean;
}

class PaperController {
  private shadow: string;
  private radius: string;
  private withBorder: boolean;

  constructor(options: PaperControllerOptions = {}) {
    this.shadow = options.shadow ?? 'none';
    this.radius = options.radius ?? 'md';
    this.withBorder = options.withBorder ?? false;
  }

  public getShadow(): string { return this.shadow; }
  public setShadow(shadow: string): void { this.shadow = shadow; }
  public getRadius(): string { return this.radius; }
  public setRadius(radius: string): void { this.radius = radius; }
  public hasBorder(): boolean { return this.withBorder; }
  public setWithBorder(withBorder: boolean): void { this.withBorder = withBorder; }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Paper',
      'data-suraia-shadow': this.shadow !== 'none' ? this.shadow : undefined,
      'data-suraia-radius': this.radius,
      'data-suraia-with-border': this.withBorder ? '' : undefined,
    };
  }
}
