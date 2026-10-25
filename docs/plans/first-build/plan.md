# Implementation plan: the first build (foundations + Level 1)

## Overview

Build the first playable version of Golden Thread described in [the design spec](../../superpowers/specs/2026-10-15-golden-thread-design.md): the whole game engine, both art styles (Paper & Glass, and Pixel), both music modes, saves, the quiz, the cathedral and the world map, and **Level 1, *Creation and the Fall*,** complete from start to finish. It covers the spec's milestones M1–M7 (§16.1), one task per milestone. Each task ends with something Dave can open and play-test.

## Requirements summary

The spec is the source of truth. In short:

- **Level 1 in full** (spec §7): 6 episodes, every scene a checkpoint, one interactive moment per episode, golden threads, *Where and when* cards and "Read it in your Bible" marks. The level ends with a quiz, then reflection and prayer, then the window ceremony.
- **Two complete art styles** (§9), switchable at any moment, even mid-scene. Every screen exists in both, and each style provides every prop, character and pose (§13.4).
- **Fluid motion** (§10): one master clock at the screen's refresh rate, easing everywhere, no hard cuts. Under 8 ms of work per frame, and a steady 60 fps on a mid-range phone.
- **Saves** (§4): three save files, autosave at every checkpoint, backups, checksums, version upgrades, and export and import.
- **The quiz** (§5): seven question types, 10 random questions per run from a bank of 40+, missed questions weighted, replayable any time.
- **Music** (§11): free sacred music with license-checked recordings, and worship songs from the player's own files or listen-along links. Crossfades, cues and ducking.
- **Licensing** (§12): RSV-2CE quotes during private development with a Douay-Rheims fallback; only public-domain, CC0 or CC BY audio; no copyrighted recordings.
- **Code readable for a React learner**, with `docs/code-tour.md` at the end.

## Investigation findings (2026-10-15)

Current npm versions (npm on this machine uses the npmmirror registry, which mirrors npm):

| Package | Version | Note |
|---|---|---|
| create-vite | 9.2.1 | `react-ts` template: React ^19.2.8, Vite ^8.3.0, `@vitejs/plugin-react` ^6.1.1, **TypeScript ~6.0.2**, Oxlint ^1.81.0, `@types/node` ^24 |
| react / react-dom | 19.3.1 | |
| vite | 8.3.4 | |
| vitest | 5.0.5 | needs Vite ^8 |
| typescript | 7.0.2 latest | The template still pins ~6.0, so we use ~6.0, matching the portfolio. |
| oxlint | 1.88.0 | |
| zustand | 5.0.15 | app and save state |
| idb-keyval | 6.3.0 | tiny IndexedDB wrapper for saves and worship-music files |
| music-metadata | 12.2.1 | Its browser build (`lib/core.js`) provides `parseBlob` for reading song tags. |
| jsdom | 30.1.3 | test environment |
| fake-indexeddb | 6.2.5 | IndexedDB inside Vitest (jsdom has none) |
| @testing-library/react / dom / user-event | 16.3.3 / 10.4.2 / 14.6.8 | |
| playwright-core | 1.64.1 | drives the installed Edge, like the portfolio's `shots` script |
| @axe-core/playwright | 4.14.0 | its peer is `playwright-core >= 1.0.0`, so no extra browser download |
| @fontsource-variable/cinzel | 5.3.0 | self-hosted fonts, no Google Fonts requests |
| @fontsource-variable/cormorant-garamond | 5.3.0 | |
| @fontsource-variable/pixelify-sans | 5.3.0 | |
| @fontsource/press-start-2p | 5.3.0 | |
| @fontsource-variable/atkinson-hyperlegible-next | 5.3.0 | the newer, variable version of Atkinson Hyperlegible |

- **ffmpeg 9.0.1** is installed, so audio can be compressed to Opus (with an AAC fallback) by a script.
- **Edge** is installed at the standard location, so the screenshot, performance and accessibility scripts run in headless Edge without downloading browsers.
- **The mockups** in `.superpowers/brainstorm/` already prove some techniques: the Voronoi glass, the pixel world map's geography, the outlined pixel sprites and the layered paper scenes. Their code is a reference for M1, M2 and M6, but it isn't copied as is: it computed SVG filters on every frame, which the spec forbids (§10, rule 8).

## Tasks

### Task 1: Skeleton (M1)

**What:**

