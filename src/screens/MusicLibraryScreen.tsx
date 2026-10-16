import { useEffect, useState } from 'react'
import { useApp } from '../app/store'
import { useSettings, type DeviceSettings, type MusicApp } from '../engine/settings'
import { storageUsed, useMusicLibrary } from '../music/library'
import { MUSIC_APPS } from '../music/links'
import { Button, Choice, Dialog, Panel, Toggle } from '../ui/components'
import { AddMusic } from './music/AddMusic'
import { Coverage } from './music/Coverage'
import './screens.css'
import './music/music.css'

const formatBytes = (bytes: number) => (bytes < 1e6 ? `${Math.round(bytes / 1e3)} KB` : `${(bytes / 1e6).toFixed(bytes < 1e8 ? 1 : 0)} MB`)

/**
 * The Music Library (spec §9.5, §11.4): the music mode, and for worship songs, how to
 * listen, the player's own songs and the checklist of every level.
 */
export function MusicLibraryScreen() {
  const settings = useSettings()
  const go = useApp((s) => s.go)
  const returnTo = useApp((s) => s.returnTo)
  const load = useMusicLibrary((s) => s.load)
  const songs = useMusicLibrary((s) => s.songs)
  const removeAll = useMusicLibrary((s) => s.removeAll)
  const [used, setUsed] = useState<number | null>(null)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    let current = true
    void storageUsed().then((bytes) => {
      if (current) setUsed(bytes)
    })
    return () => {
      current = false
    }
  }, [songs.length])

  const worship = settings.musicMode === 'worship'

  return (
    <main className="screen screen-music">
      <Panel className="settings-panel music-panel">
        <div className="settings-head">
          <h1>Music</h1>
          <Button variant="quiet" onClick={() => go(returnTo)}>
            Back
          </Button>
        </div>

        <section className="settings-group" aria-labelledby="music-mode">
          <h2 id="music-mode">What plays</h2>
          <Choice<DeviceSettings['musicMode']>
            legend="Music"
            description="Switch at any time, here or from the pause menu."
            value={settings.musicMode}
            options={[
              { value: 'sacred', label: 'Sacred music (free)' },
              { value: 'worship', label: 'Worship songs (your copies)' },
              { value: 'off', label: 'Off' },
            ]}
            onChange={(musicMode) => settings.update({ musicMode })}
          />
          {settings.musicMode === 'sacred' && (
            <p className="ui-note">Real recordings of sacred music, chosen for each part of the story: Haydn’s The Creation for Level 1.</p>
          )}
        </section>

        {worship && (
          <section className="settings-group" aria-labelledby="music-way">
            <h2 id="music-way">How do you want to listen?</h2>
            <Choice<'files' | 'listen-along'>
              legend="Listening"
              value={settings.worshipWay ?? 'files'}
              options={[
                { value: 'files', label: 'Play songs I own, in the game' },
                { value: 'listen-along', label: 'Listen along in my music app' },
              ]}
              onChange={(worshipWay) => settings.update({ worshipWay })}
            />
            <p className="ui-note">
              {(settings.worshipWay ?? 'files') === 'files'
                ? 'The full experience: songs change with each level, crossfade and loop. The game never includes these recordings; it plays the copies you own.'
                : 'Each level’s songs open in your app with one tap. The game turns its own music off and keeps its sound effects.'}
            </p>
            {settings.worshipWay === 'listen-along' && (
              <Choice<MusicApp>
                legend="Your music app"
                value={settings.musicApp ?? 'spotify'}
                options={(Object.keys(MUSIC_APPS) as MusicApp[]).map((id) => ({ value: id, label: MUSIC_APPS[id].name }))}
                onChange={(musicApp) => settings.update({ musicApp })}
              />
            )}
            {(settings.worshipWay ?? 'files') === 'files' && (
              <Toggle
                label="Keep story scenes instrumental"
                description="Your songs play in menus, minigames, the quiz and reflection; the story keeps its free instrumental music, so lyrics don’t compete with reading."
                checked={settings.keepStoryInstrumental}
                onChange={(keepStoryInstrumental) => settings.update({ keepStoryInstrumental })}
              />
            )}
          </section>
        )}

        {worship && (settings.worshipWay ?? 'files') === 'files' && <AddMusic />}
        {worship && <Coverage way={settings.worshipWay ?? 'files'} app={settings.musicApp ?? 'spotify'} />}

        {worship && (settings.worshipWay ?? 'files') === 'files' && (
          <section className="settings-group" aria-labelledby="music-storage">
            <h2 id="music-storage">Space on this device</h2>
            <p>
              {songs.length} {songs.length === 1 ? 'song' : 'songs'}
              {used !== null && ` · the game is using ${formatBytes(used)} of space in this browser`}
            </p>
            <Button variant="danger" disabled={songs.length === 0} onClick={() => setConfirming(true)}>
              Remove all songs
            </Button>
          </section>
        )}
      </Panel>

      <Dialog open={confirming} title="Remove all your songs?" onClose={() => setConfirming(false)}>
        <p>They’re only removed from this game, in this browser. Your own copies elsewhere aren’t touched.</p>
        <div className="ui-dialog-actions">
          <Button variant="quiet" onClick={() => setConfirming(false)}>
            Keep them
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await removeAll()
              setConfirming(false)
            }}
          >
            Remove all
          </Button>
        </div>
      </Dialog>
    </main>
  )
}
