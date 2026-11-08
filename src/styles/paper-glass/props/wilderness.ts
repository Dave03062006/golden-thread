import type { PaperPropArt, PartMotion } from '../art'

/**
 * Props of Level 12 · Forty Years in the Wilderness: the bronze serpent on its pole, and the
 * small dark serpents among the tents; a staff, dry, budded with blossoms and almonds, or a
 * king's golden scepter; the great cluster of grapes, carried on a pole; a quail; and Balaam
 * riding his donkey, walking or lying down.
 */

const TAU = Math.PI * 2
const onePart = (part: string, pose: string): PartMotion => ({ opacity: part === pose ? 1 : 0 })

const bronzeSerpent: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 200 },
  facing: 1,
  poses: ['pole', 'snake'],
  anchor: 'base',
  parts: [
    {
      id: 'pole',
      svg: `<rect x="18.5" y="20" width="3" height="180" fill="#8a5a32"/><rect x="10" y="26" width="20" height="4" rx="2" fill="#a8743a"/>
        <path d="M20 34C8 38 8 46 20 48C32 50 32 58 20 60C8 62 8 70 20 72" stroke="#d08a3a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M20 34C26 30 28 24 34 22" stroke="#d08a3a" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="34" cy="21" r="3.6" fill="#e8a84a"/><circle cx="35" cy="20" r="0.9" fill="#3a2a1a"/>`,
    },
    // A small dark serpent, low among the tents (drawn in the bottom of the same box).
    { id: 'snake', svg: `<path d="M2 196C8 190 14 200 20 194C26 188 32 198 36 192" stroke="#4a2a2a" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="37" cy="191" r="2.2" fill="#8a2a2a"/>` },
  ],
  animate: (part, pose, time): PartMotion => ({ opacity: part === pose ? 1 : 0, x: part === 'snake' ? Math.sin(time * TAU * 0.6) * 1.2 : 0 }),
}

const rod: PaperPropArt = {
  box: { x: 0, y: 0, w: 20, h: 160 },
  facing: 1,
  poses: ['dry', 'budded', 'scepter'],
  anchor: 'base',
  parts: [
    { id: 'dry', svg: `<path d="M10 160L10.6 6" stroke="#8a5a32" stroke-width="3.4" stroke-linecap="round"/>` },
    {
      id: 'budded',
      svg: `<path d="M10 160L10.6 6" stroke="#8a5a32" stroke-width="3.4" stroke-linecap="round"/>${[[5, 16, '#ffffff'], [15, 26, '#f4dce4'], [4, 38, '#8ac85a'], [15, 50, '#ffffff'], [4, 62, '#8ac85a'], [14, 74, '#f4dce4']]
        .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${c}"/>`)
        .join('')}${[[7, 30], [12, 56]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.2" ry="3.2" fill="#c8a870"/>`).join('')}`,
    },
    { id: 'scepter', svg: `<rect x="8.6" y="30" width="2.8" height="130" fill="#e0b040"/><path d="M4 30L6 16L10 22L14 16L16 30Z" fill="#f4d070"/><circle cx="10" cy="14" r="3" fill="#b8323a"/>` },
  ],
  animate: onePart,
}

const grapeCluster: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 50 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'cluster',
      svg: `<rect x="0" y="5" width="100" height="3.4" rx="1.7" fill="#8a5a32"/><path d="M50 8L50 12" stroke="#4a6a2a" stroke-width="2"/><path d="M48 3Q42 -2 40 6Q46 4 48 8Z" fill="#5a8a3a"/>
        ${Array.from({ length: 22 }, (_, i) => {
          const row = Math.floor(Math.sqrt(i * 2))
          const x = 50 + ((i % 6) - 2.5) * (7 - row) * 1.1
          const y = 14 + row * 6
          return `<circle cx="${x.toFixed(1)}" cy="${y}" r="4.4" fill="${i % 3 ? '#6a2a6a' : '#8a3a7a'}"/>`
        }).join('')}`,
    },
  ],
  animate: (_part, _pose, time): PartMotion => ({ rotate: Math.sin(time * TAU * 0.5) * 1.5 }),
}

const quail: PaperPropArt = {
  box: { x: 0, y: 0, w: 20, h: 14 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  parts: [{ id: 'bird', svg: `<ellipse cx="9" cy="8" rx="6.4" ry="4.4" fill="#a8743a"/><circle cx="15" cy="5.4" r="3" fill="#a8743a"/><path d="M4 8Q9 5 13 9" stroke="#e0c48a" stroke-width="1.2" fill="none"/><path d="M17.6 5.4L19.6 6" stroke="#e0b040" stroke-width="1.4"/>` }],
}

/** Balaam on his donkey: the donkey's legs, body and head; Balaam on its back. */
const RIDER = `<rect x="28" y="18" width="18" height="32" rx="6" fill="#6a3a7a"/><circle cx="36.5" cy="13" r="6" fill="#a8704a"/><path d="M29 10Q36.5 2 44 10Z" fill="#e0b040"/><path d="M23 10L23 54" stroke="#8a5a32" stroke-width="3" stroke-linecap="round"/>`
const DONKEY = (legs: boolean) =>
  `${legs ? [16, 24, 50, 58].map((x) => `<rect x="${x}" y="64" width="4" height="26" rx="2" fill="#7a7a8a"/>`).join('') : ''}<ellipse cx="39" cy="57" rx="28" ry="12" fill="#8a8a9a"/><path d="M58 52L64 34L70 32L78 38L74 44L66 46L62 56Z" fill="#8a8a9a"/><path d="M64 34L62 22L66 22L67 33ZM70 32L70 21L73 21L73 32Z" fill="#6a6a7a"/><circle cx="73" cy="37" r="1.4" fill="#1a1a2a"/>`
const balaamRiding: PaperPropArt = {
  box: { x: 0, y: 0, w: 80, h: 90 },
  facing: 1,
  poses: ['walk', 'lie'],
  anchor: 'base',
  parts: [
    { id: 'walk', svg: `${DONKEY(true)}${RIDER}` },
    { id: 'lie', svg: `<g transform="translate(0 22)">${DONKEY(false)}${RIDER}</g>` },
  ],
  animate: (part, pose, time): PartMotion => ({ opacity: part === pose ? 1 : 0, y: part === 'walk' ? -1.6 * Math.abs(Math.sin(time * TAU * 1.4)) : 0 }),
}

export const wildernessProps: Record<string, PaperPropArt> = { 'bronze-serpent': bronzeSerpent, rod, 'grape-cluster': grapeCluster, quail, 'balaam-riding': balaamRiding }
