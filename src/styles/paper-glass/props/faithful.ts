import type { PaperPropArt } from '../art'

/**
 * Props of Level 5, Episode 2: the little picture above each prisoner of what he needs
 * (bread, water, a blanket, a lamp, or someone to listen); the butler's dream of a vine with
 * three branches, and the baker's three baskets of bread; and Pharaoh's golden cup.
 */

const TAU = Math.PI * 2
const bubble = `<circle cx="40" cy="36" r="34" fill="#fff8e8" opacity=".92"/><path d="M30 66L40 82L46 66Z" fill="#fff8e8" opacity=".92"/>`
const NEEDS: Record<string, string> = {
  bread: `<ellipse cx="40" cy="40" rx="20" ry="11" fill="#c8904a"/><path d="M26 36L54 36M30 30L50 30" stroke="#e8b878" stroke-width="3"/>`,
  water: `<path d="M30 56Q24 40 32 28L34 20L46 20L48 28Q56 40 50 56Z" fill="#b8784a"/><ellipse cx="40" cy="20" rx="8" ry="3" fill="#4a8ac0"/>`,
  blanket: `<path d="M18 26L62 26L58 54L22 54Z" fill="#a8503a"/><path d="M22 34L60 34M24 44L58 44" stroke="#e0b060" stroke-width="3"/>`,
  lamp: `<path d="M22 48Q40 60 58 48L54 42L26 42Z" fill="#b8784a"/><path d="M40 42Q34 30 40 18Q46 30 40 42Z" fill="#ffc848"/>`,
  listen: `<path d="M24 28Q40 18 56 28Q58 42 46 46L40 56L38 46Q22 42 24 28Z" fill="#7a9ac8"/><circle cx="33" cy="33" r="2.6" fill="#fff"/><circle cx="40" cy="33" r="2.6" fill="#fff"/><circle cx="47" cy="33" r="2.6" fill="#fff"/>`,
}
export const NEED_KINDS = Object.keys(NEEDS)

const need: PaperPropArt = {
  box: { x: 0, y: 0, w: 80, h: 84 },
  facing: 1,
  poses: NEED_KINDS,
  anchor: 'center',
  shadow: false,
  parts: [{ id: 'bubble', svg: bubble }, ...NEED_KINDS.map((k) => ({ id: k, svg: NEEDS[k]! }))],
  animate(part, pose, time) {
    const bob = 1.5 * Math.sin(time * TAU * 0.4)
    if (part === 'bubble') return { y: bob }
    return { y: bob, opacity: part === pose ? 1 : 0 }
  },
}

const vine: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 160 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  shadow: false,
  parts: [
    {
      id: 'vine',
      svg: `<path d="M80 150C78 110 84 90 80 70" stroke="#6a4a2a" stroke-width="8" fill="none" stroke-linecap="round"/>
        ${[
          [80, 70, 30, 30],
          [80, 70, 130, 36],
          [80, 70, 84, 20],
        ]
          .map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1}Q${(x1! + x2!) / 2} ${y2! - 10} ${x2} ${y2}" stroke="#6a4a2a" stroke-width="5" fill="none"/><path d="M${x2! - 14} ${y2! - 4}Q${x2} ${y2! - 22} ${x2! + 14} ${y2! - 4}Q${x2} ${y2! + 6} ${x2! - 14} ${y2! - 4}Z" fill="#4a8a3a"/>${[0, 1, 2, 3, 4, 5].map((k) => `<circle cx="${x2! + ((k % 3) - 1) * 7}" cy="${y2! + 8 + Math.floor(k / 3) * 7 + (k === 5 ? 6 : 0)}" r="5" fill="#6a3a8a"/>`).join('')}`)
          .join('')}`,
    },
  ],
}

const breadBaskets: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 160 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  shadow: false,
  parts: [
    { id: 'baskets', svg: [0, 1, 2].map((i) => `<path d="M${22} ${140 - i * 40}L98 ${140 - i * 40}L90 ${110 - i * 40}L30 ${110 - i * 40}Z" fill="#c8a060"/><path d="M28 ${124 - i * 40}L92 ${124 - i * 40}" stroke="#a8804a" stroke-width="3"/>${[40, 60, 80].map((x) => `<ellipse cx="${x}" cy="${108 - i * 40}" rx="9" ry="5" fill="#e0b070"/>`).join('')}`).join('') },
    { id: 'bird', svg: `<path d="M70 20Q80 10 92 18Q84 22 80 30Q76 22 70 20Z" fill="#3a3040"/><path d="M76 18L60 8M84 18L100 6" stroke="#3a3040" stroke-width="3" stroke-linecap="round"/>` },
  ],
  animate: (part, _pose, time) => (part === 'bird' ? { y: 4 * Math.sin(time * TAU * 0.7), x: 3 * Math.cos(time * TAU * 0.35) } : {}),
}

const goldenCup: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 50 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'cup', svg: `<path d="M6 6L34 6L28 26L12 26Z" fill="#e8c050"/><path d="M18 26L22 26L22 42L18 42Z" fill="#d0a838"/><path d="M8 42L32 42L32 48L8 48Z" fill="#e8c050"/><path d="M10 10L30 10" stroke="#fff0b0" stroke-width="2.4"/>` }],
}

export const faithfulProps: Record<string, PaperPropArt> = { need, vine, 'bread-baskets': breadBaskets, 'golden-cup': goldenCup }
