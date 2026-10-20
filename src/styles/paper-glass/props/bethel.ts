import type { PaperPropArt } from '../art'

/**
 * Props of Level 4, Episode 4: Jacob asleep; the stone, his pillow, which he sets up in the
 * morning as a pillar and anoints with oil; and the ladder of his dream, its steps lighting
 * one by one from the earth to heaven.
 */

const TAU = Math.PI * 2
const LIGHT = '#ffe7a0'

/** The ladder: its rails, eight steps from the ground up, and the light at its top. */
export const LADDER_STEPS = 8
const STEP_Y = Array.from({ length: LADDER_STEPS }, (_, i) => 640 - i * 80)
const railX = (y: number, side: -1 | 1) => 80 + side * (60 - ((700 - y) / 700) * 40)

const ladder: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 700 },
  facing: 1,
  poses: Array.from({ length: LADDER_STEPS + 1 }, (_, k) => `lit-${k}`),
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'top', svg: `<circle cx="80" cy="40" r="70" fill="${LIGHT}" opacity=".25"/><circle cx="80" cy="40" r="34" fill="#fff8e0" opacity=".7"/>` },
    {
      id: 'rails',
      svg: ([-1, 1] as const).map((side) => `<path d="M${railX(700, side) - 4} 700L${railX(700, side) + 4} 700L${railX(0, side) + 3} 0L${railX(0, side) - 3} 0Z" fill="${LIGHT}"/>`).join(''),
    },
    ...STEP_Y.map((y, i) => ({
      id: `step-${i + 1}`,
      svg: `<path d="M${railX(y, -1)} ${y - 5}L${railX(y, 1)} ${y - 5}L${railX(y, 1)} ${y + 5}L${railX(y, -1)} ${y + 5}Z" fill="${LIGHT}"/><path d="M${railX(y, -1) - 6} ${y}L${railX(y, 1) + 6} ${y}" stroke="${LIGHT}" stroke-width="22" opacity=".18" stroke-linecap="round"/>`,
    })),
  ],
  animate(part, pose, time) {
    const lit = Number(pose.split('-')[1])
    const shimmer = 0.9 + 0.1 * Math.sin(time * TAU * 0.6)
    if (part === 'rails') return { opacity: lit === 0 ? 0 : (0.3 + (0.6 * lit) / LADDER_STEPS) * shimmer }
    if (part === 'top') return { opacity: lit === LADDER_STEPS ? shimmer : 0 }
    return { opacity: Number(part.split('-')[1]) <= lit ? shimmer : 0 }
  },
}

/** Jacob lying asleep, his head on the stone, breathing slowly. */
const jacobAsleep: PaperPropArt = {
  box: { x: 0, y: 0, w: 130, h: 40 },
  facing: -1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'body',
      svg: `<path d="M20 26C26 14 60 12 100 16L124 20L126 38L22 38Z" fill="#3c5a8a"/>
        <path d="M40 22L118 24M44 30L120 32" stroke="#263e64" stroke-width="1.6" opacity=".7"/>
        <path d="M110 18L126 22L126 30L112 30Z" fill="#d0b060" opacity=".7"/>
        <circle cx="13" cy="24" r="8.6" fill="#3a2a42"/><path d="M5 20C6 14 14 12 20 15L21 22C15 20 10 21 5 20Z" fill="#2a1e1a"/>
        <path d="M22 18C40 12 80 12 104 15" stroke="#ffd99a" stroke-width="1.4" fill="none" opacity=".8"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ y: 0.6 * Math.sin(time * TAU * 0.18) }),
}

/** The stone: lying as Jacob's pillow, then set up as a pillar, and anointed with oil. */
const stonePillar: PaperPropArt = {
  box: { x: 0, y: 0, w: 70, h: 80 },
  facing: 1,
  poses: ['lying', 'standing', 'anointed'],
  anchor: 'base',
  parts: [
    { id: 'lying', svg: `<path d="M4 80Q2 62 16 60L56 58Q68 60 66 80Z" fill="#8a8494"/><path d="M12 64Q34 58 58 62" stroke="#b4aec0" stroke-width="3" fill="none"/>` },
    { id: 'standing', svg: `<path d="M20 80L16 14Q20 2 36 2Q50 4 52 16L50 80Z" fill="#8a8494"/><path d="M22 16Q30 6 44 10" stroke="#b4aec0" stroke-width="3" fill="none"/><path d="M28 30L26 70" stroke="#6e6878" stroke-width="2"/>` },
    { id: 'oil', svg: `<path d="M18 16Q20 4 36 3Q50 5 51 16Q40 12 34 22Q30 14 18 16Z" fill="#e8d070" opacity=".85"/><path d="M34 22L33 46" stroke="#e8d070" stroke-width="3" stroke-linecap="round" opacity=".7"/>` },
  ],
  animate(part, pose) {
    if (part === 'lying') return { opacity: pose === 'lying' ? 1 : 0 }
    if (part === 'standing') return { opacity: pose === 'lying' ? 0 : 1 }
    return { opacity: pose === 'anointed' ? 1 : 0 }
  },
}

export const bethelProps: Record<string, PaperPropArt> = { ladder, 'jacob-asleep': jacobAsleep, 'stone-pillar': stonePillar }
