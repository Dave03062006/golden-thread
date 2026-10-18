import { createRng } from '../../../engine/random'
import { cells, type Pt } from '../cathedral/glass'

/**
 * The main background in Paper & Glass: heaven and earth, and the love of God coming
 * down from one to the other. Heaven is stained glass, radiating from a rose window of
 * glory where the dove of the Spirit shines; earth is layered paper at dusk, its hills,
 * its city and its people. Between them the clouds part, and a column of light falls
 * through the opening to a cross on a hill: there heaven's love reached the earth, and
 * there it gave everything. Where the light lands, the earth is lit.
 *
 * It's drawn on a 1600 × 900 canvas, and baked (`npm run bake`) into pictures, so the
 * game only ever shows an image. The light pulsing and falling over it is added by
 * MainBackdrop, as a few moving elements.
 */

export const BACKDROP_W = 1600
export const BACKDROP_H = 900

/**
 * Where things are, shared with the moving light drawn over the picture. The light comes
 * down right of centre, so the menus (on the left) never hide the cross.
 */
export const LIGHT_X = 1000
export const GLORY = { x: LIGHT_X, y: 116, r: 108 }
export const CROSS = { x: LIGHT_X, top: 462, foot: 712, arm: 530, half: 82, w: 22 }

const f = (n: number) => n.toFixed(1)
const P = (pts: Pt[]) => 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join('L') + 'Z'
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const rgb = (c: number[]) => `rgb(${c.map((v) => Math.round(Math.max(0, Math.min(255, v)))).join(',')})`
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i]! - v) * t)

/** Heaven's glass, from the glory outward: white and gold, then amber and rose, then violet and deep blue. */
const HEAVEN_BANDS = ['#fff6dc', '#ffe39a', '#f9c06a', '#ee9a72', '#d0729a', '#9a5ab4', '#5f4aa8', '#3a3a92'].map(hex)

function heavenColor(dist: number, ray: boolean, jitter: number): string {
  const t = Math.min(1, Math.max(0, (dist - GLORY.r) / 860)) * (HEAVEN_BANDS.length - 1)
  const i = Math.min(HEAVEN_BANDS.length - 2, Math.floor(t))
  let c = mix(HEAVEN_BANDS[i]!, HEAVEN_BANDS[i + 1]!, t - i)
  // Every other ray of glass is a little brighter, so the light seems to stream outward.
  c = ray ? mix(c, [255, 246, 220], 0.22) : c
  return rgb(c.map((v) => v * jitter))
}

/** The glass of heaven: pieces laid out in rings around the glory, so they radiate from it. */
function heavenGlass(): string {
  const rng = createRng(77)
  const sites: Pt[] = []
  for (let r = GLORY.r + 34, ring = 0; r < 1150; r += 34 + r * 0.05, ring++) {
    const count = Math.max(12, Math.round((Math.PI * 2 * r) / (44 + r * 0.06)))
    for (let k = 0; k < count; k++) {
      const a = ((k + (ring % 2) * 0.5) / count) * Math.PI * 2 + (rng.next() - 0.5) * 0.04
      const x = GLORY.x + Math.cos(a) * (r + (rng.next() - 0.5) * 10)
      const y = GLORY.y + Math.sin(a) * (r + (rng.next() - 0.5) * 10)
      if (x > -80 && x < BACKDROP_W + 80 && y > -80 && y < 580) sites.push([x, y])
    }
  }
  const pieces = cells(sites, [0, 0, BACKDROP_W, 580])
  const fills = pieces
    .map((poly) => {
      const cx = poly.reduce((s, p) => s + p[0], 0) / poly.length
      const cy = poly.reduce((s, p) => s + p[1], 0) / poly.length
      const dist = Math.hypot(cx - GLORY.x, cy - GLORY.y)
      const angle = Math.atan2(cy - GLORY.y, cx - GLORY.x)
      const ray = Math.floor(((angle + Math.PI) / (Math.PI * 2)) * 24) % 2 === 0
      return `<path d="${P(poly)}" fill="${heavenColor(dist, ray, 0.92 + rng.next() * 0.16)}"/>`
    })
    .join('')
  const leads = pieces.map((poly) => `<path d="${P(poly)}"/>`).join('')
  return `<g>${fills}</g><g fill="none" stroke="#2a1d40" stroke-opacity=".55" stroke-width="2.2" stroke-linejoin="round">${leads}</g>`
}

