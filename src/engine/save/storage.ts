import { createStore, del, get, set } from 'idb-keyval'

/**
 * Where saves live. The game uses the browser's IndexedDB database; tests use a plain
 * in-memory map. Both look the same to the rest of the code.
 */
export interface KeyValueStore {
  get<T>(key: string): Promise<T | undefined>
  set(key: string, value: unknown): Promise<void>
  del(key: string): Promise<void>
}

export function memoryStore(): KeyValueStore {
  const map = new Map<string, unknown>()
  return {
    async get<T>(key: string) {
      // Hand back a copy, like a real database would, so callers can't change stored data.
      const value = map.get(key)
      return value === undefined ? undefined : (structuredClone(value) as T)
    },
    async set(key, value) {
      map.set(key, structuredClone(value))
    },
    async del(key) {
      map.delete(key)
    },
  }
}

export function indexedDbStore(databaseName: string, storeName: string): KeyValueStore {
  const store = createStore(databaseName, storeName)
  return {
    get: <T>(key: string) => get<T>(key, store),
    set: (key, value) => set(key, value, store),
    del: (key) => del(key, store),
  }
}

/**
 * Asks the browser to keep our data even when the device runs low on space.
 * Returns whether it agreed. Some browsers decide on their own and never ask.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  try {
    if (await navigator.storage?.persisted?.()) return true
    return (await navigator.storage?.persist?.()) ?? false
  } catch {
    return false
  }
}
