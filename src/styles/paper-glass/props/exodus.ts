import type { PaperPropArt, PartMotion } from '../art'

/**
 * Props of Level 7 · Moses Is Called: the basket of bulrushes, woven row by row, sealed with
 * pitch and closed; a loose reed swinging into place; the bush that burns and is not burnt,
 * only its flame seen from far off, its green leaves close by; and the water poured from the
 * Nile on the dry ground, which turns red.
 */

const TAU = Math.PI * 2
const ROWS = 6

/** The basket: its base, six woven rows, the pitch over them, and the lid. */
const reedBasket: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 80 },
  facing: 1,
  poses: [...Array.from({ length: ROWS + 1 }, (_, n) => `row-${n}`), 'sealed', 'closed'],
  anchor: 'base',
  parts: [
    { id: 'base', svg: `<path d="M14 72Q60 84 106 72L100 80L20 80Z" fill="#8a6a32"/><ellipse cx="60" cy="72" rx="46" ry="7" fill="#b8944a"/>` },
    ...Array.from({ length: ROWS }, (_, i) => {
      const y = 64 - i * 8
      const inset = 6 + i * 1.2
      return {
        id: `row-${i + 1}`,
        svg: `<path d="M${inset} ${y}L${120 - inset} ${y}L${120 - inset - 1} ${y + 8}L${inset + 1} ${y + 8}Z" fill="${i % 2 ? '#c8a050' : '#b8903e'}"/>${Array.from({ length: 9 }, (_, k) => `<path d="M${(inset + 6 + k * ((108 - 2 * inset) / 8)).toFixed(1)} ${y + 1}l${i % 2 ? 4 : -4} 6" stroke="#8a6a2a" stroke-width="2"/>`).join('')}`,
      }
    }),
    { id: 'pitch', svg: `<path d="M8 22L112 22L106 80L14 80Z" fill="#2a2018" opacity=".82"/><path d="M14 30L106 30" stroke="#5a4a32" stroke-width="2" opacity=".6"/>` },
    { id: 'lid', svg: `<path d="M4 24Q60 2 116 24L112 28Q60 10 8 28Z" fill="#3a2c1e"/><path d="M8 26Q60 8 112 26" stroke="#c8a050" stroke-width="2" fill="none"/>` },
  ],
  animate: (part, pose): PartMotion => {
    if (part === 'base') return {}
    if (part === 'pitch') return { opacity: pose === 'sealed' || pose === 'closed' ? 1 : 0 }
    if (part === 'lid') return { opacity: pose === 'closed' ? 1 : 0 }
    const row = Number(part.slice(4))
    const woven = pose === 'sealed' || pose === 'closed' ? ROWS : Number(pose.slice(4))
    return { opacity: row <= woven ? 1 : 0 }
  },
}

/** A long papyrus reed, ready to be woven in. */
const looseReed: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 14 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  parts: [{ id: 'reed', svg: `<path d="M2 7Q80 2 158 7Q80 12 2 7Z" fill="#c8a84a"/><path d="M6 7L154 7" stroke="#8a7a2a" stroke-width="1.4"/>` }],
}

/** The burning bush: thorny branches, green leaves that the fire doesn't burn, and the flame. */
const LEAVES = [
  [26, 70],
  [40, 56],
  [58, 62],
  [74, 52],
  [84, 70],
  [50, 78],
  [66, 80],
  [32, 84],
]
const burningBush: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 110 },
  facing: 1,
  poses: ['far', 'near'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'branches', svg: `<path d="M50 110L48 80L30 60M48 84L70 58M49 96L22 82M50 92L80 78M30 60L22 48M70 58L78 44M48 80L52 50" stroke="#4a3426" stroke-width="5" fill="none" stroke-linecap="round"/>` },
    { id: 'leaves', svg: LEAVES.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#4a8a3a"/><ellipse cx="${x! - 2}" cy="${y! - 1}" rx="5" ry="2.4" fill="#6aaa4a"/>`).join('') },
    { id: 'flame', pivot: { x: 50, y: 100 }, svg: `<path d="M50 104C14 96 10 60 30 40C30 56 38 60 40 50C40 30 52 16 58 2C62 24 76 30 78 46C84 38 86 30 86 24C98 48 92 92 50 104Z" fill="#f08a2a" opacity=".85"/>` },
    { id: 'core', pivot: { x: 50, y: 100 }, svg: `<path d="M50 98C30 92 28 70 40 56C42 66 48 66 48 58C48 44 56 36 60 26C64 42 72 50 70 62C76 56 76 50 76 46C82 64 76 90 50 98Z" fill="#ffd84a" opacity=".9"/>` },
  ],
  animate: (part, pose, time): PartMotion => {
    // From far off only the fire is seen; close by, the leaves are green in it.
    if (part === 'leaves') return { opacity: pose === 'near' ? 1 : 0 }
    if (part === 'branches') return { opacity: pose === 'near' ? 1 : 0.35 }
    if (part === 'flame') return { rotate: 2.5 * Math.sin(time * TAU * 0.9), y: 1.5 * Math.sin(time * TAU * 1.4) }
    if (part === 'core') return { rotate: -3 * Math.sin(time * TAU * 1.2 + 1), opacity: 0.85 + 0.15 * Math.sin(time * TAU * 2.1) }
    return {}
  },
}

/** Water from the Nile poured on the dry ground, which turns red. */
const pouredWater: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 24 },
  facing: 1,
  poses: ['water', 'red'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'water', svg: `<path d="M6 18Q20 4 60 6Q104 4 114 16Q100 24 60 22Q16 24 6 18Z" fill="#4a8ac8"/><path d="M30 12Q60 8 90 12" stroke="#a8d4f0" stroke-width="2" fill="none"/>` },
    { id: 'red', svg: `<path d="M6 18Q20 4 60 6Q104 4 114 16Q100 24 60 22Q16 24 6 18Z" fill="#9a1a2a"/><path d="M30 12Q60 8 90 12" stroke="#c84a5a" stroke-width="2" fill="none"/>` },
  ],
  animate: (part, pose): PartMotion => ({ opacity: (part === 'red') === (pose === 'red') ? 1 : 0 }),
}

export const exodusProps: Record<string, PaperPropArt> = { 'reed-basket': reedBasket, 'loose-reed': looseReed, 'burning-bush': burningBush, 'poured-water': pouredWater }
