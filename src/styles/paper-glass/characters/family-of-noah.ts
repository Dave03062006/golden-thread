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
  const kneel = pose === 'kneel'
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

function person(look: Look): PaperPropArt {
  return {
    box: { x: 0, y: 0, w: 40, h: 120 },
    facing: -1,
    poses: ['idle', 'walk', 'pray', 'work', 'lift', 'kneel', 'carry'],
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
  'king-of-sodom': person({ robe: '#8a2a3a', fold: '#5e1a26', hair: '#1e1614', beard: '#1e1614', sash: '#e0b850' }),
  // The children born after the Flood, drawn smaller in the scene.
  boy: person({ robe: '#b0843e', fold: '#82602a', hair: '#2a1e1a' }),
  girl: person({ robe: '#a8505a', fold: '#7a343c', hair: '#2a1e1a', veil: '#e8d8b8' }),
}
