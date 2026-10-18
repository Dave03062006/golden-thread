# A tour of the code

This tour is for someone learning React. It explains how Golden Thread works, and
teaches the React and game ideas it uses through the game's own code, so each idea comes
with a real example you can open, change and watch. It ends with recipes for the
everyday jobs: adding a scene, a prop in both styles, a quiz question, a screen.

Read it with the code open beside it. File paths are relative to the project folder.
Start the game with `npm run dev`. The address options in the README let you jump
straight to the screen you're reading about.

## Contents

1. [The big picture](#1-the-big-picture)
2. [React, as this game uses it](#2-react-as-this-game-uses-it)
3. [Why React doesn't animate the game](#3-why-react-doesnt-animate-the-game)
4. [Scenes are data](#4-scenes-are-data)
5. [Stories: beats, cues and the director](#5-stories-beats-cues-and-the-director)
6. [The small games inside episodes](#6-the-small-games-inside-episodes)
7. [Two art styles, one scene](#7-two-art-styles-one-scene)
8. [Saves](#8-saves)
9. [Content, and the tests that guard it](#9-content-and-the-tests-that-guard-it)
10. [The checks that run in a browser](#10-the-checks-that-run-in-a-browser)
11. [Recipes](#11-recipes)

---

## 1. The big picture

Everything starts in `src/main.tsx`. It loads the fonts, and React draws the `App`
component (`src/app/App.tsx`) into the page.

`App` shows one screen at a time. Which screen is a piece of state: `screen` in the
app's store (`src/app/store.ts`). Calling `go('cathedral')` changes it, and React draws
the cathedral instead. There is no URL routing: a game rarely needs it.

The story screen is where most of the game happens. Inside it:

```
StoryScreen (src/screens/StoryScreen.tsx)
 ├─ a Director: which beat of which scene we're on   (src/scene/director.ts)
 │   └─ a Timeline: where everything is at any moment (src/scene/timeline.ts)
 ├─ the Stage: holds both art styles at once          (src/stage/Stage.tsx)
 │   ├─ PaperRenderer                                 (src/styles/paper-glass/)
 │   └─ PixelRenderer                                 (src/styles/pixel/)
 ├─ the narration panel, buttons and cards (ordinary React)
 └─ a minigame runner, while a "play" beat is on      (src/minigames/runner.ts)
```

A scene's moving parts are plain data. The director and timeline turn that data into
numbers for this exact moment: where the camera is, how bright a layer is, where the dove
has flown. Both renderers read the same numbers and draw them, each in its own style.
That is why the style can switch mid-scene without anything restarting.

## 2. React, as this game uses it

### Components and props

A component is a function that returns what to show. `MenuScreen`
(`src/screens/MenuScreen.tsx`) is a good first read. It reads the save, then returns a
panel with the player's name and a list of buttons:

```tsx
<Button onClick={() => go('cathedral')}>Cathedral</Button>
```

`Button` is a component too (`src/ui/components.tsx`). The parts in curly braces are
**props**, its inputs: `onClick` is the function to call, and the children (here, the
word "Cathedral") are what goes inside. Shared pieces like `Button`, `Panel`, `Dialog` and
`Choice` live in `src/ui/components.tsx`. Each screen is built from them, so every screen
looks and behaves the same.

### State with `useState`

State is a value that, when it changes, makes React draw the component again.
`WorldMapScreen` (`src/screens/WorldMapScreen.tsx`) remembers which marker the player
chose:

```tsx
const [chosen, setChosen] = useState<LevelMarker | null>(null)
```

Choosing a marker calls `setChosen(marker)`, React draws the screen again, and the dialog
opens because `chosen` isn't null any more. Closing calls `setChosen(null)`.

`useState` can also take a function, which runs only the first time:
`useState(() => dayLight(new Date()))` in `CeremonyScreen` works out the time of day
once, not on every draw.

### Shared state with Zustand

State that many screens need (which screen is showing, the open save) lives in one
**store**, made with the small Zustand library. `src/app/store.ts` creates it:

```ts
export const useApp = create<AppState>()((set, get) => ({
  screen: 'title',
  save: null,
  go: (screen) => set({ screen }),
  // …
}))
```

A component reads just the piece it needs:

```ts
const save = useApp((s) => s.save)
const go = useApp((s) => s.go)
```

The function `(s) => s.save` is a **selector**. The component draws again only when
*that* piece changes, not on every change to the store. Device settings, like text size
and volumes, use the same pattern in `src/engine/settings.ts`. That store is also saved to
`localStorage` by Zustand's `persist` middleware.

### Effects with `useEffect`

Drawing should only describe what to show. Anything that reaches outside (a timer, a
subscription, focusing an element) goes in an **effect**, which runs after React has
drawn. The function an effect returns is its **cleanup**, which runs before the effect
runs again or when the component goes away.

`CathedralScreen` keeps its light in step with the time of day:

```ts
useEffect(() => {
  const timer = setInterval(() => setLight(dayLight(new Date())), 60_000)
  return () => clearInterval(timer)
}, [])
```

The `[]` at the end lists what the effect depends on. Empty means "once, when the screen
opens". The cleanup stops the timer when the player leaves. Forget it, and the timer
would keep running on a screen that no longer exists.

### Refs with `useRef`

A ref holds something that isn't for drawing: a DOM element, or a value that must
survive between draws without causing one. `CeremonyScreen` keeps a ref to its heading
and focuses it when the screen opens, so screen readers start there:

```tsx
const heading = useRef<HTMLHeadingElement>(null)
useEffect(() => heading.current?.focus(), [])
// …
<h1 ref={heading} tabIndex={-1}>
```

### Avoiding needless redraws: `memo` and `useCallback`

React draws a component again whenever its parent draws again. Usually that's cheap. The
cathedral's nave isn't: it has 53 windows and hundreds of buttons. `NaveView`
(`src/screens/cathedral/NaveView.tsx`) is wrapped in `memo`, so it draws again only when
its props change.

That only works if the props really stay the same. A function written inline,
`onChoose={(w, p) => setChosen(...)}`, is a new function on every draw, so `memo` would
see a change every time. `CathedralScreen` makes the function once with `useCallback`:

```ts
const choose = useCallback((window: CathedralWindow, panel?: Panel) => setChosen({ window, panel }), [])
```

Now picking an Age in the strip under the nave redraws the strip, and not the nave.

### Handing a component's abilities to its parent

The cathedral screen needs to tell the nave "scroll to Age VI" or "fly into this
medallion". `NaveView` offers those as a **handle**, using `forwardRef` and
`useImperativeHandle`:

```ts
useImperativeHandle(ref, () => ({
  showAge(numeral, smooth = true) { /* scrolls */ },
  flyInto(episode, then) { /* zooms in, then calls `then` */ },
}))
```

and the screen calls `naveRef.current?.showAge('VI')`. Use this sparingly. Most things
are better as props. It suits commands like "scroll" or "play this animation now".

### Loading code only when it's needed: `lazy` and `Suspense`

The title screen should appear quickly, but the whole game is a lot of code. `App.tsx`
loads each screen's code the first time it's needed:

```ts
const LOADERS = {
  story: () => import('../screens/StoryScreen').then((m) => m.StoryScreen),
  // …
}
```

`lazy` turns each loader into a component, and `<Suspense fallback={…}>` says what to
show for the moment it takes to load. While the player is on the title screen,
`preloadScreens` quietly fetches them all, so by the time they press Play, the code is
there. The style chooser does the same on its own (`TitleScreen.tsx`), because it brings
both renderers and all their art.

## 3. Why React doesn't animate the game

React decides *what* is on the screen. It's built for things that change when someone
clicks: a dialog opens, a list grows. A game moves *everything, every frame*, 60 times a
second. Running React's whole drawing process 60 times a second would be far too slow.

So the moving parts skip React. There is one **master clock**, `src/engine/clock.ts`. It
runs once per screen refresh and calls whoever subscribed:

```ts
return gameClock.subscribe(({ dt, time }) => {
  // move things by `dt` seconds' worth
})
```

Movement always uses the time that passed (`dt`), never a frame count. That way it's
equally fast on a 60 Hz phone and a 120 Hz laptop. The clock also pauses everything at
once for the pause menu, while things that should keep moving pass
`{ whilePaused: true }`.

The renderers subscribe in an effect, and write positions straight onto the page's
elements. Look at `setTransform` in `src/styles/paper-glass/PaperRenderer.tsx`:

```ts
function setTransform(el: HTMLElement, transform: string) {
  if (writtenTransforms.get(el) === transform) return
  writtenTransforms.set(el, transform)
  el.style.transform = transform
}
```

It skips writing when nothing changed, because even writing the same value costs the
browser work. React creates the elements once, and then the clock moves them. This split
is the most important idea in the code: **React for structure, the clock for motion.**

The spec's performance rules (§10) follow from it. Moving things use `transform` and
`opacity`, which the graphics card can animate without the browser redoing its layout.
Pictures are drawn once and kept, never redrawn every frame. And `npm run perf` checks
it all with the processor slowed down 4×.

## 4. Scenes are data

A scene is described without any art: `src/scene/types.ts`, `SceneDescription`. It's a
list of **layers** (sky, hills, water), from back to front, each at a **depth**, plus
**actors** (the dove, Adam, a lion) placed above a layer, plus a **camera**:

```ts
layers: [
  { id: 'void', depth: 0 },
  { id: 'stars-a', depth: 0.02, opacity: 0, pulse: { min: 0.45, seconds: 4.3 } },
  // …
],
```

Positions are fractions of the frame: `x: 0.5` is the middle, whatever the screen size.
Depth makes the parallax. When the camera pans, a layer at depth 1 (the nearest ground)
moves fully, and the sky at depth 0 doesn't move at all, which looks like distance.

`src/scene/evaluate.ts` turns a description plus a time into a **frame**: every layer's
and actor's exact place, size and opacity at that moment. It's a pure function, with no
drawing in it, so it can be tested directly (`evaluate.test.ts`).

`demoScene` (`src/scene/demo.ts`), the dove over the evening waters, is the smallest
complete scene. Open it with `?screen=scene`.

## 5. Stories: beats, cues and the director

An episode is a **set** (one `SceneDescription` for the whole episode) plus **scenes**,
and each scene is a list of **beats**. Episode 1 (`src/content/levels/01-creation-and-fall/episode-1.ts`)
reads almost like the script, thanks to the helpers in `src/scene/build.ts`:

```ts
beats: [
  say('Then God spoke.', camera({ zoom: 1, y: 0 }, { seconds: 3 })),
  play('light', { done: [ /* … */ ] }),
  withEvents(verse('GEN 1:3'), 'music:there-was-light'),
]
```

- `say` is a line of narration, and `verse` quotes Scripture by reference
  (`src/content/bible/verses.ts` holds the text).
- The arguments after the text are **cues**: changes that start with the beat.
  `camera({ zoom: 1 }, { seconds: 3 })` glides the camera back over three seconds.
  `actor('spirit', { opacity: 0.9 })` fades the Spirit in.
- `play('light')` is an interactive moment (section 6). Its `done` cues say where
  everything ends up once the player has finished it.

The **director** (`src/scene/director.ts`) keeps track of which beat we're on, and moves
to the next one when the player taps or presses Space. It applies each beat's cues to
the **timeline** (`src/scene/timeline.ts`), which remembers every change with its start
time and easing. So "where is the Spirit at 12.4 s?" always has an exact answer, and
both renderers ask the very same question.

### Checkpoints

Every scene is a checkpoint (spec §4). The director can start at any scene. It applies
every earlier scene's cues "long ago", so the world is already as those scenes left it.
That's why a `play` beat's `done` cues must leave the world *exactly* where the
interaction leaves it. Otherwise a player who reloads would find things in different
places. `src/minigames/playthrough.ts` checks this: it plays each episode, and at every
scene compares the world as played with the world rebuilt from the checkpoint.

## 6. The small games inside episodes

Each interactive moment ("Let there be…", naming the animals, spotting the twist,
lighting the lamps, keeping Abel's flock, the family tree) is a set of **rules**:
`GameRules` in `src/minigames/framework.ts`.

```ts
interface GameRules<State> {
  start(context): State
  step(state, inputs, context, emit): State
  view(state, context): GameView
}
```

- **Rules never draw.** `view` says what to show as numbers for scene channels (how far
  the land has risen, how bright the light is), plus any question or hint. The renderers
  draw those numbers like any other scene values.
- **Fixed steps.** `step` always advances exactly 1/120 of a second, however fast the
  screen is, so a game behaves the same everywhere. The runner (`src/minigames/runner.ts`)
  calls it as many times as the real time that passed calls for.
- **Testable without a screen.** A test can start a game, feed it scripted inputs, and
  check the result. See `src/minigames/naming/naming.test.ts`.

Every game also has a **gentle mode** (slower and more forgiving) and works with a mouse,
touch, or a single key, so nobody gets stuck.

## 7. Two art styles, one scene

Every layer and prop a scene uses must exist in both styles.
`src/styles/contract.test.ts` checks it, and `src/content/content.test.ts` checks every
pose.

**Paper & Glass** (`src/styles/paper-glass/`) draws with SVG: each layer and each part of
a prop (a wing, a head) is a piece of SVG. SVG is slow to draw every frame, so
`npm run bake` turns every piece into a picture file in `public/art/`, and the renderer
only moves pictures around. A prop is a **puppet**: its parts are separate pictures that
move against each other (the dove's wings flap). See the `fruit` in
`src/styles/paper-glass/props/fall.ts`: two parts, `glow` and `fruit`, and an `animate`
function that pulses the glow.

**Pixel** (`src/styles/pixel/`) draws pixel by pixel into a small canvas (320 × 180 art
pixels), which is then enlarged with hard edges. `PixelBuffer` (`buffer.ts`) collects
pixels in memory and copies them to the canvas in one go, which is many times faster than
drawing them one by one. Characters are **sprites**, text grids with one letter per
color, made with the `Grid` drawing helpers in `shapes.ts`. Effects that change smoothly
are **drawn** props, a `draw` function like the pixel `fruit` in
`src/styles/pixel/props/fall.ts`.

**The stage** (`src/stage/Stage.tsx`) keeps both renderers on the page all the time. The
one not showing waits, invisible and paused, its art already prepared. Switching style
just fades one over the other at the same moment of the scene.

The cathedral and the map follow the same idea. The shared parts (where the windows go,
which panels are lit, the map's projection and coastlines) are in `src/cathedral/` and
`src/map/core/`. Each style only draws them: `src/styles/*/cathedral/` and
`src/styles/*/map/`.

## 8. Saves

A save (`SaveData` in `src/engine/save/types.ts`) is one object: the player's name, where
they are, which episodes and threads they've finished and found, quiz records, the
journal. `src/engine/save/saves.ts` writes it to the browser's database (IndexedDB),
through a small storage adapter, so the tests can use memory instead.

- **A checksum** goes with each save, so damage is noticed. The previous save is kept as
  a backup and used if the newest one is damaged.
- **A version number** goes with it too. When the save's shape changes,
  `migrations.ts` upgrades old saves. New fields get safe defaults there (look at
  `panelsSet` and `lastBackupAt`), so an old save still opens.
- **Export and import** turn a save into a file and back. The menu reminds the player
  now and then to export a backup (`backup.ts`), because browsers can clear what they
  store.

The store's `checkpoint`, `changeSave` and `commit` (`src/app/store.ts`) are how screens
change the save: change it in memory, then write it.

## 9. Content, and the tests that guard it

All the content is TypeScript data in `src/content/`: the levels and episodes, the Bible
verses, the golden threads, the places, and each level's quiz. Because it's TypeScript,
a misspelled field or a wrong type is caught before the game even runs.

Some mistakes the typechecker can't see, so tests look for them:

- `src/content/content.test.ts` checks that every verse a story quotes exists, every
  scene id is used once, every cue changes something that exists, and every golden
  thread is hidden in a real actor that can be tapped.
- `src/content/quiz.test.ts` checks that a quiz has enough questions for every episode,
  that every question is answerable, and that every finish-the-verse question quotes
  Scripture word for word.
- `src/styles/art-manifest.json` is checked against the code, so forgetting
  `npm run bake` fails the tests.

## 10. The checks that run in a browser

Some things can only be checked in a real browser. The scripts in `scripts/` build on
Playwright, which drives Microsoft Edge. Each opens the built game (`npm run build`
first) and does what a player would:

- `playthrough.mjs` plays Level 1 from beginning to end, every interaction included.
- `a11y.mjs` runs the axe accessibility checks on every screen, and again with large
  text, high contrast and the readable font.
- `keyboard.mjs` tabs through every screen and starts a game with keys only.
- `perf.mjs` measures every frame with the processor slowed down.
- `shots.mjs` takes screenshots and compares them against the approved baselines.
- `saves.mjs` saves, reloads, exports and imports.

They find things by what a player sees, like `getByRole('button', { name: 'Begin' })`,
rather than by CSS classes. A test written that way also checks that the button has a
name a screen reader can say.

## 11. Recipes

### Add a scene to an episode

1. Open the episode, for example `src/content/levels/01-creation-and-fall/episode-3.ts`.
2. Add an entry to its `scenes` list, with an `id` like `l01-e3-s7` (level, episode,
   scene), a `title`, and its `beats`:

   ```ts
   {
     id: 'l01-e3-s7',
     title: 'The cool of the evening',
     beats: [
       say('Evening fell over the garden.', layer('eden-dusk', { opacity: 1 }, { seconds: 6 })),
       verse('GEN 3:9'),
     ],
   },
   ```

3. A cue can only change a layer or an actor that's in the episode's set. To add one,
   add it to the set at the top of the file (and, for new art, see the next recipe).
4. Quoting a verse that isn't in `src/content/bible/verses.ts` yet? Add its text there,
   in both translations.
5. Run `npm test`. The content tests catch an unknown verse, layer or actor, or a
   duplicated id. Then look at it with `?screen=story&scene=l01-e3-s7`, in both styles.
6. Add the scene to `STORY_SCENES` in `scripts/shots.mjs` and `scripts/perf.mjs`, so the
   checks cover it.

### Add a prop, in both styles

Say a scene needs a lamp.

1. **Paper & Glass.** In a file in `src/styles/paper-glass/props/` (the one for its
   episode, or a new one), write a `PaperPropArt`. It has a `box` (the drawing's
   coordinates), its `poses`, and its `parts`, each a piece of SVG. Copy the `fruit` as a
   start. Add it to that file's exported record. A new file's record must also be spread
   into `paperProps` in `src/styles/paper-glass/art.ts`.
2. **Pixel.** In the matching file in `src/styles/pixel/props/`, write a `PixelPropArt`.
   Use a **sprite** (frames drawn with `sprite(width, height, (g) => …)`) for things with
   poses, or a **drawn** prop (a `draw` function) for glows and growing things. Add it
   to the file's record, and to `pixelProps` in `src/styles/pixel/art.ts` if the file is
   new.
3. Run `npm run bake` to make its paper pictures.
4. Use it as an actor in a set: `{ id: 'lamp', prop: 'lamp', above: 'ground', x: 0.6, y: 0.7, size: 0.05 }`.
5. Run `npm test`. The contract test fails if either style is missing the prop or a pose.
   Then look at the scene in both styles, and switch between them while it plays: they
   should match in place and size.

### Add a quiz question

1. Open the level's quiz, for example `src/content/levels/01-creation-and-fall/quiz.ts`.
2. Add a question with a new `id`, the `episode` it's about, a `type`, and a `ref` to
   the passage. For a multiple-choice question, **the first option is the right one**.
   The quiz shuffles the options.

   ```ts
   {
     id: 'l01-q55',
     episode: E2,
     type: 'mc',
     prompt: 'What did God bring to the man, to see what he would call them?',
     options: ['The animals', 'The stars', 'The rivers', 'The trees'],
     explanation: 'Naming the animals was the man’s first task in the garden.',
     ref: 'GEN 2:19',
   },
   ```

3. The seven types (`mc`, `tf`, `who`, `order`, `where`, `finish`, `thread`) are described
   in `src/quiz/types.ts`.
4. Run `npm test`. `quiz.test.ts` checks it's answerable, its passage is real, and (for
   `finish`) that the verse is quoted word for word.

### Add a screen

1. Write the component in `src/screens/`, say `PrayersScreen.tsx`. Start from a small
   screen like `JournalScreen.tsx`: a `<main className="screen">`, a `Panel`, an `h1`, and
   a Back button.
2. Add its name to the `Screen` type in `src/app/store.ts`, and to `SCREENS` in
   `src/app/params.ts` (so `?screen=prayers` opens it).
3. Add a loader for it to `LOADERS` in `src/app/App.tsx`.
4. Open it from somewhere, such as a menu button: `onClick={() => go('prayers')}`, or
   `openScreen('prayers')` if it should remember where to go back to.
5. Add it to the `SCREENS` lists in `scripts/a11y.mjs`, `scripts/keyboard.mjs` and
   `scripts/shots.mjs`, and check it in both styles.

### Change how something looks

- **Colors and fonts** for each style are variables in `src/ui/theme.css`.
- **Shared components** take their look from `src/ui/components.css`.
- A screen's own layout is in a CSS file next to it. The pixel style's changes sit at the
  end of each file inside `@scope ([data-art-style='pixel'])`. The page's `<html>` element
  carries `data-art-style`, so a rule there applies only in the pixel style.

After a visible change, run `npm run shots -- --compare` to see what changed. If it's
right, approve the new look with `npm run shots -- --approve`.