/** The rose window of glory: rings of petals around a disc of light, with the dove of the Spirit. */
function roseWindow(): string {
  const { x, y, r } = GLORY
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2
    const px = x + Math.cos(a) * r * 0.74
    const py = y + Math.sin(a) * r * 0.74
    return `<circle cx="${f(px)}" cy="${f(py)}" r="${f(r * 0.24)}" fill="${i % 2 ? '#c8354e' : '#3f62c8'}"/><circle cx="${f(px)}" cy="${f(py)}" r="${f(r * 0.24)}" fill="none" stroke="#2a1d40" stroke-width="3"/>`
  }).join('')
  const inner = Array.from({ length: 8 }, (_, i) => {
    const a0 = (i / 8) * Math.PI * 2
    const a1 = ((i + 1) / 8) * Math.PI * 2
    const pts: Pt[] = [
      [x + Math.cos(a0) * r * 0.3, y + Math.sin(a0) * r * 0.3],
      [x + Math.cos(a0) * r * 0.5, y + Math.sin(a0) * r * 0.5],
      [x + Math.cos(a1) * r * 0.5, y + Math.sin(a1) * r * 0.5],
      [x + Math.cos(a1) * r * 0.3, y + Math.sin(a1) * r * 0.3],
    ]
    return `<path d="${P(pts)}" fill="${i % 2 ? '#ffd36e' : '#f5a83a'}" stroke="#2a1d40" stroke-width="2.5"/>`
  }).join('')
  // The dove, wings spread, coming down.
  const s = r * 0.0095
  const dove = `<path transform="translate(${x} ${y + 2}) scale(${f(s)})" fill="#ffffff" d="M0 -6C-6 -12 -16 -20 -30 -22C-22 -14 -14 -6 -8 -2C-14 0 -18 4 -18 10C-12 6 -6 6 -2 8L0 22L2 8C6 6 12 6 18 10C18 4 14 0 8 -2C14 -6 22 -14 30 -22C16 -20 6 -12 0 -6Z"/>`
  return `
    <circle cx="${x}" cy="${y}" r="${r * 1.9}" fill="url(#glory-halo)"/>
    <circle cx="${x}" cy="${y}" r="${r + 10}" fill="#3a2a52"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="#ffefc4"/>
    ${petals}
    ${inner}
    <circle cx="${x}" cy="${y}" r="${f(r * 0.3)}" fill="#3f62c8" stroke="#2a1d40" stroke-width="3"/>
    ${dove}
    <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#2a1d40" stroke-width="5"/>
    <circle cx="${x}" cy="${y}" r="${r + 10}" fill="none" stroke="#c99a3e" stroke-width="3"/>`
}

/** A cloud of cut paper: a cluster of rounds of different sizes, cut flat underneath. */
function cloud(cx: number, cy: number, w: number, h: number, seed: number, color: string, shade: string): string {
  const rng = createRng(seed)
  const rounds: string[] = []
  const count = Math.max(4, Math.round(w / 46))
  for (let i = 0; i < count; i++) {
    const u = (i + 0.5) / count
    // Rounder and taller in the middle, smaller toward the ends.
    const rr = h * (0.42 + 0.58 * Math.sin(u * Math.PI)) * (0.75 + rng.next() * 0.45)
    const x = cx - w / 2 + u * w + (rng.next() - 0.5) * 18
    rounds.push(`<circle cx="${f(x)}" cy="${f(cy - rr * 0.55)}" r="${f(rr)}"/>`)
  }
  // Lit from above: pale at the top, shaded toward the flat underside.
  const id = `cloud-${seed}`
  return `<clipPath id="${id}"><rect x="${f(cx - w)}" y="${f(cy - h * 3)}" width="${f(w * 2)}" height="${f(h * 3)}"/></clipPath>
    <linearGradient id="${id}-shade" gradientUnits="userSpaceOnUse" x1="0" y1="${f(cy - h * 1.4)}" x2="0" y2="${f(cy)}"><stop offset=".45" stop-color="${color}"/><stop offset="1" stop-color="${shade}"/></linearGradient>
    <g clip-path="url(#${id})" fill="url(#${id}-shade)">${rounds.join('')}</g>`
}

