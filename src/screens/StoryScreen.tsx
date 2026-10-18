import { useCallback, useEffect, useRef, useState } from 'react'
import { cueMusic, duckMusic, pauseMusic, prepareCue, sceneMusic, setMusicPlace, soundEffect } from '../app/audio'
import { launch } from '../app/params'
import { useApp } from '../app/store'
import { formatReference } from '../content/bible/books'
import { LEVELS, findEpisode, findScene, nextEpisode, nextLevel, stillBeingMade } from '../content/catalog'
import type { Episode, Level } from '../content/types'
import { gameClock } from '../engine/clock'
import { createInput } from '../engine/input'
import type { Position } from '../engine/save/types'
import { useSettings } from '../engine/settings'
import { GAMES } from '../minigames/registry'
import { GameRunner } from '../minigames/runner'
import { Director, historyUpTo, type StoryPosition } from '../scene/director'
import type { SceneFrame } from '../scene/evaluate'
import type { Beat } from '../scene/types'
import { Stage } from '../stage/Stage'
import { STYLE_IDS, STYLE_NAMES } from '../styles/ids'
import { Button, Choice, Dialog } from '../ui/components'
import { useReducedMotion } from '../ui/useReducedMotion'
import { EpisodeEndDialog, HistoryDialog, ThreadDialog, WhereWhenDialog } from './story/dialogs'
import { Line } from './story/Line'
import { ListenAlongCard } from '../ui/MusicCards'
import { PlayLayer } from './story/PlayLayer'
import { spokenText } from './story/speech'
import { ThreadSpot } from './story/ThreadSpot'
import './screens.css'
import './story/story.css'

/** How often play time is written to the save while playing, in seconds. */
const AUTOSAVE_SECONDS = 30

/** One playing of an episode: its director, and when its clock started. */
interface Session {
  id: number
  level: Level
  episode: Episode
  director: Director
  firstScene: number
  clockStart: number
}

let sessions = 0

/** The scene the page address opened the story at (`?scene=`): only the first story opened follows it, and after that the save leads. */
let launchScene = launch.scene

function newSession(level: Level, episode: Episode, scene: number): Session {
  return {
    id: ++sessions,
    level,
    episode,
    director: new Director({ set: episode.set, scenes: episode.scenes }, scene),
    firstScene: scene,
    clockStart: gameClock.time,
  }
}

/** Where to begin: the save's checkpoint, or the start of Level 1. */
function startingSession(position: Position | null, completedLevels: string[] = []): Session {
  const sceneId = launchScene ?? position?.scene
  const found = sceneId ? findScene(sceneId) : undefined
  // A save left at the end of a finished level (from before the story went on by itself) goes on to the next.
  const onward = !launchScene && found && completedLevels.includes(found.level.id) ? nextLevel(found.level.id) : undefined
  if (onward) return newSession(onward, onward.episodes[0]!, 0)
  if (found) return newSession(found.level, found.episode, found.index)
  const level = LEVELS[0]!
  return newSession(level, level.episodes[0]!, 0)
}

/** A finished episode played again from its start. */
function replaySession(episodeId: string): Session {
  const found = findEpisode(episodeId)
  if (found) return newSession(found.level, found.episode, 0)
  return startingSession(null)
}

/** How long to leave a line before moving on by itself, when auto-advance is on. */
const readingSeconds = (text: string) => 3 + text.length * 0.055

type Panel = 'pause' | 'history' | 'where' | 'thread' | 'end' | null

/**
 * The story player (spec §9.5). It plays an episode scene by scene: the scene above,
 * the narration below, a tap (or Space) to go on. Every scene is a checkpoint, and the
 * art style can be switched at any moment without losing the place.
 */
