import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_SETTINGS, prefersReducedMotion, useSettings } from './settings'

beforeEach(() => {
  useSettings.getState().reset()
  localStorage.clear()
})

describe('device settings', () => {
  it('start from the defaults', () => {
    const { update: _u, reset: _r, ...settings } = useSettings.getState()
    expect(settings).toEqual(DEFAULT_SETTINGS)
  })

  it('remember changes between visits', () => {
    useSettings.getState().update({ textSize: 'larger', gentleMode: true })
    const stored = JSON.parse(localStorage.getItem('golden-thread-settings') ?? '{}')
    expect(stored.state.textSize).toBe('larger')
    expect(stored.state.gentleMode).toBe(true)
    expect(stored.state.update).toBeUndefined()
  })
})

describe('prefersReducedMotion', () => {
  it('follows the device unless the player chose', () => {
    expect(prefersReducedMotion('system', true)).toBe(true)
    expect(prefersReducedMotion('system', false)).toBe(false)
    expect(prefersReducedMotion('on', false)).toBe(true)
    expect(prefersReducedMotion('off', true)).toBe(false)
  })
})
