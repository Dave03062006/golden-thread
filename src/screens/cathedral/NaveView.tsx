import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { useApp } from '../../app/store'
import { NAVE_H, WINDOW, bayTarget, layNave, medallionAt, medallionCentres, threadPath, threadPoints, type NaveLayout } from '../../cathedral/layout'
import { nave, panelsToSet, threadLines, type Bay, type CathedralWindow, type Panel } from '../../cathedral/model'
import { PaperNave } from '../../styles/paper-glass/cathedral/PaperNave'
import { PixelNave } from '../../styles/pixel/cathedral/PixelNave'
import './cathedral.css'

export interface NaveHandle {
  /** Scrolls so an Age's bay is in view. */
  showAge(numeral: string, smooth?: boolean): void
  /** Flies the view into a medallion (for "Step inside"), then calls `then`. */
  flyInto(episode: string, then: () => void): void
}

/**
 * A bead of light travelling a thread, brightening as it sets off and fading as it arrives.
 * It moves by plain movement from point to point along the curve, which the browser can
 * animate on its own without redrawing anything (spec §10).
 */
function ThreadBead({ points, seconds, start }: { points: { x: number; y: number; along: number }[]; seconds: number; start: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof el.animate !== 'function') return
    const keyframes = points.map((p) => ({
      offset: p.along,
      transform: `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`,
      opacity: p.along === 0 || p.along === 1 ? 0 : Math.min(1, p.along / 0.08, (1 - p.along) / 0.08),
    }))
    const animation = el.animate(keyframes, { duration: seconds * 1000, iterations: Infinity, delay: -start * seconds * 1000 })
    return () => animation.cancel()
  }, [points, seconds, start])
  return <span ref={ref} className="nave-thread-bead" />
}

/**
 * The nave as the player sees it, in either art style: the glass (drawn by the style),
 * and over it what both share: the names of the Ages and windows, the golden threads, and
 * a real button over every medallion, so it can be reached by keyboard and screen reader.
 * Panels waiting to be set are set one after another, each with its animation.
 */
