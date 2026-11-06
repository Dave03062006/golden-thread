import type { PaperPropArt, PartMotion } from '../art'

/**
 * Props of Level 10 · Sinai: the two tablets of stone, blank, written, or broken; the golden
 * calf; the rings of gold; the basin of blood; the book of the covenant; the pavement like
 * sapphire under God's feet; and the lightning on the mountain.
 */

const TAU = Math.PI * 2

/** The two tablets of stone, side by side, rounded at the top. */
const tablet = (x: number) => `<path d="M${x} 80L${x} 18Q${x} 4 ${x + 22} 4Q${x + 44} 4 ${x + 44} 18L${x + 44} 80Z" fill="#b8b0a4"/><path d="M${x + 3} 77L${x + 3} 19Q${x + 3} 8 ${x + 22} 8Q${x + 41} 8 ${x + 41} 19L${x + 41} 77Z" fill="#cec6ba"/>`
const lines = (x: number) => Array.from({ length: 5 }, (_, i) => `<path d="M${x + 8} ${24 + i * 11}L${x + 36} ${24 + i * 11}" stroke="#6a6258" stroke-width="2.4" stroke-dasharray="3 2"/>`).join('')
const stoneTablets: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 84 },
  facing: 1,
  poses: ['blank', 'written', 'broken'],
  anchor: 'center',
  parts: [
    { id: 'blank', svg: `${tablet(4)}${tablet(52)}` },
    { id: 'written', svg: `${tablet(4)}${tablet(52)}${lines(4)}${lines(52)}` },
    {
      id: 'broken',
      svg: `<path d="M2 84L8 60L22 66L30 50L44 58L40 84Z" fill="#b8b0a4"/><path d="M14 52L18 30L34 26L38 44L24 48Z" fill="#cec6ba"/><path d="M54 84L50 66L64 58L70 70L84 62L96 84Z" fill="#b8b0a4"/><path d="M60 50L66 28L82 30L86 50L72 54Z" fill="#cec6ba"/><path d="M20 40L32 36M64 40L80 42" stroke="#6a6258" stroke-width="2"/>`,
    },
  ],
  animate: (part, pose): PartMotion => ({ opacity: part === pose ? 1 : 0 }),
}

/** The golden calf, standing on its base. */
const goldenCalf: PaperPropArt = {
  box: { x: 0, y: 0, w: 80, h: 60 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'calf',
      svg: `<path d="M6 60L74 60L72 52L8 52Z" fill="#a87a2a"/>
        <path d="M14 52L16 36Q16 24 30 22L52 22Q62 20 64 14L70 10Q76 16 72 24Q70 30 64 32L62 52L56 52L54 38L26 38L24 52Z" fill="#e0b040"/>
        <path d="M64 14L60 6M70 10L74 2" stroke="#f0d070" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M20 30Q32 26 50 28" stroke="#f8e090" stroke-width="2" fill="none"/>`,
    },
  ],
  animate: (_part, _pose, time): PartMotion => ({ opacity: 0.92 + 0.08 * Math.sin(time * TAU * 0.7) }),
}

/** A heap of gold rings. */
const RINGS = [
  [10, 22],
  [20, 18],
  [30, 22],
  [16, 14],
  [26, 12],
  [36, 17],
  [22, 6],
]
const goldRings: PaperPropArt = {
  box: { x: 0, y: 0, w: 46, h: 28 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'rings', svg: RINGS.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="4" fill="none" stroke="${(x! + y!) % 3 ? '#e0b040' : '#f4d070'}" stroke-width="2.6"/>`).join('') }],
}

/** A bronze basin, holding the blood of the covenant. */
const basin: PaperPropArt = {
  box: { x: 0, y: 0, w: 50, h: 24 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'basin', svg: `<path d="M2 6Q4 24 25 24Q46 24 48 6Z" fill="#a8743a"/><ellipse cx="25" cy="6" rx="23" ry="5" fill="#c8945a"/><ellipse cx="25" cy="6.5" rx="19" ry="3.4" fill="#8a1a24"/>` }],
}

/** The book of the covenant: a scroll, half unrolled. */
const scroll: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 30 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  shadow: false,
  parts: [{ id: 'scroll', svg: `<path d="M8 4L52 4L52 26L8 26Z" fill="#f0e2c0"/><rect x="2" y="1" width="8" height="28" rx="4" fill="#a8743a"/><rect x="50" y="1" width="8" height="28" rx="4" fill="#a8743a"/>${[9, 14, 19].map((y) => `<path d="M14 ${y}L46 ${y}" stroke="#8a6a4a" stroke-width="1.4"/>`).join('')}` }],
}

/** The pavement under God's feet, "like the very heaven for clearness." */
const sapphirePavement: PaperPropArt = {
  box: { x: 0, y: 0, w: 400, h: 30 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'pavement', svg: `<path d="M0 30L40 4L360 4L400 30Z" fill="#3a6ab8" opacity=".85"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${50 + i * 38} 6L${30 + i * 42} 28" stroke="#8ab8ec" stroke-width="1.6" opacity=".8"/>`).join('')}<path d="M40 4L360 4" stroke="#c8e4ff" stroke-width="2"/>` },
  ],
  animate: (_part, _pose, time): PartMotion => ({ opacity: 0.85 + 0.15 * Math.sin(time * TAU * 0.25) }),
}

/** A bolt of lightning, flashing now and then. */
const lightning: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 100 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  shadow: false,
  parts: [{ id: 'bolt', svg: `<path d="M24 0L8 46L20 46L10 100L34 38L22 38L32 0Z" fill="#fff6c0"/><path d="M24 0L8 46L20 46L10 100" stroke="#ffe48a" stroke-width="2" fill="none"/>` }],
  // A flash, a flicker, then dark for a while.
  animate: (_part, _pose, time): PartMotion => {
    const t = time % 3.2
    return { opacity: t < 0.12 ? 1 : t < 0.2 ? 0.2 : t < 0.32 ? 0.9 : 0 }
  },
}

export const sinaiProps: Record<string, PaperPropArt> = { 'stone-tablets': stoneTablets, 'golden-calf': goldenCalf, 'gold-rings': goldRings, basin, scroll, 'sapphire-pavement': sapphirePavement, lightning }
