import { memo, useEffect, useLayoutEffect, useRef } from 'react'
import { gameClock } from '../../engine/clock'
import { layerTransform, projectPoint } from '../../scene/evaluate'
import type { SceneActor } from '../../scene/types'
import type { RendererProps } from '../../stage/types'
import { FRAME_H, FRAME_W, paperLayers, paperProps, partMotion, type Box } from './art'
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

/** How many puppets an actor needs: one, or one per member of its group. */
const membersOf = (actor: SceneActor) => actor.group?.count ?? 1

/** A single actor is drawn as a group of one, right at its place. */
const ALONE = [{ dx: 0, dy: 0, scale: 1, phase: 0 }]

/** A copy of a part's picture, for the second and later places it's shown. */
function copyArt(art: HTMLImageElement | HTMLCanvasElement): HTMLImageElement | HTMLCanvasElement {
  if (art instanceof HTMLImageElement) return art.cloneNode() as HTMLImageElement
  const canvas = document.createElement('canvas')
  canvas.width = art.width
  canvas.height = art.height
  canvas.getContext('2d')!.drawImage(art, 0, 0)
  return canvas
}

/**
 * The transform and opacity each element was last given. Writing a style costs the
 * browser work even when nothing changes (and so does reading one back), so an element
 * is only touched when it really moves or fades.
 */
const writtenTransforms = new WeakMap<HTMLElement, string>()
const writtenOpacities = new WeakMap<HTMLElement, string>()

function setTransform(el: HTMLElement, transform: string) {
  if (writtenTransforms.get(el) === transform) return
  writtenTransforms.set(el, transform)
  el.style.transform = transform
}

/** Opacity, rounded so tiny drifts don't touch the page. */
function setOpacity(el: HTMLElement, value: number) {
  const text = value >= 0.999 ? '1' : value <= 0.001 ? '0' : value.toFixed(3)
  if (writtenOpacities.get(el) === text) return
  writtenOpacities.set(el, text)
  el.style.opacity = text
}

/** Rounds to a hundredth: for the layers, which carry the camera's slowest glides. */
const r2 = (n: number) => Math.round(n * 100) / 100
/**
 * Rounds to a tenth of a pixel, percent or degree: still far finer than the eye can see,
 * and slow movements (a tree's sway) then only touch the page a few times a second.
 */
const r1 = (n: number) => Math.round(n * 10) / 10

/**
 * Draws a scene as backlit cut paper. Each layer and puppet part is prepared once as an
 * image (see prepare.ts); every frame we only move, turn and fade those images, which the
 * graphics card does cheaply, so everything glides at the screen's full refresh rate.
 * (`memo`: React leaves it alone unless its own props change, so a new line of the story
 * doesn't make it rebuild its hundreds of pieces.)
 */
