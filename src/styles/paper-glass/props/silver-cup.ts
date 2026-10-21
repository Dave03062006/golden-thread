import type { PaperPropArt } from '../art'

/** Props of Level 5, Episode 5: Joseph's silver cup, hidden in the mouth of Benjamin's sack. */

const silverCup: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 50 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'cup', svg: `<path d="M6 6L34 6L28 26L12 26Z" fill="#dfe6ee"/><path d="M18 26L22 26L22 42L18 42Z" fill="#c8d0da"/><path d="M8 42L32 42L32 48L8 48Z" fill="#dfe6ee"/><path d="M10 10L30 10" stroke="#ffffff" stroke-width="2.4"/><path d="M28 8L30 16" stroke="#ffffff" stroke-width="2"/>` }],
}

export const silverCupProps: Record<string, PaperPropArt> = { 'silver-cup': silverCup }
