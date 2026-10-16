import { describe, expect, it } from 'vitest'
import { ANIMALS_TO_NAME, BEFORE_THE_MAN, episode2 } from '../../content/levels/01-creation-and-fall/episode-2'
import { Director } from '../../scene/director'
import type { SceneFrame } from '../../scene/evaluate'
import { STEP, type GameContext } from '../framework'
import { GAMES } from '../registry'
import { GameRunner } from '../runner'
import { ARRIVE, GO, NAMED, naming } from '.'

const FRAME = 1 / 60

/** Frames compared to six decimal places, so rounding differences don't count. */
const rounded = (frame: SceneFrame) => JSON.parse(JSON.stringify(frame, (_key, value: unknown) => (typeof value === 'number' ? Math.round(value * 1e6) / 1e6 : value)))

/** Plays the rules alone, with no scene, for `seconds`. */
function run(gentle: boolean, seconds: number, chooseAt: (state: { index: number; phase: string }, t: number) => string | null) {
  const context = { gentle, frame: () => ({}) as SceneFrame } satisfies GameContext
  let state = naming.start(context)
  const cues: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    const option = chooseAt(state, t)
    state = naming.step(state, option ? [{ kind: 'choose', option }] : [], context, (cue) => cues.push(`${cue.target} ${Object.keys(cue.to).join(',')}`))
  }
  return { state, view: naming.view(state, context), cues }
}

describe('naming the animals', () => {
  it('offers three descriptions, or two in gentle mode, always including the one that fits', () => {
    for (const gentle of [false, true]) {
      const { view } = run(gentle, ARRIVE + 0.1, () => null)
      expect(view.choice?.options).toHaveLength(gentle ? 2 : 3)
      expect(view.choice?.options.map((o) => o.id)).toContain(ANIMALS_TO_NAME[0]!.id)
    }
  })

  it('answers a wrong choice with "Not quite", and the animal waits', () => {
    const wrong = ANIMALS_TO_NAME[3]!.id
    const { state, view } = run(false, ARRIVE + 2, (_s, t) => (t > ARRIVE + 0.5 && t < ARRIVE + 0.51 ? wrong : null))
    expect(state.phase).toBe('asking')
    expect(state.index).toBe(0)
    expect(view.choice?.feedback).toEqual({ right: false, text: 'Not quite. Look again.' })
  })

  it('names the animal, then sends the pair to its place and brings the next', () => {
    let named = false
    const { state, view, cues } = run(false, ARRIVE + NAMED + 0.5, (s) => {
      if (s.phase !== 'asking' || named) return null
      named = true
      return ANIMALS_TO_NAME[0]!.id
    })
    expect(state.index).toBe(1)
    expect(state.phase).toBe('coming')
    expect(view.choice).toBeNull()
    expect(cues).toContain(`actor:${ANIMALS_TO_NAME[0]!.id} x,y,spread,facing`)
    expect(cues).toContain(`actor:${ANIMALS_TO_NAME[1]!.id} x,y`)
  })

  it('shows the name once it is chosen', () => {
    const { view } = run(true, ARRIVE + 0.5, (s) => (s.phase === 'asking' ? ANIMALS_TO_NAME[0]!.id : null))
    expect(view.choice?.feedback).toEqual({ right: true, text: '“Lion!”' })
  })

  it('keeps the same choice object while nothing changes, so the screen redraws only on a change', () => {
    const context = { gentle: false, frame: () => ({}) as SceneFrame }
    let state = naming.start(context)
    for (let t = 0; t < ARRIVE + 0.2; t += STEP) state = naming.step(state, [], context, () => {})
    const before = naming.view(state, context).choice
    state = naming.step(state, [], context, () => {})
    expect(naming.view(state, context).choice).toBe(before)
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const director = new Director(episode2)
      let now = 0
      const comparisons: { scene: number; played: unknown; rebuilt: unknown }[] = []
      const reached: number[] = []
      director.subscribe((event) => {
        if (event.type === 'checkpoint' && event.index > 0) reached.push(event.index)
      })
      const compare = () => {
        for (const scene of reached.splice(0)) {
          const rebuilt = new Director(episode2, scene)
          rebuilt.start(now)
          comparisons.push({ scene: scene + 1, played: rounded(director.frame(now + 20)), rebuilt: rounded(rebuilt.frame(now + 20)) })
        }
      }
      director.start(now)
      while (!director.ended) {
        const beat = director.beat!
        if (beat.kind !== 'play') {
          now += 0.5
          director.advance(now)
          compare()
          continue
        }
        const runner = new GameRunner(GAMES[beat.game]!, { gentle, frame: () => director.frame(now) }, director.timeline, now)
        const startedAt = now
        let answered = ''
        let done = false
        while (!done) {
          now += FRAME
          expect(now - startedAt, `"${beat.game}" should finish`).toBeLessThan(80)
          const choice = runner.view.choice
          // Try a wrong answer first, then the right one.
          if (choice && !choice.feedback && answered !== choice.id) {
            const wrong = choice.options.find((o) => o.id !== choice.id)!
            runner.queue({ kind: 'choose', option: wrong.id })
            answered = choice.id
          } else if (choice?.feedback?.right === false) {
            runner.queue({ kind: 'choose', option: choice.id })
          }
          done = runner.advanceTo(now).done
        }
        director.finishPlay(now)
        compare()
      }
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })

  it('brings each animal before the man, and every pair ends in its own place', () => {
    const director = new Director(episode2, 3)
    director.start(0)
    let now = 0
    while (director.beat?.kind !== 'play') director.advance((now += 0.5))
    const runner = new GameRunner(GAMES.naming!, { gentle: false, frame: () => director.frame(now) }, director.timeline, now)
    const first = ANIMALS_TO_NAME[0]!
    for (const end = now + ARRIVE + 0.2; now < end; now += FRAME) runner.advanceTo(now)
    expect(director.timeline.value(`actor:${first.id}.x`, now)).toBeCloseTo(BEFORE_THE_MAN.walk.x)
    expect(director.timeline.value(`actor:${first.id}.spread`, now)).toBe(0)
    runner.queue({ kind: 'choose', option: first.id })
    for (const end = now + NAMED + GO + 0.2; now < end; now += FRAME) runner.advanceTo(now)
    expect(director.timeline.value(`actor:${first.id}.x`, now)).toBeCloseTo(first.place.x)
    expect(director.timeline.value(`actor:${first.id}.spread`, now)).toBeCloseTo(1)
    expect(director.timeline.value(`actor:${first.id}.facing`, now)).toBe(first.place.facing)
    expect(director.timeline.pose(first.id, now).pose).toBe('idle')
  })
})
