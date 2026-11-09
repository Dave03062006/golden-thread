import { PORTIONS } from '../../../content/levels/14-joshua/episode-6'
import { WAY } from '../../../content/levels/14-joshua/episode-5'
import type { PaperLayerArt } from '../art'
import { BOTTOM, LEFT, RIGHT, bandFrom } from '../frame'

/**
 * Level 14 · Joshua: Rahab's roof in Jericho, with flax drying on it; the city wall with her
 * house and window in it, standing and fallen; the moonlit road up through the hills from
 * Gilgal to Gibeon, for the play "all night from Gilgal"; and the map of the land, for the
 * play "a portion for each".
 */

const at = (p: { x: number; y: number }) => `${p.x * 1600} ${p.y * 900}`

/** The city behind the wall: flat-roofed houses, and palms. */
const city = (base: number) => `
  ${Array.from({ length: 16 }, (_, i) => `<rect x="${LEFT + i * 140}" y="${base - 40 - (i % 3) * 24}" width="${110 + (i % 2) * 30}" height="${80 + (i % 3) * 24}" fill="${i % 2 ? '#d8b078' : '#c89a62'}"/>`).join('')}
  ${Array.from({ length: 6 }, (_, i) => `<path d="M${120 + i * 300} ${base - 40}L${126 + i * 300} ${base - 140}" stroke="#8a5a32" stroke-width="10"/><ellipse cx="${126 + i * 300}" cy="${base - 146}" rx="44" ry="14" fill="#4a7a3a"/>`).join('')}`

/** A wall of big stones, from `top` to the ground, between `x1` and `x2`. */
const stones = (x1: number, x2: number, top: number) => `
  <rect x="${x1}" y="${top}" width="${x2 - x1}" height="${720 - top}" fill="#c8a06a"/>
  ${Array.from({ length: Math.ceil((720 - top) / 40) }, (_, r) => `<path d="M${x1} ${top + r * 40}L${x2} ${top + r * 40}" stroke="#946a3e" stroke-width="3"/>`).join('')}`

export const joshuaLayers: Record<string, PaperLayerArt> = {
  'jericho-walls': {
    bounds: bandFrom(160),
    shadow: true,
    resolution: 0.5,
    svg: `
      ${city(324)}
      ${stones(LEFT, RIGHT, 324)}
      ${Array.from({ length: 34 }, (_, i) => `<rect x="${LEFT + i * 60}" y="300" width="34" height="26" fill="#c8a06a"/>`).join('')}
      <rect x="896" y="324" width="224" height="396" fill="#e0be86"/>
      <rect x="966" y="350" width="52" height="52" rx="6" fill="#3a2418"/>
      <rect x="${LEFT}" y="720" width="${RIGHT - LEFT}" height="${BOTTOM - 720}" fill="#b8865a"/>`,
  },
  'jericho-fallen': {
    bounds: bandFrom(160),
    shadow: true,
    resolution: 0.5,
    svg: `
      ${city(324)}
      <path d="M${LEFT} 720${Array.from({ length: 34 }, (_, i) => `L${LEFT + i * 60 + 30} ${600 + ((i * 37) % 60)}`).join('')}L${RIGHT} 720Z" fill="#c8a06a"/>
      ${Array.from({ length: 40 }, (_, i) => `<ellipse cx="${LEFT + 20 + i * 48}" cy="${690 - ((i * 23) % 50)}" rx="26" ry="16" fill="${i % 2 ? '#b08452' : '#d8b078'}"/>`).join('')}
      ${stones(1024, 1216, 324)}
      <rect x="1094" y="370" width="52" height="52" rx="6" fill="#3a2418"/>
      <rect x="${LEFT}" y="720" width="${RIGHT - LEFT}" height="${BOTTOM - 720}" fill="#b8865a"/>`,
  },
  'rahab-roof': {
    bounds: bandFrom(250),
    shadow: true,
    resolution: 0.5,
    svg: `
      ${city(400)}
      ${Array.from({ length: 26 }, (_, i) => `<rect x="${LEFT + i * 80}" y="400" width="44" height="30" fill="#c8a06a"/>`).join('')}
      <rect x="${LEFT}" y="420" width="${RIGHT - LEFT}" height="120" fill="#c8a06a"/>
      <rect x="${LEFT}" y="540" width="${1250 - LEFT}" height="200" fill="#e8cc96"/>
      <rect x="${LEFT}" y="736" width="${1250 - LEFT}" height="40" fill="#b8865a"/>
      ${Array.from({ length: 6 }, (_, i) => `<rect x="${1216 + i * 38}" y="${650 + i * 22}" width="60" height="18" fill="${i % 2 ? '#a8744a' : '#c08a56'}"/>`).join('')}
      <rect x="${LEFT}" y="776" width="${RIGHT - LEFT}" height="${BOTTOM - 776}" fill="#8a5a32"/>`,
  },
  'hill-road-map': {
    bounds: bandFrom(90),
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="90" width="${RIGHT - LEFT}" height="${BOTTOM - 90}" fill="#232a4a"/>
      ${Array.from({ length: 16 }, (_, i) => `<ellipse cx="${LEFT + 80 + i * 130}" cy="${180 + ((i * 131) % 640)}" rx="${120 + (i % 3) * 40}" ry="${50 + (i % 2) * 20}" fill="#3a4466" opacity=".9"/>`).join('')}
      <circle cx="${at(WAY.at(-1)!).split(' ')[0]}" cy="${at(WAY.at(-1)!).split(' ')[1]}" r="70" fill="#2e3656"/>
      <path d="M${WAY.map(at).join('L')}" stroke="#6a7aa0" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      ${WAY.map((p) => `<circle cx="${at(p).split(' ')[0]}" cy="${at(p).split(' ')[1]}" r="8" fill="#f4d070"/>`).join('')}`,
  },
  'tribes-map': {
    bounds: bandFrom(54),
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="54" width="${RIGHT - LEFT}" height="${BOTTOM - 54}" fill="#e8d4a4"/>
      <path d="M${LEFT} 54L470 54L${0.2 * 1600} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#4a7ab8"/>
      <ellipse cx="960" cy="198" rx="40" ry="30" fill="#5a9ad8"/>
      <path d="M960 228Q990 360 970 460Q950 520 976 558" stroke="#5a9ad8" stroke-width="10" fill="none"/>
      <path d="M976 558Q1030 620 1006 740Q980 770 954 740Q930 640 976 558Z" fill="#4a7ab8"/>
      ${PORTIONS.map((p) => `<circle cx="${p.x * 1600}" cy="${p.y * 900}" r="10" fill="#8a5a32"/>`).join('')}`,
  },
}