/** The clouds between heaven and earth, parting where the light comes down. */
function cloudBand(): string {
  const gap = 190
  const bank: [number, number, number, number][] = [
    [-60, 600, 360, 90],
    [250, 584, 300, 78],
    [520, 600, 280, 70],
    [740, 590, LIGHT_X - gap - 740 + 60, 60],
    [LIGHT_X + gap + 70, 588, 200, 62],
    [LIGHT_X + gap + 290, 600, 280, 82],
    [1560, 586, 300, 90],
  ]
  const front: [number, number, number, number][] = [
    [120, 626, 380, 64],
    [460, 630, 300, 54],
    [LIGHT_X + gap + 180, 628, 300, 56],
    [1460, 632, 360, 66],
  ]
  return `
    <g filter="url(#lift)">${bank.map(([x, y, w, h], i) => cloud(x, y, w, h, 40 + i, '#e9def9', '#b8a6de')).join('')}</g>
    <g filter="url(#lift)">${front.map(([x, y, w, h], i) => cloud(x, y, w, h, 60 + i, '#fbf6ff', '#c9b9e8')).join('')}</g>`
}

/** Jerusalem on its ridge, at dusk: walls, towers, the Temple, and lamps in the windows. */
function city(): string {
  const base = 652
  const parts = [
    `<path d="M80 ${base}L80 622L96 622L96 612L108 612L108 622L470 622L470 612L482 612L482 622L500 622L500 ${base}Z"/>`,
    ...[100, 180, 260, 340, 420, 480].map((x, i) => `<rect x="${x}" y="${600 - (i % 2) * 10}" width="22" height="${base - 600 + (i % 2) * 10}"/>`),
    // The Temple, high on its mount.
    `<rect x="270" y="568" width="90" height="56"/><path d="M262 570L315 548L368 570Z"/>`,
    `<rect x="150" y="598" width="60" height="30"/><path d="M150 598C150 576 210 576 210 598Z"/>`,
  ].join('')
  const rng = createRng(12)
  const lamps = Array.from({ length: 16 }, () => `<rect x="${f(110 + rng.next() * 370)}" y="${f(606 + rng.next() * 30)}" width="4" height="6" fill="#ffd36e" opacity="${f(0.55 + rng.next() * 0.4)}"/>`).join('')
  return `<g fill="#3a3486">${parts}</g>${lamps}`
}

/** A person standing, looking up: a small paper silhouette. */
function person(x: number, ground: number, height: number, lean = 0): string {
  const head = height * 0.13
  const top = ground - height
  return `<g transform="translate(${x} ${ground}) rotate(${lean}) translate(${-x} ${-ground})">
    <circle cx="${f(x)}" cy="${f(top + head)}" r="${f(head)}"/>
    <path d="M${f(x - height * 0.17)} ${ground}L${f(x - height * 0.1)} ${f(top + head * 2.1)}C${f(x - height * 0.05)} ${f(top + head * 1.9)} ${f(x + height * 0.05)} ${f(top + head * 1.9)} ${f(x + height * 0.1)} ${f(top + head * 2.1)}L${f(x + height * 0.17)} ${ground}Z"/>
  </g>`
}

