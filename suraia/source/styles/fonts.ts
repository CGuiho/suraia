/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export {
  fontDisplay,
  letterSpacing,
  textDecorationThickness,
  fontFeature,
  paragraphSpacing,
}

const fontDisplay = 'swap' as const;

const letterSpacing = {
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

const textDecorationThickness = '1px' as const;

const fontFeature = {
  default: '"kern" 1, "liga" 1, "calt" 1',
  tabular: '"tnum" 1',
  ordinal: '"ordn" 1',
  fractions: '"frac" 1',
} as const;

const paragraphSpacing = '1em' as const;
