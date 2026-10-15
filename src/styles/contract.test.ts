import { describe, expect, it } from 'vitest'
import { artIdsOf } from '../scene/evaluate'
import { ALL_SCENES } from '../scene/registry'
import { paperArtIndex } from './paper-glass/art'
import { pixelArtIndex } from './pixel/art'

// Every scene may only use art that BOTH styles provide (spec §13.4).
describe.each(ALL_SCENES.map((scene) => [scene.id, scene] as const))('scene %s', (_id, scene) => {
  const { layers, props } = artIdsOf(scene)

  it.each([paperArtIndex, pixelArtIndex].map((index) => [index.style, index] as const))('has every layer and prop in %s', (_style, index) => {
    expect(layers.filter((id) => !index.layers.includes(id))).toEqual([])
    expect(props.filter((id) => !index.props.includes(id))).toEqual([])
  })

  it('places every actor above one of its own layers', () => {
    for (const actor of scene.actors) expect(layers).toContain(actor.above)
  })
})
