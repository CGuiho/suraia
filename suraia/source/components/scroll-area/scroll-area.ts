/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ScrollAreaController };
export type { ScrollAreaControllerOptions, ScrollbarVisibility };

type ScrollbarVisibility = 'auto' | 'always' | 'hover' | 'never';

interface ScrollAreaControllerOptions {
  scrollbarVisibility?: ScrollbarVisibility;
}

class ScrollAreaController {
  private scrollbarVisibility: ScrollbarVisibility;

  constructor(options: ScrollAreaControllerOptions = {}) {
    this.scrollbarVisibility = options.scrollbarVisibility ?? 'hover';
  }

  public getScrollbarVisibility(): ScrollbarVisibility {
    return this.scrollbarVisibility;
  }

  public setScrollbarVisibility(visibility: ScrollbarVisibility): void {
    this.scrollbarVisibility = visibility;
  }

  /**
   * Helper logic to compute custom scrollbar thumb sizes and offsets based on scroll measurements.
   */
  public calculateThumbStyles(
    viewportSize: number,
    contentSize: number,
    scrollOffset: number
  ): { size: number; offset: number } {
    if (contentSize <= viewportSize) {
      return { size: 0, offset: 0 };
    }
    const ratio = viewportSize / contentSize;
    const thumbSize = Math.max(20, viewportSize * ratio);
    const maxScroll = contentSize - viewportSize;
    const maxThumbOffset = viewportSize - thumbSize;
    const offsetRatio = scrollOffset / maxScroll;
    const thumbOffset = maxThumbOffset * offsetRatio;

    return {
      size: Math.round(thumbSize),
      offset: Math.round(thumbOffset),
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'ScrollArea',
      'data-suraia-scrollbar-visibility': this.scrollbarVisibility,
    };
  }
}
