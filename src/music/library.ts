import { createStore, del, get, set, clear, type UseStore } from 'idb-keyval'
import { create } from 'zustand'
import { matchSongs, type Match } from './matcher'
import { readTags } from './tags'

/**
 * The player's own worship songs (spec §11.4): files they own, kept in this browser on
 * this device. They are never uploaded, shared, or put into exported saves.
 *
 * Each song's details (title, artist, size) are kept apart from the file itself, so the
 * library can be listed without reading every file.
 */

export interface SavedSong {
  id: string
  fileName: string
  title: string
  artist?: string
  album?: string
  seconds?: number
  size: number
  type: string
  addedAt: string
}

/** Why a file wasn't added: the game says so plainly (spec §11.4, "Which files work"). */
export interface SkippedFile {
  name: string
  why: string
}

interface Stored {
  songs: SavedSong[]
  /** Songs chosen for each level, in order, by song id. */
  levels: Record<number, string[]>
  /** Playlist links pasted for a level ("L3") or an Age ("A-II"). */
  playlists: Record<string, string>
}

const EMPTY: Stored = { songs: [], levels: {}, playlists: {} }

let database: UseStore | null = null
function db(): UseStore | null {
  if (typeof indexedDB === 'undefined') return null
  database ??= createStore('golden-thread-music', 'songs')
  return database
}

const META = 'library'
const fileKey = (id: string) => `file:${id}`

/** Whether this browser can play a kind of audio file. Tests replace it, since their pretend browser can't play anything. */
let canPlay = (type: string): boolean => {
  if (typeof document === 'undefined') return true
  return document.createElement('audio').canPlayType(type) !== ''
}
export function setPlayableCheck(check: (type: string) => boolean) {
  canPlay = check
}

/** Files the browser can play. Songs locked to an app (like Apple Music downloads, .m4p) can't be. */
function whyNot(file: File): string | null {
  if (/\.m4p$/i.test(file.name)) return 'It’s locked to Apple Music, so only that app can play it.'
  if (!file.type.startsWith('audio/') && !/\.(mp3|m4a|aac|flac|ogg|oga|opus|wav|aiff?|webm)$/i.test(file.name)) return 'It isn’t a music file.'
  if (file.size === 0) return 'The file is empty.'
  if (file.type && !canPlay(file.type)) return 'This browser can’t play this kind of file.'
  return null
}

const newId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`)

const urls = new Map<string, string>()

interface LibraryStore extends Stored {
  loaded: boolean
  /** Matches found by the last import, waiting for the player to accept or decline them. */
  proposed: Match[]
  load(): Promise<void>
  /** Adds files (a folder, or many at once) and proposes where they belong. */
  addFiles(files: File[]): Promise<{ added: SavedSong[]; skipped: SkippedFile[] }>
  accept(matches: Match[]): Promise<void>
  decline(match: Match): void
  assign(level: number, songId: string): Promise<void>
  unassign(level: number, songId: string): Promise<void>
  setPlaylist(key: string, link: string | null): Promise<void>
  removeAll(): Promise<void>
  /** A playable address for a song, made from its file. */
  url(songId: string): Promise<string | undefined>
}

export const useMusicLibrary = create<LibraryStore>()((setState, getState) => {
  const save = async () => {
    const store = db()
    if (!store) return
    const { songs, levels, playlists } = getState()
    await set(META, { songs, levels, playlists } satisfies Stored, store)
  }

  return {
    ...EMPTY,
    loaded: false,
    proposed: [],

    async load() {
      if (getState().loaded) return
      const store = db()
      const stored = store ? ((await get<Stored>(META, store)) ?? EMPTY) : EMPTY
      setState({ ...EMPTY, ...stored, loaded: true })
    },

    async addFiles(files) {
      await getState().load()
      const store = db()
      const added: SavedSong[] = []
      const skipped: SkippedFile[] = []
      const known = new Set(getState().songs.map((s) => `${s.fileName}/${s.size}`))
      for (const file of files) {
        const reason = whyNot(file)
        if (reason) {
          skipped.push({ name: file.name, why: reason })
          continue
        }
        if (known.has(`${file.name}/${file.size}`)) continue
        const tags = await readTags(file)
        const song: SavedSong = {
          id: newId(),
          fileName: file.name,
          ...tags,
          size: file.size,
          type: file.type || 'audio/mpeg',
          addedAt: new Date().toISOString(),
        }
        if (store) await set(fileKey(song.id), file, store)
        added.push(song)
        known.add(`${file.name}/${file.size}`)
      }
      const songs = [...getState().songs, ...added]
      const proposed = matchSongs(added.map((s) => ({ id: s.id, title: s.title, artist: s.artist })))
      setState({ songs, proposed })
      await save()
      return { added, skipped }
    },

    async accept(matches) {
      const levels = { ...getState().levels }
      for (const match of matches) {
        const list = levels[match.song.level] ?? []
        if (!list.includes(match.file.id)) levels[match.song.level] = [...list, match.file.id]
      }
      const accepted = new Set(matches)
      setState({ levels, proposed: getState().proposed.filter((m) => !accepted.has(m)) })
      await save()
    },

    decline(match) {
      setState({ proposed: getState().proposed.filter((m) => m !== match) })
    },

    async assign(level, songId) {
      const levels = { ...getState().levels }
      const list = levels[level] ?? []
      if (!list.includes(songId)) levels[level] = [...list, songId]
      setState({ levels })
      await save()
    },

    async unassign(level, songId) {
      const levels = { ...getState().levels }
      levels[level] = (levels[level] ?? []).filter((id) => id !== songId)
      setState({ levels })
      await save()
    },

    async setPlaylist(key, link) {
      const playlists = { ...getState().playlists }
      if (link) playlists[key] = link
      else delete playlists[key]
      setState({ playlists })
      await save()
    },

    async removeAll() {
      const store = db()
      if (store) await clear(store)
      for (const url of urls.values()) URL.revokeObjectURL(url)
      urls.clear()
      setState({ ...EMPTY, proposed: [], loaded: true })
    },

    async url(songId) {
      const kept = urls.get(songId)
      if (kept) return kept
      const store = db()
      const file = store ? await get<Blob>(fileKey(songId), store) : undefined
      if (!file) return undefined
      const url = URL.createObjectURL(file)
      urls.set(songId, url)
      return url
    },
  }
})

/** Forgets one song entirely. */
export async function removeSong(songId: string) {
  const store = db()
  if (store) await del(fileKey(songId), store)
  const { songs, levels } = useMusicLibrary.getState()
  const next = Object.fromEntries(Object.entries(levels).map(([level, ids]) => [level, ids.filter((id) => id !== songId)]))
  useMusicLibrary.setState({ songs: songs.filter((s) => s.id !== songId), levels: next })
  if (store) {
    const state = useMusicLibrary.getState()
    await set(META, { songs: state.songs, levels: state.levels, playlists: state.playlists } satisfies Stored, store)
  }
}

/** How much space the browser is using for this game, for the Music Library's storage line. */
export async function storageUsed(): Promise<number | null> {
  if (typeof navigator === 'undefined' || !navigator.storage?.estimate) return null
  const { usage } = await navigator.storage.estimate()
  return usage ?? null
}
