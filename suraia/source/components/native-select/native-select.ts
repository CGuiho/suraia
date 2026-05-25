/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { NativeSelectController };
export type { NativeSelectControllerOptions, SelectOption };

interface SelectOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

interface NativeSelectControllerOptions {
  value?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  options?: (string | SelectOption)[];
  onChange?: (value: string) => void;
}

class NativeSelectController {
  private value: string;
  private disabled: boolean;
  private error?: string;
  private required: boolean;
  private options: SelectOption[];
  private onChange?: (value: string) => void;

  constructor(options: NativeSelectControllerOptions = {}) {
    this.options = (options.options ?? []).map(opt => {
      if (typeof opt === 'string') {
        return { value: opt, label: opt };
      }
      return opt;
    });
    this.value = options.value ?? (this.options[0]?.value ?? '');
    this.disabled = options.disabled ?? false;
    this.error = options.error;
    this.required = options.required ?? false;
    this.onChange = options.onChange;
  }

  public getValue(): string { return this.value; }
  public setValue(value: string): void {
    if (this.disabled) return;
    if (value !== this.value) {
      this.value = value;
      this.onChange?.(this.value);
    }
  }

  public isDisabled(): boolean { return this.disabled; }
  public setDisabled(disabled: boolean): void { this.disabled = disabled; }

  public getError(): string | undefined { return this.error; }
  public setError(error: string | undefined): void { this.error = error; }
  public hasError(): boolean { return this.error !== undefined && this.error.length > 0; }

  public isRequired(): boolean { return this.required; }
  public setRequired(required: boolean): void { this.required = required; }

  public getOptions(): SelectOption[] { return this.options; }
  public setOptions(options: (string | SelectOption)[]): void {
    this.options = options.map(opt => {
      if (typeof opt === 'string') {
        return { value: opt, label: opt };
      }
      return opt;
    });
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-disabled': this.disabled ? 'true' : undefined,
      'data-suraia-error': this.hasError() ? 'true' : undefined,
      'data-suraia-required': this.required ? 'true' : undefined,
    };
  }
}
