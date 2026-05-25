/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { HighlightController };
export type { HighlightControllerOptions, HighlightChunk };

interface HighlightChunk {
  text: string;
  highlighted: boolean;
}

interface HighlightControllerOptions {
  text?: string;
  highlight?: string | string[];
  highlightColor?: string;
}

class HighlightController {
  private text: string;
  private highlight: string | string[];
  private highlightColor?: string;

  constructor(options: HighlightControllerOptions = {}) {
    this.text = options.text ?? '';
    this.highlight = options.highlight ?? '';
    this.highlightColor = options.highlightColor;
  }

  public getText(): string { return this.text; }
  public setText(text: string): void { this.text = text; }
  
  public getHighlight(): string | string[] { return this.highlight; }
  public setHighlight(highlight: string | string[]): void { this.highlight = highlight; }

  public getHighlightColor(): string | undefined { return this.highlightColor; }
  public setHighlightColor(color: string | undefined): void { this.highlightColor = color; }

  public getChunks(): HighlightChunk[] {
    if (!this.text) return [];
    
    const queries = (Array.isArray(this.highlight) ? this.highlight : [this.highlight])
      .map(q => q.trim())
      .filter(q => q.length > 0);

    if (queries.length === 0) {
      return [{ text: this.text, highlighted: false }];
    }

    queries.sort((a, b) => b.length - a.length);

    const escaped = queries.map(q => q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escaped.join('|')})`, 'gi');

    const parts = this.text.split(regex);
    return parts.map(part => {
      const isHighlighted = queries.some(q => q.toLowerCase() === part.toLowerCase());
      return {
        text: part,
        highlighted: isHighlighted,
      };
    }).filter(chunk => chunk.text.length > 0);
  }
}
