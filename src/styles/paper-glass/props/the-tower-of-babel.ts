import type { PaperPropArt } from '../art'

/**
 * Props of Level 2, Episode 6: the stepped tower of baked brick, raised terrace by
 * terrace; the bricks, the load swung up to the builders, and the kilns that fire them;
 * the words of the builders in the scripts of many languages, after the confusion; and
 * the families on the map, each with the color of Noah's son they come from.
 */

/** The tower's six terraces, widest at the bottom, in a 600 × 520 box. */
export const TIERS = 6
const TIER_H = 70
const tierWidth = (k: number) => 560 - k * 80
const BRICK = '#b07a4a'
const MORTAR = '#8a5a34'
const LIT = '#d8a46a'

function tier(k: number): string {
  const w = tierWidth(k)
  const x = 300 - w / 2
  const y = 520 - (k + 1) * TIER_H
  let rows = ''
  for (let r = 1; r < 4; r++) rows += `<path d="M${x} ${y + r * 17.5}L${x + w} ${y + r * 17.5}" stroke="${MORTAR}" stroke-width="2" opacity=".6"/>`
  for (let r = 0; r < 4; r++)
    for (let c = x + ((r % 2) + 1) * 20; c < x + w - 8; c += 40) rows += `<path d="M${c} ${y + r * 17.5}L${c} ${y + (r + 1) * 17.5}" stroke="${MORTAR}" stroke-width="1.6" opacity=".45"/>`
  // A stair up the front of the terrace, and the lit top edge.
  return `<path d="M${x} ${y}L${x + w} ${y}L${x + w} ${y + TIER_H}L${x} ${y + TIER_H}Z" fill="${BRICK}"/>${rows}
    <path d="M286 ${y + TIER_H}L314 ${y + TIER_H}L308 ${y}L292 ${y}Z" fill="${LIT}" opacity=".85"/>
    <path d="M${x} ${y}L${x + w} ${y}" stroke="${LIT}" stroke-width="5"/>`
}

const ziggurat: PaperPropArt = {
  box: { x: 0, y: 0, w: 600, h: 520 },
  facing: 1,
  poses: Array.from({ length: TIERS + 1 }, (_, n) => `t${n}`),
  anchor: 'base',
  parts: [
    { id: 'footing', svg: `<path d="M10 520L590 520L586 510L14 510Z" fill="${MORTAR}"/><path d="M20 510L580 510" stroke="${LIT}" stroke-width="3" stroke-dasharray="14 8"/>` },
    ...Array.from({ length: TIERS }, (_, k) => ({ id: `tier-${k + 1}`, svg: tier(k) })),
  ],
  animate: (part, pose) => {
    if (part === 'footing') return {}
    const built = Number(pose.slice(1))
    return { opacity: Number(part.slice(5)) <= built ? 1 : 0 }
  },
}

/** A load of baked bricks on a board, hung from a rope, swung up to the top of the tower. */
const brickLoad: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 90 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'load',
      svg: `<path d="M60 0L60 34M60 34L14 50M60 34L106 50" stroke="#6a5038" stroke-width="3"/>
        <path d="M6 82L114 82L114 90L6 90Z" fill="#6a4a2a"/>
        ${[0, 1, 2].flatMap((r) => [0, 1, 2, 3].slice(r === 2 ? 1 : 0, r === 2 ? 3 : 4).map((c) => `<rect x="${12 + c * 25 + (r % 2) * 12}" y="${66 - r * 14}" width="24" height="13" rx="2" fill="${BRICK}" stroke="${MORTAR}" stroke-width="1.6"/>`)).join('')}`,
    },
  ],
  animate: (_part, _pose, time) => ({ rotate: 2 * Math.sin(time * Math.PI * 2 * 0.7) }),
}

/** One baked brick, left at the foot of the tower. */
const brick: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 28 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'brick', svg: `<path d="M2 10L46 4L58 16L14 24Z" fill="${BRICK}"/><path d="M2 10L14 24L14 28L2 14Z" fill="${MORTAR}"/><path d="M14 24L58 16L58 20L14 28Z" fill="#9a6a3e"/>` }],
}

/** A stack of bricks drying in the sun. */
const brickPile: PaperPropArt = {
  box: { x: 0, y: 0, w: 140, h: 70 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'pile',
      svg: [0, 1, 2, 3]
        .flatMap((r) => Array.from({ length: 5 - r }, (_, c) => `<rect x="${6 + c * 26 + r * 13}" y="${54 - r * 16}" width="25" height="15" rx="2" fill="${(r + c) % 2 ? BRICK : '#c08a56'}" stroke="${MORTAR}" stroke-width="1.6"/>`))
        .join(''),
    },
  ],
}

