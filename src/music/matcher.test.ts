import { describe, expect, it } from 'vitest'
import { buyLinks, playlistApp, songLink } from './links'
import { CLOSE, SURE, describeMatches, matchSongs, normalizeArtist, normalizeTitle, similarity } from './matcher'
import { LEVEL_COUNT, WORSHIP_SONGS, songsForLevel } from './recommendations'

describe('normalizing', () => {
  it.each([
    ['So Will I (100 Billion X) [Live]', 'so will i'],
    ['02 - Goodness of God (Live)', 'goodness of god'],
    ['10,000 Reasons (Bless the Lord)', '10 000 reasons'],
    ['Way Maker - Live at Passion 2020', 'way maker'],
    ['Graves Into Gardens feat. Brandon Lake', 'graves into gardens'],
    ['Jireh.mp3', 'jireh'],
    ['The Lord’s Prayer', 'the lords prayer'],
    ['Oceans (Where Feet May Fail) - Acoustic Version', 'oceans'],
  ])('reads “%s” as “%s”', (raw, plain) => {
    expect(normalizeTitle(raw)).toBe(plain)
  })

  it('reads artists without their guests, and & as “and”', () => {
    expect(normalizeArtist('Elevation Worship & Maverick City Music')).toBe('elevation worship and maverick city music')
    expect(normalizeArtist('Hillsong UNITED feat. Taya')).toBe('hillsong united')
    expect(normalizeArtist('Beyoncé')).toBe('beyonce')
  })

  it('scores alike strings high and unlike ones low', () => {
    expect(similarity('goodness of god', 'goodness of god')).toBe(1)
    expect(similarity('goodnes of god', 'goodness of god')).toBeGreaterThan(SURE)
    expect(similarity('blessed be your name', 'amazing grace')).toBeLessThan(CLOSE)
  })
})

describe('matching a folder of songs', () => {
  // A test folder, tagged the many ways real files are.
  const folder = [
    { id: 'a', title: 'So Will I (100 Billion X) [Live]', artist: 'Hillsong UNITED' },
    { id: 'b', title: '03 Jireh', artist: 'Elevation Worship & Maverick City Music' },
    { id: 'c', title: 'Goodness Of God (Live)', artist: 'Bethel Music feat. Jenn Johnson' },
    { id: 'd', title: 'Blessed Be Your Name', artist: 'Matt Redman' },
    { id: 'e', title: 'Way Maker - Live', artist: 'Leeland' },
    { id: 'f', title: 'Here I Am, Lord', artist: 'Dan Schutte' },
    { id: 'g', title: 'Revelation Song', artist: 'Kari Jobe' },
    { id: 'h', title: 'Bohemian Rhapsody', artist: 'Queen' },
    { id: 'i', title: 'oceans (where feet may fail)' },
  ]

  it('matches each song to the right level, and leaves out the rest', () => {
    const matches = matchSongs(folder)
    const levels = Object.fromEntries(matches.map((m) => [m.file.id, m.song.level]))
    expect(levels).toEqual({ a: 1, b: 3, c: 4, d: 6, e: 41, f: 17, g: 53, i: 43 })
    expect(matches.every((m) => m.sure)).toBe(true)
  })

  it('asks about a song that is only close', () => {
    const [match] = matchSongs([{ id: 'x', title: 'Goodnes Of Gods', artist: 'Someone Else' }])
    expect(match?.song.title).toBe('Goodness of God')
    expect(match?.sure).toBe(false)
  })

  it('says what it found', () => {
    expect(describeMatches(matchSongs(folder))).toBe('Matched 8 songs to 8 levels.')
  })
})

describe('the recommendations', () => {
  it('cover every level', () => {
    for (let level = 1; level <= LEVEL_COUNT; level++) expect(songsForLevel(level).length, `level ${level}`).toBeGreaterThan(0)
  })

  it('give a reason for every song', () => {
    for (const song of WORSHIP_SONGS) expect(song.reason.trim()).not.toBe('')
  })
})

describe('listen-along links', () => {
  it('open the right search in each app', () => {
    expect(songLink('spotify', 'Jireh', 'Elevation Worship')).toBe('https://open.spotify.com/search/Jireh%20Elevation%20Worship')
    expect(songLink('apple-music', 'Jireh', 'Elevation Worship')).toBe('https://music.apple.com/us/search?term=Jireh%20Elevation%20Worship')
    expect(songLink('youtube-music', 'Jireh', 'Elevation Worship')).toBe('https://music.youtube.com/search?q=Jireh%20Elevation%20Worship')
    expect(songLink('youtube', 'Jireh', 'Elevation Worship')).toBe('https://www.youtube.com/results?search_query=Jireh%20Elevation%20Worship')
  })

  it('offer places to buy a song', () => {
    expect(buyLinks('Jireh', 'Elevation Worship').map((l) => l.name)).toEqual(['iTunes Store', 'Amazon Music', 'Bandcamp'])
  })

  it.each([
    ['https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa?si=abc', 'spotify'],
    ['https://music.apple.com/us/playlist/worship/pl.u-abc123', 'apple-music'],
    ['https://music.youtube.com/playlist?list=PL123', 'youtube-music'],
    ['https://www.youtube.com/playlist?list=PL123', 'youtube'],
    ['https://www.youtube.com/watch?v=abc&list=PL123', 'youtube'],
    ['https://open.spotify.com/track/123', null],
    ['http://open.spotify.com/playlist/123', null],
    ['not a link', null],
  ])('recognizes a pasted playlist link: %s', (link, app) => {
    expect(playlistApp(link)).toBe(app)
  })
})
