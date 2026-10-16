import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { gameClock } from '../engine/clock'
import { ease, progress, timing } from '../engine/motion'
import { evaluateScene, type SceneFrame } from '../scene/evaluate'
import type { SceneDescription } from '../scene/types'
import { STYLE_IDS, otherStyle, type StyleId } from '../styles/ids'
import { PaperRenderer } from '../styles/paper-glass/PaperRenderer'
import { PixelRenderer } from '../styles/pixel/PixelRenderer'
import { fitFrame } from './fitFrame'
import './stage.css'

const RENDERERS = {
  'paper-glass': PaperRenderer,
  pixel: PixelRenderer,
} as const

/**
 * Before the scene fades in, both styles are drawn for a few frames at an opacity too
 * faint to see, along with a copy of the text on top in the other style's fonts. That
 * makes the browser and graphics card do all their first-time work (preparing textures,
 * compiling shaders, setting up fonts) while the stage is still dark, instead of in the
 * middle of a style switch.
 */
const PRIME_OPACITY = 0.002
const PRIME_FRAMES = 8
/** If a style's art isn't ready by this long after the shown one, the scene starts anyway. */
const PRIME_WAIT_MS = 1500

interface StageProps {
  scene: SceneDescription
  style: StyleId
  reducedMotion: boolean
  /** The scene's clock, in seconds. Without one, the stage keeps its own, starting when it appears. */
  getTime?: () => number
  /** Where everything is at a moment: a story passes its director's frames. Without one, the scene simply plays. */
  frameAt?: (time: number) => SceneFrame
  /** Things drawn on top of the scene, like the pause button. */
  children?: ReactNode
}

interface Fade {
  from: StyleId | null
  to: StyleId
}

/**
 * The stage holds the scene's frame and gives both art styles the same scene clock.
 *
 * Both styles are mounted for the whole scene. The one not shown waits invisible and
 * paused, its art already on the graphics card, so a switch only has to start drawing
 * it and fade it in over the current one, at the very same moment of the scene.
 */
