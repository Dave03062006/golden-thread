import type { PaperPropArt } from '../art'

/**
 * The ark (Level 2), in cut paper. In Episode 2 it's built part by part, so each part is
 * its own prop, drawn in the same 640 × 300 box so they line up when they stand on the
 * same spot: the keel, the ribs, the three decks, the planked hull with its rooms, the
 * roof, the door in its side, and the pitch that seals it. The plan hangs above them as
 * glowing lines, the part to place next brightest. A barge, six times longer than it is
 * wide, with no sails and no rudder (Genesis 6:14–16).
 */

const BOX = { x: 0, y: 0, w: 640, h: 300 }
const WOOD = '#9a6a3a'
const DARK = '#6a4422'
const LIGHT = '#c08a50'

/** The hull's outline: a long barge with raked ends. */
export const HULL = 'M20 140L620 140L600 270Q590 288 560 290L80 290Q50 288 40 270Z'
const CABIN = 'M100 100L540 100L540 140L100 140Z'
const ROOF = 'M80 102L320 58L560 102Z'
const RIBS = [70, 132, 194, 256, 318, 380, 442, 504, 566]
const DECKS = [250, 212, 174]

const part = (svg: string, shadow = true): PaperPropArt => ({ box: BOX, facing: 1, poses: ['idle'], anchor: 'base', shadow, parts: [{ id: 'wood', svg }] })

const keel = part(`
  <path d="M40 272L600 272L596 290L44 290Z" fill="${DARK}"/>
  <path d="M20 140L40 272" stroke="${DARK}" stroke-width="16" stroke-linecap="round"/>
  <path d="M620 140L600 272" stroke="${DARK}" stroke-width="16" stroke-linecap="round"/>
  <path d="M44 276L596 276" stroke="${LIGHT}" stroke-width="3" opacity=".6"/>`)

const ribs = part(RIBS.map((x) => `<path d="M${x} 272Q${x - 7} 205 ${x} 140" stroke="${WOOD}" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M${x - 4} 268Q${x - 10} 205 ${x - 4} 146" stroke="${LIGHT}" stroke-width="2.5" fill="none" opacity=".7"/>`).join(''))

const decks = part(DECKS.map((y) => `<path d="M46 ${y}L596 ${y}" stroke="${LIGHT}" stroke-width="8" stroke-linecap="round"/><path d="M46 ${y + 4}L596 ${y + 4}" stroke="${DARK}" stroke-width="2"/>`).join(''))

