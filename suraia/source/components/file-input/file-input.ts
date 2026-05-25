/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { FileInputController };
export type { FileInputControllerOptions };

interface FileInputControllerOptions {
  value?: File | File[];
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  clearable?: boolean;
  onChange?: (value: File | File[] | null) => void;
}

class FileInputController {
  private value: File | File[] | null;
  private multiple: boolean;
  private accept?: string;
  private disabled: boolean;
  private required: boolean;
  private error?: string;
  private clearable: boolean;
  private onChange?: (value: File | File[] | null) => void;

  constructor(options: FileInputControllerOptions = {}) {
    this.value = options.value ?? null;
    this.multiple = options.multiple ?? false;
    this.accept = options.accept;
    this.disabled = options.disabled ?? false;
    this.required = options.required ?? false;
    this.error = options.error;
    this.clearable = options.clearable ?? false;
    this.onChange = options.onChange;
  }

  public getValue(): File | File[] | null { return this.value; }
  public setValue(value: File | File[] | null): void {
    if (this.disabled) return;
    this.value = value;
    this.onChange?.(this.value);
  }

  public isMultiple(): boolean { return this.multiple; }
  public setMultiple(multiple: boolean): void { this.multiple = multiple; }

  public getAccept(): string | undefined { return this.accept; }
  public setAccept(accept: string | undefined): void { this.accept = accept; }

  public isDisabled(): boolean { return this.disabled; }
  public setDisabled(disabled: boolean): void { this.disabled = disabled; }

  public isRequired(): boolean { return this.required; }
  public setRequired(required: boolean): void { this.required = required; }

  public getError(): string | undefined { return this.error; }
  public setError(error: string | undefined): void { this.error = error; }
  public hasError(): boolean { return this.error !== undefined && this.error.length > 0; }

  public isClearable(): boolean { return this.clearable; }
  public setClearable(clearable: boolean): void { this.clearable = clearable; }

  public handleFilesChange(files: FileList | null): void {
    if (this.disabled) return;
    if (!files || files.length === 0) {
      this.setValue(null);
      return;
    }
    const filesArray = Array.from(files);
    if (this.multiple) {
      this.setValue(filesArray);
    } else {
      this.setValue(filesArray[0]);
    }
  }

  public clear(): void {
    if (this.disabled || !this.clearable) return;
    this.setValue(null);
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-disabled': this.disabled ? 'true' : undefined,
      'data-suraia-error': this.hasError() ? 'true' : undefined,
      'data-suraia-required': this.required ? 'true' : undefined,
      'data-suraia-multiple': this.multiple ? 'true' : undefined,
    };
  }

  public getFilesNames(): string {
    if (!this.value) return '';
    if (Array.isArray(this.value)) {
      return this.value.map(file => file.name).join(', ');
    }
    return this.value.name;
  }
}
