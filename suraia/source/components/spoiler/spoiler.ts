/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { SpoilerController };
export type { SpoilerControllerOptions };

interface SpoilerControllerOptions {
  expanded?: boolean;
  maxHeight?: number;
  showLabel?: string;
  hideLabel?: string;
  onToggle?: (expanded: boolean) => void;
}

class SpoilerController {
  private expanded: boolean;
  private maxHeight: number;
  private showLabel: string;
  private hideLabel: string;
  private onToggle?: (expanded: boolean) => void;

  constructor(options: SpoilerControllerOptions = {}) {
    this.expanded = options.expanded ?? false;
    this.maxHeight = options.maxHeight ?? 120;
    this.showLabel = options.showLabel ?? 'Show more';
    this.hideLabel = options.hideLabel ?? 'Hide';
    this.onToggle = options.onToggle;
  }

  public isExpanded(): boolean {
    return this.expanded;
  }

  public setExpanded(expanded: boolean): void {
    if (this.expanded === expanded) {
      return;
    }

    this.expanded = expanded;
    this.onToggle?.(expanded);
  }

  public toggle(): void {
    this.setExpanded(!this.expanded);
  }

  public getMaxHeight(): number {
    return this.maxHeight;
  }

  public getControlLabel(): string {
    return this.expanded ? this.hideLabel : this.showLabel;
  }

  public getStyle(): Record<string, string> {
    return {
      '--suraia-spoiler-max-height': this.expanded ? 'none' : `${this.maxHeight}px`,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Spoiler',
      'data-suraia-expanded': String(this.expanded),
    };
  }
}
