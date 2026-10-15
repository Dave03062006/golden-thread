import { describe, expect, it } from 'vitest'
import { demoScene } from './demo'
import { artIdsOf, evaluateScene, layerTransform, projectPoint } from './evaluate'

describe('evaluateScene', () => {
  it('is the same for the same time', () => {
    expect(evaluateScene(demoScene, 3.2)).toEqual(evaluateScene(demoScene, 3.2))
  })

  it('glides the camera back and forth', () => {
    const start = evaluateScene(demoScene, 0).camera
    const end = evaluateScene(demoScene, 12).camera
    const back = evaluateScene(demoScene, 24).camera
    expect(start.x).toBeCloseTo(-0.03)
    expect(end.x).toBeCloseTo(0.035)
    expect(back.x).toBeCloseTo(start.x)
    expect(end.zoom).toBeCloseTo(1.07)
  })

  it('moves actors along their path and loops them', () => {
    const early = evaluateScene(demoScene, 1).actors[0]!
    const looped = evaluateScene(demoScene, 17).actors[0]!
    expect(early.x).toBeGreaterThan(1)
    expect(looped.x).toBeCloseTo(early.x)
    expect(early.facing).toBe(-1)
    expect(early.depth).toBe(0.7)
  })

  it('sways layers gently', () => {
    const sways = [0, 1.5, 3].map((t) => evaluateScene(demoScene, t).layers.find((l) => l.id === 'water-front')!.swayX)
    for (const s of sways) expect(Math.abs(s)).toBeLessThanOrEqual(0.02)
    expect(new Set(sways).size).toBeGreaterThan(1)
  })
})

describe('depth', () => {
  const camera = { x: 0.1, y: 0, zoom: 1.2 }

  it('keeps the far sky still', () => {
    const sky = layerTransform(0, camera)
    expect(sky.dx).toBeCloseTo(0)
    expect(sky.dy).toBeCloseTo(0)
    expect(sky.scale).toBe(1)
  })

  it('moves and enlarges near layers most', () => {
    const near = layerTransform(1, camera)
    const mid = layerTransform(0.5, camera)
    expect(near.dx).toBeCloseTo(-0.1)
    expect(mid.dx).toBeCloseTo(-0.05)
    expect(near.scale).toBeCloseTo(1.2)
    expect(mid.scale).toBeCloseTo(1.1)
  })

  it('projects a centered point to the center', () => {
    const p = projectPoint(0.5, 0.5, 1, { x: 0, y: 0, zoom: 1.5 })
    expect(p.x).toBeCloseTo(0.5)
    expect(p.y).toBeCloseTo(0.5)
  })
})

describe('artIdsOf', () => {
  it('lists every layer and prop a scene needs', () => {
    const ids = artIdsOf(demoScene)
    expect(ids.layers).toContain('evening-sky')
    expect(ids.props).toEqual(['dove'])
  })
})
