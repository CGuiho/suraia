/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { PinInputController };
export type { PinInputControllerOptions };

interface PinInputControllerOptions {
  length?: number;
  value?: string;
  type?: 'number' | 'alphanumeric';
  mask?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
}

class PinInputController {
  private length: number;
  private values: string[];
  private type: 'number' | 'alphanumeric';
  private mask: boolean;
  private disabled: boolean;
  private onChange?: (value: string) => void;
  private onComplete?: (value: string) => void;

  constructor(options: PinInputControllerOptions = {}) {
    this.length = options.length ?? 4;
    this.type = options.type ?? 'number';
    this.mask = options.mask ?? false;
    this.disabled = options.disabled ?? false;
    this.onChange = options.onChange;
    this.onComplete = options.onComplete;

    const initialValue = options.value ?? '';
    this.values = Array.from({ length: this.length }, (_, i) => initialValue[i] ?? '');
  }

  public getLength(): number { return this.length; }
  public getValues(): string[] { return this.values; }
  public getValue(): string { return this.values.join(''); }
  
  public setValue(val: string): void {
    if (this.disabled) return;
    const sanitized = this.sanitize(val).slice(0, this.length);
    this.values = Array.from({ length: this.length }, (_, i) => sanitized[i] ?? '');
    
    const finalValue = this.getValue();
    this.onChange?.(finalValue);
    if (finalValue.length === this.length) {
      this.onComplete?.(finalValue);
    }
  }

  public setCharacter(index: number, char: string): void {
    if (this.disabled || index < 0 || index >= this.length) return;
    const sanitizedChar = this.sanitize(char).slice(0, 1);
    this.values[index] = sanitizedChar;

    const finalValue = this.getValue();
    this.onChange?.(finalValue);
    if (finalValue.length === this.length) {
      this.onComplete?.(finalValue);
    }
  }

  public clear(): void {
    if (this.disabled) return;
    this.values = Array(this.length).fill('');
    this.onChange?.('');
  }

  public isMasked(): boolean { return this.mask; }
  public setMask(mask: boolean): void { this.mask = mask; }

  public isDisabled(): boolean { return this.disabled; }
  public setDisabled(disabled: boolean): void { this.disabled = disabled; }

  public getType(): 'number' | 'alphanumeric' { return this.type; }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-disabled': this.disabled ? 'true' : undefined,
      'data-suraia-masked': this.mask ? 'true' : undefined,
    };
  }

  private sanitize(val: string): string {
    if (this.type === 'number') {
      return val.replace(/\D/g, '');
    }
    return val.replace(/[^a-zA-Z0-9]/g, '');
  }
}
