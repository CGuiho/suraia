/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { NumberFormatterController };
export type { NumberFormatterControllerOptions, NumberFormatterType };

type NumberFormatterType = 'decimal' | 'currency' | 'percent';

interface NumberFormatterControllerOptions {
  value?: number;
  locale?: string;
  type?: NumberFormatterType;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  prefix?: string;
  suffix?: string;
}

class NumberFormatterController {
  private value: number;
  private locale: string;
  private type: NumberFormatterType;
  private currency: string;
  private minimumFractionDigits?: number;
  private maximumFractionDigits?: number;
  private prefix: string;
  private suffix: string;

  constructor(options: NumberFormatterControllerOptions = {}) {
    this.value = options.value ?? 0;
    this.locale = options.locale ?? 'en-US';
    this.type = options.type ?? 'decimal';
    this.currency = options.currency ?? 'USD';
    this.minimumFractionDigits = options.minimumFractionDigits;
    this.maximumFractionDigits = options.maximumFractionDigits;
    this.prefix = options.prefix ?? '';
    this.suffix = options.suffix ?? '';
  }

  public getValue(): number {
    return this.value;
  }

  public setValue(val: number): void {
    this.value = val;
  }

  public getLocale(): string {
    return this.locale;
  }

  public setLocale(locale: string): void {
    this.locale = locale;
  }

  public getType(): NumberFormatterType {
    return this.type;
  }

  public setType(type: NumberFormatterType): void {
    this.type = type;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public setCurrency(currency: string): void {
    this.currency = currency;
  }

  public getPrefix(): string {
    return this.prefix;
  }

  public setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  public getSuffix(): string {
    return this.suffix;
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix;
  }

  public getFormattedValue(): string {
    const options: Intl.NumberFormatOptions = {
      style: this.type,
      currency: this.type === 'currency' ? this.currency : undefined,
    };

    if (this.minimumFractionDigits !== undefined) {
      options.minimumFractionDigits = this.minimumFractionDigits;
    }
    if (this.maximumFractionDigits !== undefined) {
      options.maximumFractionDigits = this.maximumFractionDigits;
    }

    const formatted = new Intl.NumberFormat(this.locale, options).format(this.value);
    return `${this.prefix}${formatted}${this.suffix}`;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'NumberFormatter',
    };
  }
}
