import { describe, expect, it } from 'vitest'
import { pickVoice, rankVoices } from './voice'

const voices = [
  { name: 'Microsoft David - English (United States)', lang: 'en-US' },
  { name: 'Microsoft Zira - English (United States)', lang: 'en-US' },
  { name: 'Microsoft Aria Online (Natural) - English (United States)', lang: 'en-US' },
  { name: 'Microsoft Christopher Online (Natural) - English (United States)', lang: 'en-US' },
  { name: 'Microsoft Hoda - Arabic (Egypt)', lang: 'ar-EG' },
]

describe('the read-aloud voice', () => {
  it('prefers a natural voice to a robotic system one, and a warm reader among them', () => {
    expect(rankVoices(voices).map((v) => v.name.split(' ')[1])).toEqual(['Christopher', 'Aria', 'David', 'Zira'])
  })

  it('keeps the player’s choice, if the device still has it', () => {
    expect(pickVoice(voices, 'Microsoft Zira - English (United States)')?.name).toContain('Zira')
    expect(pickVoice(voices, 'A voice from another device')?.name).toContain('Christopher')
  })

  it('reads only in English', () => {
    expect(pickVoice([{ name: 'Microsoft Hoda - Arabic (Egypt)', lang: 'ar-EG' }], null)).toBeUndefined()
  })
})
