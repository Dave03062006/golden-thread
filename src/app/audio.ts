import type { Level } from '../content/types'
import { playEffect, type Effect } from '../engine/audio/effects'
import { musicUrl } from '../engine/audio/files'
import { AudioOutput } from '../engine/audio/output'
import { Soundtrack } from '../engine/audio/soundtrack'
import { useSettings, type DeviceSettings } from '../engine/settings'
import { trackById } from '../music/catalog'
import { useMusicLibrary } from '../music/library'
import { SONG, musicHeard, playlistFor, type MusicPlace } from '../music/playlists'
import { launch } from './params'

/**
 * The game's sound, wired to the rest of the game: which music plays where, in which
 * mode (spec §11.2), at what volume, and the sound effects.
 *
 * The player's own songs are tracks too, named "song:<id>"; their files come from the
 * music library in this browser.
 */

const output = new AudioOutput((id) => (id.startsWith(SONG) ? useMusicLibrary.getState().url(id.slice(SONG.length)) : musicUrl(id)))

export const soundtrack = new Soundtrack({
  decks: output.decks,
  tracks: (id) => {
    if (id.startsWith(SONG)) return useMusicLibrary.getState().songs.some((s) => `${SONG}${s.id}` === id) ? { id } : undefined
    return trackById(id)
  },
})

let place: MusicPlace = { kind: 'hub' }
let sceneTrack: string | undefined

/** Whether the free story music is playing, so scenes and cues may choose pieces. */
let storyIsFree = true

function apply() {
  const settings = useSettings.getState()
  const { tracks, free } = playlistFor(place, settings, useMusicLibrary.getState().levels)
  storyIsFree = free && place.kind === 'story'
  soundtrack.setPlaylist(tracks, storyIsFree ? sceneTrack : undefined)
  // Off, or listening along in the player's own music app: the game's music is silent.
  soundtrack.setEnabled(musicHeard(settings))
}

/** Tells the music where the player is now. */
export function setMusicPlace(next: MusicPlace, startWith?: string) {
  place = next
  sceneTrack = startWith
  apply()
}

/** A scene begins: under free music, it may ask for its own piece. */
export function sceneMusic(trackId: string | undefined) {
  sceneTrack = trackId
  if (!trackId || !storyIsFree || soundtrack.current === trackId) return
  void soundtrack.play(trackId)
}

/** Gets a story's cue ready ahead of time (see `cueMusic`). */
export function prepareCue(level: Level, name: string) {
  const cue = level.music.cues[name]
  if (cue && storyIsFree) void soundtrack.prepareCue(cue.track, cue.cue)
}

/** Lands a moment of music on a story beat, like Haydn's chord on "and there was light". */
export function cueMusic(level: Level, name: string) {
  const cue = level.music.cues[name]
  if (cue && storyIsFree) void soundtrack.cue(cue.track, cue.cue)
}

/** The pause menu is open: the music pauses with the game. */
let menuPaused = false
let hiddenPause = false

export function pauseMusic(paused: boolean) {
  menuPaused = paused
  if (paused) void soundtrack.pause()
  else if (!hiddenPause) soundtrack.resume()
}

/** Softer music while the read-aloud voice speaks. */
export function duckMusic(on: boolean) {
  output.duck(on)
}

/** A sound effect, in the voice of the current art style. */
export function soundEffect(effect: Effect) {
  const style = typeof document === 'undefined' ? 'paper-glass' : document.documentElement.dataset.artStyle
  playEffect(output.effects, style === 'pixel' ? 'chip' : 'paper', effect)
}

let installed = false

/** For scripted tests (?test): what's playing, and where in the piece. */
export interface AudioProbe {
  current: string | null
  decks: { trackId: string | null; time: number; paused: boolean }[]
}

/** Starts listening: the first tap unlocks sound, settings set volumes, a hidden tab pauses. */
export function installAudio() {
  if (installed || typeof window === 'undefined') return
  installed = true
  if (launch.test) {
    Object.assign(window, {
      __audioProbe: (): AudioProbe => ({
        current: soundtrack.current,
        decks: output.decks.map((d) => ({ trackId: d.trackId, time: d.element.currentTime, paused: d.element.paused })),
      }),
    })
  }

  const unlock = () => {
    output.unlock()
    soundtrack.wake()
  }
  window.addEventListener('pointerdown', unlock)
  window.addEventListener('keydown', unlock)

  const follow = (settings: DeviceSettings) => {
    output.setMusicVolume(settings.musicVolume)
    output.setEffectsVolume(settings.soundVolume)
  }
  follow(useSettings.getState())
  useSettings.subscribe((settings, before) => {
    follow(settings)
    if (
      settings.musicMode !== before.musicMode ||
      settings.worshipWay !== before.worshipWay ||
      settings.keepStoryInstrumental !== before.keepStoryInstrumental
    )
      apply()
  })
  useMusicLibrary.subscribe((library, before) => {
    if (library.levels !== before.levels || library.songs !== before.songs) apply()
  })
  void useMusicLibrary.getState().load()

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hiddenPause = true
      void soundtrack.pause()
    } else if (hiddenPause) {
      hiddenPause = false
      if (!menuPaused) soundtrack.resume()
    }
  })
}
