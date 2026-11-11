import { describe, expect, it } from 'vitest'
import { paperArtIndex } from '../styles/paper-glass/art'
import { pixelArtIndex } from '../styles/pixel/art'
import { parseReference } from './bible/books'
import { VERSES } from './bible/verses'
import { findScene, LEVELS } from './catalog'
import { loadStory } from './story-loading'
import { PLACES } from './geography'
import { THREADS } from './threads'

// Each level's story loads on demand (content/story-loading.ts); these checks need them all.
await Promise.all(LEVELS.map(loadStory))

// Content checks (spec §14): everything the story refers to must exist, in both
// translations and in both art styles.

const episodes = LEVELS.flatMap((level) => level.episodes)
const built = episodes.filter((episode) => episode.scenes.length > 0)

describe('the Bible text', () => {
  it.each(Object.entries(VERSES))('%s is a real reference with text in both translations', (ref, verse) => {
    expect(parseReference(ref), `${ref} isn't a real place in the Bible`).not.toBeNull()
    expect(verse.rsv.trim().length).toBeGreaterThan(0)
    expect(verse.dra.trim().length).toBeGreaterThan(0)
  })

  it('has every verse the stories quote', () => {
    const quoted = built.flatMap((e) => e.scenes.flatMap((s) => s.beats.flatMap((b) => (b.kind === 'verse' ? [b.ref] : []))))
    expect(quoted.filter((ref) => !VERSES[ref])).toEqual([])
  })

  it('has every verse the golden threads quote', () => {
    const quoted = THREADS.flatMap((t) => [...t.from, ...t.to])
    expect(quoted.filter((ref) => !VERSES[ref])).toEqual([])
  })

  it('points the reader to real passages', () => {
    const refs = episodes.flatMap((e) => [e.passage, ...e.read])
    expect(refs.filter((ref) => !parseReference(ref))).toEqual([])
  })
})

describe('the levels', () => {
  it('uses each scene id once', () => {
    const ids = episodes.flatMap((e) => e.scenes.map((s) => s.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(episodes.map((e) => [e.id, e] as const))('%s names a real golden thread and real places', (_id, episode) => {
    const thread = THREADS.find((t) => t.id === episode.thread.id)
    expect(thread?.episode).toBe(episode.id)
    expect(episode.whereWhen.places.filter((id) => !PLACES.some((p) => p.id === id))).toEqual([])
  })
})

describe.each(built.map((e) => [e.id, e] as const))('episode %s', (_id, episode) => {
  const { set } = episode
  const layers = new Set(set.layers.map((l) => l.id))
  const actors = new Map(set.actors.map((a) => [a.id, a]))
  const cues = episode.scenes.flatMap((s) => s.beats.flatMap((b) => [...b.cues, ...(b.kind === 'play' ? b.done : [])]))

  it('only changes things that are in its set', () => {
    const unknown = cues
      .map((c) => c.target)
      .filter((target) => target !== 'camera' && !(target.startsWith('layer:') && layers.has(target.slice(6))) && !(target.startsWith('actor:') && actors.has(target.slice(6))))
    expect(unknown).toEqual([])
  })

  it('only asks for poses both styles provide', () => {
    const wanted = [
      ...set.actors.map((a) => [a.prop, a.pose ?? 'idle'] as const),
      ...cues.filter((c) => c.to.pose).map((c) => [actors.get(c.target.slice(6))!.prop, c.to.pose!] as const),
    ]
    for (const index of [paperArtIndex, pixelArtIndex]) {
      const missing = wanted.filter(([prop, pose]) => !index.poses[prop]?.includes(pose)).map(([prop, pose]) => `${index.style}: ${prop} ${pose}`)
      expect(missing).toEqual([])
    }
  })

  it('hides its golden thread in a real actor, from a real scene', () => {
    expect(actors.has(episode.thread.spot)).toBe(true)
    expect(episode.scenes.some((s) => s.id === episode.thread.fromScene)).toBe(true)
  })

  it('keeps its golden thread above the story panel, where it can be tapped', () => {
    // The panel covers roughly the bottom fifth of the frame; the spot sits on the actor's place.
    const spot = episode.thread.spot
    const heights = [actors.get(spot)!.y, ...cues.filter((c) => c.target === `actor:${spot}` && c.to.y !== undefined).map((c) => c.to.y!)]
    expect(heights.filter((y) => y > 0.74)).toEqual([])
  })
})

describe('scene ids', () => {
  it('follow the pattern "<episode>-s<number>", which lets a scene be found before its story loads', () => {
    const odd = LEVELS.flatMap((level) => level.episodes.flatMap((episode) => episode.scenes.filter((scene, i) => scene.id !== `${episode.id}-s${i + 1}`).map((scene) => scene.id)))
    expect(odd).toEqual([])
  })
})

describe('plays', () => {
  it('come with the level that uses them, so a level plays once its own story is loaded', async () => {
    const missing: string[] = []
    for (const level of LEVELS) {
      const { games } = await level.story!()
      for (const episode of level.episodes) for (const scene of episode.scenes) for (const beat of scene.beats) if (beat.kind === 'play' && !games[beat.game]) missing.push(`${level.id}: ${beat.game}`)
    }
    expect(missing).toEqual([])
  })
})

describe('findScene', () => {
  it('finds a scene from its id alone', () => {
    const found = findScene('l14-e3-s2')
    expect([found?.level.id, found?.episode.id, found?.index]).toEqual(['l14', 'l14-e3', 1])
    expect(findScene('nonsense')).toBeUndefined()
  })
})
