import type { PaperPropArt } from '../art'
import { cloud } from '../shapes'

/**
 * Props of Level 6, Episode 5: the whirlwind the LORD answers Job from, turning, with
 * lightning inside it; the storm clouds over the wonders God shows Job; the storehouses of
 * the snow; and the stars of the Pleiades and Orion.
 */

/** The whirlwind: bands of cloud narrowing to the ground, each turning its own way. */
const BANDS = [0, 1, 2, 3, 4, 5, 6]
const whirlwind: PaperPropArt = {
  box: { x: 0, y: 0, w: 300, h: 420 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    // The funnel the bands turn around, dark at its heart.
    { id: 'funnel', svg: `<path d="M14 30Q150 0 286 30L196 360Q170 410 158 420L142 420Q130 410 104 360Z" fill="#4e5872" opacity=".88"/><path d="M60 40Q150 24 240 40L176 330Q150 380 124 330Z" fill="#3e4660" opacity=".7"/>` },
    ...BANDS.map((i) => {
      const w = 140 - i * 17
      const y = 30 + i * 54
      return {
        id: `band-${i}`,
        svg: `<ellipse cx="150" cy="${y}" rx="${w}" ry="${30 - i * 2}" fill="${i % 2 ? '#7a84a0' : '#6a7490'}" opacity=".92"/><path d="M${150 - w * 0.8} ${y - 6}Q150 ${y + 14} ${150 + w * 0.8} ${y - 6}" stroke="#a8b0c8" stroke-width="5" fill="none" opacity=".8"/>`,
      }
    }),
    { id: 'tail', svg: `<path d="M138 400Q150 380 162 400L158 420L142 420Z" fill="#6a7490"/>` },
    { id: 'lightning', svg: `<path d="M110 70L130 120L118 122L140 176L104 118L118 116Z" fill="#fff0a0"/><path d="M196 190L210 226L200 228L214 262L188 222L200 220Z" fill="#fff0a0"/>` },
  ],
  animate: (part, _pose, time) => {
    if (part === 'lightning') return { opacity: Math.sin(time * 5.3) > 0.82 || Math.sin(time * 3.1 + 1) > 0.9 ? 1 : 0 }
    if (!part.startsWith('band-')) return {}
    const i = Number(part.slice(5))
    return { x: (10 - i) * Math.sin(time * 2.2 + i * 0.9) }
  },
}

/** A dark storm cloud, hiding what lies behind it. */
const stormCloud: PaperPropArt = {
  box: { x: 0, y: 0, w: 200, h: 110 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  shadow: false,
  parts: [{ id: 'cloud', svg: `<ellipse cx="100" cy="64" rx="96" ry="40" fill="#4a5068"/>${cloud(-6, 6, 1.8, ['#5a6078', '#6a7090', '#7a82a0'])}` }],
}

/** The storehouses of the snow: a cave in the mountain, heaped with snow, flakes falling. */
const FLAKES = [
  [24, 14],
  [52, 6],
  [86, 18],
  [108, 8],
  [70, 30],
  [36, 34],
]
const snowStore: PaperPropArt = {
  box: { x: 0, y: 0, w: 130, h: 110 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  parts: [
    {
      id: 'store',
      svg: `<path d="M4 108L30 46L64 30L100 44L126 108Z" fill="#8a94b0"/>
        <path d="M30 108L40 72Q64 52 88 72L98 108Z" fill="#2a3048"/>
        <path d="M36 108Q48 86 64 90Q80 86 92 108Z" fill="#f4f8ff"/>
        <path d="M30 46L64 30L100 44L90 52L64 42L40 54Z" fill="#f4f8ff"/>
        ${FLAKES.map(([x, y]) => `<path d="M${x! - 5} ${y}L${x! + 5} ${y}M${x} ${y! - 5}L${x} ${y! + 5}M${x! - 3.5} ${y! - 3.5}L${x! + 3.5} ${y! + 3.5}M${x! - 3.5} ${y! + 3.5}L${x! + 3.5} ${y! - 3.5}" stroke="#ffffff" stroke-width="2"/>`).join('')}`,
    },
  ],
}

/** The Pleiades, a little cluster, and Orion, with his belt of three stars. */
const PLEIADES = [
  [20, 30],
  [30, 22],
  [38, 32],
  [28, 40],
  [44, 24],
  [16, 44],
  [40, 46],
]
const ORION = [
  [96, 14],
  [140, 20],
  [110, 56],
  [120, 60],
  [130, 64],
  [100, 104],
  [146, 100],
]
const star = (x: number, y: number, r: number) => `<path d="M${x} ${y - r}L${x + r * 0.3} ${y - r * 0.3}L${x + r} ${y}L${x + r * 0.3} ${y + r * 0.3}L${x} ${y + r}L${x - r * 0.3} ${y + r * 0.3}L${x - r} ${y}L${x - r * 0.3} ${y - r * 0.3}Z" fill="#fff8d8"/>`
const constellation: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 120 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  shadow: false,
  parts: [
    {
      id: 'stars',
      svg: `<path d="M96 14L110 56M140 20L130 64M110 56L100 104M130 64L146 100" stroke="#c8d0f0" stroke-width="1.5" opacity=".6"/>
        ${PLEIADES.map(([x, y]) => star(x!, y!, 4)).join('')}${ORION.map(([x, y], i) => star(x!, y!, i >= 2 && i <= 4 ? 6 : 7)).join('')}`,
    },
  ],
}

export const whirlwindProps: Record<string, PaperPropArt> = { whirlwind, 'storm-cloud': stormCloud, 'snow-store': snowStore, constellation }
