import type { PaperPropArt, PartMotion } from '../art'

/**
 * Props of Level 4, Episode 6: Jacob and the stranger, wrestling through the night by the
 * Jabbok, seen as two shadows locked together against the stars.
 *
 * Poses:
 * - hold: leaning into each other, locked fast.
 * - pull: the stranger pulls away, and Jacob strains to keep hold.
 * - slip: Jacob's grip slips for a moment, and he staggers.
 * - touch: the hollow of Jacob's thigh is touched, and he sinks, still holding on.
 */

const TAU = Math.PI * 2
const RIM = '#ffd99a'

/** One figure, facing right, its feet at (x, 128): robe, head, and arms reaching forward. */
const figure = (x: number, robe: string, hair: string, beard: string, mirror: boolean) => `
  <g transform="${mirror ? `translate(${2 * x} 0) scale(-1 1)` : ''}">
    <path d="M${x - 14} 128L${x - 10} 54Q${x} 44 ${x + 12} 52L${x + 16} 128Z" fill="${robe}"/>
    <circle cx="${x + 6}" cy="38" r="9" fill="#3a2a42"/>
    <path d="M${x - 2} 34Q${x + 4} 26 ${x + 14} 32L${x + 12} 38Q${x + 4} 34 ${x - 2} 36Z" fill="${hair}"/>
    <path d="M${x + 10} 42Q${x + 16} 50 ${x + 10} 54L${x + 4} 48Z" fill="${beard}"/>
    <path d="M${x + 6} 60L${x + 34} 66L${x + 34} 72L${x + 4} 70Z" fill="#3a2a42"/>
    <path d="M${x - 10} 56C${x - 12} 80 ${x - 13} 104 ${x - 14} 126" stroke="${RIM}" stroke-width="1.6" fill="none" opacity=".8"/>
  </g>`

const LEAN: Record<string, { jacob: PartMotion; stranger: PartMotion }> = {
  hold: { jacob: { rotate: 8 }, stranger: { rotate: -8 } },
  pull: { jacob: { rotate: 16, x: 4 }, stranger: { rotate: 4, x: 6 } },
  slip: { jacob: { rotate: -6, x: -8, y: 4 }, stranger: { rotate: -2, x: 4 } },
  touch: { jacob: { rotate: 10, y: 14 }, stranger: { rotate: -12 } },
}

const wrestlers: PaperPropArt = {
  box: { x: 0, y: 0, w: 130, h: 130 },
  facing: 1,
  poses: Object.keys(LEAN),
  anchor: 'base',
  parts: [
    { id: 'stranger', pivot: { x: 92, y: 128 }, svg: figure(92, '#3e3e6e', '#26264a', '#26264a', true) },
    { id: 'jacob', pivot: { x: 38, y: 128 }, svg: figure(38, '#3c5a8a', '#3a2a22', '#3a2a22', false) },
  ],
  animate(part, pose, time) {
    const lean = LEAN[pose] ?? LEAN.hold!
    const sway = 2 * Math.sin(time * TAU * 0.35)
    const motion = part === 'jacob' ? lean.jacob : lean.stranger
    return { ...motion, rotate: (motion.rotate ?? 0) + (part === 'jacob' ? sway : -sway) }
  },
}

export const jabbokProps: Record<string, PaperPropArt> = { wrestlers }
