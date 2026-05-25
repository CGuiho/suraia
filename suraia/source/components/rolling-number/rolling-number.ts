/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { RollingNumberController };
export type { RollingNumberControllerOptions, RollingNumberSize };

type RollingNumberSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface RollingNumberControllerOptions {
  value?: number;
  duration?: number;
  size?: RollingNumberSize;
}

class RollingNumberController {
  private value: number;
  private previousValue: number;
  private duration: number;
  private size: RollingNumberSize;

  constructor(options: RollingNumberControllerOptions = {}) {
    this.value = options.value ?? 0;
    this.previousValue = this.value;
    this.duration = options.duration ?? 1000;
    this.size = options.size ?? 'md';
  }

  public getValue(): number {
    return this.value;
  }

  public setValue(val: number): void {
    this.previousValue = this.value;
    this.value = val;
  }

  public getPreviousValue(): number {
    return this.previousValue;
  }

  public getDuration(): number {
    return this.duration;
  }

  public setDuration(duration: number): void {
    this.duration = duration;
  }

  public getSize(): RollingNumberSize {
    return this.size;
  }

  public setSize(size: RollingNumberSize): void {
    this.size = size;
  }

  public getDigits(): string[] {
    return String(Math.abs(this.value)).split('');
  }

  public getPreviousDigits(): string[] {
    return String(Math.abs(this.previousValue)).split('');
  }

  public getDigitOffset(digit: string): number {
    const parsed = parseInt(digit, 10);
    if (Number.isNaN(parsed) || parsed === 0) {
      return 0;
    }
    return parsed * -10; // offset in percentage, e.g. -20% for digit 2
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'RollingNumber',
      'data-suraia-size': this.size,
    };
  }

  public getStyle(): Record<string, string> {
    return {
      '--suraia-rolling-duration': `${this.duration}ms`,
    };
  }
}
