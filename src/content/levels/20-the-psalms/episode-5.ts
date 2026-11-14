import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 5 · The King Who Is to Come (Psalms 2, 110, 118 and 16), from the approved Level 20
 * script.
 *
 * A young king of David's family is anointed and crowned: "You are my son." On the building site,
 * one rough stone lies in the dust, rejected; the player swings it into the gap at the head of
 * the corner, and the arch locks together ("the head of the corner", minigames/the-head-of-the-
 * corner). The stone glows (this episode's golden thread). Then the festival crowd sings Psalm
 * 118 through the gate.
 */

/** The arch with its gap, and the rejected stone that swings over it. */
export const ARCH = { x: 0.62, base: 0.8, gap: 0.583 }
export const SWING = { marker: 'swing-stone', from: 0.48, to: 0.76, y: 0.44 }

const CITY = 'city-street'
const SITE = 'salem-hill'
const COURTS = 'temple-courts'
const inCity = personOn(CITY)
const onSite = personOn(SITE)
const inCourts = personOn(COURTS)

export const kingSet: SceneDescription = {
  id: 'l20-king',
  title: 'The King who is to come',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: CITY, depth: 0.3 },
    { id: SITE, depth: 0.3, opacity: 0 },
    { id: COURTS, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The coronation: the young king, the priest with the oil, the people, and the light from above.
    inCity('king', 'solomon', 0.44, { pose: 'kneel', facing: 1 }),
    inCity('priest', 'high-priest', 0.56),
    { id: 'oil', prop: 'oil-vial', above: CITY, x: 0.53, y: 0.66, size: 0.015 },
    inCity('people', 'hebrew-family', 0.2, { size: 0.12, facing: 1 }),
    { id: 'light', prop: 'halo', above: CITY, x: 0.44, y: 0.58, size: 0.3, opacity: 0 },
    // The building site: the builders, the unfinished arch, the rejected stone and the stone swinging over the gap.
    onSite('builders', 'hebrew-workers', 0.24, { size: 0.12, facing: 1, opacity: 0 }),
    { id: 'arch', prop: 'gate-arch', above: SITE, x: ARCH.x, y: ARCH.base, size: 0.2, opacity: 0 },
    { id: 'rejected', prop: 'cornerstone', above: SITE, x: 0.4, y: 0.82, size: 0.035, opacity: 0 },
    { id: SWING.marker, prop: 'cornerstone', above: SITE, x: SWING.from, y: SWING.y, size: 0.035, opacity: 0 },
    { id: 'corner-glow', prop: 'halo', above: SITE, x: 0.4, y: 0.74, size: 0.12, opacity: 0 },
    // The festival: the crowd streaming into the Temple courts.
    inCourts('pilgrims', 'hebrew-family', 0.3, { size: 0.12, facing: 1, opacity: 0 }),
    inCourts('women', 'hebrew-women', 0.7, { size: 0.12, opacity: 0 }),
    ...[0.22, 0.38, 0.62, 0.78].map((x, i): SceneActor => ({ id: `branch-${i + 1}`, prop: 'palm-tree', above: COURTS, x, y: 0.74, size: 0.025, opacity: 0 })),
  ],
  camera: DRIFT,
}

const onSiteNow = ['builders', 'arch', 'rejected']

const scenes: StoryScene[] = [
  {
    id: 'l20-e5-s1',
    title: '“You are my son”',
    music: 'handel-zadok',
    beats: [
      say('Some psalms were sung when a new king of David’s family was crowned. But they promise far more than any ordinary king could be.', actor('oil', { y: 0.62 }, { seconds: 2, delay: 1 }), camera({ zoom: 1.02 }, slow)),
      verse('PSA 2:7', actor('king', { pose: 'idle' }, { seconds: 0.8, delay: 0.5 }), fadeIn('light', 1, 0.8)),
      verse('PSA 110:1', camera({ zoom: 1, y: -0.02 }, slow)),
      verse('PSA 110:4', actor('light', { opacity: 0.4 }, { seconds: 2 }), camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l20-e5-s2',
    title: 'The stone which the builders rejected',
    music: 'handel-zadok',
    beats: [
      verse('PSA 118:22', ...swap(CITY, SITE), ...['king', 'priest', 'oil', 'people', 'light'].map((id) => fadeOut(id)), ...onSiteNow.map((id) => fadeIn(id, 1.5)), actor('corner-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 })),
      play('the-head-of-the-corner', {
        cues: [fadeOut('rejected'), fadeIn(SWING.marker, 0, 1), actor('corner-glow', { x: SWING.from, y: SWING.y }, { seconds: 0.5 })],
        done: [actor(SWING.marker, { x: ARCH.x, y: ARCH.gap }, { seconds: 0.5 }), actor('corner-glow', { x: ARCH.x, y: ARCH.gap }, { seconds: 0.5 })],
      }),
      verse('PSA 118:23', camera({ zoom: 1.03, x: 0.02 }, slow)),
      verse('PSA 118:24', camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
  {
    id: 'l20-e5-s3',
    title: 'Blessed be he who enters',
    music: 'handel-zadok',
    beats: [
      verse('PSA 118:26', ...swap(SITE, COURTS), ...[...onSiteNow, SWING.marker, 'corner-glow'].map((id) => fadeOut(id)), fadeIn('pilgrims', 1.5), fadeIn('women', 1.5), ...[1, 2, 3, 4].map((n) => fadeIn(`branch-${n}`, 1.5))),
      say('Psalm 118 was sung at every Passover. On Palm Sunday, the crowds sang it again as Jesus rode into Jerusalem: “Hosanna!”, which means “Save us!”, and “Blessed is he who comes in the name of the Lord!”', ...swap('forest-sky', 'evening-sky'), camera({ zoom: 1.02 }, slow)),
      verse('PSA 16:10', camera({ zoom: 1 }, slow)),
      verse('PSA 16:11'),
      say('After he rose from the dead, Jesus told his disciples that everything written about him “in the psalms” must be fulfilled.', camera({ zoom: 1.03 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: kingSet, scenes }
