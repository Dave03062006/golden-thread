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
  // Episode 6: the chorale the script names, trust in God handed down the generations.
  {
    id: 'bach-wer-nur',
    title: 'Wer nur den lieben Gott lässt walten',
    work: 'Chorale by Georg Neumark, in Bach’s four-part setting',
    composer: 'Georg Neumark, harmonized by Johann Sebastian Bach',
    performer: 'Gloria-Kirchenchor',
    // First released before 1936; the exact year isn't known.
    year: 1935,
    license: 'public-domain',
    licenseNote: 'A recording first released before 1936, in the public domain, published by the Swiss Public Domain Project on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Gloria-go-13319a-bi-666.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gloria-go-13319a-bi-666.ogg',
    credit: 'Neumark, Wer nur den lieben Gott lässt walten, in Bach’s setting. Gloria-Kirchenchor (released before 1936). Public domain, via the Public Domain Project and Wikimedia Commons.',
  },

  // Level 2 · Noah and the Nations
  // Episode 1: the chorale the script names, Psalm 130, "Out of the depths I cry to you."
  {
    id: 'bach-aus-tiefer-not',
    title: 'Aus tiefer Not schrei ich zu dir',
    work: 'Clavier-Übung III, BWV 686',
    composer: 'Johann Sebastian Bach',
    performer: 'Alexandre Cellier, organ of Saint-Nicolas-des-Champs, Paris',
    year: 1935,
    license: 'public-domain',
    licenseNote: 'A recording first released in 1935, in the public domain, published by the Swiss Public Domain Project on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Disques_lumen-32026-yl52.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Disques_lumen-32026-yl52.ogg',
    credit: 'Bach, Aus tiefer Not schrei ich zu dir, BWV 686. Alexandre Cellier, organ (1935). Public domain, via the Public Domain Project and Wikimedia Commons.',
  },
  // Episode 2: the sailors’ hymn the script names.
  {
    id: 'navy-hymn',
    title: 'Eternal Father, Strong to Save',
    work: 'The Navy Hymn, arranged by Claude T. Smith',
    composer: 'John B. Dykes',
    performer: '“The President’s Own” United States Marine Band, Col. John R. Bourgeois, conductor',
    year: 1992,
    license: 'public-domain',
    licenseNote: 'A work of the United States government (a military band), in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:%22Eternal_Father,_Strong_to_Save%22_(1992),_performed_by_the_United_States_Marine_Band.oga',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/%22Eternal_Father,_Strong_to_Save%22_(1992),_performed_by_the_United_States_Marine_Band.oga',
    credit: 'Dykes, Eternal Father, Strong to Save. “The President’s Own” United States Marine Band, John R. Bourgeois, conductor (1992). Public domain.',
  },
  // Episode 3: the storm.
  {
    id: 'vivaldi-summer-presto',
    title: 'Summer: Presto',
    work: 'The Four Seasons, RV 315',
    composer: 'Antonio Vivaldi',
    performer: 'The Modena Chamber Orchestra',
    year: 2020,
    license: 'public-domain',
    licenseNote: 'Dedicated to the public domain by the orchestra through Musopen, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:The_Modena_Chamber_Orchestra_-_Vivaldi%27s_Summer,_RV_315_-_III._Presto.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Modena_Chamber_Orchestra_-_Vivaldi%27s_Summer,_RV_315_-_III._Presto.ogg',
    credit: 'Vivaldi, The Four Seasons, Summer: Presto. The Modena Chamber Orchestra (Musopen). Public domain, via Wikimedia Commons.',
  },
  // Episode 4, in place of the chant Veni Creator Spiritus (no full recording under an
  // allowed license was found): the chorale "Come, Holy Spirit, Lord God," on a psalmodikon.
  {
    id: 'komm-heiliger-geist',
    title: 'Kom, helge Ande, Herre god',
    work: 'Chorale no. 134 from Johan Dillner’s chorale book (1832), “Komm, Heiliger Geist, Herre Gott”',
    composer: 'Traditional chorale',
    performer: 'Played on a psalmodikon, for the Swedish Performing Arts Agency',
    // The recording's own year isn't given; this is the year it was published on Wikimedia Commons.
    year: 2023,
    license: 'cc0',
    licenseNote: 'Dedicated to the public domain (CC0) by the Swedish Performing Arts Agency, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Kom_helge_Ande_herre_god_-_Koral_nr_134_-_SMV_-_MMF7_0542_20.wav',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kom_helge_Ande_herre_god_-_Koral_nr_134_-_SMV_-_MMF7_0542_20.wav',
    credit: 'Chorale “Come, Holy Spirit, Lord God” (Kom, helge Ande, Herre god), on a psalmodikon. Swedish Performing Arts Agency. CC0, via Wikimedia Commons.',
  },
  // Episode 6: the Pentecost Sequence the script names.
  {
    id: 'veni-sancte-spiritus',
    title: 'Veni Sancte Spiritus',
    work: 'The Sequence of Pentecost',
    composer: 'Gregorian chant',
    performer: 'Membeth',
    year: 2010,
    license: 'public-domain',
    licenseNote: 'Released into the public domain by its performer, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Veni.sancte.spiritus.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Veni.sancte.spiritus.ogg',
    credit: 'Veni Sancte Spiritus, the Sequence of Pentecost, Gregorian chant. Sung by Membeth (2010). Public domain, via Wikimedia Commons.',
  },
  // Reflection and prayer, in place of the chant Vidi aquam (none under an allowed license
  // was found): Psalm 117, "Praise the LORD, all nations," set by Mozart, calm and prayerful.
  {
    id: 'mozart-laudate-dominum',
    title: 'Laudate Dominum',
    work: 'Vesperae solennes de confessore, K. 339',
    composer: 'Wolfgang Amadeus Mozart',
    performer: 'The “Cooke” recording, shared on the Internet Archive',
    year: 2004,
    license: 'cc0',
    licenseNote: 'Dedicated to the public domain (CC0), as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Mozart_-_Vesper%C3%A6_Solennes_de_Confessore_(Cooke)_-_5_Laudate_Dominum.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mozart_-_Vesper%C3%A6_Solennes_de_Confessore_(Cooke)_-_5_Laudate_Dominum.ogg',
    credit: 'Mozart, Vesperae solennes de confessore, K. 339: Laudate Dominum. Internet Archive recording (2004). CC0, via Wikimedia Commons.',
  },
  // Minigames: bright and moving.
  {
    id: 'vivaldi-spring-allegro',
    title: 'Spring: Allegro (Danza pastorale)',
    work: 'The Four Seasons, RV 269',
    composer: 'Antonio Vivaldi',
    performer: 'The Modena Chamber Orchestra',
    year: 2020,
    license: 'public-domain',
    licenseNote: 'Dedicated to the public domain by the orchestra through Musopen, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:The_Modena_Chamber_Orchestra_-_Vivaldi%27s_Spring,_RV_269_-_III._Allegro.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Modena_Chamber_Orchestra_-_Vivaldi%27s_Spring,_RV_269_-_III._Allegro.ogg',
    credit: 'Vivaldi, The Four Seasons, Spring: Allegro. The Modena Chamber Orchestra (Musopen). Public domain, via Wikimedia Commons.',
  },
  // The quiz: the piece the script names, Handel's Water Music.
  {
    id: 'handel-water-music-air',
    title: 'Air and Bourrée',
    work: 'Water Music, Suite in F major, HWV 348, arranged by Hamilton Harty',
    composer: 'George Frideric Handel',
    performer: 'The Hallé, Malcolm Sargent, conductor',
    year: 1942,
    license: 'public-domain',
    licenseNote: 'A recording first released in 1942, in the public domain, published by the Swiss Public Domain Project on Wikimedia Commons.',
    source:
      'https://commons.wikimedia.org/wiki/File:PDP-CH_-_The_Hall%C3%A9_-_Malcolm_Sargent_-_Water_Music,_HWV_348-350_-_Suite_in_F_major,_HWV_348_-_Air,_Bourr%C3%A9e_-_Handel_-_Harty_-_Hmv-c3306-2er623.flac',
    download:
      'https://commons.wikimedia.org/wiki/Special:FilePath/PDP-CH_-_The_Hall%C3%A9_-_Malcolm_Sargent_-_Water_Music,_HWV_348-350_-_Suite_in_F_major,_HWV_348_-_Air,_Bourr%C3%A9e_-_Handel_-_Harty_-_Hmv-c3306-2er623.flac',
    credit: 'Handel, Water Music, Air and Bourrée, arranged by Harty. The Hallé, Malcolm Sargent, conductor (1942). Public domain, via the Public Domain Project and Wikimedia Commons.',
  },
]

const BY_ID = new Map(TRACKS.map((track) => [track.id, track]))

export function trackById(id: string): Track | undefined {
  return BY_ID.get(id)
}
