import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, pose, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 7 · David Dances Before the Ark (2 Samuel 6), from the approved Level 18 script.
 *
 * The ark sets out on a new cart; Uzzah touches it and dies, told in a sentence. It rests three
 * months in the house of Obed-edom, glowing (this episode's golden thread: Mary, the Ark of the
 * Covenant). Then the Levites carry it up to Jerusalem, and the player dances with David on the
 * beat ("dancing before the LORD", minigames/dancing-before-the-lord). Michal looks down, scornful.
 */

/** How many steps David dances before the ark reaches the gate, and how high he leaps. */
export const STEPS = 6
export const DANCER = { id: 'david-dancing', y: 0.785, leap: 0.03 }

const ROAD = 'canaan-hills'
const FARM = 'wheat-field'
const CITY = 'city-street'
const onRoad = personOn(ROAD)
const atFarm = personOn(FARM)
const inCity = personOn(CITY)

const ark = (id: string, above: string, x: number, extra = {}) => ({ id, prop: 'tabernacle-piece', above, x: pieceX('ark', x, 0.4), y: 0.8, size: 0.4, pose: 'ark', ...extra })

export const arkSet: SceneDescription = {
  id: 'l18-ark',
  title: 'David dances before the ark',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: ROAD, depth: 0.3 },
    { id: FARM, depth: 0.3, opacity: 0 },
    { id: CITY, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The procession: the ark on the new cart, the oxen, and the musicians.
    ark('road-ark', ROAD, 0.5),
    { id: 'cart', prop: 'cart', above: ROAD, x: 0.5, y: 0.82, size: 0.12 },
    { id: 'oxen', prop: 'cow', above: ROAD, x: 0.66, y: 0.82, size: 0.07, pose: 'fat' },
    onRoad('musicians', 'hebrew-family', 0.24, { size: 0.12, facing: 1 }),
    // The house of Obed-edom, where the ark rests three months (the golden thread).
    ark('farm-ark', FARM, 0.42, { opacity: 0 }),
    { id: 'ark-glow', prop: 'halo', above: FARM, x: 0.42, y: 0.62, size: 0.2, opacity: 0 },
    atFarm('obed-edom', 'hebrew-family', 0.66, { size: 0.12, opacity: 0 }),
    // Jerusalem: the Levites with the ark, David dancing, and Michal at the window.
    ark('city-ark', CITY, 0.32, { opacity: 0 }),
    inCity('levites', 'aaron-linen', 0.22, { facing: 1, opacity: 0 }),
    inCity(DANCER.id, 'david', 0.5, { facing: 1, opacity: 0 }),
    inCity('michal', 'michal', 0.84, { y: 0.56, size: 0.03, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l18-e7-s1',
    title: 'The ark on the new cart',
    music: 'handel-water-music-hornpipe',
    beats: [
      verse('2SA 6:2', camera({ zoom: 1.02 }, slow)),
      verse('2SA 6:5', camera({ zoom: 1 }, slow)),
      say('When the oxen stumbled, a man named Uzzah reached out and took hold of the ark, which God had said no one but the Levites should carry or touch, and he died there beside it.', fadeOut('musicians', 0.5), camera({ zoom: 1.02 }, slow)),
      verse('2SA 6:9', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l18-e7-s2',
    title: 'Three months in the house of Obed-edom',
    music: 'handel-water-music-hornpipe',
    beats: [
      verse('2SA 6:11', ...swap(ROAD, FARM), ...['road-ark', 'cart', 'oxen'].map((id) => fadeOut(id)), fadeIn('farm-ark', 1.5), fadeIn('obed-edom', 1.5), actor('ark-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 1.5 })),
      verse('2SA 6:12', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l18-e7-s3',
    title: 'With all his might',
    music: 'handel-water-music-hornpipe',
    beats: [
      verse('2SA 6:14', ...swap(FARM, CITY), ...['farm-ark', 'ark-glow', 'obed-edom'].map((id) => fadeOut(id)), fadeIn('city-ark', 1.5), fadeIn('levites', 1.5), fadeIn(DANCER.id, 1.5)),
      verse('2SA 6:15', ...pose(DANCER.id, 'lift', 0.5, 2)),
      play('dancing-before-the-lord', { done: [actor(DANCER.id, { y: DANCER.y }, { seconds: 0.5 })] }),
      verse('2SA 6:16', fadeIn('michal', 0.5)),
      verse('2SA 6:21', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode7: Pick<Episode, 'set' | 'scenes'> = { set: arkSet, scenes }
