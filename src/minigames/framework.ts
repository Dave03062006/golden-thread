import type { SceneFrame } from '../scene/evaluate'
import type { Cue } from '../scene/types'

/**
 * The shape every interactive moment shares (spec §13.7). A game's rules are plain
 * TypeScript: they start, advance in fixed steps with whatever the player did, and say
 * what to show. They never draw anything themselves: what they show is a set of values
 * for the scene's channels (the light's size, the land's height), which both art styles
 * then draw. That's why a test can play a game with scripted input and no screen.
 */

/** Rules advance in fixed steps of 1/120 s, so games behave the same at 60 Hz and 120 Hz. */
export const STEP = 1 / 120

/** The keys a game understands. 'primary' is Space or Enter: the one-button way to play. */
export type GameKey = 'up' | 'down' | 'left' | 'right' | 'primary'

export type GameInput =
  /** A finger or the mouse, at a point in the frame (0–1 across and down). */
  | { kind: 'pointer'; phase: 'down' | 'move' | 'up'; x: number; y: number }
  | { kind: 'key'; key: GameKey; down: boolean }

export interface GameContext {
  /** Gentle mode: slower and more forgiving, so nobody gets stuck (spec §9.7). */
  gentle: boolean
  /** The scene as it is right now, to find where things are on screen. */
  frame(): SceneFrame
}

/** What the player is asked to do, by input method. */
export interface Hint {
  pointer: string
  keys: string
  /** Which gesture the on-screen guide shows. */
  gesture: 'hold' | 'swipe-up' | 'swipe-down' | 'drag' | 'sweep' | 'tap' | 'rest'
}

/** What a game shows at one moment. */
export interface GameView {
  /** Values for scene channels (see scene/timeline.ts), blended smoothly between steps. */
  live: Record<string, number>
  /** The current instruction, or none. */
  hint: Hint | null
  /** Little sparkles to show where the player's hand has passed, in frame coordinates. */
  marks?: { x: number; y: number; age: number }[]
  /** For a quiet moment of rest: whether the player may now move on. */
  restReady?: boolean
  /** Whether the interaction is finished. */
  done: boolean
}

export interface GameRules<State> {
  id: string
  start(context: GameContext): State
  /**
   * Advances one fixed step with the inputs that arrived since the last one. `emit`
   * starts story cues at this very step, like an animal setting off when it's tapped.
   */
  step(state: State, inputs: readonly GameInput[], context: GameContext, emit: (cue: Cue) => void): State
  view(state: State, context: GameContext): GameView
}

/** Rules without their state type, for a registry of games. */
// oxlint-disable-next-line no-explicit-any -- each game keeps its own state type; the runner never looks inside it
export type AnyGameRules = GameRules<any>
