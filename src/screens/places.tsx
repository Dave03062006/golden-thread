import { useEffect, useState } from 'react'
import type { Position } from '../engine/save/types'
import { demoScene } from '../scene/demo'

import { loadStory, storyLoaded } from '../content/story-loading'

type Catalog = typeof import('../content/catalog')

/**
 * The story's content is large, and the title screen and menu only need a few of its
 * titles, so it's loaded on its own (the story would load it next anyway).
 */
let catalog: Catalog | null = null
const loading = import('../content/catalog').then((c) => (catalog = c))

/** A short description of where a save is, for the save-file cards and the menu. */
function describePosition(position: Position | null, content: Catalog | null = catalog): string {
  if (!position) return 'Not started yet'
  if (position.level === 'demo') return `Demo · ${demoScene.title}`
  if (!content) return 'In the story'
  const found = content.findScene(position.scene)
  if (!found) return 'Somewhere in the story'
  // The scene's own title only once its level's story has been loaded.
  const scene = found.episode.scenes[found.index]
  return `Level ${found.level.number} · ${found.episode.title}${scene ? ` · ${scene.title}` : ''}`
}

/** Where a save is, filled in with the episode and scene names once the content has loaded. */
export function Whereabouts({ position }: { position: Position | null }) {
  const [content, setContent] = useState(catalog)
  const [, setLoaded] = useState(0)
  useEffect(() => {
    if (!content) void loading.then(setContent)
  }, [content])
  // The scene's title comes with its level's story: load it (the level the player will most likely resume).
  const level = content && position ? content.findScene(position.scene)?.level : undefined
  useEffect(() => {
    if (level && !storyLoaded(level)) void loadStory(level).then(() => setLoaded((n) => n + 1))
  }, [level])
  return <>{describePosition(position, content)}</>
}
