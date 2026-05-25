/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { DialogController };
export type { DialogControllerOptions };

interface DialogControllerOptions {
  opened?: boolean;
  title?: string;
  withCloseButton?: boolean;
  onClose?: () => void;
}

class DialogController {
  private opened: boolean;
  private title?: string;
  private withCloseButton: boolean;
  private onClose?: () => void;

  constructor(options: DialogControllerOptions = {}) {
    this.opened = options.opened ?? false;
    this.title = options.title;
    this.withCloseButton = options.withCloseButton ?? true;
    this.onClose = options.onClose;
  }

  public isOpened(): boolean { return this.opened; }
  public setOpened(opened: boolean): void {
    if (this.opened !== opened) {
      this.opened = opened;
      if (!this.opened) {
        this.onClose?.();
      }
    }
  }

  public getTitle(): string | undefined { return this.title; }
  public setTitle(title: string | undefined): void { this.title = title; }

  public hasCloseButton(): boolean { return this.withCloseButton; }
  public setWithCloseButton(withCloseButton: boolean): void { this.withCloseButton = withCloseButton; }

  public close(): void {
    this.setOpened(false);
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-opened': this.opened ? 'true' : undefined,
    };
  }
}
