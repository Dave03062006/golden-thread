import type { PaperPropArt } from '../art'

/**
 * Props of Level 5, Episode 1: a sheaf of wheat from Joseph's dream, standing upright or
 * bowing down; the empty pit at Dothan; the twenty shekels of silver he was sold for; and
 * the round tokens on the map of the play "to Dothan": Joseph, and the signs on his way.
 */

const TAU = Math.PI * 2

/** A sheaf, bound at the waist; bowing, it leans over from its base. */
const sheaf: PaperPropArt = {
  box: { x: 0, y: 0, w: 50, h: 110 },
  facing: -1,
  poses: ['stand', 'bow'],
  anchor: 'base',
  parts: [
    {
      id: 'sheaf',
      pivot: { x: 25, y: 108 },
      svg: `<path d="M14 110L18 50L8 14L18 22L22 4L26 22L34 8L32 26L42 16L32 50L36 110Z" fill="#e0b448"/>
        <path d="M20 50L19 108M25 48L25 108M30 50L31 108" stroke="#b88a2a" stroke-width="2"/>
        <path d="M14 56L36 56L36 63L14 63Z" fill="#a8743a"/>`,
    },
  ],
  animate(_part, pose, time) {
    const sway = 2 * Math.sin(time * TAU * 0.2)
    return pose === 'bow' ? { rotate: -38 + sway, y: 6 } : { rotate: sway }
  },
}
const pit: PaperPropArt = {
  box: { x: 0, y: 0, w: 140, h: 50 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'pit',
      svg: `<ellipse cx="70" cy="30" rx="68" ry="18" fill="#8a7458"/><ellipse cx="70" cy="30" rx="54" ry="12" fill="#2a1e18"/>
        <path d="M20 26Q70 14 120 26" stroke="#b09878" stroke-width="3" fill="none"/>
        ${[16, 40, 100, 124].map((x, i) => `<ellipse cx="${x}" cy="${36 + (i % 2) * 6}" rx="9" ry="6" fill="#a08c70"/>`).join('')}`,
    },
  ],
}

const silverCoins: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 30 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'coins',
      svg: [
        [12, 24],
        [26, 26],
        [40, 24],
        [20, 17],
        [34, 17],
        [27, 10],
        [48, 26],
      ]
        .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="5" fill="#d8e0e8"/><ellipse cx="${x}" cy="${y! - 1}" rx="5" ry="2.6" fill="#f4f8fc"/>`)
        .join(''),
    },
  ],
}

const ICONS: Record<string, string> = {
  joseph: `<path d="M22 34L24 16Q30 10 36 16L38 34Z" fill="#8a3aa0"/><path d="M24 22L36 22" stroke="#e0b040" stroke-width="3"/><circle cx="30" cy="12" r="5" fill="#3a2a42"/>`,
  fire: `<path d="M20 36L40 36" stroke="#6a4a2a" stroke-width="4"/><path d="M30 34Q20 26 26 16Q28 24 31 20Q30 12 36 8Q34 18 38 24Q40 30 30 34Z" fill="#f08a3a"/>`,
  man: `<path d="M24 36L26 18Q30 14 34 18L36 36Z" fill="#8a7a62"/><circle cx="30" cy="13" r="4.6" fill="#3a2a42"/><path d="M34 20L44 12" stroke="#3a2a42" stroke-width="3" stroke-linecap="round"/>`,
  lamb: `<ellipse cx="30" cy="26" rx="11" ry="7" fill="#f4f0e6"/><circle cx="40" cy="22" r="4" fill="#f4f0e6"/><path d="M24 32L24 38M34 32L34 38" stroke="#3a2a2a" stroke-width="2.4"/>`,
  // Level 9, the path through the sea: Moses with his rod, a child, an old man, a family.
  moses: `<path d="M22 36L24 18Q30 12 36 18L38 36Z" fill="#7a5a3a"/><circle cx="30" cy="13" r="5" fill="#d8d4cc"/><path d="M41 8L40 38" stroke="#5a3a22" stroke-width="2.6" stroke-linecap="round"/>`,
  child: `<path d="M25 36L26 24Q30 19 34 24L35 36Z" fill="#c05a6a"/><circle cx="30" cy="19" r="4" fill="#3a2a42"/>`,
  elder: `<path d="M22 36L24 18Q30 12 36 18L38 36Z" fill="#8a7a5a"/><circle cx="30" cy="13" r="5" fill="#e8e4dc"/><path d="M18 36L20 20" stroke="#5a3a22" stroke-width="2.4" stroke-linecap="round"/>`,
  family: `<path d="M16 36L18 20Q22 15 26 20L28 36Z" fill="#6a7a3a"/><circle cx="22" cy="15" r="4" fill="#3a2a42"/><path d="M32 36L34 22Q38 17 42 22L44 36Z" fill="#a84a5a"/><circle cx="38" cy="17" r="4" fill="#f0e0c8"/>`,
}
/** A round token on the cloth map, with the picture of what it stands for. */
const mapToken: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 46 },
  facing: 1,
  poses: Object.keys(ICONS),
  anchor: 'center',
  parts: [
    { id: 'disc', svg: `<circle cx="30" cy="23" r="21" fill="#f4e6c4"/><circle cx="30" cy="23" r="21" fill="none" stroke="#a07a4a" stroke-width="3"/>` },
    ...Object.entries(ICONS).map(([id, svg]) => ({ id, svg })),
  ],
  animate: (part, pose) => (part === 'disc' ? {} : { opacity: part === pose ? 1 : 0 }),
}

export const soldProps: Record<string, PaperPropArt> = { sheaf, pit, 'silver-coins': silverCoins, 'map-token': mapToken }
