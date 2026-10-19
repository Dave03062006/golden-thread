import type { PaperPropArt } from '../art'

/**
 * Props of Level 3, Episode 10: the donkey Abraham saddles, the bundle of wood Isaac
 * carries up the mountain, the ram caught in a thicket by its horns, and the cave of
 * Machpelah where Abraham buries Sarah.
 */

/** A small gray donkey, saddled, facing right; walking, its legs step. */
const donkey: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 100 },
  facing: 1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    ...[26, 38, 78, 90].map((x, i) => ({ id: `leg-${i}`, pivot: { x: x + 3, y: 58 }, svg: `<path d="M${x} 56L${x + 7} 56L${x + 6} 98L${x + 1} 98Z" fill="${i % 2 ? '#7a7478' : '#686266'}"/>` })),
    {
      id: 'body',
      svg: `<path d="M18 46Q20 30 44 30L86 30Q100 30 100 44Q100 60 86 60L32 60Q18 60 18 46Z" fill="#8a8488"/>
        <path d="M94 34L104 14L118 18L116 32L104 40Z" fill="#8a8488"/><path d="M104 14L102 0L108 12ZM110 16L112 2L114 16Z" fill="#6a6468"/>
        <circle cx="111" cy="22" r="1.6" fill="#1a1416"/><path d="M48 30L76 30L80 46L44 46Z" fill="#8a3a3a"/><path d="M48 34L78 34" stroke="#e0b850" stroke-width="2"/>
        <path d="M18 40Q8 44 10 56" stroke="#6a6468" stroke-width="3" fill="none"/>`,
    },
  ],
  animate: (part, pose, time) => {
    if (!part.startsWith('leg-') || pose !== 'walk') return {}
    const i = Number(part.slice(4))
    return { rotate: (i % 2 ? 1 : -1) * 14 * Math.sin(time * Math.PI * 2 * 1.4 + (i > 1 ? Math.PI : 0)) }
  },
}

/** A bundle of split wood, tied with cord. */
const woodBundle: PaperPropArt = {
  box: { x: 0, y: 0, w: 90, h: 36 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  parts: [
    {
      id: 'wood',
      svg: `${[6, 14, 22].map((y, i) => `<rect x="${4 + i * 3}" y="${y}" width="82" height="9" rx="4" fill="${i % 2 ? '#8a6038' : '#a8784a'}"/>`).join('')}
        <path d="M24 4L24 34M64 4L64 34" stroke="#d8c094" stroke-width="3"/>`,
    },
  ],
}

/** The ram, caught in a thicket by its horns. */
const ramInThicket: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 100 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    { id: 'thicket', svg: `${[[20, 70, 28], [60, 56, 34], [110, 62, 32], [140, 76, 24]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#4a6a3a"/>`).join('')}${Array.from({ length: 10 }, (_, i) => `<path d="M${14 + i * 14} ${40 + (i % 3) * 10}l${i % 2 ? 8 : -8} -10" stroke="#3a5230" stroke-width="3"/>`).join('')}` },
    {
      id: 'ram',
      svg: `<path d="M40 70Q42 54 62 54L96 54Q110 54 110 68Q110 84 96 84L54 84Q40 84 40 70Z" fill="#efe6d4"/>
        <circle cx="114" cy="56" r="13" fill="#efe6d4"/><circle cx="118" cy="54" r="1.8" fill="#2a1e1a"/>
        <path d="M108 46Q96 34 102 26Q110 22 112 32" stroke="#a88a5a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M120 46Q132 34 126 26Q118 22 116 32" stroke="#a88a5a" stroke-width="7" fill="none" stroke-linecap="round"/>
        ${[50, 64, 84, 98].map((x) => `<path d="M${x} 84L${x} 98" stroke="#d8cdb8" stroke-width="5"/>`).join('')}`,
    },
  ],
  animate: (part, _pose, time) => (part === 'ram' ? { x: 1.5 * Math.sin(time * Math.PI * 2 * 0.7) } : {}),
}

/** The cave of Machpelah: a dark opening in a rocky hillside, among trees. */
const caveTomb: PaperPropArt = {
  box: { x: 0, y: 0, w: 260, h: 150 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'cave',
      svg: `<path d="M0 150L20 60Q90 0 180 20Q240 40 260 150Z" fill="#9a8a72"/><path d="M20 60Q90 0 180 20" stroke="#c0ae90" stroke-width="5" fill="none"/>
        <path d="M100 150L100 100Q130 70 160 100L160 150Z" fill="#2a2220"/>
        <circle cx="200" cy="96" r="22" fill="#5a7a40"/><circle cx="40" cy="104" r="18" fill="#5a7a40"/>`,
    },
  ],
}

export const moriahProps: Record<string, PaperPropArt> = { donkey, 'wood-bundle': woodBundle, 'ram-in-thicket': ramInThicket, 'cave-tomb': caveTomb }
