/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

const sans = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;
const serif = "Georgia, Cambria, 'Times New Roman', Times, serif" as const;
const mono = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" as const;

export const FONT = {
  sans,
  serif,
  mono,
  googleSansFlex: `'Google Sans Flex', ${sans}` as const,
  firaSans: `'Fira Sans', ${sans}` as const,
  jetbrainsMono: `'JetBrains Mono', ${mono}` as const,
  cookie: "'Cookie', cursive" as const,

  fontLogo: `'Google Sans Flex', ${sans}` as const,
  fontSans: `'Fira Sans', ${sans}` as const,
  fontMono: `'JetBrains Mono', ${mono}` as const,
  fontCursive: "'Cookie', cursive" as const,
} as const;
