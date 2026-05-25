/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { PaginationController };
export type { PaginationControllerOptions };

interface PaginationControllerOptions {
  total: number;
  value?: number;
  siblings?: number;
  boundaries?: number;
  onChange?: (page: number) => void;
}

class PaginationController {
  private total: number;
  private value: number;
  private siblings: number;
  private boundaries: number;
  private onChange?: (page: number) => void;

  constructor(options: PaginationControllerOptions) {
    this.total = Math.max(1, options.total);
    this.value = Math.max(1, Math.min(this.total, options.value ?? 1));
    this.siblings = options.siblings ?? 1;
    this.boundaries = options.boundaries ?? 1;
    this.onChange = options.onChange;
  }

  public getValue(): number { return this.value; }
  public getTotal(): number { return this.total; }

  public setPage(page: number): void {
    const clamped = Math.max(1, Math.min(this.total, page));
    if (clamped !== this.value) {
      this.value = clamped;
      this.onChange?.(this.value);
    }
  }

  public next(): void { this.setPage(this.value + 1); }
  public prev(): void { this.setPage(this.value - 1); }
  public first(): void { this.setPage(1); }
  public last(): void { this.setPage(this.total); }

  public canNext(): boolean { return this.value < this.total; }
  public canPrev(): boolean { return this.value > 1; }

  /**
   * Returns an array of page numbers and 'dots' strings for rendering.
   * E.g., [1, 'dots', 4, 5, 6, 'dots', 10]
   */
  public getRange(): (number | 'dots')[] {
    const totalPageNumbers = this.siblings * 2 + 3 + this.boundaries * 2;
    if (totalPageNumbers >= this.total) {
      return Array.from({ length: this.total }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(this.value - this.siblings, this.boundaries + 1);
    const rightSiblingIndex = Math.min(this.value + this.siblings, this.total - this.boundaries);

    const showLeftDots = leftSiblingIndex > this.boundaries + 2;
    const showRightDots = rightSiblingIndex < this.total - this.boundaries - 1;

    const result: (number | 'dots')[] = [];

    // Left boundary pages
    for (let i = 1; i <= this.boundaries; i++) result.push(i);

    // Left dots or extra pages
    if (showLeftDots) {
      result.push('dots');
    } else {
      for (let i = this.boundaries + 1; i < leftSiblingIndex; i++) result.push(i);
    }

    // Sibling pages
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) result.push(i);

    // Right dots or extra pages
    if (showRightDots) {
      result.push('dots');
    } else {
      for (let i = rightSiblingIndex + 1; i <= this.total - this.boundaries; i++) result.push(i);
    }

    // Right boundary pages
    for (let i = this.total - this.boundaries + 1; i <= this.total; i++) result.push(i);

    return result;
  }
}
