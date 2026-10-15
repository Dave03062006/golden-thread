import { useEffect, useRef } from 'react'
import { gameClock } from '../../engine/clock'
import { evaluateScene, layerTransform, projectPoint } from '../../scene/evaluate'
import type { RendererProps } from '../../stage/types'
import { FRAME_H, FRAME_W, paperLayers, paperProps, partPose, type Box } from './art'
import { preparePaperScene } from './prepare'
import './paper.css'

/** Where an element covering `bounds` sits inside the frame, and the point it scales around. */
function placement(bounds: Box) {
  return {
    left: `${(bounds.x / FRAME_W) * 100}%`,
    top: `${(bounds.y / FRAME_H) * 100}%`,
    width: `${(bounds.w / FRAME_W) * 100}%`,
    height: `${(bounds.h / FRAME_H) * 100}%`,
    // The frame's center, relative to this element: layers grow around the middle of the view.
    transformOrigin: `${((FRAME_W / 2 - bounds.x) / bounds.w) * 100}% ${((FRAME_H / 2 - bounds.y) / bounds.h) * 100}%`,
  }
}

/**
 * Draws a scene as backlit cut paper. Each layer is prepared once as an image (see
 * raster.ts); every frame we only move those images, which the graphics card does
 * cheaply, so the camera glides at the screen's full refresh rate.
 */
export function PaperRenderer({ scene, getTime, width, height, dpr, active, onReady }: RendererProps) {
  const layerRefs = useRef(new Map<string, HTMLDivElement>())
  const actorRefs = useRef(new Map<string, HTMLDivElement>())
  const partRefs = useRef(new Map<string, HTMLDivElement>())
  const onReadyRef = useRef(onReady)
  useEffect(() => {
    onReadyRef.current = onReady
  })

  // Place the prepared art (see prepare.ts) whenever the scene or the frame size changes.
  useEffect(() => {
    if (width <= 0 || height <= 0) return
    let cancelled = false
    preparePaperScene(scene, width, height, dpr).then((prepared) => {
      if (cancelled) return
      for (const [id, canvas] of prepared.layers) layerRefs.current.get(id)?.replaceChildren(canvas)
      for (const [key, canvas] of prepared.parts) partRefs.current.get(key)?.replaceChildren(canvas)
      onReadyRef.current?.()
    })
    return () => {
      cancelled = true
    }
  }, [scene, width, height, dpr])

  // Every frame: move the layers and actors to where the scene says they are now.
  useEffect(() => {
    const draw = () => {
      const frame = evaluateScene(scene, getTime())
      for (const layer of frame.layers) {
        const el = layerRefs.current.get(layer.id)
        if (!el) continue
        const t = layerTransform(layer.depth, frame.camera, layer.swayX)
        el.style.transform = `translate3d(${t.dx * t.scale * width}px, ${t.dy * t.scale * height}px, 0) scale(${t.scale})`
      }
      for (const actor of frame.actors) {
        const el = actorRefs.current.get(actor.id)
        const art = paperProps[actor.prop]
        if (!el || !art) continue
        const p = projectPoint(actor.x, actor.y, actor.depth, frame.camera)
        const w = actor.size * width
        const h = w * (art.box.h / art.box.w)
        const flip = art.facing === actor.facing ? 1 : -1
        el.style.transform = `translate3d(${p.x * width - w / 2}px, ${p.y * height - h / 2}px, 0) scale(${p.scale * flip}, ${p.scale})`
        for (const part of art.parts) {
          if (!part.pivot) continue
          const partEl = partRefs.current.get(`${actor.id}/${part.id}`)
          if (partEl) partEl.style.transform = `rotate(${partPose(actor.prop, part.id, actor.time).rotate}deg)`
        }
      }
    }
    draw()
    if (!active) return
    return gameClock.subscribe(draw)
  }, [scene, getTime, width, height, active])

  return (
    <div className="paper-frame" style={{ width, height }}>
      {scene.layers.map((layer) => {
        const art = paperLayers[layer.id]
        if (!art) return null
        return [
          <div
            key={layer.id}
            className="paper-layer"
            data-layer={layer.id}
            style={placement(art.bounds)}
            ref={(el) => {
              if (el) layerRefs.current.set(layer.id, el)
              else layerRefs.current.delete(layer.id)
            }}
          />,
          ...scene.actors
            .filter((actor) => actor.above === layer.id)
            .map((actor) => {
              const art = paperProps[actor.prop]
              if (!art) return null
              const w = actor.size * width
              return (
                <div
                  key={actor.id}
                  className="paper-actor"
                  style={{ width: w, height: w * (art.box.h / art.box.w) }}
                  ref={(el) => {
                    if (el) actorRefs.current.set(actor.id, el)
                    else actorRefs.current.delete(actor.id)
                  }}
                >
                  {art.parts.map((part) => (
                    <div
                      key={part.id}
                      className="paper-part"
                      style={
                        part.pivot
                          ? {
                              transformOrigin: `${((part.pivot.x - art.box.x) / art.box.w) * 100}% ${((part.pivot.y - art.box.y) / art.box.h) * 100}%`,
                            }
                          : undefined
                      }
                      ref={(el) => {
                        const key = `${actor.id}/${part.id}`
                        if (el) partRefs.current.set(key, el)
                        else partRefs.current.delete(key)
                      }}
                    />
                  ))}
                </div>
              )
            }),
        ]
      })}
      <div className="paper-grain" aria-hidden="true" />
      <div className="paper-vignette" aria-hidden="true" />
    </div>
  )
}
