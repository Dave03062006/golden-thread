import { createRng } from '../../../engine/random'
import type { PaperPropArt } from '../art'

/**
 * Props of Level 2, Episode 3, the Flood: the rain, falling forty days and forty nights,
 * and the great swells that roll toward the ark in the storm.
 */

/** Rain streaks over twice the frame's height, so falling one frame's height loops seamlessly. */
function streaks(): string {
  const rng = createRng(40)
  let out = ''
  for (let i = 0; i < 180; i++) {
    const x = rng.next() * 1700 - 50
    const y = rng.next() * 900
    const len = 40 + rng.next() * 50
    for (const dy of [0, 900]) out += `<path d="M${x.toFixed(0)} ${(y + dy).toFixed(0)}l${(-len * 0.18).toFixed(1)} ${len.toFixed(0)}"/>`
  }
  return `<g stroke="#c8d4e4" stroke-width="2.4" stroke-linecap="round" opacity=".55">${out}</g>`
}

const rain: PaperPropArt = {
  box: { x: 0, y: 0, w: 1600, h: 1800 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  shadow: false,
  resolution: 0.5,
  parts: [{ id: 'streaks', svg: streaks() }],
  // Falling: one frame's height every 1.3 seconds, round and round.
  animate: (_part, _pose, time) => ({ y: ((time / 1.3) % 1) * 900 - 450 }),
}

/** A great swell with a curling, foaming crest, rolling right (it faces the way it rolls). */
const wave: PaperPropArt = {
  box: { x: 0, y: 0, w: 400, h: 170 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'water',
      svg: `
        <path d="M0 170C60 150 110 70 170 40C220 18 262 22 288 50C300 64 296 84 278 86C266 70 246 70 236 82C270 110 330 150 400 170Z" fill="#5f8aae"/>
        <path d="M30 168C90 140 130 84 180 56C150 96 110 140 90 168Z" fill="#86acc8" opacity=".7"/>
        <path d="M170 40C220 18 262 22 288 50C300 64 296 84 278 86C266 70 246 70 236 82" stroke="#f4f8fa" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M60 150C120 110 180 90 236 82" stroke="#3e6488" stroke-width="5" fill="none" opacity=".8"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ y: 3 * Math.sin(time * Math.PI * 2 * 0.6) }),
}

export const theFloodProps: Record<string, PaperPropArt> = { rain, wave }
