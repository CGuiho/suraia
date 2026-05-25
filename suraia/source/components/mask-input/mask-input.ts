/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { MaskInputController };
export type { MaskInputControllerOptions };

interface MaskInputControllerOptions {
  value?: string;
  mask?: string;
  placeholderChar?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

class MaskInputController {
  private value: string;
  private mask: string;
  private placeholderChar: string;
  private disabled: boolean;
  private onChange?: (value: string) => void;

  constructor(options: MaskInputControllerOptions = {}) {
    this.mask = options.mask ?? '';
    this.placeholderChar = options.placeholderChar ?? '_';
    this.disabled = options.disabled ?? false;
    this.onChange = options.onChange;
    this.value = this.applyMask(options.value ?? '');
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(rawValue: string): void {
    if (this.disabled) {
      return;
    }

    this.value = this.applyMask(rawValue);
    this.onChange?.(this.value);
  }

  public getMask(): string {
    return this.mask;
  }

  public setMask(mask: string): void {
    this.mask = mask;
    this.value = this.applyMask(this.getRawValue());
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public applyMask(rawValue: string): string {
    if (!this.mask) {
      return rawValue;
    }

    const raw = rawValue.replace(/[^a-z0-9]/gi, '');
    let rawIndex = 0;
    let output = '';

    for (const token of this.mask) {
      const next = raw[rawIndex];
      if (token === '9' || token === 'a' || token === '*') {
        if (next === undefined) {
          output += this.placeholderChar;
          continue;
        }

        if (this.matchesToken(token, next)) {
          output += next;
          rawIndex += 1;
          continue;
        }

        rawIndex += 1;
        output += this.placeholderChar;
        continue;
      }

      output += token;
    }

    return output;
  }

  public getRawValue(): string {
    return this.value.replace(/[^a-z0-9]/gi, '').replace(new RegExp(this.escapeRegExp(this.placeholderChar), 'g'), '');
  }

  public isComplete(): boolean {
    return this.mask === '' || (this.value.length === this.mask.length && !this.value.includes(this.placeholderChar));
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'MaskInput',
      'data-suraia-disabled': String(this.disabled),
      'data-suraia-complete': String(this.isComplete()),
    };
  }

  private matchesToken(token: string, value: string): boolean {
    if (token === '9') {
      return /\d/.test(value);
    }
    if (token === 'a') {
      return /[a-z]/i.test(value);
    }
    return /[a-z0-9]/i.test(value);
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
