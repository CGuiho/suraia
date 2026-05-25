/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ThemeIconController };
export type { ThemeIconControllerOptions, ThemeIconVariant, ThemeIconSize };

type ThemeIconVariant = "filled" | "light" | "outline" | "default" | "gradient";
type ThemeIconSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ThemeIconControllerOptions {
  variant?: ThemeIconVariant;
  size?: ThemeIconSize;
  color?: string;
  radius?: string;
}

class ThemeIconController {
  private variant: ThemeIconVariant;
  private size: ThemeIconSize;
  private color: string;
  private radius: string;

  constructor(options: ThemeIconControllerOptions = {}) {
    this.variant = options.variant ?? "filled";
    this.size = options.size ?? "md";
    this.color = options.color ?? "primary";
    this.radius = options.radius ?? "sm";
  }

  public getVariant(): ThemeIconVariant {
    return this.variant;
  }

  public setVariant(variant: ThemeIconVariant): void {
    this.variant = variant;
  }

  public getSize(): ThemeIconSize {
    return this.size;
  }

  public setSize(size: ThemeIconSize): void {
    this.size = size;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public getRadius(): string {
    return this.radius;
  }

  public setRadius(radius: string): void {
    this.radius = radius;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      "data-suraia-component": "ThemeIcon",
      "data-suraia-variant": this.variant,
      "data-suraia-size": this.size,
      "data-suraia-radius": this.radius,
    };
  }
}