export const PaperRenderer = memo(function PaperRenderer({ scene, getFrame, width, height, dpr, active, onReady }: RendererProps) {
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
      // Actors of the same kind and size share one loaded picture, but a picture can only be
      // in one place on the page, so every placement after the first gets its own copy.
      const placed = new Set<HTMLImageElement | HTMLCanvasElement>()
      for (const actor of scene.actors) {
        const art = paperProps[actor.prop]
        if (!art) continue
        for (const part of art.parts) {
          const picture = prepared.parts.get(`${actor.id}/${part.id}`)
          if (!picture) continue
          for (let i = 0; i < membersOf(actor); i++) {
            partRefs.current.get(`${actor.id}#${i}/${part.id}`)?.replaceChildren(placed.has(picture) ? copyArt(picture) : picture)
            placed.add(picture)
          }
        }
      }
      onReadyRef.current?.()
    })
    return () => {
      cancelled = true
    }
  }, [scene, width, height, dpr])

  // Every frame: move, fade and pose everything to where the scene says it is now.
  useLayoutEffect(() => {
    const baseSize = new Map(scene.actors.map((a) => [a.id, a.size]))
    const draw = () => {
      const frame = getFrame()
      for (const layer of frame.layers) {
        const el = layerRefs.current.get(layer.id)
        if (!el) continue
        setOpacity(el, layer.opacity)
        if (layer.opacity <= 0.001) continue
        const t = layerTransform(layer.depth, frame.camera, layer.swayX)
        setTransform(el, `translate3d(${r2(t.dx * t.scale * width)}px, ${r2((t.dy + layer.offsetY) * t.scale * height)}px, 0) scale(${t.scale.toFixed(5)})`)
      }

      for (const actor of frame.actors) {
        const art = paperProps[actor.prop]
        if (!art) continue
        const hidden = actor.opacity <= 0.001 || actor.grow <= 0.001
        const base = baseSize.get(actor.id) ?? actor.size
        const w = base * width
        const h = w * (art.box.h / art.box.w)
        const anchorY = art.anchor === 'base' ? h : h / 2
        const flip = art.facing === actor.facing ? 1 : -1
        const members = actor.instances ?? ALONE
        members.forEach((member, i) => {
          const el = actorRefs.current.get(`${actor.id}#${i}`)
          if (!el) return
          setOpacity(el, hidden ? 0 : actor.opacity)
          if (hidden) return
          const p = projectPoint(actor.x + member.dx, actor.y + member.dy, actor.depth, frame.camera)
          const k = p.scale * (actor.size / base) * member.scale * actor.grow
          setTransform(el, `translate3d(${r1(p.x * width - w / 2)}px, ${r1(p.y * height - anchorY)}px, 0) scale(${(k * flip).toFixed(4)}, ${k.toFixed(4)})`)
          if (!art.animate) return
          // Members of a group move out of step with each other.
          const time = actor.time + member.phase * 7.3
          for (const part of art.parts) {
            const partEl = partRefs.current.get(`${actor.id}#${i}/${part.id}`)
            if (!partEl) continue
            const m = partMotion(art, part.id, actor.pose, actor.previousPose, actor.poseBlend, time)
            setTransform(partEl, `translate(${r1((m.x / art.box.w) * 100)}%, ${r1((m.y / art.box.h) * 100)}%) rotate(${r1(m.rotate)}deg)`)
            setOpacity(partEl, m.opacity)
          }
        })
      }
    }
    draw()
    if (!active) return
    return gameClock.subscribe(draw)
  }, [scene, getFrame, width, height, active])

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
            .flatMap((actor) => {
              const art = paperProps[actor.prop]
              if (!art) return []
              const w = actor.size * width
              return Array.from({ length: membersOf(actor) }, (_, i) => (
                <div
                  key={`${actor.id}#${i}`}
                  className="paper-actor"
                  data-actor={actor.id}
                  style={{ width: w, height: w * (art.box.h / art.box.w), transformOrigin: art.anchor === 'base' ? '50% 100%' : '50% 50%' }}
                  ref={(el) => {
                    if (el) actorRefs.current.set(`${actor.id}#${i}`, el)
                    else actorRefs.current.delete(`${actor.id}#${i}`)
                  }}
                >
                  {art.parts.map((part) => (
                    <div
                      key={part.id}
                      className="paper-part"
                      data-moves={art.animate ? true : undefined}
                      style={
                        part.pivot
                          ? {
                              transformOrigin: `${((part.pivot.x - art.box.x) / art.box.w) * 100}% ${((part.pivot.y - art.box.y) / art.box.h) * 100}%`,
                            }
                          : undefined
                      }
                      ref={(el) => {
                        const key = `${actor.id}#${i}/${part.id}`
                        if (el) partRefs.current.set(key, el)
                        else partRefs.current.delete(key)
                      }}
                    />
                  ))}
                </div>
              ))
            }),
        ]
      })}
      <div className="paper-grain" aria-hidden="true" />
      <div className="paper-vignette" aria-hidden="true" />
    </div>
  )
})