function sheep(x: number, ground: number, s: number): string {
  return `<ellipse cx="${f(x)}" cy="${f(ground - 9 * s)}" rx="${f(13 * s)}" ry="${f(8 * s)}" fill="#d9d2ea"/><ellipse cx="${f(x - 13 * s)}" cy="${f(ground - 12 * s)}" rx="${f(5 * s)}" ry="${f(4 * s)}"/><rect x="${f(x - 8 * s)}" y="${f(ground - 4 * s)}" width="${f(2.4 * s)}" height="${f(5 * s)}"/><rect x="${f(x + 5 * s)}" y="${f(ground - 4 * s)}" width="${f(2.4 * s)}" height="${f(5 * s)}"/>`
}

/** Light spreading out from the cross across the earth, to the people on it. */
function lightOnEarth(): string {
  const { x, arm } = CROSS
  const wedges = [-170, -158, -146, -34, -22, -10].map((deg, i) => {
    const a = (deg * Math.PI) / 180
    const spread = 0.05 + (i % 2) * 0.02
    const len = 1100
    return P([
      [x, arm + 20],
      [x + Math.cos(a - spread) * len, arm + 20 - Math.sin(a - spread) * len],
      [x + Math.cos(a + spread) * len, arm + 20 - Math.sin(a + spread) * len],
    ])
  })
  return `<g fill="#ffe2a0" opacity=".16" filter="url(#soft)">${wedges.map((d) => `<path d="${d}"/>`).join('')}</g>`
}

/** The cross on its hill, dark against the light, its edges catching the glory from above. */
function crossOnHill(): string {
  const { x, top, foot, arm, half, w } = CROSS
  const crest = `M${x - 290} 772C${x - 220} 724 ${x - 110} 712 ${x} ${foot - 4}C${x + 110} 712 ${x + 220} 724 ${x + 290} 772`
  return `
    <g filter="url(#lift)">
      <path d="M${x - 330} 900L${x - 290} 772C${x - 220} 724 ${x - 110} 712 ${x} ${foot - 4}C${x + 110} 712 ${x + 220} 724 ${x + 290} 772L${x + 330} 900Z" fill="#241d5c"/>
    </g>
    <ellipse cx="${x}" cy="${foot}" rx="360" ry="90" fill="url(#ground-glow)"/>
    <path d="${crest}" fill="none" stroke="#ffe2a0" stroke-opacity=".8" stroke-width="3"/>
    <circle cx="${x}" cy="${arm}" r="170" fill="url(#cross-halo)"/>
    <g filter="url(#lift)">
      <rect x="${x - w / 2}" y="${top}" width="${w}" height="${foot - top}" fill="#2c1a14"/>
      <rect x="${x - half}" y="${arm - w / 2}" width="${half * 2}" height="${w - 2}" fill="#2c1a14"/>
      <rect x="${x - w / 2}" y="${top}" width="6" height="${foot - top}" fill="#ffe2a0" opacity=".85"/>
      <rect x="${x - half}" y="${arm - w / 2}" width="${half * 2}" height="5" fill="#ffe2a0" opacity=".9"/>
    </g>`
}

