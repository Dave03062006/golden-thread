import type { PaperPropArt, PartMotion } from '../art'

/**
 * Props of Level 8 · The Plagues and the Passover: the pictures of the nine plagues, each in
 * a round frame; a frog; a swarm of gnats, flies or locusts; the blood on a doorpost or a
 * lintel; the dishes of the Passover table; a bundle of stubble; and the pillar of cloud
 * that is fire by night.
 */

const TAU = Math.PI * 2
const SPECKS = [
  [22, 30],
  [34, 22],
  [48, 34],
  [60, 20],
  [72, 32],
  [28, 46],
  [44, 50],
  [58, 44],
  [76, 52],
  [38, 62],
  [64, 60],
]
const PICTURES: Record<string, string> = {
  blood: `<path d="M8 50Q30 42 50 50T92 50L92 76L8 76Z" fill="#9a1a2a"/><path d="M14 58Q34 52 52 58T88 58" stroke="#c84a5a" stroke-width="2.4" fill="none"/><path d="M40 34L44 20L48 34Z" fill="#4a7a2a"/>`,
  frogs: [[30, 56], [58, 48], [70, 62]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="7" fill="#5a9a3a"/><circle cx="${x! - 6}" cy="${y! - 6}" r="3" fill="#7aba4a"/><circle cx="${x! + 6}" cy="${y! - 6}" r="3" fill="#7aba4a"/>`).join(''),
  gnats: SPECKS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#3a3a4a"/>`).join('') + `<path d="M10 72L90 72" stroke="#c8b488" stroke-width="5"/>`,
  flies: SPECKS.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="2.2" fill="#2a2a34"/><path d="M${x! - 3} ${y! - 2}l-3 -3M${x! + 3} ${y! - 2}l3 -3" stroke="#8a8aa0" stroke-width="1.4"/>`).join(''),
  cattle: `<path d="M18 62Q22 46 40 46L64 46Q78 46 80 58L80 64L18 64Z" fill="#8a7a66"/><path d="M78 50L88 54L86 62L76 60Z" fill="#7a6a56"/><path d="M84 52Q88 46 92 48" stroke="#e8dcc0" stroke-width="2.4" fill="none"/><path d="M10 66L90 66" stroke="#a89a7a" stroke-width="4"/>`,
  boils: `<circle cx="50" cy="40" r="16" fill="#c89a7a"/><path d="M30 76Q30 56 50 56Q70 56 70 76Z" fill="#c89a7a"/>${[[44, 36], [56, 44], [40, 64], [60, 66], [50, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#a83a3a"/>`).join('')}`,
  hail: [18, 32, 46, 60, 74, 86].map((x, i) => `<circle cx="${x}" cy="${24 + (i % 3) * 16}" r="4" fill="#e8eef8"/><path d="M${x} ${14 + (i % 3) * 16}L${x} ${20 + (i % 3) * 16}" stroke="#c8d4e8" stroke-width="2"/>`).join('') + `<path d="M40 70L46 56L52 66L58 52" stroke="#f0a83a" stroke-width="3" fill="none"/><path d="M10 74L90 74" stroke="#7a8a4a" stroke-width="5"/>`,
  locusts: [[28, 36], [54, 28], [70, 44], [40, 54], [62, 62]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="3.4" fill="#8a7a32"/><path d="M${x! - 2} ${y! - 2}L${x! + 6} ${y! - 10}M${x! + 2} ${y! - 2}L${x! + 10} ${y! - 8}" stroke="#a89a4a" stroke-width="2"/>`).join(''),
  darkness: `<circle cx="50" cy="48" r="40" fill="#14121e"/><path d="M58 30L66 30L66 44L58 44Z" fill="#ffe48a"/><circle cx="62" cy="37" r="9" fill="#ffe48a" opacity=".35"/>`,
}
export const PLAGUE_PICTURES = Object.keys(PICTURES)

const plagueSign: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 100 },
  facing: 1,
  poses: PLAGUE_PICTURES,
  anchor: 'center',
  shadow: false,
  parts: [
    { id: 'frame', svg: `<circle cx="50" cy="48" r="46" fill="#f4ead2" opacity=".92"/><circle cx="50" cy="48" r="46" fill="none" stroke="#b8843a" stroke-width="4"/>` },
    // Each picture drawn a little smaller, to sit inside the frame.
    ...PLAGUE_PICTURES.map((id) => ({ id, svg: `<g transform="translate(50 48) scale(.72) translate(-50 -48)">${PICTURES[id]!}</g>` })),
  ],
  animate(part, pose, time) {
    const bob = 2 * Math.sin(time * TAU * 0.3)
    return part === 'frame' ? { y: bob } : { y: bob, opacity: part === pose ? 1 : 0 }
  },
}

/** A frog, crouched, facing right. */
const frog: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 40 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'frog',
      svg: `<path d="M4 38Q2 22 22 18L40 16Q56 16 56 30L54 38Z" fill="#5a9a3a"/><circle cx="44" cy="14" r="6" fill="#6aaa44"/><circle cx="46" cy="13" r="2.4" fill="#1a1a14"/>
        <path d="M8 38L2 36M14 38L20 30L28 38" stroke="#4a7a2a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M30 30L36 26" stroke="#7aba5a" stroke-width="3"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ y: -3 * Math.max(0, Math.sin(time * TAU * 0.5)) ** 8 }),
}

/** A swarm: tiny gnats, buzzing flies, or locusts, drifting. */
/** A scatter that doesn't fall into rows: each speck's place from a hash of its number. */
const scatter = (i: number, salt: number, span: number) => {
  let h = Math.imul(i * 2 + salt, 0x27d4eb2d)
  h ^= h >>> 15
  return (Math.imul(h, 0x2c1b3c6d) >>> 0) % span
}
const DOTS = Array.from({ length: 46 }, (_, i) => [scatter(i, 1, 96) + 2, scatter(i, 7, 56) + 4] as const)
const swarm: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 64 },
  facing: 1,
  poses: ['gnats', 'flies', 'locusts'],
  anchor: 'center',
  shadow: false,
  parts: [
    { id: 'gnats', svg: DOTS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".4" fill="#2a2a34"/>`).join('') },
    { id: 'flies', svg: DOTS.filter((_, i) => i % 2).map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1" ry=".6" fill="#1a1a24"/><path d="M${x - 0.6} ${y - 0.6}l-.9 -.9M${x + 0.6} ${y - 0.6}l.9 -.9" stroke="#8a8aa0" stroke-width=".4"/>`).join('') },
    { id: 'locusts', svg: DOTS.filter((_, i) => i % 3 === 0).map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.2" ry=".9" fill="#7a6a2a"/><path d="M${x} ${y - 0.8}l1.6 -2.2" stroke="#a89a4a" stroke-width=".6"/>`).join('') },
  ],
  animate: (part, pose, time): PartMotion => ({ opacity: part === pose ? 1 : 0, x: 2 * Math.sin(time * TAU * 0.7), y: 1.5 * Math.sin(time * TAU * 1.1) }),
}

