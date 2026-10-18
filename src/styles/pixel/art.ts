import type { StyleArtIndex } from '../contract'
import type { PixelBuffer } from './buffer'
import type { FadeOrder } from './dither-fade'
import type { Painter } from './frame'
import { brothers } from './characters/brothers'
import { people } from './characters/people'
import { creationLayers } from './layers/creation'
import { demoLayers } from './layers/demo'
import { homeLayers } from './layers/home'
import { exileLayers } from './layers/exile'
import { fallLayers } from './layers/fall'
import { generationsLayers } from './layers/generations'
import { gardenLayers } from './layers/garden'
import { animals } from './props/animals'
import { creationProps } from './props/creation'
import { dove } from './props/dove'
import { homeProps } from './props/home'
import { exileProps } from './props/exile'
import { fallProps } from './props/fall'
import { generationsProps } from './props/generations'
import { gardenProps } from './props/garden'
import { worldGoneWrongLayers } from './layers/world-gone-wrong'
import { buildingTheArkLayers } from './layers/building-the-ark'
import { arkProps } from './props/ark'
import { theFloodLayers } from './layers/the-flood'
import { theFloodProps } from './props/the-flood'
import { worldGoneWrongProps } from './props/world-gone-wrong'
import { familyOfNoah } from './characters/family-of-noah'

export { LAYER_H, LAYER_W, MARGIN_X, MARGIN_Y, PX_H, PX_W, type Painter } from './frame'

/**
 * Pixel art for scenes. Layers are drawn once (see frame.ts for their size); props are
 * either hand-made sprites or drawn every frame by code.
 */

export interface PixelLayerArt {
  /** Draws the still part of the layer, once. Coordinates are in the 368 × 208 layer canvas. */
  draw(buf: PixelBuffer): void
  /** Draws the moving bits (glints, twinkles) every frame, in layer-canvas coordinates. */
  animate?(paint: Painter, time: number): void
  /** How it fades in and out: a veil of shading fades in the ordered pattern (see dither-fade.ts). */
  fade?: FadeOrder
}

/**
 * A sprite: frames drawn as text grids, where each letter is a color and '.' is empty.
 * This keeps hand-made pixel art readable in code. Each pose has its own frames.
 */
export interface PixelSpriteArt {
  kind: 'sprite'
  poses: Record<string, { frames: string[][]; fps: number }>
  colors: Record<string, string>
  /** Which way the drawing faces: -1 left, 1 right. */
  facing: -1 | 1
  /** Where the actor's place is on the sprite: its middle, or the middle of its base. */
  anchor?: 'center' | 'base'
}

/** What a drawn prop knows about itself when it's drawn. */
export interface DrawnState {
  time: number
  /** How far it has grown, from 0 to 1. */
  grow: number
  facing: -1 | 1
  pose: string
  /** Its width in art pixels (its size in the scene × 320). */
  width: number
  /** The part of the screen that's visible, in art pixels around the prop's anchor, so big props can skip what's off screen. */
  clip: { left: number; right: number; top: number; bottom: number }
}

/**
 * A prop drawn by code, around its anchor point at (0, 0). Its look is drawn once into a
 * small picture and reused until it changes, which it does at most `fps` times a second
 * (a ray turning, a branch swaying). Props that change size every frame and can cover the
 * whole screen, like the flood of light, are drawn straight onto the screen instead.
 */
export interface PixelDrawnArt {
  kind: 'drawn'
  poses: string[]
  anchor?: 'center' | 'base'
  /** How many times a second its look changes. 0 for a still prop. */
  fps?: number
  /** Its animation repeats every this many seconds, so its pictures can be reused. */
  loop?: number
  /** Draw it straight onto the screen every frame, instead of keeping pictures of it. */
  live?: boolean
  draw(paint: Painter, state: DrawnState): void
}

export type PixelPropArt = PixelSpriteArt | PixelDrawnArt

export const pixelLayers: Record<string, PixelLayerArt> = { ...demoLayers, ...creationLayers, ...gardenLayers, ...fallLayers, ...exileLayers, ...homeLayers, ...generationsLayers, ...worldGoneWrongLayers, ...buildingTheArkLayers, ...theFloodLayers }

export const pixelProps: Record<string, PixelPropArt> = { dove, ...creationProps, ...animals, ...gardenProps, ...fallProps, ...exileProps, ...homeProps, ...generationsProps, ...people, ...brothers, ...worldGoneWrongProps, ...familyOfNoah, ...arkProps, ...theFloodProps }

export function posesOf(art: PixelPropArt): string[] {
  return art.kind === 'sprite' ? Object.keys(art.poses) : art.poses
}

export const pixelArtIndex: StyleArtIndex = {
  style: 'pixel',
  layers: Object.keys(pixelLayers),
  props: Object.keys(pixelProps),
  poses: Object.fromEntries(Object.entries(pixelProps).map(([id, art]) => [id, posesOf(art)])),
}
