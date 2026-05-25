/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { RangeSliderController };
export type { RangeSliderControllerOptions, RangeSliderMark };

interface RangeSliderMark {
  value: number;
  label?: string;
}

interface RangeSliderControllerOptions {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  disabled?: boolean;
  marks?: RangeSliderMark[];
  onChange?: (value: [number, number]) => void;
  onChangeEnd?: (value: [number, number]) => void;
}

class RangeSliderController {
  private min: number;
  private max: number;
  private step: number;
  private value: [number, number];
  private disabled: boolean;
  private marks: RangeSliderMark[];
  private onChange?: (value: [number, number]) => void;
  private onChangeEnd?: (value: [number, number]) => void;

  constructor(options: RangeSliderControllerOptions = {}) {
    this.min = options.min ?? 0;
    this.max = options.max ?? 100;
    this.step = options.step ?? 1;
    const initialVal = options.value ?? [20, 80];
    this.value = [
      this.clamp(initialVal[0]),
      this.clamp(initialVal[1])
    ];
    if (this.value[0] > this.value[1]) {
      this.value = [this.value[1], this.value[0]];
    }
    this.disabled = options.disabled ?? false;
    this.marks = options.marks ?? [];
    this.onChange = options.onChange;
    this.onChangeEnd = options.onChangeEnd;
  }

  public getValue(): [number, number] { return [...this.value]; }
  public getMin(): number { return this.min; }
  public getMax(): number { return this.max; }
  public getStep(): number { return this.step; }
  public isDisabled(): boolean { return this.disabled; }
  public getMarks(): RangeSliderMark[] { return [...this.marks]; }

  public getPercentages(): [number, number] {
    const range = this.max - this.min;
    if (range === 0) return [0, 0];
    return [
      ((this.value[0] - this.min) / range) * 100,
      ((this.value[1] - this.min) / range) * 100
    ];
  }

  public setValue(value: [number, number]): void {
    if (this.disabled) return;
    const val0 = this.snap(this.clamp(value[0]));
    const val1 = this.snap(this.clamp(value[1]));
    
    const newValue: [number, number] = val0 <= val1 ? [val0, val1] : [val1, val0];
    if (newValue[0] !== this.value[0] || newValue[1] !== this.value[1]) {
      this.value = newValue;
      this.onChange?.([...this.value]);
    }
  }

  public setValueAtIndex(index: 0 | 1, val: number): void {
    if (this.disabled) return;
    const snapped = this.snap(this.clamp(val));
    const current = [...this.value] as [number, number];
    
    if (index === 0) {
      current[0] = Math.min(snapped, current[1]);
    } else {
      current[1] = Math.max(snapped, current[0]);
    }

    if (current[0] !== this.value[0] || current[1] !== this.value[1]) {
      this.value = current;
      this.onChange?.([...this.value]);
    }
  }

  public increment(index: 0 | 1): void {
    this.setValueAtIndex(index, this.value[index] + this.step);
  }

  public decrement(index: 0 | 1): void {
    this.setValueAtIndex(index, this.value[index] - this.step);
  }

  public setToMin(index: 0 | 1): void {
    if (index === 0) {
      this.setValueAtIndex(0, this.min);
    } else {
      this.setValueAtIndex(1, this.value[0]);
    }
  }

  public setToMax(index: 0 | 1): void {
    if (index === 1) {
      this.setValueAtIndex(1, this.max);
    } else {
      this.setValueAtIndex(0, this.value[1]);
    }
  }

  public commitValue(): void {
    this.onChangeEnd?.([...this.value]);
  }

  public handleKeyDown(index: 0 | 1, event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.increment(index);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.decrement(index);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.setToMin(index);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.setToMax(index);
    }
  }

  public getAriaAttributes(index: 0 | 1): Record<string, string> {
    return {
      'aria-valuenow': String(this.value[index]),
      'aria-valuemin': String(index === 0 ? this.min : this.value[0]),
      'aria-valuemax': String(index === 0 ? this.value[1] : this.max),
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
