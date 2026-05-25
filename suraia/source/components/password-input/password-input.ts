/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { PasswordInputController };
export type { PasswordInputControllerOptions };

interface PasswordInputControllerOptions {
  value?: string;
  visible?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

class PasswordInputController {
  private value: string;
  private visible: boolean;
  private disabled: boolean;
  private error?: string;
  private onChange?: (value: string) => void;

  constructor(options: PasswordInputControllerOptions = {}) {
    this.value = options.value ?? '';
    this.visible = options.visible ?? false;
    this.disabled = options.disabled ?? false;
    this.error = options.error;
    this.onChange = options.onChange;
  }

  public getValue(): string { return this.value; }
  public isVisible(): boolean { return this.visible; }
  public isDisabled(): boolean { return this.disabled; }
  public getError(): string | undefined { return this.error; }
  public hasError(): boolean { return this.error !== undefined && this.error.length > 0; }

  public getInputType(): string {
    return this.visible ? 'text' : 'password';
  }

  public toggleVisibility(): void {
    this.visible = !this.visible;
  }

  public setValue(value: string): void {
    if (this.disabled) return;
    this.value = value;
    this.onChange?.(value);
  }
}
