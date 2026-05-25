/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { RatingController };
export type { RatingControllerOptions };

interface RatingControllerOptions {
  value?: number;
  count?: number;
  fractions?: number;
  disabled?: boolean;
  readOnly?: boolean;
  highlightSelectedOnly?: boolean;
  onChange?: (value: number) => void;
  onHover?: (value: number | null) => void;
}

class RatingController {
  private value: number;
  private count: number;
  private fractions: number;
  private disabled: boolean;
  private readOnly: boolean;
  private highlightSelectedOnly: boolean;
  private hoverValue: number | null = null;
  private onChange?: (value: number) => void;
  private onHover?: (value: number | null) => void;

  constructor(options: RatingControllerOptions = {}) {
    this.count = options.count ?? 5;
    this.fractions = options.fractions ?? 1;
    this.value = this.snap(this.clamp(options.value ?? 0));
    this.disabled = options.disabled ?? false;
    this.readOnly = options.readOnly ?? false;
    this.highlightSelectedOnly = options.highlightSelectedOnly ?? false;
    this.onChange = options.onChange;
    this.onHover = options.onHover;
  }

  public getValue(): number { return this.value; }
  public getCount(): number { return this.count; }
  public getFractions(): number { return this.fractions; }
  public isDisabled(): boolean { return this.disabled; }
  public isReadOnly(): boolean { return this.readOnly; }
  public isHighlightSelectedOnly(): boolean { return this.highlightSelectedOnly; }
  public getHoverValue(): number | null { return this.hoverValue; }

  public setValue(value: number): void {
    if (this.disabled || this.readOnly) return;
    const snapped = this.snap(this.clamp(value));
    if (snapped !== this.value) {
      this.value = snapped;
      this.onChange?.(this.value);
    }
  }

  public setHoverValue(value: number | null): void {
    if (this.disabled || this.readOnly) return;
    const snapped = value === null ? null : this.snap(this.clamp(value));
    if (snapped !== this.hoverValue) {
      this.hoverValue = snapped;
      this.onHover?.(this.hoverValue);
    }
  }

  public increment(): void {
    this.setValue(this.value + 1 / this.fractions);
  }

  public decrement(): void {
    this.setValue(this.value - 1 / this.fractions);
  }

  public setToMin(): void {
    this.setValue(0);
  }

  public setToMax(): void {
    this.setValue(this.count);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.readOnly) return;
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

  public getItemFillPercentage(itemIndex: number): number {
    const activeValue = this.hoverValue !== null ? this.hoverValue : this.value;
    if (this.highlightSelectedOnly) {
      const rounded = Math.round(activeValue);
      return rounded === itemIndex + 1 ? 100 : 0;
    }
    const diff = activeValue - itemIndex;
    if (diff >= 1) return 100;
    if (diff <= 0) return 0;
    return diff * 100;
  }

  public getAriaAttributes(): Record<string, string> {
    return {
      'role': 'radiogroup',
      'aria-valuenow': String(this.value),
      'aria-valuemin': '0',
      'aria-valuemax': String(this.count),
    };
  }

  private clamp(value: number): number {
    return Math.max(0, Math.min(this.count, value));
  }

  private snap(value: number): number {
    const step = 1 / this.fractions;
    return Math.round(value / step) * step;
  }
}
