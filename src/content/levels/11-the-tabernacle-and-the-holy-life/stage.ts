import { actor, layer } from '../../../scene/build'
import type { CameraTrack, SceneActor } from '../../../scene/types'

/**
 * What Level 11's seven episodes share: the tabernacle itself, and a few helpers for
 * writing their scenes.
 *
 * The tabernacle is drawn as one picture in its court, 400 units wide (the art's own units,
 * in styles/*\/props/tabernacle.ts), and each of its pieces is an actor of the prop
 * 'tabernacle-piece', drawn in its own place in that picture. Actors with the same x, y and
 * size fit together into the whole tabernacle, cut away at the side so the ark, the table
 * and the lampstand can be seen inside; one piece alone can stand anywhere, moved by
 * `pieceX` so it lands where it's wanted.
 */

/** The pieces in the order Moses set them up (Exodus 40:17–33), the order of the play "raise the tabernacle". */
export const PIECES = ['frames', 'coverings', 'ark', 'veil', 'table', 'lampstand', 'incense', 'screen', 'altar', 'laver', 'court'] as const
export type Piece = (typeof PIECES)[number] | 'tent'

/** Where the middle of each piece is across the 400-unit picture (the closed tent covers the frames and coverings). */
export const PIECE_AT: Record<Piece, number> = { frames: 145, coverings: 145, tent: 145, ark: 70, veil: 105, table: 140, lampstand: 178, incense: 215, screen: 250, laver: 285, altar: 335, court: 200 }

/** The x for an actor of `piece`, so that the piece itself stands at `x` when the picture is `size` wide. */
export const pieceX = (piece: Piece, x: number, size: number) => Math.round((x - ((PIECE_AT[piece] - 200) / 400) * size) * 10000) / 10000

/** The tabernacle in its court, as actors: the closed tent, or every piece of the cutaway. */
export function tabernacle(prefix: string, above: string, at: { x: number; y: number; size: number }, pieces: readonly Piece[], extra: Partial<SceneActor> = {}): SceneActor[] {
  return pieces.map((piece) => ({ id: `${prefix}-${piece}`, prop: 'tabernacle-piece', above, x: at.x, y: at.y, size: at.size, pose: piece, ...extra }))
}

/** A person standing on the plain before the mountain. */
export const personOn =
  (above: string, y = 0.785) =>
  (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above, x, y, size: 0.044, facing: -1, ...extra })

/** The camera's own slow drift, as in every level. */
export const DRIFT: CameraTrack = {
  loop: 'pingpong',
  x: [
    { at: 0, value: -0.004 },
    { at: 20, value: 0.004, ease: 'smoother' },
  ],
  y: [
    { at: 0, value: 0 },
    { at: 20, value: -0.003, ease: 'smoother' },
  ],
  zoom: [
    { at: 0, value: 1 },
    { at: 20, value: 1.008, ease: 'smoother' },
  ],
}

export const slow = { seconds: 5, ease: 'inOutSine' } as const
export const fadeIn = (id: string, delay = 0, to = 1) => actor(id, { opacity: to }, { seconds: 2, delay })
export const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2, delay })
export const fadeLayer = (id: string, to: number, delay = 0) => layer(id, { opacity: to }, { seconds: 3, ease: 'inOutSine', delay })
export const swap = (from: string, to: string, delay = 0) => [fadeLayer(from, 0, delay), fadeLayer(to, 1, delay)]
/** A walk to somewhere, then standing still. */
export const walk = (id: string, to: { x: number; y?: number; facing?: -1 | 1 }, seconds = 3, delay = 0) => [
  actor(id, { ...to, pose: 'walk' }, { seconds, ease: 'inOutSine', delay }),
  actor(id, { pose: 'idle' }, { seconds: 0.4, delay: delay + seconds }),
]
/** A pose held for a while, then back to standing. */
export const pose = (id: string, name: string, delay = 0, hold = 4) => [actor(id, { pose: name }, { seconds: 0.8, delay }), actor(id, { pose: 'idle' }, { seconds: 0.8, delay: delay + hold })]
