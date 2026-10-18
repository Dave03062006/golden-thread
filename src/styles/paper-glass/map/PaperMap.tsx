import { useEffect, useState } from 'react'
import type { Projector } from '../../../map/core/geo'
import { rasterize } from '../raster'
import { reliefSvg } from './relief'
import './map.css'

/** The relief, drawn once into a picture for each size and kept. */
const pictures = new Map<number, Promise<string>>()

function reliefPicture(map: Projector, widthPx: number): Promise<string> {
  let picture = pictures.get(widthPx)
  if (!picture) {
    const heightPx = Math.round((widthPx * map.height) / map.width)
    picture = rasterize(reliefSvg(map), { x: 0, y: 0, w: map.width, h: map.height }, { widthPx, heightPx, shadowPx: 0 }).then(
      (canvas) => new Promise<string>((resolve) => canvas.toBlob((blob) => resolve(URL.createObjectURL(blob!)), 'image/png')),
    )
    pictures.set(widthPx, picture)
  }
  return picture
}

/** The world map's ground in Paper & Glass: the paper relief, as an image. */
export function PaperMap({ map, widthPx }: { map: Projector; widthPx: number }) {
  // Pictures come in steps of 400 pixels, so resizing doesn't redraw at every size.
  const size = Math.min(2400, Math.max(800, Math.ceil(widthPx / 400) * 400))
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    let live = true
    void reliefPicture(map, size).then((u) => live && setUrl(u))
    return () => {
      live = false
    }
  }, [map, size])
  return url ? <img className="paper-map-image" src={url} alt="" draggable={false} /> : <div className="paper-map-image paper-map-loading" />
}
