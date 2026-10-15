import { useCallback, useEffect, useState } from 'react'
import { saves, useApp } from '../app/store'
import { useSettings } from '../engine/settings'
import type { SlotState } from '../engine/save/saves'
import { requestPersistentStorage } from '../engine/save/storage'
import { SaveError, newSave, type SaveData, type SlotIndex } from '../engine/save/types'
import { STYLE_NAMES } from '../styles/ids'
import { Button, Dialog, Panel } from '../ui/components'
import { downloadText, formatDate, formatPlayTime } from '../ui/format'
import { describePosition } from './places'
import './screens.css'

/** The title screen: the game's name and the three save files. */
export function TitleScreen() {
  const openSave = useApp((s) => s.openSave)
  const lastStyle = useSettings((s) => s.lastStyle)
  const [slots, setSlots] = useState<SlotState[] | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [creating, setCreating] = useState<SlotIndex | null>(null)
  const [deleting, setDeleting] = useState<SlotIndex | null>(null)
  const [name, setName] = useState('Pilgrim')

  // Bumping `version` reloads the save files from storage.
  const [version, setVersion] = useState(0)
  const refresh = useCallback(() => setVersion((v) => v + 1), [])
  useEffect(() => {
    let current = true
    saves.listSlots().then((list) => {
      if (current) setSlots(list)
    })
    return () => {
      current = false
    }
  }, [version])

  const startNewGame = async () => {
    if (creating === null) return
    const save = newSave(name.trim() || 'Pilgrim', lastStyle, new Date().toISOString())
    await saves.write(creating, save)
    await requestPersistentStorage()
    setCreating(null)
    openSave(creating, save)
  }

  const importInto = async (slot: SlotIndex, file: File) => {
    try {
      await saves.importText(await file.text(), slot)
      setMessage(`Save loaded into file ${slot + 1}.`)
    } catch (error) {
      setMessage(error instanceof SaveError ? error.message : 'That file could not be read.')
    }
    refresh()
  }

  const exportSave = (data: SaveData) => {
    const safeName = data.name.replace(/[^\w-]+/g, '-').toLowerCase() || 'save'
    downloadText(`golden-thread-${safeName}.json`, saves.exportText(data, new Date().toISOString()))
  }

  const confirmDelete = async () => {
    if (deleting === null) return
    await saves.remove(deleting)
    setDeleting(null)
    refresh()
  }

  return (
    <main className="screen screen-title">
      <header className="title-header">
        <p className="title-kicker">A journey through the whole Bible</p>
        <h1 className="title-name">Golden Thread</h1>
      </header>

      <section className="title-slots" aria-label="Save files">
        {slots?.map((slot) => (
          <Panel key={slot.slot} className="slot-card" aria-label={`Save file ${slot.slot + 1}`}>
            <p className="slot-number">File {slot.slot + 1}</p>
            {slot.state === 'empty' && (
              <>
                <p className="slot-empty">Empty</p>
                <div className="slot-actions">
                  <Button variant="primary" onClick={() => setCreating(slot.slot)}>
                    New game
                  </Button>
                  <label className="ui-button" data-variant="quiet">
                    Import
                    <input
                      type="file"
                      accept="application/json,.json"
                      className="visually-hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) importInto(slot.slot, file)
                        e.target.value = ''
                      }}
                    />
                  </label>
                </div>
              </>
            )}
            {slot.state === 'ok' && (
              <>
                <h2 className="slot-name">{slot.data.name}</h2>
                <dl className="slot-facts">
                  <div>
                    <dt>Where</dt>
                    <dd>{describePosition(slot.data.position)}</dd>
                  </div>
                  <div>
                    <dt>Played</dt>
                    <dd>{formatPlayTime(slot.data.playSeconds)}</dd>
                  </div>
                  <div>
                    <dt>Style</dt>
                    <dd>{STYLE_NAMES[slot.data.style]}</dd>
                  </div>
                  <div>
                    <dt>Last played</dt>
                    <dd>{formatDate(slot.data.lastPlayedAt)}</dd>
                  </div>
                </dl>
                {slot.restoredFromBackup && <p className="ui-note">Restored from the backup copy.</p>}
                <div className="slot-actions">
                  <Button variant="primary" onClick={() => openSave(slot.slot, slot.data)}>
                    Play
                  </Button>
                  <Button variant="quiet" onClick={() => exportSave(slot.data)}>
                    Export
                  </Button>
                  <Button variant="quiet" onClick={() => setDeleting(slot.slot)}>
                    Delete
                  </Button>
                </div>
              </>
            )}
            {slot.state === 'damaged' && (
              <>
                <p className="slot-empty">This save is damaged and couldn't be recovered.</p>
                <div className="slot-actions">
                  <Button variant="danger" onClick={() => setDeleting(slot.slot)}>
                    Delete
                  </Button>
                </div>
              </>
            )}
          </Panel>
        ))}
      </section>

      {message && (
        <output className="title-message">{message}</output>
      )}

      <Dialog open={creating !== null} title="A new journey" onClose={() => setCreating(null)}>
        <form
          className="ui-dialog-form"
          onSubmit={(e) => {
            e.preventDefault()
            startNewGame()
          }}
        >
          <label className="ui-field">
            Your name
            <input value={name} maxLength={24} autoComplete="off" onChange={(e) => setName(e.target.value)} />
          </label>
          <p className="ui-note">You can change the art style at any time in Settings.</p>
          <div className="ui-dialog-actions">
            <Button variant="quiet" onClick={() => setCreating(null)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Begin
            </Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={deleting !== null} title="Delete this save?" onClose={() => setDeleting(null)}>
        <p>This can't be undone. If you might want it later, export it first.</p>
        <div className="ui-dialog-actions">
          <Button variant="quiet" onClick={() => setDeleting(null)}>
            Keep it
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Dialog>
    </main>
  )
}
