/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ScrollerController };
export type { ScrollerControllerOptions, ScrollerOrientation };

type ScrollerOrientation = 'horizontal' | 'vertical';

interface ScrollerControllerOptions {
  orientation?: ScrollerOrientation;
  itemCount?: number;
  visibleCount?: number;
  index?: number;
  loop?: boolean;
  onChange?: (index: number) => void;
}

class ScrollerController {
  private orientation: ScrollerOrientation;
  private itemCount: number;
  private visibleCount: number;
  private index: number;
  private loop: boolean;
  private onChange?: (index: number) => void;

  constructor(options: ScrollerControllerOptions = {}) {
    this.orientation = options.orientation ?? 'horizontal';
    this.itemCount = Math.max(0, options.itemCount ?? 0);
    this.visibleCount = Math.max(1, options.visibleCount ?? 1);
    this.loop = options.loop ?? false;
    this.onChange = options.onChange;
    this.index = this.clampIndex(options.index ?? 0);
  }

  public getIndex(): number {
    return this.index;
  }

  public scrollTo(index: number): void {
    const next = this.clampIndex(index);
    if (next === this.index) {
      return;
    }

    this.index = next;
    this.onChange?.(next);
  }

  public scrollNext(): void {
    if (this.canScrollForward()) {
      this.scrollTo(this.index + 1);
    } else if (this.loop) {
      this.scrollTo(0);
    }
  }

  public scrollPrevious(): void {
    if (this.canScrollBackward()) {
      this.scrollTo(this.index - 1);
    } else if (this.loop) {
      this.scrollTo(this.getMaxIndex());
    }
  }

  public canScrollForward(): boolean {
    return this.index < this.getMaxIndex();
  }

  public canScrollBackward(): boolean {
    return this.index > 0;
  }

  public getOrientation(): ScrollerOrientation {
    return this.orientation;
  }

  public getTrackStyle(): Record<string, string> {
    const offset = this.visibleCount === 0 ? 0 : (this.index * -100) / this.visibleCount;
    return {
      '--suraia-scroller-index': String(this.index),
      '--suraia-scroller-offset': `${offset}%`,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Scroller',
      'data-suraia-orientation': this.orientation,
      'data-suraia-can-scroll-forward': String(this.canScrollForward()),
      'data-suraia-can-scroll-backward': String(this.canScrollBackward()),
    };
  }

  private getMaxIndex(): number {
    return Math.max(0, this.itemCount - this.visibleCount);
  }

  private clampIndex(index: number): number {
    return Math.min(this.getMaxIndex(), Math.max(0, index));
  }
}
