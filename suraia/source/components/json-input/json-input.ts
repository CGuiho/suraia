/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { JsonInputController };
export type { JsonInputControllerOptions, JsonInputParseResult, JsonValue };

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

interface JsonInputParseResult {
  valid: boolean;
  value?: JsonValue;
  error?: string;
}

interface JsonInputControllerOptions {
  value?: string;
  formatOnBlur?: boolean;
  autosize?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

class JsonInputController {
  private value: string;
  private formatOnBlur: boolean;
  private autosize: boolean;
  private disabled: boolean;
  private onChange?: (value: string) => void;

  constructor(options: JsonInputControllerOptions = {}) {
    this.value = options.value ?? '';
    this.formatOnBlur = options.formatOnBlur ?? false;
    this.autosize = options.autosize ?? true;
    this.disabled = options.disabled ?? false;
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

  public shouldFormatOnBlur(): boolean {
    return this.formatOnBlur;
  }

  public isAutosize(): boolean {
    return this.autosize;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public parse(): JsonInputParseResult {
    try {
      return {
        valid: true,
        value: JSON.parse(this.value) as JsonValue,
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid JSON',
      };
    }
  }

  public isValid(): boolean {
    return this.parse().valid;
  }

  public format(indentation = 2): boolean {
    const parsed = this.parse();
    if (!parsed.valid) {
      return false;
    }

    this.value = JSON.stringify(parsed.value, null, indentation);
    this.onChange?.(this.value);
    return true;
  }

  public handleBlur(): void {
    if (this.formatOnBlur) {
      this.format();
    }
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'JsonInput',
      'data-suraia-autosize': String(this.autosize),
      'data-suraia-disabled': String(this.disabled),
      'data-suraia-invalid': this.value === '' || this.isValid() ? undefined : 'true',
    };
  }
}
