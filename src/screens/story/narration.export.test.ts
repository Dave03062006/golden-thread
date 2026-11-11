import { mkdirSync, writeFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { LEVELS } from '../../content/catalog'
import { narrationId, spokenText } from './speech'

/**
 * Lists every line the story reads aloud, by its recording's name, for scripts/narrate.py
 * (run on demand: EXPORT=1 npx vitest run src/screens/story/narration.export.test.ts).
 */
describe.skipIf(!process.env.EXPORT)('narration lines (export)', () => {
  it('writes media/voice/lines.json', () => {
    const lines: Record<string, string> = {}
    for (const level of LEVELS)
      for (const episode of level.episodes)
        for (const scene of episode.scenes)
          for (const beat of scene.beats) {
            const text = spokenText(beat)
            if (text) lines[narrationId(text)] = text
          }
    mkdirSync('media/voice', { recursive: true })
    writeFileSync('media/voice/lines.json', JSON.stringify(lines, null, 1))
    console.log(`${Object.keys(lines).length} lines to record`)
    expect(Object.keys(lines).length).toBeGreaterThan(0)
  })
})
