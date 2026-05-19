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
 * Adjusts the alpha channel of an HSL or HSLA color string.
 * 
 * @param hslString The input HSL/HSLA color string (e.g. "hsl(210, 100%, 50%)")
 * @param alphaValue The alpha opacity value to set (0 to 1)
 * @returns The updated HSLA color string
 */
function alpha(hslString: string, alphaValue: number): string {
  if (alphaValue < 0 || alphaValue > 1 || isNaN(alphaValue)) {
    throw new Error(`Invalid alpha value: ${alphaValue}. Must be between 0 and 1.`);
  }

  const normalized = hslString.trim().toLowerCase();
  
  if (!normalized.startsWith('hsl')) {
    throw new Error(`Color must be in HSL/HSLA format: "${hslString}"`);
  }

  const startIdx = normalized.indexOf('(');
  const endIdx = normalized.lastIndexOf(')');
  
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    throw new Error(`Invalid HSL/HSLA syntax: "${hslString}"`);
  }

  const content = normalized.slice(startIdx + 1, endIdx);
  const sanitized = content.replace(/[,/]/g, ' ');
  const components = sanitized.split(/\s+/).filter(Boolean);
  
  if (components.length < 3 || components.length > 4) {
    throw new Error(`Invalid number of HSL components: "${hslString}"`);
  }

  const h = components[0];
  const s = components[1];
  const l = components[2];

  return `hsla(${h}, ${s}, ${l}, ${alphaValue})`;
}

