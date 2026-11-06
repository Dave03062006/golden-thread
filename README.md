# Golden Thread

A journey through the whole Catholic Bible, from Creation to Revelation, as a web game.
Fourteen Ages and 53 levels, each told in short episodes with small games inside them,
and a golden thread to find in each one that shows how that moment points to Christ.
Every finished episode sets a panel of stained glass in a cathedral, and the journey is
drawn on a map of the Bible lands.

It can be played in two art styles, switched at any moment, even in the middle of a scene:

- **Paper & Glass**: layered paper scenes and stained glass.
- **Pixel**: bright pixel art, like a classic adventure game.

Level 1, *Creation and the Fall*, is built: six episodes, its quiz, reflection and prayer,
its window in the cathedral and its place on the map.

- The design: [`docs/specs/2026-10-15-golden-thread-design.md`](docs/specs/2026-10-15-golden-thread-design.md)
- The build plan and its results: [`docs/plans/first-build/plan.md`](docs/plans/first-build/plan.md)
- How the code works, for someone learning React: [`docs/code-tour.md`](docs/code-tour.md)

## Running it

You need [Node.js](https://nodejs.org) 22.12 or newer.

```sh
npm install
npm run dev
```

Then open the address it prints (usually <http://localhost:5173>). Changes to the code
appear in the browser as you save.

Saves are kept in the browser (IndexedDB), on this device only. The title screen can export
a save to a file and import it again, here or on another device.

### Opening any screen directly

The address can open the game straight onto a screen with a throwaway save, which is
handy while working on one screen. Nothing is stored on the device.

| Address | Opens |
|---|---|
| `/?screen=story&scene=l01-e3-s2` | the story at a scene (`l01` level, `e3` episode, `s2` scene) |
| `/?screen=cathedral&style=pixel` | the cathedral, in the pixel style |
| `/?screen=quiz` | the Level 1 quiz, as if the level were just finished |
| `/?screen=menu&meter` | the menu, with the frame-rate meter showing |

The screens are `title`, `menu`, `settings`, `scene` (the first demo), `story`, `music`,
`credits`, `quiz-menu`, `quiz`, `reflection`, `journal`, `ceremony`, `cathedral` and `map`.
See `src/app/params.ts`.

## Checking it

| Command | What it does |
|---|---|
| `npm run check` | TypeScript and the linter (Oxlint) |
| `npm test` | the unit and content tests (Vitest) |
| `npm run build` | builds the game into `dist/`, typechecking first |

The rest run the built game (so run `npm run build` first) in Microsoft Edge, through
Playwright:

| Command | What it does |
|---|---|
| `npm run playthrough` | plays Level 1 from start to finish in both styles, every interaction and the level's end. `-- --from=4` starts at Episode 4; `-- --style=pixel` plays one style |
| `npm run a11y` | axe accessibility checks on every screen, then again with the largest text, high contrast and the readable font on a phone held sideways |
| `npm run keyboard` | tabs through every screen to check every control can be reached and shows its focus, then starts a game with keys only |
| `npm run perf` | plays every scene and screen with the processor slowed 4× and fails if frames are late. `-- --only=story`, `--only=hub` or `--scenes=l01-e4` narrow it down |
| `npm run shots` | screenshots of every screen and scene in both styles, at laptop and phone sizes, into `shots/`. `-- --compare` checks them against the approved baselines |
| `npm run saves` | saves, reloads, exports, deletes and imports a game in a real browser |

`perf` measures this computer, so close busy programs (games, video, big downloads)
before running it, or the results will wander.

## Art

The art is drawn by code (SVG for Paper & Glass, pixel by pixel for Pixel) and baked into
image files the game loads:

```sh
npm run bake
```

This writes `public/art/` and `src/styles/art-manifest.json`. Run it after changing any art;
`npm test` fails if the baked art is out of date.

## Music

The music is free: every recording is in the public domain or under CC0 or CC BY (see
`src/music/catalog.ts` and the Credits screen). It isn't kept in git.

```sh
npm run media
```

downloads each recording once, evens out its loudness and compresses it to Opus and AAC
in `media/` (this needs [FFmpeg](https://ffmpeg.org) on your path). While developing, the
game plays those files directly.

For the published game the music lives on Cloudflare R2. Setting it up, and uploading with
`npm run media:upload`, is explained step by step in
[`docs/hosting-music.md`](docs/hosting-music.md). The game finds the music through
`VITE_MEDIA_URL` (see `.env.example`). Without it, the published game is silent but
otherwise works.

## Publishing

The game is a static site: `npm run build` makes `dist/`, which any static host can serve.
It's set up for [Vercel](https://vercel.com) (`vercel.json`):

1. Put the code on GitHub (a private repository is fine).
2. On Vercel, choose **Add New → Project**, import the repository, and keep the settings
   it detects (Vite, `npm run build`, `dist`).
3. Under **Settings → Environment Variables**, add `VITE_MEDIA_URL` with the music host's
   address, for Production, then redeploy.
4. In the music bucket's CORS settings, allow the Vercel address (see
   `docs/hosting-music.md`, step 4).

Every push to the main branch then publishes a new version. Until the Bible translation is
settled (spec §12.2) the site stays unlisted: it asks search engines not to index it
(`robots.txt` and an `X-Robots-Tag` header).

## The code, in brief

```
src/
  app/         the app's state (Zustand), screens, sound, address options
  engine/      the clock, input, motion, randomness, saves and settings
  scene/       scene descriptions (layers, actors, the camera), their timelines, and the
               director that plays a story's beats and cues
  stage/       the stage that holds both art styles and crossfades between them
  minigames/   the small games inside episodes, as pure rules plus a view
  content/     the Bible text, the levels and episodes, the golden threads, places
  quiz/        picking and scoring quiz questions
  cathedral/   the cathedral's windows and panels, and their layout
  map/         the map's projection, coastlines, rivers and features
  music/       the music catalog, playlists and the player's own songs
  styles/      the two art styles: renderers, art, and the cathedral and map in each
  screens/     every screen of the game
  ui/          shared buttons, panels, dialogs and theme
  bake/, dev/  the art baking page, and the frame meter and timing probe
scripts/       the browser checks, art baking and music preparation
```

[`docs/code-tour.md`](docs/code-tour.md) walks through it properly.
