import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../../app/store'
import { AHEAD, REGION_NAMES, levelMarkers, mapThreads, type LevelMarker } from '../../map/core/features'
import { NEAR_EAST, SEAS, projector, type LatLon } from '../../map/core/geo'
import { PaperMap } from '../../styles/paper-glass/map/PaperMap'
import { PixelMap } from '../../styles/pixel/map/PixelMap'
import './map.css'

const map = projector(NEAR_EAST)

/** A gentle curve between two places, bowing to one side like a thread laid across the map. */
function arc(from: LatLon, to: LatLon, bow: number): string {
  const a = map.point(from)
  const b = map.point(to)
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  // The control point sits off the middle, square to the line, by `bow` of its length.
  const cx = mx + (a.y - b.y) * bow
  const cy = my + (b.x - a.x) * bow
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
}

/** In the map's right half, a marker's name goes to the left of its pin, to stay on the map. */
const side = (p: LatLon) => (map.point(p).x > map.width / 2 ? 'left' : undefined)

const pct = (p: LatLon) => {
  const { x, y } = map.point(p)
  return { left: `${(x / map.width) * 100}%`, top: `${(y / map.height) * 100}%` }
}

/** The middle of a sea's outline, for its name. */
function seaCentre(outline: LatLon[]) {
  const pts = outline.map((p) => map.point(p))
  const xs = pts.map((p) => p.x)
  const ys = pts.map((p) => p.y)
  return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 }
}

/**
 * The world map (spec §9.1, §9.2), shared by both styles: the style draws the ground (a
 * paper relief, or a pixel map), and over it go the names, the route the story travels
 * (stitched in gold where it's been, faint where it goes next), the golden threads that
 * reach to a place, and a marker for each level's region that opens it.
 */
export function WorldMapView({ onChoose }: { onChoose: (marker: LevelMarker) => void }) {
  const save = useApp((s) => s.save)
  const ref = useRef<HTMLDivElement>(null)
  const [widthPx, setWidthPx] = useState(1000)
  const markers = useMemo(() => (save ? levelMarkers(save) : []), [save])
  const threads = useMemo(() => (save ? mapThreads(save) : []), [save])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(() => setWidthPx(el.clientWidth * (window.devicePixelRatio || 1)))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!save) return null
  const current = markers.find((m) => !m.finished)
  // The route: from one level's region to the next, then on to where the story goes next.
  const stops = [...markers.flatMap((m) => [{ at: m.at, done: m.finished }, ...m.route.map((p) => ({ at: p.at, done: m.finished }))]), ...AHEAD.map((a) => ({ at: a.at, done: false }))]
  const legs = stops.slice(1).map((stop, i) => ({ d: arc(stops[i]!.at, stop.at, 0.12), done: stops[i]!.done && stop.done }))

  return (
    <div ref={ref} className="world-map" style={{ aspectRatio: `${map.width} / ${map.height.toFixed(0)}` }}>
      {save.style === 'pixel' ? <PixelMap map={map} /> : <PaperMap map={map} widthPx={widthPx} />}
      <svg className="world-map-overlay" viewBox={`0 0 ${map.width} ${map.height.toFixed(0)}`} aria-hidden="true">
        {REGION_NAMES.map((r) => {
          const { x, y } = map.point(r.at)
          return (
            <text key={r.name} className="world-map-region" x={x} y={y} textAnchor="middle">
              {r.name}
            </text>
          )
        })}
        {SEAS.filter((s) => s.id !== 'dead-sea').map((s) => {
          const c = seaCentre(s.outline)
          return (
            <text key={s.id} className="world-map-sea" x={c.x} y={c.y} textAnchor="middle">
              {s.name}
            </text>
          )
        })}
        {legs.map((leg, i) => (
          <path key={i} className="world-map-route" data-done={leg.done || undefined} d={leg.d} />
        ))}
        {threads.map((t, i) => {
          const d = arc(t.from, t.to, i % 2 ? -0.18 : 0.18)
          const end = map.point(t.to)
          return (
            <g key={t.id} className="world-map-thread">
              <path className="world-map-thread-glow" d={d} />
              <path className="world-map-thread-line" d={d} />
              <path className="world-map-thread-flow" d={d} />
              <circle className="world-map-thread-end" cx={end.x} cy={end.y} r="9" />
            </g>
          )
        })}
      </svg>
      {/* The places the route passes through. */}
      {markers.flatMap((m) =>
        m.route.map((p) => (
          <span key={`${m.id}-${p.label}`} className="world-map-waypoint" style={pct(p.at)}>
            {p.label}
          </span>
        )),
      )}
      {/* The places threads reach, named once each. */}
      {[...new Map(threads.map((t) => [t.toName, t.to])).entries()].map(([name, at]) => (
        <span key={name} className="world-map-place" style={pct(at)}>
          {name}
        </span>
      ))}
      {AHEAD.map((a) => (
        <span key={a.number} className="world-map-ahead" data-side={side(a.at)} style={pct(a.at)}>
          <span className="world-map-pin" aria-hidden="true" />
          <span className="world-map-label">
            {a.label}
            <small>
              Level {a.number} · still to come
            </small>
          </span>
        </span>
      ))}
      {markers.map((m) => (
        <button key={m.id} type="button" className="world-map-marker" data-side={side(m.at)} data-current={m === current || undefined} data-finished={m.finished || undefined} style={pct(m.at)} onClick={() => onChoose(m)}>
          <span className="world-map-pin" aria-hidden="true" />
          <span className="world-map-label">
            {m.label}
            <small>
              Level {m.number} · {m.title}
            </small>
          </span>
        </button>
      ))}
    </div>
  )
}
