import type { StyleId } from './ids'

/**
 * The list of art a style provides. A scene may only use layers, props and poses that
 * BOTH styles provide; a test checks this for every scene, which keeps the styles in
 * step (spec §13.4).
 */
export interface StyleArtIndex {
  style: StyleId
  layers: readonly string[]
  props: readonly string[]
  /** The poses each prop can take. */
  poses: Readonly<Record<string, readonly string[]>>
}
