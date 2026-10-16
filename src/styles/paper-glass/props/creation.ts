import type { PaperPropArt } from '../art'
import { sparkle } from '../shapes'

/**
 * The lights, plants and creatures of the six days, as paper puppets. Each part is a
 * piece of SVG in the prop's own box; parts with a pivot turn at that joint.
 */

const TAU = Math.PI * 2

/** God's Spirit over the waters: a breath of light with two soft wings, beating slowly. */
const spirit: PaperPropArt = {
  box: { x: 0, y: 0, w: 200, h: 100 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.6,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs>
          <radialGradient id="g" cx=".5" cy=".5" r=".5">
            <stop offset="0" stop-color="#fffdf2" stop-opacity=".95"/>
            <stop offset=".35" stop-color="#fff2cc" stop-opacity=".55"/>
            <stop offset="1" stop-color="#fff2cc" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="56" rx="96" ry="40" fill="url(#g)"/>`,
    },
    {
      id: 'wing-l',
      pivot: { x: 100, y: 54 },
      svg: `
        <defs>
          <linearGradient id="w" x1="100" y1="54" x2="14" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ffffff" stop-opacity=".85"/>
            <stop offset="1" stop-color="#fff4d6" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path d="M100 56C82 36 50 20 12 20C38 30 58 42 72 52C56 48 40 46 26 48C50 54 74 58 100 60Z" fill="url(#w)"/>`,
    },
    {
      id: 'wing-r',
      pivot: { x: 100, y: 54 },
      svg: `
        <defs>
          <linearGradient id="w" x1="100" y1="54" x2="186" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ffffff" stop-opacity=".85"/>
            <stop offset="1" stop-color="#fff4d6" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path d="M100 56C118 36 150 20 188 20C162 30 142 42 128 52C144 48 160 46 174 48C150 54 126 58 100 60Z" fill="url(#w)"/>`,
    },
  ],
  animate: (part, _pose, time) => {
    const beat = Math.sin(time * TAU * 0.32)
    if (part === 'wing-l') return { rotate: -11 * beat }
    if (part === 'wing-r') return { rotate: 11 * beat }
    return { opacity: 0.82 + 0.18 * Math.sin(time * TAU * 0.21) }
  },
}

/** Day one's flood of light, which grows from a point until it fills everything. */
const lightFlood: PaperPropArt = {
  box: { x: -200, y: -200, w: 400, h: 400 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.15,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs>
          <radialGradient id="f" cx="0" cy="0" r="200" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ffffff"/>
            <stop offset=".3" stop-color="#fffdf3"/>
            <stop offset=".5" stop-color="#fff4d2" stop-opacity=".96"/>
            <stop offset=".68" stop-color="#ffe6a6" stop-opacity=".8"/>
            <stop offset=".85" stop-color="#ffd27a" stop-opacity=".4"/>
            <stop offset="1" stop-color="#ffc860" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle r="200" fill="url(#f)"/>`,
    },
  ],
}

/** The first light: a bright point with a soft halo and a slowly turning sparkle. */
const firstLight: PaperPropArt = {
  box: { x: -60, y: -60, w: 120, h: 120 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.8,
  parts: [
    {
      id: 'halo',
      svg: `
        <defs>
          <radialGradient id="h" cx="0" cy="0" r="60" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ffffff"/>
            <stop offset=".12" stop-color="#fffbe6"/>
            <stop offset=".3" stop-color="#ffe9a8" stop-opacity=".65"/>
            <stop offset=".6" stop-color="#ffd27a" stop-opacity=".22"/>
            <stop offset="1" stop-color="#ffd27a" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle r="60" fill="url(#h)"/>`,
    },
    {
      id: 'sparkle',
      pivot: { x: 0, y: 0 },
      svg: `<g fill="#fffdf4" opacity=".9">${sparkle(0, 0, 34)}</g><g fill="#ffffff">${sparkle(0, 0, 14)}</g>`,
    },
  ],
  animate: (part, _pose, time) => {
    if (part === 'sparkle') return { rotate: time * 9, opacity: 0.7 + 0.3 * Math.sin(time * TAU * 0.5) }
    return { opacity: 0.88 + 0.12 * Math.sin(time * TAU * 0.5 + 1) }
  },
}

/** A soft warm light, around the man and the woman. */
const halo: PaperPropArt = {
  box: { x: -100, y: -100, w: 200, h: 200 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.3,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs>
          <radialGradient id="h" cx="0" cy="0" r="100" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff8e2" stop-opacity=".85"/>
            <stop offset=".45" stop-color="#ffe7b0" stop-opacity=".35"/>
            <stop offset="1" stop-color="#ffe0a0" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle r="100" fill="url(#h)"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ opacity: 0.85 + 0.15 * Math.sin(time * TAU * 0.18) }),
}

