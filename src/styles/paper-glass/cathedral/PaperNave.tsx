import { useEffect, useMemo, useState } from 'react'
import { PILLAR, WINDOW, type NaveLayout } from '../../../cathedral/layout'
import type { CathedralWindow, PanelState } from '../../../cathedral/model'
import { createRng } from '../../../engine/random'
import { rasterize } from '../raster'
import { DISC, RING, tone, windowArt, windowSvg, type WindowArt } from './glass'
import './cathedral.css'

/**
 * The nave in Paper & Glass: dark stone, pillars, and the windows. Each window's glass is
 * drawn once into a picture for its state and kept (spec §13.5, "cached glass"), so the
 * nave scrolls as smoothly as any image. The one panel being set is drawn live on top,
 * its pieces drifting in, its lead drawing itself, light flooding through.
 */

export interface NaveProps {
  layout: NaveLayout
  /** Screen pixels per nave unit. */
  scale: number
  /** The episode whose panel is being set right now, if any. */
  setting: string | null
  /** Called when that panel's setting has finished. */
  onSet: () => void
  reducedMotion: boolean
}

/** Every window's seed, so its glass is the same every time. */
const seedOf = (w: CathedralWindow) => 1000 + w.number * 37

const pictures = new Map<string, Promise<string>>()

/** Every window's glass pieces, worked out once: they never change, only which are lit. */
const arts = new Map<number, WindowArt>()
function artOf(window: CathedralWindow): WindowArt {
  let art = arts.get(window.number)
  if (!art) {
    art = windowArt(window, seedOf(window))
    arts.set(window.number, art)
  }
  return art
}

/** A window's glass as a picture, made once for each state and size. */
function windowPicture(window: CathedralWindow, art: WindowArt, states: Record<string, PanelState>, widthPx: number): Promise<string> {
  const built = !!window.level
  const key = built ? `${window.number}|${Object.values(states).join()}|${widthPx}` : `waiting|${widthPx}`
  let picture = pictures.get(key)
  if (!picture) {
    const heightPx = Math.round((widthPx * art.height) / art.width)
    picture = rasterize(windowSvg(art, states, built), { x: -10, y: -10, w: art.width + 20, h: art.height + 20 }, { widthPx, heightPx, shadowPx: 0 }).then(
      (canvas) => new Promise<string>((resolve) => canvas.toBlob((blob) => resolve(URL.createObjectURL(blob!)), 'image/png')),
    )
    pictures.set(key, picture)
  }
  return picture
}

/** The window as an image; while a new state is being drawn, the previous one stays. */
function WindowImage({ window, art, states, widthPx }: { window: CathedralWindow; art: WindowArt; states: Record<string, PanelState>; widthPx: number }) {
  const [url, setUrl] = useState<string | null>(null)
  const key = `${Object.values(states).join()}|${widthPx}`
  useEffect(() => {
    let live = true
    void windowPicture(window, art, states, widthPx).then((u) => live && setUrl(u))
    return () => {
      live = false
    }
    // The key covers every input that changes the picture.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return url ? <img className="glass-window-image" src={url} alt="" draggable={false} /> : <div className="glass-window-image glass-window-loading" />
}

/** A panel being set: its pieces drift in, the lead lines draw themselves, light floods through. */
function PanelSetting({ art, episode, onSet, reducedMotion }: { art: WindowArt; episode: string; onSet: () => void; reducedMotion: boolean }) {
  const medallion = art.medallions.find((m) => m.episode === episode)
  const pieces = useMemo(() => {
    const rng = createRng(episode.length * 991)
    return (medallion?.glass ?? []).map((p, i) => ({ ...p, dx: (rng.next() - 0.5) * 70, dy: (rng.next() - 0.5) * 70 - 30, rot: (rng.next() - 0.5) * 160, delay: i * 0.02 }))
  }, [medallion, episode])

  useEffect(() => {
    if (!reducedMotion) return
    const timer = setTimeout(onSet, 400)
    return () => clearTimeout(timer)
  }, [reducedMotion, onSet])

  if (!medallion) return null
  return (
    <svg className="glass-setting" viewBox={`-10 -10 ${art.width + 20} ${art.height + 20}`} aria-hidden="true" data-reduced={reducedMotion || undefined}>
      <defs>
        <clipPath id={`set-disc-${episode}`}>
          <circle r={DISC} />
        </clipPath>
        <radialGradient id={`set-flood-${episode}`}>
          <stop offset="0" stopColor="#fffbe8" stopOpacity="1" />
          <stop offset=".5" stopColor="#ffe9b0" stopOpacity=".5" />
          <stop offset="1" stopColor="#ffe9b0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform={`translate(${medallion.cx} ${medallion.cy})`}>
        <circle className="set-ring" r={RING} fill={tone('#9e1b32', true)} />
        <g clipPath={`url(#set-disc-${episode})`}>
          {pieces.map((p, i) => (
            <path
              key={i}
              className="set-piece"
              d={p.d}
              fill={p.color}
              style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--rot': `${p.rot}deg`, '--delay': `${p.delay}s` } as React.CSSProperties}
            />
          ))}
          <g className="set-leads">
            {pieces.map((p, i) => (
              <path key={i} d={p.d} pathLength={1} />
            ))}
          </g>
        </g>
        <circle className="set-rim" r={DISC} pathLength={1} />
        <circle className="set-rim" r={RING} pathLength={1} />
        <circle className="set-flood" r={RING * 3} fill={`url(#set-flood-${episode})`} onAnimationEnd={onSet} />
      </g>
    </svg>
  )
}

export function PaperNave({ layout, scale, setting, onSet, reducedMotion }: NaveProps) {
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  const widthPx = Math.round(WINDOW.w * scale * dpr)

  return (
    <div className="glass-nave" style={{ width: layout.width * scale }}>
      {layout.pillars.map((x) => (
        <div key={x} className="glass-pillar" style={{ left: x * scale, width: PILLAR * scale }} />
      ))}
      {layout.bays.map(({ bay, x, w, windows }) => (
        <div key={bay.numeral} className="glass-bay" style={{ left: x * scale, width: w * scale }} data-built={windows.some((pw) => pw.window.level) || undefined}>
          {windows.map(({ window: win, x: wx }) => {
            const art = artOf(win)
            const states = Object.fromEntries(win.panels.map((p) => [p.episode, p.state]))
            const lit = win.panels.some((p) => p.state === 'lit')
            return (
              <div
                key={win.number}
                className="glass-window"
                data-lit={lit || undefined}
                style={{ left: (wx - x) * scale, top: WINDOW.top * scale, width: WINDOW.w * scale, height: WINDOW.h * scale }}
              >
                <WindowImage window={win} art={art} states={states} widthPx={widthPx} />
                {setting && win.panels.some((p) => p.episode === setting) && <PanelSetting key={setting} art={art} episode={setting} onSet={onSet} reducedMotion={reducedMotion} />}
                {lit && <div className="glass-floor-light" />}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
