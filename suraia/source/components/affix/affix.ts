/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { AffixController };
export type { AffixControllerOptions };

interface AffixControllerOptions {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  zIndex?: number;
}

class AffixController {
  private top?: string | number;
  private bottom?: string | number;
  private left?: string | number;
  private right?: string | number;
  private zIndex: number;

  constructor(options: AffixControllerOptions = {}) {
    this.top = options.top;
    this.bottom = options.bottom;
    this.left = options.left;
    this.right = options.right;
    this.zIndex = options.zIndex ?? 100;
  }

  public getTop(): string | number | undefined { return this.top; }
  public getBottom(): string | number | undefined { return this.bottom; }
  public getLeft(): string | number | undefined { return this.left; }
  public getRight(): string | number | undefined { return this.right; }
  public getZIndex(): number { return this.zIndex; }

  private formatValue(value: string | number | undefined): string | undefined {
    if (value === undefined) return undefined;
    return typeof value === 'number' ? `${value}px` : value;
  }

  public getStyle(): Record<string, string> {
    const style: Record<string, string> = {
      '--suraia-affix-z-index': String(this.zIndex),
    };

    const topVal = this.formatValue(this.top);
    if (topVal !== undefined) style['--suraia-affix-top'] = topVal;

    const bottomVal = this.formatValue(this.bottom);
    if (bottomVal !== undefined) style['--suraia-affix-bottom'] = bottomVal;

    const leftVal = this.formatValue(this.left);
    if (leftVal !== undefined) style['--suraia-affix-left'] = leftVal;

    const rightVal = this.formatValue(this.right);
    if (rightVal !== undefined) style['--suraia-affix-right'] = rightVal;

    return style;
  }
}
