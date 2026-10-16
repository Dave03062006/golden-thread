import { isStyleId, type StyleId } from '../styles/ids'

/**
 * Options read from the page address, used by the screenshot, performance and
 * accessibility scripts to open any screen directly. They are harmless for players.
 *
 *   ?test          use a throwaway in-memory save (nothing is stored on the device)
 *   ?screen=menu   start on a screen: title, menu, settings, scene (the demo) or story
 *   ?scene=l01-e1-s3  with ?screen=story, start at this scene
 *   ?style=pixel   art style for the throwaway save
 *   ?perf          record frame timings for the performance script
 *   ?meter         show the frame-rate meter
 */
export interface LaunchParams {
  test: boolean
  screen: 'title' | 'menu' | 'settings' | 'scene' | 'story' | null
  /** A scene to start the story at. */
  scene: string | null
  style: StyleId | null
  perf: boolean
  meter: boolean
}

export function readParams(search: string): LaunchParams {
  const params = new URLSearchParams(search)
  const screen = params.get('screen')
  const style = params.get('style')
  return {
    test: params.has('test'),
    screen: screen === 'title' || screen === 'menu' || screen === 'settings' || screen === 'scene' || screen === 'story' ? screen : null,
    scene: params.get('scene'),
    style: isStyleId(style) ? style : null,
    perf: params.has('perf'),
    meter: params.has('meter'),
  }
}

export const launch: LaunchParams =
  typeof window === 'undefined' ? readParams('') : readParams(window.location.search)
