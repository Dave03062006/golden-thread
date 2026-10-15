import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ALL_SCENES } from '../scene/registry'
import manifest from './art-manifest.json'
import { paperLayerHash, paperPropHash, pixelLayerHash } from './art-hashes'
import { PAPER_FRAME_WIDTHS, PAPER_PART_WIDTHS, paperLayerFile, paperPartFile, pixelLayerFile } from './bake-config'
import { paperLayers, paperProps } from './paper-glass/art'
import { pixelLayers } from './pixel/art'

// The finished game loads baked art. If art changes without `npm run bake`, these fail.
const layerIds = [...new Set(ALL_SCENES.flatMap((s) => s.layers.map((l) => l.id)))]
const propIds = [...new Set(ALL_SCENES.flatMap((s) => s.actors.map((a) => a.prop)))]
const baked = (path: string) => existsSync(`public/art/${path}`)

describe('baked art is up to date (if not, run `npm run bake`)', () => {
  it.each(layerIds)('paper layer %s', (id) => {
    expect(manifest.paperLayers[id as keyof typeof manifest.paperLayers]?.hash).toBe(paperLayerHash(paperLayers[id]!))
    for (const width of PAPER_FRAME_WIDTHS) expect(baked(paperLayerFile(id, width))).toBe(true)
  })

  it.each(layerIds)('pixel layer %s', (id) => {
    expect(manifest.pixelLayers[id as keyof typeof manifest.pixelLayers]?.hash).toBe(pixelLayerHash(pixelLayers[id]!))
    expect(baked(pixelLayerFile(id))).toBe(true)
  })

  it.each(propIds)('paper prop %s', (id) => {
    const art = paperProps[id]!
    expect(manifest.paperProps[id as keyof typeof manifest.paperProps]?.hash).toBe(paperPropHash(art))
    for (const width of PAPER_PART_WIDTHS) for (const part of art.parts) expect(baked(paperPartFile(id, part.id, width))).toBe(true)
  })
})
