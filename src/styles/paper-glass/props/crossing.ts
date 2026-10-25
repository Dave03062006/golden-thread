import type { PaperPropArt, PartMotion } from '../art'

/**
 * Props of Level 9 · Through the Sea: a stream running over the sand; the great rock at
 * Horeb; a pool in the desert; the manna lying on the ground; an omer jar, empty, filled,
 * or heaped for the sixth day; and the banners of Israel and of Amalek, far off in the valley.
 */

const TAU = Math.PI * 2

/** A stream of water running across the sand, its ripples flowing. */
const stream: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 12 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  shadow: false,
  parts: [
    { id: 'water', svg: `<path d="M0 5Q25 2 50 5T100 5L100 9Q75 12 50 9T0 9Z" fill="#5aa0d4"/>` },
    { id: 'ripples', svg: `<path d="M6 6.5l8 0M30 7l10 0M58 6.5l8 0M80 7l9 0" stroke="#d4eefc" stroke-width="1.2" stroke-linecap="round"/>` },
  ],
  animate: (part, _pose, time): PartMotion => (part === 'ripples' ? { x: (time * 6) % 12 } : {}),
}

/** The great rock at Horeb, split where Moses struck it. */
const greatRock: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 80 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'rock',
      svg: `<path d="M2 80Q0 46 14 30Q26 8 52 6Q80 6 92 30Q100 50 98 80Z" fill="#9a5a46"/>
        <path d="M14 30Q26 8 52 6Q40 18 34 40Q22 46 14 30Z" fill="#b8745a"/>
        <path d="M64 12Q86 18 92 40Q80 34 70 36Z" fill="#7a4232"/>
        <path d="M58 30L54 46L60 58L56 80" stroke="#5a2e22" stroke-width="2.4" fill="none"/>
        <path d="M20 62Q40 58 52 66M66 54Q80 52 90 60" stroke="#7a4232" stroke-width="2" fill="none"/>`,
    },
  ],
}

/** A shallow pool in the desert, at Marah. */
const pool: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 20 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'bank', svg: `<ellipse cx="50" cy="12" rx="50" ry="8" fill="#b89a6a"/>` },
    { id: 'water', svg: `<ellipse cx="50" cy="12" rx="42" ry="5.6" fill="#6a9a8e"/><ellipse cx="38" cy="11" rx="16" ry="1.6" fill="#a8d0c4" opacity=".8"/>` },
  ],
  animate: (part, _pose, time): PartMotion => (part === 'water' ? { opacity: 0.92 + 0.08 * Math.sin(time * TAU * 0.3) } : {}),
}

/** The manna on the ground: fine white flakes, like hoarfrost. */
const FLAKES = Array.from({ length: 18 }, (_, i) => [4 + ((i * 37) % 52), 9 + ((i * 23) % 6)] as const)
const manna: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 16 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'frost', svg: `<ellipse cx="30" cy="13" rx="28" ry="3" fill="#f4f2ea" opacity=".7"/>` },
    { id: 'flakes', svg: FLAKES.map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="${1.6 + (i % 3) * 0.6}" ry="1.1" fill="${i % 2 ? '#ffffff' : '#ece6d4'}"/>`).join('') },
  ],
  animate: (part, _pose, time): PartMotion => (part === 'flakes' ? { opacity: 0.88 + 0.12 * Math.sin(time * TAU * 0.4) } : {}),
}

/** An omer jar: empty, filled with manna, or heaped for the sixth day. */
const omerJar: PaperPropArt = {
  box: { x: 0, y: 0, w: 30, h: 44 },
  facing: 1,
  poses: ['empty', 'full', 'heaped'],
  anchor: 'base',
  parts: [
    { id: 'jar', svg: `<path d="M7 44Q2 30 6 20Q8 14 10 12L20 12Q22 14 24 20Q28 30 23 44Z" fill="#b87a4a"/><path d="M9 12L21 12L22 8L8 8Z" fill="#9a5e34"/><path d="M8 26Q15 29 22 26" stroke="#d89a62" stroke-width="2" fill="none"/>` },
    { id: 'full', svg: `<ellipse cx="15" cy="8.5" rx="7" ry="2.6" fill="#f4f2ea"/><ellipse cx="13" cy="8" rx="3" ry="1" fill="#ffffff"/>` },
    { id: 'heaped', svg: `<path d="M7 9Q15 -2 23 9Z" fill="#f4f2ea"/><ellipse cx="13" cy="5" rx="3" ry="1.2" fill="#ffffff"/>` },
  ],
  animate: (part, pose): PartMotion => (part === 'jar' ? {} : { opacity: part === pose ? 1 : 0 }),
}

/** A banner on a pole, far off in the valley: Israel's, or Amalek's. */
const banner: PaperPropArt = {
  box: { x: 0, y: 0, w: 30, h: 60 },
  facing: 1,
  poses: ['israel', 'amalek'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'pole', svg: `<path d="M8 60L8 2" stroke="#5a3a22" stroke-width="2.4"/>` },
    { id: 'israel', svg: `<path d="M9 4L28 8L9 20Z" fill="#3a6ab0"/><path d="M9 11L22 11" stroke="#f4f0e6" stroke-width="2"/>` },
    { id: 'amalek', svg: `<path d="M9 4L28 6L26 16L9 18Z" fill="#9a2a2a"/><path d="M12 8L22 14" stroke="#2a1a1a" stroke-width="2"/>` },
  ],
  animate: (part, pose, time): PartMotion => (part === 'pole' ? {} : { opacity: part === pose ? 1 : 0, y: 0.6 * Math.sin(time * TAU * 0.8) }),
}

export const crossingProps: Record<string, PaperPropArt> = { stream, 'great-rock': greatRock, pool, manna, 'omer-jar': omerJar, banner }
