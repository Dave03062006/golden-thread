import type { PaperPropArt } from '../art'

/**
 * Props of Level 15: the palm of Deborah; Gideon's fleece, dry or wet with dew; the honeycomb
 * Samson found in the lion; and the millstone he turned in the prison at Gaza.
 */

const palmTree: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 160 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'tree',
      svg: `<path d="M46 160Q44 100 52 40L58 40Q52 100 56 160Z" fill="#8a5a32"/>
        ${Array.from({ length: 7 }, (_, i) => `<path d="M56 40Q${56 + (i - 3) * 16} ${16 + Math.abs(i - 3) * 4} ${56 + (i - 3) * 22} ${30 + Math.abs(i - 3) * 14}" stroke="${i % 2 ? '#4a7a3a' : '#5a8a44'}" stroke-width="9" stroke-linecap="round" fill="none"/>`).join('')}
        <circle cx="52" cy="46" r="4" fill="#a8743a"/><circle cx="60" cy="47" r="4" fill="#a8743a"/>`,
    },
  ],
}

/** A sheepskin with its wool: dry, or soaked with dew and shining. */
const fleece: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 34 },
  facing: 1,
  poses: ['dry', 'wet'],
  anchor: 'base',
  parts: [
    { id: 'wool', svg: `<path d="M6 34Q0 18 16 14Q30 4 50 10Q72 2 86 14Q100 18 94 34Z" fill="#efe6d2"/>${Array.from({ length: 8 }, (_, i) => `<circle cx="${14 + i * 10}" cy="${20 + (i % 2) * 5}" r="5" fill="#e0d4bc"/>`).join('')}` },
    { id: 'dew', svg: `${Array.from({ length: 9 }, (_, i) => `<circle cx="${12 + i * 9}" cy="${16 + (i % 3) * 5}" r="2.4" fill="#bfe4f8"/>`).join('')}<path d="M10 33L90 33" stroke="#8ac8ec" stroke-width="2"/>` },
  ],
  animate: (part, pose) => ({ opacity: part === 'dew' ? (pose === 'wet' ? 1 : 0) : 1 }),
}

const honeycomb: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 30 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'comb',
      svg: `<path d="M4 30Q2 10 20 6Q38 10 36 30Z" fill="#e8a83a"/>${[
        [12, 16],
        [20, 12],
        [28, 16],
        [16, 23],
        [24, 23],
      ]
        .map(([x, y]) => `<path d="M${x! - 3} ${y}L${x} ${y! - 3}L${x! + 3} ${y}L${x} ${y! + 3}Z" fill="#f8d070"/>`)
        .join('')}`,
    },
  ],
}

const millstone: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 50 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'mill',
      svg: `<ellipse cx="50" cy="40" rx="46" ry="10" fill="#6a6470"/><rect x="8" y="22" width="84" height="18" fill="#8a8494"/><ellipse cx="50" cy="22" rx="42" ry="9" fill="#a8a2b0"/><ellipse cx="50" cy="22" rx="6" ry="2.5" fill="#4a4450"/><path d="M50 22L96 4" stroke="#8a5a32" stroke-width="6" stroke-linecap="round"/>`,
    },
  ],
}

/** Level 16: the sandal handed over at the gate of Bethlehem, to seal the redemption. */
const sandal: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 24 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'sandal', svg: `<path d="M4 24Q2 14 14 12L48 10Q60 12 58 24Z" fill="#8a5a32"/><path d="M18 12Q24 0 34 2Q40 4 38 12" stroke="#6a4020" stroke-width="4" fill="none"/>` }],
}

/** Level 17: the little vial of oil Samuel poured on Saul's head. */
const oilVial: PaperPropArt = {
  box: { x: 0, y: 0, w: 20, h: 40 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'vial', svg: `<path d="M6 40Q0 24 8 16L8 6L12 6L12 16Q20 24 14 40Z" fill="#c8b070"/><rect x="7" y="2" width="6" height="5" fill="#8a5a32"/><path d="M6 30Q10 26 14 30L14 38L6 38Z" fill="#e8c850"/>` }],
}

/** Level 18: Saul's spear, stuck in the ground by his head. */
const spear: PaperPropArt = {
  box: { x: 0, y: 0, w: 12, h: 120 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'spear', svg: `<path d="M5 120L5 20L7 20L7 120Z" fill="#8a5a32"/><path d="M6 0L10 20L2 20Z" fill="#9a94a4"/>` }],
}

/** Level 19: David's linen robe, spread over the basin to be washed. */
const linenRobe: PaperPropArt = {
  box: { x: -60, y: -90, w: 120, h: 90 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'robe',
      svg: `<path d="M-22 -86L22 -86L30 -70L56 -54L50 -40L30 -50L36 0L-36 0L-30 -50L-50 -40L-56 -54L-30 -70Z" fill="#f4f0e8"/><path d="M-12 -80L-18 -4M0 -78L0 -2M12 -80L18 -4" stroke="#d8d0c4" stroke-width="2" fill="none"/><path d="M-10 -86Q0 -78 10 -86" stroke="#c8c0b4" stroke-width="3" fill="none"/>`,
    },
  ],
}

