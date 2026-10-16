import type { PaperPropArt } from '../art'

/**
 * Props of the generations from Adam to Noah (Episode 6): the city Cain built, with its
 * makers' things (the lyre and pipe, the forge), and the great family tree the player
 * fills, its glowing name-leaves and its root, where the golden thread is found.
 */

const TAU = Math.PI * 2

/** The first city: mud-brick walls and towers rising from the plain. It grows up from its base. */
const city: PaperPropArt = {
  box: { x: 0, y: 0, w: 260, h: 120 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'walls',
      svg: `
        <path d="M0 120L0 70L40 70L40 54L62 54L62 70L120 70L120 40L150 40L150 70L200 70L200 58L224 58L224 70L260 70L260 120Z" fill="#b08860"/>
        <path d="M120 40L150 40L150 120L120 120Z" fill="#9a7450"/>
        <path d="M0 70L260 70" stroke="#d8b888" stroke-width="2" opacity=".7"/>
        ${[8, 26, 46, 70, 90, 128, 160, 182, 208, 232]
          .map((x) => `<rect x="${x}" y="${x > 118 && x < 150 ? 32 : 62}" width="8" height="8" fill="#b08860"/>`)
          .join('')}
        <path d="M128 120L128 96C128 88 142 88 142 96L142 120Z" fill="#3a2a22"/>
        ${[
          [20, 90],
          [52, 82],
          [96, 92],
          [176, 86],
          [236, 94],
        ]
          .map(([x, y]) => `<rect x="${x}" y="${y}" width="6" height="8" fill="#5a4030"/>`)
          .join('')}`,
    },
  ],
}

