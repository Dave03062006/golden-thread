import { useEffect, useRef, useState } from 'react'
import { useApp } from '../app/store'
import { gameClock } from '../engine/clock'
import { createInput } from '../engine/input'
import { useSettings } from '../engine/settings'
import { demoScene } from '../scene/demo'
import { Stage } from '../stage/Stage'
import { STYLE_NAMES, otherStyle } from '../styles/ids'
import { Button, Dialog } from '../ui/components'
import { useReducedMotion } from '../ui/useReducedMotion'
import './screens.css'

/** How often play time is written to the save while playing, in seconds. */
const AUTOSAVE_SECONDS = 30

/**
 * The scene screen. In milestone 1 it shows the demo scene; from milestone 2 it becomes
 * the story player.
 */
export function SceneScreen() {
  const save = useApp((s) => s.save)
  const changeSave = useApp((s) => s.changeSave)
  const commit = useApp((s) => s.commit)
  const checkpoint = useApp((s) => s.checkpoint)
  const addPlayTime = useApp((s) => s.addPlayTime)
  const go = useApp((s) => s.go)
  const openSettings = useApp((s) => s.openSettings)
  const closeSave = useApp((s) => s.closeSave)
  const updateSettings = useSettings((s) => s.update)
  const reducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  // Entering the scene is a checkpoint.
  useEffect(() => {
    checkpoint({ level: 'demo', episode: 'demo', scene: demoScene.id })
  }, [checkpoint])

  // Count play time, and write it to the save every so often.
  useEffect(() => {
    let sinceSave = 0
    return gameClock.subscribe(({ dt }) => {
      addPlayTime(dt)
      sinceSave += dt
      if (sinceSave >= AUTOSAVE_SECONDS) {
        sinceSave = 0
        commit()
      }
    })
  }, [addPlayTime, commit])

  // Pausing freezes the scene's clock. Menus keep moving.
  useEffect(() => {
    if (paused) gameClock.pause()
    else gameClock.resume()
    return () => gameClock.resume()
  }, [paused])

  // Escape (or the pause button) opens the pause menu.
  useEffect(() => {
    const input = createInput({ keyTarget: window, pointerTarget: stageRef.current ?? undefined })
    const off = input.subscribe((event) => {
      if (event.action === 'pause') setPaused(true)
    })
    return () => {
      off()
      input.dispose()
    }
  }, [])

  if (!save) return null

  const switchStyle = () => {
    const next = otherStyle(save.style)
    changeSave({ style: next })
    updateSettings({ lastStyle: next })
    commit()
  }

  return (
    <main className="screen-scene" ref={stageRef}>
      <Stage scene={demoScene} style={save.style} reducedMotion={reducedMotion}>
        <div className="scene-hud">
          <Button variant="quiet" className="hud-button" onClick={switchStyle}>
            Switch to {STYLE_NAMES[otherStyle(save.style)]}
          </Button>
          <Button variant="quiet" className="hud-button" onClick={() => setPaused(true)} aria-label="Pause">
            Pause
          </Button>
        </div>
        <div className="scene-caption" aria-live="polite">
          <p className="scene-caption-kicker">Milestone 1 · demo scene</p>
          <p className="scene-caption-title">{demoScene.title}</p>
        </div>
      </Stage>

      <div className="rotate-prompt" role="alert">
        <p>Turn your phone sideways to play.</p>
      </div>

      <Dialog open={paused} title="Paused" onClose={() => setPaused(false)}>
        <div className="pause-actions">
          <Button variant="primary" onClick={() => setPaused(false)}>
            Resume
          </Button>
          <Button
            onClick={async () => {
              setPaused(false)
              await closeSave()
            }}
          >
            Save &amp; quit
          </Button>
          <Button onClick={() => openSettings()}>Settings</Button>
          <Button
            variant="quiet"
            onClick={async () => {
              setPaused(false)
              await commit()
              go('menu')
            }}
          >
            Main menu
          </Button>
        </div>
      </Dialog>
    </main>
  )
}
