import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gameClock } from '../../engine/clock'
import { layerTransform, projectPoint, type ActorState } from '../../scene/evaluate'
import type { RendererProps } from '../../stage/types'
import { LAYER_H, LAYER_W, MARGIN_X, MARGIN_Y, PX_H, PX_W, pixelLayers, pixelProps } from './art'
import { FADE_STEPS, fadeStep, fadedCopy } from './dither-fade'
import { drawnPicture } from './drawn-cache'
import { painterAt } from './painter'
import { preparePixelScene, type PreparedPixelScene } from './prepare'
import { pixelScale } from './scale'
import './pixel.css'

/** A single actor is drawn as a group of one, right at its place. */
const ALONE = [{ dx: 0, dy: 0, scale: 1, phase: 0 }]

/**
 * Draws a scene in pixel art. The art stays on its pixel grid, but layers and sprites
 * are placed in whole screen pixels rather than whole art pixels. That is the "smooth
 * pixel camera": slow pans glide instead of stepping (spec §10, rule 7).
 * Pixel art doesn't zoom, since that would break the grid; the camera only pans. Things
 * fade by dithering, so every pixel on screen stays a palette color.
 */
export const PixelRenderer = memo(function PixelRenderer({ scene, getFrame, width, height, dpr, active, onReady }: RendererProps) {
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

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !art) return
    // Resizing a canvas clears it, so only do it when the size really changed.
    if (canvas.width !== PX_W * scale) canvas.width = PX_W * scale
    if (canvas.height !== PX_H * scale) canvas.height = PX_H * scale

    const drawActor = (actor: ActorState, camera: { x: number; y: number; zoom: number }) => {
      const def = pixelProps[actor.prop]
      if (!def || actor.opacity <= 0.001 || actor.grow <= 0.001) return
      const pose = actor.poseBlend >= 0.5 ? actor.pose : actor.previousPose
      for (const member of actor.instances ?? ALONE) {
        const p = projectPoint(actor.x + member.dx, actor.y + member.dy, actor.depth, camera)
        // The anchor point, in whole screen pixels.
        const ax = Math.round(p.x * PX_W * scale)
        const ay = Math.round(p.y * PX_H * scale)
        const time = actor.time + member.phase * 7.3

        if (def.kind === 'drawn') {
          const look = { time, grow: actor.grow, facing: actor.facing, pose, width: actor.size * member.scale * PX_W }
          if (def.live) {
            const clip = { left: -ax / scale, right: (canvas.width - ax) / scale, top: -ay / scale, bottom: (canvas.height - ay) / scale }
            def.draw(painterAt(ctx, ax, ay, scale, actor.opacity), { ...look, clip })
            continue
          }
          const picture = drawnPicture(actor.prop, def, look)
          const image = fadedCopy(picture.canvas, fadeStep(actor.opacity))
          ctx.drawImage(image, ax - picture.anchorX * scale, ay - picture.anchorY * scale, picture.canvas.width * scale, picture.canvas.height * scale)
          continue
        }

        const poses = art.sprites.get(actor.prop)
        const frames = poses?.get(pose) ?? poses?.get('idle')
        if (!frames) continue
        const list = actor.facing === 1 ? frames.right : frames.left
        const sprite = list[Math.floor(time * frames.fps) % list.length]
        if (!sprite) continue
        const w = sprite.width * scale
        const h = sprite.height * scale
        const x = ax - Math.round(sprite.width / 2) * scale
        const y = def.anchor === 'base' ? ay - h : ay - Math.round(sprite.height / 2) * scale
        const image = fadedCopy(sprite, fadeStep(actor.opacity))
        if (actor.grow >= 0.999) {
          ctx.drawImage(image, x, y, w, h)
        } else {
          // Growing things rise from their base.
          const rows = Math.max(1, Math.round(sprite.height * actor.grow))
          ctx.drawImage(image, 0, sprite.height - rows, sprite.width, rows, x, y + (sprite.height - rows) * scale, w, rows * scale)
        }
      }
    }

    const draw = () => {
      const frame = getFrame()
      const camera = { x: frame.camera.x, y: frame.camera.y, zoom: 1 }
      ctx.imageSmoothingEnabled = false
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const layer of frame.layers) {
        const step = fadeStep(layer.opacity)
        if (step > 0) {
          const t = layerTransform(layer.depth, camera, layer.swayX)
          // The layer's top-left corner, in whole screen pixels.
          const left = Math.round((t.dx * PX_W - MARGIN_X) * scale)
          const top = Math.round(((t.dy + layer.offsetY) * PX_H - MARGIN_Y) * scale)
          const image = art.layers.get(layer.id)
          if (image) ctx.drawImage(step >= FADE_STEPS ? image : fadedCopy(image as HTMLCanvasElement, step), left, top, LAYER_W * scale, LAYER_H * scale)
          const animate = pixelLayers[layer.id]?.animate
          if (animate) animate(painterAt(ctx, left, top, scale, layer.opacity), frame.time)
        }
        for (const actor of frame.actors) if (actor.above === layer.id) drawActor(actor, camera)
      }
    }

    draw()
    onReadyRef.current?.()
    if (!active) return
    return gameClock.subscribe(draw)
  }, [scene, getFrame, art, scale, active])

  return (
    <div className="pixel-frame" style={{ width, height }}>
      <canvas
        ref={canvasRef}
        className="pixel-canvas"
        style={{ width: (PX_W * scale) / dpr, height: (PX_H * scale) / dpr }}
      />
    </div>
  )
})