export function Stage({ scene, style, reducedMotion, getTime: externalTime, frameAt, children }: StageProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState({ width: 0, height: 0 })
  const [dpr, setDpr] = useState(() => (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1))

  // Measure the space we have, and keep measuring as the window changes.
  useLayoutEffect(() => {
    const box = boxRef.current
    if (!box) return
    const measure = () => {
      const rect = box.getBoundingClientRect()
      setFrame(fitFrame(rect.width, rect.height))
      setDpr(window.devicePixelRatio || 1)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  // The scene's own clock starts when the stage appears, unless the story keeps its own.
  const startRef = useRef(gameClock.time)
  useEffect(() => {
    startRef.current = gameClock.time
  }, [scene])
  const sources = useRef({ externalTime, frameAt, scene })
  useEffect(() => {
    sources.current = { externalTime, frameAt, scene }
  })
  const getFrame = useCallback(() => {
    const { externalTime, frameAt, scene } = sources.current
    const time = externalTime ? externalTime() : gameClock.time - startRef.current
    return frameAt ? frameAt(time) : evaluateScene(scene, time)
  }, [])

  // Which styles have their art ready, whether the first-time work is done, and the
  // fade in progress. The scene starts with a fade in from the dark backdrop.
  const [ready, setReady] = useState<StyleId[]>([])
  const [primed, setPrimed] = useState(false)
  const [fade, setFade] = useState<Fade | null>({ from: null, to: style })
  const wrappers = useRef(new Map<StyleId, HTMLDivElement>())
  const overlayRef = useRef<HTMLDivElement>(null)
  const twinRef = useRef<HTMLDivElement>(null)
  // When the current fade began, so it carries on smoothly if the effect re-runs mid-fade.
  const fadeStart = useRef<{ fade: Fade; at: number; reversing: boolean; from: number } | null>(null)

  // A new style: fade it in (React's pattern for adjusting state to a new prop).
  const [lastStyle, setLastStyle] = useState(style)
  if (style !== lastStyle) {
    setLastStyle(style)
    setFade({ from: lastStyle, to: style })
  }

  const handleReady = useCallback((which: StyleId) => {
    setReady((current) => (current.includes(which) ? current : [...current, which]))
  }, [])
  // One unchanging callback per style, so the renderers (which skip re-rendering when their
  // props are the same) aren't re-rendered by a new function every time.
  const readyCallbacks = useMemo(() => Object.fromEntries(STYLE_IDS.map((id) => [id, () => handleReady(id)])) as Record<StyleId, () => void>, [handleReady])

  // Draw every ready style faintly for a few frames, with the text copy, then hide them all again.
  const shownReady = ready.includes(style)
  const allReady = STYLE_IDS.every((id) => ready.includes(id))
  useEffect(() => {
    if (primed || !shownReady) return
    if (!allReady) {
      const timer = setTimeout(() => setPrimed(true), PRIME_WAIT_MS)
      return () => clearTimeout(timer)
    }
    const els = [...wrappers.current.values()]
    for (const el of els) el.style.opacity = String(PRIME_OPACITY)
    const twin = twinRef.current
    const overlay = overlayRef.current
    if (twin && overlay) {
      // The player's comfort settings come along, so the copy uses the very same fonts and sizes.
      Object.assign(twin.dataset, document.documentElement.dataset, { artStyle: otherStyle(style) })
      const copy = overlay.cloneNode(true) as HTMLElement
      for (const el of [copy, ...copy.querySelectorAll('[id]')]) el.removeAttribute('id')
      twin.style.opacity = String(PRIME_OPACITY)
      twin.replaceChildren(copy)
    }
    const finish = () => {
      for (const el of els) el.style.opacity = '0'
      twin?.replaceChildren()
    }
    let frames = 0
    const unsubscribe = gameClock.subscribe(
      () => {
        if (++frames < PRIME_FRAMES) return
        finish()
        setPrimed(true)
      },
      { whilePaused: true },
    )
    return () => {
      unsubscribe()
      finish()
    }
  }, [primed, shownReady, allReady, style])

  // Fade the new style in on top of the old one. Then hide the old one.
  useEffect(() => {
    if (!fade || !primed || !ready.includes(fade.to)) return
    const toEl = wrappers.current.get(fade.to)
    const fromEl = fade.from ? wrappers.current.get(fade.from) : undefined
    if (!toEl) return
    const fullSeconds = reducedMotion ? 0.25 : timing.styleSwitch.seconds
    const curve = ease[timing.styleSwitch.ease]
    return gameClock.subscribe(
      ({ realTime }) => {
        if (fadeStart.current?.fade !== fade) {
          // Switching back before the last switch finished: the style we're returning to
          // is still fully drawn underneath, so the half-faded one on top fades back out.
          // Otherwise the new style fades in on top, carrying on from wherever it is now.
          const reversing = fromEl?.style.zIndex === '2' && toEl.style.opacity === '1'
          const from = Number(reversing ? fromEl.style.opacity : toEl.style.opacity) || 0
          fadeStart.current = { fade, at: realTime, reversing, from }
          if (!reversing) {
            toEl.style.zIndex = '2'
            if (fromEl) fromEl.style.zIndex = '1'
          }
        }
        const { at, reversing, from } = fadeStart.current
        // The fade only covers the distance left to go.
        const seconds = Math.max(0.15, fullSeconds * (reversing ? from : 1 - from))
        const p = progress(at, seconds, realTime)
        if (reversing && fromEl) fromEl.style.opacity = String(from * (1 - curve(p)))
        else toEl.style.opacity = String(from + (1 - from) * curve(p))
        if (p >= 1) {
          toEl.style.zIndex = '2'
          if (fromEl) {
            fromEl.style.zIndex = '1'
            fromEl.style.opacity = '0'
          }
          setFade(null)
        }
      },
      { whilePaused: true },
    )
  }, [fade, primed, ready, reducedMotion])

  const hasSize = frame.width > 0 && frame.height > 0

  return (
    <div className="stage" ref={boxRef} data-settled={primed && !fade}>
      {hasSize && (
        <div className="stage-frame" style={{ width: frame.width, height: frame.height }}>
          {STYLE_IDS.map((which) => {
            const Renderer = RENDERERS[which]
            // A style draws while it's shown, fading out, or being primed; otherwise it waits, paused.
            const active = which === style || fade?.from === which || !primed
            return (
              <div
                key={which}
                className="stage-renderer"
                data-style={which}
                data-active={active}
                style={{ opacity: 0 }}
                ref={(el) => {
                  if (el) wrappers.current.set(which, el)
                  else wrappers.current.delete(which)
                }}
              >
                <Renderer
                  scene={scene}
                  getFrame={getFrame}
                  width={frame.width}
                  height={frame.height}
                  dpr={dpr}
                  active={active}
                  onReady={readyCallbacks[which]}
                />
              </div>
            )
          })}
          <div className="theme-twin" ref={twinRef} aria-hidden="true" inert />
          <div className="stage-overlay" ref={overlayRef}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
