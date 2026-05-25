/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { OverflowListController };
export type { OverflowListControllerOptions, OverflowCollapsePosition };

type OverflowCollapsePosition = 'start' | 'end';

interface OverflowListControllerOptions {
  items?: any[];
  visibleCount?: number;
  collapsePosition?: OverflowCollapsePosition;
  overflowLabel?: string;
}

class OverflowListController {
  private items: any[];
  private visibleCount: number;
  private collapsePosition: OverflowCollapsePosition;
  private overflowLabel: string;

  constructor(options: OverflowListControllerOptions = {}) {
    this.items = options.items ?? [];
    this.visibleCount = options.visibleCount ?? 3;
    this.collapsePosition = options.collapsePosition ?? 'end';
    this.overflowLabel = options.overflowLabel ?? '+{count} more';
  }

  public getItems(): any[] {
    return this.items;
  }

  public setItems(items: any[]): void {
    this.items = items;
  }

  public getVisibleCount(): number {
    return this.visibleCount;
  }

  public setVisibleCount(count: number): void {
    this.visibleCount = Math.max(0, count);
  }

  public getCollapsePosition(): OverflowCollapsePosition {
    return this.collapsePosition;
  }

  public setCollapsePosition(position: OverflowCollapsePosition): void {
    this.collapsePosition = position;
  }

  public getOverflowLabel(): string {
    const overflowCount = this.getOverflowCount();
    return this.overflowLabel.replace('{count}', String(overflowCount));
  }

  public getOverflowCount(): number {
    return Math.max(0, this.items.length - this.visibleCount);
  }

  public getVisibleItems(): any[] {
    if (this.items.length <= this.visibleCount) {
      return this.items;
    }
    if (this.collapsePosition === 'end') {
      return this.items.slice(0, this.visibleCount);
    } else {
      return this.items.slice(this.items.length - this.visibleCount);
    }
  }

  public getOverflowItems(): any[] {
    if (this.items.length <= this.visibleCount) {
      return [];
    }
    if (this.collapsePosition === 'end') {
      return this.items.slice(this.visibleCount);
    } else {
      return this.items.slice(0, this.items.length - this.visibleCount);
    }
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'OverflowList',
      'data-suraia-collapse-position': this.collapsePosition,
    };
  }
}