/** A forge: an anvil by a glowing fire, with sparks flying up as the hammer falls. */
const forge: PaperPropArt = {
  box: { x: 0, y: 0, w: 80, h: 60 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'fire',
      svg: `
        <defs><radialGradient id="f" cx="20" cy="50" r="22" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffe08a"/><stop offset=".5" stop-color="#ff8a3a" stop-opacity=".7"/><stop offset="1" stop-color="#ff5a2a" stop-opacity="0"/></radialGradient></defs>
        <circle cx="20" cy="50" r="22" fill="url(#f)"/>
        <path d="M8 60L12 46L28 46L32 60Z" fill="#5a4a40"/>
        <path d="M14 46C16 38 20 36 22 30C24 36 26 40 26 46Z" fill="#ffb84a"/>`,
    },
    {
      id: 'anvil',
      svg: `<path d="M44 60L48 50L46 44L72 44C72 48 68 50 62 50L64 60Z" fill="#3a3a44"/><path d="M46 44L72 44" stroke="#8a8a9a" stroke-width="1.6"/>`,
    },
    {
      id: 'sparks',
      svg: `<g fill="#ffd36e">${[
        [56, 36, 1.6],
        [62, 30, 1.2],
        [52, 28, 1],
        [66, 22, 1.4],
        [58, 18, 1],
      ]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`)
        .join('')}</g>`,
    },
  ],
  animate: (part, _pose, time) => {
    if (part === 'sparks') {
      // A burst of sparks with each blow of the hammer, rising and fading.
      const t = (time % 1.2) / 1.2
      return { y: -10 * t, opacity: t < 0.7 ? 1 - t / 0.7 : 0 }
    }
    if (part === 'fire') return { opacity: 0.85 + 0.15 * Math.sin(time * TAU * 2.3) }
    return {}
  },
}

/** A lyre and a pipe, with notes rising from them: the first music. */
const lyre: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 60 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'instruments',
      svg: `
        <path d="M10 58C6 44 6 30 12 20M34 58C38 44 38 30 32 20" stroke="#a87a40" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M10 20L34 20M10 56L34 56" stroke="#7a5a30" stroke-width="3" stroke-linecap="round"/>
        <path d="M16 20L16 56M22 20L22 56M28 20L28 56" stroke="#f0e0b0" stroke-width=".8"/>
        <path d="M40 58L56 30" stroke="#c8a060" stroke-width="3.4" stroke-linecap="round"/>
        <circle cx="47" cy="46" r="1" fill="#5a4020"/><circle cx="50" cy="41" r="1" fill="#5a4020"/>`,
    },
    {
      id: 'notes',
      svg: `<g fill="#fff0c0"><circle cx="20" cy="10" r="2.6"/><path d="M22.4 10L22.4 2" stroke="#fff0c0" stroke-width="1.2"/><circle cx="44" cy="16" r="2.2"/><path d="M46 16L46 9" stroke="#fff0c0" stroke-width="1.2"/></g>`,
    },
  ],
  animate: (part, _pose, time) => {
    if (part !== 'notes') return {}
    const t = (time % 3) / 3
    return { y: -8 * t, opacity: Math.sin(t * Math.PI) }
  },
}

/**
 * The great family tree from Adam to Noah: its trunk and roots. Each name placed grows its
 * own branch (the 'tree-branch' prop) with a glowing leaf at the tip; both are actors of
 * their own, so they grow out from the trunk in either style.
 */
const familyTree: PaperPropArt = {
  box: { x: 0, y: 0, w: 200, h: 300 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'tree',
      svg: `
        <path d="M100 300C92 280 94 240 96 200C98 150 92 100 98 40C99 30 101 30 102 40C108 100 102 150 104 200C106 240 108 280 100 300Z" fill="#6a4a30"/>
        <path d="M100 300C80 300 64 296 56 290C70 292 86 292 96 284ZM100 300C120 300 136 296 144 290C130 292 114 292 104 284Z" fill="#5a3e28"/>`,
    },
  ],
}

/**
 * One branch of the family tree, growing out from the trunk. Its place is where it joins
 * the trunk: the middle of its box's base, so it grows outward from there, and facing
 * left sends it to the other side.
 */
const treeBranch: PaperPropArt = {
  box: { x: -70, y: -24, w: 140, h: 28 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'branch',
      svg: `<path d="M0 2C14 0 32 -4 46 -12C52 -16 56 -18 60 -20" stroke="#6a4a30" stroke-width="3.6" stroke-linecap="round" fill="none"/><path d="M30 -5C34 -10 38 -12 42 -13" stroke="#6a4a30" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
    },
  ],
}

/** A glowing leaf on the family tree, one for each name placed. */
const nameLeaf: PaperPropArt = {
  box: { x: -30, y: -30, w: 60, h: 60 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs><radialGradient id="g" cx="0" cy="0" r="30" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff6d0" stop-opacity=".9"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs>
        <circle r="30" fill="url(#g)"/>`,
    },
    {
      id: 'leaf',
      svg: `<path d="M0 12C-10 6 -12 -6 0 -14C12 -6 10 6 0 12Z" fill="#8ad06a"/><path d="M0 12L0 -12" stroke="#4a8a3a" stroke-width="1.2"/>`,
    },
  ],
  animate: (part, _pose, time) => (part === 'glow' ? { opacity: 0.7 + 0.3 * Math.sin(time * TAU * 0.4) } : {}),
}

/** The tree's root, glowing: where Luke's genealogy reaches back to Adam, "the son of God". */
const treeRoot: PaperPropArt = {
  box: { x: -80, y: -30, w: 160, h: 60 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.5,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs><radialGradient id="r" cx="0" cy="0" r="80" gradientTransform="scale(1 .38)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff2c0" stop-opacity=".9"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs>
        <ellipse rx="80" ry="30" fill="url(#r)"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ opacity: 0.75 + 0.25 * Math.sin(time * TAU * 0.3) }),
}

export const generationsProps: Record<string, PaperPropArt> = { city, forge, lyre, 'family-tree': familyTree, 'tree-branch': treeBranch, 'name-leaf': nameLeaf, 'tree-root': treeRoot }
