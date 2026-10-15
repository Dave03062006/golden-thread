import { describe, expect, it } from 'vitest'
import { actor, camera, layer, play, say, verse, withEvents } from './build'
import { Director, historyUpTo, type DirectorEvent, type Story } from './director'
import { Timeline } from './timeline'
import type { SceneDescription } from './types'

const set: SceneDescription = {
  id: 'test-set',
  title: 'Test set',
  layers: [
    { id: 'sky', depth: 0 },
    { id: 'land', depth: 0.6, opacity: 0, offsetY: 0.3 },
  ],
  actors: [{ id: 'sun', prop: 'sun', above: 'sky', x: 0.5, y: 0.9, size: 0.1, opacity: 0 }],
  camera: { loop: 'hold', x: [{ at: 0, value: 0 }], y: [{ at: 0, value: 0 }], zoom: [{ at: 0, value: 1 }] },
}

const story: Story = {
  set,
  scenes: [
    {
      id: 's1',
      title: 'One',
      beats: [say('First.', camera({ zoom: 1.2 }, { seconds: 2 })), withEvents(verse('GEN 1:3', layer('land', { opacity: 1 }, { seconds: 1 })), 'music:light')],
    },
    {
      id: 's2',
      title: 'Two',
      beats: [
        say('Second.'),
        play('raise-land', { done: [layer('land', { offsetY: 0 }, { seconds: 1 })] }),
        say('Third.', actor('sun', { y: 0.2, opacity: 1 }, { seconds: 4, ease: 'linear' })),
      ],
    },
  ],
}

function record(director: Director) {
  const events: DirectorEvent[] = []
  director.subscribe((e) => events.push(e))
  return events
}

describe('Timeline', () => {
  it('starts from the scene description', () => {
    const t = new Timeline(set)
    expect(t.value('layer:land.opacity', 0)).toBe(0)
    expect(t.value('layer:land.offsetY', 0)).toBe(0.3)
    expect(t.value('actor:sun.y', 0)).toBe(0.9)
    expect(t.value('camera.zoom', 0)).toBe(1)
  })

  it('eases a change over its time, and holds the new value after', () => {
    const t = new Timeline(set)
    t.apply(actor('sun', { y: 0.1 }, { seconds: 4, ease: 'linear' }), 10)
    expect(t.value('actor:sun.y', 9)).toBe(0.9)
    expect(t.value('actor:sun.y', 12)).toBeCloseTo(0.5)
    expect(t.value('actor:sun.y', 20)).toBeCloseTo(0.1)
  })

  it('starts a new change from wherever an unfinished one has got to', () => {
    const t = new Timeline(set)
    t.apply(actor('sun', { y: 0.1 }, { seconds: 4, ease: 'linear' }), 0)
    t.apply(actor('sun', { y: 0.7 }, { seconds: 2, ease: 'linear' }), 2) // the sun is at 0.5 here
    expect(t.value('actor:sun.y', 2)).toBeCloseTo(0.5)
    expect(t.value('actor:sun.y', 3)).toBeCloseTo(0.6)
    expect(t.value('actor:sun.y', 9)).toBeCloseTo(0.7)
  })

  it('lets a newer change cancel an older one that has not begun', () => {
    const t = new Timeline(set)
    t.apply(actor('sun', { y: 0.1 }, { seconds: 1, delay: 5 }), 0)
    t.apply(actor('sun', { y: 0.4 }, { seconds: 1 }), 1)
    expect(t.value('actor:sun.y', 30)).toBeCloseTo(0.4)
  })

  it('puts live values from an interaction on top, and keeps them when committed', () => {
    const t = new Timeline(set)
    t.live.set('layer:land.offsetY', 0.12)
    expect(t.value('layer:land.offsetY', 5)).toBe(0.12)
    t.commitLive(5)
    expect(t.live.size).toBe(0)
    expect(t.value('layer:land.offsetY', 6)).toBe(0.12)
    t.apply(layer('land', { offsetY: 0 }, { seconds: 2, ease: 'linear' }), 5)
    expect(t.value('layer:land.offsetY', 6)).toBeCloseTo(0.06)
  })

  it('blends poses and turns at once', () => {
    const t = new Timeline(set)
    t.apply(actor('sun', { pose: 'shine', facing: -1 }, { seconds: 2, ease: 'linear' }), 0)
    expect(t.pose('sun', 1)).toEqual({ pose: 'shine', previous: 'idle', blend: 0.5 })
    expect(t.value('actor:sun.facing', 0.01)).toBe(-1)
  })
})

describe('Director', () => {
  it('reports a checkpoint, then each beat in turn', () => {
    const d = new Director(story)
    const events = record(d)
    d.start(0)
    expect(events.map((e) => e.type)).toEqual(['checkpoint', 'beat'])
    d.advance(1)
    expect(events.slice(2).map((e) => e.type)).toEqual(['beat', 'event'])
    expect(events[3]).toEqual({ type: 'event', name: 'music:light' })
  })

  it('crosses into the next scene with a checkpoint', () => {
    const d = new Director(story)
    const events = record(d)
    d.start(0)
    d.advance(1)
    d.advance(2)
    const checkpoint = events.at(-2)
    expect(checkpoint?.type === 'checkpoint' && checkpoint.index).toBe(1)
    expect(d.current).toEqual({ scene: 1, beat: 0 })
  })

  it('waits for an interaction to finish, then runs its closing cues', () => {
    const d = new Director(story, 1)
    d.start(0)
    d.advance(1)
    expect(d.playing).toBe(true)
    d.advance(2)
    expect(d.current).toEqual({ scene: 1, beat: 1 })
    d.timeline.live.set('layer:land.offsetY', 0.1)
    d.finishPlay(3)
    expect(d.current).toEqual({ scene: 1, beat: 2 })
    expect(d.timeline.value('layer:land.offsetY', 3)).toBeCloseTo(0.1)
    expect(d.timeline.value('layer:land.offsetY', 10)).toBeCloseTo(0)
  })

  it('ends after the last beat', () => {
    const d = new Director(story, 1)
    const events = record(d)
    d.start(0)
    d.advance(1)
    d.finishPlay(2)
    d.advance(3)
    expect(d.ended).toBe(true)
    expect(events.at(-1)).toEqual({ type: 'end' })
  })

  it('rebuilds the world exactly when starting from a checkpoint', () => {
    // Play scene 1 through, waiting long enough for everything to settle.
    const played = new Director(story)
    played.start(0)
    played.advance(10)
    played.advance(20) // into scene 2 at time 20
    const resumed = new Director(story, 1)
    resumed.start(20)
    expect(resumed.frame(25)).toEqual(played.frame(25))
  })

  it('lists the lines read so far, for the history', () => {
    const lines = historyUpTo(story, { scene: 1, beat: 2 })
    expect(lines.map((l) => (l.beat.kind === 'say' ? l.beat.text : l.beat.ref))).toEqual(['First.', 'GEN 1:3', 'Second.', 'Third.'])
  })
})
