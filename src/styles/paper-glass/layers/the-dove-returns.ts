import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, bandFrom } from '../frame'
import { cloud, hillCrest, hills } from '../shapes'

/**
 * Level 2, Episode 4: the dove returns. Over the gray water the clouds part, and the blue
 * shows through. The mountains of Ararat rise from the sea: far peaks, and the high shelf
 * the ark comes to rest on, which turns green in the end. As the waters go down, green
 * hills and valleys appear: a washed, new world.
 */

/** The clouds breaking up, with gaps where the blue behind them shows. */
const PARTING: [number, number, number][] = [
  [-220, -60, 3.4],
  [180, -90, 2.8],
  [980, -80, 3.2],
  [1380, -40, 2.6],
  [-120, 150, 1.8],
  [1240, 170, 1.6],
  [620, 40, 1.2],
]

/** The far peaks: each a list of points along its ridge. */
const PEAKS: [number, number][][] = [
  [
    [-140, 520],
    [60, 350],
    [150, 395],
    [300, 520],
  ],
  [
    [420, 520],
    [600, 320],
    [700, 380],
    [790, 345],
    [940, 520],
  ],
  [
    [1120, 520],
    [1320, 300],
    [1450, 390],
    [1600, 340],
    [1860, 520],
  ],
]

/** The shelf of the mountainside the ark rests on, with the slope rising to the left and falling away to the right. */
export const SLOPE = `M${LEFT} 360L20 330L140 370L250 470L320 560L380 630L1120 630Q1180 638 1220 720L1330 ${BOTTOM}L${LEFT} ${BOTTOM}Z`
const SLOPE_RIM = 'M20 330L140 370L250 470L320 560L380 630L1120 630Q1180 638 1220 720L1330 1035'

const GREEN_FAR = [520, 470, 500, 455, 490, 520, 470, 500, 450, 480]
const GREEN_NEAR = [610, 580, 620, 650, 600, 630, 590, 640, 600, 620]

const ridge = (points: [number, number][]) => `M${points.map(([x, y]) => `${x} ${y}`).join('L')}L${points.at(-1)![0]} ${BOTTOM}L${points[0]![0]} ${BOTTOM}Z`

export const theDoveReturnsLayers: Record<string, PaperLayerArt> = {
  'parting-clouds': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: PARTING.map(([x, y, s]) => cloud(x, y, s, ['#a4abba', '#959cad', '#868ea2'])).join(''),
  },
  'far-peaks': {
    bounds: bandFrom(280),
    shadow: false,
    resolution: 0.5,
    svg: PEAKS.map((points) => {
      const top = points.reduce((a, b) => (b[1] < a[1] ? b : a))
      // The lit face, the shaded face beyond the summit, and snow on the very top.
      const shade = `M${top[0]} ${top[1]}${points
        .filter(([x]) => x > top[0])
        .map(([x, y]) => `L${x} ${y}`)
        .join('')}L${points.at(-1)![0]} ${BOTTOM}L${top[0] + 40} ${BOTTOM}Z`
      return `<path d="${ridge(points)}" fill="#8a96aa"/><path d="${shade}" fill="#76829a"/>
        <path d="M${top[0] - 34} ${top[1] + 40}L${top[0]} ${top[1]}L${top[0] + 30} ${top[1] + 36}L${top[0] + 12} ${top[1] + 30}L${top[0] - 4} ${top[1] + 44}Z" fill="#eef0f4"/>`
    }).join(''),
  },
  'green-hills': {
    bounds: bandFrom(420),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills(GREEN_FAR)}" fill="#86b06e"/>
      <path d="${hillCrest(GREEN_FAR)}" stroke="#a8cc88" stroke-width="5" fill="none"/>
      <path d="${hills(GREEN_NEAR)}" fill="#5f9a56"/>
      <path d="${hillCrest(GREEN_NEAR)}" stroke="#86bc6c" stroke-width="5" fill="none"/>
      ${[
        [160, 560],
        [420, 600],
        [1060, 575],
        [1500, 590],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y! - 18}" r="22" fill="#4a8048"/><circle cx="${x! + 18}" cy="${y! - 10}" r="15" fill="#3e7040"/>`)
        .join('')}`,
  },
  'ararat-slope': {
    bounds: bandFrom(300),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${SLOPE}" fill="#7c6c60"/>
      ${[700, 770, 850, 940].map((y, i) => `<path d="M${LEFT} ${y}C300 ${y - 20} 800 ${y + 16} ${1240 + i * 30} ${y}" stroke="#665850" stroke-width="5" fill="none" opacity=".7"/>`).join('')}
      <path d="M${LEFT} 470L20 420L140 450L230 540L290 610" stroke="#665850" stroke-width="6" fill="none" opacity=".6"/>
      <path d="${SLOPE_RIM}" stroke="#a69482" stroke-width="7" fill="none"/>`,
  },
  'ararat-grass': {
    bounds: bandFrom(300),
    shadow: false,
    resolution: 0.5,
    svg: `
      <path d="${SLOPE}" fill="#6a9a50"/>
      ${[700, 770, 850, 940].map((y, i) => `<path d="M${LEFT} ${y}C300 ${y - 20} 800 ${y + 16} ${1240 + i * 30} ${y}" stroke="#5a8846" stroke-width="5" fill="none" opacity=".7"/>`).join('')}
      <path d="${SLOPE_RIM}" stroke="#9ccc78" stroke-width="7" fill="none"/>
      ${[
        [470, 660],
        [620, 700],
        [880, 680],
        [1010, 730],
        [300, 760],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#f4e48a"/><circle cx="${x! + 14}" cy="${y! + 6}" r="4" fill="#fff6e0"/>`)
        .join('')}`,
  },
}
