/** The two art styles. Every screen and scene exists in both (spec §9.4). */
export const STYLE_IDS = ['paper-glass', 'pixel'] as const

export type StyleId = (typeof STYLE_IDS)[number]

export const STYLE_NAMES: Record<StyleId, string> = {
  'paper-glass': 'Paper & Glass',
  pixel: 'Pixel',
}

export function isStyleId(value: unknown): value is StyleId {
  return typeof value === 'string' && (STYLE_IDS as readonly string[]).includes(value)
}

export function otherStyle(style: StyleId): StyleId {
  return style === 'pixel' ? 'paper-glass' : 'pixel'
}
