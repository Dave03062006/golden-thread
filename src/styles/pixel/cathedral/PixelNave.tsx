import { useEffect, useMemo, useRef } from 'react'
import { PILLAR, WINDOW, medallionCentres } from '../../../cathedral/layout'
import type { CathedralWindow, PanelState } from '../../../cathedral/model'
import { hash } from '../palette'
import { PixelBuffer } from '../buffer'
import type { NaveProps } from '../../paper-glass/cathedral/PaperNave'
import { PH, PIXEL_RING, PW, PX, drawMedallion, drawWindow } from './glass'
import './cathedral.css'

/**
 * The nave in pixel art: a pixel cathedral with pixel stained glass (spec §9.2). Each
 * window is drawn once for its state into a tiny picture and enlarged with hard pixel
 * edges; the panel being set is drawn live, its pixels dropping into place, its lead
 * tracing round, and a flash of light.
 */

const pictures = new Map<string, HTMLCanvasElement>()

function windowPicture(window: CathedralWindow, states: Record<string, PanelState>): HTMLCanvasElement {
  const key = window.level ? `${window.number}|${Object.values(states).join()}` : 'waiting'
  let picture = pictures.get(key)
  if (!picture) {
    picture = drawWindow(window, states).toCanvas()
    pictures.set(key, picture)
  }
  return picture
}

function WindowCanvas({ window, states }: { window: CathedralWindow; states: Record<string, PanelState> }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const key = Object.values(states).join()
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    canvas.width = PW
    canvas.height = PH
    canvas.getContext('2d')!.drawImage(windowPicture(window, states), 0, 0)
    // The key covers every input that changes the picture.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, window.number])
  return <canvas ref={ref} className="pixel-window-canvas" />
}

/** How long each part of a panel's setting takes, in seconds. */
const DROP = 1.4
const LEAD = 0.6
const FLASH = 0.8

function PanelSetting({ window, episode, onSet, reducedMotion }: { window: CathedralWindow; episode: string; onSet: () => void; reducedMotion: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const index = window.panels.findIndex((p) => p.episode === episode)
  const panel = window.panels[index]
  const centre = useMemo(() => {
    const c = medallionCentres(window.panels.length)[index]!
    return { x: Math.round(c.x / PX), y: Math.round(c.y / PX) }
  }, [window, index])

  useEffect(() => {
    if (reducedMotion || !panel) {
      const timer = setTimeout(onSet, 400)
      return () => clearTimeout(timer)
    }
    const canvas = ref.current!
    canvas.width = PW
    canvas.height = PH
    const ctx = canvas.getContext('2d')!
    const size = PIXEL_RING * 2 + 3
    let frame = 0
    const start = performance.now()
    const draw = (now: number) => {
      const t = (now - start) / 1000
      const buf = new PixelBuffer(PW, PH)
      // Each pixel drops in at its own moment; then the lead traces round.
      const dropped = Math.min(1, t / DROP)
      drawMedallion(buf, centre.x, centre.y, panel.emblem, true, (x, y) => hash(x * 31.7 + y * 7.3) < dropped)
      ctx.clearRect(0, 0, PW, PH)
      ctx.putImageData(new ImageData(buf.data, PW, PH), 0, 0)
      if (t > DROP && t < DROP + LEAD) {
        const around = (t - DROP) / LEAD
        ctx.fillStyle = '#1a1c2c'
        for (let a = 0; a < around * Math.PI * 2; a += 0.08) ctx.fillRect(Math.round(centre.x + Math.cos(a - Math.PI / 2) * PIXEL_RING), Math.round(centre.y + Math.sin(a - Math.PI / 2) * PIXEL_RING), 1, 1)
      }
      if (t > DROP + LEAD) {
        // The flash of light, in rings that widen and thin out.
        const k = (t - DROP - LEAD) / FLASH
        ctx.fillStyle = '#fff6d0'
        const r = PIXEL_RING * (0.6 + k * 1.6)
        for (let y = -size; y <= size; y++) {
          for (let x = -size; x <= size; x++) {
            const d = Math.hypot(x, y)
            if (d < r && d > r - 2 && hash(x * 13 + y * 7 + Math.floor(k * 6)) > k) ctx.fillRect(centre.x + x, centre.y + y, 1, 1)
          }
        }
      }
      if (t < DROP + LEAD + FLASH) frame = requestAnimationFrame(draw)
      else onSet()
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [panel, centre, onSet, reducedMotion])

  return <canvas ref={ref} className="pixel-window-canvas pixel-setting" aria-hidden="true" />
}

export function PixelNave({ layout, scale, setting, onSet, reducedMotion }: NaveProps) {
  return (
    <div className="pixel-nave" style={{ width: layout.width * scale, '--px': `${scale * PX}px` } as React.CSSProperties}>
      {layout.pillars.map((x) => (
        <div key={x} className="pixel-pillar" style={{ left: x * scale, width: PILLAR * scale }} />
      ))}
      {layout.bays.map(({ bay, windows }) =>
        windows.map(({ window: win, x: wx }) => {
          const states = Object.fromEntries(win.panels.map((p) => [p.episode, p.state]))
          const lit = win.panels.some((p) => p.state === 'lit')
          return (
            <div
              key={win.number}
              className="pixel-window"
              data-lit={lit || undefined}
              data-bay={bay.numeral}
              style={{ left: wx * scale, top: WINDOW.top * scale, width: WINDOW.w * scale, height: WINDOW.h * scale }}
            >
              <WindowCanvas window={win} states={states} />
              {setting && win.panels.some((p) => p.episode === setting) && <PanelSetting key={setting} window={win} episode={setting} onSet={onSet} reducedMotion={reducedMotion} />}
              {lit && <div className="pixel-floor-light" />}
            </div>
          )
        }),
      )}
    </div>
  )
}
