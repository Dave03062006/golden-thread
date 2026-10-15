import { useSyncExternalStore } from 'react'
import { prefersReducedMotion, useSettings } from '../engine/settings'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

const deviceWantsLess = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(QUERY).matches : false)

/** Whether to reduce motion: the player's setting, or the device's own preference. */
export function useReducedMotion(): boolean {
  const setting = useSettings((s) => s.reducedMotion)
  const device = useSyncExternalStore(subscribe, deviceWantsLess, () => false)
  return prefersReducedMotion(setting, device)
}
