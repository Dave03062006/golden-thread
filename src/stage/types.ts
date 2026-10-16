import type { SceneFrame } from '../scene/evaluate'
import type { SceneDescription } from '../scene/types'

/** What every style's renderer receives from the stage. */
export interface RendererProps {
  /** The set: which layers and actors to prepare art for. */
  scene: SceneDescription
  /**
   * Where everything is right now. Both renderers ask for the same moment during a
   * crossfade, so the two styles always show the very same scene.
   */
  getFrame: () => SceneFrame
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