/** The blood on the door: a doorpost, or the lintel above it. */
const bloodMark: PaperPropArt = {
  box: { x: 0, y: 0, w: 20, h: 100 },
  facing: 1,
  poses: ['post', 'lintel'],
  anchor: 'center',
  shadow: false,
  parts: [
    { id: 'post', svg: `<path d="M6 4Q12 2 14 8L14 92Q10 98 6 92Z" fill="#9a1a2a" opacity=".9"/><path d="M8 20L8 40M11 56L11 70" stroke="#c84a4a" stroke-width="1.6"/>` },
    { id: 'lintel', svg: `<path d="M0 47Q10 45.5 20 47L20 51Q10 52.5 0 51Z" fill="#9a1a2a" opacity=".9"/><path d="M5 51L5 54M14 51L14 53" stroke="#9a1a2a" stroke-width="1.2" stroke-linecap="round"/>` },
  ],
  animate: (part, pose): PartMotion => ({ opacity: part === pose ? 1 : 0 }),
}

/** The dishes of the Passover: the roasted lamb, the unleavened bread, the bitter herbs. */
const passoverDish: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 36 },
  facing: 1,
  poses: ['lamb', 'bread', 'herbs'],
  anchor: 'base',
  parts: [
    { id: 'plate', svg: `<ellipse cx="30" cy="30" rx="28" ry="6" fill="#a8743a"/><ellipse cx="30" cy="28" rx="24" ry="4" fill="#c8945a"/>` },
    { id: 'lamb', svg: `<path d="M12 28Q12 14 30 12Q48 14 48 28Z" fill="#9a5a2a"/><path d="M20 20Q30 14 40 20" stroke="#c87a3a" stroke-width="2" fill="none"/>` },
    { id: 'bread', svg: `<ellipse cx="22" cy="24" rx="12" ry="4" fill="#e8c888"/><ellipse cx="38" cy="22" rx="12" ry="4" fill="#d8b878"/>${[18, 24, 34, 40].map((x) => `<circle cx="${x}" cy="23" r=".9" fill="#a8743a"/>`).join('')}` },
    { id: 'herbs', svg: `${[16, 22, 28, 34, 40, 46].map((x, i) => `<path d="M${x} 28Q${x + (i % 2 ? 4 : -4)} 18 ${x + (i % 2 ? 2 : -2)} 10" stroke="${i % 2 ? '#4a8a3a' : '#6aaa4a'}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}` },
  ],
  animate: (part, pose): PartMotion => (part === 'plate' ? {} : { opacity: part === pose ? 1 : 0 }),
}

