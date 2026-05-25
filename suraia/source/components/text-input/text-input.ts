/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TextInputController };
export type { TextInputControllerOptions };

interface TextInputControllerOptions {
  value?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

class TextInputController {
  private value: string;
  private disabled: boolean;
  private required: boolean;
  private error?: string;
  private onChange?: (value: string) => void;

  constructor(options: TextInputControllerOptions = {}) {
    this.value = options.value ?? '';
    this.disabled = options.disabled ?? false;
    this.required = options.required ?? false;
    this.error = options.error;
    this.onChange = options.onChange;
  }

  public getValue(): string { return this.value; }

  public setValue(value: string): void {
    if (this.disabled) return;
    this.value = value;
    this.onChange?.(value);
  }

  public isDisabled(): boolean { return this.disabled; }
  public setDisabled(disabled: boolean): void { this.disabled = disabled; }
  public isRequired(): boolean { return this.required; }
  public getError(): string | undefined { return this.error; }
  public hasError(): boolean { return this.error !== undefined && this.error.length > 0; }
  public setError(error: string | undefined): void { this.error = error; }

  public validate(): boolean {
    if (this.required && this.value.trim().length === 0) return false;
    return true;
  }
}
