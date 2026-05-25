/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { SimpleGridController };
export type { SimpleGridControllerOptions };

interface SimpleGridControllerOptions {
  cols?: number;
  spacing?: string;
  verticalSpacing?: string;
}

class SimpleGridController {
  private cols: number;
  private spacing: string;
  private verticalSpacing?: string;

  constructor(options: SimpleGridControllerOptions = {}) {
    this.cols = options.cols ?? 1;
    this.spacing = options.spacing ?? 'md';
    this.verticalSpacing = options.verticalSpacing;
  }

  public getCols(): number { return this.cols; }
  public setCols(cols: number): void { this.cols = cols; }

  public getSpacing(): string { return this.spacing; }
  public setSpacing(spacing: string): void { this.spacing = spacing; }

  public getVerticalSpacing(): string | undefined { return this.verticalSpacing; }
  public setVerticalSpacing(spacing: string | undefined): void { this.verticalSpacing = spacing; }

  public getStyle(): Record<string, string | undefined> {
    return {
      '--suraia-grid-cols': String(this.cols),
      '--suraia-grid-spacing': `var(--suraia-space-${this.spacing}, ${this.spacing})`,
      '--suraia-grid-vertical-spacing': this.verticalSpacing 
        ? `var(--suraia-space-${this.verticalSpacing}, ${this.verticalSpacing})`
        : undefined,
    };
  }
}