/** Level 19: a dark stain on David's robe, washed away one by one. */
const stain: PaperPropArt = {
  box: { x: -20, y: -20, w: 40, h: 40 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  parts: [{ id: 'stain', svg: `<path d="M-14 -4C-16 -14 -2 -18 6 -12C16 -10 18 2 10 8C4 16 -10 14 -12 6Z" fill="#3a2630" opacity=".85"/><circle cx="12" cy="-14" r="3" fill="#3a2630" opacity=".7"/>` }],
}

/** Level 19: a branch of hyssop, for sprinkling. */
const hyssop: PaperPropArt = {
  box: { x: -20, y: -80, w: 40, h: 80 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'branch',
      svg: `<path d="M0 0L2 -60" stroke="#5a7a3a" stroke-width="3" fill="none"/>${Array.from({ length: 7 }, (_, i) => `<ellipse cx="${i % 2 ? 7 : -5}" cy="${-14 - i * 8}" rx="6" ry="3" fill="${i % 3 ? '#7a9a4a' : '#9ab86a'}" transform="rotate(${i % 2 ? -30 : 30} ${i % 2 ? 7 : -5} ${-14 - i * 8})"/>`).join('')}<circle cx="2" cy="-66" r="5" fill="#e8e0f0"/>`,
    },
  ],
}

/** Level 19: snow falling over Jerusalem, the width of the scene. */
const snowfall: PaperPropArt = {
  box: { x: -200, y: -112, w: 400, h: 225 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.5,
  parts: [
    {
      id: 'flakes',
      svg: Array.from({ length: 90 }, (_, i) => `<circle cx="${-196 + ((i * 97) % 392)}" cy="${-108 + ((i * 53) % 216)}" r="${1 + (i % 3) * 0.6}" fill="#ffffff" opacity="${0.6 + (i % 4) * 0.1}"/>`).join(''),
    },
  ],
}

/** Level 20: the shofar, a ram's-horn trumpet. */
const shofar: PaperPropArt = {
  box: { x: -40, y: -20, w: 80, h: 40 },
  facing: 1,
  poses: ['idle'],
  parts: [{ id: 'horn', svg: '<path d="M-36 12Q-30 -16 6 -12Q30 -10 36 -16L38 -6Q30 0 8 -2Q-22 -4 -28 16Z" fill="#e8d8b0"/><path d="M30 -14L38 -16L38 -4L30 -2Z" fill="#c8b48a"/>' }],
}

/** Level 20: a pair of bronze cymbals. */
const cymbals: PaperPropArt = {
  box: { x: -40, y: -25, w: 80, h: 50 },
  facing: 1,
  poses: ['idle'],
  parts: [{ id: 'cymbals', svg: '<ellipse cx="-14" cy="0" rx="20" ry="8" fill="#c8a040" transform="rotate(-25 -14 0)"/><ellipse cx="14" cy="0" rx="20" ry="8" fill="#d8b050" transform="rotate(25 14 0)"/><circle cx="-14" cy="0" r="3" fill="#8a6a2a"/><circle cx="14" cy="0" r="3" fill="#8a6a2a"/>' }],
}

/** Level 20: a stone gateway arch, unfinished, with a gap at the head of the corner. */
const gateArch: PaperPropArt = {
  box: { x: -100, y: -150, w: 200, h: 150 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'arch',
      svg: `<path d="M-90 0L-90 -96Q-88 -138 -20 -142L-20 -104Q-50 -100 -52 -72L-52 0Z" fill="#c8b898"/><path d="M90 0L90 -96Q88 -138 20 -142L20 -104Q50 -100 52 -72L52 0Z" fill="#c8b898"/>${[-80, -64, -48, -32, -16].map((y) => `<path d="M-90 ${y}L-52 ${y}M52 ${y}L90 ${y}" stroke="#a89878" stroke-width="2"/>`).join('')}<path d="M-56 -112L-34 -128M56 -112L34 -128" stroke="#a89878" stroke-width="2"/>`,
    },
  ],
}

/** Level 20: the cornerstone, the stone the builders rejected. */
const cornerstone: PaperPropArt = {
  box: { x: -20, y: -15, w: 40, h: 30 },
  facing: 1,
  poses: ['idle'],
  parts: [{ id: 'stone', svg: '<path d="M-18 -13L18 -13L13 13L-13 13Z" fill="#e0d6c2"/><path d="M-18 -13L18 -13L16 -9L-16 -9Z" fill="#d8a838"/>' }],
}

/** Level 21: a cedar of Lebanon, with its broad flat tiers of branches. */
const cedar: PaperPropArt = {
  box: { x: -60, y: -160, w: 120, h: 160 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'tree',
      svg: `<rect x="-5" y="-90" width="10" height="90" fill="#6a4a2a"/>${[0, 1, 2, 3].map((i) => `<path d="M${-56 + i * 10} ${-40 - i * 32}Q0 ${-62 - i * 32} ${56 - i * 10} ${-40 - i * 32}L${44 - i * 10} ${-30 - i * 32}L${-44 + i * 10} ${-30 - i * 32}Z" fill="${i % 2 ? '#3a5a3a' : '#4a6a44'}"/>`).join('')}`,
    },
  ],
}

/** Level 21: one course of finished Temple stones, lowered into place. */
const stoneCourse: PaperPropArt = {
  box: { x: -100, y: -24, w: 200, h: 24 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'stones', svg: `<rect x="-100" y="-24" width="200" height="24" fill="#d8ccb0"/>${[-60, -20, 20, 60].map((x) => `<rect x="${x - 1}" y="-24" width="2" height="24" fill="#b8ac90"/>`).join('')}<rect x="-100" y="-3" width="200" height="3" fill="#b8ac90"/>` }],
}

export const judgesProps: Record<string, PaperPropArt> = { 'palm-tree': palmTree, fleece, honeycomb, millstone, sandal, 'oil-vial': oilVial, spear, 'linen-robe': linenRobe, stain, hyssop, snowfall, shofar, cymbals, 'gate-arch': gateArch, cornerstone, cedar, 'stone-course': stoneCourse }
