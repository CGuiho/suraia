/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ChipController };
export type { ChipControllerOptions };

interface ChipControllerOptions {
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  type?: 'checkbox' | 'radio';
  variant?: 'filled' | 'outline' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onChange?: (checked: boolean) => void;
}

class ChipController {
  private value?: string;
  private checked: boolean;
  private disabled: boolean;
  private type: 'checkbox' | 'radio';
  private variant: 'filled' | 'outline' | 'light';
  private size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  private onChange?: (checked: boolean) => void;

  constructor(options: ChipControllerOptions = {}) {
    this.value = options.value;
    this.checked = options.checked ?? false;
    this.disabled = options.disabled ?? false;
    this.type = options.type ?? 'checkbox';
    this.variant = options.variant ?? 'outline';
    this.size = options.size ?? 'sm';
    this.onChange = options.onChange;
  }

  public getValue(): string | undefined { return this.value; }
  public setValue(value: string | undefined): void { this.value = value; }

  public isChecked(): boolean { return this.checked; }
  public setChecked(checked: boolean): void {
    if (this.disabled) return;
    if (this.checked !== checked) {
      this.checked = checked;
      this.onChange?.(this.checked);
    }
  }

  public toggle(): void {
    this.setChecked(!this.checked);
  }

  public isDisabled(): boolean { return this.disabled; }
  public setDisabled(disabled: boolean): void { this.disabled = disabled; }

  public getType(): 'checkbox' | 'radio' { return this.type; }
  public setType(type: 'checkbox' | 'radio'): void { this.type = type; }

  public getVariant(): 'filled' | 'outline' | 'light' { return this.variant; }
  public setVariant(variant: 'filled' | 'outline' | 'light'): void { this.variant = variant; }

  public getSize(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' { return this.size; }
  public setSize(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): void { this.size = size; }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-checked': this.checked ? 'true' : undefined,
      'data-suraia-disabled': this.disabled ? 'true' : undefined,
      'data-suraia-variant': this.variant,
      'data-suraia-size': this.size,
      'data-suraia-type': this.type,
    };
  }
}
