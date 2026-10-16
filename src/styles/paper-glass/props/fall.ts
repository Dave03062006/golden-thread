import type { PaperPropArt } from '../art'

/**
 * Props of the Fall (Episode 3): the serpent on the branch, the one fruit, and the
 * thicket the man and the woman hide in. The serpent is drawn plainly, a beautiful and
 * subtle creature (Genesis 3:1), not a monster: the story's darkness is in what it says.
 */

const TAU = Math.PI * 2

/**
 * The serpent, lying along a branch and raising its head toward whoever stands to its
 * right. Its neck sways slowly; its tongue flicks now and then. On the ground (the
 * 'ground' pose) there's no branch.
 */
const serpent: PaperPropArt = {
  box: { x: -20, y: 0, w: 110, h: 60 },
  facing: 1,
  poses: ['idle', 'ground'],
  parts: [
    {
      id: 'branch',
      svg: `
        <path d="M-20 42C0 40 30 42 50 44C56 44.5 62 44 66 42L67 45C62 47.5 56 48 50 48C30 47 0 46 -20 47Z" fill="#4a3020"/>
        <path d="M14 43C18 36 22 33 28 31" stroke="#4a3020" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <path d="M27 31C31 27 36 28 37 31C33 33 30 33 27 31Z" fill="#2a6638"/>`,
    },
    {
      id: 'body',
      svg: `
        <path d="M2 34C6 26 16 24 24 28C32 32 40 34 48 30C54 27 58 28 60 32C62 38 56 46 46 46C36 46 30 40 22 40C14 40 8 44 4 42C0 40 0 37 2 34Z" fill="#5f7a3a"/>
        <path d="M6 33C12 29 18 29 24 31C32 35 40 37 48 33C52 31 55 31 57 33" fill="none" stroke="#c9a94a" stroke-width="1.6" stroke-dasharray="3 3"/>
        <path d="M8 41C14 39 20 38 26 40C34 43 40 44 48 43" fill="none" stroke="#8aa25a" stroke-width="1.4" opacity=".8"/>`,
    },
    {
      id: 'neck',
      pivot: { x: 56, y: 36 },
      svg: `
        <path d="M54 34C56 26 60 18 66 13C70 10 76 9 80 11C84 13 85 17 82 19C78 21 74 19 71 20C66 22 63 28 61 36Z" fill="#6b8742"/>
        <path d="M57 32C59 25 62 20 66 16" fill="none" stroke="#c9a94a" stroke-width="1.4" stroke-dasharray="2.6 2.6"/>
        <circle cx="78" cy="13.2" r="1.3" fill="#1d1a10"/>
        <circle cx="78.3" cy="12.8" r=".4" fill="#f4e8b0"/>`,
    },
    {
      id: 'tongue',
      pivot: { x: 83, y: 17 },
      svg: `<path d="M83 17L88 18L90 16.6M88 18L90 19.6" fill="none" stroke="#b03a48" stroke-width=".9" stroke-linecap="round"/>`,
    },
  ],
  animate: (part, pose, time) => {
    if (part === 'branch') return { opacity: pose === 'ground' ? 0 : 1 }
    const sway = Math.sin(time * TAU * 0.22)
    if (part === 'neck') return { rotate: 5 * sway, y: 0.6 * Math.sin(time * TAU * 0.13) }
    if (part === 'tongue') {
      // A quick double flick, every few seconds.
      const t = time % 3.4
      const out = t < 0.18 || (t > 0.3 && t < 0.46)
      return { rotate: 5 * sway, y: 0.6 * Math.sin(time * TAU * 0.13), opacity: out ? 1 : 0 }
    }
    return {}
  },
}

/** The fruit of the tree in the midst of the garden: one fruit, glowing. */
const fruit: PaperPropArt = {
  box: { x: -30, y: -30, w: 60, h: 60 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs>
          <radialGradient id="g" cx="0" cy="0" r="30" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ffd9a0" stop-opacity=".9"/>
            <stop offset=".5" stop-color="#ff9a7a" stop-opacity=".35"/>
            <stop offset="1" stop-color="#ff7a6a" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle r="30" fill="url(#g)"/>`,
    },
    {
      id: 'fruit',
      svg: `
        <path d="M0 -7C1 -10 2 -12 4 -13" stroke="#5a3a20" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        <path d="M2 -11C6 -14 10 -13 11 -10C7 -9 4 -9 2 -11Z" fill="#4a7c34"/>
        <circle cy="0" r="8" fill="#b8203e"/>
        <circle cx="-3" cy="-3" r="2.4" fill="#ff98aa"/>`,
    },
  ],
  animate: (part, _pose, time) => (part === 'glow' ? { opacity: 0.7 + 0.3 * Math.sin(time * TAU * 0.5) } : {}),
}

/** A thicket of bushes and ferns among the trees, thick enough to hide in. */
const thicket: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 80 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'back',
      svg: `
        <circle cx="40" cy="44" r="30" fill="#2f6a3a"/>
        <circle cx="86" cy="34" r="34" fill="#2a6034"/>
        <circle cx="128" cy="46" r="28" fill="#2f6a3a"/>`,
    },
    {
      id: 'front',
      pivot: { x: 80, y: 80 },
      svg: `
        <path d="M6 80C4 62 18 52 32 56C38 44 56 42 66 50C74 40 96 40 104 52C116 46 136 50 140 62C152 62 158 72 156 80Z" fill="#3e8442"/>
        <circle cx="30" cy="62" r="10" fill="#4f9a4c"/>
        <circle cx="70" cy="56" r="12" fill="#4f9a4c"/>
        <circle cx="112" cy="58" r="11" fill="#4f9a4c"/>
        <circle cx="26" cy="58" r="4" fill="#7cc463" opacity=".8"/>
        <circle cx="66" cy="51" r="5" fill="#7cc463" opacity=".8"/>
        <circle cx="108" cy="53" r="4.5" fill="#7cc463" opacity=".8"/>`,
    },
  ],
  animate: (part, _pose, time) => (part === 'front' ? { rotate: 0.8 * Math.sin(time * TAU * 0.15) } : {}),
}

export const fallProps: Record<string, PaperPropArt> = { serpent, fruit, thicket }