export function heavenAndEarthSvg(): string {
  const W = BACKDROP_W
  const H = BACKDROP_H
  const below = GLORY.y + GLORY.r * 0.9
  const beam = (top: number, bottom: number) =>
    P([
      [GLORY.x - top, below],
      [GLORY.x + top, below],
      [CROSS.x + bottom, CROSS.foot],
      [CROSS.x - bottom, CROSS.foot],
    ])
  return `
    <defs>
      <radialGradient id="glory-halo"><stop offset="0" stop-color="#fffbe8" stop-opacity=".95"/><stop offset=".55" stop-color="#ffe7a8" stop-opacity=".45"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></radialGradient>
      <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a96"/><stop offset=".5" stop-color="#2d2672"/><stop offset="1" stop-color="#161238"/></linearGradient>
      <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity=".6"/><stop offset=".55" stop-color="#ffe2a0" stop-opacity=".38"/><stop offset="1" stop-color="#ffd98a" stop-opacity=".3"/></linearGradient>
      <radialGradient id="cross-halo"><stop offset="0" stop-color="#fff4cf" stop-opacity=".9"/><stop offset=".45" stop-color="#ffe0a0" stop-opacity=".45"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
      <radialGradient id="ground-glow"><stop offset="0" stop-color="#ffd98a" stop-opacity=".42"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
      <filter id="lift" x="-10%" y="-20%" width="120%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#0a0820" flood-opacity=".55"/></filter>
      <filter id="soft" x="-20%" y="-5%" width="140%" height="110%"><feGaussianBlur stdDeviation="14"/></filter>
      <filter id="soft-core" x="-40%" y="-5%" width="180%" height="110%"><feGaussianBlur stdDeviation="6"/></filter>
      <linearGradient id="beam-core" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".7"/><stop offset=".6" stop-color="#fff2c8" stop-opacity=".55"/><stop offset="1" stop-color="#ffe2a0" stop-opacity=".5"/></linearGradient>
      <filter id="grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="9" result="n"/>
        <feColorMatrix in="n" type="saturate" values="0" result="g"/>
        <feBlend in="SourceGraphic" in2="g" mode="multiply" result="b"/>
        <feComposite in="b" in2="SourceGraphic" operator="in"/>
      </filter>
    </defs>

    <!-- Earth's sky at dusk, behind everything below the clouds. -->
    <rect width="${W}" height="${H}" fill="url(#dusk)"/>

    <!-- Heaven: stained glass radiating from the glory. -->
    ${heavenGlass()}
    ${roseWindow()}

    <!-- The light of God's love, coming down: a wide glow, and a brighter heart. -->
    <path d="${beam(70, 240)}" fill="url(#beam)" filter="url(#soft)"/>
    <path d="${beam(24, 70)}" fill="url(#beam-core)" filter="url(#soft-core)"/>

    <!-- The clouds part to let it through. -->
    ${cloudBand()}

    <!-- Earth, in layers of paper. -->
    <g filter="url(#grain)">
      <path d="M0 900L0 650C140 616 260 626 380 640C520 612 640 622 760 650C900 616 1040 612 1180 640C1320 616 1460 622 1600 642L1600 900Z" fill="#332d7c"/>
    </g>
    <g filter="url(#lift)">
      <path d="M0 900L0 668C160 646 360 652 560 672L580 900Z" fill="#2c2672"/>
      ${city()}
      <path d="M1200 900L1220 690C1340 668 1480 664 1600 676L1600 900Z" fill="#2a2470"/>
    </g>
    ${lightOnEarth()}
    <g filter="url(#grain)">${crossOnHill()}</g>
    <g filter="url(#lift)">
      <path d="M0 900L0 772C220 736 470 740 660 772C710 790 730 830 740 900Z" fill="#17133e"/>
      <path d="M1600 900L1600 770C1520 748 1420 744 1320 776C1280 796 1265 834 1260 900Z" fill="#17133e"/>
    </g>
    <!-- Where the light falls, the hilltops are lit along their edges. -->
    <path d="M500 752C580 762 640 772 660 772C710 790 730 830 740 900" fill="none" stroke="#ffe2a0" stroke-opacity=".45" stroke-width="3"/>
    <path d="M1420 750C1370 756 1340 766 1320 776C1280 796 1265 834 1260 900" fill="none" stroke="#ffe2a0" stroke-opacity=".45" stroke-width="3"/>
    <!-- People of the earth, looking up toward the light: a family on the left, a shepherd and his flock on the right. -->
    <g fill="#0e0b28">
      ${person(590, 766, 64, 8)}
      ${person(622, 768, 44, 10)}
      ${person(546, 762, 70, 6)}
      ${person(1400, 760, 68, -7)}
      <path d="M1384 760L1366 686" stroke="#0e0b28" stroke-width="4" stroke-linecap="round"/>
      ${sheep(1440, 768, 1.2)}
      ${sheep(1478, 772, 1.05)}
      ${sheep(1350, 770, 1.1)}
    </g>`
}
