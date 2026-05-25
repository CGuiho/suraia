/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TabsController };
export type { TabsControllerOptions };

interface TabsControllerOptions {
  defaultValue?: string;
  tabs?: string[];
  orientation?: 'horizontal' | 'vertical';
  onChange?: (value: string) => void;
}

class TabsController {
  private activeTab: string;
  private tabs: string[];
  private orientation: string;
  private onChange?: (value: string) => void;

  constructor(options: TabsControllerOptions = {}) {
    this.tabs = options.tabs ?? [];
    this.activeTab = options.defaultValue ?? this.tabs[0] ?? '';
    this.orientation = options.orientation ?? 'horizontal';
    this.onChange = options.onChange;
  }

  public getActiveTab(): string { return this.activeTab; }
  public getTabs(): string[] { return [...this.tabs]; }
  public getOrientation(): string { return this.orientation; }

  public setActiveTab(value: string): void {
    if (this.tabs.includes(value)) {
      this.activeTab = value;
      this.onChange?.(value);
    }
  }

  public isActive(value: string): boolean {
    return this.activeTab === value;
  }

  public getNextTab(): string {
    const idx = this.tabs.indexOf(this.activeTab);
    return this.tabs[(idx + 1) % this.tabs.length] ?? this.activeTab;
  }

  public getPrevTab(): string {
    const idx = this.tabs.indexOf(this.activeTab);
    return this.tabs[(idx - 1 + this.tabs.length) % this.tabs.length] ?? this.activeTab;
  }

  public handleKeyDown(event: KeyboardEvent): void {
    const isHorizontal = this.orientation === 'horizontal';
    const nextKeys = isHorizontal ? ['ArrowRight'] : ['ArrowDown'];
    const prevKeys = isHorizontal ? ['ArrowLeft'] : ['ArrowUp'];

    if (nextKeys.includes(event.key)) {
      event.preventDefault();
      this.setActiveTab(this.getNextTab());
    } else if (prevKeys.includes(event.key)) {
      event.preventDefault();
      this.setActiveTab(this.getPrevTab());
    } else if (event.key === 'Home') {
      event.preventDefault();
      if (this.tabs.length > 0) this.setActiveTab(this.tabs[0]!);
    } else if (event.key === 'End') {
      event.preventDefault();
      if (this.tabs.length > 0) this.setActiveTab(this.tabs[this.tabs.length - 1]!);
    }
  }
}
