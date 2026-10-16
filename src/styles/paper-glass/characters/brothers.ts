import type { PaperPropArt, PartMotion } from '../art'

/**
 * Cain and Abel (Episode 5), as cut-paper silhouettes like their parents, with the light
 * catching their outline in gold. Both face left. They are told apart by what they wear
 * and carry: Cain, the tiller of the ground, in a dark garment with a hoe and a beard;
 * Abel, the keeper of sheep, in pale fleece with a shepherd's staff.
 */

const TAU = Math.PI * 2
const SKIN = '#3a2a42'
const HAIR = '#261b2c'
const RIM = '#ffd99a'

/** The figure both brothers share: legs, body, neck and head, with the light on the left edge. */
const FIGURE = `
  <path d="M12 62L19.5 62L18.6 116L12.8 116Z" fill="${SKIN}"/>
  <path d="M20.5 62L28 62L27.2 116L21.4 116Z" fill="${SKIN}"/>
  <path d="M9.5 116L19 116L19 120L8.5 120Z" fill="${SKIN}"/>
  <path d="M20 116L27.5 116L27.5 120L19.5 120Z" fill="${SKIN}"/>
  <path d="M9 27C12 23.5 26 23.5 30 27L28.5 63L11.5 63Z" fill="${SKIN}"/>
  <rect x="16" y="18" width="7" height="8" fill="${SKIN}"/>
  <circle cx="19.5" cy="12" r="8.6" fill="${SKIN}"/>
  <path d="M11.2 11L8.6 14.2L11.4 15.4Z" fill="${SKIN}"/>
  <g stroke="${RIM}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".92">
    <path d="M12.6 5.6C10.6 8.6 10 13 12.6 18"/>
    <path d="M12.4 90L13 115.4"/>
  </g>`

/** A garment from the shoulders to the knees, ragged at the hem. */
const garment = (fill: string, edge: string) => `
  <path d="M10 26C14 23 25 23 29.5 26L31 42L31.5 88L27 91L23 88L19 91L15 88L11 91L7.5 88L8 42Z" fill="${fill}"/>
  <path d="M8 42C14 45 25 45 31 42" stroke="${edge}" stroke-width="1.2" fill="none" stroke-dasharray="2 2"/>
  <path d="M8 42L7.5 88" stroke="${RIM}" stroke-width="1.2" opacity=".8"/>`

/** The front arm, hanging from the shoulder. */
const ARM = `
  <path d="M9 26.4C11 25 14.4 26 14.4 29L13.2 58.4C12.6 61.4 9.6 61.4 9.6 58.4Z" fill="${SKIN}"/>
  <path d="M9.8 30L9.9 57.6" stroke="${RIM}" stroke-width="1.4" stroke-linecap="round" opacity=".92"/>`

const SHOULDER = { x: 11.5, y: 27 }

/**
 * How the brothers move. Both face left, so turning the arm forward is a positive turn.
 * - work: Cain's hoe rising and falling into the ground.
 * - tend: Abel's staff held out over the flock.
 * - offer: the arm lifted high, bringing a gift.
 * - fallen: head bowed and arm drawn in, angry and downcast (Genesis 4:5).
 */
function moving(part: string, pose: string, time: number): PartMotion {
  const breath = Math.sin(time * TAU * 0.24)
  const held = part === 'arm' || part === 'tool'
  if (pose === 'work' && held) {
    const swing = Math.sin(time * TAU * 0.7)
    return { rotate: 55 + 35 * swing }
  }
  if (pose === 'tend' && held) return { rotate: 30 + 4 * Math.sin(time * TAU * 0.3) }
  if (pose === 'offer' && held) return { rotate: 150 }
  if (pose === 'fallen') {
    if (held) return { x: 5, y: 2, rotate: -12 }
    return { rotate: -4, y: 2 }
  }
  if (part === 'body') return { y: 0.45 * breath }
  if (held) return { rotate: 2.4 * Math.sin(time * TAU * 0.24 + 0.6), y: 0.45 * breath }
  return {}
}

const cain: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 120 },
  facing: -1,
  poses: ['idle', 'work', 'offer', 'fallen', 'marked'],
  anchor: 'base',
  parts: [
    {
      id: 'body',
      svg: `${FIGURE}${garment('#6a3a2a', '#3a2018')}
        <path d="M11.4 9C12.4 4 16 2.6 20 2.6C25 2.6 28.6 6 28.6 11.2C27 9 25 8 22 8.6C18 9 14.4 8 11.4 9Z" fill="${HAIR}"/>
        <path d="M11 15C11 20 14 23 19 23C17 20 15 17 13 15Z" fill="${HAIR}"/>`,
    },
    {
      id: 'tool',
      pivot: SHOULDER,
      // A hoe: a long handle from the hand, with a stone blade.
      svg: `<path d="M11 58L9 92" stroke="#6a4a2a" stroke-width="2.4" stroke-linecap="round"/><path d="M9 90L2 94L3 97L10 93Z" fill="#7a7a70"/>`,
    },
    { id: 'arm', pivot: SHOULDER, svg: ARM },
    {
      // The mark the LORD put on Cain (Genesis 4:15): a small light on his forehead.
      id: 'mark',
      svg: `
        <defs><radialGradient id="m" cx="13" cy="8" r="7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fffbe8"/><stop offset=".4" stop-color="#ffe7a0" stop-opacity=".7"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs>
        <circle cx="13" cy="8" r="7" fill="url(#m)"/>
        <path d="M13 5.4L13.7 7.3L15.6 8L13.7 8.7L13 10.6L12.3 8.7L10.4 8L12.3 7.3Z" fill="#ffffff"/>`,
    },
  ],
  animate: (part, pose, time) => {
    if (part === 'mark') return { opacity: pose === 'marked' ? 0.85 + 0.15 * Math.sin(time * TAU * 0.5) : 0 }
    return moving(part, pose === 'marked' ? 'idle' : pose, time)
  },
}

const abel: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 120 },
  facing: -1,
  poses: ['idle', 'tend', 'offer', 'fallen'],
  anchor: 'base',
  parts: [
    {
      id: 'body',
      svg: `${FIGURE}${garment('#d8ccb0', '#a89878')}
        <path d="M11.4 9.4C12.4 4.4 16 3 20 3C25 3 28.6 6.4 28.6 11.6C27 9.4 25 8.4 22 9C18 9.4 14.4 8.4 11.4 9.4Z" fill="#4a3428"/>
        <path d="M11 7.6C16 6.4 23 6.4 28.6 8" stroke="#c8a060" stroke-width="1.6" fill="none"/>`,
    },
    {
      id: 'tool',
      pivot: SHOULDER,
      // A shepherd's staff, its crook above the hand.
      // (It stays inside the puppet's box: from the ground up past the hand, crook at the top.)
      svg: `<path d="M11 112L11 10" stroke="#7a5a32" stroke-width="2" stroke-linecap="round"/><path d="M11 10C11 4 4 3 3 8C3 11 5 12 6 11" stroke="#7a5a32" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    },
    { id: 'arm', pivot: SHOULDER, svg: ARM },
  ],
  animate: moving,
}

export const brothers: Record<string, PaperPropArt> = { cain, abel }
