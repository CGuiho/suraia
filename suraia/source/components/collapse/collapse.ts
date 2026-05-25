/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { CollapseController };
export type { CollapseControllerOptions };

interface CollapseControllerOptions {
  opened?: boolean;
  transitionDuration?: number;
  transitionTimingFunction?: string;
  onTransitionEnd?: () => void;
}

class CollapseController {
  private opened: boolean;
  private transitionDuration: number;
  private transitionTimingFunction: string;
  private onTransitionEnd?: () => void;

  constructor(options: CollapseControllerOptions = {}) {
    this.opened = options.opened ?? false;
    this.transitionDuration = options.transitionDuration ?? 200;
    this.transitionTimingFunction = options.transitionTimingFunction ?? 'ease';
    this.onTransitionEnd = options.onTransitionEnd;
  }

  public isOpened(): boolean { return this.opened; }
  public getTransitionDuration(): number { return this.transitionDuration; }
  public getTransitionTimingFunction(): string { return this.transitionTimingFunction; }

  public open(): void {
    this.opened = true;
  }

  public close(): void {
    this.opened = false;
  }

  public toggle(): void {
    this.opened = !this.opened;
  }

  public getStyle(): Record<string, string> {
    return {
      '--suraia-collapse-duration': `${this.transitionDuration}ms`,
      '--suraia-collapse-timing': this.transitionTimingFunction,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Collapse',
      'data-suraia-opened': this.opened ? '' : undefined,
    };
  }

  public animate(element: HTMLElement): void {
    if (this.opened) {
      element.style.height = `${element.scrollHeight}px`;
      element.setAttribute('aria-hidden', 'false');
      
      const handleEnd = () => {
        if (this.opened) {
          element.style.height = 'auto';
        }
        element.removeEventListener('transitionend', handleEnd);
        this.onTransitionEnd?.();
      };
      element.addEventListener('transitionend', handleEnd);
    } else {
      element.style.height = `${element.offsetHeight}px`;
      
      // Force browser reflow
      const _reflow = element.offsetHeight;
      void _reflow;
      
      element.style.height = '0';
      element.setAttribute('aria-hidden', 'true');

      const handleEnd = () => {
        element.removeEventListener('transitionend', handleEnd);
        this.onTransitionEnd?.();
      };
      element.addEventListener('transitionend', handleEnd);
    }
  }
}
