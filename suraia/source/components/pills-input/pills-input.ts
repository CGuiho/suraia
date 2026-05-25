/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { PillsInputController };
export type { PillsInputControllerOptions };

interface PillsInputControllerOptions {
  disabled?: boolean;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

class PillsInputController {
  private disabled: boolean;
  private required: boolean;
  private error?: string;
  private focused: boolean;
  private value: string;
  private onChange?: (value: string) => void;

  constructor(options: PillsInputControllerOptions = {}) {
    this.disabled = options.disabled ?? false;
    this.required = options.required ?? false;
    this.error = options.error;
    this.focused = false;
    this.value = options.value ?? "";
    this.onChange = options.onChange;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public isRequired(): boolean {
    return this.required;
  }

  public getError(): string | undefined {
    return this.error;
  }

  public isFocused(): boolean {
    return this.focused;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(val: string): void {
    if (this.disabled) return;
    this.value = val;
    this.onChange?.(val);
  }

  public handleFocus(): void {
    if (this.disabled) return;
    this.focused = true;
  }

  public handleBlur(): void {
    if (this.disabled) return;
    this.focused = false;
  }
}
