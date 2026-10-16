import type { PaperPropArt, PartMotion } from '../art'

/**
 * The man and the woman of day six, and of the garden. They are shown as cut-paper silhouettes, standing
 * in the light and turned toward it: the light catches their outline in gold, and no
 * more detail than that is drawn (spec §6). Both face left, toward the first light.
 */

const TAU = Math.PI * 2
const SKIN = '#3a2a42'
const HAIR = '#261b2c'
const RIM = '#ffd99a'

/** Standing in the light, breathing slowly. */
function breathing(part: string, _pose: string, time: number): PartMotion {
  const breath = Math.sin(time * TAU * 0.24)
  if (part === 'body') return { y: 0.45 * breath }
  if (part === 'arm') return { rotate: 2.4 * Math.sin(time * TAU * 0.24 + 0.6), y: 0.45 * breath }
  return {}
}

/** The poses after the Fall, when they have covered themselves with fig leaves (Genesis 3:7). */
const COVERED = new Set(['ashamed', 'hide', 'point'])

/**
 * How the man and the woman move. Both face left, so turning the arm forward (toward the
 * way they face) is a positive turn at the shoulder.
 * - reach: the arm stretched out and up, toward the fruit.
 * - ashamed: covered, the arm drawn in across the body, a little bowed.
 * - hide: covered, crouched low among the trees.
 * - point: covered, the arm straight out, blaming.
 */
function moving(part: string, pose: string, time: number): PartMotion {
  if (part === 'leaves') return COVERED.has(pose) ? { opacity: 1, y: pose === 'hide' ? 40 : 0 } : { opacity: 0 }
  const rest = breathing(part, pose, time)
  if (pose === 'reach') return part === 'arm' ? { rotate: 120 + 3 * Math.sin(time * TAU * 0.3) } : rest
  if (pose === 'point') return part === 'arm' ? { rotate: 88 } : rest
  if (pose === 'ashamed') return part === 'arm' ? { x: 6, y: 1, rotate: -14 } : { y: 1 + (rest.y ?? 0) }
  if (pose === 'hide') return part === 'arm' ? { x: 5, y: 40, rotate: 35 } : { y: 40 + (rest.y ?? 0) }
  return rest
}

/** A girdle of fig leaves sewn together, across the hips from x0 to x1 at height y. */
function figLeaves(x0: number, x1: number, y: number): string {
  const count = 5
  let out = `<path d="M${x0} ${y}L${x1} ${y}" stroke="#3c5a2a" stroke-width="1.2"/>`
  for (let i = 0; i < count; i++) {
    const x = x0 + ((x1 - x0) * (i + 0.5)) / count
    const tilt = (i - (count - 1) / 2) * 9
    out += `<g transform="translate(${x.toFixed(1)} ${y}) rotate(${tilt})">
      <path d="M0 0C-4 2 -5.5 6 -4 9C-5 11 -3 13.5 0 14C3 13.5 5 11 4 9C5.5 6 4 2 0 0Z" fill="${i % 2 ? '#5a8c3e' : '#4a7c34'}"/>
      <path d="M0 1L0 12.5M0 6L-2.6 8.4M0 6L2.6 8.4" stroke="#2e4a20" stroke-width=".6" fill="none"/>
    </g>`
  }
  return out
}

/**
 * The man in the deep sleep the LORD God cast upon him (Genesis 2:21): lying on his side
 * on the ground, his arm along him, breathing slowly.
 */
function manMotion(part: string, pose: string, time: number): PartMotion {
  if (pose !== 'sleep') return moving(part, pose, time)
  const breath = Math.sin(time * TAU * 0.16)
  if (part === 'body') return { rotate: -90, y: 48 + 0.6 * breath }
  return { opacity: 0 }
}

