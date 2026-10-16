import { useState } from 'react'
import { OUTLINE } from '../../content/outline'
import type { MusicApp } from '../../engine/settings'
import { useMusicLibrary } from '../../music/library'
import { MUSIC_APPS, buyLinks, playlistApp, songLink } from '../../music/links'
import { songsForLevel } from '../../music/recommendations'
import { Button } from '../../ui/components'

/**
 * The coverage checklist (spec §11.4): all 53 levels, by Age. With the player's own files,
 * it shows which levels have songs and helps find the missing ones. Listening along, it
 * opens each song in the player's app and keeps the playlists they paste.
 */
export function Coverage({ way, app }: { way: 'files' | 'listen-along'; app: MusicApp | null }) {
  const songs = useMusicLibrary((s) => s.songs)
  const levels = useMusicLibrary((s) => s.levels)
  const unassign = useMusicLibrary((s) => s.unassign)
  const covered = OUTLINE.flatMap((a) => a.levels).filter((l) => (levels[l.number] ?? []).length > 0).length

  return (
    <section className="settings-group" aria-labelledby="music-coverage">
      <h2 id="music-coverage">{way === 'files' ? 'Songs for each level' : 'Each level’s songs'}</h2>
      {way === 'files' && (
        <p className="ui-note">
          {covered} of 53 levels have songs. Levels without one play their free sacred music.
        </p>
      )}
      {OUTLINE.map((age) => (
        <details key={age.numeral} className="coverage-age">
          <summary>
            Age {age.numeral} · {age.title}
          </summary>
          {way === 'listen-along' && <PlaylistField storeKey={`A-${age.numeral}`} label={`A playlist for Age ${age.numeral}`} />}
          <ul className="coverage-levels">
            {age.levels.map((level) => {
              const mine = (levels[level.number] ?? []).map((id) => songs.find((s) => s.id === id)).filter((s) => s !== undefined)
              const recommended = songsForLevel(level.number)
              return (
                <li key={level.number}>
                  <p className="coverage-title">
                    Level {level.number} · {level.title}
                    {way === 'files' && <span className="coverage-mark">{mine.length > 0 ? ' ✓' : ''}</span>}
                  </p>
                  {way === 'files' &&
                    mine.map((song) => (
                      <p key={song.id} className="coverage-song">
                        “{song.title}”{song.artist ? `, ${song.artist}` : ''}{' '}
                        <Button variant="quiet" onClick={() => void unassign(level.number, song.id)} aria-label={`Remove ${song.title} from level ${level.number}`}>
                          Remove
                        </Button>
                      </p>
                    ))}
                  {(way === 'listen-along' || mine.length === 0) &&
                    recommended.map((song) => (
                      <div key={song.title} className="coverage-song">
                        <p>
                          “{song.title}”, {song.artist} <span className="ui-note">· {song.reason}</span>
                        </p>
                        <p className="coverage-links">
                          {way === 'listen-along' && app ? (
                            <a href={songLink(app, song.title, song.artist)} target="_blank" rel="noreferrer">
                              Open in {MUSIC_APPS[app].name}
                            </a>
                          ) : (
                            <>
                              Find this song:{' '}
                              {(Object.keys(MUSIC_APPS) as MusicApp[]).map((id) => (
                                <a key={id} href={songLink(id, song.title, song.artist)} target="_blank" rel="noreferrer">
                                  {MUSIC_APPS[id].name}
                                </a>
                              ))}
                              {' · Buy: '}
                              {buyLinks(song.title, song.artist).map((link) => (
                                <a key={link.name} href={link.url} target="_blank" rel="noreferrer">
                                  {link.name}
                                </a>
                              ))}
                            </>
                          )}
                        </p>
                      </div>
                    ))}
                  {way === 'listen-along' && <PlaylistField storeKey={`L${level.number}`} label={`Your playlist for level ${level.number}`} />}
                </li>
              )
            })}
          </ul>
        </details>
      ))}
    </section>
  )
}

/** Paste a playlist link for a level or an Age; it opens with one tap from then on. */
function PlaylistField({ storeKey, label }: { storeKey: string; label: string }) {
  const saved = useMusicLibrary((s) => s.playlists[storeKey])
  const setPlaylist = useMusicLibrary((s) => s.setPlaylist)
  const [draft, setDraft] = useState(saved ?? '')
  const [problem, setProblem] = useState<string | null>(null)

  const keep = () => {
    if (!draft.trim()) {
      setProblem(null)
      void setPlaylist(storeKey, null)
      return
    }
    if (!playlistApp(draft)) {
      setProblem('That isn’t a playlist link from Spotify, Apple Music, YouTube Music or YouTube.')
      return
    }
    setProblem(null)
    void setPlaylist(storeKey, draft.trim())
  }

  return (
    <div className="playlist-field">
      <label className="ui-field">
        {label}
        <input value={draft} placeholder="Paste a playlist link" autoComplete="off" onChange={(e) => setDraft(e.target.value)} onBlur={keep} />
      </label>
      {problem && <p className="ui-note">{problem}</p>}
      {saved && !problem && (
        <a href={saved} target="_blank" rel="noreferrer">
          Open your playlist
        </a>
      )}
    </div>
  )
}
