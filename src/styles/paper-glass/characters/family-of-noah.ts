import type { PaperPropArt, PartMotion } from '../art'

/**
 * The people of Level 2 (Noah and the Nations): Noah and his wife, their three sons and
 * their sons' wives and the children born to them, and later Terah, his sons Abram, Nahor
 * and Haran, Sarai and Lot. Like the first family, they
 * are cut-paper silhouettes with the light catching their outline in gold; now they wear
 * long robes, each in its own color, so the family can be told apart. All face left.
 *
 * They share one figure and one set of poses, the ones the level asks for:
 * - walk: the legs stepping under the robe.
 * - pray: the arm raised toward heaven.
 * - work: the arm swinging a mallet, building.
 * - lift: the arm raised high, sending out or welcoming the dove.
 * - kneel: kneeling low, at the altar.
 * - carry: the arm held out in front, carrying (the cloak, a brick, a basket).
 * - sit: low on the ground, the arm resting: sitting in grief, or keeping someone company.
 */

const TAU = Math.PI * 2
const SKIN = '#3a2a42'
const RIM = '#ffd99a'

interface Look {
  /** The robe's color, and the shade of its folds. */
  robe: string
  fold: string
  /** Hair, and a beard (men) or a veil (women). */
  hair: string
  beard?: string
  veil?: string
  /** A sash at the waist. */
  sash?: string
  /** Shorter figures (the women, the young) are drawn a little smaller in the scene, not here. */
}

const SHOULDER = { x: 11.5, y: 27 }
const HIP = { x: 20, y: 64 }

/** One leg below the robe: from the hip to the foot, turning at the hip as it steps. */
const leg = (x: number) => `
  <path d="M${x} 64L${x + 7} 64L${x + 6.4} 116L${x + 0.8} 116Z" fill="${SKIN}"/>
  <path d="M${x - 2.5} 116L${x + 7} 116L${x + 7} 120L${x - 3.5} 120Z" fill="${SKIN}"/>`

function figure(look: Look): string {
  const head = `
    <rect x="16" y="18" width="7" height="8" fill="${SKIN}"/>
    <circle cx="19.5" cy="12" r="8.6" fill="${SKIN}"/>
    <path d="M11.2 11L8.6 14.2L11.4 15.4Z" fill="${SKIN}"/>
    <path d="M11.4 9C12.4 4 16 2.6 20 2.6C25 2.6 28.6 6 28.6 11.2C27 9 25 8 22 8.6C18 9 14.4 8 11.4 9Z" fill="${look.hair}"/>`
  const beard = look.beard ? `<path d="M10.6 14C10 21 13.4 26 19 26.4C21.6 24 21 19 19.4 17C16 17.6 13 16.4 10.6 14Z" fill="${look.beard}"/>` : ''
  const veil = look.veil
    ? `<path d="M11 6C12 0.6 27.6 0 29.6 8C31 16 31.6 26 30.6 34L25.4 32C26.4 24 26 16 24.4 11C20 9 15 9.6 11 10.4Z" fill="${look.veil}"/>
       <path d="M11 6C12.4 2.6 15.4 1.4 18 1.2" stroke="${RIM}" stroke-width="1.2" fill="none"/>`
    : ''
  const sash = look.sash ? `<path d="M8.4 58L31 58L31 63L8.4 63Z" fill="${look.sash}"/>` : ''
  return `
    ${head}${beard}
    <path d="M10 26C14 23 25 23 29.5 26L31.6 50L33 106L26 109L20 106L14 109L7 106L8 50Z" fill="${look.robe}"/>
    <path d="M14 34L13 104M21 32L21 105M27 34L28 104" stroke="${look.fold}" stroke-width="1.4" opacity=".7"/>
    ${sash}${veil}
    <g stroke="${RIM}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".92">
      <path d="M12.6 5.6C10.6 8.6 10 13 12.6 18"/>
      <path d="M9.6 28C8.6 40 8.2 70 7.2 105"/>
    </g>`
}

const ARM = `
  <path d="M8.6 26.4C11 24.6 15 25.6 15 29L13.8 58.4C13.2 61.6 9.6 61.6 9.6 58.4Z" fill="${SKIN}"/>
  <path d="M9.8 30L9.9 57.6" stroke="${RIM}" stroke-width="1.4" stroke-linecap="round" opacity=".92"/>`

