import { RIVERS, type LatLon } from './geo'

/**
 * Places a player can tap on a map: rivers (lines), and areas (outlines), each with the
 * name the game says aloud and shows in the list beside the map. The quiz's "Where did it
 * happen?" questions name the ones they offer (see quiz/types.ts).
 *
 * Modern countries are outlined roughly, for questions like "which country do the Tigris
 * and the Euphrates flow through today?". Eden's place is unknown; the map marks the
 * traditional area at the head of the Persian Gulf honestly as uncertain, and the lands
 * around it by direction.
 */

export interface MapRegion {
  id: string
  /** Said by screen readers, and shown in the list beside the map. */
  name: string
  kind: 'river' | 'area'
  /** For an area, its outline; for a river, its course. */
  shape: LatLon[]
}

const pairs = (points: [number, number][]): LatLon[] => points.map(([lat, lon]) => ({ lat, lon }))

/** Where tradition looks for Eden: where the Tigris and the Euphrates meet. Nobody knows. */
export const EDEN: LatLon = { lat: 31.2, lon: 47.0 }

const AREAS: MapRegion[] = [
  {
    id: 'iraq',
    name: 'Iraq',
    kind: 'area',
    shape: pairs([
      [37.1, 42.3], [37.3, 44.8], [36.7, 45.1], [35.8, 46.0], [35.1, 46.1], [34.0, 45.6], [33.0, 46.1], [32.0, 47.5], [31.0, 47.7],
      [30.0, 48.5], [29.4, 47.9], [29.1, 47.4], [29.0, 46.5], [29.2, 44.7], [31.1, 42.1], [32.2, 39.2], [33.4, 38.8], [34.4, 41.0],
      [35.0, 41.2], [36.4, 41.3],
    ]),
  },
  {
    id: 'syria',
    name: 'Syria',
    kind: 'area',
    shape: pairs([
      [37.1, 42.3], [36.4, 41.3], [35.0, 41.2], [34.4, 41.0], [33.4, 38.8], [32.3, 36.8], [32.7, 35.9], [33.3, 35.8], [34.6, 36.4],
      [35.6, 35.9], [36.6, 36.2], [36.8, 36.6], [36.7, 37.6], [36.8, 38.8], [37.1, 40.7],
    ]),
  },
  {
    id: 'egypt',
    name: 'Egypt',
    kind: 'area',
    shape: pairs([
      [31.4, 28.0], [31.2, 29.9], [31.5, 31.0], [31.3, 32.3], [31.1, 34.2], [29.5, 34.9], [28.5, 34.5], [27.73, 34.25], [28.7, 33.2],
      [29.5, 32.75], [29.95, 32.55], [29.6, 32.4], [28.3, 33.1], [27.0, 33.95], [25.0, 34.95], [23.0, 35.65], [23.0, 28.0],
    ]),
  },
  {
    id: 'arabia',
    name: 'Saudi Arabia',
    kind: 'area',
    shape: pairs([
      [32.2, 39.2], [31.1, 42.1], [29.2, 44.7], [29.0, 46.5], [29.1, 47.4], [28.6, 48.4], [27.1, 49.6], [26.4, 50.1], [25.6, 50.2],
      [24.6, 50.8], [24.3, 51.6], [23.0, 52.0], [23.0, 38.8], [24.0, 38.0], [25.0, 37.25], [26.2, 36.4], [27.5, 35.4], [28.0, 34.85],
      [29.3, 35.0], [29.9, 36.6], [31.5, 37.0],
    ]),
  },
  {
    id: 'iran',
    name: 'Iran',
    kind: 'area',
    shape: pairs([
      [39.7, 44.8], [38.0, 44.2], [37.3, 44.8], [36.7, 45.1], [35.8, 46.0], [35.1, 46.1], [34.0, 45.6], [33.0, 46.1], [32.0, 47.5],
      [31.0, 47.7], [30.0, 48.5], [29.95, 48.6], [29.9, 49.6], [28.9, 50.8], [27.8, 51.6], [27.2, 53.0], [26.6, 54.5], [27.0, 56.1],
      [26.5, 56.5], [25.6, 57.2], [25.4, 58.0], [40.5, 58.0], [40.5, 48.0], [39.4, 48.0], [38.8, 46.5],
    ]),
  },
  // The lands around Eden, by direction, for "Cain went to the land of Nod, east of Eden."
  {
    id: 'east-of-eden',
    name: 'The land east of Eden',
    kind: 'area',
    shape: pairs([[34.4, 46.3], [34.4, 51.5], [30.4, 51.5], [29.9, 49.6], [30.6, 48.4], [32.0, 47.6], [33.1, 46.4]]),
  },
  {
    id: 'west-of-eden',
    name: 'The land west of Eden',
    kind: 'area',
    shape: pairs([[33.4, 39.0], [32.6, 44.2], [31.4, 45.6], [29.6, 44.0], [30.6, 40.4], [31.8, 38.6]]),
  },
  {
    id: 'north-of-eden',
    name: 'The land north of Eden',
    kind: 'area',
    shape: pairs([[37.6, 41.6], [37.6, 45.6], [35.0, 46.0], [33.8, 44.6], [34.4, 41.6]]),
  },
  {
    id: 'south-of-eden',
    name: 'The land south of Eden',
    kind: 'area',
    shape: pairs([[29.2, 44.4], [28.8, 47.6], [27.0, 49.4], [25.4, 47.8], [25.6, 44.6], [27.4, 43.0]]),
  },

  // Level 2 · Noah and the Nations: mountain ranges, lands and cities.
  { id: 'ararat-mountains', name: 'The mountains of Ararat', kind: 'area', shape: pairs([[40.4, 42.8], [40.4, 45.4], [39.4, 45.6], [38.9, 44.4], [39.2, 42.9]]) },
  { id: 'sinai-mountains', name: 'Mount Sinai', kind: 'area', shape: pairs([[29.0, 33.4], [29.1, 34.2], [28.4, 34.5], [28.0, 34.1], [28.3, 33.5]]) },
  { id: 'lebanon-mountains', name: 'The mountains of Lebanon', kind: 'area', shape: pairs([[34.7, 35.9], [34.5, 36.6], [33.4, 36.0], [33.5, 35.5], [34.2, 35.6]]) },
  { id: 'taurus-mountains', name: 'The Taurus mountains', kind: 'area', shape: pairs([[37.6, 31.0], [38.8, 35.5], [38.8, 39.6], [37.8, 39.8], [36.9, 35.0], [36.6, 31.6]]) },
  { id: 'shinar', name: 'Shinar', kind: 'area', shape: pairs([[33.6, 43.4], [33.2, 45.4], [31.6, 47.4], [30.5, 47.7], [30.7, 46.0], [31.8, 44.4], [32.9, 43.3]]) },
  { id: 'canaan', name: 'Canaan', kind: 'area', shape: pairs([[33.3, 35.15], [33.2, 35.9], [31.4, 35.6], [31.1, 34.9], [31.5, 34.4], [32.6, 34.9]]) },
  { id: 'anatolia', name: 'Anatolia', kind: 'area', shape: pairs([[40.4, 28.4], [40.4, 35.6], [39.4, 37.4], [38.4, 36.6], [37.6, 32.0], [38.2, 28.6]]) },
  ...[
    ['ur', 'Ur of the Chaldeans', 30.96, 46.1],
    ['haran', 'Haran', 36.86, 39.03],
    ['nineveh', 'Nineveh', 36.36, 43.15],
    ['babel', 'Babel', 32.54, 44.42],
  ].map(([id, name, lat, lon]) => city(id as string, name as string, { lat: lat as number, lon: lon as number })),
]

/** A city on the map: a small square around it, big enough to tap. */
function city(id: string, name: string, at: LatLon): MapRegion {
  const r = 0.45
  return { id, name, kind: 'area', shape: pairs([[at.lat + r, at.lon - r], [at.lat + r, at.lon + r], [at.lat - r, at.lon + r], [at.lat - r, at.lon - r]]) }
}

export const MAP_REGIONS: MapRegion[] = [...RIVERS.map((r) => ({ id: r.id, name: `The ${r.name}`, kind: 'river' as const, shape: r.course })), ...AREAS]

const BY_ID = new Map(MAP_REGIONS.map((r) => [r.id, r]))

export function mapRegion(id: string): MapRegion | undefined {
  return BY_ID.get(id)
}
