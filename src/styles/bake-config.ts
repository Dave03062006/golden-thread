/**
 * Art is "baked": drawn once by `npm run bake` into image files under public/art/, so
 * the game only has to load pictures, which the browser decodes off the main thread.
 * That keeps preparing a scene in the background from ever interrupting the animation.
 *
 * Paper layers are baked for a few frame widths (in device pixels); the game picks the
 * nearest size up. Paper puppet parts are baked at a few widths too.
 */
export const PAPER_FRAME_WIDTHS = [1280, 1920, 2560] as const
export const PAPER_PART_WIDTHS = [160, 320, 640] as const

/** The widest image we make for one layer, in device pixels. */
export const MAX_LAYER_PX = 2048

export const ART_BASE = '/art'

export const paperLayerFile = (id: string, frameWidth: number) => `paper/layers/${id}@${frameWidth}.webp`
export const paperPartFile = (prop: string, part: string, width: number) => `paper/props/${prop}/${part}@${width}.webp`
export const pixelLayerFile = (id: string) => `pixel/layers/${id}.png`

/**
 * The main background behind the menus (heaven and earth), baked at a few widths for
 * Paper & Glass; it covers the whole screen, so a phone held upright needs the widest.
 */
export const BACKDROP_WIDTHS = [1280, 1920, 2560, 3200] as const
export const paperBackdropFile = (width: number) => `paper/backdrop/heaven-and-earth@${width}.webp`
export const pixelBackdropFile = 'pixel/backdrop/heaven-and-earth.png'

/** The smallest baked size that is at least `needed`, or the biggest there is. */
export function pickSize(sizes: readonly number[], needed: number): number {
  return sizes.find((size) => size >= needed) ?? sizes[sizes.length - 1]!
}
