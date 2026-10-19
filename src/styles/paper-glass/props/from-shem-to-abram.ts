import type { PaperPropArt } from '../art'

/**
 * Props of Level 2, Episode 7: the camels of Terah's caravan on the road to Haran, loaded
 * with the family's goods.
 */

const TAU = Math.PI * 2
const HIDE = '#b88a52'
const SHADE = '#946a3a'

/** One leg, from the body down to the hoof, turning at the hip as it steps. */
const leg = (x: number, color: string) => `<path d="M${x} 66L${x + 9} 66L${x + 7} 128L${x + 1} 128Z" fill="${color}"/><path d="M${x - 2} 126L${x + 10} 126L${x + 10} 130L${x - 2} 130Z" fill="#5a4028"/>`

/** A camel with a hump, its pack and a striped blanket, facing left; walking, its legs step in pairs. */
const camel: PaperPropArt = {
  box: { x: 0, y: 0, w: 160, h: 130 },
  facing: -1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    { id: 'leg-far-back', pivot: { x: 116, y: 66 }, svg: leg(112, SHADE) },
    { id: 'leg-far-front', pivot: { x: 52, y: 66 }, svg: leg(48, SHADE) },
    {
      id: 'body',
      svg: `<path d="M38 70Q40 40 70 34Q88 6 108 30Q132 34 138 62Q136 80 120 82L50 82Q38 80 38 70Z" fill="${HIDE}"/>
        <path d="M46 52Q30 40 26 22Q24 10 14 10Q4 10 2 18L4 24Q14 22 16 30Q20 50 40 66Z" fill="${HIDE}"/>
        <circle cx="10" cy="15" r="1.6" fill="#2a1e14"/><path d="M14 8L18 2L20 9Z" fill="${SHADE}"/>
        <path d="M68 40L118 40L122 64L64 64Z" fill="#8a3a3a"/><path d="M68 46L120 46M66 54L121 54" stroke="#e2c070" stroke-width="3"/>
        <path d="M84 22Q100 12 112 26L104 40L88 40Z" fill="#a89a7a"/><path d="M90 20L106 34" stroke="#6a5a42" stroke-width="2"/>
        <path d="M138 60Q150 66 146 84" stroke="${SHADE}" stroke-width="3" fill="none"/>`,
    },
    { id: 'leg-near-back', pivot: { x: 124, y: 66 }, svg: leg(120, HIDE) },
    { id: 'leg-near-front', pivot: { x: 60, y: 66 }, svg: leg(56, HIDE) },
  ],
  animate(part, pose, time) {
    if (part === 'body') return pose === 'walk' ? { y: -1.5 * Math.abs(Math.sin(time * TAU * 0.9)) } : { y: 0.6 * Math.sin(time * TAU * 0.25) }
    if (pose !== 'walk') return {}
    // A camel paces: both legs on one side move together.
    const near = part.startsWith('leg-near')
    return { rotate: (near ? 1 : -1) * 13 * Math.sin(time * TAU * 0.9) }
  },
}

export const fromShemToAbramProps: Record<string, PaperPropArt> = { camel }
