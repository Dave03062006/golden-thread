import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, pose, slow, tabernacle, walk } from './stage'

/**
 * Episode 4 · Offerings and Sacrifices (Leviticus 1–3; 6:8–13; 9:24), from the approved
 * Level 11 script.
 *
 * The LORD calls Moses from the tent of meeting and teaches him the offerings: a family
 * brings a lamb, and the father lays his hand on its head; a widow brings fine flour, oil and
 * frankincense. The offerings are never shown being killed, only as smoke rising from the
 * altar, whose fire glows (this episode's golden thread: "Christ loved us and gave himself up
 * for us, a fragrant offering"). The player keeps the altar fire burning through a day and a
 * night ("keep the fire burning", minigames/keep-the-fire-burning), and fire comes forth
 * from the LORD and consumes the offering.
 */

/** The altar close up, its fire, and how big the flames are: at their lowest, and fed. */
export const ALTAR = { x: 0.5, y: 0.8, size: 1.8 }
export const FLAME = { id: 'flame', x: 0.5, y: 0.67, min: 0.03, max: 0.09 }
export const RING = 'fire-ring'
export const SMOKE = { id: 'smoke', opacity: 0.6 }
/** The skies the day and night pass through, over the altar. */
export const EVENING = 'evening-sky'
export const NIGHT = 'night-sky'

const ABOVE = 'horeb'
const person = personOn(ABOVE)
const COURT = ['tabernacle-tent', 'tabernacle-screen', 'tabernacle-altar', 'tabernacle-laver', 'tabernacle-court']
const FAMILY = ['father', 'mother', 'lamb']

