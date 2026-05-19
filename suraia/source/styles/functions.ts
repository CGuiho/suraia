/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { fluid, rem, alpha }

/**
 * Converts pixels to responsive rem based on a standard 16px baseline.
 * 
 * @param px The numeric pixel value to convert
 * @returns The rem string value
 */
function rem(px: number): string {
  return `${px / 16}rem`;
}

/**
 * Generates a responsive fluid value using a linear interpolation clamp.
 * 
 * @param minSize Minimum size in pixels
 * @param maxSize Maximum size in pixels
 * @param minWidth Minimum viewport width in pixels (defaults to 320)
 * @param maxWidth Maximum viewport width in pixels (defaults to 1200)
 * @returns The CSS clamp calculation string
 */
function fluid(
  minSize: number,
  maxSize: number,
  minWidth = 320,
  maxWidth = 1200
): string {
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const yIntersection = minSize - slope * minWidth;
  return `clamp(${minSize}px, ${yIntersection}px + ${slope * 100}vw, ${maxSize}px)`;
}

/**
 * Adjusts the alpha channel of a HEX, RGB, RGBA, HSL, or HSLA color string.
 * 
 * @param colorString The input color string (e.g. "#ffffff", "rgb(255, 255, 255)", "hsl(210, 100%, 50%)")
 * @param alphaValue The alpha opacity value to set (0 to 1)
 * @returns The updated color string in the matching format
 */
function alpha(colorString: string, alphaValue: number): string {
  if (alphaValue < 0 || alphaValue > 1 || isNaN(alphaValue)) {
    throw new Error(`Invalid alpha value: ${alphaValue}. Must be between 0 and 1.`);
  }

  const normalized = colorString.trim().toLowerCase();

  // 1. Handle Hex format
  if (normalized.startsWith('#')) {
    const hex = normalized;
    const alphaHex = Math.round(alphaValue * 255)
      .toString(16)
      .padStart(2, '0');

    if (hex.length === 4) {
      // #rgb
      const r = hex[1];
      const g = hex[2];
      const b = hex[3];
      return `#${r}${r}${g}${g}${b}${b}${alphaHex}`;
    }
    if (hex.length === 5) {
      // #rgba
      const r = hex[1];
      const g = hex[2];
      const b = hex[3];
      return `#${r}${r}${g}${g}${b}${b}${alphaHex}`;
    }
    if (hex.length === 7) {
      // #rrggbb
      return `${hex}${alphaHex}`;
    }
    if (hex.length === 9) {
      // #rrggbbaa
      return `${hex.slice(0, 7)}${alphaHex}`;
    }
    throw new Error(`Invalid HEX color length: "${colorString}"`);
  }

  // 2. Handle RGB/RGBA formats
  if (normalized.startsWith('rgb')) {
    const startIdx = normalized.indexOf('(');
    const endIdx = normalized.lastIndexOf(')');
    if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
      throw new Error(`Invalid RGB/RGBA syntax: "${colorString}"`);
    }
    const content = normalized.slice(startIdx + 1, endIdx);
    const sanitized = content.replace(/[,/]/g, ' ');
    const components = sanitized.split(/\s+/).filter(Boolean);
    if (components.length < 3 || components.length > 4) {
      throw new Error(`Invalid number of RGB components: "${colorString}"`);
    }
    const r = components[0];
    const g = components[1];
    const b = components[2];
    return `rgba(${r}, ${g}, ${b}, ${alphaValue})`;
  }

  // 3. Handle HSL/HSLA formats
  if (normalized.startsWith('hsl')) {
    const startIdx = normalized.indexOf('(');
    const endIdx = normalized.lastIndexOf(')');
    if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
      throw new Error(`Invalid HSL/HSLA syntax: "${colorString}"`);
    }
    const content = normalized.slice(startIdx + 1, endIdx);
    const sanitized = content.replace(/[,/]/g, ' ');
    const components = sanitized.split(/\s+/).filter(Boolean);
    if (components.length < 3 || components.length > 4) {
      throw new Error(`Invalid number of HSL components: "${colorString}"`);
    }
    const h = components[0];
    const s = components[1];
    const l = components[2];
    return `hsla(${h}, ${s}, ${l}, ${alphaValue})`;
  }

  throw new Error(`Unsupported color format: "${colorString}"`);
}


