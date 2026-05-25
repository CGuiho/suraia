/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { GroupController };
export type { GroupControllerOptions };

interface GroupControllerOptions {
  gap?: string;
  align?: string;
  justify?: string;
  wrap?: string;
  grow?: boolean;
  preventGrowOverflow?: boolean;
}

class GroupController {
  private gap: string;
  private align: string;
  private justify: string;
  private wrap: string;
  private grow: boolean;
  private preventGrowOverflow: boolean;

  constructor(options: GroupControllerOptions = {}) {
    this.gap = options.gap ?? 'md';
    this.align = options.align ?? 'center';
    this.justify = options.justify ?? 'flex-start';
    this.wrap = options.wrap ?? 'nowrap';
    this.grow = options.grow ?? false;
    this.preventGrowOverflow = options.preventGrowOverflow ?? true;
  }

  public getGap(): string { return this.gap; }
  public setGap(gap: string): void { this.gap = gap; }
  public getAlign(): string { return this.align; }
  public setAlign(align: string): void { this.align = align; }
  public getJustify(): string { return this.justify; }
  public setJustify(justify: string): void { this.justify = justify; }
  public getWrap(): string { return this.wrap; }
  public setWrap(wrap: string): void { this.wrap = wrap; }
  public isGrow(): boolean { return this.grow; }
  public setGrow(grow: boolean): void { this.grow = grow; }

  public getStyle(): Record<string, string> {
    return {
      '--suraia-group-gap': this.gap,
      '--suraia-group-align': this.align,
      '--suraia-group-justify': this.justify,
      '--suraia-group-wrap': this.wrap,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Group',
      'data-suraia-grow': this.grow ? '' : undefined,
      'data-suraia-prevent-grow-overflow': this.grow && this.preventGrowOverflow ? '' : undefined,
    };
  }
}
