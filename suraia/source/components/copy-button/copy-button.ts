/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { CopyButtonController };
export type { CopyButtonControllerOptions };

interface CopyButtonControllerOptions {
  value?: string;
  timeout?: number;
  onCopy?: () => void;
}

class CopyButtonController {
  private value: string;
  private timeout: number;
  private copied: boolean;
  private onCopy?: () => void;
  private timer: any;

  constructor(options: CopyButtonControllerOptions = {}) {
    this.value = options.value ?? '';
    this.timeout = options.timeout ?? 2000;
    this.copied = false;
    this.onCopy = options.onCopy;
    this.timer = null;
  }

  public getValue(): string { return this.value; }
  public setValue(value: string): void { this.value = value; }

  public isCopied(): boolean { return this.copied; }

  public copy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    this.copied = true;
    this.onCopy?.();

    this.timer = setTimeout(() => {
      this.copied = false;
      this.timer = null;
    }, this.timeout);
  }

  public destroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-copied': this.copied ? 'true' : undefined,
    };
  }
}
