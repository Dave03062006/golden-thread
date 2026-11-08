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
import { theTowerOfBabelLayers } from './layers/the-tower-of-babel'
import { theTowerOfBabelProps } from './props/the-tower-of-babel'
import { fromShemToAbramLayers } from './layers/from-shem-to-abram'
import { fromShemToAbramProps } from './props/from-shem-to-abram'
import { theCallLayers } from './layers/the-call'
import { theCallProps } from './props/the-call'
import { lotChoosesLayers } from './layers/lot-chooses'
import { lotChoosesProps } from './props/lot-chooses'
import { melchizedekLayers } from './layers/melchizedek'
import { melchizedekProps } from './props/melchizedek'
import { countTheStarsLayers } from './layers/count-the-stars'
import { countTheStarsProps } from './props/count-the-stars'
import { hagarLayers } from './layers/hagar'
import { hagarProps } from './props/hagar'
import { mamreProps } from './props/mamre'
import { sodomLayers } from './layers/sodom'
import { sodomProps } from './props/sodom'
import { isaacBornProps } from './props/isaac-born'
import { moriahLayers } from './layers/moriah'
import { moriahProps } from './props/moriah'
import { worldGoneWrongProps } from './props/world-gone-wrong'
import { aBrideProps } from './props/a-bride'
import { birthrightProps } from './props/birthright'
import { blessingLayers } from './layers/blessing'
import { bethelLayers } from './layers/bethel'
import { bethelProps } from './props/bethel'
import { rachelAndLeahProps } from './props/rachel-and-leah'
import { jabbokLayers } from './layers/jabbok'
import { jabbokProps } from './props/jabbok'
import { reconciledProps } from './props/reconciled'
import { soldLayers } from './layers/sold'
import { soldProps } from './props/sold'
import { faithfulLayers } from './layers/faithful'
import { faithfulProps } from './props/faithful'
import { pharaohLayers } from './layers/pharaoh'
import { pharaohProps } from './props/pharaoh'
import { grainLayers } from './layers/grain'
import { grainProps } from './props/grain'
import { silverCupProps } from './props/silver-cup'
import { goshenLayers } from './layers/goshen'
import { goshenProps } from './props/goshen'
import { blessingsProps } from './props/blessings'
import { uzLayers } from './layers/uz'
import { uzProps } from './props/uz'
import { whirlwindProps } from './props/whirlwind'
import { exodusLayers } from './layers/exodus'
import { exodusProps } from './props/exodus'
import { plaguesLayers } from './layers/plagues'
import { plaguesProps } from './props/plagues'
import { crossingLayers } from './layers/crossing'
import { crossingProps } from './props/crossing'
import { sinaiLayers } from './layers/sinai'
import { sinaiProps } from './props/sinai'
import { tabernacleLayers } from './layers/tabernacle'
import { tabernacleProps } from './props/tabernacle'
import { wildernessLayers } from './layers/wilderness'
import { wildernessProps } from './props/wilderness'
import { moabLayers } from './layers/moab'
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
  theTowerOfBabelLayers,
  fromShemToAbramLayers,
  theCallLayers,
  lotChoosesLayers,
  melchizedekLayers,
  countTheStarsLayers,
  hagarLayers,
  sodomLayers,
  moriahLayers,
  blessingLayers,
  bethelLayers,
  jabbokLayers,
  soldLayers,
  faithfulLayers,
  pharaohLayers,
  grainLayers,
  goshenLayers,
  uzLayers,
  exodusLayers,
  plaguesLayers,
  crossingLayers,
  sinaiLayers,
  tabernacleLayers,
  wildernessLayers,
  moabLayers,
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
  theTowerOfBabelProps,
  fromShemToAbramProps,
  theCallProps,
  lotChoosesProps,
  melchizedekProps,
  countTheStarsProps,
  hagarProps,
  mamreProps,
  sodomProps,
  isaacBornProps,
  moriahProps,
  aBrideProps,
  birthrightProps,
  bethelProps,
  rachelAndLeahProps,
  jabbokProps,
  reconciledProps,
  soldProps,
  faithfulProps,
  pharaohProps,
  grainProps,
  silverCupProps,
  goshenProps,
  blessingsProps,
  uzProps,
  whirlwindProps,
  exodusProps,
  plaguesProps,
  crossingProps,
  sinaiProps,
  tabernacleProps,
  wildernessProps,
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
