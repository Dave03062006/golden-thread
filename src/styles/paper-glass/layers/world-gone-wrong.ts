import { createRng } from '../../../engine/random'
import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { hills, hillCrest, stars } from '../shapes'

/**
 * Level 2, Episode 1: a world gone wrong. A great city at dusk under a smoky red sky,
 * its street of shut doors and a fire left burning; and just outside it, on the right,
 * Noah's modest home with a lamp in its window. Then night on a hill above the sleeping
 * land, where God speaks to Noah. Violence is never shown, only felt: smoke, closed doors,
 * hard silhouettes.
 */

/** Smoke rising in a soft column from (x, y), drifting right as it climbs. */
function smoke(x: number, y: number, height: number, seed: number): string {
  const rng = createRng(seed)
  let out = ''
  for (let i = 0; i < 9; i++) {
    const t = i / 8
    const r = 26 + t * 70
    out += `<circle cx="${(x + t * t * 120 + (rng.next() - 0.5) * 30).toFixed(0)}" cy="${(y - t * height).toFixed(0)}" r="${r.toFixed(0)}" opacity="${(0.62 - t * 0.42).toFixed(2)}"/>`
  }
  return out
}

/** A city skyline: blocks, towers and walls, with a few windows lit by fires. */
function skyline(): string {
  const rng = createRng(61)
  let blocks = ''
  let lights = ''
  for (let x = LEFT; x < 1180; ) {
    const w = 60 + rng.next() * 90
    const tower = rng.next() < 0.25
    const top = tower ? 300 + rng.next() * 60 : 400 + rng.next() * 70
    blocks += `<rect x="${x.toFixed(0)}" y="${top.toFixed(0)}" width="${w.toFixed(0)}" height="${(660 - top).toFixed(0)}"/>`
    if (tower) blocks += `<path d="M${(x - 6).toFixed(0)} ${top.toFixed(0)}L${(x + w / 2).toFixed(0)} ${(top - 34).toFixed(0)}L${(x + w + 6).toFixed(0)} ${top.toFixed(0)}Z"/>`
    for (let k = 0; k < 3; k++) {
      if (rng.next() < 0.45) lights += `<rect x="${(x + 10 + rng.next() * (w - 24)).toFixed(0)}" y="${(top + 20 + rng.next() * (620 - top)).toFixed(0)}" width="8" height="11"/>`
    }
    x += w - 6
  }
  // The city wall in front, with its crenellations.
  let wall = `<path d="M${LEFT} 600L1180 600L1180 680L${LEFT} 680Z"/>`
  for (let x = LEFT; x < 1180; x += 44) wall += `<rect x="${x}" y="584" width="26" height="18"/>`
  return `<g fill="#2a1a2e">${blocks}${wall}</g><g fill="#ff9a4a" opacity=".75">${lights}</g>`
}

/** The street: closed doors in a row of house fronts, a fire left burning, and Noah's home beyond. */
function street(): string {
  const rng = createRng(9)
  let houses = ''
  for (let x = LEFT; x < 1060; ) {
    const w = 150 + rng.next() * 80
    const top = 470 + rng.next() * 60
    houses += `<rect x="${x.toFixed(0)}" y="${top.toFixed(0)}" width="${w.toFixed(0)}" height="${(700 - top).toFixed(0)}" fill="${rng.next() < 0.5 ? '#4a3038' : '#3e2a32'}"/>`
    // A shut door, and a dark window.
    houses += `<rect x="${(x + w * 0.35).toFixed(0)}" y="610" width="40" height="90" fill="#22141c"/><rect x="${(x + w * 0.72).toFixed(0)}" y="${(top + 34).toFixed(0)}" width="22" height="20" fill="#22141c"/>`
    x += w
  }
  // A fire left burning at a corner, its glow on the wall.
  const fire = `
    <defs><radialGradient id="fireglow"><stop offset="0" stop-color="#ffb04a" stop-opacity=".7"/><stop offset="1" stop-color="#ff6a2a" stop-opacity="0"/></radialGradient></defs>
    <circle cx="430" cy="700" r="150" fill="url(#fireglow)"/>
    <path d="M400 712C404 676 422 668 426 640C436 664 452 670 456 712Z" fill="#ff8a2a"/>
    <path d="M414 712C418 690 428 684 430 668C438 686 446 692 446 712Z" fill="#ffd36a"/>`
  // Noah's home, outside the city on the right: a low wall, the house, its window, an olive tree.
  const home = `
    <path d="M1150 720L1150 640C1300 620 1500 618 ${RIGHT} 630L${RIGHT} 720Z" fill="#6a5040"/>
    <rect x="1330" y="500" width="200" height="160" fill="#8a6a50"/>
    <path d="M1310 504L1430 440L1550 504Z" fill="#5a3e2e"/>
    <rect x="1405" y="572" width="44" height="88" fill="#3a2a22"/>
    <rect x="1462" y="530" width="34" height="30" fill="#ffd27a"/>
    <path d="M1462 530L1496 530L1496 560L1462 560Z" fill="none" stroke="#5a3e2e" stroke-width="4"/>
    <path d="M1160 660L1320 652L1320 690L1160 698Z" fill="#7a6250"/>
    ${[1170, 1210, 1250, 1290].map((x) => `<ellipse cx="${x}" cy="656" rx="22" ry="10" fill="#8a7260"/>`).join('')}
    <path d="M1250 650L1246 560" stroke="#5a4028" stroke-width="10"/>
    <circle cx="1240" cy="540" r="44" fill="#5a6a3a"/><circle cx="1272" cy="560" r="34" fill="#6a7a42"/>`
  return `
    <path d="M${LEFT} 690L${RIGHT} 690L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#5a4034"/>
    <path d="M${LEFT} 690L${RIGHT} 690" stroke="#7a5a44" stroke-width="6"/>
    ${houses}${fire}${home}
    ${Array.from({ length: 30 }, (_, i) => `<ellipse cx="${(LEFT + ((i * 97) % (RIGHT - LEFT))).toFixed(0)}" cy="${(760 + ((i * 53) % 240)).toFixed(0)}" rx="${(10 + (i % 4) * 5).toFixed(0)}" ry="4" fill="#4a3428" opacity=".6"/>`).join('')}`
}