export function StoryScreen() {
  const save = useApp((s) => s.save)
  const checkpoint = useApp((s) => s.checkpoint)
  const changeSave = useApp((s) => s.changeSave)
  const commit = useApp((s) => s.commit)
  const addPlayTime = useApp((s) => s.addPlayTime)
  const go = useApp((s) => s.go)
  const openSettings = useApp((s) => s.openSettings)
  const openScreen = useApp((s) => s.openScreen)
  const startLevelEnd = useApp((s) => s.startLevelEnd)
  const closeSave = useApp((s) => s.closeSave)
  const updateSettings = useSettings((s) => s.update)
  const { gentleMode, autoAdvance, readAloud, voiceVolume, musicMode } = useSettings()
  const reducedMotion = useReducedMotion()

  // A replay starts its episode from the beginning, and never moves the player's place in the story.
  const [replaying] = useState(() => useApp.getState().replay)
  const [session, setSession] = useState(() => (replaying ? replaySession(replaying.episode) : startingSession(useApp.getState().save?.position ?? null, useApp.getState().save?.completedLevels)))
  const { level, episode, director } = session
  const [current, setCurrent] = useState<{ beat: Beat; position: StoryPosition } | null>(null)
  const [runner, setRunner] = useState<GameRunner | null>(null)
  const [sceneTitle, setSceneTitle] = useState<{ title: string; index: number } | null>(null)
  const [introOpen, setIntroOpen] = useState(session.firstScene === 0)
  const [panel, setPanel] = useState<Panel>(null)
  const screenRef = useRef<HTMLElement>(null)
  const continueRef = useRef<HTMLButtonElement>(null)
  const lastFrame = useRef<SceneFrame | null>(null)

  // The story's own clock, which stops whenever the game pauses.
  const sessionRef = useRef(session)
  const runnerRef = useRef<GameRunner | null>(null)
  const gentleRef = useRef(gentleMode)
  useEffect(() => {
    sessionRef.current = session
    gentleRef.current = gentleMode
  })
  const getTime = useCallback(() => gameClock.time - sessionRef.current.clockStart, [])

  /** The frame both styles draw: the interaction (if any) catches up first, then the director answers. */
  const frameAt = useCallback((time: number) => {
    const { director } = sessionRef.current
    const active = runnerRef.current
    if (active && active.advanceTo(time).done) {
      runnerRef.current = null
      soundEffect('done')
      director.finishPlay(time)
    }
    const frame = director.frame(time)
    lastFrame.current = frame
    return frame
  }, [])

  // The level's music, beginning with the first scene's piece.
  useEffect(() => {
    setMusicPlace({ kind: 'story', level }, episode.scenes[session.firstScene]?.music)
  }, [level, episode, session.firstScene])

  // Listen to the director: checkpoints, new beats, and the end.
  useEffect(() => {
    let lines = 0
    return director.subscribe((event) => {
      if (event.type === 'checkpoint') {
        if (!replaying) void checkpoint({ level: level.id, episode: episode.id, scene: event.scene.id })
        setSceneTitle({ title: event.scene.title, index: event.index })
        sceneMusic(event.scene.music)
        // Cues in this scene are loaded now, so they can land the moment they're needed.
        for (const beat of event.scene.beats) for (const name of beat.events ?? []) if (name.startsWith('music:')) prepareCue(level, name.slice(6))
      } else if (event.type === 'beat') {
        if (event.beat.kind !== 'play' && lines++ > 0) soundEffect('advance')
        const game = event.beat.kind === 'play' ? GAMES[event.beat.game] : undefined
        const next = game ? new GameRunner(game, { gentle: gentleRef.current, frame: () => director.frame(getTime()) }, director.timeline, getTime()) : null
        runnerRef.current = next
        setRunner(next)
        setCurrent({ beat: event.beat, position: event.position })
      } else if (event.type === 'event') {
        // A moment of music lands on this beat, like Haydn's chord on "and there was light".
        if (event.name.startsWith('music:')) cueMusic(level, event.name.slice(6))
      } else if (event.type === 'end') {
        const now = useApp.getState().save
        if (now && !now.completedEpisodes.includes(episode.id)) changeSave({ completedEpisodes: [...now.completedEpisodes, episode.id] })
        void commit()
        setPanel('end')
      }
    })
  }, [director, level, episode, checkpoint, changeSave, commit, getTime, replaying])

  // Leaving a replay ends it, and leaving the story lets the save lead from then on.
  useEffect(
    () => () => {
      useApp.setState({ replay: null })
      launchScene = null
    },
    [],
  )

  // The story begins once the episode's title card is put away (or at once, when resuming).
  useEffect(() => {
    if (!introOpen) director.start(getTime())
  }, [director, introOpen, getTime])

  const advance = useCallback(() => {
    if (panel || introOpen || director.playing || director.ended) return
    director.advance(getTime())
  }, [panel, introOpen, director, getTime])

  // Taps, Space and Enter move the story on; Escape pauses.
  useEffect(() => {
    const input = createInput({ keyTarget: window, pointerTarget: screenRef.current ?? undefined })
    const off = input.subscribe((event) => {
      if (event.action === 'pause') setPanel((open) => (open === 'pause' ? null : open ?? 'pause'))
      else if (event.action === 'advance' || (event.action === 'right' && event.source === 'keyboard')) {
        if (introOpen && !panel) setIntroOpen(false)
        else advance()
      }
    })
    return () => {
      off()
      input.dispose()
    }
  }, [advance, introOpen, panel])

  // Any card over the story pauses it; the pause menu's style switch still crossfades.
  // The music pauses with the pause menu, and plays on under the other cards.
  useEffect(() => {
    if (panel) gameClock.pause()
    else gameClock.resume()
    if (panel === 'where' || panel === 'history' || panel === 'end') soundEffect('open')
    pauseMusic(panel === 'pause')
    return () => {
      gameClock.resume()
      pauseMusic(false)
    }
  }, [panel])

  // When a card closes, the keyboard goes back to the story itself, so Space carries on
  // reading (rather than pressing whichever button opened the card).
  const hadPanel = useRef(false)
  useEffect(() => {
    if (panel) {
      hadPanel.current = true
      return
    }
    if (!hadPanel.current) return
    hadPanel.current = false
    if (continueRef.current) continueRef.current.focus({ preventScroll: true })
    else if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }, [panel])

  // Count play time, and write it to the save every so often.
  useEffect(() => {
    let sinceSave = 0
    return gameClock.subscribe(({ dt }) => {
      addPlayTime(dt)
      sinceSave += dt
      if (sinceSave >= AUTOSAVE_SECONDS) {
        sinceSave = 0
        void commit()
      }
    })
  }, [addPlayTime, commit])

  // Read each line aloud, if the player asked for it (spec §9.5).
  const lineText = current && current.beat.kind !== 'play' ? spokenText(current.beat) : ''
  useEffect(() => {
    if (!readAloud || !lineText || typeof speechSynthesis === 'undefined') return
    const utterance = new SpeechSynthesisUtterance(lineText)
    utterance.rate = 0.95
    utterance.volume = voiceVolume
    // The music softens under the voice.
    utterance.onstart = () => duckMusic(true)
    utterance.onend = () => duckMusic(false)
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
    return () => {
      speechSynthesis.cancel()
      duckMusic(false)
    }
  }, [readAloud, lineText, voiceVolume])

  // Move on by itself, if the player turned auto-advance on. Never by default (spec §9.7).
  useEffect(() => {
    if (!autoAdvance || !lineText || panel) return
    const timer = setTimeout(advance, readingSeconds(lineText) * 1000)
    return () => clearTimeout(timer)
  }, [autoAdvance, lineText, panel, advance])

  if (!save) return null

  const found = save.threadsFound.includes(episode.thread.id)
  const threadFrom = episode.scenes.findIndex((s) => s.id === episode.thread.fromScene)
  const spotEnabled = !found && !introOpen && !panel && !runner && current !== null && current.position.scene >= threadFrom
  const following = nextEpisode(episode.id)

  const setStyle = (style: (typeof STYLE_IDS)[number]) => {
    changeSave({ style })
    updateSettings({ lastStyle: style })
    void commit()
  }

  const keepThread = () => {
    const now = useApp.getState().save
    if (now && !now.threadsFound.includes(episode.thread.id)) {
      changeSave({ threadsFound: [...now.threadsFound, episode.thread.id] })
      void commit()
    }
    setPanel(director.ended ? 'end' : null)
  }

  const replay = (next: Episode) => {
    runnerRef.current = null
    setRunner(null)
    setCurrent(null)
    setPanel(null)
    setIntroOpen(true)
    setSession(newSession(level, next, 0))
  }

  return (
    <main className="screen-story" ref={screenRef}>
      <Stage key={session.id} scene={episode.set} style={save.style} reducedMotion={reducedMotion} getTime={getTime} frameAt={frameAt}>
        {runner && <PlayLayer key={`${current?.position.scene}-${current?.position.beat}`} runner={runner} gentle={gentleMode} />}

        <ThreadSpot
          lastFrame={lastFrame}
          actorId={episode.thread.spot}
          enabled={spotEnabled}
          onFind={() => {
            soundEffect('find')
            setPanel('thread')
          }}
        />

        <div className="story-hud">
          <Button variant="quiet" className="hud-button hud-extra" onClick={() => setPanel('where')}>
            Where &amp; when
          </Button>
          <Button variant="quiet" className="hud-button hud-extra" onClick={() => setPanel('history')}>
            History
          </Button>
          <Button variant="quiet" className="hud-button" onClick={() => setPanel('pause')}>
            Pause
          </Button>
        </div>

        {sceneTitle && !introOpen && (
          <p key={sceneTitle.index} className="scene-title">
            {sceneTitle.title}
          </p>
        )}

        {introOpen && (
          <div className="story-intro">
            <p className="story-intro-kicker">
              Level {level.number} · {level.title}
            </p>
            <h1 className="story-intro-title">
              <span>Episode {episode.number}</span> {episode.title}
            </h1>
            <p className="story-intro-passage">{formatReference(episode.passage)}</p>
            {episode.contentNote && <p className="story-intro-note">{episode.contentNote}</p>}
            <Button variant="primary" onClick={() => setIntroOpen(false)}>
              Begin
            </Button>
          </div>
        )}

        {current && current.beat.kind !== 'play' && !introOpen && (
          <section className="story-panel" aria-label="The story">
            <div key={`${current.position.scene}-${current.position.beat}`} className="story-line" aria-live="polite">
              <Line beat={current.beat} />
            </div>
            <button ref={continueRef} type="button" className="story-continue" onClick={advance}>
              Continue
            </button>
          </section>
        )}
      </Stage>

      <ListenAlongCard key={level.id} level={level.number} levelTitle={level.title} />

      <div className="rotate-prompt" role="alert">
        <p>Turn your phone sideways to play.</p>
      </div>

      <Dialog open={panel === 'pause'} title="Paused" onClose={() => setPanel(null)}>
        <div className="pause-actions">
          <Button variant="primary" onClick={() => setPanel(null)}>
            Resume
          </Button>
          <Button onClick={() => setPanel('where')}>Where &amp; when</Button>
          <Button onClick={() => setPanel('history')}>The story so far</Button>
          <Choice legend="Art style" value={save.style} options={STYLE_IDS.map((id) => ({ value: id, label: STYLE_NAMES[id] }))} onChange={setStyle} />
          <Choice
            legend="Music"
            value={musicMode}
            options={[
              { value: 'sacred', label: 'Sacred' },
              { value: 'worship', label: 'Worship' },
              { value: 'off', label: 'Off' },
            ]}
            onChange={(next) => updateSettings({ musicMode: next })}
          />
          <Button onClick={() => openSettings()}>Settings</Button>
          <Button
            onClick={async () => {
              setPanel(null)
              await commit()
              openScreen('journal')
            }}
          >
            Journal
          </Button>
          {replaying && (
            <Button
              onClick={() => {
                setPanel(null)
                go(replaying.from)
              }}
            >
              Back to the {replaying.from === 'map' ? 'map' : 'cathedral'}
            </Button>
          )}
          <Button
            onClick={async () => {
              setPanel(null)
              await closeSave()
            }}
          >
            Save &amp; quit
          </Button>
          <Button
            variant="quiet"
            onClick={async () => {
              setPanel(null)
              await commit()
              go('menu')
            }}
          >
            Main menu
          </Button>
        </div>
      </Dialog>

      <HistoryDialog open={panel === 'history'} lines={current ? historyUpTo(director.story, current.position) : []} onClose={() => setPanel(null)} />
      <WhereWhenDialog open={panel === 'where'} episode={episode} onClose={() => setPanel(null)} />
      <ThreadDialog open={panel === 'thread'} threadId={episode.thread.id} onClose={keepThread} />
      <EpisodeEndDialog
        open={panel === 'end'}
        episode={episode}
        threadFound={found}
        readMarks={save.readMarks}
        onToggleRead={(mark, read) => {
          changeSave({ readMarks: read ? [...save.readMarks, mark] : save.readMarks.filter((m) => m !== mark) })
          void commit()
        }}
        onShowThread={() => setPanel('thread')}
        onReplay={() => replay(episode)}
        // After a level's last episode, its end: the quiz, reflection and prayer, the window ceremony.
        // While a level is still being made, its last built episode leads back to the menu.
        onContinue={() => (replaying ? go(replaying.from) : following ? replay(following) : stillBeingMade(level) ? go('menu') : startLevelEnd(level.id))}
        continueLabel={
          replaying
            ? `Back to the ${replaying.from === 'map' ? 'map' : 'cathedral'}`
            : following
              ? `On to Episode ${following.number}`
              : stillBeingMade(level)
                ? 'Back to the menu'
                : 'On to the quiz'
        }
      />
    </main>
  )
}