/** A wooden mallet in the hand, for building the ark. */
const MALLET = `<path d="M11 58L11 70" stroke="#7a5a32" stroke-width="2.2" stroke-linecap="round"/><path d="M5 68L17 68L17 75L5 75Z" fill="#8a6a42"/>`

function moving(part: string, pose: string, time: number): PartMotion {
  const breath = Math.sin(time * TAU * 0.24)
  const kneel = pose === 'kneel' || pose === 'sit'
  if (part === 'leg-front' || part === 'leg-back') {
    // Kneeling, the robe comes down to the ground and hides the legs folded under it.
    if (kneel) return { y: 30, opacity: 0 }
    if (pose === 'walk') return { rotate: (part === 'leg-front' ? 1 : -1) * 14 * Math.sin(time * TAU * 1.1) }
    return {}
  }
  const low = kneel ? 30 : 0
  const step = pose === 'walk' ? Math.abs(Math.sin(time * TAU * 1.1)) * -1.2 : 0
  if (part === 'arm' || part === 'mallet') {
    if (part === 'mallet' && pose !== 'work') return { opacity: 0 }
    if (pose === 'sit') return { y: low, rotate: 22 + 1.5 * breath }
    if (pose === 'pray' || pose === 'kneel') return { y: low, rotate: 150 + 3 * Math.sin(time * TAU * 0.2) }
    if (pose === 'lift') return { rotate: 168 + 2 * Math.sin(time * TAU * 0.3) }
    if (pose === 'work') return { rotate: 60 + 40 * Math.sin(time * TAU * 0.9) }
    if (pose === 'carry') return { rotate: 75 + 2 * breath }
    if (pose === 'walk') return { y: step, rotate: 10 * Math.sin(time * TAU * 1.1 + Math.PI) }
    return { rotate: 2.4 * Math.sin(time * TAU * 0.24 + 0.6), y: 0.45 * breath }
  }
  if (part === 'body') return { y: low + step + (kneel ? 0 : 0.45 * breath) }
  return {}
}

/**
 * Several people standing together, drawn as one cut-paper piece in two layers rather than
 * a puppet each: a whole family can stand in a scene for the cost of one figure.
 */
function band(looks: Look[], spacing = 30): PaperPropArt {
  const at = (look: Look, i: number) => `<g transform="translate(${i * spacing} ${i % 2 ? 2 : 0})">${leg(21)}${leg(12.5)}${figure(look)}${ARM}</g>`
  const layer = (odd: number) => looks.map((look, i) => (i % 2 === odd ? at(look, i) : '')).join('')
  return {
    box: { x: 0, y: 0, w: 40 + (looks.length - 1) * spacing, h: 122 },
    facing: -1,
    poses: ['idle', 'walk'],
    anchor: 'base',
    parts: [
      { id: 'back', svg: layer(1) },
      { id: 'front', svg: layer(0) },
    ],
    // Standing, they shift their weight a little; walking, they bob, out of step with each other.
    animate: (part, pose, time) => {
      const phase = part === 'back' ? 1.3 : 0
      return { y: pose === 'walk' ? -2.4 * Math.abs(Math.sin(time * TAU * 1.6 + phase)) : 0.6 * Math.sin(time * TAU * 0.3 + phase) }
    },
  }
}

function person(look: Look): PaperPropArt {
  return {
    box: { x: 0, y: 0, w: 40, h: 120 },
    facing: -1,
    poses: ['idle', 'walk', 'pray', 'work', 'lift', 'kneel', 'carry', 'sit'],
    anchor: 'base',
    parts: [
      { id: 'leg-back', pivot: HIP, svg: leg(21) },
      { id: 'leg-front', pivot: HIP, svg: leg(12.5) },
      { id: 'body', svg: figure(look) },
      { id: 'mallet', pivot: SHOULDER, svg: MALLET },
      { id: 'arm', pivot: SHOULDER, svg: ARM },
    ],
    animate: moving,
  }
}

