/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { IndicatorController };
export type { IndicatorControllerOptions, IndicatorPosition, IndicatorSize };

type IndicatorPosition =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "top-center"
  | "bottom-center"
  | "middle-start"
  | "middle-end";

type IndicatorSize = "xs" | "sm" | "md" | "lg" | "xl";

interface IndicatorControllerOptions {
  position?: IndicatorPosition;
  size?: IndicatorSize;
  color?: string;
  radius?: string;
  disabled?: boolean;
  processing?: boolean;
  inline?: boolean;
  withBorder?: boolean;
}

class IndicatorController {
  private position: IndicatorPosition;
  private size: IndicatorSize;
  private color: string;
  private radius: string;
  private disabled: boolean;
  private processing: boolean;
  private inline: boolean;
  private withBorder: boolean;

  constructor(options: IndicatorControllerOptions = {}) {
    this.position = options.position ?? "top-end";
    this.size = options.size ?? "md";
    this.color = options.color ?? "primary";
    this.radius = options.radius ?? "full";
    this.disabled = options.disabled ?? false;
    this.processing = options.processing ?? false;
    this.inline = options.inline ?? true;
    this.withBorder = options.withBorder ?? false;
  }

  public getPosition(): IndicatorPosition {
    return this.position;
  }

  public setPosition(position: IndicatorPosition): void {
    this.position = position;
  }

  public getSize(): IndicatorSize {
    return this.size;
  }

  public setSize(size: IndicatorSize): void {
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

  public isDisabled(): boolean {
    return this.disabled;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public isProcessing(): boolean {
    return this.processing;
  }

  public setProcessing(processing: boolean): void {
    this.processing = processing;
  }

  public isInline(): boolean {
    return this.inline;
  }

  public setInline(inline: boolean): void {
    this.inline = inline;
  }

  public isWithBorder(): boolean {
    return this.withBorder;
  }

  public setWithBorder(withBorder: boolean): void {
    this.withBorder = withBorder;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      "data-suraia-component": "Indicator",
      "data-suraia-inline": this.inline ? "" : undefined,
    };
  }

  public getIndicatorDataAttributes(): Record<string, string | undefined> {
    return {
      "data-suraia-position": this.position,
      "data-suraia-size": this.size,
      "data-suraia-radius": this.radius,
      "data-suraia-disabled": this.disabled ? "" : undefined,
      "data-suraia-processing": this.processing ? "" : undefined,
      "data-suraia-border": this.withBorder ? "" : undefined,
    };
  }
}
