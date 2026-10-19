import type { PaperPropArt } from '../art'

/**
 * Props of Level 3: an angel, a figure of light (the angel who finds Hagar, the visitors
 * at Mamre, the angels at Sodom, and the angel on Moriah); and a thorny desert bush.
 */

/** An angel: a tall figure of light with folded wings of light, glowing softly. */
const angel: PaperPropArt = {
  box: { x: 0, y: 0, w: 80, h: 160 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    {
      id: 'glow',
      svg: `<defs><radialGradient id="angel-glow" cx="40" cy="80" r="80" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff8e0" stop-opacity=".7"/><stop offset="1" stop-color="#fff8e0" stop-opacity="0"/></radialGradient></defs><ellipse cx="40" cy="80" rx="60" ry="84" fill="url(#angel-glow)"/>`,
    },
    {
      id: 'figure',
      svg: `<path d="M22 60Q6 80 10 130L28 112Z" fill="#fff4d0" opacity=".7"/><path d="M58 60Q74 80 70 130L52 112Z" fill="#fff4d0" opacity=".7"/>
        <circle cx="40" cy="38" r="11" fill="#fffbf0"/><path d="M26 54Q40 46 54 54L60 158L20 158Z" fill="#fffbf0"/>
        <path d="M32 70L31 154M48 70L49 154" stroke="#f0e2b8" stroke-width="2" opacity=".7"/>`,
    },
  ],
  animate: (part, _pose, time) => (part === 'glow' ? { opacity: 0.8 + 0.2 * Math.sin(time * Math.PI * 2 * 0.5) } : { y: 1.5 * Math.sin(time * Math.PI * 2 * 0.3) }),
}

/** A thorny desert bush, gray-green, giving a little shade. */
const desertBush: PaperPropArt = {
  box: { x: 0, y: 0, w: 140, h: 80 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'bush',
      svg: `${[
        [30, 54, 26],
        [64, 40, 32],
        [100, 50, 28],
        [70, 64, 24],
      ]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#8a9a6a"/>`)
        .join('')}${Array.from({ length: 12 }, (_, i) => `<path d="M${20 + i * 9} ${30 + (i % 3) * 12}l${i % 2 ? 6 : -6} -8" stroke="#6a7a4a" stroke-width="2"/>`).join('')}
        <path d="M60 80L66 60M78 80L74 62" stroke="#6a5038" stroke-width="4"/>`,
    },
  ],
}

export const hagarProps: Record<string, PaperPropArt> = { angel, 'desert-bush': desertBush }
