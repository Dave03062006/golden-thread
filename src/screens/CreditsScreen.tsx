import { useApp } from '../app/store'
import { TRANSLATIONS } from '../content/bible/verses'
import { TRACKS } from '../music/catalog'
import { Button, Panel } from '../ui/components'
import './screens.css'

const LICENSE_NAMES = { 'public-domain': 'Public domain', cc0: 'CC0', 'cc-by': 'CC BY' } as const

const FONTS = [
  ['Cinzel', 'Natanael Gama'],
  ['Cormorant Garamond', 'Christian Thalmann'],
  ['Pixelify Sans', 'Stefie Justprince'],
  ['Press Start 2P', 'CodeMan38'],
  ['Atkinson Hyperlegible Next', 'the Braille Institute of America'],
] as const

/** Credits (spec §9.5): every piece of music and its license, the Bible texts, the fonts. */
export function CreditsScreen() {
  const go = useApp((s) => s.go)
  const returnTo = useApp((s) => s.returnTo)

  return (
    <main className="screen screen-credits">
      <Panel className="credits-panel">
        <div className="settings-head">
          <h1>Credits</h1>
          <Button variant="quiet" onClick={() => go(returnTo)}>
            Back
          </Button>
        </div>

        <section className="settings-group" aria-labelledby="credits-music">
          <h2 id="credits-music">Music</h2>
          <p className="ui-note">
            Every recording here is in the public domain or under an open license that allows it to be used in this game.
          </p>
          <ul className="credits-list">
            {TRACKS.map((track) => (
              <li key={track.id}>
                <p>{track.credit}</p>
                <p className="ui-note">
                  {LICENSE_NAMES[track.license]}: {track.licenseNote}{' '}
                  <a href={track.source} target="_blank" rel="noreferrer">
                    Source
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="settings-group" aria-labelledby="credits-bible">
          <h2 id="credits-bible">The Bible</h2>
          <p>
            Quotations are from the {TRANSLATIONS.rsv.name} ({TRANSLATIONS.rsv.short}), used while the game is in development; permission for
            the published game will be requested from Ignatius Press. The {TRANSLATIONS.dra.name} is in the public domain.
          </p>
          <p className="ui-note">The retelling around the quotations is original writing.</p>
        </section>

        <section className="settings-group" aria-labelledby="credits-art">
          <h2 id="credits-art">Type, color and sound</h2>
          <ul className="credits-list">
            {FONTS.map(([font, by]) => (
              <li key={font}>
                {font}, by {by}. SIL Open Font License.
              </li>
            ))}
            <li>The pixel art’s colors begin from the Sweetie 16 palette by GrafxKid.</li>
            <li>The sound effects are made by the game itself, as it plays.</li>
          </ul>
        </section>
      </Panel>
    </main>
  )
}