export const offeringsSet: SceneDescription = {
  id: 'l11-offerings',
  title: 'Offerings and sacrifices',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: EVENING, depth: 0, opacity: 0 },
    { id: NIGHT, depth: 0, opacity: 0 },
    { id: 'horeb', depth: 0.3 },
  ],
  actors: [
    // The tent of meeting in its court, and the LORD's voice as light from within.
    ...tabernacle('tabernacle', ABOVE, { x: 0.36, y: 0.8, size: 0.6 }, ['tent', 'screen', 'altar', 'laver', 'court']),
    { id: 'voice', prop: 'halo', above: ABOVE, x: 0.27, y: 0.62, size: 0.18, opacity: 0 },
    // The smoke rising from the altar in the court.
    { id: 'court-smoke', prop: 'smoke-column', above: ABOVE, x: 0.5625, y: 0.74, size: 0.05, opacity: 0 },
    // A family with a lamb, at the gate of the court; a widow with her offering; a priest.
    person('father', 'hebrew-father', 0.8),
    person('mother', 'hebrew-mother', 0.86),
    { id: 'lamb', prop: 'sheep', above: ABOVE, x: 0.75, y: 0.79, size: 0.03, facing: -1 },
    person('widow', 'widow', 0.92, { opacity: 0 }),
    { id: 'flour', prop: 'gift', above: ABOVE, x: 0.89, y: 0.77, size: 0.024, pose: 'flour', opacity: 0 },
    person('priest', 'priest', 0.66, { facing: 1 }),
    person('family', 'hebrew-family', 0.9, { size: 0.12, opacity: 0 }),
    // The altar close up: its fire (the golden thread), the ring that shows when it needs wood, and its smoke.
    { id: 'altar', prop: 'tabernacle-piece', above: ABOVE, x: pieceX('altar', ALTAR.x, ALTAR.size), y: ALTAR.y, size: ALTAR.size, pose: 'altar', opacity: 0 },
    { id: SMOKE.id, prop: 'smoke-column', above: ABOVE, x: FLAME.x, y: FLAME.y, size: 0.08, opacity: 0 },
    { id: 'fire-glow', prop: 'halo', above: ABOVE, x: FLAME.x, y: FLAME.y - 0.02, size: 0.2, opacity: 0 },
    { id: FLAME.id, prop: 'flame', above: ABOVE, x: FLAME.x, y: FLAME.y, size: FLAME.max, opacity: 0 },
    { id: RING, prop: 'halo', above: ABOVE, x: FLAME.x, y: FLAME.y - 0.03, size: 0.14, opacity: 0 },
    person('keeper', 'priest', 0.62, { facing: -1, opacity: 0 }),
    // The fire that comes forth from the LORD, and the people who fall on their faces.
    { id: 'fire-flash', prop: 'halo', above: ABOVE, x: 0.5, y: 0.6, size: 0.9, opacity: 0 },
    person('kneeler-1', 'hebrew-father', 0.24, { facing: 1, opacity: 0 }),
    person('kneeler-2', 'hebrew-mother', 0.3, { facing: 1, opacity: 0 }),
    person('kneeler-3', 'elder', 0.76, { opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l11-e4-s1',
    title: 'When any man of you brings an offering',
    music: 'faure-agnus-dei',
    beats: [
      verse('LEV 1:1', fadeIn('voice', 0.5, 0.85)),
      verse('LEV 1:2', ...walk('father', { x: 0.62 }, 3, 0.5), ...walk('mother', { x: 0.68 }, 3, 0.6), ...walk('lamb', { x: 0.57 }, 3, 0.5)),
      verse('LEV 1:4', ...pose('father', 'lift', 0.5, 4), camera({ zoom: 1.02 }, slow)),
      say('A burnt offering was given to God whole, and went up in smoke from the altar: a sign of giving God everything.', fadeOut('lamb'), fadeIn('court-smoke', 1, 0.7), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l11-e4-s2',
    title: 'Flour, oil and frankincense',
    music: 'faure-agnus-dei',
    beats: [
      verse('LEV 2:1', fadeOut('court-smoke'), ...walk('father', { x: 0.84, facing: 1 }, 3, 0.5), ...walk('mother', { x: 0.9, facing: 1 }, 3, 0.5), fadeIn('widow', 1), fadeIn('flour', 1), ...walk('widow', { x: 0.72 }, 3, 2), actor('flour', { x: 0.69 }, { seconds: 3, ease: 'inOutSine', delay: 2 })),
      verse('LEV 2:2', ...pose('priest', 'lift', 1, 4), fadeIn('court-smoke', 2, 0.5)),
      say('With a peace offering, part was burned on the altar, and the family who brought it ate the rest together, a meal of thanks before God.', ...FAMILY.map((id) => fadeOut(id)), fadeIn('family', 1)),
      say('Some offerings gave thanks; some asked forgiveness for sin. All of them said: everything we have comes from God, and belongs to him.', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l11-e4-s3',
    title: 'The fire shall not go out',
    music: 'faure-agnus-dei',
    beats: [
      verse('LEV 6:12', camera({ zoom: 1 }, slow), ...[...COURT, 'voice', 'court-smoke', 'widow', 'flour', 'priest', 'family'].map((id) => fadeOut(id)), fadeIn('altar', 1.5), fadeIn(FLAME.id, 2), fadeIn('fire-glow', 2, 0.8), fadeIn(SMOKE.id, 2.5, SMOKE.opacity), fadeIn('keeper', 2), ...pose('keeper', 'carry', 3, 3)),
      verse('LEV 6:13'),
      play('keep-the-fire-burning', {
        done: [actor(FLAME.id, { size: FLAME.max }, { seconds: 0.5 }), actor(RING, { opacity: 0 }, { seconds: 0.5 }), actor(SMOKE.id, { opacity: SMOKE.opacity }, { seconds: 0.5 })],
      }),
      verse('LEV 9:24', fadeIn('fire-flash', 0, 0.9), actor('fire-flash', { opacity: 0.3 }, { seconds: 3, delay: 2 }), ...['kneeler-1', 'kneeler-2', 'kneeler-3'].flatMap((id, i) => [fadeIn(id, 0.3 * i), actor(id, { pose: 'kneel' }, { seconds: 0.8, delay: 2 })]), actor('keeper', { pose: 'kneel' }, { seconds: 0.8, delay: 2 })),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: offeringsSet, scenes }
