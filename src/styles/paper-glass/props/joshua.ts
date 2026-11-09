import type { PaperPropArt } from '../art'

/**
 * Props of Level 14: the flax drying on Rahab's roof; the scarlet cord, tied in her window or
 * let down as a rope to the ground; and a little carved idol, laid down at Shechem.
 */

const flax: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 30 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'bundle',
      svg: `<path d="M4 30Q2 14 20 12L84 10Q98 14 96 30Z" fill="#d8b878"/>
        ${Array.from({ length: 9 }, (_, i) => `<path d="M${10 + i * 10} 28Q${12 + i * 10} 18 ${8 + i * 11} 10" stroke="#b8945a" stroke-width="2" fill="none"/>`).join('')}
        <rect x="44" y="10" width="10" height="20" fill="#8a5a32"/>`,
    },
  ],
}

/** The cord's box is ten times as high as it is wide: a rope from the window to the ground, or (tied) only its last part. */
const scarletCord: PaperPropArt = {
  box: { x: 0, y: 0, w: 12, h: 128 },
  facing: 1,
  poses: ['idle', 'rope'],
  anchor: 'base',
  parts: [
    { id: 'tied', svg: `<path d="M2 108L10 108M6 108Q4 118 6 128" stroke="#c42a3a" stroke-width="3" stroke-linecap="round" fill="none"/>` },
    { id: 'rope', svg: `<path d="M6 0Q8 64 5 128" stroke="#c42a3a" stroke-width="3.4" stroke-linecap="round" fill="none"/>` },
  ],
  animate: (part, pose) => ({ opacity: (part === 'rope') === (pose === 'rope') ? 1 : 0 }),
}

const idol: PaperPropArt = {
  box: { x: 0, y: 0, w: 20, h: 36 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'figure',
      svg: `<circle cx="10" cy="7" r="5" fill="#a8744a"/><path d="M4 13L16 13L15 32L5 32Z" fill="#8a5a32"/><rect x="2" y="32" width="16" height="4" fill="#5a3a22"/>`,
    },
  ],
}

export const joshuaProps: Record<string, PaperPropArt> = { flax, 'scarlet-cord': scarletCord, idol }
