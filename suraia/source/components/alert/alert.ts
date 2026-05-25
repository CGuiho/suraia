/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { AlertController };
export type { AlertControllerOptions, AlertVariant, AlertColor };

type AlertVariant = 'filled' | 'light' | 'outline' | 'transparent' | 'default';
type AlertColor = 'primary' | 'error' | 'success' | 'warning' | 'info';

interface AlertControllerOptions {
  variant?: AlertVariant;
  color?: AlertColor;
  withCloseButton?: boolean;
  onClose?: () => void;
}

class AlertController {
  private variant: AlertVariant;
  private color: AlertColor;
  private withCloseButton: boolean;
  private closed: boolean;
  private onClose?: () => void;

  constructor(options: AlertControllerOptions = {}) {
    this.variant = options.variant ?? 'light';
    this.color = options.color ?? 'info';
    this.withCloseButton = options.withCloseButton ?? false;
    this.closed = false;
    this.onClose = options.onClose;
  }

  public getVariant(): AlertVariant { return this.variant; }
  public getColor(): AlertColor { return this.color; }
  public hasCloseButton(): boolean { return this.withCloseButton; }
  public isClosed(): boolean { return this.closed; }

  public close(): void {
    this.closed = true;
    this.onClose?.();
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Alert',
      'data-suraia-variant': this.variant,
      'data-suraia-color': this.color,
    };
  }
}
