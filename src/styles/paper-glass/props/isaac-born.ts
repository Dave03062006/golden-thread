import type { PaperPropArt } from '../art'

/**
 * Props of Level 3, Episode 9: Isaac as a newborn, swaddled in his mother's arms; the hand
 * drum that keeps the beat at his feast; and the oil lamps hung for it.
 */

const swaddledBaby: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 34 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  parts: [
    {
      id: 'baby',
      svg: `<path d="M8 20Q6 8 22 6L44 6Q56 8 54 20Q54 32 38 32L20 32Q8 32 8 20Z" fill="#f4ecdc"/>
        <path d="M20 8L22 30M32 7L33 31" stroke="#d8ccb4" stroke-width="2"/>
        <circle cx="48" cy="16" r="9" fill="#8a5a42"/><path d="M44 18Q48 21 52 18" stroke="#5a3a2a" stroke-width="1.4" fill="none"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ rotate: 3 * Math.sin(time * Math.PI * 2 * 0.4) }),
}

/** A round hand drum, struck on the beat. */
const handDrum: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 50 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'drum',
      svg: `<ellipse cx="30" cy="14" rx="26" ry="9" fill="#f0e2c0"/><path d="M4 14L8 46Q30 54 52 46L56 14Q30 24 4 14Z" fill="#a8743a"/>
        <path d="M8 22L16 44M22 24L26 48M38 24L34 48M52 22L44 44" stroke="#7a5228" stroke-width="2"/>`,
    },
  ],
}

/** An oil lamp on a pole, its flame glowing. */
const oilLamp: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 120 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'pole', svg: `<path d="M20 120L20 30" stroke="#6a4a2a" stroke-width="4"/><path d="M8 30Q20 40 32 30Z" fill="#b8784a"/>` },
    { id: 'flame', pivot: { x: 20, y: 30 }, svg: `<circle cx="20" cy="20" r="16" fill="#ffd27a" opacity=".3"/><path d="M15 30Q14 18 20 8Q26 18 25 30Z" fill="#ffc050"/>` },
  ],
  animate: (part, _pose, time) => (part === 'flame' ? { rotate: 5 * Math.sin(time * 4), opacity: 0.85 + 0.15 * Math.sin(time * 7) } : {}),
}

export const isaacBornProps: Record<string, PaperPropArt> = { 'swaddled-baby': swaddledBaby, 'hand-drum': handDrum, 'oil-lamp': oilLamp }
