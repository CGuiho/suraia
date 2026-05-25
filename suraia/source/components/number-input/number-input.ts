/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { NumberInputController };
export type { NumberInputControllerOptions };

interface NumberInputControllerOptions {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  error?: string;
  onChange?: (value: number) => void;
}

class NumberInputController {
  private value: number;
  private min?: number;
  private max?: number;
  private step: number;
  private precision?: number;
  private disabled: boolean;
  private error?: string;
  private onChange?: (value: number) => void;

  constructor(options: NumberInputControllerOptions = {}) {
    this.value = options.value ?? 0;
    this.min = options.min;
    this.max = options.max;
    this.step = options.step ?? 1;
    this.precision = options.precision;
    this.disabled = options.disabled ?? false;
    this.error = options.error;
    this.onChange = options.onChange;
  }

  public getValue(): number { return this.value; }
  public isDisabled(): boolean { return this.disabled; }
  public getError(): string | undefined { return this.error; }
  public hasError(): boolean { return this.error !== undefined && this.error.length > 0; }

  public setValue(value: number): void {
    if (this.disabled) return;
    const clamped = this.clamp(value);
    const rounded = this.precision !== undefined
      ? Math.round((clamped + Number.EPSILON) * Math.pow(10, this.precision)) / Math.pow(10, this.precision)
      : clamped;
    if (rounded !== this.value) {
      this.value = rounded;
      this.onChange?.(this.value);
    }
  }

  public increment(): void { this.setValue(this.value + this.step); }
  public decrement(): void { this.setValue(this.value - this.step); }

  public canIncrement(): boolean {
    return this.max === undefined || this.value + this.step <= this.max;
  }

  public canDecrement(): boolean {
    return this.min === undefined || this.value - this.step >= this.min;
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === 'ArrowUp') { event.preventDefault(); this.increment(); }
    else if (event.key === 'ArrowDown') { event.preventDefault(); this.decrement(); }
  }

  private clamp(value: number): number {
    let result = value;
    if (this.min !== undefined) result = Math.max(this.min, result);
    if (this.max !== undefined) result = Math.min(this.max, result);
    return result;
  }
}
