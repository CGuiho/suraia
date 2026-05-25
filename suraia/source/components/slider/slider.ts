/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { SliderController };
export type { SliderControllerOptions, SliderMark };

interface SliderMark {
  value: number;
  label?: string;
}

interface SliderControllerOptions {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  disabled?: boolean;
  marks?: SliderMark[];
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
}

class SliderController {
  private min: number;
  private max: number;
  private step: number;
  private value: number;
  private disabled: boolean;
  private marks: SliderMark[];
  private onChange?: (value: number) => void;
  private onChangeEnd?: (value: number) => void;

  constructor(options: SliderControllerOptions = {}) {
    this.min = options.min ?? 0;
    this.max = options.max ?? 100;
    this.step = options.step ?? 1;
    this.value = this.clamp(options.value ?? this.min);
    this.disabled = options.disabled ?? false;
    this.marks = options.marks ?? [];
    this.onChange = options.onChange;
    this.onChangeEnd = options.onChangeEnd;
  }

  public getValue(): number { return this.value; }
  public getMin(): number { return this.min; }
  public getMax(): number { return this.max; }
  public getStep(): number { return this.step; }
  public isDisabled(): boolean { return this.disabled; }
  public getMarks(): SliderMark[] { return [...this.marks]; }

  public getPercentage(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
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
  public setToMin(): void { this.setValue(this.min); }
  public setToMax(): void { this.setValue(this.max); }

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
      'aria-valuenow': String(this.value),
      'aria-valuemin': String(this.min),
      'aria-valuemax': String(this.max),
      'aria-orientation': 'horizontal',
    };
  }

  private clamp(value: number): number {
    return Math.max(this.min, Math.min(this.max, value));
  }

  private snap(value: number): number {
    return Math.round((value - this.min) / this.step) * this.step + this.min;
  }
}
