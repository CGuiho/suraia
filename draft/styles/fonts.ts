/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { FONT }
export type {}

const googleSansFlex = "'Google Sans Flex', sans-serif" as const

const firaSans = "'Fira Sans', sans-serif" as const
const firaSansCondensed = "'Fira Sans Condensed', sans-serif" as const
const firaSansExtraCondensed = "'Fira Sans Extra Condensed', sans-serif" as const

const jetbrainsMono = "'JetBrains Mono', monospace" as const

const cookie = "'Cookie', cursive" as const

const FONT = {
  googleSansFlex,
  firaSans,
  firaSansCondensed,
  firaSansExtraCondensed,
  jetbrainsMono,
  cookie,

  fontLogo: googleSansFlex,

  fontSans: firaSans,
  fontSansCondensed: firaSansCondensed,
  fontSansExtraCondensed: firaSansExtraCondensed,

  fontMono: jetbrainsMono,

  fontCursive: cookie,
} as const
