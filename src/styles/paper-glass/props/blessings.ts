import type { PaperPropArt } from '../art'

/**
 * Props of Level 5, Episode 7: the pictures of Jacob's blessings on his sons, each shown in a
 * round frame of light: the lion of Judah, the ships at Zebulun's shore, Issachar's strong
 * donkey, Dan's serpent by the road, Naphtali's deer let loose, Joseph's fruitful vine over
 * the wall, Benjamin's wolf, and Asher's rich bread.
 */

const TAU = Math.PI * 2
const PICTURES: Record<string, string> = {
  lion: `<path d="M22 64L26 44Q40 34 58 40L66 64Z" fill="#d8a040"/><circle cx="62" cy="34" r="16" fill="#a8602a"/><circle cx="63" cy="35" r="9" fill="#e8b050"/><path d="M22 48Q12 40 16 30" stroke="#d8a040" stroke-width="4" fill="none"/>`,
  ship: `<path d="M14 54L76 54L66 66L24 66Z" fill="#8a5a32"/><path d="M44 54L44 18" stroke="#6a4a2a" stroke-width="3"/><path d="M46 20L66 48L46 48Z" fill="#f4f0e6"/><path d="M8 70Q24 64 40 70T72 70T90 70" stroke="#4a8ac0" stroke-width="4" fill="none"/>`,
  donkey: `<path d="M24 40L60 40L62 56L26 56Z" fill="#9a9aa6"/><path d="M58 42L70 26L76 28L66 46Z" fill="#9a9aa6"/><path d="M70 26L68 16L72 26M74 27L76 18" stroke="#6a6a76" stroke-width="3"/>${[28, 36, 50, 58].map((x) => `<path d="M${x} 56L${x} 70" stroke="#6a6a76" stroke-width="4"/>`).join('')}<path d="M30 40L50 40L48 34L32 34Z" fill="#c8503a"/>`,
  serpent: `<path d="M14 62Q28 44 42 58T70 52Q80 48 78 38" stroke="#5a8a3a" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="78" cy="36" r="5" fill="#5a8a3a"/><path d="M82 34L90 30M82 36L90 38" stroke="#c03a3a" stroke-width="2"/><path d="M8 70L90 70" stroke="#c8b488" stroke-width="5"/>`,
  deer: `<path d="M26 42L58 42L60 54L28 54Z" fill="#b8784a"/><path d="M56 44L66 26L72 28L64 46Z" fill="#b8784a"/><path d="M68 24L62 10M68 24L76 12M66 18L60 16M72 16L80 14" stroke="#8a5a32" stroke-width="2.4"/>${[30, 38, 50, 56].map((x, i) => `<path d="M${x} 54L${x + (i % 2 ? 6 : -6)} 70" stroke="#8a5a32" stroke-width="3"/>`).join('')}`,
  vine: `<path d="M10 70L90 70L90 52L10 52Z" fill="#b8a07a"/><path d="M10 60L90 60" stroke="#a08a64" stroke-width="2"/><path d="M30 70C30 40 40 30 60 20" stroke="#6a4a2a" stroke-width="5" fill="none"/>${[[40, 34], [56, 24], [66, 40], [74, 30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#4a8a3a"/>`).join('')}${[[62, 46], [70, 50], [78, 44]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#c03a5a"/>`).join('')}`,
  wolf: `<path d="M22 44L58 40L62 56L26 58Z" fill="#7a7a8a"/><path d="M56 42L74 32L80 40L62 50Z" fill="#7a7a8a"/><path d="M68 34L66 24L72 32M74 33L78 24" stroke="#5a5a6a" stroke-width="3"/><path d="M22 46Q10 40 12 30" stroke="#7a7a8a" stroke-width="5" fill="none"/>${[28, 34, 52, 58].map((x) => `<path d="M${x} 56L${x} 70" stroke="#5a5a6a" stroke-width="4"/>`).join('')}`,
  bread: `<ellipse cx="50" cy="56" rx="34" ry="10" fill="#8a5a32"/>${[32, 50, 68].map((x, i) => `<ellipse cx="${x}" cy="${48 - (i % 2) * 6}" rx="14" ry="8" fill="#d8a85a"/>`).join('')}<path d="M44 34Q50 22 56 34" stroke="#f4eee4" stroke-width="2.4" fill="none" opacity=".6"/>`,
}
export const BLESSING_PICTURES = Object.keys(PICTURES)

const blessingSign: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 100 },
  facing: 1,
  poses: BLESSING_PICTURES,
  anchor: 'center',
  shadow: false,
  parts: [
    { id: 'frame', svg: `<circle cx="50" cy="48" r="46" fill="#fff4d8" opacity=".9"/><circle cx="50" cy="48" r="46" fill="none" stroke="#e8c060" stroke-width="4"/>` },
    ...BLESSING_PICTURES.map((id) => ({ id, svg: PICTURES[id]! })),
  ],
  animate(part, pose, time) {
    const bob = 2 * Math.sin(time * TAU * 0.3)
    return part === 'frame' ? { y: bob } : { y: bob, opacity: part === pose ? 1 : 0 }
  },
}

export const blessingsProps: Record<string, PaperPropArt> = { 'blessing-sign': blessingSign }
