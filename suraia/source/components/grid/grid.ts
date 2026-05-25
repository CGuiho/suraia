/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { GridController };
export type { GridControllerOptions };

interface GridControllerOptions {
  columns?: number;
  gutter?: string;
  grow?: boolean;
}

class GridController {
  private columns: number;
  private gutter: string;
  private grow: boolean;

  constructor(options: GridControllerOptions = {}) {
    this.columns = options.columns ?? 12;
    this.gutter = options.gutter ?? 'md';
    this.grow = options.grow ?? false;
  }

  public getColumns(): number { return this.columns; }
  public getGutter(): string { return this.gutter; }
  public isGrow(): boolean { return this.grow; }

  public getStyle(): Record<string, string> {
    return {
      '--suraia-grid-columns': String(this.columns),
      '--suraia-grid-gutter': `var(--suraia-space-${this.gutter === 'md' ? '4' : this.gutter})`,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Grid',
      'data-suraia-grow': this.grow ? '' : undefined,
    };
  }
}
