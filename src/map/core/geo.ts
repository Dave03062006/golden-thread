/**
 * The shared core of the game's maps (spec §13): turning real latitude and longitude into
 * drawing units, and the outlines of the lands and seas of the Bible world. The quiz's
 * "Where did it happen?" picker draws with it now; the world map (milestone 6) builds on it.
 *
 * Outlines are simplified by hand from real coordinates: close enough to recognise the
 * coasts and rivers, with no claim to survey accuracy.
 */

import { PLACES } from '../../content/geography'

export interface LatLon {
  lat: number
  lon: number
}

/** The part of the world a map shows. */
export interface MapFrame {
  north: number
  south: number
  west: number
  east: number
  /** Width of the drawing, in units; the height follows from the frame's shape. */
  width: number
}

/** The Bible lands from Egypt to Persia, for Level 1's questions. */
export const NEAR_EAST: MapFrame = { north: 40.5, south: 23, west: 28, east: 58, width: 1000 }

/**
 * An equirectangular projection, with longitude shortened by the cosine of the frame's
 * middle latitude so shapes keep their proportions at these latitudes.
 */
export function projector(frame: MapFrame) {
  const midLat = ((frame.north + frame.south) / 2) * (Math.PI / 180)
  const xScale = frame.width / (frame.east - frame.west)
  const yScale = xScale / Math.cos(midLat)
  const height = (frame.north - frame.south) * yScale
  return {
    width: frame.width,
    height,
    point: ({ lat, lon }: LatLon) => ({ x: (lon - frame.west) * xScale, y: (frame.north - lat) * yScale }),
  }
}

export type Projector = ReturnType<typeof projector>

const pairs = (points: [number, number][]): LatLon[] => points.map(([lat, lon]) => ({ lat, lon }))

/** Seas and lakes, as closed outlines (everything else in the frame is land). */
export const SEAS: { id: string; name: string; outline: LatLon[] }[] = [
  {
    id: 'mediterranean',
    name: 'Mediterranean Sea',
    outline: pairs([
      [36.7, 28.0], [36.6, 29.2], [36.3, 30.5], [36.9, 30.8], [36.6, 31.6], [36.1, 32.9], [36.2, 33.7], [36.8, 34.7], [36.7, 35.6],
      [36.9, 36.0], [36.6, 36.2], [36.1, 35.9], [35.5, 35.8], [34.6, 35.9], [33.9, 35.5], [33.1, 35.1], [32.8, 34.95], [32.1, 34.77],
      [31.5, 34.4], [31.2, 33.9], [31.1, 33.1], [31.25, 32.3], [31.5, 31.5], [31.4, 30.4], [31.2, 29.9], [30.9, 28.9], [30.8, 28.0],
    ]),
  },
  {
    id: 'red-sea',
    name: 'Red Sea',
    outline: pairs([
      [29.95, 32.55], [29.5, 32.75], [28.7, 33.2], [27.73, 34.25], [28.5, 34.5], [29.5, 34.9], [29.3, 35.0], [28.0, 34.85], [27.5, 35.4],
      [26.2, 36.4], [25.0, 37.25], [24.0, 38.0], [23.0, 38.8], [23.0, 35.65], [25.0, 34.95], [27.0, 33.95], [28.3, 33.1], [29.6, 32.4],
    ]),
  },
  {
    id: 'persian-gulf',
    name: 'Persian Gulf',
    outline: pairs([
      [29.95, 48.6], [29.9, 49.6], [28.9, 50.8], [27.8, 51.6], [27.2, 53.0], [26.6, 54.5], [27.0, 56.1], [26.5, 56.5], [25.6, 57.2],
      [25.4, 58.0], [23.0, 58.0], [23.0, 57.6], [24.2, 56.6], [26.0, 56.3], [25.3, 56.1], [24.5, 54.4], [24.0, 53.0], [24.3, 51.6],
      [25.9, 51.5], [26.15, 51.2], [25.6, 50.8], [24.6, 50.8], [25.6, 50.2], [26.4, 50.1], [27.1, 49.6], [28.0, 48.6], [28.9, 48.3],
      [29.4, 47.9],
    ]),
  },
  {
    id: 'caspian',
    name: 'Caspian Sea',
    outline: pairs([
      [40.5, 49.9], [39.4, 49.3], [38.4, 48.9], [37.5, 49.2], [37.4, 50.0], [36.8, 51.4], [36.7, 52.6], [36.9, 53.9], [37.4, 54.0],
      [38.4, 53.8], [39.5, 53.2], [40.5, 52.8],
    ]),
  },
  {
    id: 'dead-sea',
    name: 'Dead Sea',
    outline: pairs([
      [31.78, 35.45], [31.75, 35.58], [31.1, 35.47], [31.05, 35.4], [31.4, 35.38],
    ]),
  },
]

/** Islands drawn back over the seas. */
export const ISLANDS: LatLon[][] = [pairs([[35.2, 32.3], [35.6, 34.6], [35.1, 34.0], [34.6, 33.9], [34.6, 32.5]])]

/** The rivers the maps draw, from source to mouth: every river in the Bible's places that can be found. */
export const RIVERS: { id: string; name: string; course: LatLon[] }[] = PLACES.filter((p) => p.kind === 'river' && p.course).map((p) => ({
  id: p.id,
  name: p.name,
  course: p.course!,
}))
