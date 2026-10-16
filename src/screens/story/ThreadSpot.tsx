import { useEffect, useRef, useState, type RefObject } from 'react'
import { gameClock } from '../../engine/clock'
import { projectPoint, type SceneFrame } from '../../scene/evaluate'

/**
 * Where a golden thread can be found: something in the scene glows, and this button sits
 * over it (spec §3.2, step 4). It's a real button, so it can be reached with the keyboard
 * and is announced by screen readers. It follows the glowing thing as the camera moves.
 */
export function ThreadSpot({
  lastFrame,
  actorId,
  enabled,
  onFind,
}: {
  lastFrame: RefObject<SceneFrame | null>
  actorId: string
  enabled: boolean
  onFind: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Unknown at first, so the first frame always sets it: when the spot is turned off
    // (an interaction begins), a ring still showing must be hidden.
    let shown: boolean | null = null
    return gameClock.subscribe(
      () => {
        const frame = lastFrame.current
        const actor = frame?.actors.find((a) => a.id === actorId)
        const show = enabled && !!actor && actor.opacity > 0.6
        if (show !== shown) {
          shown = show
          setVisible(show)
        }
        const button = ref.current
        if (!show || !button || !frame || !actor) return
        const p = projectPoint(actor.x, actor.y, actor.depth, frame.camera)
        button.style.left = `${(p.x * 100).toFixed(3)}%`
        button.style.top = `${(p.y * 100).toFixed(3)}%`
      },
      { whilePaused: true },
    )
  }, [lastFrame, actorId, enabled])

  return (
    <button ref={ref} type="button" className="thread-spot" hidden={!visible} onClick={onFind} aria-label="Something here is glowing. Look closer.">
      <span className="thread-spot-ring" aria-hidden="true" />
    </button>
  )
}