/** A bundle of stubble, short stalks left in a harvested field. */
const stubble: PaperPropArt = {
  box: { x: 0, y: 0, w: 50, h: 30 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'stalks', svg: Array.from({ length: 11 }, (_, i) => `<path d="M${6 + i * 4} 30L${4 + i * 4 + (i % 3)} ${10 + (i % 4) * 4}" stroke="${i % 2 ? '#c8a04a' : '#a8843a'}" stroke-width="2.4" stroke-linecap="round"/>`).join('') }],
}

/** The pillar of cloud by day, which is fire by night. */
const pillar: PaperPropArt = {
  box: { x: 0, y: 0, w: 80, h: 320 },
  facing: 1,
  poses: ['cloud', 'fire'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'cloud', svg: `<path d="M20 320Q8 240 18 160Q6 90 24 30Q40 0 56 30Q74 90 62 160Q72 240 60 320Z" fill="#e8e4ee" opacity=".88"/><path d="M36 300Q30 200 38 120Q34 60 42 30" stroke="#ffffff" stroke-width="6" fill="none" opacity=".6"/><ellipse cx="40" cy="150" rx="10" ry="40" fill="#ffe8a0" opacity=".5"/>` },
    { id: 'fire', svg: `<path d="M18 320Q4 240 16 160Q4 90 26 30Q40 0 54 30Q76 90 64 160Q76 240 62 320Z" fill="#f08a2a" opacity=".9"/><path d="M28 316Q20 230 30 150Q24 80 40 40Q56 80 50 150Q60 230 52 316Z" fill="#ffd84a" opacity=".95"/>` },
  ],
  animate: (part, pose, time): PartMotion => ({ opacity: part === pose ? 1 : 0, x: (part === 'fire' ? 1.5 : 0.8) * Math.sin(time * TAU * (part === 'fire' ? 1.3 : 0.25)) }),
}

export const plaguesProps: Record<string, PaperPropArt> = { 'plague-sign': plagueSign, frog, swarm, 'blood-mark': bloodMark, 'passover-dish': passoverDish, stubble, pillar }
