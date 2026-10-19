import type { PaperPropArt } from '../art'

/**
 * Props of Level 3: a stone well (where the herdsmen quarrel in Episode 2, and where
 * Hagar's eyes are opened in Episode 5), and a goat of Lot's flock.
 */

/** A round well of stones, its water glinting, a rope and bucket on its rim. */
const stoneWell: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 100 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'well',
      svg: `<ellipse cx="80" cy="44" rx="70" ry="20" fill="#8a8070"/>
        <ellipse cx="80" cy="44" rx="56" ry="13" fill="#3a6a9a"/>
        <path d="M44 42Q80 34 116 42" stroke="#8ac0e8" stroke-width="3" fill="none"/>
        <path d="M10 44L10 92Q80 110 150 92L150 44Q80 66 10 44Z" fill="#a89a86"/>
        ${[56, 72, 88].map((y) => `<path d="M10 ${y}Q80 ${y + 20} 150 ${y}" stroke="#8a7c6a" stroke-width="3" fill="none"/>`).join('')}
        ${[30, 60, 95, 125].map((x, i) => `<path d="M${x} ${50 + i * 3}L${x} ${96 + (i % 2) * 4}" stroke="#8a7c6a" stroke-width="2.4"/>`).join('')}
        <path d="M128 30L136 30L134 44L130 44Z" fill="#7a5230"/><path d="M132 30Q140 10 132 0" stroke="#c8a476" stroke-width="2" fill="none"/>`,
    },
  ],
}

/** A dark goat with curved horns and a beard, facing right; walking, its legs step. */
const goat: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 80 },
  facing: 1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    ...[22, 34, 66, 78].map((x, i) => ({
      id: `leg-${i}`,
      pivot: { x: x + 3, y: 50 },
      svg: `<path d="M${x} 48L${x + 7} 48L${x + 6} 78L${x + 1} 78Z" fill="${i % 2 ? '#3a2e28' : '#2a201c'}"/>`,
    })),
    {
      id: 'body',
      svg: `<path d="M14 36Q18 22 40 22L70 22Q86 22 88 34Q88 50 74 52L30 52Q14 50 14 36Z" fill="#4a3a30"/>
        <path d="M80 26L86 10L98 12L100 22L94 30Z" fill="#4a3a30"/>
        <path d="M86 12Q80 0 70 4Q78 6 82 14" stroke="#c8b08a" stroke-width="3" fill="none"/>
        <path d="M96 24L98 34L94 32Z" fill="#2a201c"/><circle cx="92" cy="16" r="1.4" fill="#e8d8a0"/>
        <path d="M14 30L6 22" stroke="#4a3a30" stroke-width="4" stroke-linecap="round"/>
        <path d="M30 24Q50 20 72 24" stroke="#6a5444" stroke-width="2" fill="none"/>`,
    },
  ],
  animate: (part, pose, time) => {
    if (!part.startsWith('leg-') || pose !== 'walk') return {}
    const i = Number(part.slice(4))
    return { rotate: (i % 2 ? 1 : -1) * 16 * Math.sin(time * Math.PI * 2 * 1.6 + (i > 1 ? Math.PI : 0)) }
  },
}

export const lotChoosesProps: Record<string, PaperPropArt> = { 'stone-well': stoneWell, goat }
