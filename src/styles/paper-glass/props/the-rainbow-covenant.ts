import type { PaperPropArt } from '../art'

/**
 * Props of Level 2, Episode 5: Noah's altar of stones and the smoke rising straight up
 * from it; the first field and the family's tent; and, years later, the cloak Shem and
 * Japheth carry, walking backward, to cover their father.
 */

/** The altar: a heap of rough stones with wood laid on top; lit, a fire burns on it. */
const STONES: [number, number, number, number][] = [
  [8, 56, 34, 24],
  [40, 54, 38, 26],
  [76, 56, 36, 24],
  [18, 34, 30, 24],
  [46, 32, 32, 24],
  [76, 34, 28, 24],
]
const altar: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 110 },
  facing: 1,
  poses: ['idle', 'lit'],
  anchor: 'base',
  parts: [
    {
      id: 'stones',
      svg: `${STONES.map(([x, y, w, h], i) => `<rect x="${x}" y="${y! + 30}" width="${w}" height="${h}" rx="7" fill="${i % 2 ? '#8a8478' : '#9c968a'}"/><path d="M${x! + 4} ${y! + 33}L${x! + w! - 6} ${y! + 33}" stroke="#bab4a6" stroke-width="2.4" stroke-linecap="round"/>`).join('')}
        <path d="M20 62L100 58M24 56L96 64" stroke="#6a4a2a" stroke-width="6" stroke-linecap="round"/>`,
    },
    {
      id: 'fire',
      pivot: { x: 60, y: 60 },
      svg: `<path d="M34 60C30 44 42 36 44 22C50 34 54 30 58 12C64 30 70 30 74 20C78 36 90 42 86 60Z" fill="#f08a3a"/>
        <path d="M46 60C44 50 52 44 54 34C58 44 62 42 64 32C68 44 76 48 74 60Z" fill="#ffd27a"/>`,
    },
  ],
  animate: (part, pose, time) => (part === 'fire' ? { opacity: pose === 'lit' ? 1 : 0, rotate: 3 * Math.sin(time * Math.PI * 2 * 1.3), y: 1.5 * Math.sin(time * Math.PI * 2 * 2.1) } : {}),
}

/** Smoke rising straight up into a clear sky, widening a little as it goes. */
const smokeColumn: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 520 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    {
      id: 'smoke',
      svg: Array.from({ length: 14 }, (_, i) => {
        const y = 500 - i * 36
        const r = 14 + i * 2.6
        return `<circle cx="${60 + (i % 2 ? 4 : -4)}" cy="${y}" r="${r}" fill="#e4e2e6" opacity="${(0.55 - i * 0.03).toFixed(2)}"/>`
      }).join(''),
    },
  ],
  animate: (_part, _pose, time) => ({ x: 3 * Math.sin(time * Math.PI * 2 * 0.15) }),
}

/** A newly sown field: rows of furrows with green shoots coming up. */
const field: PaperPropArt = {
  box: { x: 0, y: 0, w: 320, h: 80 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'field',
      svg: `<path d="M10 80L40 10L280 10L310 80Z" fill="#8a6440"/>
        ${[0, 1, 2, 3, 4].map((k) => {
          const y = 18 + k * 14
          const inset = 34 - k * 6.5
          return `<path d="M${inset + 8} ${y}L${312 - inset - 8} ${y}" stroke="#6a4a2c" stroke-width="4"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${inset + 20 + i * ((272 - inset * 2) / 11)} ${y - 1}l-3 -7M${inset + 20 + i * ((272 - inset * 2) / 11)} ${y - 1}l4 -6" stroke="#7ac25a" stroke-width="2.4" stroke-linecap="round"/>`).join('')}`
        }).join('')}`,
    },
  ],
}

/** A tent of dark goat hair, striped, its door flap open, or closed for the night. */
const tent: PaperPropArt = {
  box: { x: 0, y: 0, w: 220, h: 130 },
  facing: 1,
  poses: ['open', 'closed'],
  anchor: 'base',
  parts: [
    {
      id: 'tent',
      svg: `<path d="M8 130L30 30L110 8L190 30L212 130Z" fill="#4a3a30"/>
        <path d="M30 30L110 8L190 30" stroke="#6a5444" stroke-width="5" fill="none"/>
        ${[52, 74, 96].map((y) => `<path d="M${22 - (y - 52) * 0.1} ${y}L${198 + (y - 52) * 0.1} ${y}" stroke="#5e4a3c" stroke-width="7"/>`).join('')}
        <path d="M30 30L22 130M190 30L198 130M110 8L110 40" stroke="#2e2420" stroke-width="3"/>`,
    },
    { id: 'door', svg: `<path d="M84 130L96 62L124 62L136 130Z" fill="#1e1612"/>` },
    { id: 'flap', svg: `<path d="M84 130L96 62L124 62L136 130Z" fill="#5a4636"/><path d="M110 62L110 130" stroke="#3a2c24" stroke-width="3"/><path d="M96 66L124 66" stroke="#ffd27a" stroke-width="2" opacity=".5"/>` },
  ],
  animate: (part, pose) => (part === 'flap' ? { opacity: pose === 'closed' ? 1 : 0 } : {}),
}

/** The cloak, held up between the two brothers by its corners, hanging in a soft fold. */
const cloak: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 70 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'cloak',
      svg: `<path d="M4 6L116 6L112 52Q60 74 8 52Z" fill="#b8a478"/><path d="M4 6L116 6" stroke="#d8c898" stroke-width="5" stroke-linecap="round"/>
        <path d="M30 10Q32 40 26 58M60 10Q62 44 60 64M90 10Q90 40 94 58" stroke="#98845a" stroke-width="2.4" fill="none"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ y: 1.2 * Math.sin(time * Math.PI * 2 * 0.9) }),
}

export const theRainbowCovenantProps: Record<string, PaperPropArt> = { 'noah-altar': altar, 'smoke-column': smokeColumn, field, 'striped-tent': tent, cloak }
