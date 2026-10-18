import { lerp } from '../../engine/motion'
import type { StyleArtIndex } from '../contract'
import type { Box } from './frame'
import { creationLayers } from './layers/creation'
import { demoLayers } from './layers/demo'
import { homeLayers } from './layers/home'
import { exileLayers } from './layers/exile'
import { fallLayers } from './layers/fall'
import { generationsLayers } from './layers/generations'
import { gardenLayers } from './layers/garden'
import { worldGoneWrongLayers } from './layers/world-gone-wrong'
import { buildingTheArkLayers } from './layers/building-the-ark'
import { arkProps } from './props/ark'
import { theFloodLayers } from './layers/the-flood'
import { theFloodProps } from './props/the-flood'
import { theDoveReturnsLayers } from './layers/the-dove-returns'
import { theDoveReturnsProps } from './props/the-dove-returns'
import { theRainbowCovenantLayers } from './layers/the-rainbow-covenant'
import { theRainbowCovenantProps } from './props/the-rainbow-covenant'
import { worldGoneWrongProps } from './props/world-gone-wrong'
import { familyOfNoah } from './characters/family-of-noah'
import { creationProps } from './props/creation'
import { dove } from './props/dove'
import { homeProps } from './props/home'
import { exileProps } from './props/exile'
import { fallProps } from './props/fall'
import { generationsProps } from './props/generations'
import { brothers } from './characters/brothers'
import { people } from './characters/people'
import { animals } from './props/animals'
import { gardenProps } from './props/garden'

export { FRAME_H, FRAME_W, type Box } from './frame'

/**
 * Paper & Glass art for scenes. Each layer is a piece of SVG drawn in frame units (see
 * frame.ts). When a scene loads, each layer is turned into a sharp image once (see
 * raster.ts); animation then only moves those images.
 */

export interface PaperLayerArt {
  /** The part of the world this layer covers, in frame units. Only this part is drawn. */
  bounds: Box
  /** SVG markup in frame units. */
  svg: string
  /** Cut paper casts a soft shadow onto the layer behind it. The sky doesn't. */
  shadow: boolean
  /** Soft layers (like the sky) can be drawn at lower resolution to save memory. */
  resolution?: number
}

export interface PaperPropPart {
  id: string
  svg: string
  /** The joint this part turns around, in the prop's own units. */
  pivot?: { x: number; y: number }
}

/** How a puppet part has moved from its resting place: turned at its joint, shifted, faded. */
export interface PartMotion {
  rotate?: number
  x?: number
  y?: number
  opacity?: number
}

export interface PaperPropArt {
  /** The prop's own drawing space. Its width is what the actor's `size` refers to. */
  box: Box
  /** Which way the drawing faces: -1 left, 1 right. */
  facing: -1 | 1
  parts: PaperPropPart[]
  /** Every pose it can take. Scenes may only ask for these (spec §13.4). */
  poses: string[]
  /** How each part moves in a pose, over time. Parts it doesn't mention stay at rest. */
  animate?: (part: string, pose: string, time: number) => PartMotion
  /**
   * Where the actor's place is on the drawing: its middle (a light, a bird), or the
   * middle of its base (anything standing on the ground). Growing also starts there.
   */
  anchor?: 'center' | 'base'
  /** Soft art, like a glow, can be drawn smaller than shown without losing anything. */
  resolution?: number
  /** Whether it casts the soft paper shadow. Lights don't. */
  shadow?: boolean
}

/** Each module's layers, kept apart so a test can check that no two use the same name (a later one would quietly replace an earlier one). */
export const paperLayerSets: Record<string, PaperLayerArt>[] = [
  demoLayers,
  creationLayers,
  gardenLayers,
  fallLayers,
  exileLayers,
  homeLayers,
  generationsLayers,
  worldGoneWrongLayers,
  buildingTheArkLayers,
  theFloodLayers,
  theDoveReturnsLayers,
  theRainbowCovenantLayers,
]

export const paperLayers: Record<string, PaperLayerArt> = Object.assign({}, ...paperLayerSets)

/** Each module's props, kept apart so a test can check that no two use the same name (a later one would quietly replace an earlier one). */
export const paperPropSets: Record<string, PaperPropArt>[] = [
  { dove },
  creationProps,
  animals,
  gardenProps,
  fallProps,
  exileProps,
  homeProps,
  generationsProps,
  people,
  brothers,
  worldGoneWrongProps,
  familyOfNoah,
  arkProps,
  theFloodProps,
  theDoveReturnsProps,
  theRainbowCovenantProps,
]

export const paperProps: Record<string, PaperPropArt> = Object.assign({}, ...paperPropSets)

/**
 * Where a part is at `time`, blending from the previous pose into the current one, so
 * a puppet moves smoothly from walking to standing (spec §10, rule 6).
 */
export function partMotion(prop: PaperPropArt, part: string, pose: string, previous: string, blend: number, time: number): Required<PartMotion> {
  const now = { rotate: 0, x: 0, y: 0, opacity: 1, ...prop.animate?.(part, pose, time) }
  if (blend >= 1 || previous === pose) return now
  const before = { rotate: 0, x: 0, y: 0, opacity: 1, ...prop.animate?.(part, previous, time) }
  return {
    rotate: lerp(before.rotate, now.rotate, blend),
    x: lerp(before.x, now.x, blend),
    y: lerp(before.y, now.y, blend),
    opacity: lerp(before.opacity, now.opacity, blend),
  }
}

export const paperArtIndex: StyleArtIndex = {
  style: 'paper-glass',
  layers: Object.keys(paperLayers),
  props: Object.keys(paperProps),
  poses: Object.fromEntries(Object.entries(paperProps).map(([id, art]) => [id, art.poses])),
}
