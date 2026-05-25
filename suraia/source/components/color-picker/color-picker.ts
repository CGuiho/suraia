/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ColorPickerController };
export type { ColorPickerControllerOptions, ColorPickerFormat };

type ColorPickerFormat = 'hex' | 'rgba' | 'hsla';

interface ColorPickerControllerOptions {
  value?: string;
  format?: ColorPickerFormat;
  alpha?: number;
  withAlpha?: boolean;
  swatches?: string[];
  onChange?: (value: string) => void;
}

class ColorPickerController {
  private value: string;
  private format: ColorPickerFormat;
  private alpha: number;
  private withAlpha: boolean;
  private swatches: string[];
  private onChange?: (value: string) => void;

  constructor(options: ColorPickerControllerOptions = {}) {
    this.value = options.value ?? '#7950f2';
    this.format = options.format ?? 'hex';
    this.alpha = this.clampAlpha(options.alpha ?? 1);
    this.withAlpha = options.withAlpha ?? false;
    this.swatches = [...(options.swatches ?? [])];
    this.onChange = options.onChange;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
    this.onChange?.(value);
  }

  public getFormat(): ColorPickerFormat {
    return this.format;
  }

  public setFormat(format: ColorPickerFormat): void {
    this.format = format;
  }

  public getAlpha(): number {
    return this.alpha;
  }

  public setAlpha(alpha: number): void {
    this.alpha = this.clampAlpha(alpha);
  }

  public hasAlpha(): boolean {
    return this.withAlpha;
  }

  public setWithAlpha(withAlpha: boolean): void {
    this.withAlpha = withAlpha;
  }

  public getSwatches(): string[] {
    return [...this.swatches];
  }

  public selectSwatch(color: string): void {
    if (this.swatches.includes(color)) {
      this.setValue(color);
    }
  }

  public getPreviewStyle(): Record<string, string> {
    return {
      '--suraia-color-picker-value': this.value,
      '--suraia-color-picker-alpha': String(this.alpha),
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'ColorPicker',
      'data-suraia-format': this.format,
      'data-suraia-with-alpha': String(this.withAlpha),
    };
  }

  private clampAlpha(alpha: number): number {
    return Math.min(1, Math.max(0, alpha));
  }
}
