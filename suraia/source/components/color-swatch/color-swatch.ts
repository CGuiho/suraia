/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ColorSwatchController };
export type { ColorSwatchControllerOptions, ColorSwatchSize };

type ColorSwatchSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ColorSwatchControllerOptions {
  color?: string;
  size?: ColorSwatchSize;
  radius?: string;
  withShadow?: boolean;
}

class ColorSwatchController {
  private color: string;
  private size: ColorSwatchSize;
  private radius: string;
  private withShadow: boolean;

  constructor(options: ColorSwatchControllerOptions = {}) {
    this.color = options.color ?? "#000000";
    this.size = options.size ?? "md";
    this.radius = options.radius ?? "full";
    this.withShadow = options.withShadow ?? true;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public getSize(): ColorSwatchSize {
    return this.size;
  }

  public setSize(size: ColorSwatchSize): void {
    this.size = size;
  }

  public getRadius(): string {
    return this.radius;
  }

  public setRadius(radius: string): void {
    this.radius = radius;
  }

  public isWithShadow(): boolean {
    return this.withShadow;
  }

  public setWithShadow(withShadow: boolean): void {
    this.withShadow = withShadow;
  }

  public getStyle(): Record<string, string> {
    return {
      "background-color": this.color,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      "data-suraia-component": "ColorSwatch",
      "data-suraia-size": this.size,
      "data-suraia-radius": this.radius,
      "data-suraia-shadow": this.withShadow ? "" : undefined,
    };
  }
}
