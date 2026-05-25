/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TreeSelectController };
export type { TreeSelectControllerOptions, TreeNode, FlattenedNode };

interface TreeNode {
  value: string;
  label: string;
  disabled?: boolean;
  children?: TreeNode[];
}

interface FlattenedNode {
  value: string;
  label: string;
  disabled?: boolean;
  level: number;
  isLeaf: boolean;
  parentValue: string | null;
  childrenValues: string[];
}

interface TreeSelectControllerOptions {
  data: TreeNode[];
  value?: string | string[] | null;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  onChange?: (value: string | string[] | null) => void;
}

class TreeSelectController {
  private data: TreeNode[];
  private value: string | string[] | null;
  private multiple: boolean;
  private placeholder: string;
  private disabled: boolean;
  private required: boolean;
  private error?: string;
  private opened: boolean;
  private expandedNodes: Set<string>;
  private hoveredValue: string | null;
  private onChange?: (value: string | string[] | null) => void;

  constructor(options: TreeSelectControllerOptions) {
    this.data = options.data;
    this.multiple = options.multiple ?? false;
    this.value = options.value ?? (this.multiple ? [] : null);
    this.placeholder = options.placeholder ?? "";
    this.disabled = options.disabled ?? false;
    this.required = options.required ?? false;
    this.error = options.error;
    this.opened = false;
    this.expandedNodes = new Set<string>();
    this.hoveredValue = null;
    this.onChange = options.onChange;
  }

  public getValue(): string | string[] | null {
    return this.value;
  }

  public getPlaceholder(): string {
    return this.placeholder;
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

  public getHoveredValue(): string | null {
    return this.hoveredValue;
  }

  public isExpanded(nodeValue: string): boolean {
    return this.expandedNodes.has(nodeValue);
  }

  public isSelected(nodeValue: string): boolean {
    if (this.multiple && Array.isArray(this.value)) {
      return this.value.includes(nodeValue);
    }
    return this.value === nodeValue;
  }

  public getSelectedLabel(): string {
    if (this.multiple && Array.isArray(this.value)) {
      const labels: string[] = [];
      const findLabels = (nodes: TreeNode[]) => {
        for (const n of nodes) {
          if (Array.isArray(this.value) && this.value.includes(n.value)) {
            labels.push(n.label);
          }
          if (n.children) findLabels(n.children);
        }
      };
      findLabels(this.data);
      return labels.join(", ");
    }

    let matchedLabel = "";
    const findLabel = (nodes: TreeNode[]): boolean => {
      for (const n of nodes) {
        if (n.value === this.value) {
          matchedLabel = n.label;
          return true;
        }
        if (n.children && findLabel(n.children)) return true;
      }
      return false;
    };
    if (this.value) findLabel(this.data);
    return matchedLabel;
  }

  public flattenTree(nodes: TreeNode[] = this.data, parentValue: string | null = null, level = 0): FlattenedNode[] {
    let result: FlattenedNode[] = [];
    for (const node of nodes) {
      const isLeaf = !node.children || node.children.length === 0;
      const childrenValues = node.children ? node.children.map(c => c.value) : [];
      result.push({
        value: node.value,
        label: node.label,
        disabled: node.disabled,
        level,
        isLeaf,
        parentValue,
        childrenValues
      });
      if (!isLeaf && this.expandedNodes.has(node.value)) {
        result = result.concat(this.flattenTree(node.children!, node.value, level + 1));
      }
    }
    return result;
  }

  public open(): void {
    if (this.disabled) return;
    this.opened = true;
    const visible = this.flattenTree();
    this.hoveredValue = visible[0]?.value ?? null;
  }

  public close(): void {
    this.opened = false;
    this.hoveredValue = null;
  }

  public toggle(): void {
    if (this.opened) this.close(); else this.open();
  }

  public toggleExpand(nodeValue: string): void {
    if (this.expandedNodes.has(nodeValue)) {
      this.expandedNodes.delete(nodeValue);
    } else {
      this.expandedNodes.add(nodeValue);
    }
  }

  public selectNode(nodeValue: string): void {
    if (this.disabled) return;

    let targetNode: TreeNode | null = null;
    const findNode = (nodes: TreeNode[]): boolean => {
      for (const n of nodes) {
        if (n.value === nodeValue) {
          targetNode = n;
          return true;
        }
        if (n.children && findNode(n.children)) return true;
      }
      return false;
    };
    findNode(this.data);
    if (!targetNode || (targetNode as TreeNode).disabled) return;

    if (this.multiple) {
      const current = Array.isArray(this.value) ? this.value : [];
      if (current.includes(nodeValue)) {
        this.value = current.filter(v => v !== nodeValue);
      } else {
        this.value = [...current, nodeValue];
      }
    } else {
      this.value = nodeValue;
      this.close();
    }
    this.onChange?.(this.value);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    const visible = this.flattenTree();
    if (visible.length === 0) return;

    const currentIndex = visible.findIndex(n => n.value === this.hoveredValue);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!this.opened) {
        this.open();
        return;
      }
      const nextIndex = (currentIndex + 1) % visible.length;
      this.hoveredValue = visible[nextIndex]?.value ?? null;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (this.opened) {
        const prevIndex = (currentIndex - 1 + visible.length) % visible.length;
        this.hoveredValue = visible[prevIndex]?.value ?? null;
      }
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      const node = visible[currentIndex];
      if (node && !node.isLeaf) {
        if (!this.expandedNodes.has(node.value)) {
          this.expandedNodes.add(node.value);
        } else {
          const nextIndex = currentIndex + 1;
          if (visible[nextIndex]) {
            this.hoveredValue = visible[nextIndex]!.value;
          }
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      const node = visible[currentIndex];
      if (node) {
        if (!node.isLeaf && this.expandedNodes.has(node.value)) {
          this.expandedNodes.delete(node.value);
        } else if (node.parentValue) {
          this.hoveredValue = node.parentValue;
        }
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (this.opened && this.hoveredValue) {
        this.selectNode(this.hoveredValue);
      } else {
        this.open();
      }
    } else if (event.key === "Escape") {
      this.close();
    }
  }
}
