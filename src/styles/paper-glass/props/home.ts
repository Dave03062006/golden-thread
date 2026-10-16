import type { PaperPropArt } from '../art'

/**
 * Props of Cain and Abel (Episode 5): the family's tent, the two stone altars and their
 * smoke, sin crouching at the door (Genesis 4:7) as a shadow with no face, the shepherd's
 * staff the player steers, and the faint glow of the ground where Abel fell.
 */

const TAU = Math.PI * 2

/** The family's tent of skins on the hillside, its doorway open. */
const tent: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 100 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'tent',
      svg: `
        <path d="M6 100L44 22L80 8L118 24L154 100Z" fill="#8a6440"/>
        <path d="M80 8L118 24L154 100L110 100Z" fill="#6e4e32"/>
        <path d="M58 100L74 46L92 46L102 100Z" fill="#2a1c18"/>
        <path d="M80 8L80 0M44 22L36 14M118 24L126 16" stroke="#5a3a22" stroke-width="3" stroke-linecap="round"/>
        <path d="M20 70L140 70M30 50L130 50" stroke="#5e4028" stroke-width="1.2" stroke-dasharray="3 3" opacity=".7"/>`,
    },
  ],
}

/** An altar of piled stones. */
const altar: PaperPropArt = {
  box: { x: 0, y: 0, w: 80, h: 50 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'stones',
      svg: `
        <path d="M6 50L10 30L70 30L74 50Z" fill="#8a8274"/>
        <path d="M14 30L18 16L62 16L66 30Z" fill="#a09888"/>
        <path d="M6 50L10 30L20 30L16 50ZM40 30L44 16L52 16L48 30Z" fill="#6e665a" opacity=".6"/>
        <path d="M24 16C30 10 50 10 56 16" stroke="#c8b898" stroke-width="2" fill="none"/>`,
    },
  ],
}

/**
 * Smoke from an offering. 'rising': a column going straight up into the light. 'low':
 * a thin smoke that hangs and wavers along the ground.
 */
const smoke: PaperPropArt = {
  box: { x: -60, y: -240, w: 120, h: 250 },
  facing: 1,
  poses: ['rising', 'low'],
  anchor: 'base',
  shadow: false,
  resolution: 0.5,
  parts: [
    {
      id: 'column',
      pivot: { x: 0, y: 0 },
      svg: `
        <defs>
          <linearGradient id="c" x1="0" y1="0" x2="0" y2="-240" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#f4f0e8" stop-opacity=".9"/>
            <stop offset="1" stop-color="#fff8e0" stop-opacity="0"/>
          </linearGradient>
          <filter id="s" x="-50%" y="-10%" width="200%" height="120%"><feGaussianBlur stdDeviation="4"/></filter>
        </defs>
        <path d="M-8 0C-14 -60 6 -120 -6 -180C-10 -210 0 -230 4 -240L16 -240C12 -220 6 -200 10 -180C22 -120 2 -60 8 0Z" fill="url(#c)" filter="url(#s)"/>`,
    },
    {
      id: 'drift',
      pivot: { x: 0, y: 0 },
      svg: `
        <defs>
          <linearGradient id="d" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#8a8a90" stop-opacity=".7"/>
            <stop offset="1" stop-color="#8a8a90" stop-opacity="0"/>
          </linearGradient>
          <filter id="t" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
        </defs>
        <path d="M-6 0C-2 -14 14 -24 30 -22C44 -20 52 -30 60 -34L60 -24C50 -18 42 -10 28 -12C14 -14 4 -6 6 0Z" fill="url(#d)" filter="url(#t)"/>`,
    },
  ],
  animate: (part, pose, time) => {
    if (part === 'column') return pose === 'rising' ? { rotate: 1.5 * Math.sin(time * TAU * 0.2) } : { opacity: 0 }
    return pose === 'low' ? { rotate: 6 * Math.sin(time * TAU * 0.35), y: 2 * Math.sin(time * TAU * 0.5) } : { opacity: 0 }
  },
}

/** Sin couching at the door (Genesis 4:7): a dark shape crouched like an animal, waiting. No face is drawn. */
const sin: PaperPropArt = {
  box: { x: 0, y: 0, w: 80, h: 44 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    {
      id: 'shape',
      pivot: { x: 40, y: 44 },
      svg: `
        <defs><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5"/></filter></defs>
        <path d="M4 44C6 30 16 20 30 18C38 10 50 6 60 10C70 14 76 24 74 34L78 44Z" fill="#0e0a14" filter="url(#b)" opacity=".92"/>
        <path d="M60 10C64 4 68 4 70 8M66 12C70 8 74 9 75 13" stroke="#0e0a14" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#b)"/>`,
    },
  ],
  // It breathes, slowly, ready to spring.
  animate: (_part, _pose, time) => ({ y: 1.2 * Math.sin(time * TAU * 0.3), rotate: 1.2 * Math.sin(time * TAU * 0.3) }),
}

/** The shepherd's staff the player steers the flock with. Its place is its foot, on the ground. */
const staff: PaperPropArt = {
  box: { x: -20, y: -90, w: 40, h: 100 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'staff',
      svg: `
        <path d="M0 8L0 -72" stroke="#7a5a32" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M0 -72C0 -84 -14 -86 -14 -76C-14 -70 -10 -68 -7 -70" stroke="#7a5a32" stroke-width="3.4" fill="none" stroke-linecap="round"/>
        <path d="M-1.2 -60L-1.2 0" stroke="#c8a060" stroke-width="1" opacity=".7"/>`,
    },
  ],
}

/** The ground where Abel fell, glowing faintly: the voice of his blood (Genesis 4:10). */
const groundGlow: PaperPropArt = {
  box: { x: -100, y: -40, w: 200, h: 80 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.4,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs>
          <radialGradient id="g" cx="0" cy="0" r="100" gradientTransform="scale(1 .4)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ffd8b0" stop-opacity=".85"/>
            <stop offset=".5" stop-color="#e09080" stop-opacity=".35"/>
            <stop offset="1" stop-color="#c06070" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <ellipse rx="100" ry="40" fill="url(#g)"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ opacity: 0.7 + 0.3 * Math.sin(time * TAU * 0.25) }),
}

export const homeProps: Record<string, PaperPropArt> = { tent, altar, smoke, sin, staff, 'ground-glow': groundGlow }
