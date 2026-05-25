/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TagsInputController };
export type { TagsInputControllerOptions };

interface TagsInputControllerOptions {
  value?: string[];
  placeholder?: string;
  disabled?: boolean;
  maxTags?: number;
  allowDuplicates?: boolean;
  splitChars?: string[];
  onChange?: (value: string[]) => void;
}

class TagsInputController {
  private value: string[];
  private inputValue: string;
  private placeholder: string;
  private disabled: boolean;
  private maxTags?: number;
  private allowDuplicates: boolean;
  private splitChars: string[];
  private onChange?: (value: string[]) => void;

  constructor(options: TagsInputControllerOptions = {}) {
    this.value = options.value ?? [];
    this.inputValue = "";
    this.placeholder = options.placeholder ?? "";
    this.disabled = options.disabled ?? false;
    this.maxTags = options.maxTags;
    this.allowDuplicates = options.allowDuplicates ?? false;
    this.splitChars = options.splitChars ?? [","];
    this.onChange = options.onChange;
  }

  public getValue(): string[] {
    return this.value;
  }

  public getInputValue(): string {
    return this.inputValue;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public getPlaceholder(): string {
    return this.placeholder;
  }

  public setInputValue(val: string): void {
    if (this.disabled) return;

    for (const char of this.splitChars) {
      if (val.endsWith(char)) {
        const tag = val.slice(0, -char.length).trim();
        if (tag.length > 0) {
          this.addTag(tag);
        }
        this.inputValue = "";
        return;
      }
    }
    this.inputValue = val;
  }

  public addTag(tag: string): void {
    if (this.disabled) return;
    const cleanTag = tag.trim();
    if (cleanTag.length === 0) return;

    if (this.maxTags !== undefined && this.value.length >= this.maxTags) return;
    if (!this.allowDuplicates && this.value.includes(cleanTag)) return;

    this.value = [...this.value, cleanTag];
    this.onChange?.(this.value);
  }

  public removeTag(tag: string): void {
    if (this.disabled) return;
    this.value = this.value.filter(t => t !== tag);
    this.onChange?.(this.value);
  }

  public clear(): void {
    if (this.disabled) return;
    this.value = [];
    this.onChange?.([]);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (event.key === "Enter") {
      event.preventDefault();
      const tag = this.inputValue.trim();
      if (tag.length > 0) {
        this.addTag(tag);
        this.inputValue = "";
      }
    } else if (event.key === "Backspace") {
      if (this.inputValue === "" && this.value.length > 0) {
        this.removeTag(this.value[this.value.length - 1]!);
      }
    }
  }
}
