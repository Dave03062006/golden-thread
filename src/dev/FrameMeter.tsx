import { useEffect, useRef, useState } from 'react'
import { gameClock } from '../engine/clock'
import './frame-meter.css'

/**
 * A small on-screen meter for development: frames per second, and how many
 * milliseconds our own code took per frame (the budget is 8 ms). Toggle it with the
 * backquote key (`).
 */
export function FrameMeter({ initiallyVisible }: { initiallyVisible: boolean }) {
  const [visible, setVisible] = useState(initiallyVisible)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`') setVisible((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!visible) return
    const intervals: number[] = []
    const work: number[] = []
    let shownAt = 0
    const previous = gameClock.onFrame
    gameClock.onFrame = (sample) => {
      previous?.(sample)
      if (sample.intervalMs > 0) intervals.push(sample.intervalMs)
      work.push(sample.workMs)
      if (intervals.length > 60) intervals.shift()
      if (work.length > 60) work.shift()
      const now = performance.now()
      if (now - shownAt < 250 || !textRef.current) return
      shownAt = now
      const avg = intervals.reduce((a, b) => a + b, 0) / Math.max(1, intervals.length)
      const workAvg = work.reduce((a, b) => a + b, 0) / Math.max(1, work.length)
      const workMax = Math.max(...work)
      textRef.current.textContent = `${(1000 / avg).toFixed(0)} fps · work ${workAvg.toFixed(1)} ms (max ${workMax.toFixed(1)})`
    }
    return () => {
      gameClock.onFrame = previous
    }
  }, [visible])

  if (!visible) return null
  return (
    <div className="frame-meter" aria-hidden="true">
      <span ref={textRef}>measuring…</span>
    </div>
  )
}
