import type { PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * The people of Level 2 (Noah and the Nations) as pixel sprites: silhouettes like the
 * first family, with the light on their left edge, now in long robes of their own colors.
 * Drawn in the same 18-pixel grid, with the poses the level asks for: idle, walk, pray,
 * work (a mallet), lift (the dove), kneel and carry, and sit (low on the ground, arms down).
 */

const X = 4
const WIDTH = 18
const HEIGHT = 31

interface Look {
  robe: string
  hair: string
  beard?: string
  veil?: string
  sash?: string
}

type Arm = 'down' | 'up' | 'high' | 'swing' | 'forward'

/** The letters a figure's own colors are drawn with: its hair, beard, veil, robe and sash. */
interface Keys {
  H: string
  B: string
  V: string
  K: string
  W: string
}
const KEYS: Keys = { H: 'H', B: 'B', V: 'V', K: 'K', W: 'W' }

/** The figure in its robe, with the front arm and, for work, a mallet. */
function draw(g: Grid, look: Look, up: number, arm: Arm, step: number, kneel: boolean, x0 = X, keys: Keys = KEYS) {
  const k = kneel ? 8 : 0
  // Feet below the hem, stepping apart when walking.
  if (kneel) g.rect(x0 + 1, 30, 9, 1, 'S')
  else g.rect(x0 + 2 - step, 29, 3, 2, 'S').rect(x0 + 6 + step, 29, 3, 2, 'S')
  // The robe, from the shoulders to the ankles.
  const top = 8 + up + k
  g.rect(x0 + 2, top, 7, 29 - top, keys.K).rect(x0 + 1, top + 10, 9, 29 - top - 10, keys.K)
  if (look.sash) g.rect(x0 + 2, top + 9, 7, 1, keys.W)
  // Neck and head, hair, beard or veil.
  g.rect(x0 + 5, 6 + up + k, 2, 2, 'S')
  g.ellipse(x0 + 5.5, 3.6 + up + k, 2.6, 2.7, 'S')
  g.set(x0 + 2, 4 + up + k, 'S')
  g.ellipse(x0 + 6.2, 2.4 + up + k, 2.2, 1.6, keys.H)
  if (look.beard) g.rect(x0 + 3, 5 + up + k, 2, 2, keys.B).set(x0 + 4, 7 + up + k, keys.B)
  if (look.veil) g.rect(x0 + 5, 1 + up + k, 4, 2, keys.V).rect(x0 + 7, 3 + up + k, 2, 7, keys.V)
  // The front arm.
  const sx = x0 + 2
  const sy = 9 + up + k
  if (arm === 'down') g.rect(sx, sy, 1, 8, 'S')
  else if (arm === 'up') g.line(sx, sy, sx - 3, sy - 6, 'S')
  else if (arm === 'high') g.line(sx, sy, sx - 1, sy - 8, 'S')
  else if (arm === 'forward') g.line(sx, sy, sx - 5, sy + 2, 'S')
  else {
    g.line(sx, sy, sx - 4, sy + 3, 'S')
    g.rect(sx - 6, sy + 1, 3, 3, 'M').set(sx - 4, sy + 4, 'T')
  }
  g.rim('S', 'R', 'left')
  g.rim(keys.K, 'R', 'left')
}

/** Several people standing side by side in one sprite: a whole family for the cost of one figure. */
function band(looks: Look[], spacing = 8): PixelSpriteArt {
  // Each figure draws its own colors with letters of its own (sprite cells are single letters).
  const letters = 'abcdefghijklnopquvxyz0123456789ACDEFGIJ'
  const keys = looks.map((_, n): Keys => ({ H: letters[n * 5]!, B: letters[n * 5 + 1]!, V: letters[n * 5 + 2]!, K: letters[n * 5 + 3]!, W: letters[n * 5 + 4]! }))
  const colors: Record<string, string> = { S: C.wood1, R: C.gold, M: C.wood2, T: C.wood1 }
  looks.forEach((look, n) => Object.assign(colors, { [keys[n]!.H]: look.hair, [keys[n]!.B]: look.beard ?? C.wood0, [keys[n]!.V]: look.veil ?? C.pale, [keys[n]!.K]: look.robe, [keys[n]!.W]: look.sash ?? C.gold }))
  const frame = (i: number) => sprite(WIDTH + (looks.length - 1) * spacing, HEIGHT, (g) => looks.forEach((look, n) => draw(g, look, (n + i) % 2 ? -1 : 0, 'down', 0, false, X + n * spacing, keys[n])))
  return { kind: 'sprite', facing: -1, anchor: 'base', colors, poses: { idle: { frames: [frame(0), frame(1)], fps: 0.45 }, walk: { frames: [frame(0), frame(1)], fps: 3 } } }
}

function person(look: Look): PixelSpriteArt {
  const frames = (arm: Arm | Arm[], step: number[] = [0, 0], kneel = false) =>
    [0, 1].map((i) => sprite(WIDTH, HEIGHT, (g) => draw(g, look, step[i] === 0 && !Array.isArray(arm) ? -i : 0, Array.isArray(arm) ? arm[i]! : arm, step[i]!, kneel)))
  return {
    kind: 'sprite',
    facing: -1,
    anchor: 'base',
    colors: { S: C.wood1, H: look.hair, B: look.beard ?? C.wood0, V: look.veil ?? C.pale, K: look.robe, W: look.sash ?? C.gold, R: C.gold, M: C.wood2, T: C.wood1 },
    poses: {
      idle: { frames: frames('down'), fps: 0.45 },
      walk: { frames: frames('down', [1, -1]), fps: 3 },
      pray: { frames: frames('up'), fps: 0.4 },
      work: { frames: frames(['swing', 'forward']), fps: 2.2 },
      lift: { frames: frames('high'), fps: 0.4 },
      kneel: { frames: frames('up', [0, 0], true), fps: 0.4 },
      carry: { frames: frames('forward'), fps: 0.45 },
      sit: { frames: frames('down', [0, 0], true), fps: 0.4 },
    },
  }
}

/** A child born after the Flood: the same figure, smaller, in a short robe, standing, walking or praying. */
function child(look: Look): PixelSpriteArt {
  const frame = (step: number, up: number, pray = false) =>
    sprite(12, 20, (g) => {
      g.rect(3 - step, 18, 2, 2, 'S').rect(6 + step, 18, 2, 2, 'S')
      g.rect(3, 7 + up, 6, 11 - up, 'K')
      g.rect(5, 5 + up, 2, 2, 'S')
      g.ellipse(5.5, 3 + up, 2.2, 2.2, 'S')
      g.ellipse(6, 2 + up, 2, 1.3, 'H')
      if (look.veil) g.rect(6, 1 + up, 3, 2, 'V').rect(7, 3 + up, 2, 4, 'V')
      // Hands down at the side, or held together in front of the face.
      if (pray) g.rect(2, 7 + up, 1, 3, 'S').rect(1, 6 + up, 1, 2, 'S')
      else g.rect(2, 8 + up, 1, 6, 'S')
      g.rim('S', 'R', 'left')
      g.rim('K', 'R', 'left')
    })
  return {
    kind: 'sprite',
    facing: -1,
    anchor: 'base',
    colors: { S: C.wood1, H: look.hair, V: look.veil ?? C.pale, K: look.robe, R: C.gold },
    poses: {
      idle: { frames: [frame(0, 0), frame(0, -1)], fps: 0.5 },
      walk: { frames: [frame(1, 0), frame(-1, 0)], fps: 3.4 },
      pray: { frames: [frame(0, 0, true), frame(0, -1, true)], fps: 0.4 },
    },
  }
}

export const familyOfNoah: Record<string, PixelSpriteArt> = {
  noah: person({ robe: C.slate, hair: C.white, beard: C.white, sash: C.gold }),
  'noahs-wife': person({ robe: C.purple, hair: C.pale, veil: C.sand }),
  shem: person({ robe: C.navy, hair: C.wood0, beard: C.wood0, sash: C.gold }),
  ham: person({ robe: C.wood2, hair: C.wood0, beard: C.wood0 }),
  japheth: person({ robe: C.teal, hair: C.wood0, beard: C.wood1 }),
  'sons-wife': person({ robe: C.wood3, hair: C.wood0, veil: C.sand }),
  terah: person({ robe: C.wood2, hair: C.white, beard: C.white }),
  abram: person({ robe: C.purple, hair: C.wood0, beard: C.wood0, sash: C.gold }),
  sarai: person({ robe: C.blue, hair: C.wood0, veil: C.white }),
  lot: person({ robe: C.green, hair: C.wood0 }),
  nahor: person({ robe: C.teal, hair: C.wood0, beard: C.wood0 }),
  haran: person({ robe: C.rose, hair: C.wood0, beard: C.wood0 }),
  melchizedek: person({ robe: C.white, hair: C.white, beard: C.white, sash: C.gold }),
  'lots-wife': person({ robe: C.purple, hair: C.wood0, veil: C.pale }),
  'lots-daughter': person({ robe: C.green, hair: C.wood0, veil: C.sand }),
  isaac: person({ robe: C.orange, hair: C.wood0, sash: C.gold }),
  servant: person({ robe: C.sand2, hair: C.wood0, beard: C.wood0 }),
  hagar: person({ robe: C.pale, hair: C.wood0, veil: C.teal }),
  'king-of-sodom': person({ robe: C.rose, hair: C.wood0, beard: C.wood0, sash: C.gold }),
  'abraham-old': person({ robe: C.purple, hair: C.white, beard: C.white, sash: C.gold }),
  rebekah: person({ robe: C.teal, hair: C.wood0, veil: C.sand }),
  laban: person({ robe: C.sand2, hair: C.wood1, beard: C.wood1, sash: C.rose }),
  bethuel: person({ robe: C.slate, hair: C.pale, beard: C.pale }),
  ishmael: person({ robe: C.pale, hair: C.wood0, beard: C.wood0, sash: C.teal }),
  'isaac-old': person({ robe: C.orange, hair: C.white, beard: C.white, sash: C.gold }),
  esau: person({ robe: C.rose, hair: C.orange, beard: C.orange, sash: C.wood1 }),
  jacob: person({ robe: C.blue, hair: C.wood0, sash: C.gold }),
  'jacob-grown': person({ robe: C.blue, hair: C.wood1, beard: C.wood1, sash: C.gold }),
  rachel: person({ robe: C.purple, hair: C.wood0, veil: C.white }),
  leah: person({ robe: C.navy, hair: C.wood0, veil: C.pale }),
  maid: person({ robe: C.wood2, hair: C.wood0, veil: C.sand }),
  stranger: person({ robe: C.dslate, hair: C.ink, beard: C.ink }),
  'joseph-young': person({ robe: C.purple, hair: C.wood0, sash: C.sky }),
  'joseph-slave': person({ robe: C.sand, hair: C.wood0 }),
  'joseph-egypt': person({ robe: C.white, hair: C.wood0, veil: C.blue, sash: C.gold }),
  'joseph-old': person({ robe: C.white, hair: C.pale, veil: C.blue, sash: C.gold }),
  'jacob-old': person({ robe: C.blue, hair: C.white, beard: C.white, sash: C.gold }),
  reuben: person({ robe: C.green, hair: C.wood1, beard: C.wood1 }),
  judah: person({ robe: C.rose, hair: C.wood0, beard: C.wood0, sash: C.gold }),
  simeon: person({ robe: C.teal, hair: C.wood0, beard: C.wood0 }),
  benjamin: person({ robe: C.wood3, hair: C.wood0, sash: C.gold }),
  brother: person({ robe: C.wood2, hair: C.wood0, beard: C.wood0 }),
  potiphar: person({ robe: C.white, hair: C.ink, sash: C.rose }),
  keeper: person({ robe: C.sand2, hair: C.ink, sash: C.wood1 }),
  prisoner: person({ robe: C.slate, hair: C.wood0, beard: C.wood0 }),
  butler: person({ robe: C.gold, hair: C.ink, sash: C.rose }),
  baker: person({ robe: C.pale, hair: C.ink, sash: C.wood3 }),
  pharaoh: person({ robe: C.white, hair: C.ink, veil: C.gold, sash: C.blue }),
  steward: person({ robe: C.sand, hair: C.ink, sash: C.teal }),
  job: person({ robe: C.navy, hair: C.pale, beard: C.pale, sash: C.gold }),
  'job-mourning': person({ robe: C.wood2, hair: C.pale, beard: C.pale }),
  'job-old': person({ robe: C.navy, hair: C.white, beard: C.white, sash: C.gold }),
  'jobs-wife': person({ robe: C.purple, hair: C.wood0, veil: C.slate }),
  eliphaz: person({ robe: C.rose, hair: C.white, beard: C.white, sash: C.gold }),
  bildad: person({ robe: C.green, hair: C.wood1, beard: C.wood1, sash: C.sand }),
  zophar: person({ robe: C.wood3, hair: C.ink, beard: C.ink, sash: C.blue }),
  messenger: person({ robe: C.sand, hair: C.wood0 }),
  daughter: person({ robe: C.orange, hair: C.wood0, veil: C.white }),
  'jobs-sons': band([
    { robe: C.green, hair: C.wood0, beard: C.wood0 },
    { robe: C.wood2, hair: C.ink, beard: C.ink, sash: C.gold },
    { robe: C.blue, hair: C.wood0, beard: C.wood0 },
    { robe: C.sand2, hair: C.wood1, beard: C.wood1, sash: C.teal },
    { robe: C.purple, hair: C.ink, beard: C.ink },
    { robe: C.teal, hair: C.wood0, beard: C.wood0, sash: C.sand },
    { robe: C.wood3, hair: C.wood0 },
  ]),
  'jobs-servants': band([
    { robe: C.sand, hair: C.wood0, beard: C.wood0 },
    { robe: C.sand2, hair: C.ink, sash: C.wood2 },
    { robe: C.sand, hair: C.wood0, beard: C.wood0 },
  ]),
  'jobs-daughters': band([
    { robe: C.orange, hair: C.wood0, veil: C.white },
    { robe: C.sky, hair: C.ink, veil: C.pale },
    { robe: C.gold, hair: C.wood0, veil: C.white },
  ]),
  shiphrah: person({ robe: C.teal, hair: C.wood0, veil: C.sand }),
  puah: person({ robe: C.wood3, hair: C.ink, veil: C.pale }),
  watchman: person({ robe: C.dslate, hair: C.ink, veil: C.slate, sash: C.wood3 }),
  taskmaster: person({ robe: C.white, hair: C.ink, sash: C.rose }),
  slave: person({ robe: C.sand2, hair: C.wood0, beard: C.wood0 }),
  'moses-mother': person({ robe: C.navy, hair: C.wood0, veil: C.sand }),
  miriam: person({ robe: C.orange, hair: C.wood0, veil: C.white }),
  princess: person({ robe: C.white, hair: C.ink, veil: C.gold, sash: C.teal }),
  'moses-prince': person({ robe: C.white, hair: C.wood0, beard: C.wood0, veil: C.blue, sash: C.gold }),
  'moses-shepherd': person({ robe: C.wood3, hair: C.pale, beard: C.pale, sash: C.sand }),
  jethro: person({ robe: C.purple, hair: C.white, beard: C.white, veil: C.sand }),
  zipporah: person({ robe: C.green, hair: C.ink, veil: C.gold }),
  aaron: person({ robe: C.blue, hair: C.pale, beard: C.pale, sash: C.gold }),
  elder: person({ robe: C.sand2, hair: C.white, beard: C.white, veil: C.sand }),
  // Level 8: Pharaoh's magicians; a Hebrew father and mother at the Passover.
  magician: person({ robe: C.white, hair: C.ink, sash: C.gold }),
  'hebrew-father': person({ robe: C.green, hair: C.wood0, beard: C.wood0, sash: C.wood2 }),
  'hebrew-mother': person({ robe: C.rose, hair: C.wood0, veil: C.pale }),
  // Level 9: old Miriam; a grandmother; Joshua; Hur; the women who dance; the warriors of Amalek.
  'miriam-old': person({ robe: C.orange, hair: C.pale, veil: C.white, sash: C.gold }),
  grandmother: person({ robe: C.purple, hair: C.white, veil: C.sand }),
  joshua: person({ robe: C.wood3, hair: C.wood0, beard: C.wood0, sash: C.rose }),
  hur: person({ robe: C.teal, hair: C.pale, beard: C.pale, sash: C.gold }),
  'hebrew-women': band([
    { robe: C.rose, hair: C.wood0, veil: C.white },
    { robe: C.sky, hair: C.ink, veil: C.pale },
    { robe: C.gold, hair: C.wood0, veil: C.white },
    { robe: C.green, hair: C.ink, veil: C.sand },
  ]),
  // Level 10: the seventy elders, and Moses with his face veiled.
  elders: band([
    { robe: C.sand2, hair: C.white, beard: C.white, veil: C.sand },
    { robe: C.purple, hair: C.white, beard: C.white },
    { robe: C.wood3, hair: C.pale, beard: C.pale, veil: C.sand },
    { robe: C.dslate, hair: C.white, beard: C.white },
  ]),
  'moses-veiled': person({ robe: C.wood3, hair: C.pale, beard: C.white, veil: C.white, sash: C.sand }),
  // Level 11: Aaron in plain linen and in his holy garments; Bezalel and Oholiab; a priest, one of
  // Aaron's sons; a widow, a poor man and a stranger.
  'aaron-linen': person({ robe: C.white, hair: C.pale, beard: C.pale, veil: C.white, sash: C.white }),
  'high-priest': person({ robe: C.blue, hair: C.pale, beard: C.pale, veil: C.white, sash: C.gold }),
  bezalel: person({ robe: C.wood3, hair: C.wood0, beard: C.wood0, sash: C.gold }),
  oholiab: person({ robe: C.purple, hair: C.ink, beard: C.ink, sash: C.rose }),
  priest: person({ robe: C.white, hair: C.wood0, veil: C.white, sash: C.blue }),
  widow: person({ robe: C.dslate, hair: C.pale, veil: C.ink }),
  'poor-man': person({ robe: C.sand2, hair: C.slate, beard: C.slate }),
  sojourner: person({ robe: C.teal, hair: C.ink, beard: C.ink, veil: C.orange }),
  // Level 12: Korah; Caleb; Eleazar, Aaron's son; Balaam the seer; Balak, king of Moab.
  korah: person({ robe: C.rose, hair: C.ink, beard: C.ink, sash: C.gold }),
  caleb: person({ robe: C.green, hair: C.wood1, beard: C.wood1, sash: C.sand }),
  eleazar: person({ robe: C.white, hair: C.wood0, beard: C.wood0, veil: C.white, sash: C.blue }),
  balaam: person({ robe: C.purple, hair: C.pale, beard: C.pale, veil: C.gold, sash: C.orange }),
  balak: person({ robe: C.rose, hair: C.ink, beard: C.ink, veil: C.gold, sash: C.gold }),
  amalekites: band([
    { robe: C.wood1, hair: C.ink, beard: C.ink, veil: C.dslate },
    { robe: C.purple, hair: C.ink, beard: C.ink, veil: C.wood0 },
    { robe: C.dslate, hair: C.ink, beard: C.ink, veil: C.wood1 },
    { robe: C.wood0, hair: C.ink, beard: C.ink, veil: C.dslate },
  ]),
  'hebrew-family': band([
    { robe: C.green, hair: C.wood0, beard: C.wood0 },
    { robe: C.rose, hair: C.wood0, veil: C.white },
    { robe: C.wood3, hair: C.wood0 },
    { robe: C.blue, hair: C.ink, veil: C.pale },
  ]),
  'hebrew-workers': band([
    { robe: C.sand2, hair: C.wood0, beard: C.wood0 },
    { robe: C.wood2, hair: C.ink, beard: C.ink },
    { robe: C.sand, hair: C.wood0 },
    { robe: C.sand2, hair: C.wood1, beard: C.wood1 },
    { robe: C.wood3, hair: C.ink, beard: C.ink },
  ]),
  'reuel-daughters': band([
    { robe: C.green, hair: C.ink, veil: C.gold },
    { robe: C.rose, hair: C.wood0, veil: C.white },
    { robe: C.blue, hair: C.ink, veil: C.pale },
    { robe: C.orange, hair: C.wood0, veil: C.white },
    { robe: C.purple, hair: C.ink, veil: C.sand },
    { robe: C.wood3, hair: C.wood0, veil: C.white },
    { robe: C.teal, hair: C.ink, veil: C.sand },
  ]),
  boy: child({ robe: C.wood3, hair: C.wood0 }),
  girl: child({ robe: C.rose, hair: C.wood0, veil: C.white }),
}
