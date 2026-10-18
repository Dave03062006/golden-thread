import { useEffect, useState } from 'react'
import type { Position } from '../engine/save/types'
import { demoScene } from '../scene/demo'

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
  return `Level ${found.level.number} · ${found.episode.title} · ${found.episode.scenes[found.index]!.title}`
}

/** Where a save is, filled in with the episode and scene names once the content has loaded. */
export function Whereabouts({ position }: { position: Position | null }) {
  const [content, setContent] = useState(catalog)
  useEffect(() => {
    if (!content) void loading.then(setContent)
  }, [content])
  return <>{describePosition(position, content)}</>
}