const man: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 120 },
  facing: -1,
  poses: ['idle', 'sleep', 'reach', 'ashamed', 'hide', 'point'],
  anchor: 'base',
  parts: [
    {
      id: 'body',
      svg: `
        <path d="M28 27L31.5 30L30.5 58L27 58Z" fill="${SKIN}"/>
        <path d="M12 62L19.5 62L18.6 116L12.8 116Z" fill="${SKIN}"/>
        <path d="M20.5 62L28 62L27.2 116L21.4 116Z" fill="${SKIN}"/>
        <path d="M9.5 116L19 116L19 120L8.5 120Z" fill="${SKIN}"/>
        <path d="M20 116L27.5 116L27.5 120L19.5 120Z" fill="${SKIN}"/>
        <path d="M9 27C12 23.5 26 23.5 30 27L28.5 63L11.5 63Z" fill="${SKIN}"/>
        <rect x="16" y="18" width="7" height="8" fill="${SKIN}"/>
        <circle cx="19.5" cy="12" r="8.6" fill="${SKIN}"/>
        <path d="M11.2 11L8.6 14.2L11.4 15.4Z" fill="${SKIN}"/>
        <path d="M11.4 9C12.4 4 16 2.6 20 2.6C25 2.6 28.6 6 28.6 11.2C27 9 25 8 22 8.6C18 9 14.4 8 11.4 9Z" fill="${HAIR}"/>
        <g stroke="${RIM}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".92">
          <path d="M12.6 5.6C10.6 8.6 10 13 12.6 18"/>
          <path d="M9.4 27.6C10.6 25.6 12.4 24.8 14 24.6"/>
          <path d="M12.4 64L13 115.4"/>
          <path d="M9.4 118.6L12 118.6"/>
        </g>`,
    },
    { id: 'leaves', svg: figLeaves(10.5, 29.5, 57) },
    {
      id: 'arm',
      pivot: { x: 11.5, y: 27 },
      svg: `
        <path d="M9 26.4C11 25 14.4 26 14.4 29L13.2 58.4C12.6 61.4 9.6 61.4 9.6 58.4Z" fill="${SKIN}"/>
        <path d="M9.8 30L9.9 57.6" stroke="${RIM}" stroke-width="1.4" stroke-linecap="round" opacity=".92"/>`,
    },
  ],
  animate: manMotion,
}

const woman: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 114 },
  facing: -1,
  poses: ['idle', 'reach', 'ashamed', 'hide', 'point'],
  anchor: 'base',
  parts: [
    {
      id: 'body',
      svg: `
        <path d="M12.4 10C12.4 4 16.4 2 20.4 2C26.4 2 29.6 6.4 29.6 12.4C30.6 22 31.6 36 30.8 57L26.4 57C27.4 40 26.4 27 25.4 19Z" fill="${HAIR}"/>
        <path d="M27 27L30 30L29.2 54L26 54Z" fill="${SKIN}"/>
        <path d="M13.4 63L19.8 63L19 110.4L14 110.4Z" fill="${SKIN}"/>
        <path d="M20.6 63L27 63L26.2 110.4L21.2 110.4Z" fill="${SKIN}"/>
        <path d="M10.8 110.4L19.4 110.4L19.4 114L10 114Z" fill="${SKIN}"/>
        <path d="M20.6 110.4L27 110.4L27 114L20 114Z" fill="${SKIN}"/>
        <path d="M11.6 27C14.4 24 24 24 27.4 27L26.6 50C28.2 56 29 60 28 64L12 64C11.2 60 12 56 13.4 50Z" fill="${SKIN}"/>
        <rect x="17" y="17.6" width="6" height="8" fill="${SKIN}"/>
        <circle cx="20" cy="11.6" r="7.8" fill="${SKIN}"/>
        <path d="M12.6 10.8L10.4 13.6L12.8 14.6Z" fill="${SKIN}"/>
        <path d="M12.4 9.4C13.2 4.4 16.6 2.6 20.4 2.6C25 2.6 28.4 5.6 28.6 10.4C26.4 8.4 23.4 7.4 20.4 8C17.6 8.6 15 9 12.4 9.4Z" fill="${HAIR}"/>
        <g stroke="${RIM}" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".92">
          <path d="M13.8 5.4C11.8 8.4 11.4 12.4 13.8 17"/>
          <path d="M11.8 27.8C13 26 14.6 25.2 16 25"/>
          <path d="M12.6 52C11.4 57 11.4 61 12.2 63.6"/>
          <path d="M13.8 64.8L14.4 109.8"/>
          <path d="M10.8 112.8L13.2 112.8"/>
        </g>`,
    },
    { id: 'leaves', svg: figLeaves(11.5, 28.5, 55) },
    {
      id: 'arm',
      pivot: { x: 13.4, y: 27.4 },
      svg: `
        <path d="M11.4 26.8C13.2 25.6 16 26.4 16 29.2L14.8 54.4C14.2 57.2 11.6 57.2 11.6 54.4Z" fill="${SKIN}"/>
        <path d="M11.9 30.2L11.9 53.8" stroke="${RIM}" stroke-width="1.3" stroke-linecap="round" opacity=".92"/>`,
    },
  ],
  animate: moving,
}

export const people: Record<string, PaperPropArt> = { man, woman }