// Kept from re-rendering when only the screen around it changes (like the Age chosen).
export const NaveView = memo(
  forwardRef<
    NaveHandle,
    {
      bays?: Bay[]
      onChoose: (window: CathedralWindow, panel?: Panel) => void
      onAllSet?: () => void
      label: string
    }
  >(function NaveView({ bays: onlyBays, onChoose, onAllSet, label }, ref) {
    const save = useApp((s) => s.save)!
    const changeSave = useApp((s) => s.changeSave)
    const commit = useApp((s) => s.commit)
    const reducedMotion = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    const viewport = useRef<HTMLElement>(null)
    const [scale, setScale] = useState(1)
    const [flying, setFlying] = useState<{ x: number; y: number } | null>(null)

    const allBays = useMemo(() => nave(save), [save])
    const bays = useMemo(() => onlyBays ?? allBays, [onlyBays, allBays])
    const layout: NaveLayout = useMemo(() => layNave(bays), [bays])
    const threads = useMemo(() => threadLines(save), [save])
    // The whole nave's layout, to aim threads at Ages beyond the bays shown.
    const fullLayout = useMemo(() => (onlyBays ? layNave(allBays) : layout), [onlyBays, allBays, layout])

    // The nave fills the viewport's height.
    useLayoutEffect(() => {
      const el = viewport.current
      if (!el) return
      const fit = () => setScale(el.clientHeight / NAVE_H)
      fit()
      const observer = new ResizeObserver(fit)
      observer.observe(el)
      return () => observer.disconnect()
    }, [])

    // Panels waiting to be set, one at a time.
    const waiting = useMemo(() => panelsToSet(save).filter((e) => layout.bays.some((b) => b.windows.some((w) => w.window.panels.some((p) => p.episode === e)))), [save, layout])
    const setting = waiting[0] ?? null
    const onSet = useCallback(() => {
      const now = useApp.getState().save
      if (!now || !setting || now.panelsSet.includes(setting)) return
      changeSave({ panelsSet: [...now.panelsSet, setting] })
      void commit()
    }, [setting, changeSave, commit])
    const announced = useRef(false)
    useEffect(() => {
      if (!setting && !announced.current) {
        announced.current = true
        onAllSet?.()
      }
    }, [setting, onAllSet])

    useImperativeHandle(ref, () => ({
      showAge(numeral, smooth = true) {
        const bay = layout.bays.find((b) => b.bay.numeral === numeral)
        const el = viewport.current
        if (!bay || !el) return
        el.scrollTo({
          left: Math.max(0, (bay.x + bay.w / 2) * scale - el.clientWidth / 2),
          behavior: smooth && !reducedMotion ? 'smooth' : 'auto',
        })
      },
      flyInto(episode, then) {
        const at = medallionAt(layout, episode)
        if (!at || reducedMotion) return then()
        setFlying(at)
        setTimeout(then, 1100)
      },
    }))

    // While a panel is being set, it's kept in view.
    useEffect(() => {
      if (!setting) return
      const at = medallionAt(layout, setting)
      const el = viewport.current
      if (at && el)
        el.scrollTo({
          left: Math.max(0, at.x * scale - el.clientWidth / 2),
          behavior: reducedMotion ? 'auto' : 'smooth',
        })
    }, [setting, layout, scale, reducedMotion])

    const Glass = save.style === 'pixel' ? PixelNave : PaperNave
    // Kept between renders, so the beads travelling the threads aren't restarted.
    const threadPaths = useMemo(
      () =>
        threads.flatMap((t) => {
          const from = medallionAt(layout, t.episode)
          const target = bayTarget(fullLayout, t.toAge)
          if (!from || !target) return []
          // Beyond the bays shown, the thread runs off toward its Age.
          const to = onlyBays ? { x: Math.min(target.x, layout.width + 40), y: target.y } : target
          const points = threadPoints(from, to)
          const length = points.reduce((sum, p, i) => sum + (i ? Math.hypot(p.x - points[i - 1]!.x, p.y - points[i - 1]!.y) : 0), 0)
          return [{ id: t.id, reached: t.reached, d: threadPath(from, to), to, points, length }]
        }),
      [threads, layout, fullLayout, onlyBays],
    )

    return (
      // The nave scrolls sideways, so the keyboard can focus it and scroll with the arrow keys.
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a scrolling region must be focusable
      <section className="nave-viewport" ref={viewport} aria-label={label} tabIndex={0}>
        <div
          className="nave-content"
          data-flying={flying ? '' : undefined}
          style={{
            width: layout.width * scale,
            ...(flying
              ? {
                  transformOrigin: `${flying.x * scale}px ${flying.y * scale}px`,
                }
              : {}),
          }}
        >
          <Glass layout={layout} scale={scale} setting={setting} onSet={onSet} reducedMotion={reducedMotion} />

          {/* The threads: a still glow and line, and over them, as small elements of their
              own, beads of light travelling along each one and a glimmer where it points
              ahead. Moving those repaints only them, never the glass beneath. */}
          <svg className="nave-threads" viewBox={`0 0 ${layout.width} ${NAVE_H}`} width={layout.width * scale} height={NAVE_H * scale} aria-hidden="true">
            {threadPaths.map(({ id, d }) => (
              <g key={id} className="nave-thread">
                <path className="nave-thread-glow" d={d} />
                <path className="nave-thread-line" d={d} />
              </g>
            ))}
          </svg>
          <div className="nave-thread-lights" style={{ width: layout.width, height: NAVE_H, transform: `scale(${scale})` }} aria-hidden="true">
            {threadPaths.flatMap(({ id, points, length, reached, to }) => {
              // A bead to every 700 units of thread or so, all moving at the same pace.
              const seconds = length / 150
              const beads = Math.max(2, Math.round(length / 700))
              return [
                ...(reducedMotion ? [] : Array.from({ length: beads }, (_, i) => <ThreadBead key={`${id}-${i}`} points={points} seconds={seconds} start={i / beads} />)),
                ...(!reached && !onlyBays ? [<span key={`${id}-glimmer`} className="nave-thread-glimmer" style={{ left: to.x, top: to.y }} />] : []),
              ]
            })}
          </div>

          {layout.bays.map(({ bay, x, w }) => (
            <div key={bay.numeral} className="nave-bay-label" style={{ left: x * scale, width: w * scale }}>
              <span>Age {bay.numeral}</span> {bay.title}
            </div>
          ))}

          {layout.bays.flatMap(({ windows }) =>
            windows.map(({ window: win, x }) => (
              <div
                key={win.number}
                className="nave-window"
                style={{
                  left: x * scale,
                  top: WINDOW.top * scale,
                  width: WINDOW.w * scale,
                  height: WINDOW.h * scale,
                }}
              >
                {win.level &&
                  win.panels.map((panel, i) => {
                    const c = medallionCentres(win.panels.length)[i]!
                    return (
                      <button
                        key={panel.episode}
                        type="button"
                        className="nave-medallion"
                        data-state={panel.state}
                        style={{
                          left: `${(c.x / WINDOW.w) * 100}%`,
                          top: `${(c.y / WINDOW.h) * 100}%`,
                        }}
                        aria-label={`Episode ${i + 1}, ${panel.title}: ${panel.state === 'dark' ? 'not set yet' : 'set'}`}
                        onClick={() => onChoose(win, panel)}
                      />
                    )
                  })}
                <button type="button" className="nave-window-label" onClick={() => onChoose(win)}>
                  Level {win.number} · {win.title}
                </button>
              </div>
            )),
          )}
        </div>
        {flying && <div className="nave-fly-light" aria-hidden="true" />}
      </section>
    )
  }),
)
