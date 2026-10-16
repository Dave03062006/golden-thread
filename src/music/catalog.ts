/**
 * Every free recording the game plays, with everything needed to use it fairly (spec
 * §11.3, §12.3): what it is, who performed it, its license, where it came from, and the
 * credit line shown on the Credits screen. Only public domain, CC0 and CC BY are allowed;
 * a test refuses anything else, and anything without a credit.
 *
 * The audio itself is prepared by `npm run media` (scripts/media.mjs): it downloads each
 * track from `download`, trims it if asked, and compresses it into the git-ignored
 * `media/` folder, which the game loads from (see engine/audio/files.ts).
 */

export type License = 'public-domain' | 'cc0' | 'cc-by'

export const ALLOWED_LICENSES: readonly License[] = ['public-domain', 'cc0', 'cc-by']

export interface Track {
  id: string
  title: string
  /** The larger work it comes from, if any. */
  work?: string
  composer: string
  performer: string
  year: number
  license: License
  /** Why the license applies, in plain words. */
  licenseNote: string
  /** The page that states the license. */
  source: string
  /** Where `npm run media` downloads the original from. */
  download: string
  /** Shown on the Credits screen. */
  credit: string
  /** Named moments in the track, in seconds, that a story can land on. */
  cues?: Record<string, number>
}

/** The St Matthew's Choir recording of Haydn's The Creation, 2010: public domain worldwide. */
function creation(number: number, id: string, title: string): Track {
  // The file names on Wikimedia Commons use straight apostrophes.
  const file = `Haydn - The Creation (Dalal) - ${number} ${title.replaceAll('’', "'")}.oga`
  return {
    id,
    title,
    work: 'The Creation',
    composer: 'Joseph Haydn',
    performer: 'St Matthew’s Choir, Phiroz Dalal, conductor',
    year: 2010,
    license: 'public-domain',
    licenseNote: 'Released into the public domain worldwide, for any purpose, by its recordist, Ron Keefe.',
    source: `https://commons.wikimedia.org/wiki/File:${file.replaceAll(' ', '_')}`,
    download: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file.replaceAll(' ', '_'))}`,
    credit: `Haydn, The Creation, “${title}”. St Matthew’s Choir, Phiroz Dalal, conductor (2010). Public domain.`,
  }
}

export const TRACKS: Track[] = [
  creation(1, 'creation-chaos', 'The Representation of Chaos'),
  {
    ...creation(2, 'creation-in-the-beginning', 'In the beginning'),
    // The blazing C major chord on "and there was light" (found by scripts/media.mjs --cues).
    cues: { light: 121.65 },
  },
  creation(3, 'creation-now-vanish', 'Now vanish before the holy beams'),
  creation(5, 'creation-marvelous-work', 'The marv’lous work'),
  creation(7, 'creation-rolling-billows', 'Rolling in foaming billows'),
  creation(9, 'creation-verdure', 'With verdure clad'),
  creation(11, 'creation-awake-the-harp', 'Awake the harp'),
  creation(13, 'creation-splendour', 'In splendour bright'),
  creation(14, 'creation-heavens-telling', 'The heavens are telling'),
  creation(16, 'creation-mighty-pens', 'On mighty pens'),
  creation(19, 'creation-most-beautiful', 'Most beautiful appear'),
  creation(21, 'creation-earth-bring-forth', 'And God said, let the earth bring forth'),
  creation(23, 'creation-native-worth', 'In native worth'),
  creation(25, 'creation-glorious-work', 'Achieved is the glorious work'),
  creation(29, 'creation-by-thee', 'By Thee with bliss'),
  creation(30, 'creation-fairest', 'Of stars the fairest'),
  {
    id: 'bach-air',
    title: 'Air',
    work: 'Orchestral Suite No. 3, BWV 1068',
    composer: 'Johann Sebastian Bach',
    performer: 'United States Air Force Strings, Keith H. Bland, conductor',
    year: 2000,
    license: 'public-domain',
    licenseNote: 'A work of the United States Air Force, made as part of official duties, so it is in the public domain.',
    source: 'https://commons.wikimedia.org/wiki/File:Air.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Air.ogg',
    credit: 'Bach, Air from the Orchestral Suite No. 3, BWV 1068. United States Air Force Strings, Keith H. Bland, conductor (2000). Public domain.',
  },
  // Episode 3, in place of the chant Attende Domine, for which no recording under an
  // allowed license was found: Psalm 51, the great psalm of repentance.
  {
    id: 'allegri-miserere',
    title: 'Miserere mei, Deus',
    composer: 'Gregorio Allegri',
    performer: 'Ensamble Escénico Vocal, Sistema Nacional de Fomento Musical',
    year: 2021,
    license: 'cc-by',
    licenseNote: 'Published by the ensemble under the Creative Commons Attribution 3.0 license, as reviewed on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Allegri_-_Miserere_Mei,_Deus_-_Ensamble_Esc%C3%A9nico_Vocal_(audio).ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Allegri_-_Miserere_Mei,_Deus_-_Ensamble_Esc%C3%A9nico_Vocal_(audio).ogg',
    credit:
      'Allegri, Miserere mei, Deus. Ensamble Escénico Vocal of the Sistema Nacional de Fomento Musical, recorded in the Cathedral of Tlaxcala, Mexico (2021). CC BY 3.0, via Wikimedia Commons.',
  },
  // Episode 4, in place of the chant Ave Maris Stella, for which no recording under an
  // allowed license was found: like the chant, it greets Mary, the new Eve.
  {
    id: 'parsons-ave-maria',
    title: 'Ave Maria',
    composer: 'Robert Parsons',
    performer: 'St. Paul’s Episcopal Church, Indianapolis',
    year: 2024,
    license: 'cc0',
    licenseNote: 'Dedicated to the public domain (CC0) by its publisher, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Ave_Maria_-_Parsons.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ave_Maria_-_Parsons.ogg',
    credit: 'Parsons, Ave Maria. St. Paul’s Episcopal Church, Indianapolis (2024). CC0, via Wikimedia Commons.',
  },
  // Episode 5, in place of the chant Parce Domine: a prayer for mercy, "I call to you".
  {
    id: 'bach-ich-ruf',
    title: 'Ich ruf zu dir, Herr Jesu Christ',
    work: 'Orgelbüchlein, BWV 639, arranged for piano by Ferruccio Busoni',
    composer: 'Johann Sebastian Bach',
    performer: 'Chiara Bertoglio, piano',
    // The recording's own year isn't given; this is the year it was published on Wikimedia Commons.
    year: 2016,
    license: 'cc-by',
    licenseNote: 'Released by Musopen under the Creative Commons Attribution 3.0 license, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:J.S._Bach_-_Ich_ruf%27_zu_dir,_Herr,_BWV_639_(for_piano_-_Busoni).ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/J.S._Bach_-_Ich_ruf%27_zu_dir,_Herr,_BWV_639_(for_piano_-_Busoni).ogg',
    credit: 'Bach, Ich ruf zu dir, Herr Jesu Christ, BWV 639, arranged by Busoni. Chiara Bertoglio, piano (Musopen). CC BY 3.0, via Wikimedia Commons.',
  },
]

const BY_ID = new Map(TRACKS.map((track) => [track.id, track]))

export function trackById(id: string): Track | undefined {
  return BY_ID.get(id)
}
