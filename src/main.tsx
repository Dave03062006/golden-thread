import '@fontsource-variable/cinzel'
import '@fontsource-variable/cormorant-garamond'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/pixelify-sans'
import '@fontsource/press-start-2p'
import '@fontsource-variable/atkinson-hyperlegible-next'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { launch } from './app/params'
import { openTestSave } from './app/store'
import { installPerfProbe } from './dev/perfProbe'
import { useSettings } from './engine/settings'
import './ui/theme.css'
import './ui/global.css'

// Scripted tests can open any screen straight away with a throwaway save (see params.ts).
if (launch.test) {
  const style = launch.style ?? 'paper-glass'
  useSettings.getState().update({ lastStyle: style })
  if (launch.screen && launch.screen !== 'title') openTestSave(style, launch.screen)
}
if (launch.perf) installPerfProbe()

// Load both styles' fonts up front, so switching styles never waits for a font to arrive.
for (const font of [
  '1em "Cinzel Variable"',
  '1em "Cormorant Garamond Variable"',
  'italic 1em "Cormorant Garamond Variable"',
  '1em "Pixelify Sans Variable"',
  '1em "Press Start 2P"',
  '1em "Atkinson Hyperlegible Next Variable"',
]) {
  document.fonts?.load(font).catch(() => {})
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
