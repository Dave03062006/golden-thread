import type { PaperPropArt, PartMotion } from '../art'

/**
 * Props of Level 4, Episode 2: the pot of red lentil stew over Jacob's fire, the bowl he
 * holds out to his hungry brother, and the golden scales of the play "what is it worth?":
 * the bowl on one pan, and on the other, one by one, the five things the birthright meant,
 * until the stew flies up, light as nothing.
 */

const TAU = Math.PI * 2
const GOLD = '#e8c460'
const GOLD_DARK = '#b8903a'
const STEW = '#b8402a'

/** Steam rising from something hot, drifting and fading as it goes. */
const steam = (xs: number[], top: number) => xs.map((x) => `<path d="M${x} ${top}Q${x - 6} ${top - 12} ${x} ${top - 24}Q${x + 6} ${top - 36} ${x} ${top - 48}" stroke="#f4eee4" stroke-width="3.4" fill="none" stroke-linecap="round" opacity=".55"/>`).join('')
const steaming = (part: string, _pose: string, time: number): PartMotion => (part === 'steam' ? { y: -4 * ((time * 0.5) % 1), opacity: 0.6 + 0.4 * Math.sin(time * TAU * 0.5) } : {})

const stewPot: PaperPropArt = {
  box: { x: 0, y: 0, w: 90, h: 110 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    { id: 'steam', svg: steam([32, 50, 64], 52) },
    {
      id: 'pot',
      svg: `<path d="M10 62Q8 104 45 106Q82 104 80 62Z" fill="#3a2e2a"/>
        <ellipse cx="45" cy="62" rx="36" ry="8" fill="${STEW}"/><ellipse cx="38" cy="61" rx="10" ry="2.4" fill="#d8683a"/>
        <path d="M8 60L82 60" stroke="#5a4a42" stroke-width="5" stroke-linecap="round"/>
        <path d="M18 74Q45 82 72 74" stroke="#4e403a" stroke-width="2.4" fill="none"/>`,
    },
  ],
  animate: steaming,
}

const stewBowl: PaperPropArt = {
  box: { x: 0, y: 0, w: 70, h: 80 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    { id: 'steam', svg: steam([26, 44], 46) },
    { id: 'bowl', svg: `<path d="M4 52Q8 80 35 80Q62 80 66 52Z" fill="#8a5a32"/><ellipse cx="35" cy="52" rx="31" ry="6" fill="${STEW}"/><path d="M14 62Q35 70 56 62" stroke="#6a4224" stroke-width="2" fill="none"/>` },
  ],
  animate: steaming,
}

/** The scales' poses: the stew's weight alone, then each of the five pieces placed. */
export const SCALE_POSES = ['stew', 'tip-1', 'tip-2', 'tip-3', 'tip-4', 'tip-5'] as const
/** How far the beam turns in each pose, in degrees (clockwise lifts the stew's side). */
export const SCALE_TILT: Record<string, number> = { stew: -14, 'tip-1': -8, 'tip-2': -2, 'tip-3': 4, 'tip-4': 10, 'tip-5': 18 }
const PIVOT = { x: 150, y: 44 }
const ARM = 120

const pan = (x: number) => `
  <path d="M${x} 44L${x - 26} 120M${x} 44L${x + 26} 120" stroke="${GOLD_DARK}" stroke-width="2"/>
  <path d="M${x - 32} 120L${x + 32} 120Q${x + 26} 134 ${x} 134Q${x - 26} 134 ${x - 32} 120Z" fill="${GOLD}"/>`

const gift = (k: number) => {
  const cy = 112 - k * 11
  return `<path d="M270 ${cy - 7}L276 ${cy}L270 ${cy + 7}L264 ${cy}Z" fill="#fff4c0"/><circle cx="270" cy="${cy}" r="9" fill="#ffe48a" opacity=".35"/>`
}

const scales: PaperPropArt = {
  box: { x: 0, y: 0, w: 300, h: 250 },
  facing: 1,
  poses: [...SCALE_POSES],
  anchor: 'center',
  shadow: false,
  parts: [
    {
      id: 'stand',
      svg: `<path d="M146 44L154 44L156 226L144 226Z" fill="${GOLD_DARK}"/>
        <path d="M104 226L196 226L208 244L92 244Z" fill="${GOLD}"/><circle cx="150" cy="36" r="9" fill="${GOLD}"/>`,
    },
    { id: 'beam', pivot: PIVOT, svg: `<path d="M26 40L274 40L274 48L26 48Z" fill="${GOLD}"/><circle cx="30" cy="44" r="5" fill="${GOLD_DARK}"/><circle cx="270" cy="44" r="5" fill="${GOLD_DARK}"/>` },
    { id: 'pan-left', svg: pan(30) },
    { id: 'bowl', svg: `<path d="M8 104Q12 120 30 120Q48 120 52 104Z" fill="#8a5a32"/><ellipse cx="30" cy="104" rx="22" ry="5" fill="${STEW}"/>${steam([24, 36], 98).replaceAll('stroke-width="3.4"', 'stroke-width="2.4"')}` },
    { id: 'pan-right', svg: pan(270) },
    ...[0, 1, 2, 3, 4].map((k) => ({ id: `gift-${k + 1}`, svg: gift(k) })),
  ],
  animate(part, pose) {
    const tilt = ((SCALE_TILT[pose] ?? 0) * Math.PI) / 180
    if (part === 'beam') return { rotate: SCALE_TILT[pose] ?? 0 }
    // Each pan hangs from its end of the beam, so it rises and falls with it.
    const left = { x: ARM - ARM * Math.cos(tilt), y: -ARM * Math.sin(tilt) }
    const right = { x: ARM * Math.cos(tilt) - ARM, y: ARM * Math.sin(tilt) }
    if (part === 'pan-left' || part === 'bowl') return left
    if (part.startsWith('gift-')) {
      const placed = Number(pose.split('-')[1] ?? 0)
      return { ...right, opacity: Number(part.split('-')[1]) <= placed ? 1 : 0 }
    }
    if (part === 'pan-right') return right
    return {}
  },
}

export const birthrightProps: Record<string, PaperPropArt> = { 'stew-pot': stewPot, 'stew-bowl': stewBowl, scales }
