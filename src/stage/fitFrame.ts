/** The largest 16:9 box that fits inside the space given. */
export function fitFrame(width: number, height: number) {
  const frameWidth = Math.min(width, (height * 16) / 9)
  return { width: Math.floor(frameWidth), height: Math.floor((frameWidth * 9) / 16) }
}
