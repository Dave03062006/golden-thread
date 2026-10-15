import type { Position } from '../engine/save/types'
import { demoScene } from '../scene/demo'

/** A short description of where a save is, for the save-file cards. */
export function describePosition(position: Position | null): string {
  if (!position) return 'Not started yet'
  if (position.level === 'demo') return `Demo · ${demoScene.title}`
  return `${position.level} · ${position.episode}`
}
