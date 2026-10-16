import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Scripture } from '../story/Line'

/**
 * Items to put in order (spec §5, "Put the events in order"). Each can be dragged by its
 * handle, with a finger or the mouse, or moved a place up or down with its buttons, which
 * keyboards and screen readers use. Once answered, each item shows whether it's in its
 * right place.
 */
export function OrderList({ items, onChange, locked, right }: { items: string[]; onChange: (items: string[]) => void; locked: boolean; right?: string[] }) {
  const list = useRef<HTMLOListElement>(null)
  const [dragging, setDragging] = useState<string | null>(null)
  const [announce, setAnnounce] = useState('')

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length || from === to) return
    const next = [...items]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item!)
    onChange(next)
    setAnnounce(`${item} moved to place ${to + 1} of ${items.length}.`)
  }

  /** While dragging, the item goes to the place under the pointer. */
  const drag = (event: ReactPointerEvent) => {
    if (!dragging || !list.current) return
    const rows = [...list.current.querySelectorAll<HTMLElement>('.quiz-order-item')]
    const to = rows.findIndex((row) => {
      const r = row.getBoundingClientRect()
      return event.clientY < r.top + r.height / 2
    })
    move(items.indexOf(dragging), to === -1 ? items.length - 1 : to)
  }

  return (
    <>
      <ol className="quiz-order-list" ref={list} onPointerMove={drag} onPointerUp={() => setDragging(null)} onPointerCancel={() => setDragging(null)}>
        {items.map((item, i) => (
          <li
            key={item}
            className="quiz-order-item"
            data-dragging={dragging === item || undefined}
            data-state={right ? (right[i] === item ? 'right' : 'wrong') : undefined}
          >
            {!locked && (
              <span
                className="quiz-order-handle"
                aria-hidden="true"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId)
                  setDragging(item)
                }}
              >
                ⠿
              </span>
            )}
            <span className="quiz-order-text">
              <Scripture text={item} />
            </span>
            {!locked && (
              <span className="quiz-order-moves">
                <button type="button" aria-label={`Move ${item} up`} disabled={i === 0} onClick={() => move(i, i - 1)}>
                  ▲
                </button>
                <button type="button" aria-label={`Move ${item} down`} disabled={i === items.length - 1} onClick={() => move(i, i + 1)}>
                  ▼
                </button>
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="visually-hidden" aria-live="polite">
        {announce}
      </p>
    </>
  )
}
