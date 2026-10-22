import type { PaperPropArt } from '../art'

/**
 * Props of Level 6 · Job: the accuser in the court of heaven, a dark shadow with no face;
 * an ox, for Job's herds and the friends' offering; a mark scratched in the dust for each
 * of the seven days; and a line of Job's words carved in the rock in letters of light.
 */

/** The accuser: a tall, hooded shadow, drifting a little, facing left. */
const accuser: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 120 },
  facing: -1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    {
      id: 'shadow',
      svg: `<path d="M30 6Q14 8 12 30Q10 52 8 80Q4 104 2 120L58 120Q56 100 52 80Q50 52 48 30Q46 8 30 6Z" fill="#2a2434" opacity=".9"/>
        <path d="M30 14Q20 16 19 32Q22 44 30 46Q38 44 41 32Q40 16 30 14Z" fill="#14101c"/>
        <path d="M2 120Q10 110 16 116Q24 106 30 114Q38 106 44 116Q52 110 58 120Z" fill="#3a3444" opacity=".7"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ x: 1.5 * Math.sin(time * 1.2), y: 1 * Math.sin(time * 0.8) }),
}

/** An ox, broad and gray-brown, with curved horns, facing right. */
const ox: PaperPropArt = {
  box: { x: 0, y: 0, w: 130, h: 86 },
  facing: 1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    ...[26, 40, 84, 98].map((x, i) => ({ id: `leg-${i}`, pivot: { x: x + 4, y: 52 }, svg: `<path d="M${x} 50L${x + 9} 50L${x + 8} 84L${x + 1} 84Z" fill="${i % 2 ? '#6a5a4a' : '#5a4a3a'}"/><path d="M${x} 80L${x + 9} 80L${x + 9} 85L${x} 85Z" fill="#2a2018"/>` })),
    {
      id: 'body',
      svg: `<path d="M16 38Q18 18 46 16L64 12Q80 10 92 16Q110 18 112 36Q112 56 94 56L34 56Q16 56 16 38Z" fill="#8a7a66"/>
        <path d="M60 14Q76 8 90 16Q80 22 62 20Z" fill="#9a8a76"/>
        <path d="M30 54Q60 60 96 54" stroke="#6a5a4a" stroke-width="3" fill="none"/>
        <path d="M104 24L118 22L128 30L126 46L112 48L104 38Z" fill="#7a6a56"/>
        <path d="M110 24Q104 12 112 8M118 22Q126 12 122 6" stroke="#e8dcc0" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="118" cy="31" r="1.8" fill="#1a1210"/><path d="M120 44L128 42" stroke="#4a3a2a" stroke-width="3"/>
        <path d="M16 32Q6 36 8 52" stroke="#6a5a4a" stroke-width="3" fill="none"/><path d="M5 50L11 50L9 58Z" fill="#4a3a2a"/>`,
    },
  ],
  animate: (part, pose, time) => {
    if (!part.startsWith('leg-') || pose !== 'walk') return {}
    const i = Number(part.slice(4))
    return { rotate: (i % 2 ? 1 : -1) * 12 * Math.sin(time * Math.PI * 2 * 1.2 + (i > 1 ? Math.PI : 0)) }
  },
}

/** A short mark scratched in the dust. */
const dustMark: PaperPropArt = {
  box: { x: 0, y: 0, w: 20, h: 24 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [{ id: 'mark', svg: `<path d="M8 2L12 2L14 22L6 22Z" fill="#4a3e32"/><path d="M12 2L14 22" stroke="#c8bca4" stroke-width="2"/>` }],
}

/** A line of words carved in the rock, glowing gold: marks like letters, not to be read. */
const LETTERS = [8, 22, 34, 50, 62, 74, 92, 104, 118, 130, 146, 158, 170, 186]
const carvedLine: PaperPropArt = {
  box: { x: 0, y: 0, w: 200, h: 30 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  shadow: false,
  parts: [
    {
      id: 'words',
      svg: `<rect x="0" y="4" width="200" height="22" rx="11" fill="#ffe8a0" opacity=".3"/>
        ${LETTERS.map((x, i) => `<path d="${['M0 0L0 14', 'M0 0L6 14M6 0L0 14', 'M0 0L6 0L6 14', 'M0 7L8 7M4 0L4 14', 'M0 14L4 0L8 14'][i % 5]}" transform="translate(${x} 8)" stroke="#fff4c0" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}`,
    },
  ],
}

export const uzProps: Record<string, PaperPropArt> = { accuser, ox, 'dust-mark': dustMark, 'carved-line': carvedLine }
