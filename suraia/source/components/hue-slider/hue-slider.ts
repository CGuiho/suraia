/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { HueSliderController };
export type { HueSliderControllerOptions };

interface HueSliderControllerOptions {
  value?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
}

class HueSliderController {
  private value: number;
  private step: number;
  private disabled: boolean;
  private onChange?: (value: number) => void;
  private onChangeEnd?: (value: number) => void;

  constructor(options: HueSliderControllerOptions = {}) {
    this.value = this.clamp(options.value ?? 0);
    this.step = options.step ?? 1;
    this.disabled = options.disabled ?? false;
    this.onChange = options.onChange;
    this.onChangeEnd = options.onChangeEnd;
  }

  public getValue(): number { return this.value; }
  public getStep(): number { return this.step; }
  public isDisabled(): boolean { return this.disabled; }

  public getPercentage(): number {
    return (this.value / 360) * 100;
  }

  public setValue(value: number): void {
    if (this.disabled) return;
    const snapped = this.snap(this.clamp(value));
    if (snapped !== this.value) {
      this.value = snapped;
      this.onChange?.(this.value);
    }
  }

  public increment(): void { this.setValue(this.value + this.step); }
  public decrement(): void { this.setValue(this.value - this.step); }
  public setToMin(): void { this.setValue(0); }
  public setToMax(): void { this.setValue(360); }

  public commitValue(): void {
    this.onChangeEnd?.(this.value);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.increment();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.decrement();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.setToMin();
    } else if (event.key === 'End') {
      event.preventDefault();
      this.setToMax();
    }
  }

  public getAriaAttributes(): Record<string, string> {
    return {
      'role': 'slider',
      'aria-valuenow': String(this.value),
      'aria-valuemin': '0',
      'aria-valuemax': '360',
      'aria-orientation': 'horizontal',
    };
  }

  private clamp(value: number): number {
    return Math.max(0, Math.min(360, value));
  }

  private snap(value: number): number {
    return Math.round(value / this.step) * this.step;
  }
}
