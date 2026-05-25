/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { SegmentedControlController };
export type { SegmentedControlControllerOptions };

interface SegmentedControlControllerOptions {
  data: string[];
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

class SegmentedControlController {
  private data: string[];
  private value: string;
  private disabled: boolean;
  private onChange?: (value: string) => void;

  constructor(options: SegmentedControlControllerOptions) {
    this.data = options.data;
    this.value = options.value ?? this.data[0] ?? '';
    this.disabled = options.disabled ?? false;
    this.onChange = options.onChange;
  }

  public getValue(): string { return this.value; }
  public getData(): string[] { return [...this.data]; }
  public isDisabled(): boolean { return this.disabled; }

  public isActive(value: string): boolean {
    return this.value === value;
  }

  public setValue(value: string): void {
    if (this.disabled) return;
    if (this.data.includes(value) && value !== this.value) {
      this.value = value;
      this.onChange?.(value);
    }
  }

  public selectNext(): void {
    const idx = this.data.indexOf(this.value);
    const next = this.data[(idx + 1) % this.data.length];
    if (next) this.setValue(next);
  }

  public selectPrev(): void {
    const idx = this.data.indexOf(this.value);
    const prev = this.data[(idx - 1 + this.data.length) % this.data.length];
    if (prev) this.setValue(prev);
  }
}
