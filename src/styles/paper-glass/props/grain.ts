import type { PaperPropArt } from '../art'

/**
 * Props of Level 5, Episode 4: a heap of grain to scoop from, and a sack, empty, half full,
 * or full and tied, ready to load on a donkey.
 */

const grainHeap: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 70 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'heap', svg: `<path d="M4 70Q80 -20 156 70Z" fill="#e0b448"/><path d="M40 52Q80 10 120 52" stroke="#f4d070" stroke-width="4" fill="none"/>${[30, 60, 100, 130].map((x) => `<circle cx="${x}" cy="66" r="3" fill="#c89838"/>`).join('')}` }],
}

const SACK = '#c8a070'
const sack: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 80 },
  facing: 1,
  poses: ['empty', 'half', 'full'],
  anchor: 'base',
  parts: [
    { id: 'empty', svg: `<path d="M12 80L16 50Q30 44 44 50L48 80Z" fill="${SACK}"/><path d="M14 52Q30 40 46 52" stroke="#a8804a" stroke-width="3" fill="none"/>` },
    { id: 'half', svg: `<path d="M8 80L10 40Q30 30 50 40L52 80Z" fill="${SACK}"/><ellipse cx="30" cy="40" rx="18" ry="5" fill="#e0b448"/>` },
    { id: 'full', svg: `<path d="M6 80L8 26Q30 14 52 26L54 80Z" fill="${SACK}"/><path d="M22 16L38 16L34 26L26 26Z" fill="#a8804a"/><path d="M20 18L40 18" stroke="#6a4a2a" stroke-width="3"/><path d="M14 50L46 50" stroke="#a8804a" stroke-width="2.4"/>` },
  ],
  animate: (part, pose) => ({ opacity: part === pose ? 1 : 0 }),
}

export const grainProps: Record<string, PaperPropArt> = { 'grain-heap': grainHeap, sack }
