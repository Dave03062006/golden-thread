/**
 * Turns the keyboard, mouse and touch into the same few game actions, so every screen
 * and minigame works the same way whatever the player is holding.
 */

export type Action = 'advance' | 'back' | 'pause' | 'up' | 'down' | 'left' | 'right'

export interface ActionEvent {
  action: Action
  source: 'keyboard' | 'pointer'
  /** Where a tap landed, from 0 to 1 across the element (pointer only). */
  x?: number
  y?: number
}

export type ActionListener = (event: ActionEvent) => void

const KEYS: Record<string, Action> = {
  ' ': 'advance',
  Enter: 'advance',
  Escape: 'pause',
  Backspace: 'back',
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
}

/** Keys pressed inside these elements belong to them (typing a name, pressing a button). */
function isOwnedByControl(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  return ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(target.tagName)
}

/** A press counts as a tap if it barely moved and was short. */
const TAP_MAX_MOVE_PX = 12
const TAP_MAX_MS = 500

export interface InputOptions {
  /** Keyboard events are read from here (usually `window`). */
  keyTarget: Pick<Window, 'addEventListener' | 'removeEventListener'>
  /** Taps are read from here (usually the scene's stage element). */
  pointerTarget?: HTMLElement
  now?: () => number
}

export interface Input {
  subscribe(listener: ActionListener): () => void
  dispose(): void
}

export function createInput({ keyTarget, pointerTarget, now = () => performance.now() }: InputOptions): Input {
  let listeners: ActionListener[] = []
  const emit = (event: ActionEvent) => {
    for (const listener of listeners) listener(event)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return
    if (isOwnedByControl(event.target)) return
    const action = KEYS[event.key] ?? KEYS[event.key.toLowerCase()]
    if (!action) return
    event.preventDefault()
    emit({ action, source: 'keyboard' })
  }

  let press: { x: number; y: number; at: number; id: number } | null = null
  const onPointerDown = (event: PointerEvent) => {
    if (!event.isPrimary || event.button > 0) return
    press = { x: event.clientX, y: event.clientY, at: now(), id: event.pointerId }
  }
  const onPointerUp = (event: PointerEvent) => {
    if (!press || event.pointerId !== press.id || !pointerTarget) return
    const moved = Math.hypot(event.clientX - press.x, event.clientY - press.y)
    const quick = now() - press.at <= TAP_MAX_MS
    press = null
    if (moved > TAP_MAX_MOVE_PX || !quick || isOwnedByControl(event.target)) return
    const rect = pointerTarget.getBoundingClientRect()
    emit({
      action: 'advance',
      source: 'pointer',
      x: rect.width ? (event.clientX - rect.left) / rect.width : 0,
      y: rect.height ? (event.clientY - rect.top) / rect.height : 0,
    })
  }
  const onPointerCancel = () => {
    press = null
  }

  keyTarget.addEventListener('keydown', onKeyDown as EventListener)
  pointerTarget?.addEventListener('pointerdown', onPointerDown)
  pointerTarget?.addEventListener('pointerup', onPointerUp)
  pointerTarget?.addEventListener('pointercancel', onPointerCancel)

  return {
    subscribe(listener) {
      listeners = [...listeners, listener]
      return () => {
        listeners = listeners.filter((l) => l !== listener)
      }
    },
    dispose() {
      keyTarget.removeEventListener('keydown', onKeyDown as EventListener)
      pointerTarget?.removeEventListener('pointerdown', onPointerDown)
      pointerTarget?.removeEventListener('pointerup', onPointerUp)
      pointerTarget?.removeEventListener('pointercancel', onPointerCancel)
      listeners = []
    },
  }
}
