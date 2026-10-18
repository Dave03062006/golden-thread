import type { PaperPropArt } from '../art'

/**
 * The dove: a paper puppet whose near wing turns at the shoulder. It faces left. She holds an
 * olive sprig in her beak (idle, and leaf: the leaf she brings back to Noah), or flies free (fly).
 */
export const dove: PaperPropArt = {
  box: { x: -12, y: -4, w: 74, h: 40 },
  facing: -1,
  poses: ['idle', 'fly', 'leaf'],
  parts: [
    {
      id: 'body',
      svg: `
          <path d="M24 18C24 10 20 5 13 1L16 8L11 7L16 12C19 15 21 17 24 18Z" fill="#ded3ee"/>
          <path d="M42 20L58 14L56 21L59 27L42 26Z" fill="#efe9f7"/>
          <path d="M9 20C10 15 17 14 19 18C26 18 36 18 44 20L44 26C36 30 22 31 15 27C12 26 10 24 9 23Z" fill="#fffaf2"/>
          <path d="M3.5 21.8L9 20L9 23Z" fill="#ffb35c"/>
          <circle cx="11.6" cy="19.6" r="1" fill="#2b1b3a"/>`,
    },
    {
      id: 'sprig',
      svg: `
          <path d="M4.5 22.5Q1 26 -4 29" stroke="#3d7a3a" stroke-width="1" fill="none"/>
          <path d="M3 24Q-1.15 25.62 -1.41 30.06Q2.73 28.44 3 24Z" fill="#5cb86a"/>
          <path d="M0 26.5Q-2.15 30.16 0.5 33.48Q2.64 29.82 0 26.5Z" fill="#79cf7d"/>
          <path d="M-3 28.5Q-7.1 27.41 -9.6 30.85Q-5.49 31.93 -3 28.5Z" fill="#46a05a"/>
`,
    },
    {
      id: 'wing',
      pivot: { x: 22, y: 19 },
      svg: `
          <path d="M20 19C22 10 28 4 38 0L36 6L42 4L39 10L45 9L40 15L44 16C38 20 30 21 20 19Z" fill="#fffdf8"/>
          <path d="M27 17.6C31 14 35 11 40.5 7.4M30.5 18.6C34 16 37.5 14 42.5 11.8" stroke="#cdbfe0" stroke-width=".55" fill="none"/>`,
    },
  ],
  // The near wing beats.
  animate: (part, pose, time) => (part === 'wing' ? { rotate: 8 + 20 * Math.sin(time * Math.PI * 2 * 2.2) } : part === 'sprig' ? { opacity: pose === 'fly' ? 0 : 1 } : {}),
}
