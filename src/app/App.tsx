import { Suspense, lazy, useEffect, type ComponentType } from 'react'
import { installAudio, setMusicPlace } from './audio'
import { FrameMeter } from '../dev/FrameMeter'
import { gameClock } from '../engine/clock'
import { useSettings } from '../engine/settings'
import { MenuScreen } from '../screens/MenuScreen'
import { NowPlaying } from '../ui/MusicCards'
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

/**
 * The other screens are loaded the first time they're needed, so the title appears
 * quickly (spec §10). Once the title is showing, they're fetched in the background (see
 * `preloadScreens`), so opening one later doesn't wait.
 */
const LOADERS = {
  settings: () => import('../screens/SettingsScreen').then((m) => m.SettingsScreen),
  scene: () => import('../screens/SceneScreen').then((m) => m.SceneScreen),
  story: () => import('../screens/StoryScreen').then((m) => m.StoryScreen),
  music: () => import('../screens/MusicLibraryScreen').then((m) => m.MusicLibraryScreen),
  credits: () => import('../screens/CreditsScreen').then((m) => m.CreditsScreen),
  'quiz-menu': () => import('../screens/QuizMenuScreen').then((m) => m.QuizMenuScreen),
  quiz: () => import('../screens/QuizScreen').then((m) => m.QuizScreen),
  reflection: () => import('../screens/ReflectionScreen').then((m) => m.ReflectionScreen),
  journal: () => import('../screens/JournalScreen').then((m) => m.JournalScreen),
  ceremony: () => import('../screens/CeremonyScreen').then((m) => m.CeremonyScreen),
  cathedral: () => import('../screens/CathedralScreen').then((m) => m.CathedralScreen),
  map: () => import('../screens/WorldMapScreen').then((m) => m.WorldMapScreen),
} as const

/** Each loader as a component React can wait for. */
function lazyScreens<K extends string>(loaders: Record<K, () => Promise<ComponentType>>): Record<K, ComponentType> {
  const screens = {} as Record<K, ComponentType>
  for (const name in loaders) screens[name] = lazy(() => loaders[name]().then((component) => ({ default: component })))
  return screens
}

const SCREENS = { title: TitleScreen, menu: MenuScreen, ...lazyScreens(LOADERS) }

/** Fetches every screen's code while the player is on the title screen, the story first. */
function preloadScreens() {
  const idle = (then: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(then, { timeout: 4000 }) : setTimeout(then, 1500))
  idle(() => {
    void LOADERS.story()
    for (const load of Object.values(LOADERS)) void load()
  })
}

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

  // The master clock runs for as long as the game is open, and so does the sound.
  useEffect(() => {
    gameClock.start()
    installAudio()
    return () => gameClock.stop()
  }, [])

  // Away from a story, the quiz and reflection, the calm music of the menus plays (those set their own).
  const returnTo = useApp((s) => s.returnTo)
  const ownMusic =
    screen === 'story' || screen === 'quiz' || screen === 'reflection' || (returnTo === 'story' && (screen === 'settings' || screen === 'music' || screen === 'journal'))
  useEffect(() => {
    if (!ownMusic) setMusicPlace({ kind: 'hub' })
  }, [ownMusic])

  useEffect(preloadScreens, [])

  const Current = SCREENS[screen]
  return (
    <>
      <Suspense fallback={<main className="screen" aria-busy="true" />}>
        <Current />
      </Suspense>
      <FontWarmup />
      <NowPlaying />
      {(import.meta.env.DEV || launch.meter) && <FrameMeter initiallyVisible={launch.meter} />}
    </>
  )
}
