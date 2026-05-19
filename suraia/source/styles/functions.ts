/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { fluid, rem }

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
