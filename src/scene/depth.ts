/**
 * The order to draw a layer's actors in. Things that walk about on the ground (people and
 * animals) are drawn in depth order: whoever stands lower on screen is nearer, so in front.
 * Everything else keeps its place in the scene's list, so a lamp stays on its table and an ark
 * on its cart. Ties keep the scene's order, so nothing moves unless the walkers really stand at
 * different depths.
 */
export function inDepthOrder<T extends { y: number }>(actors: readonly T[], walks: (actor: T) => boolean): T[] {
  const slots: number[] = []
  actors.forEach((actor, i) => walks(actor) && slots.push(i))
  // Array.prototype.sort is stable, so walkers at the same depth keep their order.
  const sorted = slots.map((i) => actors[i]!).sort((a, b) => a.y - b.y)
  const order = [...actors]
  slots.forEach((slot, k) => (order[slot] = sorted[k]!))
  return order
}