const NIGHT_HILL = [700, 690, 660, 632, 616, 610, 612, 622, 640, 662, 684, 700, 712]

export const worldGoneWrongLayers: Record<string, PaperLayerArt> = {
  'violent-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="vsky" x1="0" y1="${TOP}" x2="0" y2="700" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#2e1a3a"/>
          <stop offset=".45" stop-color="#7a3240"/>
          <stop offset=".8" stop-color="#d0703a"/>
          <stop offset="1" stop-color="#e8a050"/>
        </linearGradient>
        <filter id="soot" x="-30%" y="-10%" width="160%" height="120%"><feGaussianBlur stdDeviation="14"/></filter>
        <radialGradient id="vsun"><stop offset="0" stop-color="#ffe0a0"/><stop offset=".5" stop-color="#ffb060" stop-opacity=".5"/><stop offset="1" stop-color="#ff8040" stop-opacity="0"/></radialGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#vsky)"/>
      <circle cx="1380" cy="560" r="170" fill="url(#vsun)"/>
      <circle cx="1380" cy="560" r="46" fill="#ffd890"/>
      <g fill="#1e1424" filter="url(#soot)">${smoke(240, 470, 420, 3)}${smoke(640, 430, 460, 7)}${smoke(960, 470, 380, 11)}</g>`,
  },

  'city-far': {
    bounds: bandFrom(200),
    shadow: true,
    svg: skyline(),
  },

  'city-street': {
    bounds: bandFrom(400),
    shadow: true,
    svg: street(),
  },

  'night-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="nsky" x1="0" y1="${TOP}" x2="0" y2="760" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#0a0a24"/>
          <stop offset=".7" stop-color="#1c2252"/>
          <stop offset="1" stop-color="#3a3a6a"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#nsky)"/>
      <g fill="#ffffff">${stars(41, 160, { x: LEFT, y: TOP, w: RIGHT - LEFT, h: 760 })}</g>
      <circle cx="1220" cy="150" r="34" fill="#f4eed8"/>
      <circle cx="1234" cy="142" r="30" fill="#1a1e4a" opacity=".85"/>`,
  },

  'night-hill': {
    bounds: bandFrom(560),
    shadow: true,
    svg: `
      <path d="${hills([780, 770, 760, 768, 776, 770, 762, 770, 780, 774, 766, 772, 780])}" fill="#232848"/>
      <g fill="#ffcf7a" opacity=".7">${[180, 420, 610, 980, 1180, 1440].map((x, i) => `<rect x="${x}" y="${790 + (i % 3) * 14}" width="6" height="6"/>`).join('')}</g>
      <path d="${hills(NIGHT_HILL)}" fill="#141834"/>
      <path d="${hillCrest(NIGHT_HILL)}" stroke="#8a90c8" stroke-width="3" fill="none" opacity=".6"/>`,
  },
}
