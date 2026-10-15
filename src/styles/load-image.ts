import { ART_BASE } from './bake-config'

const cache = new Map<string, Promise<HTMLImageElement>>()

/**
 * Loads a baked art image and waits until it's decoded. Decoding happens off the main
 * thread, so this never interrupts animation.
 */
export function loadArt(path: string): Promise<HTMLImageElement> {
  let job = cache.get(path)
  if (!job) {
    job = (async () => {
      const image = new Image()
      image.decoding = 'async'
      image.draggable = false
      image.alt = ''
      image.src = `${ART_BASE}/${path}`
      await image.decode()
      return image
    })()
    cache.set(path, job)
    job.catch(() => cache.delete(path))
  }
  return job
}