/** The sun: a glowing disc with a ring of rays that turns very slowly. */
const sun: PaperPropArt = {
  box: { x: -100, y: -100, w: 200, h: 200 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.7,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs>
          <radialGradient id="s" cx="0" cy="0" r="100" gradientUnits="userSpaceOnUse">
            <stop offset=".34" stop-color="#fff1c0" stop-opacity=".95"/>
            <stop offset=".42" stop-color="#ffe08a" stop-opacity=".55"/>
            <stop offset=".7" stop-color="#ffc86a" stop-opacity=".16"/>
            <stop offset="1" stop-color="#ffc86a" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle r="100" fill="url(#s)"/>`,
    },
    {
      id: 'rays',
      pivot: { x: 0, y: 0 },
      svg: `<g fill="#fff3c4" opacity=".55">${Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * TAU
        const p = (r: number, da: number) => `${(Math.cos(a + da) * r).toFixed(1)} ${(Math.sin(a + da) * r).toFixed(1)}`
        return `<path d="M${p(44, -0.09)}L${p(76, 0)}L${p(44, 0.09)}Z"/>`
      }).join('')}</g>`,
    },
    {
      id: 'disc',
      svg: `
        <defs>
          <radialGradient id="d" cx="-10" cy="-10" r="48" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fffef6"/>
            <stop offset=".6" stop-color="#fff0b8"/>
            <stop offset="1" stop-color="#ffd977"/>
          </radialGradient>
        </defs>
        <circle r="36" fill="url(#d)"/>
        <circle r="36" fill="none" stroke="#fff8dc" stroke-width="2.5"/>`,
    },
  ],
  animate: (part, _pose, time) => (part === 'rays' ? { rotate: time * 3 } : {}),
}

/** The moon: a silver crescent with a soft glow. */
const moon: PaperPropArt = {
  box: { x: -60, y: -60, w: 120, h: 120 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.8,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs>
          <radialGradient id="m" cx="0" cy="0" r="60" gradientUnits="userSpaceOnUse">
            <stop offset=".4" stop-color="#e8e6ff" stop-opacity=".45"/>
            <stop offset="1" stop-color="#e8e6ff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle r="60" fill="url(#m)"/>`,
    },
    {
      id: 'disc',
      svg: `
        <defs>
          <mask id="c"><circle r="30" fill="#fff"/><circle cx="14" cy="-8" r="26" fill="#000"/></mask>
        </defs>
        <g mask="url(#c)">
          <circle r="30" fill="#f6f3ff"/>
          <circle cx="-14" cy="6" r="4" fill="#dcd8f2"/>
          <circle cx="-8" cy="18" r="3" fill="#dcd8f2"/>
          <circle cx="-20" cy="-8" r="2.5" fill="#dcd8f2"/>
        </g>`,
    },
  ],
  animate: (part, _pose, time) => (part === 'glow' ? { opacity: 0.85 + 0.15 * Math.sin(time * TAU * 0.15) } : {}),
}

