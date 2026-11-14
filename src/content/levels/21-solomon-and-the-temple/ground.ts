/**
 * The height of the ground in the Kidron valley backdrop (Level 19's "kidron-olives"), so people
 * can stand on its slopes: the same points the backdrop is drawn through.
 */
const KIDRON: [number, number][] = [[0, 0.56], [0.14, 0.6], [0.3, 0.78], [0.44, 0.86], [0.58, 0.76], [0.72, 0.6], [0.84, 0.44], [1, 0.5]]

export function kidronGround(x: number): number {
  const k = Math.max(1, KIDRON.findIndex(([px]) => px >= x))
  const [x1, y1] = KIDRON[k - 1]!
  const [x2, y2] = KIDRON[k]!
  return Math.round((y1 + ((x - x1) / (x2 - x1)) * (y2 - y1) + 0.009) * 1000) / 1000
}
