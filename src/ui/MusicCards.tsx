import { useEffect, useState } from 'react'
import { soundtrack } from '../app/audio'
import { useSettings } from '../engine/settings'
import { trackById } from '../music/catalog'
import { useMusicLibrary } from '../music/library'
import { MUSIC_APPS, songLink } from '../music/links'
import { songsForLevel } from '../music/recommendations'
import './music-cards.css'

/** How long the cards stay before fading away. */
const SHOW_MS = 5500

/** What a piece is called on the card: the game's music, or one of the player's songs. */
function describe(trackId: string): { title: string; by: string } | null {
  if (trackId.startsWith('song:')) {
    const song = useMusicLibrary.getState().songs.find((s) => `song:${s.id}` === trackId)
    return song ? { title: song.title, by: song.artist ?? '' } : null
  }
  const track = trackById(trackId)
  return track ? { title: track.title, by: [track.composer.split(' ').at(-1), track.work].filter(Boolean).join(', ') } : null
}

/** "Now playing": a small card when a new piece begins (spec §11.4). */
export function NowPlaying() {
  const [shown, setShown] = useState<{ title: string; by: string; key: number } | null>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    let count = 0
    const off = soundtrack.subscribe((trackId) => {
      const info = trackId ? describe(trackId) : null
      clearTimeout(timer)
      if (!info) {
        setShown(null)
        return
      }
      setShown({ ...info, key: ++count })
      timer = setTimeout(() => setShown(null), SHOW_MS)
    })
    return () => {
      off()
      clearTimeout(timer)
    }
  }, [])

  if (!shown) return null
  return (
    <div key={shown.key} className="now-playing" aria-hidden="true">
      <span className="now-playing-note">♪</span>
      <span className="now-playing-text">
        <span className="now-playing-title">{shown.title}</span>
        {shown.by && <span className="now-playing-by">{shown.by}</span>}
      </span>
    </div>
  )
}

/**
 * Listening along in the player's own music app: when a level begins, a card offers its
 * song (or the playlist the player pasted for it) with one tap (spec §11.4).
 */
export function ListenAlongCard({ level, levelTitle }: { level: number; levelTitle: string }) {
  const { musicMode, worshipWay, musicApp } = useSettings()
  const playlists = useMusicLibrary((s) => s.playlists)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), 12000)
    return () => clearTimeout(timer)
  }, [])

  if (!open || musicMode !== 'worship' || worshipWay !== 'listen-along' || !musicApp) return null
  const song = songsForLevel(level)[0]
  const playlist = playlists[`L${level}`]
  if (!song && !playlist) return null
  const href = playlist ?? songLink(musicApp, song!.title, song!.artist)
  return (
    <div className="listen-along">
      <p>
        <strong>Level {level}</strong> · {playlist ? `your playlist for “${levelTitle}”` : `“${song!.title}”, ${song!.artist}`}
      </p>
      <a className="ui-button" data-variant="primary" href={href} target="_blank" rel="noreferrer">
        Open in {MUSIC_APPS[musicApp].name}
      </a>
      <button type="button" className="listen-along-close" onClick={() => setOpen(false)} aria-label="Close">
        ×
      </button>
    </div>
  )
}
