import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { setPlayableCheck, useMusicLibrary } from './library'
import { tagsFromFileName } from './tags'

setPlayableCheck(() => true)

const song = (name: string, type = 'audio/mpeg') => new File([new Uint8Array([1, 2, 3, 4])], name, { type })

describe('the music library', () => {
  beforeEach(async () => {
    await useMusicLibrary.getState().removeAll()
  })

  it('adds songs, says plainly which files it couldn’t, and proposes where they belong', async () => {
    const { added, skipped } = await useMusicLibrary
      .getState()
      .addFiles([song('Bethel Music - Goodness of God (Live).mp3'), song('03 Jireh.mp3'), song('Holy Forever.m4p', 'audio/mp4'), song('notes.txt', 'text/plain')])
    expect(added.map((s) => s.title)).toEqual(['Goodness of God (Live)', '03 Jireh'])
    expect(skipped.map((s) => s.name)).toEqual(['Holy Forever.m4p', 'notes.txt'])
    expect(skipped[0]!.why).toMatch(/locked to Apple Music/)
    const proposed = useMusicLibrary.getState().proposed
    expect(proposed.map((m) => m.song.level).sort((a, b) => a - b)).toEqual([3, 4])
  })

  it('doesn’t add the same file twice', async () => {
    await useMusicLibrary.getState().addFiles([song('Way Maker.mp3')])
    const { added } = await useMusicLibrary.getState().addFiles([song('Way Maker.mp3')])
    expect(added).toEqual([])
    expect(useMusicLibrary.getState().songs).toHaveLength(1)
  })

  it('keeps accepted matches and the songs, ready for next time', async () => {
    await useMusicLibrary.getState().addFiles([song('Hillsong United - So Will I (100 Billion X).mp3')])
    await useMusicLibrary.getState().accept(useMusicLibrary.getState().proposed)
    const id = useMusicLibrary.getState().songs[0]!.id
    expect(useMusicLibrary.getState().levels[1]).toEqual([id])

    // A new visit: nothing in memory, everything from the browser's storage.
    useMusicLibrary.setState({ songs: [], levels: {}, playlists: {}, loaded: false })
    await useMusicLibrary.getState().load()
    expect(useMusicLibrary.getState().songs.map((s) => s.title)).toEqual(['So Will I (100 Billion X)'])
    expect(useMusicLibrary.getState().levels[1]).toEqual([id])
  })

  it('lets a song be placed on any level by hand, and taken off', async () => {
    await useMusicLibrary.getState().addFiles([song('A song of my own.mp3')])
    const id = useMusicLibrary.getState().songs[0]!.id
    await useMusicLibrary.getState().assign(12, id)
    expect(useMusicLibrary.getState().levels[12]).toEqual([id])
    await useMusicLibrary.getState().unassign(12, id)
    expect(useMusicLibrary.getState().levels[12]).toEqual([])
  })

  it('keeps pasted playlist links, and removes everything on request', async () => {
    await useMusicLibrary.getState().setPlaylist('L1', 'https://open.spotify.com/playlist/abc')
    expect(useMusicLibrary.getState().playlists.L1).toBe('https://open.spotify.com/playlist/abc')
    await useMusicLibrary.getState().removeAll()
    expect(useMusicLibrary.getState().playlists).toEqual({})
  })
})

describe('reading a file name when a song has no tags', () => {
  it.each([
    ['Hillsong United - So Will I.mp3', { title: 'So Will I', artist: 'Hillsong United' }],
    ['03 - Bethel Music - Goodness of God.m4a', { title: 'Goodness of God', artist: 'Bethel Music' }],
    ['Jireh.mp3', { title: 'Jireh' }],
  ])('%s', (name, tags) => {
    expect(tagsFromFileName(name)).toEqual(tags)
  })
})
