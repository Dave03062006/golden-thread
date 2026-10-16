import type { Place } from './types'

/**
 * Places in the Bible, with real coordinates where they can be found (spec §13.3). The
 * world map (milestone 6) draws them; the "Where and when" card names them.
 */
export const PLACES: Place[] = [
  // Level 1 · Creation and the Fall
  {
    id: 'eden',
    name: 'Eden',
    kind: 'region',
    unknown: true,
    note: 'Genesis places the garden “in the east,” where four rivers part. Two of them, the Tigris and the Euphrates, point to Mesopotamia.',
  },
  {
    id: 'mesopotamia',
    name: 'Mesopotamia',
    kind: 'region',
    at: { lat: 33.3, lon: 44.4 },
    note: 'The land “between the rivers,” in modern Iraq and Syria.',
  },
  {
    id: 'tigris',
    name: 'Tigris',
    kind: 'river',
    course: [
      { lat: 38.5, lon: 39.6 },
      { lat: 37.9, lon: 40.2 },
      { lat: 37.1, lon: 42.4 },
      { lat: 36.3, lon: 43.1 },
      { lat: 34.6, lon: 43.7 },
      { lat: 33.3, lon: 44.4 },
      { lat: 32.5, lon: 45.8 },
      { lat: 31.0, lon: 47.4 },
      { lat: 29.95, lon: 48.55 },
    ],
    note: 'Called the Hiddekel in Hebrew. It still flows through Turkey and Iraq.',
  },
  {
    id: 'euphrates',
    name: 'Euphrates',
    kind: 'river',
    course: [
      { lat: 39.0, lon: 38.9 },
      { lat: 37.1, lon: 38.0 },
      { lat: 36.1, lon: 38.1 },
      { lat: 35.3, lon: 40.1 },
      { lat: 34.4, lon: 41.0 },
      { lat: 33.4, lon: 43.3 },
      { lat: 32.5, lon: 44.4 },
      { lat: 31.0, lon: 46.2 },
      { lat: 31.0, lon: 47.4 },
    ],
    note: 'The great river of the Bible lands, flowing from Turkey through Syria and Iraq.',
  },
  {
    id: 'nile',
    name: 'Nile',
    kind: 'river',
    course: [
      { lat: 23.0, lon: 32.9 },
      { lat: 24.1, lon: 32.9 },
      { lat: 25.7, lon: 32.6 },
      { lat: 26.2, lon: 32.3 },
      { lat: 27.2, lon: 31.2 },
      { lat: 28.1, lon: 30.75 },
      { lat: 29.3, lon: 31.2 },
      { lat: 30.05, lon: 31.25 },
      { lat: 30.8, lon: 31.0 },
      { lat: 31.45, lon: 30.6 },
    ],
    note: 'The great river of Egypt.',
  },
  {
    id: 'jordan',
    name: 'Jordan',
    kind: 'river',
    course: [
      { lat: 33.2, lon: 35.62 },
      { lat: 32.85, lon: 35.6 },
      { lat: 32.7, lon: 35.57 },
      { lat: 32.3, lon: 35.55 },
      { lat: 31.76, lon: 35.55 },
    ],
    note: 'From the Sea of Galilee down to the Dead Sea.',
  },
  { id: 'pishon', name: 'Pishon', kind: 'river', unknown: true, note: 'It flowed around the land of Havilah, “where there is gold.” Nobody knows which river it was.' },
  { id: 'gihon', name: 'Gihon', kind: 'river', unknown: true, note: 'It flowed around the land of Cush. Nobody knows which river it was.' },
  { id: 'nod', name: 'Nod', kind: 'region', unknown: true, note: '“East of Eden.” Its name sounds like the Hebrew word for wandering.' },
]

const BY_ID = new Map(PLACES.map((place) => [place.id, place]))

export function placeById(id: string): Place | undefined {
  return BY_ID.get(id)
}
