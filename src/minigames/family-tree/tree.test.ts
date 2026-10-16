import { describe, expect, it } from 'vitest'
import { GENERATIONS, episode6 } from '../../content/levels/01-creation-and-fall/episode-6'
import type { SceneFrame } from '../../scene/evaluate'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { familyTree } from '.'

const context = (gentle: boolean): GameContext => ({ gentle, frame: () => ({}) as SceneFrame })

/** Plays the rules: `choose` names the leaf to place whenever a question is asked. */
function run(gentle: boolean, seconds: number, choose: (question: string, placed: number) => string | null = () => null) {
  const ctx = context(gentle)
  let state = familyTree.start(ctx)
  for (let t = 0; t < seconds; t += STEP) {
    const choice = familyTree.view(state, ctx).choice
    const pick = choice && choice.options.length > 0 && !choice.feedback ? choose(choice.question, state.placed) : null
    const inputs: GameInput[] = pick ? [{ kind: 'choose', option: pick }] : []
    state = familyTree.step(state, inputs, ctx, () => {})
  }
  return { state, view: familyTree.view(state, ctx) }
}

const inOrder = (_: string, placed: number) => GENERATIONS[placed]?.name ?? null

describe('the family tree', () => {
  it('asks for the root first, and offers every name', () => {
    const { view } = run(false, 0.1)
    expect(view.choice?.question).toBe('Who is at the root of the tree?')
    expect(view.choice?.options.map((o) => o.id).sort()).toEqual(GENERATIONS.map((g) => g.name).sort())
  })

  it('floats a misplaced leaf back with a hint about where it belongs', () => {
    const ctx = context(false)
    let state = familyTree.start(ctx)
    state = familyTree.step(state, [{ kind: 'choose', option: 'Seth' }], ctx, () => {})
    expect(state.placed).toBe(0)
    expect(familyTree.view(state, ctx).choice?.feedback).toEqual({ right: false, text: 'Seth came after Adam.' })
  })

  it('places each right name, shows its fact, grows the tree, and asks for the next', () => {
    const { state, view } = run(false, 0.2, inOrder)
    expect(state.placed).toBe(1)
    expect(view.choice?.feedback?.text).toBe('Adam: lived 930 years')
    const later = run(false, 3, (_, placed) => (placed === 0 ? 'Adam' : null)).view
    expect(later.choice?.question).toBe('Who comes next, after Adam?')
    expect(later.live['actor:branch-1.grow']).toBe(1)
    expect(later.live['actor:branch-2.grow']).toBe(0)
    expect(later.live['actor:leaf-1.opacity']).toBe(1)
  })

  it('finishes once all ten are placed, from Adam to Noah', () => {
    const { state, view } = run(false, 40, inOrder)
    expect(state.placed).toBe(10)
    expect(view.choice?.trail?.map((t) => t.title)).toEqual(GENERATIONS.map((g) => g.name))
    expect(view.done).toBe(true)
  })

  it('makes the next right leaf glow in gentle mode only', () => {
    expect(run(true, 0.1).view.choice?.glow).toBe('Adam')
    expect(run(false, 0.1).view.choice?.glow).toBeUndefined()
  })

  it('plays through Episode 6, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      let tried = ''
      const comparisons = playThrough(episode6, {
        gentle,
        player(runner) {
          const choice = runner.view.choice
          if (!choice || choice.options.length === 0 || choice.feedback?.right) return
          // The question's id says how many are placed, so which name is next.
          const right = GENERATIONS[Number(choice.id.split('-')[1])]!.name
          const wrong = choice.options.find((o) => o.id !== right)
          // A wrong leaf first for each question (if there's still one to try), then the right one.
          if (tried !== choice.id && wrong) {
            runner.queue({ kind: 'choose', option: wrong.id })
            tried = choice.id
          } else if (!wrong || choice.feedback) runner.queue({ kind: 'choose', option: right })
        },
      })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
