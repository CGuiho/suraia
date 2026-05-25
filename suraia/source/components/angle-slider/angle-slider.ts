/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { AngleSliderController };
export type { AngleSliderControllerOptions };

interface AngleSliderControllerOptions {
  value?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
}

class AngleSliderController {
  private value: number;
  private step: number;
  private disabled: boolean;
  private onChange?: (value: number) => void;
  private onChangeEnd?: (value: number) => void;

  constructor(options: AngleSliderControllerOptions = {}) {
    this.step = options.step ?? 1;
    this.disabled = options.disabled ?? false;
    const snapped = this.snap(this.clampAndWrap(options.value ?? 0));
    this.value = snapped === 360 ? 0 : snapped;
    this.onChange = options.onChange;
    this.onChangeEnd = options.onChangeEnd;
  }

  public getValue(): number { return this.value; }
  public getStep(): number { return this.step; }
  public isDisabled(): boolean { return this.disabled; }

  public setValue(value: number): void {
    if (this.disabled) return;
    const wrapped = this.clampAndWrap(value);
    const snapped = this.snap(wrapped);
    const finalVal = snapped === 360 ? 0 : snapped;
    if (finalVal !== this.value) {
      this.value = finalVal;
      this.onChange?.(this.value);
    }
  }

  public increment(): void {
    this.setValue(this.value + this.step);
  }

  public decrement(): void {
    this.setValue(this.value - this.step);
  }

  public setToMin(): void {
    this.setValue(0);
  }

  public setToMax(): void {
    this.setValue(360 - this.step);
  }

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

  /**
   * Calculates angle in degrees given client coordinates (x, y) relative to
   * center coordinate (cx, cy).
   * Note: SVG coordinate system has y-axis pointing down.
   */
  public calculateAngleFromCoords(x: number, y: number, cx: number, cy: number): number {
    const dx = x - cx;
    const dy = y - cy;
    // atan2 returns angle in radians from -PI to PI
    // We add PI/2 to rotate the 0-degree point to the top (12 o'clock)
    let radians = Math.atan2(dy, dx) + Math.PI / 2;
    if (radians < 0) {
      radians += 2 * Math.PI;
    }
    const degrees = (radians * 180) / Math.PI;
    return this.snap(this.clampAndWrap(degrees));
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

  private clampAndWrap(value: number): number {
    let val = value % 360;
    if (val < 0) {
      val += 360;
    }
    return val;
  }

  private snap(value: number): number {
    return Math.round(value / this.step) * this.step;
  }
}
