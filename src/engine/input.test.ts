import { afterEach, describe, expect, it } from 'vitest'
import { createInput, type ActionEvent } from './input'

function setup() {
  const stage = document.createElement('div')
  document.body.append(stage)
  stage.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 100 }) as DOMRect
  let time = 0
  const input = createInput({ keyTarget: window, pointerTarget: stage, now: () => time })
  const events: ActionEvent[] = []
  input.subscribe((e) => events.push(e))
  return { stage, input, events, setTime: (t: number) => (time = t) }
}

function key(name: string, init: KeyboardEventInit = {}) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: name, cancelable: true, ...init }))
}

function pointer(target: Element, type: string, x: number, y: number) {
  const event = new MouseEvent(type, { clientX: x, clientY: y, bubbles: true }) as unknown as PointerEvent
  Object.defineProperty(event, 'pointerId', { value: 1 })
  Object.defineProperty(event, 'isPrimary', { value: true })
  target.dispatchEvent(event)
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('input', () => {
  it('maps keys to actions', () => {
    const { events, input } = setup()
    key(' ')
    key('Escape')
    key('ArrowLeft')
    key('W')
    expect(events.map((e) => e.action)).toEqual(['advance', 'pause', 'left', 'up'])
    input.dispose()
  })

  it('ignores held-down repeats and shortcuts', () => {
    const { events, input } = setup()
    key(' ', { repeat: true })
    key('a', { ctrlKey: true })
    expect(events).toEqual([])
    input.dispose()
  })

  it('leaves keys alone inside text fields and buttons', () => {
    const { events, input } = setup()
    const field = document.createElement('input')
    document.body.append(field)
    field.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
    expect(events).toEqual([])
    input.dispose()
  })

  it('turns a quick tap into advance with its position', () => {
    const { stage, events, input, setTime } = setup()
    pointer(stage, 'pointerdown', 50, 25)
    setTime(100)
    pointer(stage, 'pointerup', 52, 26)
    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({ action: 'advance', source: 'pointer' })
    expect(events[0]?.x).toBeCloseTo(0.26)
    expect(events[0]?.y).toBeCloseTo(0.26)
    input.dispose()
  })

  it('does not treat a drag or a long press as a tap', () => {
    const { stage, events, input, setTime } = setup()
    pointer(stage, 'pointerdown', 10, 10)
    pointer(stage, 'pointerup', 80, 10)
    pointer(stage, 'pointerdown', 10, 10)
    setTime(900)
    pointer(stage, 'pointerup', 10, 10)
    expect(events).toEqual([])
    input.dispose()
  })

  it('stops listening after dispose', () => {
    const { events, input } = setup()
    input.dispose()
    key(' ')
    expect(events).toEqual([])
  })
})
