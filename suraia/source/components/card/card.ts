/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { CardController };
export type { CardControllerOptions };

interface CardControllerOptions {
  shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: string;
  withBorder?: boolean;
  padding?: string;
}

class CardController {
  private shadow: string;
  private radius: string;
  private withBorder: boolean;
  private padding: string;

  constructor(options: CardControllerOptions = {}) {
    this.shadow = options.shadow ?? 'none';
    this.radius = options.radius ?? 'md';
    this.withBorder = options.withBorder ?? false;
    this.padding = options.padding ?? 'md';
  }

  public getShadow(): string { return this.shadow; }
  public setShadow(shadow: string): void { this.shadow = shadow; }
  public getRadius(): string { return this.radius; }
  public setRadius(radius: string): void { this.radius = radius; }
  public hasBorder(): boolean { return this.withBorder; }
  public setWithBorder(withBorder: boolean): void { this.withBorder = withBorder; }
  public getPadding(): string { return this.padding; }
  public setPadding(padding: string): void { this.padding = padding; }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-shadow': this.shadow !== 'none' ? this.shadow : undefined,
      'data-suraia-radius': this.radius,
      'data-suraia-padding': this.padding,
      'data-suraia-with-border': this.withBorder ? 'true' : undefined,
    };
  }
}
