import { writeFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { LEVELS } from '../content/catalog'
import { loadStory } from '../content/story-loading'
import { paperProps } from '../styles/paper-glass/art'
import { inDepthOrder } from './depth'
import { Director } from './director'
import type { ActorState } from './evaluate'

// Each level's story loads on demand (content/story-loading.ts); these checks need them all.
await Promise.all(LEVELS.map(loadStory))

/**
 * A look at how the art sits together (run on demand: QA=1 npx vitest run src/scene/overlaps.qa.test.ts).
 * It plays every episode beat by beat, lets each beat settle, and draws it in the same order
 * the renderers do (layers in order, people and animals by depth). Anything solid that is mostly
 * hidden behind something solid drawn in front of it (a moon behind a tree) is listed in
 * shots/overlaps.txt for a person to look at. Soft lights and glows are left out.
 */

/** Soft or see-through art, which may sit over or under anything. */
const SOFT = new Set(['halo', 'rain', 'smoke', 'smoke-column', 'dust-cloud', 'storm-cloud', 'light-rays', 'swarm', 'counted-star', 'constellation', 'ground-glow', 'whirlwind', 'flaming-sword', 'light-flood', 'first-light', 'glory', 'breath', 'tree-root', 'name-leaf', 'family-tree', 'tree-branch', 'map-token', 'sapphire-pavement', 'lightning', 'wave', 'cherub'])
/** How much of something must be hidden to list it; settling time per beat. */
const HIDDEN = 0.5
const SETTLE = 8

interface Box {
  left: number
  right: number
  top: number
  bottom: number
}

function boxOf(a: ActorState): Box | null {
  const art = paperProps[a.prop]
  if (!art) return null
  const w = a.size * a.grow
  const h = w * (16 / 9) * (art.box.h / art.box.w)
  const bottom = art.anchor === 'base' ? a.y : a.y + h / 2
  return { left: a.x - w / 2, right: a.x + w / 2, top: bottom - h, bottom }
}

const area = (b: Box) => Math.max(0, b.right - b.left) * Math.max(0, b.bottom - b.top)
const overlap = (a: Box, b: Box) => area({ left: Math.max(a.left, b.left), right: Math.min(a.right, b.right), top: Math.max(a.top, b.top), bottom: Math.min(a.bottom, b.bottom) })
const walks = (a: ActorState) => {
  const art = paperProps[a.prop]
  return art?.anchor === 'base' && art.poses.includes('walk')
}

describe.skipIf(!process.env.QA)('art overlaps (QA)', () => {
  it('lists art mostly hidden behind other art, in every episode', () => {
    const lines: string[] = []
    for (const level of LEVELS) {
      for (const episode of level.episodes) {
        const seen = new Set<string>()
        const director = new Director(episode, 0)
        let t = 0
        director.start(t)
        for (let guard = 0; guard < 400; guard++) {
          t += SETTLE
          const frame = director.frame(t)
          const where = `${director.current.scene + 1}.${director.current.beat + 1}`
          // The order things are drawn in, back to front.
          const drawn = frame.layers.flatMap((layer) => inDepthOrder(frame.actors.filter((a) => a.above === layer.id), walks))
          const solid = drawn.map((a) => ({ a, box: boxOf(a) })).filter((s) => s.box && area(s.box) > 0 && s.a.opacity > 0.5 && !SOFT.has(s.a.prop))
          for (let i = 0; i < solid.length; i++) {
            for (let j = i + 1; j < solid.length; j++) {
              const [back, front] = [solid[i]!, solid[j]!]
              // The tabernacle is drawn as stacked pieces, and a crossfade puts two versions of a thing in one place: both on purpose.
              if (back.a.prop === 'tabernacle-piece' || front.a.prop === 'tabernacle-piece') continue
              if (Math.abs(back.a.x - front.a.x) < 0.005 && Math.abs(back.a.y - front.a.y) < 0.005) continue
              const hidden = overlap(back.box!, front.box!) / area(back.box!)
              if (hidden <= HIDDEN) continue
              const key = `${back.a.id}|${front.a.id}`
              if (seen.has(key)) continue
              seen.add(key)
              lines.push(`${episode.id} ${where}  ${back.a.id} (${back.a.prop}) is ${Math.round(100 * hidden)}% behind ${front.a.id} (${front.a.prop})`)
            }
          }
          const beat = director.beat
          if (!beat) break
          if (beat.kind === 'play') director.finishPlay(t)
          else director.advance(t)
          if (director.current.scene >= episode.scenes.length) break
        }
      }
    }
    writeFileSync('shots/overlaps.txt', lines.join('\n') + '\n')
    console.log(`${lines.length} places to look at, in shots/overlaps.txt`)
    expect(lines.every((line) => line.includes(' behind '))).toBe(true)
  })
})
