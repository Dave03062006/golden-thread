import 'fake-indexeddb/auto'
import { describe, expect, it } from 'vitest'
import { canonicalJson, checksumOf } from './checksum'
import { upgradeSave } from './migrations'
import { EXPORT_FORMAT, createSaveSystem, type SlotState } from './saves'
import { indexedDbStore, memoryStore } from './storage'
import { SAVE_VERSION, SaveError, newSave, type SaveData } from './types'

const NOW = '2026-10-15T12:00:00.000Z'

/** The save in a slot, failing the test if the slot isn't readable. */
function okData(slot: SlotState) {
  if (slot.state !== 'ok') throw new Error(`expected a readable save, got "${slot.state}"`)
  return slot
}

function sample(name = 'Dave'): SaveData {
  return {
    ...newSave(name, 'pixel', NOW),
    position: { level: 'l1', episode: 'l1-e1', scene: 'l1-e1-s2' },
    threadsFound: ['l1-e1'],
  }
}

describe('checksum', () => {
  it('ignores key order but not content', () => {
    expect(canonicalJson({ b: 1, a: [2, { d: 3, c: 4 }] })).toBe('{"a":[2,{"c":4,"d":3}],"b":1}')
    expect(checksumOf({ a: 1, b: 2 })).toBe(checksumOf({ b: 2, a: 1 }))
    expect(checksumOf({ a: 1 })).not.toBe(checksumOf({ a: 2 }))
  })
})

describe('save slots', () => {
  it('start empty', async () => {
    const saves = createSaveSystem(memoryStore())
    const slots = await saves.listSlots()
    expect(slots.map((s) => s.state)).toEqual(['empty', 'empty', 'empty'])
  })

  it('keep the journal and the quiz history through a reload, an export and an import', async () => {
    const store = indexedDbStore('golden-thread-journal-test', 'saves')
    const played: SaveData = {
      ...sample(),
      completedLevels: ['l01'],
      journal: [{ id: 'l01-reflection', level: 'l01', question: 'Where are you with God today?', text: 'Learning to stop hiding.' + String.fromCharCode(10) + 'Coming back.', at: NOW }],
      quiz: {
        l01: {
          best: 8,
          runs: [{ seed: 42, score: 8, at: NOW, total: 10, questions: ['l01-q01', 'l01-q14'], answers: ['Day 4', ['tigris', 'euphrates']] }],
          missed: { 'l01-q27': 1 },
        },
      },
    }
    await createSaveSystem(store).write(0, played)
    // A fresh save system on the same database, as after reloading the page.
    const reloaded = createSaveSystem(store)
    expect(okData(await reloaded.load(0)).data).toEqual(played)
    const imported = await reloaded.importText(reloaded.exportText(played, NOW), 2)
    expect(imported).toEqual(played)
    expect(okData(await reloaded.load(2)).data).toEqual(played)
  })

  it('write and load a save', async () => {
    const saves = createSaveSystem(memoryStore())
    await saves.write(1, sample())
    expect(okData(await saves.load(1)).data).toEqual(sample())
  })

  it('restore the backup when the main copy is damaged', async () => {
    const store = memoryStore()
    const saves = createSaveSystem(store)
    await saves.write(0, sample('First'))
    await saves.write(0, sample('Second'))
    const main = await store.get<{ data: SaveData; checksum: string }>('slot-0')
    await store.set('slot-0', { ...main, data: { ...main!.data, name: 'Tampered' } })

    const slot = okData(await saves.load(0))
    expect(slot.restoredFromBackup).toBe(true)
    expect(slot.data.name).toBe('First')
    // The good copy was put back in place.
    expect(okData(await saves.load(0)).restoredFromBackup).toBe(false)
  })

  it('report damage when no good copy is left', async () => {
    const store = memoryStore()
    const saves = createSaveSystem(store)
    await store.set('slot-2', { data: sample(), checksum: 'nonsense' })
    expect((await saves.load(2)).state).toBe('damaged')
  })

  it('remove a save and its backup', async () => {
    const saves = createSaveSystem(memoryStore())
    await saves.write(0, sample())
    await saves.write(0, sample())
    await saves.remove(0)
    expect((await saves.load(0)).state).toBe('empty')
  })

  it('survive a round trip through a real IndexedDB', async () => {
    const saves = createSaveSystem(indexedDbStore('golden-thread-test', 'saves'))
    await saves.write(2, sample())
    expect(okData(await saves.load(2)).data.name).toBe('Dave')
  })
})

describe('export and import', () => {
  it('round-trips a save through a file', async () => {
    const saves = createSaveSystem(memoryStore())
    const text = saves.exportText(sample(), NOW)
    expect(JSON.parse(text).format).toBe(EXPORT_FORMAT)
    const imported = await saves.importText(text, 1)
    expect(imported).toEqual(sample())
    expect((await saves.load(1)).state).toBe('ok')
  })

  it('rejects files that are not saves', async () => {
    const saves = createSaveSystem(memoryStore())
    await expect(saves.importText('hello', 0)).rejects.toBeInstanceOf(SaveError)
    await expect(saves.importText('{"format":"other"}', 0)).rejects.toMatchObject({ code: 'not-a-save' })
  })

  it('rejects a save that was edited by hand', async () => {
    const saves = createSaveSystem(memoryStore())
    const file = JSON.parse(saves.exportText(sample(), NOW))
    file.save.data.playSeconds = 999999
    await expect(saves.importText(JSON.stringify(file), 0)).rejects.toMatchObject({ code: 'damaged' })
  })
})

describe('upgradeSave', () => {
  it('fills in missing parts with safe defaults', () => {
    const save = upgradeSave({ version: SAVE_VERSION, name: 'Old', style: 'nonsense', threadsFound: [1, 'x'] })
    expect(save.style).toBe('paper-glass')
    expect(save.threadsFound).toEqual(['x'])
    expect(save.position).toBeNull()
    expect(save.journal).toEqual([])
    // Saves from before the cathedral have no panels set yet; the next visit sets them.
    expect(save.panelsSet).toEqual([])
  })

  it('applies upgrade steps in order', () => {
    const upgrades = {
      1: (s: Record<string, unknown>) => ({ ...s, name: `${s.name}+1` }),
      2: (s: Record<string, unknown>) => ({ ...s, name: `${s.name}+2` }),
    }
    const save = upgradeSave({ version: 1, name: 'v' }, upgrades, 3)
    expect(save.name).toBe('v+1+2')
    expect(save.version).toBe(3)
  })

  it('refuses saves from a newer game', () => {
    expect(() => upgradeSave({ version: SAVE_VERSION + 1, name: 'x' })).toThrow(SaveError)
  })
})
