import type { GameInput, Hint } from '../framework'

/**
 * Shared pieces of "Let there be…", the quiet interaction woven through the six days
 * (Level 1 script, Episode 1). It has no score, no timer and nothing to fail: each
 * gesture simply brings forth that day's works. Every gesture has a keyboard way, and
 * Space (or Enter) alone can do every day's action.
 */

export const HINTS = {
  light: { pointer: 'Press and hold anywhere to call the light.', keys: 'Hold Space to call the light.', gesture: 'hold' },
  firmament: { pointer: 'Swipe upward to lift the sky.', keys: 'Press Up (or Space) to lift the sky.', gesture: 'swipe-up' },
  land: { pointer: 'Drag upward to raise the land out of the sea.', keys: 'Press Up (or Space) to raise the land.', gesture: 'swipe-up' },
  plants: { pointer: 'Tap the land to make it green.', keys: 'Press Space to make the land green.', gesture: 'tap' },
  sun: { pointer: 'Drag the sun to the day side.', keys: 'Press Left (or Space) to set the sun in the day.', gesture: 'drag' },
  moon: { pointer: 'Drag the moon to the night side.', keys: 'Press Right (or Space) to set the moon in the night.', gesture: 'drag' },
  stars: { pointer: 'Sweep across the night sky.', keys: 'Hold Right (or Space) to scatter the stars.', gesture: 'sweep' },
  fish: { pointer: 'Swipe down into the sea.', keys: 'Press Down (or Space) to fill the sea.', gesture: 'swipe-down' },
  birds: { pointer: 'Swipe up into the sky.', keys: 'Press Up (or Space) to fill the sky.', gesture: 'swipe-up' },
  animals: { pointer: 'Tap each animal to welcome it.', keys: 'Press Space to welcome each animal.', gesture: 'tap' },
  rest: { pointer: 'Rest.', keys: 'Rest.', gesture: 'rest' },
} satisfies Record<string, Hint>

/** Smooth start and finish. */
export const smooth = (t: number) => {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

/** Quick start, gentle finish. */
export const outCubic = (t: number) => 1 - (1 - Math.min(1, Math.max(0, t))) ** 3

/** Moves `value` toward `target` by at most `amount`. */
export const toward = (value: number, target: number, amount: number) =>
  value < target ? Math.min(target, value + amount) : Math.max(target, value - amount)

/** Whether this step's inputs include pressing a key. */
export const pressed = (inputs: readonly GameInput[], ...keys: string[]) =>
  inputs.some((i) => i.kind === 'key' && i.down && keys.includes(i.key))

/** Whether this step's inputs include letting go of a key. */
export const released = (inputs: readonly GameInput[], ...keys: string[]) =>
  inputs.some((i) => i.kind === 'key' && !i.down && keys.includes(i.key))
