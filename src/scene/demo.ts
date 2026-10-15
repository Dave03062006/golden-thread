import type { SceneDescription } from './types'

/**
 * The milestone 1 demo: evening over the waters, with a dove gliding across while the
 * camera drifts slowly through the layers. It proves the renderers, the depth effect and
 * live style switching before any story content exists.
 */
export const demoScene: SceneDescription = {
  id: 'demo-evening-waters',
  title: 'Evening over the waters',
  layers: [
    { id: 'evening-sky', depth: 0 },
    { id: 'evening-clouds', depth: 0.08, sway: { x: 0.008, seconds: 16 } },
    { id: 'far-hills', depth: 0.2 },
    { id: 'water-back', depth: 0.45, sway: { x: 0.012, seconds: 9 } },
    { id: 'water-mid', depth: 0.7, sway: { x: 0.016, seconds: 7 } },
    { id: 'water-front', depth: 1, sway: { x: 0.02, seconds: 6 } },
  ],
  actors: [
    {
      id: 'dove',
      prop: 'dove',
      above: 'water-mid',
      size: 0.1,
      x: 0,
      y: 0,
      path: {
        loopSeconds: 16,
        x: [
          { at: 0, value: 1.15 },
          { at: 14, value: -0.15, ease: 'linear' },
        ],
        y: [
          { at: 0, value: 0.34 },
          { at: 4.5, value: 0.27 },
          { at: 9, value: 0.33 },
          { at: 14, value: 0.29 },
        ],
      },
    },
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.03 },
      { at: 12, value: 0.035, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 12, value: -0.012, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 12, value: 1.07, ease: 'smoother' },
    ],
  },
}
