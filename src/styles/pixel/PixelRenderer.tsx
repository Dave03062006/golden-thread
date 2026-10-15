import { useEffect, useRef, useState } from 'react'
import { gameClock } from '../../engine/clock'
import { evaluateScene, layerTransform } from '../../scene/evaluate'
import type { RendererProps } from '../../stage/types'
import { LAYER_H, LAYER_W, MARGIN_X, MARGIN_Y, PX_H, PX_W, pixelLayers, pixelProps, type Painter } from './art'
import { preparePixelScene, type PreparedPixelScene } from './prepare'
import { pixelScale } from './scale'
import './pixel.css'

/**
 * Draws a scene in pixel art. The art stays on its pixel grid, but layers and sprites
 * are placed in whole screen pixels rather than whole art pixels. That is the "smooth
 * pixel camera": slow pans glide instead of stepping (spec §10, rule 7).
 * Pixel art doesn't zoom, since that would break the grid; the camera only pans.
 */
export function PixelRenderer({ scene, getTime, width, height, dpr, active, onReady }: RendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scale = pixelScale(width, height, dpr)

  // Each layer's still art and every sprite frame, prepared once and kept (see prepare.ts).
  const [art, setArt] = useState<PreparedPixelScene | null>(null)
  useEffect(() => {
    let current = true
    preparePixelScene(scene).then((prepared) => {
      if (current) setArt(prepared)
    })
    return () => {
      current = false
    }
  }, [scene])

  const onReadyRef = useRef(onReady)
  useEffect(() => {
    onReadyRef.current = onReady
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !art) return
    // Resizing a canvas clears it, so only do it when the size really changed.
    if (canvas.width !== PX_W * scale) canvas.width = PX_W * scale
    if (canvas.height !== PX_H * scale) canvas.height = PX_H * scale

    const draw = () => {
      const time = getTime()
      const frame = evaluateScene(scene, time)
      const camera = { x: frame.camera.x, y: frame.camera.y, zoom: 1 }
      ctx.imageSmoothingEnabled = false
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const layer of frame.layers) {
        const image = art.layers.get(layer.id)
        const t = layerTransform(layer.depth, camera, layer.swayX)
        // The layer's top-left corner, in whole screen pixels.
        const left = Math.round((t.dx * PX_W - MARGIN_X) * scale)
        const top = Math.round((t.dy * PX_H - MARGIN_Y) * scale)
        if (image) ctx.drawImage(image, left, top, LAYER_W * scale, LAYER_H * scale)

        const animate = pixelLayers[layer.id]?.animate
        if (animate) {
          const paint: Painter = {
            rect(x, y, w, h, color) {
              ctx.fillStyle = color
              ctx.fillRect(left + Math.round(x) * scale, top + Math.round(y) * scale, w * scale, h * scale)
            },
          }
          animate(paint, time)
        }

        for (const actor of frame.actors) {
          if (actor.above !== layer.id) continue
          const def = pixelProps[actor.prop]
          const frames = art.sprites.get(actor.prop)
          if (!def || !frames) continue
          const list = actor.facing === 1 ? frames.right : frames.left
          const sprite = list[Math.floor(actor.time * def.fps) % list.length]
          if (!sprite) continue
          const at = layerTransform(actor.depth, camera)
          const x = (actor.x + at.dx) * PX_W - sprite.width / 2
          const y = (actor.y + at.dy) * PX_H - sprite.height / 2
          ctx.drawImage(sprite, Math.round(x * scale), Math.round(y * scale), sprite.width * scale, sprite.height * scale)
        }
      }
    }

    draw()
    onReadyRef.current?.()
    if (!active) return
    return gameClock.subscribe(draw)
  }, [scene, getTime, art, scale, active])

  return (
    <div className="pixel-frame" style={{ width, height }}>
      <canvas
        ref={canvasRef}
        className="pixel-canvas"
        style={{ width: (PX_W * scale) / dpr, height: (PX_H * scale) / dpr }}
      />
    </div>
  )
}
