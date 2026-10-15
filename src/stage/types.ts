import type { SceneDescription } from '../scene/types'

/** What every style's renderer receives from the stage. */
export interface RendererProps {
  scene: SceneDescription
  /** The scene's current time in seconds. Both renderers read the same clock during a crossfade. */
  getTime: () => number
  /** The frame's size in CSS pixels (always 16:9). */
  width: number
  height: number
  /** Device pixels per CSS pixel. */
  dpr: number
  /** Whether to draw every frame. An inactive renderer stays ready but paused and invisible. */
  active: boolean
  /** Called once the renderer has prepared its art and is drawing. */
  onReady?: () => void
}
