/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TextareaController };
export type { TextareaControllerOptions };

interface TextareaControllerOptions {
  value?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
  onChange?: (value: string) => void;
}

class TextareaController {
  private value: string;
  private disabled: boolean;
  private required: boolean;
  private error?: string;
  private autosize: boolean;
  private minRows?: number;
  private maxRows?: number;
  private onChange?: (value: string) => void;

  constructor(options: TextareaControllerOptions = {}) {
    this.value = options.value ?? '';
    this.disabled = options.disabled ?? false;
    this.required = options.required ?? false;
    this.error = options.error;
    this.autosize = options.autosize ?? false;
    this.minRows = options.minRows;
    this.maxRows = options.maxRows;
    this.onChange = options.onChange;
  }

  public getValue(): string { return this.value; }

  public setValue(value: string): void {
    if (this.disabled) return;
    this.value = value;
    this.onChange?.(value);
  }

  public isDisabled(): boolean { return this.disabled; }
  public isRequired(): boolean { return this.required; }
  public isAutosize(): boolean { return this.autosize; }
  public getMinRows(): number | undefined { return this.minRows; }
  public getMaxRows(): number | undefined { return this.maxRows; }
  public getError(): string | undefined { return this.error; }
  public hasError(): boolean { return this.error !== undefined && this.error.length > 0; }
  public setError(error: string | undefined): void { this.error = error; }

  public validate(): boolean {
    if (this.required && this.value.trim().length === 0) return false;
    return true;
  }
}
