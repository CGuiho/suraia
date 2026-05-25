/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ColorInputController };
export type { ColorInputControllerOptions, ColorInputFormat };

type ColorInputFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

interface ColorInputControllerOptions {
  value?: string;
  format?: ColorInputFormat;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

class ColorInputController {
  private value: string;
  private format: ColorInputFormat;
  private disabled: boolean;
  private error?: string;
  private onChange?: (value: string) => void;

  constructor(options: ColorInputControllerOptions = {}) {
    this.value = options.value ?? '#7950f2';
    this.format = options.format ?? 'hex';
    this.disabled = options.disabled ?? false;
    this.error = options.error;
    this.onChange = options.onChange;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    if (this.disabled) {
      return;
    }

    this.value = value;
    this.onChange?.(value);
  }

  public getFormat(): ColorInputFormat {
    return this.format;
  }

  public setFormat(format: ColorInputFormat): void {
    this.format = format;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public getError(): string | undefined {
    return this.error;
  }

  public setError(error?: string): void {
    this.error = error;
  }

  public isValidValue(value = this.value): boolean {
    const color = value.trim();
    return (
      /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color) ||
      /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i.test(color) ||
      /^hsla?\(\s*\d{1,3}(?:deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i.test(color)
    );
  }

  public getPreviewStyle(): Record<string, string> {
    return {
      '--suraia-color-input-value': this.isValidValue() ? this.value : 'transparent',
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'ColorInput',
      'data-suraia-format': this.format,
      'data-suraia-disabled': String(this.disabled),
      'data-suraia-invalid': this.error || !this.isValidValue() ? 'true' : undefined,
    };
  }
}
