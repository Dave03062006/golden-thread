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
  // Level 5 · Joseph and His Brothers
  // Episode 1, in place of Handel’s oratorio Joseph and His Brethren, for which no recording
  // under an allowed license was found: the overture of another of his oratorios.
  {
    id: 'handel-messiah-overture',
    title: 'Overture',
    work: 'Messiah, HWV 56',
    composer: 'George Frideric Handel',
    performer: 'The Royal Liverpool Philharmonic, Malcolm Sargent, conductor',
    year: 1947,
    license: 'public-domain',
    licenseNote: 'Recorded in 1947 and in the public domain, as stated on Wikimedia Commons (from the Public Domain Project).',
    source: 'https://commons.wikimedia.org/wiki/File:PDP-CH_-_Royal_Liverpool_Philharmonic_-_Malcolm_Sargent_-_Messiah_-_No.01-_Overture_-_George_Frideric_Handel_-_Columbia-dx1283-cax9602.flac',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/PDP-CH_-_Royal_Liverpool_Philharmonic_-_Malcolm_Sargent_-_Messiah_-_No.01-_Overture_-_George_Frideric_Handel_-_Columbia-dx1283-cax9602.flac',
    credit: 'Handel, Messiah: Overture. The Royal Liverpool Philharmonic, Malcolm Sargent (1947). Public domain.',
  },
  // Episode 2: Joseph in prison, innocent and faithful.
  {
    id: 'nobody-knows',
    title: 'Nobody Knows de Trouble I’ve Seen',
    composer: 'Traditional spiritual',
    performer: 'Marian Anderson',
    year: 1924,
    license: 'public-domain',
    licenseNote: 'Recorded in 1924, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Marian_Anderson_-_Nobody_Knows_de_Trouble_I%27ve_Seen.mp3',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Marian_Anderson_-_Nobody_Knows_de_Trouble_I%27ve_Seen.mp3',
    credit: 'Nobody Knows de Trouble I’ve Seen (spiritual). Marian Anderson (1924). Public domain.',
  },
  // Episode 3: a coronation anthem, for Joseph raised over all Egypt.
  {
    id: 'handel-zadok',
    title: 'Zadok the Priest',
    work: 'Coronation Anthem, HWV 258',
    composer: 'George Frideric Handel',
    performer: 'St Matthew’s Concert Choir, Damien Giromella, director',
    year: 2013,
    license: 'public-domain',
    licenseNote: 'Dedicated to the public domain by the performers, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Handel_-_Zadok_the_Priest,_HWV_258_(St_Matthew%27s_Concert_Choir,_Giromella).oga',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Handel_-_Zadok_the_Priest,_HWV_258_(St_Matthew%27s_Concert_Choir,_Giromella).oga',
    credit: 'Handel, Zadok the Priest, HWV 258. St Matthew’s Concert Choir, Damien Giromella (2013). Public domain.',
  },
  // Episode 4, in place of “Let All Mortal Flesh Keep Silence”, for which no recording under
  // an allowed license was found: another chant of the Eucharist, from the Eastern liturgy.
  {
    id: 'alyabyev-cherubic-hymn',
    title: 'Cherubic Hymn',
    composer: 'Alexander Alyabyev',
    performer: 'Daniel Johnson (Mutopia Project)',
    year: 2008,
    license: 'public-domain',
    licenseNote: 'Dedicated to the public domain by its maker, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Cherubic_Hymn_by_Alexander_Alyabyev.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cherubic_Hymn_by_Alexander_Alyabyev.ogg',
    credit: 'Alyabyev, Cherubic Hymn. Daniel Johnson, Mutopia Project (2008). Public domain.',
  },
  // Episode 6: tears and reunion.
  {
    id: 'elgar-nimrod',
    title: 'Nimrod',
    work: 'Enigma Variations, Op. 36: Variation IX',
    composer: 'Edward Elgar',
    performer: 'The Hallé Orchestra, John Barbirolli, conductor',
    year: 1947,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Elgar;_Enigma_variations,_Theme_IX._Nimrod.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Elgar;_Enigma_variations,_Theme_IX._Nimrod.ogg',
    credit: 'Elgar, Enigma Variations: Nimrod. The Hallé Orchestra, John Barbirolli (1947). Public domain.',
  },
  // Episode 7: the blessing on Judah, and the kingdom to come.
  {
    id: 'handel-glory-of-the-lord',
    title: 'And the glory of the Lord',
    work: 'Messiah, HWV 56',
    composer: 'George Frideric Handel',
    performer: 'The London Philharmonic Choir and London Symphony Orchestra, Hermann Scherchen, conductor',
    year: 1953,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Handel_-_Messiah,_Part_1_(Scherchen)_-_04._And_the_glory_of_the_Lord.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Handel_-_Messiah,_Part_1_(Scherchen)_-_04._And_the_glory_of_the_Lord.ogg',
    credit: 'Handel, Messiah: And the glory of the Lord. London Philharmonic Choir, London Symphony Orchestra, Hermann Scherchen (1953). Public domain.',
  },
  // The minigames, in place of Handel’s “Arrival of the Queen of Sheba”, for which no
  // recording under an allowed license was found: more of Handel’s bright, royal music.
  {
    id: 'handel-water-music-hornpipe',
    title: 'Alla hornpipe',
    work: 'Water Music, Suite No. 2, HWV 349',
    composer: 'George Frideric Handel',
    performer: 'The Marine Chamber Orchestra, United States Marine Band, Michelle Rakers, conductor',
    year: 2017,
    license: 'public-domain',
    licenseNote: 'A work of the United States Marine Band, made as part of official duties, so it is in the public domain.',
    source: 'https://commons.wikimedia.org/wiki/File:Handel%27s_Water_Music_-_12._Alla_hornpipe_-_Chamber_Orchestra_-_United_States_Marine_Band.opus',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Handel%27s_Water_Music_-_12._Alla_hornpipe_-_Chamber_Orchestra_-_United_States_Marine_Band.opus',
    credit: 'Handel, Water Music: Alla hornpipe. The Marine Chamber Orchestra of the United States Marine Band (2017). Public domain.',
  },
  // The quiz, in place of Boccherini’s Minuet, for which no recording under an allowed license
  // was found: light and graceful.
  {
    id: 'handel-harmonious-blacksmith',
    title: 'The Harmonious Blacksmith',
    work: 'Suite No. 5 in E major, HWV 430',
    composer: 'George Frideric Handel',
    performer: 'Musopen',
    year: 2013,
    license: 'cc0',
    licenseNote: 'Dedicated to the public domain (CC0) through Musopen, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Handel_-_Suites_for_Harpsichord_-_No.5_in_E_major_-_The_Harmonious_Blacksmith.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Handel_-_Suites_for_Harpsichord_-_No.5_in_E_major_-_The_Harmonious_Blacksmith.ogg',
    credit: 'Handel, The Harmonious Blacksmith. Musopen. CC0, via Wikimedia Commons.',
  },
  // Level 6 · Job. Episode 1: the trial, solemn and grave.
  {
    id: 'handel-sarabande',
    title: 'Sarabande',
    work: 'Keyboard Suite in D minor, HWV 437',
    composer: 'George Frideric Handel',
    performer: 'Soundtrack Organ, organ arrangement',
    year: 2014,
    license: 'cc-by',
    licenseNote: 'Published by the performer under the Creative Commons Attribution 3.0 license, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Soundtrack_Organ_-_Handel\'s_Keyboard_Suite_in_D_minor,_HWV_437_-_IV._Sarabande_(organ).ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Soundtrack_Organ_-_Handel%27s_Keyboard_Suite_in_D_minor,_HWV_437_-_IV._Sarabande_(organ).ogg',
    credit: 'Handel, Keyboard Suite in D minor, HWV 437: Sarabande, arranged for organ. Soundtrack Organ (2014). CC BY 3.0, via Wikimedia Commons.',
  },
  // Episode 3: thoughtful and turning, like the friends’ long debate.
  {
    id: 'bach-cello-suite-prelude',
    title: 'Prélude',
    work: 'Cello Suite No. 1 in G major, BWV 1007',
    composer: 'Johann Sebastian Bach',
    performer: 'Pablo Casals, cello',
    year: 1938,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Bach_-_Cello_Suite_no._1_in_G_major,_BWV_1007_-_I._Prélude.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bach_-_Cello_Suite_no._1_in_G_major,_BWV_1007_-_I._Pr%C3%A9lude.ogg',
    credit: 'Bach, Cello Suite No. 1: Prélude. Pablo Casals (1938). Public domain.',
  },
  // Episode 4: Job 19:25 itself.
  {
    id: 'handel-i-know-that-my-redeemer',
    title: 'I know that my Redeemer liveth',
    work: 'Messiah, HWV 56',
    composer: 'George Frideric Handel',
    performer: 'Margaret Ritchie, soprano; London Symphony Orchestra, Hermann Scherchen, conductor',
    year: 1953,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Handel_-_Messiah,_Part_3_(Scherchen)_-_46._I_know_that_my_Redeemer_liveth.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Handel_-_Messiah,_Part_3_(Scherchen)_-_46._I_know_that_my_Redeemer_liveth.ogg',
    credit: 'Handel, Messiah: I know that my Redeemer liveth. Margaret Ritchie, London Symphony Orchestra, Hermann Scherchen (1953). Public domain.',
  },
  // Episode 6: restored.
  {
    id: 'handel-hallelujah',
    title: 'Hallelujah',
    work: 'Messiah, HWV 56',
    composer: 'George Frideric Handel',
    performer: 'The London Philharmonic Choir and London Symphony Orchestra, Hermann Scherchen, conductor',
    year: 1953,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Handel_-_Messiah,_Part_2_(Scherchen)_-_45._Hallelujah.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Handel_-_Messiah,_Part_2_(Scherchen)_-_45._Hallelujah.ogg',
    credit: 'Handel, Messiah: Hallelujah. London Philharmonic Choir, London Symphony Orchestra, Hermann Scherchen (1953). Public domain.',
  },
  // The minigames, in place of the Brandenburg Concerto No. 3, whose recordings on Wikimedia
  // Commons are all under a share-alike license: the first concerto’s Allegro, as bright and steady.
  {
    id: 'bach-brandenburg-1-allegro',
    title: 'Allegro',
    work: 'Brandenburg Concerto No. 1 in F major, BWV 1046',
    composer: 'Johann Sebastian Bach',
    performer: 'The Busch Chamber Players, Adolf Busch, conductor',
    year: 1935,
    license: 'cc-by',
    licenseNote: 'Shared by the Internet Archive’s 78 RPMs and Cylinder Recordings collection under the Creative Commons Attribution 3.0 license, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Bach_-_Brandenburg_Concerto_No._1_-_1._Allegro.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bach_-_Brandenburg_Concerto_No._1_-_1._Allegro.ogg',
    credit: 'Bach, Brandenburg Concerto No. 1: Allegro. The Busch Chamber Players (1935), from the Internet Archive’s 78 RPMs and Cylinder Recordings. CC BY 3.0, via Wikimedia Commons.',
  },
  // Reflection and prayer: hope beyond sorrow.
  {
    id: 'faure-in-paradisum',
    title: 'In paradisum',
    work: 'Requiem, Op. 48',
    composer: 'Gabriel Fauré',
    performer: 'Chorale Philippe Caillard and the Orchestre national de l’Opéra de Monte-Carlo, Louis Frémaux, conductor',
    year: 1962,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Fauré_-_Requiem_-_VII._In_paradisum.flac',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Faur%C3%A9_-_Requiem_-_VII._In_paradisum.flac',
    credit: 'Fauré, Requiem: In paradisum. Chorale Philippe Caillard, Orchestre national de l’Opéra de Monte-Carlo, Louis Frémaux (1962). Public domain.',
  },
  // Level 7 · Moses Is Called. Episode 2: a mother and her baby.
  {
    id: 'brahms-wiegenlied',
    title: 'Wiegenlied (Lullaby)',
    work: 'Op. 49 No. 4',
    composer: 'Johannes Brahms',
    performer: 'Ernestine Schumann-Heink, contralto',
    year: 1915,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Brahms_-_Schumann-Heink_-_Wiegenlied_(Berceuse)_(1915).ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Brahms_-_Schumann-Heink_-_Wiegenlied_(Berceuse)_(1915).ogg',
    credit: 'Brahms, Wiegenlied (Lullaby), Op. 49 No. 4. Ernestine Schumann-Heink (1915). Public domain.',
  },
  // Episode 5: the spec’s piece for this level, “Tell old Pharaoh, let my people go.”
  {
    id: 'go-down-moses',
    title: 'Go Down, Moses',
    work: 'Spiritual, arranged by H. T. Burleigh',
    composer: 'Traditional',
    performer: 'Marian Anderson, contralto, with Francis J. Lapitino, harp',
    year: 1924,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Go_down_Moses-Victor_19370-Marian_Anderson.mp3',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Go_down_Moses-Victor_19370-Marian_Anderson.mp3',
    credit: 'Go Down, Moses (spiritual), arranged by H. T. Burleigh. Marian Anderson (1924). Public domain.',
  },
  // The minigames: bright and steady.
  {
    id: 'mozart-nachtmusik-allegro',
    title: 'Allegro',
    work: 'Eine kleine Nachtmusik (Serenade No. 13), K. 525',
    composer: 'Wolfgang Amadeus Mozart',
    performer: 'European Archive (via Musopen)',
    year: 2024,
    license: 'public-domain',
    licenseNote: 'Released into the public domain through Musopen, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Mozart_K525_Serenade_in_G_Major_1_-_Allegro.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mozart_K525_Serenade_in_G_Major_1_-_Allegro.ogg',
    credit: 'Mozart, Eine kleine Nachtmusik: Allegro. European Archive (Musopen). Public domain, via Wikimedia Commons.',
  },
  // Level 8 · The Plagues and the Passover. Episode 2: the slaves’ sorrow under heavier burdens.
  {
    id: 'mozart-lacrimosa',
    title: 'Lacrimosa',
    work: 'Requiem, K. 626',
    composer: 'Wolfgang Amadeus Mozart',
    performer: 'Vienna State Opera Chorus and Vienna Philharmonic, Bruno Walter, conductor',
    year: 1956,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:W._A._Mozart_-_Requiem,_K._626_(Bruno_Walter,_Wiener_Philharmoniker,_Wiener_Staatsopernchor,_1956)_-_08._Lacrimosa.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/W._A._Mozart_-_Requiem,_K._626_(Bruno_Walter,_Wiener_Philharmoniker,_Wiener_Staatsopernchor,_1956)_-_08._Lacrimosa.ogg',
    credit: 'Mozart, Requiem: Lacrimosa. Vienna State Opera Chorus, Vienna Philharmonic, Bruno Walter (1956). Public domain.',
  },
  // Episode 3, in place of Handel’s Israel in Egypt, whose only free recording is a fragment from 1888: “Day of wrath,” for the plagues.
  {
    id: 'mozart-dies-irae',
    title: 'Kyrie and Dies irae',
    work: 'Requiem, K. 626',
    composer: 'Wolfgang Amadeus Mozart',
    performer: 'The London Philharmonic Choir, Charles Kennedy Scott, conductor',
    year: 1927,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:PDP-CH_-_London_Philharmonic_Choir,_Charles_Kennedy_Scott_-_Requiem_in_D_minor,_K_626,_Kyrie_Eleison_and_Dies_Irae_-_Mozart_-_Hmv-d1147-04898.flac',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/PDP-CH_-_London_Philharmonic_Choir,_Charles_Kennedy_Scott_-_Requiem_in_D_minor,_K_626,_Kyrie_Eleison_and_Dies_Irae_-_Mozart_-_Hmv-d1147-04898.flac',
    credit: 'Mozart, Requiem: Kyrie and Dies irae. London Philharmonic Choir, Charles Kennedy Scott (1927). Public domain.',
  },
  // Episode 4: “Lamb of God.”
  {
    id: 'faure-agnus-dei',
    title: 'Agnus Dei',
    work: 'Requiem, Op. 48',
    composer: 'Gabriel Fauré',
    performer: 'Chorale Philippe Caillard and the Orchestre national de l’Opéra de Monte-Carlo, Louis Frémaux, conductor',
    year: 1962,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Fauré_-_Requiem_-_V._Agnus_Dei.flac',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Faur%C3%A9_-_Requiem_-_V._Agnus_Dei.flac',
    credit: 'Fauré, Requiem: Agnus Dei. Chorale Philippe Caillard, Orchestre national de l’Opéra de Monte-Carlo, Louis Frémaux (1962). Public domain.',
  },
  // Episode 5: rejoicing, the people set free.
  {
    id: 'handel-rejouissance',
    title: 'La Réjouissance',
    work: 'Music for the Royal Fireworks, HWV 351',
    composer: 'George Frideric Handel',
    performer: 'Paul Ayres',
    year: 2011,
    license: 'cc0',
    licenseNote: 'Dedicated to the public domain (CC0) by its maker, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Paul_Ayres_-_Handel\'s_Music_for_the_Royal_Fireworks,_HWV_351_-_IV._La_Réjouissance.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Paul_Ayres_-_Handel%27s_Music_for_the_Royal_Fireworks,_HWV_351_-_IV._La_R%C3%A9jouissance.ogg',
    credit: 'Handel, Music for the Royal Fireworks: La Réjouissance. Paul Ayres (2011). CC0, via Wikimedia Commons.',
  },
  // Episode 6: the Lamb who was slain.
  {
    id: 'handel-worthy-is-the-lamb',
    title: 'Worthy is the Lamb',
    work: 'Messiah, HWV 56',
    composer: 'George Frideric Handel',
    performer: 'The London Philharmonic Choir and London Symphony Orchestra, Hermann Scherchen, conductor',
    year: 1953,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Handel_-_Messiah,_Part_3_(Scherchen)_-_54._Worthy_is_the_Lamb._Amen.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Handel_-_Messiah,_Part_3_(Scherchen)_-_54._Worthy_is_the_Lamb._Amen.ogg',
    credit: 'Handel, Messiah: Worthy is the Lamb. London Philharmonic Choir, London Symphony Orchestra, Hermann Scherchen (1953). Public domain.',
  },
  // The minigames: bright and steady.
  {
    id: 'bach-rejouissance',
    title: 'Réjouissance',
    work: 'Orchestral Suite No. 4 in D major, BWV 1069',
    composer: 'Johann Sebastian Bach',
    performer: 'The Busch Chamber Players, Adolf Busch, conductor',
    year: 1937,
    license: 'public-domain',
    licenseNote: 'An old recording, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:BWV_1069_Réjouissance_(Adolf_Busch_1937).ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/BWV_1069_R%C3%A9jouissance_(Adolf_Busch_1937).ogg',
    credit: 'Bach, Orchestral Suite No. 4: Réjouissance. The Busch Chamber Players, Adolf Busch (1937). Public domain.',
  },
  // Level 9 · Through the Sea. Episode 2, in place of the Easter Exsultet, whose free
  // recordings are all CC BY-SA: the Easter sequence, for the reading never left out at the Vigil.
  {
    id: 'victimae-paschali',
    title: 'Victimae paschali laudes',
    work: 'The Easter sequence',
    composer: 'Gregorian chant',
    performer: 'The Tudor Consort',
    year: 2010,
    license: 'cc-by',
    licenseNote: 'Published by the ensemble under the Creative Commons Attribution 3.0 license, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:The_Tudor_Consort_-_09_-_Sequence_-_Victimae_Paschali_Laudes.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Tudor_Consort_-_09_-_Sequence_-_Victimae_Paschali_Laudes.ogg',
    credit: 'Victimae paschali laudes, the Easter sequence. The Tudor Consort (2010). CC BY 3.0, via Wikimedia Commons.',
  },
  // Episode 3, in place of Handel's Israel in Egypt, whose only free recording is a fragment
  // from 1888: trumpets and drums for the song of victory.
  {
    id: 'charpentier-te-deum',
    title: 'Prelude',
    work: 'Te Deum, H. 146',
    composer: 'Marc-Antoine Charpentier',
    performer: 'Ian Dollins, organ',
    // The recording gives no date; it was published on Musopen and Wikimedia Commons in 2013.
    year: 2013,
    license: 'cc0',
    licenseNote: 'Dedicated to the public domain (CC0) through Musopen, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Charpentier,_Te_Deum_(Prelude).ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charpentier,_Te_Deum_(Prelude).ogg',
    credit: 'Charpentier, Te Deum: Prelude, arranged for organ. Ian Dollins, via Musopen (published 2013). CC0, via Wikimedia Commons.',
  },
  // Episode 5: "Let the water and the blood, from thy wounded side which flowed."
  {
    id: 'rock-of-ages',
    title: 'Rock of Ages',
    composer: 'Thomas Hastings (music), Augustus Toplady (words)',
    performer: 'The Edison Mixed Quartet',
    year: 1913,
    license: 'public-domain',
    licenseNote: 'An old recording on an Edison cylinder, in the public domain, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:EdisonMixedQuartet_RockOfAges1913.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/EdisonMixedQuartet_RockOfAges1913.ogg',
    credit: 'Rock of Ages. The Edison Mixed Quartet (1913). Public domain.',
  },
  // Level 10 · Sinai. Episode 1: the organ's thunder for the mountain of fire.
  {
    id: 'bach-toccata',
    title: 'Toccata and Fugue in D minor',
    work: 'BWV 565',
    composer: 'Johann Sebastian Bach',
    performer: 'Ashtar Moïra, on the Tamburini organ',
    year: 2006,
    license: 'public-domain',
    licenseNote: 'Released into the public domain by its performer, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Toccata_et_Fugue_BWV565.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Toccata_et_Fugue_BWV565.ogg',
    credit: 'Bach, Toccata and Fugue in D minor, BWV 565. Ashtar Moïra, organ (2006). Public domain.',
  },
  // Level 11 · The Tabernacle and the Holy Life. Episode 1, in place of Bruckner's Locus iste
  // (whose free recordings are all CC BY-SA): a psalm of longing for the house of God.
  {
    id: 'parry-psalm-84',
    title: 'Psalm 84, “How amiable are thy dwellings”',
    composer: 'Anglican chant by Charles Hubert Parry',
    performer: 'The choir of Trinity Church Boston, at the consecration of its chapel',
    year: 2017,
    license: 'cc-by',
    licenseNote: 'Published by Trinity Church Boston under the Creative Commons Attribution 3.0 license, as stated on Wikimedia Commons.',
    source: 'https://commons.wikimedia.org/wiki/File:Psalm_84_CH_Parry_Trinity_Church_Boston.ogg',
    download: 'https://commons.wikimedia.org/wiki/Special:FilePath/Psalm_84_CH_Parry_Trinity_Church_Boston.ogg',
    credit: 'Psalm 84, “How amiable are thy dwellings,” to a chant by Hubert Parry. The choir of Trinity Church Boston (2017). CC BY 3.0, via Wikimedia Commons.',
  },
]

const BY_ID = new Map(TRACKS.map((track) => [track.id, track]))

export function trackById(id: string): Track | undefined {
  return BY_ID.get(id)
}
