/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { LoadingOverlayController };
export type { LoadingOverlayControllerOptions };

interface LoadingOverlayControllerOptions {
  visible?: boolean;
  blur?: number;
  overlayOpacity?: number;
  overlayColor?: string;
  zIndex?: number;
}

class LoadingOverlayController {
  private visible: boolean;
  private blur: number;
  private overlayOpacity: number;
  private overlayColor: string;
  private zIndex: number;

  constructor(options: LoadingOverlayControllerOptions = {}) {
    this.visible = options.visible ?? false;
    this.blur = options.blur ?? 0;
    this.overlayOpacity = options.overlayOpacity ?? 0.6;
    this.overlayColor = options.overlayColor ?? '#fff';
    this.zIndex = options.zIndex ?? 400;
  }

  public isVisible(): boolean { return this.visible; }
  public getBlur(): number { return this.blur; }
  public getOverlayOpacity(): number { return this.overlayOpacity; }
  public getOverlayColor(): string { return this.overlayColor; }
  public getZIndex(): number { return this.zIndex; }

  public show(): void {
    this.visible = true;
  }

  public hide(): void {
    this.visible = false;
  }

  public toggle(): void {
    this.visible = !this.visible;
  }

  public getStyle(): Record<string, string> {
    let r = 255, g = 255, b = 255;
    if (this.overlayColor.startsWith('#')) {
      const cleanHex = this.overlayColor.replace('#', '');
      if (cleanHex.length === 3 && cleanHex[0] && cleanHex[1] && cleanHex[2]) {
        r = parseInt(cleanHex[0] + cleanHex[0], 16);
        g = parseInt(cleanHex[1] + cleanHex[1], 16);
        b = parseInt(cleanHex[2] + cleanHex[2], 16);
      } else if (cleanHex.length === 6) {
        r = parseInt(cleanHex.slice(0, 2), 16);
        g = parseInt(cleanHex.slice(2, 4), 16);
        b = parseInt(cleanHex.slice(4, 6), 16);
      }
    }
    return {
      '--suraia-loading-overlay-bg': `rgba(${r}, ${g}, ${b}, ${this.overlayOpacity})`,
      '--suraia-loading-overlay-blur': `${this.blur}px`,
      '--suraia-loading-overlay-z-index': String(this.zIndex),
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'LoadingOverlay',
      'data-suraia-visible': this.visible ? '' : undefined,
    };
  }
}