/** A fruit tree: a trunk, and a crown of leaf clusters hung with fruit that sways in the breeze. */
const fruitTree: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 120 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'trunk',
      svg: `
        <path d="M43 120C45 104 46 88 45 72L40 62L46 66L48 56L52 66L59 60L54 72C54 88 55 104 58 120Z" fill="#7a4a2c"/>
        <path d="M43 120C45 104 46 88 45 72L48 74C48 90 47 106 47 120Z" fill="#a0683e"/>`,
    },
    {
      id: 'crown',
      pivot: { x: 50, y: 70 },
      svg: `
        <circle cx="50" cy="46" r="31" fill="#3a8a40"/>
        <circle cx="28" cy="58" r="20" fill="#44964a"/>
        <circle cx="73" cy="57" r="20" fill="#44964a"/>
        <circle cx="50" cy="28" r="22" fill="#53a853"/>
        <circle cx="35" cy="38" r="16" fill="#62b65c"/>
        <circle cx="64" cy="39" r="16" fill="#5aaf57"/>
        <circle cx="38" cy="26" r="9" fill="#8fd476" opacity=".85"/>
        <circle cx="24" cy="50" r="7" fill="#8fd476" opacity=".7"/>
        ${[
          [32, 52],
          [58, 34],
          [71, 61],
          [45, 64],
          [24, 64],
          [62, 52],
          [46, 40],
        ]
          .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="#e5533d"/><circle cx="${x! - 1.4}" cy="${y! - 1.4}" r="1.6" fill="#ffb09c"/>`)
          .join('')}`,
    },
  ],
  animate: (part, _pose, time) => (part === 'crown' ? { rotate: 1.4 * Math.sin(time * TAU * 0.19) } : {}),
}

/** Grain: plants bearing seed, nodding in the breeze. */
const seedPlant: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 70 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'stalks',
      pivot: { x: 30, y: 70 },
      svg: `
        <path d="M30 70C27 52 22 38 14 26M30 70C30 50 30 34 30 18M30 70C33 52 38 38 46 26M30 70C24 58 16 50 6 44M30 70C36 58 44 50 54 44" stroke="#78b84e" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <path d="M30 68C22 62 18 56 16 48C24 52 28 58 30 68ZM30 68C38 62 42 56 44 48C36 52 32 58 30 68Z" fill="#5ea84a"/>
        ${[
          [14, 24, -26],
          [30, 15, 0],
          [46, 24, 26],
          [6, 42, -48],
          [54, 42, 48],
        ]
          .map(
            ([x, y, a]) =>
              `<g transform="translate(${x} ${y}) rotate(${a})"><ellipse rx="3.6" ry="9" fill="#e9c46a"/><path d="M-3 -4L3 -4M-3.4 0L3.4 0M-3 4L3 4" stroke="#c99a3e" stroke-width=".9"/></g>`,
          )
          .join('')}`,
    },
  ],
  animate: (_part, _pose, time) => ({ rotate: 2.6 * Math.sin(time * TAU * 0.27) }),
}

/** A golden fish, with a tail that flicks as it swims. It faces left. */
const fish: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 20 },
  facing: -1,
  poses: ['idle'],
  parts: [
    {
      id: 'body',
      svg: `
        <path d="M4 10C8 3 22 2 30 8L30 12C22 18 8 17 4 10Z" fill="#ffb24a"/>
        <path d="M5 11C12 16 22 16 30 12L30 11C22 13 12 13 5 11Z" fill="#ffe0a0"/>
        <path d="M16 4C17 8 17 12 16 16" stroke="#f07a3a" stroke-width="1.6" fill="none"/>
        <path d="M18 3C21 1 25 2 27 6Z" fill="#f08a3a"/>
        <circle cx="9" cy="9" r="1.3" fill="#2b1b3a"/>`,
    },
    { id: 'tail', pivot: { x: 30, y: 10 }, svg: `<path d="M29 10L39 3L37 10L39 17Z" fill="#ff9a3a"/>` },
  ],
  animate: (part, _pose, time) => (part === 'tail' ? { rotate: 22 * Math.sin(time * TAU * 2.6) } : {}),
}

/** The great sea creature: a whale surfacing, its tail rising and falling, sometimes spouting. */
const whale: PaperPropArt = {
  box: { x: 0, y: 0, w: 200, h: 80 },
  facing: -1,
  poses: ['idle'],
  parts: [
    {
      id: 'spout',
      pivot: { x: 26, y: 22 },
      svg: `<path d="M26 22C20 12 14 6 6 4M26 22C26 10 27 4 31 1M26 22C32 12 40 8 46 6" stroke="#e4f8ff" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
    },
    {
      id: 'tail',
      pivot: { x: 178, y: 44 },
      svg: `<path d="M176 44C185 36 189 22 198 13C196 26 196 36 186 46C196 54 198 64 198 75C190 64 185 54 176 48Z" fill="#2e4f78"/>`,
    },
    {
      id: 'body',
      svg: `
        <path d="M8 46C10 24 60 14 110 20C150 24 172 34 182 40L182 48C160 58 120 66 70 64C34 62 10 58 8 46Z" fill="#35577f"/>
        <path d="M14 52C40 62 100 66 150 54C110 60 50 60 14 52Z" fill="#9cbfd8"/>
        <path d="M30 56C50 60 80 61 110 58" stroke="#7f9fbd" stroke-width="1.4" fill="none"/>
        <path d="M70 56C76 66 88 72 98 70C90 64 84 60 80 56Z" fill="#2b4a6f"/>
        <path d="M30 30C60 20 100 18 130 24" stroke="#5a7ea8" stroke-width="2" fill="none" opacity=".7"/>
        <circle cx="36" cy="41" r="2.4" fill="#0d1a2c"/>`,
    },
  ],
  animate: (part, _pose, time) => {
    if (part === 'tail') return { rotate: 9 * Math.sin(time * TAU * 0.33) }
    if (part === 'spout') return { opacity: Math.max(0, Math.sin(time * TAU * (1 / 7))) ** 6 }
    return {}
  },
}

/** A small bird of the air, wings beating. It faces right. */
const bird: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 26 },
  facing: 1,
  poses: ['idle'],
  parts: [
    {
      id: 'body',
      svg: `
        <path d="M6 15C12 12 24 11 32 13L39 12L34 15C28 18 14 19 6 15Z" fill="#2a2d4a"/>
        <path d="M7 15L0 11L2 16L0 20Z" fill="#2a2d4a"/>
        <path d="M33 13L40 12.4L35 14.2Z" fill="#ffb35c"/>`,
    },
    {
      id: 'wing',
      pivot: { x: 20, y: 14 },
      svg: `<path d="M21 14C18 7 12 2 3 1C10 6 13 10 15 15Z" fill="#3b3f63"/>`,
    },
  ],
  animate: (part, _pose, time) => (part === 'wing' ? { rotate: 34 * Math.sin(time * TAU * 3.1) } : {}),
}

export const creationProps: Record<string, PaperPropArt> = {
  spirit,
  'light-flood': lightFlood,
  'first-light': firstLight,
  halo,
  sun,
  moon,
  'fruit-tree': fruitTree,
  'seed-plant': seedPlant,
  fish,
  whale,
  bird,
}
