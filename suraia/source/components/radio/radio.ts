/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { RadioController };
export type { RadioControllerOptions };

interface RadioControllerOptions {
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

class RadioController {
  private value: string;
  private checked: boolean;
  private disabled: boolean;
  private error?: string;
  private onChange?: (value: string) => void;

  constructor(options: RadioControllerOptions = {}) {
    this.value = options.value ?? '';
    this.checked = options.checked ?? false;
    this.disabled = options.disabled ?? false;
    this.error = options.error;
    this.onChange = options.onChange;
  }

  public getValue(): string { return this.value; }
  public isChecked(): boolean { return this.checked; }
  public isDisabled(): boolean { return this.disabled; }
  public getError(): string | undefined { return this.error; }
  public hasError(): boolean { return this.error !== undefined && this.error.length > 0; }

  public select(): void {
    if (this.disabled) return;
    this.checked = true;
    this.onChange?.(this.value);
  }

  public deselect(): void {
    this.checked = false;
  }
}