const hull = part(`
  <path d="${HULL}" fill="${WOOD}"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${30 + i * 2} ${152 + i * 17}L${610 - i * 2} ${152 + i * 17}" stroke="${DARK}" stroke-width="2" opacity=".75"/>`).join('')}
  ${RIBS.map((x) => `<path d="M${x} 280L${x} 142" stroke="${DARK}" stroke-width="2" opacity=".4"/>`).join('')}
  <path d="M20 140L620 140" stroke="${LIGHT}" stroke-width="5"/>`)

const roof = part(`
  <path d="${CABIN}" fill="${WOOD}"/>
  ${[112, 124].map((y) => `<path d="M100 ${y}L540 ${y}" stroke="${DARK}" stroke-width="2" opacity=".7"/>`).join('')}
  <path d="M300 108L340 108L340 128L300 128Z" fill="#3a2414"/>
  <path d="${ROOF}" fill="${DARK}"/>
  <path d="M80 102L320 58L560 102" stroke="${LIGHT}" stroke-width="4" fill="none"/>`)

const door = part(`
  <path d="M414 182L474 182L474 266L414 266Z" fill="${DARK}"/>
  <path d="M420 188L468 188L468 262L420 262Z" fill="#3a2414"/>
  <path d="M414 182L474 182" stroke="${LIGHT}" stroke-width="3"/>`)

/** The pitch over the hull and roof, dark and glossy, with the light running along it. */
const pitch = part(`
  <path d="${HULL}" fill="#2e2016"/>
  <path d="${CABIN}" fill="#2e2016"/>
  <path d="${ROOF}" fill="#241810"/>
  <path d="M414 182L474 182L474 266L414 266Z" fill="#1a110a"/>
  <path d="M300 108L340 108L340 128L300 128Z" fill="#1a110a"/>
  <path d="M40 160C200 150 420 150 600 160" stroke="#8a6a4a" stroke-width="3" fill="none" opacity=".55"/>
  <path d="M60 230C220 222 420 222 590 230" stroke="#8a6a4a" stroke-width="2" fill="none" opacity=".35"/>
  <path d="M20 140L620 140" stroke="#a88a5a" stroke-width="3" opacity=".6"/>`)

/** The plan, drawn in light: every part's outline, the next one to place brightest. */
const PLAN_PARTS: Record<string, string> = {
  keel: 'M40 272L600 272L596 290L44 290Z M20 140L40 272 M620 140L600 272',
  ribs: RIBS.map((x) => `M${x} 272Q${x - 7} 205 ${x} 140`).join(' '),
  decks: DECKS.map((y) => `M46 ${y}L596 ${y}`).join(' '),
  hull: HULL,
  roof: `${CABIN} ${ROOF}`,
  door: 'M414 182L474 182L474 266L414 266Z',
}

const plan: PaperPropArt = {
  box: BOX,
  facing: 1,
  poses: ['idle', ...Object.keys(PLAN_PARTS)],
  anchor: 'base',
  shadow: false,
  parts: Object.entries(PLAN_PARTS).map(([id, d]) => ({
    id,
    svg: `<path d="${d}" stroke="#fff2c0" stroke-width="5" fill="none" stroke-dasharray="14 9" stroke-linecap="round"/><path d="${d}" stroke="#ffe7a0" stroke-width="12" fill="none" opacity=".25"/>`,
  })),
  animate: (id, pose, time) => (id === pose ? { opacity: 0.85 + 0.15 * Math.sin(time * Math.PI * 2 * 0.8) } : { opacity: pose === 'idle' ? 0.45 : 0.2 }),
}

/** A ramp up to the door, for loading the ark. */
const ramp: PaperPropArt = {
  box: { x: 0, y: 0, w: 200, h: 100 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'wood', svg: `<path d="M0 100L180 8L200 18L22 100Z" fill="${WOOD}"/>${[1, 2, 3, 4, 5, 6].map((i) => `<path d="M${i * 28 + 2} ${100 - i * 14}L${i * 28 + 16} ${106 - i * 14}" stroke="${DARK}" stroke-width="3"/>`).join('')}` }],
}

/** A basket of food, carried up into the ark. */
const basket: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 30 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'basket',
      svg: `<circle cx="13" cy="8" r="6" fill="#c8a040"/><circle cx="22" cy="6" r="6" fill="#8a3a2a"/><circle cx="29" cy="9" r="5" fill="#d8c060"/>
        <path d="M4 10L36 10L32 30L8 30Z" fill="#a8783a"/>${[14, 20, 26].map((y) => `<path d="M6 ${y}L34 ${y}" stroke="#7a5228" stroke-width="1.6"/>`).join('')}`,
    },
  ],
}

/**
 * The finished ark (Episodes 3–5): pitched, its roof and lit window, and the door in its
 * side, open or shut. On the waters it rocks, and in the storm it leans one way or the
 * other, turning about its middle.
 * - open: the door open, for boarding; shut: the LORD shut him in (Genesis 7:16).
 * - rock: shut, riding the swell; lean-left, lean-right: shut, leaning into a wave.
 */
const PIVOT = { x: 320, y: 220 }
const LEAN: Record<string, number> = { 'lean-left': -9, 'lean-right': 9 }
const ark: PaperPropArt = {
  box: BOX,
  facing: 1,
  poses: ['open', 'shut', 'rock', 'lean-left', 'lean-right'],
  anchor: 'base',
  parts: [
    {
      id: 'ark',
      pivot: PIVOT,
      svg: `
        <path d="${HULL}" fill="#2e2016"/>
        ${Array.from({ length: 8 }, (_, i) => `<path d="M${30 + i * 2} ${152 + i * 17}L${610 - i * 2} ${152 + i * 17}" stroke="#4a3424" stroke-width="2" opacity=".8"/>`).join('')}
        <path d="${CABIN}" fill="#2e2016"/>
        <path d="M300 108L340 108L340 128L300 128Z" fill="#ffd27a"/>
        <path d="${ROOF}" fill="#241810"/>
        <path d="M414 182L474 182L474 266L414 266Z" fill="#120c08"/>
        <path d="M40 160C200 150 420 150 600 160" stroke="#8a6a4a" stroke-width="3" fill="none" opacity=".55"/>
        <path d="M20 140L620 140" stroke="#a88a5a" stroke-width="3" opacity=".6"/>
        <path d="M80 102L320 58L560 102" stroke="#6a5038" stroke-width="3" fill="none"/>`,
    },
    {
      id: 'door',
      pivot: PIVOT,
      svg: `<path d="M414 182L474 182L474 266L414 266Z" fill="#3a2818"/><path d="M420 190L468 190M420 224L468 224M420 258L468 258" stroke="#24180e" stroke-width="3"/>`,
    },
  ],
  animate(part, pose, time) {
    const swell = Math.sin(time * Math.PI * 2 * 0.25)
    const turn = pose === 'rock' ? 2.2 * swell : (LEAN[pose] ?? 0) + (pose.startsWith('lean') ? 1.2 * swell : 0)
    if (part === 'door') return { rotate: turn, opacity: pose === 'open' ? 0 : 1 }
    return { rotate: turn }
  },
}

export const arkProps: Record<string, PaperPropArt> = {
  ark,
  'ark-keel': keel,
  'ark-ribs': ribs,
  'ark-decks': decks,
  'ark-hull': hull,
  'ark-roof': roof,
  'ark-door': door,
  'ark-pitch': pitch,
  'ark-plan': plan,
  'ark-ramp': ramp,
  basket,
}