export const familyOfNoah: Record<string, PaperPropArt> = {
  noah: person({ robe: '#5e5276', fold: '#3e3456', hair: '#e8e2d6', beard: '#e8e2d6', sash: '#a8843a' }),
  'noahs-wife': person({ robe: '#7a3a4a', fold: '#56242e', hair: '#bfb3a2', veil: '#cbbd9e' }),
  shem: person({ robe: '#3a5a7e', fold: '#243c58', hair: '#2a1e22', beard: '#2a1e22', sash: '#c8a860' }),
  ham: person({ robe: '#7a5a2e', fold: '#563c1a', hair: '#1e1614', beard: '#1e1614' }),
  japheth: person({ robe: '#3c6a4a', fold: '#244a30', hair: '#3a2a1e', beard: '#3a2a1e' }),
  'sons-wife': person({ robe: '#8a6a4a', fold: '#64482e', hair: '#2a1e1a', veil: '#d8c8a8' }),
  terah: person({ robe: '#6a5a3a', fold: '#483c24', hair: '#ded6c8', beard: '#ded6c8' }),
  abram: person({ robe: '#4a3a6a', fold: '#2e2448', hair: '#241a18', beard: '#241a18', sash: '#c89a4a' }),
  sarai: person({ robe: '#2e4a7a', fold: '#1c3054', hair: '#241a18', veil: '#e2d6bc' }),
  lot: person({ robe: '#6a7a3a', fold: '#4a5824', hair: '#3a2618' }),
  // Terah's other sons, Abram's brothers.
  nahor: person({ robe: '#4a6a7a', fold: '#2e4a58', hair: '#2a1e1a', beard: '#2a1e1a' }),
  haran: person({ robe: '#8a4a3a', fold: '#643026', hair: '#2a1e1a', beard: '#2a1e1a' }),
  // Melchizedek, priest-king of Salem, in white and gold; and the king of Sodom, in rich red.
  melchizedek: person({ robe: '#efe8d8', fold: '#c8bca4', hair: '#f4f0e8', beard: '#f4f0e8', sash: '#d4a840' }),
  // Hagar, Sarai's Egyptian maid, in white linen.
  // Lot's wife and his daughters.
  'lots-wife': person({ robe: '#6a5a7a', fold: '#4a3c58', hair: '#2a1e1a', veil: '#a89ab8' }),
  'lots-daughter': person({ robe: '#7a8a5a', fold: '#58663c', hair: '#2a1e1a', veil: '#d8d0b0' }),
  // Isaac grown to a young man, and a servant of Abraham's household.
  isaac: person({ robe: '#c8843a', fold: '#9a6024', hair: '#2a1e1a', sash: '#f0d080' }),
  servant: person({ robe: '#8a7a62', fold: '#665a46', hair: '#2a1e1a', beard: '#2a1e1a' }),
  hagar: person({ robe: '#e8e0cc', fold: '#c0b496', hair: '#1a1210', veil: '#2a6a8a' }),
  'king-of-sodom': person({ robe: '#8a2a3a', fold: '#5e1a26', hair: '#1e1614', beard: '#1e1614', sash: '#e0b850' }),
  // Level 4 · Isaac and Jacob: Abraham, very old; Rebekah, and her brother Laban and father
  // Bethuel; Ishmael grown; Isaac old and blind; the twins, Esau the red-haired hunter and
  // Jacob, young and later grown; Rachel and Leah, and a maid; and the stranger at the Jabbok.
  'abraham-old': person({ robe: '#4a3a6a', fold: '#2e2448', hair: '#ece6dc', beard: '#ece6dc', sash: '#c89a4a' }),
  rebekah: person({ robe: '#2a6a6a', fold: '#184a4a', hair: '#241a18', veil: '#e8c8a0' }),
  laban: person({ robe: '#7a6a2a', fold: '#5a4c18', hair: '#3a2a1a', beard: '#3a2a1a', sash: '#b03a3a' }),
  bethuel: person({ robe: '#5a5a4a', fold: '#3e3e30', hair: '#d8d0c0', beard: '#d8d0c0' }),
  ishmael: person({ robe: '#e0d4b8', fold: '#b8aa8a', hair: '#1a1210', beard: '#1a1210', sash: '#2a6a8a' }),
  'isaac-old': person({ robe: '#c8843a', fold: '#9a6024', hair: '#e8e2d6', beard: '#e8e2d6', sash: '#f0d080' }),
  esau: person({ robe: '#8a3a2a', fold: '#64261a', hair: '#b4482a', beard: '#b4482a', sash: '#5a3a1a' }),
  jacob: person({ robe: '#3c5a8a', fold: '#263e64', hair: '#2a1e1a', sash: '#d0b060' }),
  'jacob-grown': person({ robe: '#3c5a8a', fold: '#263e64', hair: '#3a2a22', beard: '#3a2a22', sash: '#d0b060' }),
  rachel: person({ robe: '#a84a6a', fold: '#7a3048', hair: '#241a18', veil: '#f0dcc0' }),
  leah: person({ robe: '#5a6aa8', fold: '#3a4a80', hair: '#2a1e1a', veil: '#d8d0e8' }),
  maid: person({ robe: '#8a7a5a', fold: '#665a40', hair: '#2a1e1a', veil: '#c8b890' }),
  stranger: person({ robe: '#2a2a4a', fold: '#1a1a30', hair: '#1a1a30', beard: '#1a1a30' }),
  // Level 5 · Joseph and His Brothers: Joseph young in his long robe, as a slave, as
  // governor of Egypt in white linen and a headcloth, and old; Jacob grown old; the brothers;
  // and the Egyptians: Potiphar, the prison keeper and a prisoner, Pharaoh's butler and
  // baker, Pharaoh in his striped headcloth, and Joseph's steward.
  'joseph-young': person({ robe: '#8a3aa0', fold: '#e0b040', hair: '#2a1e1a', sash: '#3a9ad0' }),
  'joseph-slave': person({ robe: '#d8ccb0', fold: '#b0a486', hair: '#2a1e1a' }),
  'joseph-egypt': person({ robe: '#f4f0e6', fold: '#d0c8b4', hair: '#2a1e1a', veil: '#3a6aa8', sash: '#d8a840' }),
  'joseph-old': person({ robe: '#f4f0e6', fold: '#d0c8b4', hair: '#e8e2d6', veil: '#3a6aa8', sash: '#d8a840' }),
  'jacob-old': person({ robe: '#3c5a8a', fold: '#263e64', hair: '#e8e2d6', beard: '#e8e2d6', sash: '#d0b060' }),
  reuben: person({ robe: '#6a7a3a', fold: '#4a5824', hair: '#3a2a1e', beard: '#3a2a1e' }),
  judah: person({ robe: '#8a3a3a', fold: '#642626', hair: '#2a1e1a', beard: '#2a1e1a', sash: '#e0b850' }),
  simeon: person({ robe: '#4a6a7a', fold: '#2e4a58', hair: '#2a1e1a', beard: '#2a1e1a' }),
  benjamin: person({ robe: '#a85a3a', fold: '#7a3e26', hair: '#2a1e1a', sash: '#f0d080' }),
  brother: person({ robe: '#7a6a4a', fold: '#58492e', hair: '#2a1e1a', beard: '#2a1e1a' }),
  potiphar: person({ robe: '#efe6cc', fold: '#c8bc9a', hair: '#1a1210', sash: '#c03a3a' }),
  keeper: person({ robe: '#8a7a62', fold: '#665a46', hair: '#1a1210', sash: '#5a4030' }),
  prisoner: person({ robe: '#6a6058', fold: '#4a423c', hair: '#2a1e1a', beard: '#2a1e1a' }),
  butler: person({ robe: '#c8a050', fold: '#9a7834', hair: '#1a1210', sash: '#8a2a3a' }),
  baker: person({ robe: '#e8d8b8', fold: '#c0ae8a', hair: '#1a1210', sash: '#a8743a' }),
  pharaoh: person({ robe: '#f4f0e6', fold: '#d0c8b4', hair: '#1a1210', veil: '#e0b040', sash: '#2a5aa0' }),
  steward: person({ robe: '#d8ccb0', fold: '#b0a486', hair: '#1a1210', sash: '#3a8a8a' }),
  // Level 6 · Job: Job in his fine robe, in sackcloth among the ashes, and white-haired at
  // the end; his wife, veiled in mourning; his three friends, Eliphaz the eldest, Bildad and
  // Zophar; a messenger, dusty from the road; and one of his daughters.
  job: person({ robe: '#3a4a7a', fold: '#26325a', hair: '#a8a49c', beard: '#a8a49c', sash: '#d8b050' }),
  'job-mourning': person({ robe: '#7a6e5c', fold: '#5a503e', hair: '#a8a49c', beard: '#a8a49c' }),
  'job-old': person({ robe: '#3a4a7a', fold: '#26325a', hair: '#ece8e0', beard: '#ece8e0', sash: '#d8b050' }),
  'jobs-wife': person({ robe: '#6a4a6a', fold: '#4a304a', hair: '#2a1e1a', veil: '#5a5a6a' }),
  eliphaz: person({ robe: '#8a2a3a', fold: '#641c28', hair: '#d8d4cc', beard: '#d8d4cc', sash: '#e0b850' }),
  bildad: person({ robe: '#3a6a4a', fold: '#244a32', hair: '#3a2a1e', beard: '#3a2a1e', sash: '#c8a050' }),
  zophar: person({ robe: '#b88a3a', fold: '#8a6424', hair: '#1a1210', beard: '#1a1210', sash: '#3a5a8a' }),
  messenger: person({ robe: '#b8a888', fold: '#8a7c60', hair: '#2a1e1a' }),
  daughter: person({ robe: '#a84a6a', fold: '#7a3048', hair: '#2a1e1a', veil: '#f0e0c8' }),
  // Job's seven sons, three daughters and his servants, each drawn as one band.
  'jobs-sons': band([
    { robe: '#5a6a3a', fold: '#3e4c26', hair: '#2a1e1a', beard: '#2a1e1a' },
    { robe: '#7a4a3a', fold: '#5a3426', hair: '#1a1210', beard: '#1a1210', sash: '#d8b050' },
    { robe: '#3a5a7a', fold: '#264058', hair: '#2a1e1a', beard: '#2a1e1a' },
    { robe: '#8a7a4a', fold: '#665a32', hair: '#3a2a1e', beard: '#3a2a1e', sash: '#3a6a8a' },
    { robe: '#6a3a5a', fold: '#4c2640', hair: '#1a1210', beard: '#1a1210' },
    { robe: '#4a6a5a', fold: '#304c40', hair: '#2a1e1a', beard: '#2a1e1a', sash: '#c8a050' },
    { robe: '#9a5a32', fold: '#743e20', hair: '#2a1e1a' },
  ]),
  'jobs-servants': band([
    { robe: '#b8a888', fold: '#8a7c60', hair: '#2a1e1a', beard: '#2a1e1a' },
    { robe: '#a89878', fold: '#7c6e54', hair: '#1a1210', sash: '#7a5a3a' },
    { robe: '#c4b494', fold: '#968a6a', hair: '#2a1e1a', beard: '#2a1e1a' },
  ]),
  'jobs-daughters': band([
    { robe: '#a84a6a', fold: '#7a3048', hair: '#2a1e1a', veil: '#f0e0c8' },
    { robe: '#4a7aa0', fold: '#305a7a', hair: '#1a1210', veil: '#e8e0f0' },
    { robe: '#c08a3a', fold: '#946424', hair: '#2a1e1a', veil: '#f4ecd8' },
  ]),
  // Level 7 · Moses Is Called: the midwives Shiphrah and Puah; a watchman and a taskmaster
  // of Pharaoh's; a Hebrew slave; Moses' mother and his sister; Pharaoh's daughter; Moses as
  // a prince of Egypt and as an old shepherd; Jethro and Zipporah; Aaron; an elder of Israel.
  shiphrah: person({ robe: '#4a7a8a', fold: '#305a68', hair: '#2a1e1a', veil: '#e8dcc4' }),
  puah: person({ robe: '#9a5a4a', fold: '#743e32', hair: '#1a1210', veil: '#d8cce0' }),
  watchman: person({ robe: '#3a3a4a', fold: '#26263a', hair: '#1a1210', veil: '#4a4a5a', sash: '#a8743a' }),
  taskmaster: person({ robe: '#efe6cc', fold: '#c8bc9a', hair: '#1a1210', sash: '#a83a3a' }),
  slave: person({ robe: '#a89878', fold: '#7c6e54', hair: '#2a1e1a', beard: '#2a1e1a' }),
  'moses-mother': person({ robe: '#5a6a8a', fold: '#3e4c68', hair: '#2a1e1a', veil: '#e0d4bc' }),
  miriam: person({ robe: '#c07a4a', fold: '#945a32', hair: '#2a1e1a', veil: '#f0e4c8' }),
  princess: person({ robe: '#f6f2e8', fold: '#d4ccb8', hair: '#1a1210', veil: '#e0b040', sash: '#3a8a9a' }),
  'moses-prince': person({ robe: '#f4f0e6', fold: '#d0c8b4', hair: '#2a1e1a', beard: '#2a1e1a', veil: '#3a6aa8', sash: '#d8a840' }),
  'moses-shepherd': person({ robe: '#7a5a3a', fold: '#5a4026', hair: '#d0ccc4', beard: '#d0ccc4', sash: '#c8a050' }),
  jethro: person({ robe: '#6a3a5a', fold: '#4c2640', hair: '#ece8e0', beard: '#ece8e0', veil: '#e0d0b0' }),
  zipporah: person({ robe: '#3a7a5a', fold: '#265a40', hair: '#1a1210', veil: '#e8c870' }),
  aaron: person({ robe: '#3a5a9a', fold: '#264078', hair: '#b8b4ac', beard: '#b8b4ac', sash: '#d8b050' }),
  elder: person({ robe: '#8a7a5a', fold: '#665a40', hair: '#d8d4cc', beard: '#d8d4cc', veil: '#c8bc9a' }),
  // Level 8 · The Plagues and the Passover: Pharaoh's magicians, in white linen with the
  // leopard-skin sash of a priest; a Hebrew father and mother at the Passover.
  magician: person({ robe: '#f0ead8', fold: '#c8bea4', hair: '#1a1210', sash: '#c8943a' }),
  'hebrew-father': person({ robe: '#6a7a3a', fold: '#4c5a26', hair: '#2a1e1a', beard: '#2a1e1a', sash: '#a8743a' }),
  'hebrew-mother': person({ robe: '#a84a5a', fold: '#7a3040', hair: '#2a1e1a', veil: '#f0e0c8' }),
  // Level 9 · Through the Sea: Miriam, now old, with her timbrel; a grandmother of the camp;
  // Joshua, a strong young man; Hur; the women who dance with Miriam; the warriors of Amalek.
  'miriam-old': person({ robe: '#c07a4a', fold: '#945a32', hair: '#d8d4cc', veil: '#f0e4c8', sash: '#d8b050' }),
  grandmother: person({ robe: '#6a5a7a', fold: '#4c3e5a', hair: '#e0dcd4', veil: '#d8ccb8' }),
  joshua: person({ robe: '#8a5a32', fold: '#664020', hair: '#2a1e1a', beard: '#2a1e1a', sash: '#a83a3a' }),
  hur: person({ robe: '#4a7a6a', fold: '#305a4c', hair: '#b8b4ac', beard: '#b8b4ac', sash: '#c8a050' }),
  'hebrew-women': band([
    { robe: '#a84a5a', fold: '#7a3040', hair: '#2a1e1a', veil: '#f0e0c8' },
    { robe: '#4a6a8a', fold: '#304c68', hair: '#1a1210', veil: '#e8e0f0' },
    { robe: '#c08a3a', fold: '#946424', hair: '#2a1e1a', veil: '#f4ecd8' },
    { robe: '#6a7a3a', fold: '#4c5a26', hair: '#1a1210', veil: '#e0d4bc' },
  ]),
  // Level 10 · Sinai: the seventy elders of Israel, and Moses with his face veiled.
  elders: band([
    { robe: '#8a7a5a', fold: '#665a40', hair: '#d8d4cc', beard: '#d8d4cc', veil: '#c8bc9a' },
    { robe: '#6a5a7a', fold: '#4c3e5a', hair: '#e0dcd4', beard: '#e0dcd4' },
    { robe: '#7a6a4a', fold: '#5a4c32', hair: '#c8c4bc', beard: '#c8c4bc', veil: '#d8ccb0' },
    { robe: '#5a6a5a', fold: '#3e4c3e', hair: '#d8d4cc', beard: '#d8d4cc' },
  ]),
  'moses-veiled': person({ robe: '#7a5a3a', fold: '#5a4026', hair: '#d0ccc4', beard: '#f4f0e6', veil: '#f4f0e6', sash: '#c8a050' }),
  // Level 11 · The Tabernacle and the Holy Life: Aaron in plain linen and in his holy garments;
  // Bezalel and Oholiab; a priest, one of Aaron's sons; a widow, a poor man and a stranger.
  'aaron-linen': person({ robe: '#f4efe2', fold: '#d8d0c0', hair: '#b8b4ac', beard: '#b8b4ac', veil: '#ffffff', sash: '#e8e0d0' }),
  'high-priest': person({ robe: '#3a5aa8', fold: '#264078', hair: '#b8b4ac', beard: '#b8b4ac', veil: '#f4efe2', sash: '#e0b040' }),
  bezalel: person({ robe: '#a8743a', fold: '#7a5226', hair: '#2a1e1a', beard: '#2a1e1a', sash: '#e0b040' }),
  oholiab: person({ robe: '#6a3a7a', fold: '#4c2a5a', hair: '#1a1416', beard: '#1a1416', sash: '#b8323a' }),
  priest: person({ robe: '#f4efe2', fold: '#d8d0c0', hair: '#2a1e1a', veil: '#ffffff', sash: '#3a5aa8' }),
  widow: person({ robe: '#3a3c4a', fold: '#26283a', hair: '#c8c4bc', veil: '#1a1c26' }),
  'poor-man': person({ robe: '#a88a5a', fold: '#7a6440', hair: '#6a6a72', beard: '#6a6a72' }),
  sojourner: person({ robe: '#2a7a7a', fold: '#1a5a5a', hair: '#1a1416', beard: '#1a1416', veil: '#e0782a' }),
  // Level 12 · Forty Years in the Wilderness: Korah; Caleb; Eleazar, Aaron's son; Balaam the
  // seer; Balak, king of Moab.
  korah: person({ robe: '#a83a3a', fold: '#7a2626', hair: '#1a1416', beard: '#1a1416', sash: '#e0b040' }),
  caleb: person({ robe: '#4a7a3a', fold: '#345a26', hair: '#6a3a1a', beard: '#6a3a1a', sash: '#d8b880' }),
  eleazar: person({ robe: '#f4efe2', fold: '#d8d0c0', hair: '#2a1e1a', beard: '#2a1e1a', veil: '#ffffff', sash: '#3a5aa8' }),
  balaam: person({ robe: '#6a3a7a', fold: '#4c2a5a', hair: '#c8c4bc', beard: '#c8c4bc', veil: '#e0b040', sash: '#e0782a' }),
  balak: person({ robe: '#a83a3a', fold: '#7a2626', hair: '#1a1416', beard: '#1a1416', veil: '#f4d070', sash: '#e0b040' }),
  // Level 13 · Moses' Last Words: Moses at a hundred and twenty, white-haired, "his eye not dim."
  'moses-old': person({ robe: '#7a5a3a', fold: '#5a4026', hair: '#f4f0e6', beard: '#f4f0e6', sash: '#c8a050' }),
  // Level 14: Rahab of Jericho; Achan; Caleb at eighty-five; Joshua grown old.
  rahab: person({ robe: '#6a3a6a', fold: '#4a264a', hair: '#1a1416', veil: '#b8323a', sash: '#e0b040' }),
  achan: person({ robe: '#7a6248', fold: '#5a4632', hair: '#1a1416', beard: '#1a1416', sash: '#3a3c4a' }),
  'caleb-old': person({ robe: '#4a7a3a', fold: '#345a26', hair: '#f4f0e6', beard: '#f4f0e6', sash: '#d8b880' }),
  'joshua-old': person({ robe: '#8a5a32', fold: '#664020', hair: '#f4f0e6', beard: '#f4f0e6', sash: '#a83a3a' }),
  // Level 15: the judges Deborah, Barak, Gideon, Jephthah and Samson (and Samson shorn); Jephthah's daughter; Delilah; Micah; the young Levite.
  deborah: person({ robe: '#3a6a5a', fold: '#264a3e', hair: '#2a1e1a', veil: '#e8d8a8', sash: '#c8a040' }),
  barak: person({ robe: '#8a3a2a', fold: '#64261a', hair: '#241a16', beard: '#241a16', sash: '#c8b080' }),
  gideon: person({ robe: '#a8844a', fold: '#7a5e30', hair: '#3a2618', beard: '#3a2618', sash: '#5a6a3a' }),
  jephthah: person({ robe: '#3a3a4a', fold: '#24242e', hair: '#1a1416', beard: '#1a1416', sash: '#8a2a2a' }),
  'jephthahs-daughter': person({ robe: '#e8dcc4', fold: '#c4b494', hair: '#2a1e1a', veil: '#d88a9a', sash: '#4a7ab8' }),
  samson: person({ robe: '#7a4a2a', fold: '#56321a', hair: '#1a1210', beard: '#1a1210', sash: '#d8a040' }),
  'samson-shorn': person({ robe: '#6a5a4a', fold: '#4a3e32', hair: '#c89a7a', beard: '#3a2a20' }),
  delilah: person({ robe: '#8a2a5a', fold: '#641a40', hair: '#1a1416', veil: '#e0b040', sash: '#e0b040' }),
  micah: person({ robe: '#6a6a3a', fold: '#4a4a24', hair: '#3a2a1e', beard: '#3a2a1e', sash: '#b8b8c8' }),
  levite: person({ robe: '#d8d0c0', fold: '#b0a690', hair: '#2a1e1a', sash: '#3a5a8a' }),
  // Level 16: Naomi; Ruth and Orpah, her daughters-in-law from Moab; Boaz.
  naomi: person({ robe: '#4a4a6a', fold: '#32324a', hair: '#cfc8bc', veil: '#7a6a8a' }),
  ruth: person({ robe: '#b8643a', fold: '#8a4626', hair: '#2a1a14', veil: '#e8c870', sash: '#6a8a3a' }),
  orpah: person({ robe: '#5a7a8a', fold: '#3e5a66', hair: '#241a16', veil: '#c8b8a0' }),
  boaz: person({ robe: '#6a4a7a', fold: '#4a3058', hair: '#bab4a8', beard: '#bab4a8', sash: '#d8b048' }),
  amalekites: band([
    { robe: '#5a3a3a', fold: '#3e2626', hair: '#1a1210', beard: '#1a1210', veil: '#3a2a2a' },
    { robe: '#6a4a3a', fold: '#4c3226', hair: '#1a1210', beard: '#1a1210', veil: '#4a3a2a' },
    { robe: '#4a3a4a', fold: '#322632', hair: '#1a1210', beard: '#1a1210', veil: '#2a2a3a' },
    { robe: '#5a4a3a', fold: '#3e3226', hair: '#1a1210', beard: '#1a1210', veil: '#3a3a2a' },
  ]),
  // Hebrew families in Goshen, slaves at the brick pits, and the seven daughters of Reuel.
  'hebrew-family': band([
    { robe: '#6a7a3a', fold: '#4c5a26', hair: '#2a1e1a', beard: '#2a1e1a' },
    { robe: '#a84a5a', fold: '#7a3040', hair: '#2a1e1a', veil: '#f0e0c8' },
    { robe: '#c08a3a', fold: '#946424', hair: '#2a1e1a' },
    { robe: '#4a6a8a', fold: '#304c68', hair: '#1a1210', veil: '#e8e0f0' },
  ]),
  'hebrew-workers': band([
    { robe: '#a89878', fold: '#7c6e54', hair: '#2a1e1a', beard: '#2a1e1a' },
    { robe: '#8a7a5a', fold: '#665a40', hair: '#1a1210', beard: '#1a1210' },
    { robe: '#b8a888', fold: '#8a7c60', hair: '#2a1e1a' },
    { robe: '#9a8868', fold: '#706248', hair: '#3a2a1e', beard: '#3a2a1e' },
    { robe: '#a89070', fold: '#7c6a50', hair: '#1a1210', beard: '#1a1210' },
  ]),
  'reuel-daughters': band([
    { robe: '#3a7a5a', fold: '#265a40', hair: '#1a1210', veil: '#e8c870' },
    { robe: '#a84a6a', fold: '#7a3048', hair: '#2a1e1a', veil: '#f0e0c8' },
    { robe: '#4a6a9a', fold: '#304c78', hair: '#1a1210', veil: '#e8e0f0' },
    { robe: '#c07a3a', fold: '#945a24', hair: '#2a1e1a', veil: '#f4ecd8' },
    { robe: '#6a4a7a', fold: '#4c3058', hair: '#1a1210', veil: '#e0d4bc' },
    { robe: '#9a6a3a', fold: '#744c24', hair: '#2a1e1a', veil: '#f0e4c8' },
    { robe: '#3a8a8a', fold: '#266868', hair: '#1a1210', veil: '#e8dcc4' },
  ]),
  // The children born after the Flood, drawn smaller in the scene.
  boy: person({ robe: '#b0843e', fold: '#82602a', hair: '#2a1e1a' }),
  girl: person({ robe: '#a8505a', fold: '#7a343c', hair: '#2a1e1a', veil: '#e8d8b8' }),
}
