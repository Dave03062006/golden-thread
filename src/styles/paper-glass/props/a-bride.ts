import type { PaperPropArt } from '../art'

/**
 * Props of Level 4, Episode 1: the stone trough by the well outside the city of Nahor,
 * the water Rebekah pours into it (drawn on its own, so it can rise and fall), and the
 * stream of water from her jar.
 */

const prop = (box: { w: number; h: number }, svg: string, extra: Partial<PaperPropArt> = {}): PaperPropArt => ({ box: { x: 0, y: 0, ...box }, facing: 1, poses: ['idle'], anchor: 'base', parts: [{ id: 'it', svg }], ...extra })

const trough = prop(
  { w: 220, h: 60 },
  `<path d="M6 14L214 14L206 58L14 58Z" fill="#a89a86"/>
   <path d="M4 9L216 9L216 18L4 18Z" fill="#c4b8a4"/>
   <path d="M20 18L18 56M76 18L76 57M144 18L144 57M200 18L202 56" stroke="#8a7c6a" stroke-width="2.4"/>
   <path d="M10 36L210 36" stroke="#948672" stroke-width="2"/>`,
)

/** The water in the trough, in the same drawing space, so it lines up when placed with it. */
const troughWater = prop({ w: 220, h: 60 }, `<path d="M10 9L210 9L208 17L12 17Z" fill="#3a8ad0"/><path d="M30 12L190 12" stroke="#9ad4f6" stroke-width="2.4"/>`, { shadow: false })

const waterStream = prop({ w: 20, h: 100 }, `<path d="M7 0Q4 50 9 100L13 100Q16 50 12 0Z" fill="#8ad0f8" opacity=".9"/><path d="M10 6Q8 50 11 94" stroke="#e4f6ff" stroke-width="1.6" fill="none"/>`, { shadow: false, anchor: 'center' })

export const aBrideProps: Record<string, PaperPropArt> = { trough, 'trough-water': troughWater, 'water-stream': waterStream }
