import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, tabernacle, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 2 · Complaints and Quail (Numbers 11), from the approved Level 12 script.
 *
 * The people grow tired of the manna and weep for the food of Egypt, and Moses cries out that
 * the burden is too heavy. God takes some of the spirit that is on Moses and puts it on
 * seventy elders; the player draws the light out to each of them, and then to Eldad and
 * Medad, far out in the camp ("the spirit on the seventy", minigames/the-spirit-on-the-seventy).
 * Moses longs for all the LORD's people to be prophets (this episode's golden thread:
 * Pentecost). Then the quail fall around the camp.
 */

/** The elders around the tent (seven stand for the seventy), then Eldad and Medad, far out in the camp. */
export const ELDERS = [
  ...[0.22, 0.3, 0.38, 0.62, 0.7, 0.78, 0.5].map((x, i) => ({ id: `elder-${i + 1}`, x, y: i === 6 ? 0.66 : 0.72 - Math.abs(x - 0.5) * 0.1, far: false })),
  { id: 'eldad', x: 0.07, y: 0.74, far: true },
  { id: 'medad', x: 0.93, y: 0.74, far: true },
]
export const glowOf = (id: string) => `${id}-glow`

const ABOVE = 'dry-hills'
const person = personOn(ABOVE)
const COMPLAINERS = ['grumbler-1', 'grumbler-2', 'grumbler-3', 'family']

export const quailSet: SceneDescription = {
  id: 'l12-quail',
  title: 'Complaints and quail',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: ABOVE, depth: 0.3 },
  ],
  actors: [
    // The camp, with the manna white on the ground.
    { id: 'tent-1', prop: 'striped-tent', above: ABOVE, x: 0.12, y: 0.75, size: 0.1, pose: 'open', facing: 1 },
    { id: 'tent-2', prop: 'striped-tent', above: ABOVE, x: 0.88, y: 0.75, size: 0.1, pose: 'open', facing: -1 },
    { id: 'manna', prop: 'manna', above: ABOVE, x: 0.5, y: 0.82, size: 0.02, group: { count: 18, w: 0.8, h: 0.03, seed: 112 } },
    person('grumbler-1', 'hebrew-father', 0.24, { pose: 'sit', facing: 1 }),
    person('grumbler-2', 'hebrew-mother', 0.3, { pose: 'sit' }),
    person('grumbler-3', 'slave', 0.7, { pose: 'sit' }),
    person('family', 'hebrew-family', 0.8, { size: 0.12 }),
    // The tent of meeting, Moses, and the elders around it, each with the light that rests on him.
    ...tabernacle('tabernacle', ABOVE, { x: 0.5, y: 0.66, size: 0.3 }, ['tent'], { opacity: 0 }),
    { id: 'cloud', prop: 'pillar', above: ABOVE, x: 0.47, y: 0.42, size: 0.07, pose: 'cloud', opacity: 0 },
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.518, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.5),
    { id: glowOf('moses'), prop: 'halo', above: ABOVE, x: 0.5, y: 0.72, size: 0.1, opacity: 0 },
    ...ELDERS.flatMap((e): SceneActor[] => [
      { id: glowOf(e.id), prop: 'halo', above: ABOVE, x: e.x, y: e.y - 0.05, size: 0.07, opacity: 0 },
      person(e.id, 'elder', e.x, { y: e.y, size: e.far ? 0.044 : 0.038, facing: e.x < 0.5 ? 1 : -1, opacity: 0 }),
    ]),
    // Eldad and Medad prophesying (the golden thread), Joshua, and the young man who runs to Moses.
    { id: 'prophets-glow', prop: 'halo', above: ABOVE, x: 0.07, y: 0.68, size: 0.12, opacity: 0 },
    person('young-man', 'servant', 0.12, { facing: 1, opacity: 0 }),
    person('joshua', 'joshua', 0.58, { opacity: 0 }),
    // The quail, brought by the wind from the sea.
    { id: 'quail', prop: 'quail', above: ABOVE, x: 0.5, y: 0.3, size: 0.02, opacity: 0, group: { count: 12, w: 0.9, h: 0.2, seed: 1131, spread: 0.3 } },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l12-e2-s1',
    title: '“O that we had meat to eat!”',
    music: 'franck-panis-angelicus',
    beats: [
      verse('NUM 11:4', camera({ zoom: 1.02 }, slow)),
      verse('NUM 11:5', ...pose('grumbler-1', 'lift', 0.5, 3)),
      verse('NUM 11:6', ...pose('grumbler-2', 'pray', 0.5, 3)),
      say('God had fed them every single morning. But they had grown tired of his gift, and forgot how hard their life in Egypt had been.', camera({ zoom: 1 }, slow)),
      verse('NUM 11:10', ...walk('moses', { x: 0.44 }, 2, 0.5), actor('rod', { x: 0.458 }, { seconds: 2, ease: 'inOutSine', delay: 0.5 })),
    ],
  },
  {
    id: 'l12-e2-s2',
    title: 'The burden too heavy',
    music: 'franck-panis-angelicus',
    beats: [
      verse('NUM 11:11', ...COMPLAINERS.map((id) => fadeOut(id)), fadeIn('tabernacle-tent', 1), ...walk('moses', { x: 0.5 }, 2, 1), actor('rod', { x: 0.518 }, { seconds: 2, ease: 'inOutSine', delay: 1 }), actor('moses', { pose: 'kneel' }, { seconds: 0.8, delay: 3.2 })),
      verse('NUM 11:14'),
      verse('NUM 11:16', actor('moses', { pose: 'idle' }, { seconds: 0.8 }), ...ELDERS.filter((e) => !e.far).map((e, i) => fadeIn(e.id, 0.5 + i * 0.2))),
      verse('NUM 11:17', fadeIn('cloud', 0.5), fadeIn(glowOf('moses'), 1, 0.85)),
      play('the-spirit-on-the-seventy', {
        cues: [...ELDERS.filter((e) => e.far).map((e) => fadeIn(e.id, 0.5))],
        done: ELDERS.map((e) => actor(glowOf(e.id), { opacity: 0.8 }, { seconds: 0.5 })),
      }),
      verse('NUM 11:25', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l12-e2-s3',
    title: 'Would that all were prophets',
    music: 'franck-panis-angelicus',
    beats: [
      verse('NUM 11:26', camera({ zoom: 1 }, slow), fadeIn('prophets-glow', 0, 0.85), ...ELDERS.filter((e) => !e.far).flatMap((e) => [fadeOut(e.id, 1), fadeOut(glowOf(e.id), 1)])),
      verse('NUM 11:28', fadeIn('young-man', 0.3), ...walk('young-man', { x: 0.42 }, 2.5, 0.5), fadeIn('joshua', 1), ...pose('joshua', 'lift', 2, 3)),
      verse('NUM 11:29', ...pose('moses', 'lift', 0.5, 4)),
      verse('NUM 11:31', fadeIn('quail', 0.5), actor('quail', { y: 0.7, spread: 1 }, { seconds: 4, ease: 'inOutSine', delay: 0.5 })),
      say('The people gathered quail all day and all night, more than they could ever eat. But their craving had become greed, and a plague struck the camp. They called the place “the graves of craving,” and moved on.', fadeOut('quail', 1), camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: quailSet, scenes }
