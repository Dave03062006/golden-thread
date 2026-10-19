import type { PaperPropArt } from '../art'

/** Props of Level 3, Episode 8: the pillar of salt where Lot's wife looked back. */

const saltPillar: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 120 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'pillar',
      svg: `<path d="M8 120L10 60Q8 40 14 30Q14 18 20 14Q26 18 26 30Q32 40 30 60L32 120Z" fill="#e8e4dc"/>
        <path d="M14 34Q20 28 26 34M12 70L28 70M11 96L29 96" stroke="#c8c2b6" stroke-width="2" fill="none"/>
        <path d="M30 60L32 120L24 120L26 60Z" fill="#d0cac0"/>`,
    },
  ],
}

export const sodomProps: Record<string, PaperPropArt> = { 'salt-pillar': saltPillar }
