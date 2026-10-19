import type { PaperPropArt } from '../art'

/**
 * Props of Level 3, Episode 3: the enemy's campfires and the bands of torches that close
 * in on them by night; a cart of goods; and Melchizedek's bread and wine.
 */

/** A campfire of logs, its flames flickering. */
const campfire: PaperPropArt = {
  box: { x: 0, y: 0, w: 80, h: 70 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'logs', svg: `<path d="M10 66L70 54M10 54L70 66" stroke="#4a3020" stroke-width="8" stroke-linecap="round"/>` },
    {
      id: 'flame',
      pivot: { x: 40, y: 60 },
      svg: `<circle cx="40" cy="40" r="34" fill="#ffb060" opacity=".25"/><path d="M24 60Q20 40 32 30Q34 42 40 36Q42 18 50 10Q52 30 58 34Q62 48 56 60Z" fill="#f08a3a"/><path d="M32 60Q30 48 38 42Q42 50 46 46Q50 54 48 60Z" fill="#ffd27a"/>`,
    },
  ],
  animate: (part, _pose, time) => (part === 'flame' ? { rotate: 4 * Math.sin(time * Math.PI * 2 * 1.4), opacity: 0.85 + 0.15 * Math.sin(time * Math.PI * 2 * 2.3) } : {}),
}

/** A band of men in the dark, seen only by their torches held high. */
const torches: PaperPropArt = {
  box: { x: 0, y: 0, w: 140, h: 120 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    {
      id: 'men',
      svg: [16, 44, 72, 100, 126]
        .map((x, i) => `<circle cx="${x}" cy="${70 + (i % 2) * 4}" r="7" fill="#1a1620"/><path d="M${x - 9} 120L${x - 7} ${80 + (i % 2) * 4}L${x + 7} ${80 + (i % 2) * 4}L${x + 9} 120Z" fill="#1a1620"/><path d="M${x + 6} ${82 + (i % 2) * 4}L${x + 12} ${40 + (i % 2) * 4}" stroke="#4a3020" stroke-width="3"/>`)
        .join(''),
    },
    ...[0, 1, 2, 3, 4].map((i) => ({
      id: `torch-${i}`,
      pivot: { x: [16, 44, 72, 100, 126][i]! + 12, y: 40 + (i % 2) * 4 },
      svg: `<circle cx="${[16, 44, 72, 100, 126][i]! + 12}" cy="${32 + (i % 2) * 4}" r="16" fill="#ffb060" opacity=".3"/><path d="M${[16, 44, 72, 100, 126][i]! + 7} ${40 + (i % 2) * 4}Q${[16, 44, 72, 100, 126][i]! + 10} ${24 + (i % 2) * 4} ${[16, 44, 72, 100, 126][i]! + 13} ${18 + (i % 2) * 4}Q${[16, 44, 72, 100, 126][i]! + 17} ${28 + (i % 2) * 4} ${[16, 44, 72, 100, 126][i]! + 17} ${40 + (i % 2) * 4}Z" fill="#ffc060"/>`,
    })),
  ],
  animate: (part, _pose, time) => (part.startsWith('torch-') ? { rotate: 5 * Math.sin(time * Math.PI * 2 * 1.7 + Number(part.slice(6))), opacity: 0.8 + 0.2 * Math.sin(time * 9 + Number(part.slice(6)) * 2) } : {}),
}

/** A two-wheeled cart piled with goods and treasure. */
const cart: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 110 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'cart',
      svg: `<path d="M20 70L140 70L134 84L26 84Z" fill="#7a5230"/>
        <path d="M30 70Q40 30 70 36Q90 20 110 40Q134 40 130 70Z" fill="#b08a50"/>
        <path d="M50 54L66 46L80 56L64 62Z" fill="#e8c060"/><circle cx="100" cy="52" r="8" fill="#e8c060"/><path d="M84 40L96 34L104 44Z" fill="#c8a040"/>
        <circle cx="50" cy="90" r="18" fill="none" stroke="#5a3a20" stroke-width="6"/><path d="M50 72L50 108M32 90L68 90" stroke="#5a3a20" stroke-width="3"/>
        <circle cx="112" cy="90" r="18" fill="none" stroke="#5a3a20" stroke-width="6"/><path d="M112 72L112 108M94 90L130 90" stroke="#5a3a20" stroke-width="3"/>
        <path d="M140 76L160 70" stroke="#5a3a20" stroke-width="5"/>`,
    },
  ],
}

/** Melchizedek's gift: a round loaf in a basket, and a jar of wine. */
const breadAndWine: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 70 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'gift',
      svg: `<path d="M4 44L56 44L50 70L10 70Z" fill="#a8743a"/><path d="M6 52L54 52M8 60L52 60" stroke="#7a5228" stroke-width="2"/>
        <ellipse cx="30" cy="40" rx="24" ry="12" fill="#d8a050"/><path d="M14 38Q30 30 46 38" stroke="#f0c070" stroke-width="3" fill="none"/>
        <path d="M70 70Q62 60 66 44Q66 34 74 30L74 22L86 22L86 30Q94 34 94 44Q98 60 90 70Z" fill="#8a3a4a"/>
        <path d="M72 22L88 22" stroke="#e8c060" stroke-width="4"/><path d="M70 46Q80 40 92 46" stroke="#c8687a" stroke-width="2" fill="none"/>`,
    },
  ],
}

export const melchizedekProps: Record<string, PaperPropArt> = { campfire, torches, cart, 'bread-and-wine': breadAndWine }
