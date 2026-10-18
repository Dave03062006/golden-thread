import { useEffect, useState } from 'react'
import { ART_BASE, BACKDROP_WIDTHS, paperBackdropFile, pickSize, pixelBackdropFile } from '../../styles/bake-config'
import type { StyleId } from '../../styles/ids'
import { useReducedMotion } from '../../ui/useReducedMotion'
import './backdrop.css'

/** Small lights falling along the column, each with its own place, speed and start. */
const MOTES = Array.from({ length: 14 }, (_, i) => ({
  // Spread across the column, wider toward the bottom (as a share of the column's width).
  spread: ((i * 7) % 14) / 13 - 0.5,
  seconds: 7 + ((i * 5) % 6),
  delay: -((i * 1.37) % 9),
}))

/** How wide the picture is drawn on this screen, in device pixels: it covers the window. */
function coverWidthPx(): number {
  const w = window.innerWidth
  const h = window.innerHeight
  return Math.max(w, (h * 16) / 9) * Math.min(2, window.devicePixelRatio || 1)
}

/**
 * The picture behind the game's menus and screens (everything but the story): heaven and
 * earth, and the love of God coming down from one to the other (the art is in the
 * styles' backdrop folders). On the title and menu the light lives: it breathes, and small
 * lights fall along it to the cross. Behind the other screens it rests, dimmed, so their
 * words are easy to read.
 *
 * It's a baked picture plus a few moving elements that only change their transform and
 * opacity, which the graphics card animates on its own.
 */
export function MainBackdrop({ style, mode }: { style: StyleId; mode: 'full' | 'dim' }) {
  const [width, setWidth] = useState(() => pickSize(BACKDROP_WIDTHS, coverWidthPx()))
  const [loaded, setLoaded] = useState<string | null>(null)
  const reducedMotion = useReducedMotion()

  // A larger window may need a larger picture (never a smaller one: that one is already here).
  useEffect(() => {
    const onResize = () => setWidth((current) => Math.max(current, pickSize(BACKDROP_WIDTHS, coverWidthPx())))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const src = `${ART_BASE}/${style === 'pixel' ? pixelBackdropFile : paperBackdropFile(width)}`
  return (
    <div className="main-backdrop" data-style={style} data-mode={mode} data-still={reducedMotion || undefined} aria-hidden="true">
      <div className="main-backdrop-scene">
        <img className="main-backdrop-image" src={src} alt="" data-ready={loaded === src || undefined} onLoad={() => setLoaded(src)} draggable={false} />
        {mode === 'full' && (
          <>
            <div className="main-backdrop-glow" />
            {!reducedMotion &&
              MOTES.map((m, i) => (
                <span key={i} className="main-backdrop-mote" style={{ '--spread': m.spread, animationDuration: `${m.seconds}s`, animationDelay: `${m.delay}s` } as React.CSSProperties}>
                  <span />
                </span>
              ))}
          </>
        )}
      </div>
    </div>
  )
}
