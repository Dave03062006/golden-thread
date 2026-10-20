import { LEVELS } from '../../content/catalog'
import { PLACES } from '../../content/geography'
import { THREADS } from '../../content/threads'
import type { SaveData } from '../../engine/save/types'
import type { LatLon } from './geo'

/**
 * What the world map shows (spec §9.1, §9.2): the mountains, the levels' regions as
 * markers, the route the player has come by and where it heads next, and the golden
 * threads that have a place, drawn from where they begin to where they're fulfilled.
 */

/** Mountain ranges, as the peaks along them, drawn like an old map's hills. */
export const MOUNTAINS: { name: string; peaks: LatLon[] }[] = [
  { name: 'Taurus', peaks: [37.0, 37.3, 37.6, 37.9, 38.2, 38.4].map((lat, i) => ({ lat, lon: 31.5 + i * 1.6 })) },
  { name: 'Zagros', peaks: Array.from({ length: 9 }, (_, i) => ({ lat: 36.6 - i * 0.85, lon: 45.4 + i * 0.95 })) },
  { name: 'Lebanon', peaks: [{ lat: 34.2, lon: 36.1 }, { lat: 33.6, lon: 35.8 }] },
  { name: 'Sinai', peaks: [{ lat: 28.6, lon: 33.9 }, { lat: 28.2, lon: 34.2 }] },
]

/** Mount Ararat, where the ark came to rest (Level 2). */
export const ARARAT: LatLon = { lat: 39.7, lon: 44.3 }

/** Where the levels still to come begin on the map, as far as the route is drawn ahead. */
export const AHEAD: { number: number; title: string; at: LatLon; label: string }[] = [{ number: 5, title: 'Joseph and His Brothers', at: { lat: 32.42, lon: 35.24 }, label: 'Dothan' }]

export interface LevelMarker {
  id: string
  number: number
  title: string
  at: LatLon
  label: string
  finished: boolean
  /** The places the story passes through after this one. */
  route: { at: LatLon; label: string }[]
}

export function levelMarkers(save: Pick<SaveData, 'completedLevels' | 'completedEpisodes'>): LevelMarker[] {
  return LEVELS.map((l) => ({
    id: l.id,
    number: l.number,
    title: l.title,
    at: l.map.at,
    label: l.map.label,
    route: l.map.route ?? [],
    finished: save.completedLevels.includes(l.id) || l.episodes.every((e) => save.completedEpisodes.includes(e.id)),
  }))
}

export interface MapThread {
  id: string
  title: string
  from: LatLon
  to: LatLon
  /** The place it's fulfilled, by name. */
  toName: string
}

/** The golden threads found so far that have a place: from their level's region to it. */
export function mapThreads(save: Pick<SaveData, 'threadsFound'>): MapThread[] {
  return THREADS.filter((t) => save.threadsFound.includes(t.id) && t.fulfilled.place).flatMap((t) => {
    const level = LEVELS.find((l) => l.episodes.some((e) => e.id === t.episode))
    const place = PLACES.find((p) => p.id === t.fulfilled.place)
    const to = place?.at ?? place?.course?.at(-1)
    if (!level || !place || !to) return []
    return [{ id: t.id, title: t.title, from: level.map.at, to, toName: place.name }]
  })
}

/** Region names, lettered across the land in both styles. */
export const REGION_NAMES: { name: string; at: LatLon }[] = [
  { name: 'Mesopotamia', at: { lat: 34.2, lon: 42.2 } },
  { name: 'Egypt', at: { lat: 26.6, lon: 30.4 } },
  { name: 'Arabia', at: { lat: 26.5, lon: 44.0 } },
  { name: 'Persia', at: { lat: 32.5, lon: 54.0 } },
  { name: 'Anatolia', at: { lat: 39.2, lon: 33.5 } },
  { name: 'Canaan', at: { lat: 31.0, lon: 33.4 } },
]
