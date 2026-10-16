import { useEffect } from 'react'
import { FrameMeter } from '../dev/FrameMeter'
import { gameClock } from '../engine/clock'
import { useSettings } from '../engine/settings'
import { MenuScreen } from '../screens/MenuScreen'
import { SceneScreen } from '../screens/SceneScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { StoryScreen } from '../screens/StoryScreen'
import { TitleScreen } from '../screens/TitleScreen'
import { launch } from './params'
import { useApp } from './store'

/**
 * A little hidden text in every font, so the browser prepares them all up front and a
 * style switch never pauses to lay out text in a font for the first time.
 */
function FontWarmup() {
  return (
    <div className="font-warmup" aria-hidden="true">
      {['font-a', 'font-b', 'font-b-italic', 'font-c', 'font-d', 'font-e'].map((name) => (
        <span key={name} className={name}>
          Golden Thread · 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz &amp; ’“”—…
        </span>
      ))}
    </div>
  )
}

const SCREENS = {
  title: TitleScreen,
  menu: MenuScreen,
  settings: SettingsScreen,
  scene: SceneScreen,
  story: StoryScreen,
} as const

/**
 * The game's top level. It shows the current screen, and puts the art style and comfort
 * settings on the <html> element so every part of the interface can follow them.
 */
export function App() {
  const screen = useApp((s) => s.screen)
  const saveStyle = useApp((s) => s.save?.style)
  const { lastStyle, textSize, highContrast, readableFont } = useSettings()
  const style = saveStyle ?? lastStyle

  useEffect(() => {
    const root = document.documentElement
    root.dataset.artStyle = style
    root.dataset.textSize = textSize
    root.dataset.contrast = highContrast ? 'high' : 'normal'
    root.dataset.readableFont = String(readableFont)
  }, [style, textSize, highContrast, readableFont])

  // The master clock runs for as long as the game is open.
  useEffect(() => {
    gameClock.start()
    return () => gameClock.stop()
  }, [])

  const Current = SCREENS[screen]
  return (
    <>
      <Current />
      <FontWarmup />
      {(import.meta.env.DEV || launch.meter) && <FrameMeter initiallyVisible={launch.meter} />}
    </>
  )
}
