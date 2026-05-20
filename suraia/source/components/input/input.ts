/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { InputController };
export type { InputControllerOptions };

interface InputControllerOptions {
  value?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

class InputController {
  private value: string;
  private disabled: boolean;
  private required: boolean;
  private focused: boolean;
  private onChange?: (value: string) => void;
  private onFocus?: () => void;
  private onBlur?: () => void;

  constructor(options: InputControllerOptions = {}) {
    this.value = options.value ?? "";
    this.disabled = options.disabled ?? false;
    this.required = options.required ?? false;
    this.focused = false;
    this.onChange = options.onChange;
    this.onFocus = options.onFocus;
    this.onBlur = options.onBlur;
  }

  /**
   * Gets the current value.
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Sets the current value.
   */
  public setValue(value: string): void {
    if (this.disabled) return;
    this.value = value;
    this.onChange?.(value);
  }

  /**
   * Gets the current disabled state.
   */
  public isDisabled(): boolean {
    return this.disabled;
  }

  /**
   * Sets the disabled state.
   */
  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  /**
   * Gets the required state.
   */
  public isRequired(): boolean {
    return this.required;
  }

  /**
   * Sets the required state.
   */
  public setRequired(required: boolean): void {
    this.required = required;
  }

  /**
   * Gets the focus state.
   */
  public isFocused(): boolean {
    return this.focused;
  }

  /**
   * Handles focus event.
   */
  public handleFocus(): void {
    if (this.disabled) return;
    this.focused = true;
    this.onFocus?.();
  }

  /**
   * Handles blur event.
   */
  public handleBlur(): void {
    if (this.disabled) return;
    this.focused = false;
    this.onBlur?.();
  }

  /**
   * Validates the input state.
   */
  public validate(): boolean {
    if (this.required && !this.value.trim()) {
      return false;
    }
    return true;
  }
}
