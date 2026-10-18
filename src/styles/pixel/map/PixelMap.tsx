import { useEffect, useRef } from 'react'
import type { Projector } from '../../../map/core/geo'
import { drawPixelMap } from './draw'
import './map.css'

let picture: HTMLCanvasElement | null = null

/** The world map's ground in pixel art: the little pixel map, enlarged with hard edges. */
export function PixelMap({ map }: { map: Projector }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    picture ??= drawPixelMap(map).toCanvas()
    canvas.width = picture.width
    canvas.height = picture.height
    canvas.getContext('2d')!.drawImage(picture, 0, 0)
  }, [map])
  return <canvas ref={ref} className="pixel-map-canvas" />
}
