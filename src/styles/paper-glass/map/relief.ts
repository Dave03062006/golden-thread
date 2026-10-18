import { ARARAT, MOUNTAINS } from '../../../map/core/features'
import { ISLANDS, RIVERS, SEAS, type LatLon, type Projector } from '../../../map/core/geo'
import { createRng } from '../../../engine/random'

/**
 * The world map in Paper & Glass (spec §9.1): a layered paper relief of the Bible lands.
 * The land is cut from paper and casts a soft shadow on the blue paper of the seas,
 * mountains are cut-out peaks, rivers are satin ribbons. It's drawn once into a picture;
 * the names, markers, route and golden threads go on top of it (a picture drawn from SVG
 * can't use the page's fonts).
 */

const path = (map: Projector, points: LatLon[], close: boolean) =>
  points
    .map((p, i) => {
      const { x, y } = map.point(p)
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join('') + (close ? 'Z' : '')

/** A cut-out peak: a lit face and a shaded one, with a cap of snow on the tallest. */
function peak(x: number, y: number, size: number, snow: boolean): string {
  const h = size * 1.15
  return `
    <path d="M${x - size} ${y}L${x} ${y - h}L${x + size} ${y}Z" fill="#b89a6e"/>
    <path d="M${x} ${y - h}L${x + size} ${y}L${x + size * 0.15} ${y}Z" fill="#8a6e4a"/>
    ${snow ? `<path d="M${x - size * 0.32} ${y - h * 0.68}L${x} ${y - h}L${x + size * 0.32} ${y - h * 0.68}L${x + size * 0.1} ${y - h * 0.6}L${x - size * 0.1} ${y - h * 0.72}Z" fill="#fbf6ea"/>` : ''}`
}

export function reliefSvg(map: Projector): string {
  const W = map.width
  const H = map.height
  const rng = createRng(31)
  // The land: the whole frame with the seas cut out of it.
  const land = `M0 0H${W}V${H}H0Z ${SEAS.map((s) => path(map, s.outline, true)).join(' ')}`
  const islands = ISLANDS.map((i) => path(map, i, true)).join(' ')

  // Stippled sand across the deserts of Arabia and Egypt.
  let sand = ''
  for (let i = 0; i < 520; i++) {
    const lat = 23 + rng.next() * 7.5
    const lon = 28 + rng.next() * 22
    if (lon > 32 && lon < 38.6 && lat > 23) continue
    const { x, y } = map.point({ lat, lon })
    sand += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(0.9 + rng.next() * 1.2).toFixed(1)}"/>`
  }

  const peaks = MOUNTAINS.flatMap((range) => range.peaks.map((p) => ({ ...map.point(p), size: 14 + rng.next() * 6 })))
  const ararat = map.point(ARARAT)

  const rivers = RIVERS.map((r) => {
    const d = path(map, r.course, false)
    return `<path d="${d}" stroke="#4a86b8" stroke-width="7"/><path d="${d}" stroke="url(#satin)" stroke-width="4.5"/><path d="${d}" stroke="#eaf6ff" stroke-width="1.1" opacity=".8"/>`
  }).join('')

  return `
    <defs>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ac4d8"/><stop offset="1" stop-color="#6e9fbe"/></linearGradient>
      <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efe0bc"/><stop offset=".6" stop-color="#e4d0a4"/><stop offset="1" stop-color="#d8c08e"/></linearGradient>
      <linearGradient id="satin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7ab8e0"/><stop offset=".5" stop-color="#bfe4fa"/><stop offset="1" stop-color="#6aa6d0"/></linearGradient>
      <filter id="lift" x="-5%" y="-5%" width="110%" height="110%"><feDropShadow dx="3" dy="5" stdDeviation="5" flood-color="#1c2a40" flood-opacity=".45"/></filter>
      <filter id="grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="4" result="n"/>
        <feColorMatrix in="n" type="saturate" values="0" result="g"/>
        <feBlend in="SourceGraphic" in2="g" mode="multiply" result="b"/>
        <feComposite in="b" in2="SourceGraphic" operator="in"/>
      </filter>
      <pattern id="waves" width="40" height="18" patternUnits="userSpaceOnUse"><path d="M0 10Q10 4 20 10T40 10" fill="none" stroke="#ffffff" stroke-opacity=".22" stroke-width="1.4"/></pattern>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#sea)"/>
    <rect width="${W}" height="${H}" fill="url(#waves)"/>
    <g filter="url(#lift)">
      <path d="${land}" fill-rule="evenodd" fill="url(#paper)"/>
      <path d="${islands}" fill="url(#paper)"/>
    </g>
    <g filter="url(#grain)"><path d="${land}" fill-rule="evenodd" fill="#e8d6aa" opacity=".35"/></g>
    <g fill="#c8a870" opacity=".55">${sand}</g>
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">${rivers}</g>
    <g filter="url(#lift)">${peaks.map((p) => peak(p.x, p.y, p.size, false)).join('')}${peak(ararat.x - 12, ararat.y + 8, 30, true)}${peak(ararat.x + 20, ararat.y + 12, 18, true)}</g>
`
}
