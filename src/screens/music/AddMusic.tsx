import { useRef, useState, type DragEvent } from 'react'
import { ALL_LEVELS } from '../../content/outline'
import { useMusicLibrary, type SkippedFile } from '../../music/library'
import { describeMatches } from '../../music/matcher'
import { Button } from '../../ui/components'
import { filesFromDrop } from './drop'

/**
 * Adding the player's own songs (spec §11.4, way A): drop in a music folder, choose one,
 * or pick many songs at once on a phone. The game reads each song's title and artist,
 * matches them to the levels, and reports what it found.
 */
export function AddMusic() {
  const addFiles = useMusicLibrary((s) => s.addFiles)
  const proposed = useMusicLibrary((s) => s.proposed)
  const accept = useMusicLibrary((s) => s.accept)
  const decline = useMusicLibrary((s) => s.decline)
  const assign = useMusicLibrary((s) => s.assign)
  const songs = useMusicLibrary((s) => s.songs)
  const levels = useMusicLibrary((s) => s.levels)
  const [busy, setBusy] = useState(false)
  const [report, setReport] = useState<{ text: string; skipped: SkippedFile[]; added: string[] } | null>(null)
  const [dragging, setDragging] = useState(false)
  const folderInput = useRef<HTMLInputElement>(null)

  const take = async (files: File[]) => {
    if (files.length === 0) return
    setBusy(true)
    try {
      const { added, skipped } = await addFiles(files)
      const matches = useMusicLibrary.getState().proposed
      setReport({
        text: added.length === 0 ? 'No new songs found.' : `${added.length} ${added.length === 1 ? 'song' : 'songs'} added. ${describeMatches(matches)}`,
        skipped,
        added: added.map((s) => s.id),
      })
    } finally {
      setBusy(false)
    }
  }

  const onDrop = async (event: DragEvent) => {
    event.preventDefault()
    setDragging(false)
    await take(await filesFromDrop(event.dataTransfer))
  }

  const sure = proposed.filter((m) => m.sure)
  const close = proposed.filter((m) => !m.sure)
  const placed = new Set(Object.values(levels).flat())
  const unplaced = songs.filter((s) => report?.added.includes(s.id) && !placed.has(s.id) && !proposed.some((m) => m.file.id === s.id))

  return (
    <section className="settings-group" aria-labelledby="music-add">
      <h2 id="music-add">Add your songs</h2>
      <div
        className="drop-zone"
        data-dragging={dragging || undefined}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <p>Drop a music folder here, or choose one.</p>
        <div className="drop-actions">
          <Button variant="primary" disabled={busy} onClick={() => folderInput.current?.click()}>
            Choose a folder
          </Button>
          <label className="ui-button" data-variant="secondary">
            Choose songs
            <input
              type="file"
              accept="audio/*"
              multiple
              className="visually-hidden"
              disabled={busy}
              onChange={(e) => {
                void take([...(e.target.files ?? [])])
                e.target.value = ''
              }}
            />
          </label>
        </div>
        <input
          ref={(el) => {
            folderInput.current = el
            el?.setAttribute('webkitdirectory', '')
          }}
          type="file"
          multiple
          hidden
          onChange={(e) => {
            void take([...(e.target.files ?? [])])
            e.target.value = ''
          }}
        />
        {busy && <p className="ui-note">Reading your songs…</p>}
      </div>

      {report && <output className="music-report">{report.text}</output>}

      {sure.length > 0 && (
        <div className="music-matches">
          <ul>
            {sure.map((m) => (
              <li key={m.file.id}>
                “{m.file.title}”{m.file.artist ? `, ${m.file.artist}` : ''} → Level {m.song.level}
              </li>
            ))}
          </ul>
          <Button variant="primary" onClick={() => void accept(sure)}>
            Accept all
          </Button>
        </div>
      )}

      {close.map((m) => (
        <div key={m.file.id} className="music-question">
          <p>
            Is “{m.file.title}”{m.file.artist ? ` by ${m.file.artist}` : ''} the song “{m.song.title}” by {m.song.artist}, for Level {m.song.level}?
          </p>
          <Button onClick={() => void accept([m])}>Yes</Button>
          <Button variant="quiet" onClick={() => decline(m)}>
            No
          </Button>
        </div>
      ))}

      {unplaced.length > 0 && (
        <div className="music-unplaced">
          <p>These didn’t match a recommended song. You can place each one on any level:</p>
          <ul>
            {unplaced.map((song) => (
              <li key={song.id}>
                <span>
                  “{song.title}”{song.artist ? `, ${song.artist}` : ''}
                </span>
                <select aria-label={`Level for ${song.title}`} defaultValue="" onChange={(e) => e.target.value && void assign(Number(e.target.value), song.id)}>
                  <option value="">Choose a level…</option>
                  {ALL_LEVELS.map((level) => (
                    <option key={level.number} value={level.number}>
                      Level {level.number}: {level.title}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      )}

      {report && report.skipped.length > 0 && (
        <details className="music-skipped">
          <summary>
            {report.skipped.length} {report.skipped.length === 1 ? 'file' : 'files'} couldn’t be used
          </summary>
          <ul>
            {report.skipped.map((s) => (
              <li key={s.name}>
                {s.name}: {s.why}
              </li>
            ))}
          </ul>
        </details>
      )}

      <p className="ui-note">
        Which files work: songs bought from the iTunes Store, Amazon or Bandcamp, or copied from CDs. Songs downloaded inside Spotify or Apple
        Music don’t, because they’re locked to those apps. Your songs stay in this browser on this device; they are never uploaded or shared.
      </p>
    </section>
  )
}
