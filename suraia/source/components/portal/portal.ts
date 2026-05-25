/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { PortalController };
export type { PortalControllerOptions };

interface PortalControllerOptions {
  target?: string | HTMLElement;
}

class PortalController {
  private target: string | HTMLElement;
  private portalElement: HTMLElement | null;
  private targetElement: HTMLElement | null;

  constructor(options: PortalControllerOptions = {}) {
    this.target = options.target ?? 'body';
    this.portalElement = null;
    this.targetElement = null;
  }

  public getTarget(): string | HTMLElement { return this.target; }

  public mount(element: HTMLElement): HTMLElement | null {
    if (typeof this.target === 'string') {
      if (this.target === 'body') {
        this.targetElement = typeof document !== 'undefined' ? document.body : null;
      } else {
        this.targetElement = typeof document !== 'undefined' ? document.querySelector(this.target) as HTMLElement : null;
      }
    } else {
      this.targetElement = this.target;
    }

    if (!this.targetElement) {
      return null;
    }

    this.portalElement = element;
    this.targetElement.appendChild(this.portalElement);
    return this.portalElement;
  }

  public unmount(): void {
    if (this.portalElement && this.portalElement.parentNode) {
      this.portalElement.parentNode.removeChild(this.portalElement);
    }
    this.portalElement = null;
    this.targetElement = null;
  }

  public destroy(): void {
    this.unmount();
  }
}
