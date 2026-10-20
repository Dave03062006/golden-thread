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
  // Level 3 · Abraham, Father of Faith
  // Episode 1: the hymn the spec names for this level.
  {
    id: 'god-of-abraham-praise',
    title: 'The God of Abraham Praise',
    work: 'Hymn tune Leoni, for concert band',
    composer: 'Traditional Hebrew melody (Leoni)',
    performer: 'The Concert Band of the United States Air Force Band',
    year: 1997,
    license: 'public-domain',
    licenseNote: 'A work of the United States government (a military band), in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:The_God_of_Abraham_Praise_-_Concert_Band_-_United_States_Air_Force_Band.mp3',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_God_of_Abraham_Praise_-_Concert_Band_-_United_States_Air_Force_Band.mp3',
    credit: 'The God of Abraham Praise (Leoni). The Concert Band of the United States Air Force Band, from Esprit de Corps (1997). Public domain.',
  },
  // Episode 2: Lot chose by sight; Abram by the vision of God.
  {
    id: 'be-thou-my-vision',
    title: 'Be Thou My Vision',
    work: 'Hymn tune Slane, on acoustic guitar',
    composer: 'Traditional Irish melody (Slane)',
    performer: 'Walmartshopper (a Wikipedia contributor)',
    year: 2007,
    license: 'public-domain',
    licenseNote: 'Released into the public domain by the performer, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Be_thou_my_vision_acoustic_by_walmartshopper.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Be_thou_my_vision_acoustic_by_walmartshopper.ogg',
    credit: 'Be Thou My Vision (Slane), acoustic guitar, by the Wikipedia contributor Walmartshopper (2007). Public domain, via Wikimedia Commons.',
  },
  // Episode 3, in place of the chant Adoro te devote, for which no recording under an
  // allowed license was found: another hymn to the Body of Christ.
  {
    id: 'byrd-ave-verum',
    title: 'Ave verum corpus',
    composer: 'William Byrd',
    performer: 'Stile Antico',
    year: 2017,
    license: 'cc0',
    licenseNote: 'Dedicated to the public domain (CC0) by its publisher, St Paul’s Episcopal Church, Indianapolis, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Byrd_-_Ave_Verum_Corpus_(Stile_Antico).ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Byrd_-_Ave_Verum_Corpus_(Stile_Antico).ogg',
    credit: 'Byrd, Ave verum corpus. Stile Antico, at St Paul’s Episcopal Church, Indianapolis (2017). CC0, via Wikimedia Commons.',
  },
  // Episode 5, in place of “Wayfaring Stranger,” for which no recording under an allowed
  // license was found: a spiritual of the enslaved, for Hagar, the slave woman God sees.
  {
    id: 'swing-low',
    title: 'Swing Low, Sweet Chariot',
    work: 'Spiritual',
    composer: 'Wallace Willis',
    performer: 'The Fisk Jubilee Singers',
    year: 1920,
    license: 'public-domain',
    licenseNote: 'Recorded between 1915 and 1920, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Swing_Low,_Sweet_Chariot_-_Fisk_Jubilee_Singers.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Swing_Low,_Sweet_Chariot_-_Fisk_Jubilee_Singers.ogg',
    credit: 'Swing Low, Sweet Chariot. The Fisk Jubilee Singers (recorded 1915–1920). Public domain, via Wikimedia Commons.',
  },
  // Episode 6: the everlasting covenant.
  {
    id: 'bach-jesu-joy',
    title: 'Jesus bleibet meine Freude (Jesu, Joy of Man’s Desiring)',
    work: 'Cantata Herz und Mund und Tat und Leben, BWV 147',
    composer: 'Johann Sebastian Bach',
    performer: 'Orchestra Gli Armonici',
    year: 2012,
    license: 'cc0',
    licenseNote: 'Dedicated to the public domain (CC0) through Musopen, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Bach,_BWV_147,_10._Jesus_bleibet_meine_Freude.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bach,_BWV_147,_10._Jesus_bleibet_meine_Freude.ogg',
    credit: 'Bach, Jesus bleibet meine Freude, BWV 147. Orchestra Gli Armonici (Musopen). CC0, via Wikimedia Commons.',
  },
  // Episode 7: the three visitors and the Trinity.
  {
    id: 'holy-holy-holy',
    title: 'Holy, Holy, Holy, Lord God Almighty',
    work: 'Hymn 4 from The Army and Navy Hymnal (tune Nicaea)',
    composer: 'John B. Dykes',
    performer: 'Kevin W. Davidson, for LibriVox',
    year: 2014,
    license: 'public-domain',
    licenseNote: 'A LibriVox recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Army_and_Navy_Hymnal-0004.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Army_and_Navy_Hymnal-0004.ogg',
    credit: 'Dykes, Holy, Holy, Holy (Nicaea), from The Army and Navy Hymnal. Kevin W. Davidson, LibriVox (2014). Public domain.',
  },
  // Episode 8, in place of the chant Parce Domine, for which no recording under an
  // allowed license was found: “Lord, have mercy,” for Abraham’s intercession.
  {
    id: 'palestrina-kyrie',
    title: 'Kyrie',
    work: 'Missa Papae Marcelli',
    composer: 'Giovanni Pierluigi da Palestrina',
    performer: 'European Archive (via Musopen)',
    year: 2020,
    license: 'cc0',
    licenseNote: 'Dedicated to the public domain (CC0) through Musopen, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Missa_Papae_Marcelli_-_I._Kyrie.flac',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Missa_Papae_Marcelli_-_I._Kyrie.flac',
    credit: 'Palestrina, Missa Papae Marcelli: Kyrie. European Archive (Musopen). CC0, via Wikimedia Commons.',
  },
  // Episode 9: laughter and joy at Isaac’s birth.
  {
    id: 'mozart-alleluja',
    title: 'Alleluja',
    work: 'Exsultate, jubilate, K. 165',
    composer: 'Wolfgang Amadeus Mozart',
    performer: 'The United States Army Field Band (Sgt. 1st Class Rachel Farber, soprano)',
    year: 2021,
    license: 'public-domain',
    licenseNote: 'A work of the United States government (a military band), in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Exsultate,_jubilate_-_IV._Alleluja_-_United_States_Army_Field_Band.opus',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Exsultate,_jubilate_-_IV._Alleluja_-_United_States_Army_Field_Band.opus',
    credit: 'Mozart, Exsultate, jubilate: Alleluja. The United States Army Field Band, Rachel Farber, soprano (2021). Public domain.',
  },
  // Episode 10: Isaac and the wood, and the Lamb on Calvary.
  {
    id: 'o-haupt-voll-blut',
    title: 'O Haupt voll Blut und Wunden (O Sacred Head, Now Wounded)',
    work: 'The Passion Chorale, EG 85, on the organ',
    composer: 'Hans Leo Hassler, harmonized by Johann Sebastian Bach',
    performer: 'Volker Schöpfer',
    year: 2021,
    license: 'cc-by',
    licenseNote: 'Published by the performer under the Creative Commons Attribution 4.0 license, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Volker_Sch%C3%B6pfer_-_O_Haupt_voll_Blut_und_Wunden_EG_85.mp3',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Volker_Sch%C3%B6pfer_-_O_Haupt_voll_Blut_und_Wunden_EG_85.mp3',
    credit: 'O Haupt voll Blut und Wunden (the Passion Chorale), EG 85. Volker Schöpfer (2021). CC BY 4.0, via Wikimedia Commons.',
  },
  // The minigames: bright and moving, for the journey and the feast.
  {
    id: 'vivaldi-autumn-allegro',
    title: 'Autumn: Allegro (La caccia)',
    work: 'The Four Seasons, RV 293',
    composer: 'Antonio Vivaldi',
    performer: 'The Modena Chamber Orchestra',
    year: 2019,
    license: 'public-domain',
    licenseNote: 'Dedicated to the public domain by the orchestra through Musopen, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:The_Modena_Chamber_Orchestra_-_Vivaldi\'s_Autumn,_RV_293_-_III._Allegro.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Modena_Chamber_Orchestra_-_Vivaldi\'s_Autumn,_RV_293_-_III._Allegro.ogg',
    credit: 'Vivaldi, The Four Seasons, Autumn: Allegro. The Modena Chamber Orchestra (Musopen). Public domain, via Wikimedia Commons.',
  },
  // Reflection and prayer, in place of Mozart’s Ave verum corpus, for which no recording
  // under an allowed license was found: the Bread of Angels, the sacrifice God provided.
  {
    id: 'franck-panis-angelicus',
    title: 'Panis angelicus',
    composer: 'César Franck',
    performer: 'The Ahots-Argiak choir of Vitoria-Gasteiz',
    year: 2026,
    license: 'cc0',
    licenseNote: 'Dedicated to the public domain (CC0) by the recordist, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Panis_Angelicus_Cesar_Frank.webm',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Panis_Angelicus_Cesar_Frank.webm',
    credit: 'Franck, Panis angelicus. The Ahots-Argiak choir of Vitoria-Gasteiz. CC0, via Wikimedia Commons.',
  },
  // The quiz: shade under a tree, like Mamre.
  {
    id: 'handel-ombra-mai-fu',
    title: 'Ombra mai fu (the Largo)',
    work: 'Serse, HWV 40',
    composer: 'George Frideric Handel',
    performer: 'Enrico Caruso',
    year: 1920,
    license: 'public-domain',
    licenseNote: 'Recorded in 1920 for Victor, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Enrico_Caruso,_George_Frideric_Handel,_Ombra_mai_fu_(Serse).ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Enrico_Caruso,_George_Frideric_Handel,_Ombra_mai_fu_(Serse).ogg',
    credit: 'Handel, Serse: Ombra mai fu. Enrico Caruso (Victor, 1920). Public domain.',
  },
  // Level 4 · Isaac and Jacob
  // Episode 1: wells, camels and flocks, a peaceful pastoral journey.
  {
    id: 'bach-sheep-may-safely-graze',
    title: 'Sheep May Safely Graze',
    work: 'Cantata 208, BWV 208',
    composer: 'Johann Sebastian Bach',
    performer: 'Kevin MacLeod',
    year: 2011,
    license: 'cc-by',
    licenseNote: 'Published by the performer under the Creative Commons Attribution 3.0 license, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_J_S_Bach_Sheep_May_Safely_Graze_-_BWV_208.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kevin_MacLeod_-_J_S_Bach_Sheep_May_Safely_Graze_-_BWV_208.ogg',
    credit: 'Bach, Sheep May Safely Graze, BWV 208. Kevin MacLeod (2011). CC BY 3.0, via Wikimedia Commons.',
  },
  // Episode 4, in place of the spiritual “We Are Climbing Jacob’s Ladder”, for which no
  // recording under an allowed license was found: a hymn that retells Jacob’s dream.
  {
    id: 'nearer-my-god',
    title: 'Nearer, My God, to Thee',
    composer: 'Lowell Mason (tune Bethany), words by Sarah Flower Adams',
    performer: 'The United States Air Force Band, Concert Band',
    year: 1997,
    license: 'public-domain',
    licenseNote: 'A work of the United States Air Force, made as part of official duties, so it is in the public domain.',
    source: 'https://commons.wikimedia.org/wiki/File:Nearer_My_God_to_Thee_-_Concert_Band_-_United_States_Air_Force_Band.mp3',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nearer_My_God_to_Thee_-_Concert_Band_-_United_States_Air_Force_Band.mp3',
    credit: 'Nearer, My God, to Thee. The Concert Band of the United States Air Force Band (1997). Public domain.',
  },
  // Episode 5: seven years of love, and a wedding.
  {
    id: 'pachelbel-canon',
    title: 'Canon in D',
    composer: 'Johann Pachelbel, arranged by Frank Hudson',
    performer: 'The United States Air Force Band, Strolling Strings',
    year: 2004,
    license: 'public-domain',
    licenseNote: 'A work of the United States Air Force, made as part of official duties, so it is in the public domain.',
    source: 'https://commons.wikimedia.org/wiki/File:Canon_(2004)_-_Strolling_Strings_-_United_States_Air_Force_Band.mp3',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Canon_(2004)_-_Strolling_Strings_-_United_States_Air_Force_Band.mp3',
    credit: 'Pachelbel, Canon in D. The Strolling Strings of the United States Air Force Band (2004). Public domain.',
  },
  // Episode 6: the road home, and the long night by the Jabbok.
  {
    id: 'dvorak-largo',
    title: 'Largo',
    work: 'Symphony No. 9, “From the New World”, Op. 95',
    composer: 'Antonín Dvořák',
    performer: 'Musopen',
    year: 2012,
    license: 'public-domain',
    licenseNote: 'Released into the public domain through Musopen, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Antonin_Dvorak_-_symphony_no._9_in_e_minor_%27from_the_new_world%27,_op._95_-_ii._largo.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Antonin_Dvorak_-_symphony_no._9_in_e_minor_%27from_the_new_world%27,_op._95_-_ii._largo.ogg',
    credit: 'Dvořák, Symphony No. 9, Largo. Musopen. Public domain, via Wikimedia Commons.',
  },
  // Episode 7, in place of the chant Ubi caritas, for which no recording under an allowed
  // license was found: “I once was lost, but now am found,” for the brothers reconciled.
  {
    id: 'amazing-grace',
    title: 'Amazing Grace',
    composer: 'Traditional (tune New Britain), words by John Newton',
    performer: 'The United States Air Force Band, Strolling Strings',
    year: 2004,
    license: 'public-domain',
    licenseNote: 'A work of the United States Air Force, made as part of official duties, so it is in the public domain.',
    source: 'https://commons.wikimedia.org/wiki/File:Amazing_Grace_(USAFB_strings).ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Amazing_Grace_(USAFB_strings).ogg',
    credit: 'Amazing Grace. The Strolling Strings of the United States Air Force Band (2004). Public domain.',
  },
  // Reflection and prayer, in place of “Nearer, My God, to Thee”, which moved to Episode 4:
  // “Abide with me”, as God promised Jacob, “I am with you.”
  {
    id: 'abide-with-me',
    title: 'Abide with Me',
    work: 'The Army and Navy Hymnal, Hymn 9',
    composer: 'William Henry Monk (tune Eventide), words by Henry Francis Lyte',
    performer: 'Ruth Golding (LibriVox)',
    year: 2013,
    license: 'public-domain',
    licenseNote: 'A LibriVox recording, dedicated to the public domain by its reader, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Army_and_Navy_Hymnal-0009.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Army_and_Navy_Hymnal-0009.ogg',
    credit: 'Abide with Me, from The Army and Navy Hymnal. Ruth Golding, LibriVox (2013). Public domain.',
  },
  // The quiz: gentle and unhurried.
  {
    id: 'mozart-romanze',
    title: 'Romanze',
    work: 'Eine kleine Nachtmusik (Serenade No. 13), K. 525',
    composer: 'Wolfgang Amadeus Mozart',
    performer: 'Musopen',
    year: 2014,
    license: 'public-domain',
    licenseNote: 'Released into the public domain through Musopen, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Mozart_-_Serenade_No._13_for_strings_in_G_major,_K._525_-_Romanze.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mozart_-_Serenade_No._13_for_strings_in_G_major,_K._525_-_Romanze.ogg',
    credit: 'Mozart, Eine kleine Nachtmusik: Romanze. Musopen. Public domain, via Wikimedia Commons.',
  },
]

const BY_ID = new Map(TRACKS.map((track) => [track.id, track]))

export function trackById(id: string): Track | undefined {
  return BY_ID.get(id)
}
