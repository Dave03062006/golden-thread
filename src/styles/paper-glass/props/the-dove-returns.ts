import type { PaperPropArt } from '../art'

/**
 * Props of Level 2, Episode 4: the raven, flying to and fro over the waters, and the tops
 * of the trees just showing above them as the flood goes down, one of them an olive.
 */

/** The raven: black, its wing beating at the shoulder. It faces right. */
const raven: PaperPropArt = {
  box: { x: 0, y: 0, w: 80, h: 44 },
  facing: 1,
  poses: ['idle'],
  parts: [
    {
      id: 'body',
      svg: `
        <path d="M4 22L18 16L20 28Z" fill="#1c1820"/>
        <path d="M16 18C30 14 48 15 58 19C64 18 70 19 73 22L78 23L72 25C66 28 60 28 54 27C42 30 28 29 16 26Z" fill="#26222c"/>
        <path d="M72 22L80 23.5L72 25Z" fill="#3a3640"/>
        <circle cx="66" cy="21.4" r="1.2" fill="#d8d0c0"/>`,
    },
    {
      id: 'wing',
      pivot: { x: 40, y: 19 },
      svg: `<path d="M28 19C30 10 36 3 46 0L44 6L52 3L48 10L56 9L48 15C42 19 34 20 28 19Z" fill="#332e38"/>`,
    },
  ],
  animate: (part, _pose, time) => (part === 'wing' ? { rotate: 6 + 26 * Math.sin(time * Math.PI * 2 * 1.6) } : {}),
}

/** The leafy crown of a tree just above the water, with ripples around it; the olive's leaves are silvery. */
const CROWN = [
  [40, 46, 26],
  [70, 34, 30],
  [102, 40, 28],
  [126, 52, 22],
  [86, 54, 26],
  [56, 58, 20],
]
const crown = (colors: [string, string]) =>
  CROWN.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${colors[0]}"/><circle cx="${x! - r! * 0.25}" cy="${y! - r! * 0.3}" r="${r! * 0.55}" fill="${colors[1]}"/>`).join('')
const treetop: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 84 },
  facing: 1,
  poses: ['idle', 'olive'],
  anchor: 'base',
  parts: [
    { id: 'green', svg: crown(['#3a6a40', '#4c8050']) },
    {
      id: 'olive',
      svg: `${crown(['#6a7a52', '#8c9c70'])}${[
        [60, 40],
        [96, 30],
        [112, 50],
      ]
        .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="2.6" fill="#c4ccb0" transform="rotate(-24 ${x} ${y})"/>`)
        .join('')}`,
    },
    { id: 'ripples', svg: `<path d="M6 80C30 74 52 74 80 78C108 74 130 74 154 80" stroke="#dce8f0" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M0 84L160 84L160 76C120 72 40 72 0 76Z" fill="#4a6a88"/>` },
  ],
  animate: (part, pose) => (part === 'green' ? { opacity: pose === 'olive' ? 0 : 1 } : part === 'olive' ? { opacity: pose === 'olive' ? 1 : 0 } : {}),
}

export const theDoveReturnsProps: Record<string, PaperPropArt> = { raven, treetop }
