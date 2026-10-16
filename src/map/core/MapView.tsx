import { useMemo } from 'react'
import { ISLANDS, NEAR_EAST, RIVERS, SEAS, projector, type LatLon, type MapFrame } from './geo'
import { EDEN, type MapRegion } from './regions'
import './map.css'

/**
 * A map of the Bible lands with places to tap (spec §5, "Where did it happen?"). The
 * drawing is for the eye and the pointer; the same places are listed as buttons beside it,
 * so keyboards and screen readers choose from the list. Tapping either selects the place.
 * After an answer, the right places are marked, and a wrong pick is too.
 */
export function MapPicker({
  targets,
  selected,
  onToggle,
  result,
  frame = NEAR_EAST,
}: {
  targets: MapRegion[]
  selected: string[]
  onToggle: (id: string) => void
  /** Once answered: the places that were right. */
  result?: { right: string[] }
  frame?: MapFrame
}) {
  const map = useMemo(() => projector(frame), [frame])
  const path = (points: LatLon[], close: boolean) =>
    points.map((p, i) => {
      const { x, y } = map.point(p)
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    }).join('') + (close ? 'Z' : '')
  const showEden = targets.some((t) => t.id.endsWith('-of-eden'))
  const eden = map.point(EDEN)
  const state = (id: string) => {
    if (result) return result.right.includes(id) ? 'right' : selected.includes(id) ? 'wrong' : undefined
    return selected.includes(id) ? 'selected' : undefined
  }

  return (
    <div className="map-picker">
      <svg className="map-view" viewBox={`0 0 ${map.width} ${map.height.toFixed(0)}`} aria-hidden="true">
        <rect className="map-land" width={map.width} height={map.height} />
        {SEAS.map((sea) => (
          <path key={sea.id} className="map-sea" d={path(sea.outline, true)} />
        ))}
        {ISLANDS.map((island, i) => (
          <path key={i} className="map-land" d={path(island, true)} />
        ))}
        {targets
          .filter((t) => t.kind === 'area')
          .map((t) => (
            <path key={t.id} className="map-area" data-state={state(t.id)} d={path(t.shape, true)} onClick={() => !result && onToggle(t.id)} />
          ))}
        {RIVERS.map((river) => {
          const target = targets.find((t) => t.id === river.id)
          const d = path(river.course, false)
          return (
            <g key={river.id} className="map-river" data-target={target ? '' : undefined} data-state={target ? state(river.id) : undefined}>
              <path className="map-river-line" d={d} />
              {target && <path className="map-river-hit" d={d} onClick={() => !result && onToggle(river.id)} />}
            </g>
          )
        })}
        {showEden && (
          <g className="map-eden">
            <circle cx={eden.x} cy={eden.y} r="18" />
            <text x={eden.x} y={eden.y - 26} textAnchor="middle">
              Eden?
            </text>
          </g>
        )}
        {SEAS.filter((s) => s.id !== 'dead-sea').map((sea) => {
          const c = centre(sea.outline.map((p) => map.point(p)))
          return (
            <text key={sea.id} className="map-sea-label" x={c.x} y={c.y} textAnchor="middle">
              {sea.name}
            </text>
          )
        })}
      </svg>
      <fieldset className="map-choices">
        <legend className="visually-hidden">Places on the map</legend>
        {targets.map((t) => (
          <button key={t.id} type="button" className="map-choice" aria-pressed={selected.includes(t.id)} data-state={state(t.id)} disabled={!!result} onClick={() => onToggle(t.id)}>
            {t.name}
          </button>
        ))}
      </fieldset>
    </div>
  )
}

/** The middle of a shape's points, for its label. */
function centre(points: { x: number; y: number }[]) {
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 }
}
