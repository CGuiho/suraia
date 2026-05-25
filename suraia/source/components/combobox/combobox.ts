/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ComboboxController };
export type { ComboboxControllerOptions, ComboboxOption };

interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ComboboxControllerOptions {
  data: ComboboxOption[];
  value?: string | null;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  allowCustomValue?: boolean;
  onChange?: (value: string | null) => void;
  onInputChange?: (value: string) => void;
}

class ComboboxController {
  private data: ComboboxOption[];
  private value: string | null;
  private inputValue: string;
  private placeholder: string;
  private disabled: boolean;
  private required: boolean;
  private error?: string;
  private allowCustomValue: boolean;
  private opened: boolean;
  private hoveredIndex: number;
  private onChange?: (value: string | null) => void;
  private onInputChange?: (value: string) => void;

  constructor(options: ComboboxControllerOptions) {
    this.data = options.data;
    this.value = options.value ?? null;
    this.placeholder = options.placeholder ?? "";
    this.disabled = options.disabled ?? false;
    this.required = options.required ?? false;
    this.error = options.error;
    this.allowCustomValue = options.allowCustomValue ?? false;
    this.opened = false;
    this.hoveredIndex = -1;
    this.onChange = options.onChange;
    this.onInputChange = options.onInputChange;

    const matched = this.data.find(o => o.value === this.value);
    this.inputValue = matched ? matched.label : (this.allowCustomValue && this.value ? this.value : "");
  }

  public getPlaceholder(): string {
    return this.placeholder;
  }

  public getValue(): string | null {
    return this.value;
  }

  public getInputValue(): string {
    return this.inputValue;
  }

  public isOpened(): boolean {
    return this.opened;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public isRequired(): boolean {
    return this.required;
  }

  public getError(): string | undefined {
    return this.error;
  }

  public getHoveredIndex(): number {
    return this.hoveredIndex;
  }

  public getFilteredOptions(): ComboboxOption[] {
    if (this.inputValue.length === 0) return this.data;
    const query = this.inputValue.toLowerCase();
    const matchedOption = this.data.find(o => o.value === this.value);
    if (matchedOption && matchedOption.label.toLowerCase() === query) {
      return this.data;
    }
    return this.data.filter(o => o.label.toLowerCase().includes(query));
  }

  public setInputValue(val: string): void {
    if (this.disabled) return;
    this.inputValue = val;
    this.onInputChange?.(val);

    const matched = this.data.find(o => o.label.toLowerCase() === val.toLowerCase());
    if (matched) {
      if (this.value !== matched.value) {
        this.value = matched.value;
        this.onChange?.(matched.value);
      }
    } else if (this.allowCustomValue) {
      if (this.value !== val) {
        this.value = val.trim() === "" ? null : val;
        this.onChange?.(this.value);
      }
    } else {
      if (this.value !== null) {
        this.value = null;
        this.onChange?.(null);
      }
    }

    this.opened = true;
    this.hoveredIndex = 0;
  }

  public open(): void {
    if (this.disabled) return;
    this.opened = true;
    this.hoveredIndex = -1;
  }

  public close(): void {
    this.opened = false;
    this.hoveredIndex = -1;
    if (!this.allowCustomValue) {
      const matched = this.data.find(o => o.value === this.value);
      this.inputValue = matched ? matched.label : "";
    }
  }

  public selectOption(option: ComboboxOption): void {
    if (this.disabled || option.disabled) return;
    this.value = option.value;
    this.inputValue = option.label;
    this.onChange?.(option.value);
    this.close();
  }

  public hoverNext(): void {
    const filtered = this.getFilteredOptions();
    if (filtered.length === 0) return;
    this.hoveredIndex = (this.hoveredIndex + 1) % filtered.length;
    while (filtered[this.hoveredIndex]?.disabled && this.hoveredIndex < filtered.length - 1) {
      this.hoveredIndex++;
    }
  }

  public hoverPrev(): void {
    const filtered = this.getFilteredOptions();
    if (filtered.length === 0) return;
    this.hoveredIndex = (this.hoveredIndex - 1 + filtered.length) % filtered.length;
    while (filtered[this.hoveredIndex]?.disabled && this.hoveredIndex > 0) {
      this.hoveredIndex--;
    }
  }

  public selectHovered(): void {
    const filtered = this.getFilteredOptions();
    const opt = filtered[this.hoveredIndex];
    if (opt) {
      this.selectOption(opt);
    } else if (this.allowCustomValue && this.inputValue.trim() !== "") {
      this.value = this.inputValue;
      this.onChange?.(this.inputValue);
      this.close();
    }
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!this.opened) {
        this.open();
        return;
      }
      this.hoverNext();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (this.opened) {
        this.hoverPrev();
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (this.opened) {
        this.selectHovered();
      } else {
        this.open();
      }
    } else if (event.key === "Escape") {
      this.close();
    } else if (event.key === "Home") {
      event.preventDefault();
      this.hoveredIndex = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      const filtered = this.getFilteredOptions();
      this.hoveredIndex = filtered.length - 1;
    }
  }
}
