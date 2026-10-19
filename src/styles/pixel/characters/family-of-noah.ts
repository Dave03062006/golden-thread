import type { PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * The people of Level 2 (Noah and the Nations) as pixel sprites: silhouettes like the
 * first family, with the light on their left edge, now in long robes of their own colors.
 * Drawn in the same 18-pixel grid, with the poses the level asks for: idle, walk, pray,
 * work (a mallet), lift (the dove), kneel and carry.
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

/** The figure in its robe, with the front arm and, for work, a mallet. */
function draw(g: Grid, look: Look, up: number, arm: Arm, step: number, kneel: boolean) {
  const k = kneel ? 8 : 0
  // Feet below the hem, stepping apart when walking.
  if (kneel) g.rect(X + 1, 30, 9, 1, 'S')
  else g.rect(X + 2 - step, 29, 3, 2, 'S').rect(X + 6 + step, 29, 3, 2, 'S')
  // The robe, from the shoulders to the ankles.
  const top = 8 + up + k
  g.rect(X + 2, top, 7, 29 - top, 'K').rect(X + 1, top + 10, 9, 29 - top - 10, 'K')
  if (look.sash) g.rect(X + 2, top + 9, 7, 1, 'W')
  // Neck and head, hair, beard or veil.
  g.rect(X + 5, 6 + up + k, 2, 2, 'S')
  g.ellipse(X + 5.5, 3.6 + up + k, 2.6, 2.7, 'S')
  g.set(X + 2, 4 + up + k, 'S')
  g.ellipse(X + 6.2, 2.4 + up + k, 2.2, 1.6, 'H')
  if (look.beard) g.rect(X + 3, 5 + up + k, 2, 2, 'B').set(X + 4, 7 + up + k, 'B')
  if (look.veil) g.rect(X + 5, 1 + up + k, 4, 2, 'V').rect(X + 7, 3 + up + k, 2, 7, 'V')
  // The front arm.
  const sx = X + 2
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
  g.rim('K', 'R', 'left')
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
    },
  }
}

/** A child born after the Flood: the same figure, smaller, in a short robe, standing or walking. */
function child(look: Look): PixelSpriteArt {
  const frame = (step: number, up: number) =>
    sprite(12, 20, (g) => {
      g.rect(3 - step, 18, 2, 2, 'S').rect(6 + step, 18, 2, 2, 'S')
      g.rect(3, 7 + up, 6, 11 - up, 'K')
      g.rect(5, 5 + up, 2, 2, 'S')
      g.ellipse(5.5, 3 + up, 2.2, 2.2, 'S')
      g.ellipse(6, 2 + up, 2, 1.3, 'H')
      if (look.veil) g.rect(6, 1 + up, 3, 2, 'V').rect(7, 3 + up, 2, 4, 'V')
      g.rect(2, 8 + up, 1, 6, 'S')
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
  'king-of-sodom': person({ robe: C.rose, hair: C.wood0, beard: C.wood0, sash: C.gold }),
  boy: child({ robe: C.wood3, hair: C.wood0 }),
  girl: child({ robe: C.rose, hair: C.wood0, veil: C.white }),
}
