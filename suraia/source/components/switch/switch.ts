/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { SwitchController };
export type { SwitchControllerOptions };

interface SwitchControllerOptions {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

class SwitchController {
  private checked: boolean;
  private disabled: boolean;
  private onChange?: (checked: boolean) => void;

  constructor(options: SwitchControllerOptions = {}) {
    this.checked = options.checked ?? false;
    this.disabled = options.disabled ?? false;
    this.onChange = options.onChange;
  }

  public isChecked(): boolean { return this.checked; }
  public isDisabled(): boolean { return this.disabled; }
  public setDisabled(disabled: boolean): void { this.disabled = disabled; }

  public toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.onChange?.(this.checked);
  }

  public setChecked(checked: boolean): void {
    this.checked = checked;
  }
}
