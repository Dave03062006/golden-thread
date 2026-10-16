import type { SceneDescription } from '../../../scene/types'
import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { level1Music } from './music'

/**
 * Level 1 · Creation and the Fall (Genesis 1–5), from the approved Level 1 script
 * (docs/scripts/level-01-creation-and-fall.md). Episode 1 is built; the others follow
 * in milestone 4 and are listed here with everything except their scenes.
 */

/** An episode that's written but not built yet: no set and no scenes. */
function planned(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  const set: SceneDescription = {
    id: `${fields.id}-set`,
    title: fields.title,
    layers: [],
    actors: [],
    camera: { loop: 'hold', x: [{ at: 0, value: 0 }], y: [{ at: 0, value: 0 }], zoom: [{ at: 0, value: 1 }] },
  }
  return { ...fields, set, scenes: [] }
}

const where = (when: string, notes: [string, string][], places: string[] = []): WhereWhen => ({
  places,
  when,
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level1: Level = {
  id: 'l01',
  number: 1,
  title: 'Creation and the Fall',
  age: 'I · The Beginning',
  passage: 'GEN 1:1-5:32',
  music: level1Music,
  episodes: [
    episode1,
    planned({
      id: 'l01-e2',
      number: 2,
      title: 'The Garden of Eden',
      passage: 'GEN 2:4-25',
      minutes: 8,
      thread: { id: 'marriage-christ-and-the-church', spot: 'sleeping-light', fromScene: 'l01-e2-s5' },
      whereWhen: where(
        'Before recorded history',
        [
          [
            'Eden, “in the east”',
            'Genesis names four rivers. The Tigris and the Euphrates still flow through modern Turkey, Syria and Iraq, the land called Mesopotamia. The Pishon and the Gihon are unknown.',
          ],
          ['Two accounts', 'Genesis 1 and 2 tell creation from two angles, first from the heavens and then up close. Ancient writers often told one truth from more than one side.'],
          ['Words to know', '“Adam” means man or humankind, and sounds like “adamah,” ground.'],
        ],
        ['eden', 'tigris', 'euphrates', 'pishon', 'gihon', 'mesopotamia'],
      ),
      read: ['GEN 2:4-25'],
    }),
    planned({
      id: 'l01-e3',
      number: 3,
      title: 'The Serpent and the Fall',
      passage: 'GEN 3:1-13',
      minutes: 7,
      thread: { id: 'obedience-in-a-garden', spot: 'forbidden-tree', fromScene: 'l01-e3-s1' },
      whereWhen: where('Before recorded history', [
        ['The serpent', 'In the ancient world, serpents stood for wisdom, life and danger all at once. Revelation 12:9 identifies “that ancient serpent” as the devil.'],
        [
          '“Knowing good and evil”',
          'This means deciding for oneself what is good and what is evil, which belongs to God alone. The tree stands for the limit a creature accepts with trust (Catechism 396).',
        ],
      ]),
      read: ['GEN 3:1-13'],
    }),
    planned({
      id: 'l01-e4',
      number: 4,
      title: 'The Promise and the Exile',
      passage: 'GEN 3:14-24',
      minutes: 8,
      thread: { id: 'the-woman-and-her-offspring', spot: 'promise-light', fromScene: 'l01-e4-s1' },
      whereWhen: where('Before recorded history', [
        [
          '“He shall bruise your head”',
          'The Hebrew points to the woman’s offspring. St. Jerome’s Latin translation (the Vulgate) reads “she shall crush,” and the Douay-Rheims follows it. That’s why so many paintings show Mary crushing the serpent. Both readings honor the same truth: the Son of the Woman, and his mother with him, defeat the serpent.',
        ],
        ['Cherubim', 'In Scripture, cherubim guard holy places. Later, golden cherubim would stand over the ark of the covenant (Exodus 25).'],
      ]),
      read: ['GEN 3:14-24'],
    }),
    planned({
      id: 'l01-e5',
      number: 5,
      title: 'Cain and Abel',
      passage: 'GEN 4:1-16',
      minutes: 9,
      contentNote: 'This episode tells of the first murder. It is told with restraint, and nothing is shown.',
      thread: { id: 'the-blood-of-abel', spot: 'crying-ground', fromScene: 'l01-e5-s6' },
      whereWhen: where(
        'Before recorded history',
        [
          ['The land of Nod, “east of Eden”', '“Nod” sounds like the Hebrew word for wandering.'],
          ['Offerings', 'Shepherds offered their firstborn animals and farmers their first fruits. Giving the first was a way of saying that everything belongs to God.'],
        ],
        ['nod'],
      ),
      read: ['GEN 4:1-16'],
    }),
    planned({
      id: 'l01-e6',
      number: 6,
      title: 'From Adam to Noah',
      passage: 'GEN 4:17-5:32',
      minutes: 6,
      thread: { id: 'from-adam-to-jesus', spot: 'tree-root', fromScene: 'l01-e6-s1' },
      whereWhen: where('Before recorded history', [
        ['The first civilization', 'Genesis credits Cain’s line with the first cities, herding, music and metalwork.'],
        ['Ten generations', 'Ancient family lists often used ten generations to cover a whole age. The list from Shem to Abraham in Genesis 11 has ten as well.'],
      ]),
      read: ['GEN 4:17-5:32'],
    }),
  ],
}
