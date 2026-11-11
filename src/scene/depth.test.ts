import { describe, expect, it } from 'vitest'
import { inDepthOrder } from './depth'

const walks = (a: { id: string }) => !a.id.startsWith('prop')

describe('inDepthOrder', () => {
  it('draws a nearer walker in front of a farther one listed after it', () => {
    const lion = { id: 'lion', y: 0.635 }
    const deer = { id: 'deer', y: 0.61 }
    expect(inDepthOrder([lion, deer], walks).map((a) => a.id)).toEqual(['deer', 'lion'])
  })

  it('leaves props in their places, and walkers at the same depth in the scene’s order', () => {
    const actors = [
      { id: 'prop-ark', y: 0.8 },
      { id: 'b', y: 0.785 },
      { id: 'prop-glow', y: 0.5 },
      { id: 'a', y: 0.785 },
      { id: 'c', y: 0.7 },
    ]
    expect(inDepthOrder(actors, walks).map((a) => a.id)).toEqual(['prop-ark', 'c', 'prop-glow', 'b', 'a'])
  })
})
