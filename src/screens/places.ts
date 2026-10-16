import { findScene } from '../content/catalog'
import type { Position } from '../engine/save/types'
import { demoScene } from '../scene/demo'

/** A short description of where a save is, for the save-file cards and the menu. */
export function describePosition(position: Position | null): string {
  if (!position) return 'Not started yet'
  if (position.level === 'demo') return `Demo · ${demoScene.title}`
  const found = findScene(position.scene)
  if (!found) return 'Somewhere in the story'
  return `Level ${found.level.number} · ${found.episode.title} · ${found.episode.scenes[found.index]!.title}`
}