/** A domed kiln of clay, the fire glowing in its mouth, smoke rising. */
const kiln: PaperPropArt = {
  box: { x: 0, y: 0, w: 140, h: 150 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    { id: 'kiln', svg: `<path d="M10 150L10 90Q10 40 70 36Q130 40 130 90L130 150Z" fill="#a8845a"/><path d="M14 92Q16 46 70 42" stroke="#c8a476" stroke-width="5" fill="none"/><path d="M50 150L50 118Q70 98 90 118L90 150Z" fill="#3a2418"/>` },
    { id: 'fire', svg: `<path d="M54 150Q56 128 66 120Q68 132 74 126Q80 136 86 150Z" fill="#f08a3a"/><path d="M62 150Q64 138 70 134Q74 142 78 150Z" fill="#ffd27a"/>` },
    { id: 'smoke', svg: `<circle cx="70" cy="22" r="14" fill="#e8e4e0" opacity=".5"/><circle cx="80" cy="6" r="10" fill="#e8e4e0" opacity=".35"/>` },
  ],
  animate: (part, _pose, time) =>
    part === 'fire' ? { opacity: 0.8 + 0.2 * Math.sin(time * Math.PI * 2 * 1.7), y: Math.sin(time * Math.PI * 2 * 2.3) } : part === 'smoke' ? { y: -6 * ((time * 0.4) % 1), opacity: 1 - ((time * 0.4) % 1) } : {},
}

/**
 * Words in the air, in the scripts of many languages: wedges pressed in clay, picture
 * signs, letters, and curling strokes. No real words: only the look of speech that can't
 * be understood.
 */
const SCRIPTS: Record<string, string> = {
  wedges: Array.from({ length: 7 }, (_, i) => {
    const x = 10 + i * 24
    return i % 3 === 2 ? `<path d="M${x} 20L${x + 14} 14L${x + 14} 26Z" fill="#3a2a22"/>` : `<path d="M${x} 10L${x + 10} 10L${x + 5} 16Z" fill="#3a2a22"/><path d="M${x + 5} 16L${x + 5} 34" stroke="#3a2a22" stroke-width="2.4"/>`
  }).join(''),
  signs: `<circle cx="20" cy="22" r="8" fill="none" stroke="#3a2a22" stroke-width="2.6"/><path d="M40 32L52 12L64 32Z" fill="none" stroke="#3a2a22" stroke-width="2.6"/><path d="M76 30Q86 8 98 30" stroke="#3a2a22" stroke-width="2.6" fill="none"/><path d="M110 12L110 32M104 18L116 18" stroke="#3a2a22" stroke-width="2.6"/><path d="M128 22Q138 10 148 22Q138 34 128 22Z" fill="none" stroke="#3a2a22" stroke-width="2.6"/><path d="M160 32L166 12L172 32" stroke="#3a2a22" stroke-width="2.6" fill="none"/>`,
  letters: `<path d="M10 32L18 12L26 32M13 24L23 24M36 12L36 32L48 32M58 12L70 32M70 12L58 32M82 12L82 32M82 12Q96 14 82 22M108 12L100 32L116 32ZM128 12L140 12L134 22L140 32L128 32M150 12L162 32M162 12L150 32" stroke="#3a2a22" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`,
  curls: `<path d="M8 26Q14 10 24 22Q30 30 38 18M48 28Q48 12 60 14Q70 18 62 26Q56 30 66 30M80 18Q96 6 96 22Q96 32 84 30M108 26Q118 12 126 26Q132 34 140 22Q146 14 156 20M164 14L164 30Q170 34 176 28" stroke="#3a2a22" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
}
const scriptWords: PaperPropArt = {
  box: { x: 0, y: 0, w: 190, h: 44 },
  facing: 1,
  poses: Object.keys(SCRIPTS),
  shadow: false,
  parts: Object.entries(SCRIPTS).map(([id, svg]) => ({ id, svg: `<rect x="0" y="0" width="190" height="44" rx="22" fill="#fbf4e2" opacity=".86"/>${svg}` })),
  animate: (part, pose, time) => ({ opacity: part === pose ? 1 : 0, y: 2 * Math.sin(time * Math.PI * 2 * 0.5) }),
}

/** A family setting out on the map: three travelers and a pack animal, with a banner in the color of their forefather. */
const BANNERS: Record<string, string> = { japheth: '#3c6a4a', ham: '#9a6a2e', shem: '#3a5a7e' }
const familyBand: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 110 },
  facing: 1,
  poses: Object.keys(BANNERS),
  anchor: 'base',
  parts: [
    {
      id: 'people',
      svg: `${[20, 46, 70].map((x, i) => `<circle cx="${x}" cy="${46 + i * 4}" r="8" fill="#3a2a42"/><path d="M${x - 9} ${110}L${x - 7} ${58 + i * 4}Q${x} ${52 + i * 4} ${x + 7} ${58 + i * 4}L${x + 9} 110Z" fill="#5a4a5e"/>`).join('')}
        <path d="M84 110L84 84Q86 72 102 74L112 76L116 70L118 80L112 84L112 110L106 110L106 90L92 90L92 110Z" fill="#7a6248"/>`,
    },
    ...Object.entries(BANNERS).map(([id, color]) => ({ id, svg: `<path d="M8 110L8 4" stroke="#5a4028" stroke-width="4"/><path d="M8 6L44 12L8 26Z" fill="${color}" stroke="#f4e4b0" stroke-width="2"/>` })),
  ],
  animate: (part, pose) => (part in BANNERS ? { opacity: part === pose ? 1 : 0 } : {}),
}

export const theTowerOfBabelProps: Record<string, PaperPropArt> = { ziggurat, 'brick-load': brickLoad, brick, 'brick-pile': brickPile, kiln, 'script-words': scriptWords, 'family-band': familyBand }