- **Project setup.**
  - Scaffold the `react-ts` template into the repo, merge its `.gitignore` with ours, and delete the demo files.
  - Install the packages above, then add `.gitattributes` (LF line endings) and `.oxlintrc.json` (the portfolio's rules plus `ignorePatterns` for `dist`, `shots` and `media`).
  - Scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `check` (typecheck + lint), `test`, `shots`, `perf` and `a11y`.
- **Engine.**
  - `clock.ts`: the master clock. One `requestAnimationFrame` loop, elapsed real time, pause and resume, and a stop when the tab is hidden. Everything subscribes to it.
  - `motion.ts`: easing curves, springs, tweens and timelines, plus the shared timing presets (quick, story, quiet).
  - `input.ts`: keyboard, mouse and touch turned into the same actions (advance, back, pause, direction, primary).
  - `random.ts`: a seeded random generator, shuffle and weighted pick.
- **Saves** (`engine/save/`).
  - The save record and its version number, the checksum, and a list of upgrade steps.
  - Three slots, with the previous save kept as a backup.
  - A storage adapter with two backends: IndexedDB (via idb-keyval) for the game, memory for tests.
  - Export and import as a file, and the request for permanent storage.
- **Settings.** A Zustand store saved per device: volumes, text size, high contrast, readable font, reduced motion (follows the device, with an override), gentle mode, auto-advance and read-aloud.
- **Styles and scenes.**
  - `scene/types.ts` (the style-free scene description) and `styles/types.ts` (the style contract).
  - **Paper renderer:** each layer is drawn from SVG into a sharp image at the screen's resolution, with grain and shadows baked in, then stacked and moved by the graphics card, with a parallax camera.
  - **Pixel renderer:** a 320×180 canvas, enlarged by a whole number with a themed border, the sub-pixel camera, and outlined sprite drawing.
  - **Style switching:** both renderers stay mounted during a crossfade at the same moment.
- **Interface shell, in both styles.**
  - Title screen with the three save files.
  - Main menu (Continue, New Game, Load, Settings; later items shown as coming soon) and the Settings screen.
  - Pause menu: Resume, Save & Quit, Settings, Main Menu.
  - A "rotate your phone" prompt for scenes in portrait.
- **Demo scene** ("evening over the waters"): sky, far hills, three layers of water, and a dove gliding in, in both styles. The camera glides through the layers, and the style can switch in the middle.
- **Developer tools:** an on-screen meter for frame rate and frame time (development only).
- **Test kits.**
  - `scripts/shots.mjs`: every screen and scene, both styles, at 1440×900 and 844×390 (a phone in landscape), plus a reduced-motion run.
  - `scripts/perf.mjs`: plays scenes for 10 s with the processor slowed 4×, measures frame times in the page, and fails over budget.
  - `scripts/a11y.mjs`: axe checks on every screen.

**Files:** `package.json`, `vite.config.ts`, `tsconfig*.json`, `.oxlintrc.json`, `.gitattributes`, `index.html`, `src/main.tsx`, `src/app/*`, `src/engine/{clock,motion,input,random}.ts` (+ tests), `src/engine/save/*` (+ tests), `src/engine/settings.ts`, `src/scene/types.ts`, `src/styles/types.ts`, `src/styles/{paper-glass,pixel}/{renderer,ui,props}/*`, `src/screens/{Title,Menu,Settings,Pause}.tsx`, `src/dev/FrameMeter.tsx`, `scripts/{shots,perf,a11y}.mjs`

**Done when:**

- `npm run check`, `npm test` and `npm run build` pass.
- The demo scene stays within its frame budget in `npm run perf`, and switches style mid-glide without a stutter.
- A save survives a page reload and an export-and-import round trip.
- `npm run a11y` passes on the title, menu and settings screens.

**Dependencies:** none

### Task 2: Level 1 script, story player and Episode 1 (M2)

**What:**

- **First, the Level 1 script** (`docs/scripts/level-01-creation-and-fall.md`), written for Dave's approval following spec §15. It's written at the start of the build, so Dave can review it while Task 1 is being built. It contains:
  - narration for all 6 episodes, in our own words, scene by scene
  - every quoted verse in RSV-2CE and Douay-Rheims, checked against sources (Dave checks the RSV-2CE wording against a printed Ignatius Bible if he has one)
  - the 6 interactive moments in detail, and the golden threads with their sources
  - the *Where and when* notes
  - the quiz bank of at least 40 questions in all seven types, each with explanation and reference
  - the reflection and prayer
  - both music playlists
- **Content model:** `content/types.ts`; `bible/books.ts` (the 73 books); `bible/verses.ts` (Level 1's verses in both translations); `threads.ts`; and `geography.ts` (Eden's rivers and the Level 1 places).
- **The director** (`scene/director.ts`): plays a scene's timeline of narration beats, actor actions, camera moves, light changes, and hooks for music cues and sounds. It waits for the player between beats, reports a checkpoint at every scene boundary, and knows nothing about styles.
- **Story screen, in both styles.**
  - the narration panel with its line history
  - the *Where and when* card
  - golden-thread discovery: a glowing spot, then the reveal card with both references and the source
  - the "Read it in your Bible" card and mark
  - read-aloud (the browser's speech)
  - transitions between scenes: camera moves and dissolves, never hard cuts
- **Minigame framework** (`minigames/framework.ts`): rules advance in fixed steps of 120 per second, drawing blends between steps, there's a checkpoint at the start and halfway, and gentle-mode settings.
- **Episode 1, *In the Beginning*:**
  - all 8 scenes in both styles, with their props and the figures of the man and woman
  - the "Let there be…" interaction
  - a placeholder spot for the music cue on "and there was light", which Task 3 fills in

**Files:** `docs/scripts/level-01-creation-and-fall.md`, `src/content/**`, `src/scene/director.ts` (+ test), `src/screens/Story.tsx`, `src/screens/story/*`, `src/minigames/framework.ts` (+ test), `src/minigames/let-there-be/*` (+ test), `src/styles/*/props/*`, `src/styles/*/characters/*`, `src/content/levels/01-creation-and-fall/*`

**Done when:**

- Dave has approved the Level 1 script.
- Episode 1 plays from start to finish in both styles, and switching style mid-scene keeps the line and position.
- *Continue* returns to the exact scene.
- Content checks pass: every prop, character and pose exists in both styles, and every verse reference exists.
- Every Episode 1 scene is within budget in `npm run perf`, and its screenshots are saved.

**Dependencies:** Task 1

### Task 3: Music and sound (M3)

**What:**

- **Free recordings.**
  - Find recordings for Level 1's playlist (Haydn, *The Creation*, plus pieces for minigames, reflection and quiz) and for the menu and cathedral music.
  - Check every license (public domain, CC0 or CC BY only).
  - `scripts/media.mjs` compresses them with ffmpeg into Opus, plus AAC where Safari needs it, into the git-ignored `media/` folder.
  - The catalog (`music/catalog.ts`) records title, composer, performer, license, source and credit for each track.
- **Hosting.** The app loads audio from `VITE_MEDIA_URL`, which points to local `/media` during development. **With Dave:** choose and set up the file host (for example Cloudflare R2), and an upload step in `scripts/media.mjs`.
- **Audio engine** (`engine/audio/`).
  - Web Audio with two music channels that crossfade over 2–3 s, plus sound-effect and voice channels.
  - Playlists that follow the context (story, minigame, reflection, quiz, cathedral, map), with cue points (Haydn's chord lands on the light burst in Episode 1).
  - Ducking under read-aloud, volume settings, unlocking audio on the first tap, and pausing with the clock.
- **Worship songs** (`music/`).
  - The recommendations for all 53 levels (from spec §11.6), each with its one-line reason.
  - The library: files stored in IndexedDB, with titles and artists read by `music-metadata`.
  - The matcher: normalizing titles, a similarity score and thresholds.
  - Listen-along links for Spotify, Apple Music, YouTube Music and YouTube, and pasted playlist links per level or Age.
- **Music Library screen.**
  - the "How do you want to listen?" guide
  - folder drop and folder picker, or multi-file selection on phones
  - match review and the coverage checklist
  - a note on which files work, storage space used, and Remove all
- **Around the game.**
  - a "now playing" card
  - the "Keep story scenes instrumental" option, and falling back to free music for gaps
  - the music switch in the pause menu
- **Sound and credits.**
  - Sound effects for both styles: soft paper sounds from CC0 libraries, and chiptune effects made with Web Audio.
  - The Credits screen, listing every track and its license.

**Files:** `scripts/media.mjs`, `src/engine/audio/*` (+ tests), `src/music/{catalog,recommendations,library,tags,matcher,links}.ts` (+ tests), `src/screens/{MusicLibrary,Credits}.tsx`, `src/screens/music/*`, `media/` (git-ignored)

**Done when:**

- Level 1 music plays with smooth crossfades, and Haydn's chord lands on the light burst.
- A test folder of tagged songs matches to the right levels, and listen-along links open the right searches.
- Every track has an allowed license and a credit, and the content check enforces it.
- Unit tests for the matcher, links and playlists pass.

**Dependencies:** Task 2. Choosing the file host needs Dave.

### Task 4: The rest of Level 1 (M4)

**What:** Episodes 2–6 from the approved script, in both styles, each with its scenes, golden thread, *Where and when* card and read mark:

- **Episode 2, The Garden of Eden.** Adam formed from dust, the garden and its four rivers, the two trees, the parade of animals, and Eve. Play: **naming the animals** (the matching and naming kind of play).
- **Episode 3, The Serpent and the Fall.** The serpent, the fruit, the fig leaves, the hiding, and God's voice shown as light. Play: **spot the twist**.
- **Episode 4, The Promise and the Exile.** The promise of Genesis 3:15, the garments, and the cherubim with the flaming sword. Play: **lights in the dark**.
- **Episode 5, Cain and Abel.** It starts with a short content note. Two brothers, two offerings, the field (told with restraint) and the mark. Play: **Abel's flock** (the herding kind of play).
- **Episode 6, From Adam to Noah.** The first cities, music and metalwork; Seth; the ten generations; Enoch taken up; Noah's birth. Play: **the family tree** (the ordering kind of play).

**Files:** `src/content/levels/01-creation-and-fall/*`, `src/minigames/{naming,spot-the-twist,lights-in-the-dark,herding,family-tree}/*` (+ tests), new props and characters in `src/styles/*/`

**Done when:**

- The whole Level 1 story plays from start to finish in both styles.
- Every minigame's rules pass their scripted tests, including gentle mode.
- Every scene is within budget in `npm run perf`, and its screenshots are saved.

**Dependencies:** Task 2. Task 3 adds music, but isn't required.

### Task 5: Quiz, reflection and journal (M5)

**What:**

- **Quiz engine** (`quiz/`).
  - All seven question types.
  - Picking questions at random without repeats: missed questions weigh more, recently seen ones weigh less, questions spread across episodes, at most three of one type per run.
  - Seeded runs, so a review shows the exact run.
  - Scoring, 1–3 stars, best score, and history in the save.
- **Level 1's question bank** of at least 40, from the approved script.
- **Quiz screen, in both styles.**
  - Answer cards with the explanation and reference.
  - Reordering by drag and by keyboard.
  - A map picker for "where did it happen?" questions. It's built on the shared map drawing core, which Task 6 extends into the full world map.
- **Quiz on the main menu:** one level, one Age, or *Everything so far*.
- **Reflection and prayer screen:** the verse, the question, a journal box that saves as you type, and the prayer (an original prayer, then the Glory Be).
- **Journal screen.**
- **The end of a level:** last episode, then the quiz, then reflection, then the window ceremony. The ceremony is a placeholder until Task 6.

**Files:** `src/quiz/*` (+ tests), `src/content/levels/01-creation-and-fall/quiz.ts`, `src/screens/{Quiz,QuizMenu,Reflection,Journal}.tsx`, `src/map/core/*` (shared map drawing)

**Done when:**

- Seeded tests prove that runs differ, that missed questions come back more often, and that the type and episode limits hold.
- *Review your answers* shows the exact run.
- Journal entries survive reload and export.
- The level-end flow works in both styles, and `npm run a11y` passes on the quiz, reflection and journal screens.

**Dependencies:** Task 4

### Task 6: Cathedral and world map (M6)

**What:**

- **The glass cathedral (Paper & Glass).**
  - The nave with 14 bays. Age I is built; later bays are dark and waiting.
  - Level 1's window: 6 medallions read bottom to top, each with its episode emblem, made of real glass pieces and lead lines, cached as images per state (unlit, lit, newly set).
  - The panel-setting animation: pieces drift in, the lead lines draw themselves, and light floods through.
  - Light that follows the real time of day.
  - Golden threads as glowing lines. Threads that point to unreached windows glimmer there.
  - *Step inside*: the camera flies into a medallion, and the glass becomes the paper scene.
- **The pixel cathedral:** the same structure in pixel stained glass.
- **The world map.**
  - A paper relief map in Paper & Glass, and the pixel map in Pixel (geography from the mockup, mountains drawn as peaks).
  - The route, level markers (Level 1's region around Eden), the Ages strip, and golden-thread lines where a thread has a place.
  - Episode replay and quiz entry from both the map and the cathedral.
- **The window ceremony** at the end of Level 1.

**Files:** `src/styles/paper-glass/cathedral/*`, `src/styles/pixel/cathedral/*`, `src/styles/*/map/*`, `src/map/*`, `src/screens/{Cathedral,WorldMap}.tsx`, `src/content/geography.ts` (expanded)

**Done when:**

- Finishing Level 1 sets all 6 panels and completes the window in both styles.
- *Step inside* replays an episode.
- The cathedral and map stay within budget in `npm run perf`, thanks to the cached glass.
- Their screenshots are saved.

**Dependencies:** Task 5

### Task 7: Polish and release (M7)

**What:**

- The **first-launch style chooser**: a live preview of an Episode 1 scene in both styles, side by side.
- An **accessibility pass**: axe on every screen, a keyboard-only run, screen-reader labels, and checks of the text sizes, high contrast and readable font.
- A **performance pass** on every scene and screen with the slowed processor.
- **Screenshot baselines** for every scene and screen, approved by Dave, so later changes are compared against them.
- The **storage and backup reminder**, the **Credits** screen checked, and the `README.md` (run, build, test, media, deploy).
- `docs/code-tour.md`: React and game concepts taught through this codebase, for a React learner, ending with recipes such as how to add a scene, a prop in both styles, or a quiz question.
- **Deployment with Dave**: a GitHub repository plus Vercel, and the music host connected. It stays unlisted until the translation decision (spec §12.2).
- A final self-review, and a **Results** section added to this plan.

**Files:** `src/screens/StyleChooser.tsx`, `README.md`, `docs/code-tour.md`, `vercel.json`, updates across `src/`

**Done when:**

- Every check passes: `check`, `test`, `build`, `perf`, `a11y` and `shots`.
- Dave approves the baselines and plays Level 1 from start to finish.
- It is deployed.
- The Level 1 checkpoint discussion has happened (spec §16.2): what two styles really cost, and whether to continue with both.

**Dependencies:** Tasks 1–6

### Task 8: Level 2, *Noah and the Nations* (M8)

After the first build, each level follows the spec's way of making a level (§15): script, art, build, checks, play-test. Level 2 completes Age I.

**1. Script (written; waiting for Dave):** `docs/scripts/level-02-noah-and-the-nations.md`. It has 7 episodes and 30 scenes (and one optional), plus the threads, *Where and when*, a quiz bank of 51 questions, reflection and prayer, both playlists, and a table of all 59 quotations in both translations. Each quotation was checked word for word against the downloaded texts. **For Dave:** approve or change it, decide on Noah's vineyard (Genesis 9:18–29, optional scene 5.5), and confirm the two verses marked ⚠ verify.

**2. Art, in both styles:**
- **Sets:**
  - the violent city at dusk, and Noah's home;
  - the clearing where the ark is built;
  - the flood sea, in storm and in calm;
  - the mountainside of Ararat, with its altar and the rainbow sky;
  - the plain of Shinar and its tower;
  - the tapestry map of the nations;
  - Ur, the road to Haran, and Haran at night.
- **Characters:**
  - Noah, at two ages;
  - Noah's wife, his three sons and their wives;
  - crowds and builders, in silhouette;
  - Terah, Abram, Sarai and Lot.
- **Animals:** the raven. Level 1's lion, deer, sheep, elephant, birds and dove are reused, and a few more pairs are added for the boarding.
- **Props:**
  - the ark in its stages (frame, hull, pitch, door);
  - the olive tree and leaf, the altar, and the rainbow;
  - bricks and kilns, and the tower's terraces;
  - tents, camels and the cloak.

**3. Build:**
- **Content:** the seven episodes as scenes, the quiz bank, the level's music, its reflection, and its threads. The threads are fulfilled in these Ages:
  - Mary, the Spirit like a dove: XI;
  - the new covenant: XII;
  - the Church, Baptism, Pentecost, all nations blessed: XIII.
- **New games, as pure rules with tests:**
  - walk with God (quiet);
  - building the ark (building);
  - through the storm (steering);
  - the dove (flight);
  - colors of the promise (light and reveal);
  - the tower (stacking, then courier routes on the map).
  - The family tree is reused, from Shem to Abram.
- **Map:** the Level 2 marker at Ararat; regions for Ararat, Shinar, Ur and Haran (for the WHERE questions); and the route on to Ur and Haran.
- **Cathedral:** Level 2's window, with 7 medallions and their emblems in both styles. With it, the bay of Age I is complete.
- **Music:** the tracks in the script's table, found and license-checked (`npm run media`), with substitutes where none is allowed.

**4. Checks:** all of them: `check`, `test`, `build`, `bake`, `playthrough` (extended to Level 2), `a11y`, `keyboard`, `perf` (on a quiet computer), `saves`, and `shots` with new baselines for the Level 2 scenes.

**5. Play-test:** Dave plays Level 2 from start to finish, and what he finds is fixed.

**Status (October 2026):** steps 1–4 are done; step 5 is Dave's.
- **Script:** approved, with Noah's vineyard included (scene 5.5, told only from outside the tent).
- **Build:** all seven episodes are built in both styles, with their six new games and the family tree from Shem to Abram.
- **Checks:** all pass.
  - The playthrough runs Level 2 from start to finish in both styles, through its quiz, reflection and window ceremony.
  - Also `check`, `test`, `a11y`, `keyboard` and `saves`.
  - `perf` is within budget for every Level 2 scene, after a fix that fills the pixel rain's streaks together. The demo's style switch and the cathedral sometimes go over on this busy computer, as before.
  - New `shots` baselines cover the Level 2 scenes. The quiz menu and the ceremony baselines were updated, since both now show Level 2. Dave still needs to look them over.
- **Two ways the scenes differ from this plan:**
  - The rainbow is seven sky layers, one per band, so it can be drawn a band at a time.
  - The tower game starts with its first terrace already built, so the tower can be seen before the first brick.
- **A new safeguard:** a contract test stops two art modules from using the same name. Before it existed, one name quietly replaced another's art.

### Task 9: Level 3, *Abraham, Father of Faith* (M9)

The same way as Level 2: script, art, build, checks, play-test. Level 3 opens Age II, the Patriarchs.

**Status (October 2026):** steps 1–4 are done; step 5 is Dave's.
- **Script:** `docs/scripts/level-03-abraham-father-of-faith.md`, approved by Dave. It has 10 episodes and 39 scenes, 85 quotations checked word for word, and a 68-question quiz.
- **Build:** all ten episodes are built in both styles, each with its own play:
  - the journey on the map;
  - dividing the flocks;
  - by night;
  - counting the stars;
  - the well in the wilderness;
  - new names;
  - serving the guests;
  - Abraham's pleading;
  - the feast;
  - the climb.
- **Cathedral and map:** the Level 3 window has ten medallions, zigzagging so they fit, and opens the bay of Age II. The map traces Abraham's route from Haran to Moriah.
- **Music:** twelve new recordings, all public domain, CC0 or CC BY. Five pieces had no allowed recording and were replaced; `music.ts` lists them.
- **Checks:** the playthrough runs Level 3 from start to finish in both styles, through its quiz, reflection and window ceremony.

**Done when:** Level 2 plays from start to finish in both styles, every check passes, Dave approves it, and the cathedral's Age I bay and the map up to Haran are complete.

**Dependencies:** Dave's approval of the script; the Level 1 checkpoint decision (spec §16.2), since it decides whether the art is made in both styles.

### Task 10: Level 4, *Isaac and Jacob* (M10)

The same way again: script, art, build, checks, play-test. Level 4 continues Age II.

**Status (October 2026):** steps 1–4 are done; step 5 is Dave's.
- **Script:** `docs/scripts/level-04-isaac-and-jacob.md`, approved by Dave. It has 7 episodes and 29 scenes, 87 quotations checked word for word, and a 50-question quiz.
- **Build:** all seven episodes are built in both styles, each with its own play:
  - watering the camels;
  - what is it worth? (the scales);
  - the blessing;
  - the ladder;
  - the sons' names;
  - hold on;
  - seven bows.
- **Cathedral and map:** the Level 4 window has seven medallions in the bay of Age II. The map traces Jacob's journeys from Beer-sheba to Haran and home to Mamre, with new places for Bethel, the Jabbok and Bethlehem. The road ahead now points to Level 5 at Dothan.
- **Music:** seven new recordings, all public domain or CC BY. Three pieces had no allowed recording and were replaced; `music.ts` lists them.
- **Checks:** all pass.
  - The playthrough runs Level 4 from start to finish in both styles, through its quiz, reflection and window ceremony (68 checks).
  - `check`, `test` (1,354 tests), `a11y`, `keyboard` and `saves` pass.
  - `perf` is within budget for every Level 4 scene in both styles; the busiest averages 1.8 ms of work a frame.
  - New `shots` baselines cover the Level 4 scenes. The quiz menu, cathedral, ceremony and map baselines were updated, since they now show Level 4. Dave still needs to look them over.
- **Two ways the scenes differ from the script:**
  - Episode 5's play shows baby Joseph in Rachel's arms when his name comes up, a little before the verse that tells of his birth.
  - Episode 6's dawn comes as the sun rising over the hills while Jacob holds on; the sky turns fully to dawn when the next scene begins.
- **Small framework changes:** the camel can now drink and kneel; the pixel ladder is drawn straight onto the screen, because it is taller than a kept picture allows.

### Task 11: Level 5, *Joseph and His Brothers* (M11)

The same way again: script, art, build, checks, play-test. Level 5 continues Age II.

**Status (October 2026):** steps 1–4 are done; step 5 is Dave's.
- **Script:** `docs/scripts/level-05-joseph-and-his-brothers.md`, approved by Dave. It has 7 episodes and 28 scenes, 107 quotations checked word for word, and a 50-question quiz.
- **Build:** all seven episodes are built in both styles, each with a different kind of play from the spec's library:
  - to Dothan (pathfinding, on a cloth map);
  - caring for the prisoners (serving);
  - Pharaoh's dreams (decoding);
  - filling the sacks (stacking);
  - the silver cup (searching);
  - come near to me (quiet);
  - the twelve blessings (matching).
- **Cathedral and map:** the Level 5 window has seven medallions in the bay of Age II. The map traces Joseph's road from Hebron by Shechem and Dothan into Egypt, and his family's to Goshen, with new places for Dothan and Goshen. The road ahead now points to Level 6, *Job*, in the land of Uz.
- **Music:** eight new recordings, all public domain, CC0 or CC BY. Six pieces had no allowed recording and were replaced (two by tracks from Level 1); `music.ts` lists them.
- **Checks:** all pass.
  - The playthrough runs Level 5 from start to finish in both styles, through its quiz, reflection and window ceremony (68 checks).
  - `check`, `test` (1,628 tests), `a11y`, `keyboard` and `saves` pass.
  - `perf` is within budget for every Level 5 scene in both styles; the busiest averages 1.1 ms of work a frame.
  - New `shots` baselines cover the Level 5 scenes; the screens that list the levels (menu, quiz menu, cathedral, ceremony, map) now show Level 5. Dave still needs to look them over.
- **A fix worth remembering:** art drawn with unrounded `Math.cos` or `Math.sin` can differ in its last digit between the browser that bakes it and the tests that fingerprint it. The chariot's spokes are now rounded.

### Task 12: Level 6, *Job* (M12)

The same way again: script, art, build, checks, play-test. Level 6 completes Age II.

**Status (October 2026):** steps 1–4 are done; step 5 is Dave's.
- **Script:** `docs/scripts/level-06-job.md`, approved by Dave. It has 6 episodes and 20 scenes, 57 quotations checked word for word, and a 42-question quiz.
- **Build:** all six episodes are built in both styles, each with a different kind of play from the spec's library:
  - Job's blessings (light and reveal);
  - seven days (quiet);
  - true or twisted? (spotting the twist);
  - carved in the rock (memory);
  - where were you? (searching);
  - home to the fold (gathering).
- **New art:**
  - Backdrops: Job's pastures, the ash heap, the court of heaven, the great rock.
  - Props: the accuser, an ox, the whirlwind, storm clouds, the storehouses of snow, the Pleiades and Orion.
  - People: Job (in his fine robe, in sackcloth, and old), his wife, his three friends, a messenger.
  - A new `sit` pose for every person, for sitting in grief.
  - "Bands": several people drawn as one piece, used for Job's sons, daughters and servants.
- **Cathedral and map:** the Level 6 window has six medallions and completes the bay of Age II. The map marks the land of Uz with a question mark, and Edom is a new place to tap in the quiz. The road ahead now points to Level 7, *Moses Is Called*, in Egypt.
- **Music:** six new recordings, all public domain or CC BY. Two pieces had no allowed recording and were replaced (one by a track from Level 1); `music.ts` lists them.
- **Checks:** all pass.
  - The playthrough runs Level 6 from start to finish in both styles, through its quiz, reflection and window ceremony (60 checks).
  - `check`, `test` (1,821 tests), `a11y`, `keyboard` and `saves` pass.
  - `perf` is within budget for every Level 6 scene in both styles; the busiest averages 1.9 ms of work a frame.
  - New `shots` baselines cover the Level 6 scenes. Dave still needs to look them over.
- **A fix worth remembering:** a scene full of separate puppets can fail `perf` on late frames even when its average work is low. The cost is drawing (in the profile, 70% of the time was the browser's own work). Episode 1 first had 13 people and about 20 animals, each person drawn as five pieces. Drawing the sons, daughters and servants as one band each brought late frames from about 1.5% to 0.6%.

### Task 13: Level 7, *Moses Is Called* (M13)

The same way again: script, art, build, checks, play-test. Level 7 opens Age III, *Out of Egypt*.

**Status (October 2026):** steps 1–4 are done; step 5 is Dave's.
- **Script:** `docs/scripts/level-07-moses-is-called.md`, approved by Dave. It has 5 episodes and 20 scenes, 69 quotations checked word for word, and a 40-question quiz.
- **Build:** all five episodes are built in both styles, each with a different kind of play from the spec's library:
  - the midwives' night (stealth and escape, a first);
  - a basket of bulrushes (building);
  - watering the flock (pouring);
  - turn aside and see (light and reveal: the burning bush, the spec's own example);
  - the signs (ordering).
- **New art:**
  - Backdrops: the brick pits, the Hebrew quarter at night, inside a Hebrew house, the Nile among the papyrus, Horeb.
  - Props: the reed basket (woven row by row), the burning bush, the water that turns red.
  - Fourteen people, including Moses as a prince and as an old shepherd, Shiphrah and Puah, Jethro, Zipporah and Aaron.
  - Bands for the Hebrew families, the slaves and the seven daughters of Reuel; bands can now walk.
- **Cathedral and map:** the Level 7 window opens the bay of Age III, with five medallions. The map traces Moses' road from Egypt to Midian, to Horeb and back, with Midian as a new region and Horeb as a new place. The road ahead now points to Level 8, *The Plagues and the Passover*.
- **Music:** three new recordings, all public domain, among them Marian Anderson's 1924 "Go Down, Moses," the spec's piece. Verdi's "Va, pensiero" had no allowed recording and became "Nobody Knows the Trouble I've Seen"; `music.ts` says so.
- **Checks:** all pass.
  - The playthrough runs Level 7 from start to finish in both styles, through its quiz, reflection and window ceremony (52 checks).
  - `check`, `test` (2,004 tests), `a11y`, `keyboard` and `saves` pass.
  - `perf` is within budget for every Level 7 scene in both styles.
  - New `shots` baselines cover the Level 7 scenes. Dave still needs to look them over.
- **A fix worth remembering:** a glow the size of the screen is costly in both styles. In pixel art it is redrawn whenever its size or opacity changes. In Paper & Glass a zoom well past the usual 1.04 makes the backdrops redraw. "I AM WHO I AM" now grows the flame a little, with a gentle zoom.

### Task 14: Level 8, *The Plagues and the Passover* (M14)

The same way again: script, art, build, checks, play-test.

**Status (October 2026):** steps 1–4 are done; step 5 is Dave's.
- **Script:** `docs/scripts/level-08-the-plagues-and-the-passover.md`, approved by Dave. It has 6 episodes and 22 scenes, 72 quotations checked word for word, and a 42-question quiz.
- **Build:** all six episodes are built in both styles, each with a different kind of play from the spec's library:
  - God's promises (catching);
  - gathering stubble (herding and gathering);
  - the plagues in order (ordering);
  - the Passover night (serving and distributing);
  - the march out (rhythm);
  - when your children ask (matching and naming).
- **New art:**
  - Backdrops: a harvested field of stubble, and the Nile turned to blood. The Nile backdrop is now one function, drawn in either color.
  - Props: the nine plague pictures in round frames, a frog, a swarm (gnats, flies or locusts), the blood on the doorposts and lintel, the Passover dishes, stubble, and the pillar of cloud and fire.
  - People: Pharaoh's magicians and a Hebrew father and mother. Children can now pray in pixel art.
- **Cathedral and map:** six new medallions for the Level 8 window. The map adds Rameses and Succoth, and the road ahead now points to Level 9, *Through the Sea*.
- **Music:** six new recordings, all public domain or CC0, including Mozart's Lacrimosa and Dies irae, Fauré's Agnus Dei, and Handel's "Worthy Is the Lamb."
- **Checks:** all pass.
  - The playthrough runs Level 8 from start to finish in both styles, through its quiz, reflection and window ceremony.
  - `check`, `test` (2,186 tests), `a11y`, `keyboard` and `saves` pass.
  - `perf` is within budget for every Level 8 scene in both styles.
  - New `shots` baselines cover the Level 8 scenes. Dave still needs to look them over.
- **A fix worth remembering:** a golden thread that first glows in a scene's last line or two can end before the playthrough (or a quick reader) sees it. Episode 6's glow now comes up on the scene's first line, over the unleavened bread, and stays as the table becomes the bread and the cup.

### Task 15: Level 9, *Through the Sea* (M15)

The same way again: script, art, build, checks, play-test. Level 9 closes Age III, *Out of Egypt*.

**Status (October 2026):** steps 1–4 are done; step 5 is Dave's.
- **Script:** `docs/scripts/level-09-through-the-sea.md`, approved by Dave. It has 7 episodes and 23 scenes, 81 quotations checked word for word, and a 44-question quiz. Two quiz questions were added after approval, so that every episode has six.
- **Build:** all seven episodes are built in both styles, each with a different kind of play from the spec's library:
  - the light in the camp (light and reveal);
  - the path through the sea (pathfinding, on a map of the seabed seen from above);
  - Miriam's song (rhythm, as call and response);
  - enough for each (herding and gathering: the manna);
  - streams in the desert (pouring and water);
  - hands held high (timing);
  - sharing the load (serving and distributing).
- **New art:**
  - Backdrops: the shore of the Red Sea, the seabed between the walls of water, the same seabed as a map, the oasis of Elim, the red valley of Rephidim, and the hilltop above the valley.
  - Props: a stream, the great rock at Horeb, a desert pool, the manna, an omer jar (empty, full, heaped), the banners of Israel and Amalek, and four new map tokens.
  - People: old Miriam, a grandmother, Joshua and Hur, and groups for the dancing women and the warriors of Amalek.
- **Cathedral and map:** seven new medallions for the Level 9 window. The map adds the Red Sea (as a region to tap, the crossing place unknown), Marah, Elim, the wilderness of Sin and Rephidim at their traditional sites, and the road ahead now points to Level 10, *Sinai*.
- **Music:** three new recordings: the Easter sequence *Victimae paschali laudes* (CC BY), Charpentier's *Te Deum* prelude (CC0) and a 1913 "Rock of Ages" (public domain). The Exsultet and Handel's *Israel in Egypt* had no allowed recording; `music.ts` says so. The closing prayer is the Our Father, for the daily bread.
- **Checks:** all pass.
  - The playthrough runs Level 9 from start to finish in both styles, through its quiz, reflection and window ceremony (68 checks).
  - `check`, `test` (2,397 tests), `a11y`, `keyboard` and `saves` pass.
  - `perf` is within budget for every Level 9 scene in both styles. The busiest, the manna gathering, runs at under 1% late frames.
  - New `shots` baselines cover the Level 9 scenes. Dave still needs to look them over.
- **A fix worth remembering:** a hint with the 'rest' gesture turns the screen into a quiet rest that waits for "Continue". Use it only for a real rest, never for "listen first" in a game that goes on by itself.

## Parallelization

- **Code tasks run in order.** Each one builds on the last, and running them in order keeps the code consistent for the code tour. I do the work in this session, without subagents, as the session guidelines require.
- **Two things overlap with Dave's time:**
  - The Level 1 script is written at the very start, so Dave reviews it while Task 1 is being built.
  - Choosing the music host can be settled at any point before Task 3.

## Integration points

- **Vercel and GitHub:** set up with Dave in Task 7.
- **A file host for music,** such as Cloudflare R2: set up with Dave before or during Task 3. The app reads its address from `VITE_MEDIA_URL`.
- **Free music sources:** Musopen, Wikimedia Commons, the Internet Archive and US military band recordings. Licenses are checked per track.
- **Bible text sources:**
  - RSV-2CE wording, checked against a printed Ignatius Bible or the closest available edition.
  - Douay-Rheims, which is public domain.
- **Streaming services:** only plain links that open search pages (Spotify, Apple Music, YouTube Music, YouTube). No APIs, as spec §12.4 explains.
- **Ignatius Press:** the permission request before the public launch. Claude drafts it.

## Testing strategy

- **Unit tests (Vitest):**
  - **Engine:** clock, easing and springs, input mapping, seeded random.
  - **Saves:** checksums, upgrades, backups and export/import, using `fake-indexeddb`.
  - **The director:** beats, waiting and checkpoints.
  - **Minigames:** each one's rules with scripted inputs.
  - **The quiz:** picking, weighting, limits and seeded review.
  - **Music:** the matcher, links and playlist logic.
- **Content checks (Vitest):**
  - every prop, character and pose exists in both styles
  - every verse reference exists in both translations
  - every golden thread links real episodes and references
  - Level 1 has at least 40 questions covering every episode
  - every audio track has an allowed license and a credit
  - the total of quoted verses is reported
- **Static checks:** `npm run check` (TypeScript and Oxlint). `npm run build` must pass.
- **Visual checks:** `npm run shots`, with every screen and scene in both styles at laptop size and in phone landscape, plus reduced motion. Compared against the approved baselines from Task 7 on.
- **Performance:** `npm run perf`, which plays each scene for 10 s with the processor slowed 4×. It fails if the game's own work goes over 8 ms per frame or frames drop.
- **Accessibility:** `npm run a11y`, with axe on every screen, plus a keyboard-only run.
- **People:** Dave play-tests at the end of every task.

## Risks

| Risk | Mitigation |
|---|---|
| Two styles make the art take much longer than expected | Props are built from shared scene data, and Episode 1 (Task 2) shows the real cost early. The Level 1 checkpoint in Task 7 decides whether to continue with both. |
| Turning SVG layers into images takes too long on phones when a scene loads | Prepare the next scene during the current one. Lower the image resolution on weak devices. Measure in `perf` from Task 1 on. |
| Frame timing in headless Edge differs from real phones | Measure inside the page with the processor slowed. Dave also checks on his own phone at every milestone. |
| The RSV-2CE wording can't be confirmed exactly | Check against a printed Ignatius Bible (Dave), and flag any verse that can't be confirmed. The Douay-Rheims fallback is always ready. |
| Some Level 1 pieces have no free recording with an allowed license (for example, a good *Creation*) | Choose another fitting piece and tell Dave. Licenses are checked before any file is added. |
| Safari doesn't play Opus | Encode AAC as well, and let the player pick the format the browser supports. |
| iPhone and iPad browsers can't pick a whole folder | Fall back to selecting many files at once (already planned). |
| The browser clears stored saves or music | Ask for permanent storage, keep backups, and remind the player to export now and then. |
| Library versions are newer than my training data | Check against the installed type definitions, documentation and real builds rather than memory. |
| Large audio files end up in git | Media lives in the git-ignored `media/` folder and on the file host. A check rejects audio files in `src/` and `public/`. |

## Key decisions

- **Follow the Vite template,** as in the portfolio: React 19, Vite 8, TypeScript ~6.0 (TypeScript 7 exists, but the template still pins 6) and Oxlint.
- **Zustand for app and save state; plain shared objects for per-frame values.** Moving things never re-renders React, which keeps 60 fps. This is the same lesson as the portfolio's story store.
- **idb-keyval behind a storage adapter.** The game uses IndexedDB, and tests use `fake-indexeddb` or a memory backend.
- **Self-hosted fonts through Fontsource.** No requests to Google Fonts, and the game is ready for offline install later. Atkinson Hyperlegible **Next** is the readable font.
- **Content as TypeScript data,** so the typechecker catches broken references. Narration text lives separately so it's easy to review.
- **Media outside git.** Audio is compressed by `scripts/media.mjs` into the git-ignored `media/` folder and served from `VITE_MEDIA_URL`.
- **The Level 1 script comes first,** so Dave's review overlaps with the Task 1 build, and nothing is built from unapproved content.
- **No subagents.** I do the work in this session, as the session guidelines require.

## Results (2026-10-18)

The first build is done: the engine, both art styles, both music modes, saves, the quiz,
the cathedral and the world map, and Level 1, *Creation and the Fall*, playable from the
first scene to the window ceremony. Work began on 2026-10-15; each milestone is a commit
(`git log`).

### What was built

| Milestone | Result |
|---|---|
| M1 Skeleton | The clock, input, motion, saves and settings; the stage holding both styles with a live crossfade; title, menu, settings and credits |
| M2 Story player | The director and timeline, the story screen and Episode 1 with "Let there be…" woven through the six days |
| M3 Music and sound | Free sacred music with crossfades, cues (Haydn's chord on "and there was light") and ducking; worship songs from the player's files or listen-along links; sounds made by the game itself |
| M4 Level 1 | Episodes 2–6, each with its interaction: naming the animals, spotting the twist, lights in the dark, Abel's flock, the family tree |
| M5 Quiz, reflection, journal | 54 questions of seven types, seeded and weighted runs with an exact review, reflection and prayer, the journal |
| M6 Cathedral and map | The nave of 14 bays and 53 windows, panels set by the window ceremony, golden threads, light by time of day, "Step inside"; the world map as paper relief and pixel map |
| M7 Polish | The style chooser with live previews, the backup reminder, the accessibility and keyboard passes, code splitting, screenshot baselines, the README and the code tour, `vercel.json` |

### The checks

| Check | Result |
|---|---|
| `npm run check` | passes |
| `npm test` | 487 tests pass |
| `npm run build` | passes; the first download is 259 kB of script (84 kB compressed), down from 628 kB, with the rest loaded while the title shows |
| `npm run playthrough` | Level 1 plays from start to finish in both styles, with every interaction, the quiz, reflection, the ceremony and a replay (60 checks) |
| `npm run a11y` | no problems on any screen in either style, including with the largest text, high contrast and the readable font on a phone held sideways |
| `npm run keyboard` | every control on every screen can be reached and shows its focus; a game can be started and played with keys only |
| `npm run saves` | saves survive reloading, exporting and importing |
| `npm run shots` | 242 screenshots: every screen and scene in both styles, at laptop size, phone landscape and phone upright, plus reduced motion. Their baselines (2.4 MB) are in `baselines/`, waiting for Dave's approval |
| `npm run perf` | the story scenes, the demo and the map stay within budget. The cathedral was borderline, and this computer's measurements varied too much to tell (two identical runs gave 2.8% and 16% late frames, while other programs were busy); its moving lights were rebuilt to run on the graphics card. To be re-measured on a quiet computer and on Dave's phone |

### Changes from the plan

- **Music substitutes**, by the script's fallback rule, where no recording under an allowed
  license exists: Allegri's Miserere for *Attende Domine* (Episode 3), Parsons's Ave Maria
  for *Ave Maris Stella* (Episode 4), Bach's "Ich ruf zu dir" for *Parce Domine* (Episode 5),
  and Haydn's "By thee with bliss" for the *Salve Regina* (reflection).
- **RSV-2CE wording** is still to be checked against a printed Ignatius Bible; the
  verses that may differ are marked `unconfirmed` in `src/content/bible/verses.ts`.
- **Finish-the-verse questions** use authored wrong words, as the script's own examples
  did.
- **The style chooser** appears in every new game, not only the first, since each save
  keeps its own style.
- **Code splitting** moved from M6 to M7.

### What two styles cost (for the Level 1 checkpoint, spec §16.2)

- **Code:** each style's art is about as large as the other: about 3,300 lines for
  Paper & Glass and 2,750 for Pixel (props, layers, characters, cathedral and map),
  against about 17,000 lines shared by both. Two styles add roughly 12% to the code.
- **Where the cost is:** every new prop, character and pose is drawn twice, and the
  bigger moments (the river of Eden, the glory column, the veils of the Fall, the
  windows) needed tuning separately in each style. The engine, content, games, quiz,
  saves and every check are shared and cost nothing extra.
- **What it buys:** the switch at any moment works everywhere, and the tests keep the
  two in step (every scene's art and poses must exist in both).

### Still to do with Dave

- Approve the screenshot baselines (`shots/index.html` shows them all) and play Level 1
  from start to finish.
- Deploy: a GitHub repository and a Vercel project (README, "Publishing"), and the
  music on Cloudflare R2 (`docs/hosting-music.md`).
- Check the RSV-2CE verses against a printed Ignatius Bible.
- The Level 1 checkpoint: whether to continue with both styles.
