/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TreeController };
export type { TreeControllerOptions, TreeNode };

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  expanded?: boolean;
  selected?: boolean;
}

interface TreeControllerOptions {
  nodes?: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  onToggleExpand?: (node: TreeNode) => void;
}

class TreeController {
  private nodes: TreeNode[];
  private onSelect?: (node: TreeNode) => void;
  private onToggleExpand?: (node: TreeNode) => void;

  constructor(options: TreeControllerOptions = {}) {
    this.nodes = options.nodes ?? [];
    this.onSelect = options.onSelect;
    this.onToggleExpand = options.onToggleExpand;
  }

  public getNodes(): TreeNode[] {
    return this.nodes;
  }

  public setNodes(nodes: TreeNode[]): void {
    this.nodes = nodes;
  }

  public findNode(id: string, nodes: TreeNode[] = this.nodes): TreeNode | null {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const found = this.findNode(id, node.children);
        if (found) return found;
      }
    }
    return null;
  }

  public toggleNodeExpand(id: string): void {
    const node = this.findNode(id);
    if (node) {
      node.expanded = !node.expanded;
      this.onToggleExpand?.(node);
    }
  }

  public selectNode(id: string): void {
    this.clearSelection(this.nodes);
    const node = this.findNode(id);
    if (node) {
      node.selected = true;
      this.onSelect?.(node);
    }
  }

  private clearSelection(nodes: TreeNode[]): void {
    for (const node of nodes) {
      node.selected = false;
      if (node.children) {
        this.clearSelection(node.children);
      }
    }
  }

  public getVisibleNodes(nodes: TreeNode[] = this.nodes, level = 1): Array<{ node: TreeNode; level: number }> {
    const list: Array<{ node: TreeNode; level: number }> = [];
    for (const node of nodes) {
      list.push({ node, level });
      if (node.expanded && node.children) {
        list.push(...this.getVisibleNodes(node.children, level + 1));
      }
    }
    return list;
  }

  public handleKeyDown(event: KeyboardEvent, activeId: string): { newActiveId?: string } {
    const visibleList = this.getVisibleNodes();
    const index = visibleList.findIndex(item => item.node.id === activeId);
    if (index === -1) return {};

    const currentItem = visibleList[index]!;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextItem = visibleList[index + 1];
      if (nextItem) {
        return { newActiveId: nextItem.node.id };
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevItem = visibleList[index - 1];
      if (prevItem) {
        return { newActiveId: prevItem.node.id };
      }
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (currentItem.node.children && currentItem.node.children.length > 0) {
        if (!currentItem.node.expanded) {
          this.toggleNodeExpand(currentItem.node.id);
        } else {
          return { newActiveId: currentItem.node.children[0]?.id };
        }
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (currentItem.node.expanded) {
        this.toggleNodeExpand(currentItem.node.id);
      } else {
        const parent = this.findParentNode(currentItem.node.id);
        if (parent) {
          return { newActiveId: parent.id };
        }
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectNode(currentItem.node.id);
    }
    return {};
  }

  private findParentNode(childId: string, nodes: TreeNode[] = this.nodes, parent: TreeNode | null = null): TreeNode | null {
    for (const node of nodes) {
      if (node.id === childId) {
        return parent;
      }
      if (node.children) {
        const found = this.findParentNode(childId, node.children, node);
        if (found) return found;
      }
    }
    return null;
  }

  public getDataAttributes(node: TreeNode, level: number): Record<string, string | undefined> {
    return {
      'data-suraia-expanded': node.children && node.children.length > 0 ? String(!!node.expanded) : undefined,
      'data-suraia-selected': String(!!node.selected),
      'data-suraia-level': String(level),
    };
  }
}
