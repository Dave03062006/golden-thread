import type { PaperPropArt } from '../art'

/**
 * Props of Level 3, Episode 7: what Abraham serves his three guests under the oak at
 * Mamre: water for their feet, cakes of fine meal, a calf "tender and good," curds and
 * milk; and the mat spread in the shade where he sets it all before them.
 */

const prop = (box: { w: number; h: number }, svg: string, anchor: 'base' | 'center' = 'base'): PaperPropArt => ({ box: { x: 0, y: 0, ...box }, facing: 1, poses: ['idle'], anchor, parts: [{ id: 'it', svg }] })

const waterJar = prop(
  { w: 60, h: 80 },
  `<path d="M14 80Q4 52 16 30L18 16L42 16L44 30Q56 52 46 80Z" fill="#b8784a"/><path d="M16 16L44 16" stroke="#d8986a" stroke-width="5"/><path d="M14 50Q30 44 46 50" stroke="#8a5432" stroke-width="3" fill="none"/><ellipse cx="30" cy="16" rx="12" ry="4" fill="#4a8ac0"/>`,
)

const cakes = prop(
  { w: 90, h: 40 },
  `<ellipse cx="45" cy="34" rx="44" ry="6" fill="#7a5232"/>${[20, 45, 70].map((x, i) => `<ellipse cx="${x}" cy="${26 - (i % 2) * 4}" rx="18" ry="7" fill="#d8a85a"/><path d="M${x - 8} ${24 - (i % 2) * 4}L${x + 8} ${24 - (i % 2) * 4}" stroke="#a8743a" stroke-width="2"/>`).join('')}`,
)

/** A young calf, brown and white, facing right. */
const calf: PaperPropArt = {
  box: { x: 0, y: 0, w: 110, h: 80 },
  facing: 1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    ...[24, 36, 70, 82].map((x, i) => ({ id: `leg-${i}`, pivot: { x: x + 3, y: 48 }, svg: `<path d="M${x} 46L${x + 7} 46L${x + 6} 78L${x + 1} 78Z" fill="${i % 2 ? '#7a4a2a' : '#6a3e22'}"/>` })),
    {
      id: 'body',
      svg: `<path d="M16 34Q18 18 42 18L80 18Q96 18 96 32Q96 50 80 50L32 50Q16 50 16 34Z" fill="#9a5a32"/>
        <path d="M44 20Q52 30 46 46L62 46Q56 30 66 20Z" fill="#f4ece0"/>
        <path d="M90 22L100 10L110 14L108 30L96 32Z" fill="#9a5a32"/><path d="M100 10L96 2L104 8Z" fill="#7a4a2a"/>
        <circle cx="104" cy="18" r="1.6" fill="#1a1210"/><path d="M104 28L110 28" stroke="#e8b8a0" stroke-width="3"/>
        <path d="M16 28Q8 30 8 40" stroke="#7a4a2a" stroke-width="3" fill="none"/>`,
    },
  ],
  animate: (part, pose, time) => {
    if (!part.startsWith('leg-') || pose !== 'walk') return {}
    const i = Number(part.slice(4))
    return { rotate: (i % 2 ? 1 : -1) * 14 * Math.sin(time * Math.PI * 2 * 1.5 + (i > 1 ? Math.PI : 0)) }
  },
}

const milkBowls = prop(
  { w: 80, h: 40 },
  `<path d="M2 18Q4 40 22 40Q40 40 42 18Z" fill="#a8743a"/><ellipse cx="22" cy="18" rx="20" ry="5" fill="#f8f4ea"/>
    <path d="M40 22Q42 40 58 40Q74 40 76 22Z" fill="#8a5a32"/><ellipse cx="58" cy="22" rx="18" ry="5" fill="#f0e6c8"/>`,
)

const feastMat = prop(
  { w: 260, h: 40 },
  `<path d="M10 20L250 20L240 38L20 38Z" fill="#a83a3a"/>${[40, 90, 140, 190, 230].map((x) => `<path d="M${x} 20L${x - 4} 38" stroke="#e0b850" stroke-width="3"/>`).join('')}<path d="M10 20L250 20" stroke="#e0b850" stroke-width="3"/>`,
)

export const mamreProps: Record<string, PaperPropArt> = { 'water-jar': waterJar, cakes, calf, 'milk-bowls': milkBowls, 'feast-mat': feastMat }
