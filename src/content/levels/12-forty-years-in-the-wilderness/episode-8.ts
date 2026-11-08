import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 8 · A Star Out of Jacob (Numbers 23–24), from the approved Level 12 script.
 *
 * On the heights of Moab, Balak builds altars and waits for curses, and each time Balaam opens
 * his mouth, a blessing comes out. From the last height he sees Israel camped tribe by tribe,
 * and then, far beyond his own time, a star rising out of Jacob (this episode's golden thread:
 * the star the wise men followed). The player recalls the words of his last oracle, and the
 * stars light one by one until the bright star rises ("a star out of Jacob",
 * minigames/a-star-out-of-jacob).
 */

/** The words of Numbers 24:17 the player chooses, in order, each lighting a star. */
export const ORACLE = [
  { word: 'now', line: 'I see him, but not ___;' },
  { word: 'nigh', line: 'I behold him, but not ___:' },
  { word: 'star', line: 'a ___ shall come forth out of Jacob,' },
  { word: 'Jacob', line: 'a star shall come forth out of ___,' },
  { word: 'scepter', line: 'and a ___ shall rise out of Israel.' },
  { word: 'Israel', line: 'and a scepter shall rise out of ___.' },
].map((o, i) => ({ ...o, star: `sky-star-${i + 1}`, x: Math.round((0.3 + i * 0.08) * 1000) / 1000, y: i % 2 ? 0.2 : 0.14 }))
export const STAR = { id: 'star', glow: 'star-glow', x: 0.62, y: 0.3 }

const HEIGHTS = 'hilltop'
const person = personOn(HEIGHTS, 0.74)

export const starSet: SceneDescription = {
  id: 'l12-star',
  title: 'A star out of Jacob',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: HEIGHTS, depth: 0.3 },
  ],
  actors: [
    // The bare height, with its altars; Balak and his princes; Balaam.
    ...[0.12, 0.2, 0.28].map((x, i): SceneActor => ({ id: `altar-${i + 1}`, prop: 'noah-altar', above: HEIGHTS, x, y: 0.75, size: 0.04, pose: 'lit' })),
    person('balak', 'balak', 0.38, { facing: 1 }),
    person('princes', 'elders', 0.48, { size: 0.11, facing: 1 }),
    person('balaam', 'balaam', 0.62),
    // Far below, the camp of Israel, tribe by tribe.
    { id: 'camp', prop: 'striped-tent', above: HEIGHTS, x: 0.82, y: 0.86, size: 0.035, pose: 'open', group: { count: 9, w: 0.3, h: 0.03, seed: 1224 } },
    // The night sky, its stars, and the bright star out of Jacob (the golden thread), with a king's scepter.
    ...ORACLE.map((o): SceneActor => ({ id: o.star, prop: 'counted-star', above: HEIGHTS, x: o.x, y: o.y, size: 0.012, opacity: 0 })),
    { id: STAR.glow, prop: 'halo', above: HEIGHTS, x: STAR.x, y: STAR.y, size: 0.18, opacity: 0 },
    { id: STAR.id, prop: 'counted-star', above: HEIGHTS, x: STAR.x, y: STAR.y, size: 0.04, opacity: 0 },
    { id: 'scepter', prop: 'rod', above: HEIGHTS, x: STAR.x, y: STAR.y + 0.14, size: 0.014, pose: 'scepter', opacity: 0 },
  ],
  camera: DRIFT,
}


const scenes: StoryScene[] = [
  {
    id: 'l12-e8-s1',
    title: 'How can I curse?',
    music: 'mozart-alleluja',
    beats: [
      verse('NUM 23:7', ...pose('balaam', 'lift', 0.5, 4)),
      verse('NUM 23:8', camera({ zoom: 1.02 }, slow)),
      verse('NUM 23:11', camera({ zoom: 1 }, slow), ...walk('balak', { x: 0.5 }, 1.5, 0.5), ...pose('balak', 'lift', 2, 3)),
      verse('NUM 23:12', ...pose('balaam', 'pray', 0.5, 3)),
    ],
  },
  {
    id: 'l12-e8-s2',
    title: 'God is not man',
    music: 'mozart-alleluja',
    beats: [
      verse('NUM 23:19', ...pose('balaam', 'lift', 0.5, 4)),
      verse('NUM 23:20'),
      verse('NUM 24:2', ...walk('balaam', { x: 0.7, facing: 1 }, 2, 0.5), camera({ zoom: 1.03, x: 0.02 }, slow)),
      verse('NUM 24:5', ...pose('balaam', 'lift', 0.3, 5)),
      verse('NUM 24:10', camera({ zoom: 1, x: 0 }, slow), ...walk('balak', { x: 0.58 }, 1.5, 0.3), ...pose('balak', 'work', 2, 2)),
    ],
  },
  {
    id: 'l12-e8-s3',
    title: 'A star shall come forth out of Jacob',
    music: 'mozart-alleluja',
    beats: [
      say('Balaam had one more thing to say before he went home: not about Israel’s past, or even its present, but about someone still to come.', ...swap('forest-sky', 'night-sky'), actor('balaam', { facing: -1 }, { seconds: 0.4, delay: 1 })),
      verse('NUM 24:16', fadeIn(STAR.glow, 1, 0.85)),
      verse('NUM 24:17', camera({ zoom: 1.02, y: -0.02 }, slow)),
      play('a-star-out-of-jacob', {
        done: [...ORACLE.map((o) => actor(o.star, { opacity: 1 }, { seconds: 0.5 })), actor(STAR.id, { opacity: 1 }, { seconds: 0.5 }), actor('scepter', { opacity: 0.9 }, { seconds: 0.5 })],
      }),
      say('Centuries later, wise men from the east, the land Balaam came from, saw a new star rise, and followed it to a little house in Bethlehem.', camera({ zoom: 1, y: 0 }, slow), ...['balak', 'princes'].map((id) => fadeOut(id, 1))),
    ],
  },
]

export const episode8: Pick<Episode, 'set' | 'scenes'> = { set: starSet, scenes }
