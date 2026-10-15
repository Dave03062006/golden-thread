import { useApp } from '../app/store'
import { useSettings, type DeviceSettings } from '../engine/settings'
import { STYLE_IDS, STYLE_NAMES, type StyleId } from '../styles/ids'
import { Button, Choice, Panel, Toggle } from '../ui/components'
import './screens.css'

/** Settings: the art style (kept in the save) and comfort options (kept on this device). */
export function SettingsScreen() {
  const settings = useSettings()
  const save = useApp((s) => s.save)
  const changeSave = useApp((s) => s.changeSave)
  const commit = useApp((s) => s.commit)
  const go = useApp((s) => s.go)
  const returnTo = useApp((s) => s.returnTo)
  const style = save?.style ?? settings.lastStyle

  const setStyle = (next: StyleId) => {
    settings.update({ lastStyle: next })
    if (save) {
      changeSave({ style: next })
      commit()
    }
  }

  return (
    <main className="screen screen-settings">
      <Panel className="settings-panel">
        <div className="settings-head">
          <h1>Settings</h1>
          <Button variant="quiet" onClick={() => go(returnTo)}>
            Back
          </Button>
        </div>

        <section className="settings-group" aria-labelledby="settings-art">
          <h2 id="settings-art">Art style</h2>
          <Choice
            legend="Style"
            description={save ? 'Saved with this game. You can switch at any time, even in the middle of a scene.' : undefined}
            value={style}
            options={STYLE_IDS.map((id) => ({ value: id, label: STYLE_NAMES[id] }))}
            onChange={setStyle}
          />
        </section>

        <section className="settings-group" aria-labelledby="settings-reading">
          <h2 id="settings-reading">Reading</h2>
          <Choice<DeviceSettings['textSize']>
            legend="Text size"
            value={settings.textSize}
            options={[
              { value: 'normal', label: 'Normal' },
              { value: 'large', label: 'Large' },
              { value: 'larger', label: 'Larger' },
            ]}
            onChange={(textSize) => settings.update({ textSize })}
          />
          <Toggle
            label="Extra-readable font"
            description="Atkinson Hyperlegible, designed for easy reading."
            checked={settings.readableFont}
            onChange={(readableFont) => settings.update({ readableFont })}
          />
          <Toggle
            label="High contrast"
            checked={settings.highContrast}
            onChange={(highContrast) => settings.update({ highContrast })}
          />
          <Toggle
            label="Auto-advance the story"
            description="Off by default, so you can read at your own pace."
            checked={settings.autoAdvance}
            onChange={(autoAdvance) => settings.update({ autoAdvance })}
          />
          <Toggle
            label="Read aloud"
            description="Your device's voice reads the story text."
            checked={settings.readAloud}
            onChange={(readAloud) => settings.update({ readAloud })}
          />
        </section>

        <section className="settings-group" aria-labelledby="settings-motion">
          <h2 id="settings-motion">Motion and play</h2>
          <Choice<DeviceSettings['reducedMotion']>
            legend="Motion"
            value={settings.reducedMotion}
            options={[
              { value: 'system', label: 'Match my device' },
              { value: 'on', label: 'Less motion' },
              { value: 'off', label: 'Full motion' },
            ]}
            onChange={(reducedMotion) => settings.update({ reducedMotion })}
          />
          <Toggle
            label="Gentle mode"
            description="Minigames are slower and more forgiving."
            checked={settings.gentleMode}
            onChange={(gentleMode) => settings.update({ gentleMode })}
          />
        </section>
      </Panel>
    </main>
  )
}
