import type { PaperPropArt, PartMotion } from '../art'

/**
 * The animals of day six, as jointed paper puppets in the wayang manner (spec §9.1). Each
 * faces right and stands on its base. The far legs are a shade darker and sit behind the
 * body; the near legs sit in front. Walking swings diagonal pairs of legs together, the
 * way four-legged animals really walk.
 */

const TAU = Math.PI * 2

/** A leg hanging from its hip joint at (x, top) down to the ground, a little tapered, with a foot. */
function leg(x: number, top: number, ground: number, width: number, color: string, foot = color): string {
  const h = width / 2
  return `
    <circle cx="${x}" cy="${top + h * 0.6}" r="${h}" fill="${color}"/>
    <path d="M${x - h} ${top + h * 0.6}L${x + h} ${top + h * 0.6}L${x + h * 0.8} ${ground - width * 0.5}L${x - h * 0.8} ${ground - width * 0.5}Z" fill="${color}"/>
    <path d="M${x - h * 0.9} ${ground - width * 0.55}L${x + h * 0.9} ${ground - width * 0.55}Q${x + h * 1.4} ${ground} ${x + h * 1.2} ${ground}L${x - h} ${ground}Z" fill="${foot}"/>`
}

/** A star-edged ring of cut paper: the lion's mane. */
function mane(cx: number, cy: number, outer: number, inner: number, points: number): string {
  let d = ''
  for (let i = 0; i < points * 2; i++) {
    const a = (i / (points * 2)) * TAU
    const r = i % 2 ? inner : outer
    d += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`
  }
  return `${d}Z`
}

/**
 * How a four-legged puppet moves. Walking: diagonal leg pairs swing together and the body
 * rises a little with each step. Standing: it breathes, and its tail swishes.
 */
function fourLegged(stepsPerSecond: number, swing: number, extra?: (part: string, pose: string, time: number) => PartMotion | undefined) {
  return (part: string, pose: string, time: number): PartMotion => {
    const own = extra?.(part, pose, time)
    if (own) return own
    if (pose === 'walk') {
      const s = Math.sin(time * TAU * stepsPerSecond)
      if (part === 'leg-fn' || part === 'leg-bf') return { rotate: swing * s }
      if (part === 'leg-ff' || part === 'leg-bn') return { rotate: -swing * s }
      if (part === 'body') return { y: -1.6 * Math.abs(Math.cos(time * TAU * stepsPerSecond)) }
      if (part === 'tail') return { rotate: 10 * Math.sin(time * TAU * stepsPerSecond * 0.5) }
      return {}
    }
    if (part === 'body') return { y: 0.5 * Math.sin(time * TAU * 0.27) }
    if (part === 'tail') return { rotate: 8 * Math.sin(time * TAU * 0.31) }
    return {}
  }
}

const lion: PaperPropArt = {
  box: { x: 0, y: 0, w: 130, h: 82 },
  facing: 1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    { id: 'leg-bf', pivot: { x: 34, y: 50 }, svg: leg(34, 50, 82, 11, '#b47c2e', '#a06a26') },
    { id: 'leg-ff', pivot: { x: 92, y: 50 }, svg: leg(92, 50, 82, 11, '#b47c2e', '#a06a26') },
    {
      id: 'tail',
      pivot: { x: 22, y: 42 },
      svg: `<path d="M22 42C12 40 6 50 3 58" stroke="#c98f2f" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="3" cy="60" rx="4" ry="5.5" fill="#7a4a20"/>`,
    },
    {
      id: 'body',
      svg: `
        <path d="M20 46C18 32 36 26 66 27C90 28 102 33 104 42C106 54 92 62 66 62C40 62 22 58 20 46Z" fill="#d9a441"/>
        <path d="M26 54C40 61 80 62 100 52C88 58 52 60 26 54Z" fill="#c48d33"/>
        <path d="${mane(106, 33, 25, 18, 14)}" fill="#9a5a26"/>
        <path d="${mane(107, 33, 18, 14, 12)}" fill="#b8722e"/>
        <circle cx="108" cy="34" r="12" fill="#e2b257"/>
        <circle cx="102" cy="23" r="4" fill="#c48d33"/>
        <ellipse cx="117" cy="39" rx="7" ry="5.5" fill="#f0d29a"/>
        <path d="M121 34.5L125.5 35.5L122 38Z" fill="#5a3020"/>
        <circle cx="111" cy="30" r="1.7" fill="#2b1b10"/>`,
    },
    { id: 'leg-bn', pivot: { x: 40, y: 52 }, svg: leg(40, 52, 82, 12, '#d9a441', '#c48d33') },
    { id: 'leg-fn', pivot: { x: 86, y: 52 }, svg: leg(86, 52, 82, 12, '#d9a441', '#c48d33') },
  ],
  animate: fourLegged(1.5, 24),
}

const deer: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 112 },
  facing: 1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    { id: 'leg-bf', pivot: { x: 28, y: 66 }, svg: leg(28, 66, 112, 5.5, '#9a6236', '#3a2618') },
    { id: 'leg-ff', pivot: { x: 72, y: 66 }, svg: leg(72, 66, 112, 5.5, '#9a6236', '#3a2618') },
    { id: 'tail', pivot: { x: 22, y: 56 }, svg: `<ellipse cx="20" cy="57" rx="4" ry="6.5" fill="#f4ecdf"/>` },
    {
      id: 'body',
      svg: `
        <path d="M22 64C20 50 38 44 58 46C72 47 78 52 78 60C78 70 64 74 48 74C32 74 23 70 22 64Z" fill="#b97a4a"/>
        <path d="M28 68C40 74 62 74 74 66C64 71 44 72 28 68Z" fill="#e3c39a"/>
        <path d="M68 52C72 42 74 34 77 27L86 29C84 37 82 46 78 56Z" fill="#b97a4a"/>
        <path d="M84 19C82 12 80 8 76 3M80 10L74 8M84 19C86 11 90 6 95 1M89 8L95 9" stroke="#8a5a3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <path d="M82 21L74 13L84 18Z" fill="#9a6236"/>
        <ellipse cx="88" cy="27" rx="10" ry="7" fill="#b97a4a"/>
        <ellipse cx="97" cy="30" rx="3.5" ry="3" fill="#3a2618"/>
        <circle cx="88.5" cy="25" r="1.4" fill="#1d120c"/>
        <path d="M30 56C40 52 56 51 70 54" stroke="#d8a57a" stroke-width="1.6" fill="none" opacity=".7"/>`,
    },
    { id: 'leg-bn', pivot: { x: 33, y: 68 }, svg: leg(33, 68, 112, 6, '#b97a4a', '#3a2618') },
    { id: 'leg-fn', pivot: { x: 67, y: 68 }, svg: leg(67, 68, 112, 6, '#b97a4a', '#3a2618') },
  ],
  animate: fourLegged(1.3, 20),
}

const sheep: PaperPropArt = {
  box: { x: 0, y: 0, w: 90, h: 66 },
  facing: 1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    { id: 'leg-bf', pivot: { x: 26, y: 44 }, svg: leg(26, 44, 66, 4.6, '#2c2732') },
    { id: 'leg-ff', pivot: { x: 62, y: 44 }, svg: leg(62, 44, 66, 4.6, '#2c2732') },
    {
      id: 'body',
      svg: `
        ${[
          [24, 34, 12],
          [36, 26, 13],
          [50, 24, 13],
          [63, 28, 12],
          [70, 38, 10],
          [58, 45, 11],
          [41, 45, 12],
          [26, 43, 10],
        ]
          .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#f4efe4"/>`)
          .join('')}
        <circle cx="31" cy="47" r="7" fill="#e2dccf"/>
        <circle cx="52" cy="49" r="8" fill="#e2dccf"/>
        <circle cx="44" cy="22" r="6" fill="#fffdf6"/>
        <ellipse cx="79" cy="31" rx="9" ry="7" fill="#3a3340"/>
        <path d="M74 26L67 22L72 30Z" fill="#3a3340"/>
        <circle cx="74" cy="24" r="5" fill="#f4efe4"/>
        <circle cx="81.5" cy="29" r="1.2" fill="#f4efe4"/>`,
    },
    { id: 'leg-bn', pivot: { x: 31, y: 46 }, svg: leg(31, 46, 66, 5, '#3a3340') },
    { id: 'leg-fn', pivot: { x: 57, y: 46 }, svg: leg(57, 46, 66, 5, '#3a3340') },
  ],
  animate: fourLegged(1.8, 22),
}

const elephant: PaperPropArt = {
  box: { x: 0, y: 0, w: 150, h: 122 },
  facing: 1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    { id: 'leg-bf', pivot: { x: 36, y: 74 }, svg: leg(36, 74, 122, 16, '#737a90', '#e8e2d4') },
    { id: 'leg-ff', pivot: { x: 104, y: 74 }, svg: leg(104, 74, 122, 16, '#737a90', '#e8e2d4') },
    {
      id: 'tail',
      pivot: { x: 18, y: 56 },
      svg: `<path d="M18 56C10 60 8 70 8 78" stroke="#737a90" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M8 77L5 84L11 84Z" fill="#5d6378"/>`,
    },
    {
      id: 'body',
      svg: `
        <path d="M16 66C14 38 42 26 80 26C110 26 128 36 130 56C132 78 112 88 80 88C46 88 18 84 16 66Z" fill="#8d93a8"/>
        <path d="M30 40C50 30 90 28 116 36" stroke="#a7adc1" stroke-width="3" fill="none" opacity=".7"/>
        <circle cx="124" cy="48" r="22" fill="#8d93a8"/>
        <path d="M132 66C138 72 146 72 150 67C144 68 139 66 136 61Z" fill="#f4efe4"/>
        <circle cx="130" cy="44" r="1.9" fill="#2a2836"/>`,
    },
    {
      id: 'ear',
      pivot: { x: 116, y: 40 },
      svg: `<path d="M118 36C102 30 94 50 98 66C104 74 118 68 120 58Z" fill="#7d8398"/><path d="M114 42C106 40 102 52 104 62C108 66 114 62 115 56Z" fill="#9aa0b5"/>`,
    },
    {
      id: 'trunk',
      pivot: { x: 138, y: 58 },
      svg: `<path d="M136 54C146 66 146 86 140 100C138 106 131 106 133 99C137 87 137 72 130 60Z" fill="#8d93a8"/><path d="M140 70L143 71M140 78L143 79M139 86L142 87" stroke="#737a90" stroke-width="1.2"/>`,
    },
    { id: 'leg-bn', pivot: { x: 44, y: 76 }, svg: leg(44, 76, 122, 17, '#8d93a8', '#e8e2d4') },
    { id: 'leg-fn', pivot: { x: 96, y: 76 }, svg: leg(96, 76, 122, 17, '#8d93a8', '#e8e2d4') },
  ],
  animate: fourLegged(1.05, 14, (part, _pose, time) => {
    if (part === 'ear') return { rotate: 7 * Math.sin(time * TAU * 0.4) }
    if (part === 'trunk') return { rotate: 7 * Math.sin(time * TAU * 0.3 + 1) }
    return undefined
  }),
}

export const animals: Record<string, PaperPropArt> = { lion, deer, sheep, elephant }
