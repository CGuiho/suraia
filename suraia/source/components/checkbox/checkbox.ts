/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { CheckboxController };
export type { CheckboxControllerOptions };

interface CheckboxControllerOptions {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (checked: boolean) => void;
}

class CheckboxController {
  private checked: boolean;
  private indeterminate: boolean;
  private disabled: boolean;
  private error?: string;
  private onChange?: (checked: boolean) => void;

  constructor(options: CheckboxControllerOptions = {}) {
    this.checked = options.checked ?? false;
    this.indeterminate = options.indeterminate ?? false;
    this.disabled = options.disabled ?? false;
    this.error = options.error;
    this.onChange = options.onChange;
  }

  public isChecked(): boolean { return this.checked; }
  public isIndeterminate(): boolean { return this.indeterminate; }
  public isDisabled(): boolean { return this.disabled; }
  public getError(): string | undefined { return this.error; }
  public hasError(): boolean { return this.error !== undefined && this.error.length > 0; }

  public setChecked(checked: boolean): void {
    this.checked = checked;
    this.indeterminate = false;
  }

  public setIndeterminate(indeterminate: boolean): void {
    this.indeterminate = indeterminate;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public setError(error: string | undefined): void {
    this.error = error;
  }

  public toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.onChange?.(this.checked);
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Checkbox',
      'data-suraia-error': this.hasError() ? '' : undefined,
    };
  }
}
