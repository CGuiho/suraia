/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { FileButtonController };
export type { FileButtonControllerOptions };

interface FileButtonControllerOptions {
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  onChange?: (files: File[]) => void;
}

class FileButtonController {
  private multiple: boolean;
  private accept?: string;
  private disabled: boolean;
  private onChange?: (files: File[]) => void;

  constructor(options: FileButtonControllerOptions = {}) {
    this.multiple = options.multiple ?? false;
    this.accept = options.accept;
    this.disabled = options.disabled ?? false;
    this.onChange = options.onChange;
  }

  public isMultiple(): boolean { return this.multiple; }
  public setMultiple(multiple: boolean): void { this.multiple = multiple; }

  public getAccept(): string | undefined { return this.accept; }
  public setAccept(accept: string | undefined): void { this.accept = accept; }

  public isDisabled(): boolean { return this.disabled; }
  public setDisabled(disabled: boolean): void { this.disabled = disabled; }

  public selectFiles(files: FileList | null): void {
    if (this.disabled || !files) return;
    const filesArray = Array.from(files);
    this.onChange?.(filesArray);
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-disabled': this.disabled ? 'true' : undefined,
    };
  }

  public getInputAttributes(): Record<string, string | undefined> {
    return {
      type: 'file',
      accept: this.accept,
      multiple: this.multiple ? 'true' : undefined,
      disabled: this.disabled ? 'true' : undefined,
      style: 'display: none;',
    };
  }
}
