import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react'
import { gameClock } from '../engine/clock'
import { demoScene } from '../scene/demo'
import { evaluateScene } from '../scene/evaluate'
import { fitFrame } from '../stage/fitFrame'
import { STYLE_IDS, STYLE_NAMES, type StyleId } from '../styles/ids'
import { PaperRenderer } from '../styles/paper-glass/PaperRenderer'
import { PixelRenderer } from '../styles/pixel/PixelRenderer'
import '../stage/stage.css'
import './style-chooser.css'

const RENDERERS = { 'paper-glass': PaperRenderer, pixel: PixelRenderer } as const

const ABOUT: Record<StyleId, string> = {
  'paper-glass': 'Layered paper scenes and stained glass, soft and painterly.',
  pixel: 'Bright pixel art, like a classic adventure game.',
}

/** One style's live preview: the dove over the evening waters, playing as it does in the game. */
function Preview({ style }: { style: StyleId }) {
  const box = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [ready, setReady] = useState(false)
  const start = useRef(gameClock.time)

  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => setSize(fitFrame(el.clientWidth, el.clientHeight))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const getFrame = useCallback(() => evaluateScene(demoScene, gameClock.time - start.current), [])
  const onReady = useCallback(() => setReady(true), [])
  const Renderer = RENDERERS[style]

  return (
    <div className="style-preview" ref={box} data-ready={ready || undefined}>
      {size.width > 0 && (
        <div className="style-preview-frame" style={{ width: size.width, height: size.height }}>
          <div className="stage-renderer">
            <Renderer scene={demoScene} getFrame={getFrame} width={size.width} height={size.height} dpr={window.devicePixelRatio || 1} active onReady={onReady} />
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Choosing an art style for a new game (spec §9.4): both styles side by side, each a live
 * preview of the dove scene. They are real radio buttons, so the keyboard and screen
 * readers choose as they would any option. The style can be changed later at any time.
 */
export function StyleChooser({ value, onChange }: { value: StyleId; onChange: (style: StyleId) => void }) {
  const name = useId()
  return (
    <fieldset className="style-chooser">
      <legend>Choose a look</legend>
      <div className="style-chooser-options">
        {STYLE_IDS.map((style) => (
          <label key={style} className="style-option" data-style={style}>
            <Preview style={style} />
            <span className="style-option-text">
              <input type="radio" name={name} value={style} checked={style === value} onChange={() => onChange(style)} />
              <strong>{STYLE_NAMES[style]}</strong>
              <small>{ABOUT[style]}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
