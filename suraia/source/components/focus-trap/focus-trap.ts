/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { FocusTrapController };
export type { FocusTrapControllerOptions };

interface FocusTrapControllerOptions {
  active?: boolean;
}

class FocusTrapController {
  private active: boolean;

  constructor(options: FocusTrapControllerOptions = {}) {
    this.active = options.active ?? true;
  }

  public isActive(): boolean {
    return this.active;
  }

  public setActive(active: boolean): void {
    this.active = active;
  }

  /**
   * Helper to retrieve all focusable elements within a given container.
   */
  public findFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[tabindex="0"]',
      '[contenteditable]',
      'audio[controls]',
      'video[controls]',
      'summary',
    ].join(',');

    const elements = Array.from(container.querySelectorAll<HTMLElement>(selector));
    // Filter out elements that are not visible or have tabIndex < 0
    return elements.filter(el => {
      if (el.tabIndex < 0) return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden';
    });
  }

  /**
   * Logic to intercept keydown events and trap focus.
   * Return true if the event was handled (focused wrapped).
   */
  public handleTabKey(event: KeyboardEvent, container: HTMLElement): boolean {
    if (!this.active || event.key !== 'Tab') {
      return false;
    }

    const focusables = this.findFocusableElements(container);
    if (focusables.length === 0) {
      event.preventDefault();
      return true;
    }

    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;
    const activeEl = document.activeElement as HTMLElement;

    if (event.shiftKey) {
      // Shift + Tab -> Wrap to last element if currently at first
      if (activeEl === first || !focusables.includes(activeEl)) {
        event.preventDefault();
        last.focus();
        return true;
      }
    } else {
      // Tab -> Wrap to first element if currently at last
      if (activeEl === last || !focusables.includes(activeEl)) {
        event.preventDefault();
        first.focus();
        return true;
      }
    }

    return false;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'FocusTrap',
      'data-suraia-active': String(this.active),
    };
  }
}
