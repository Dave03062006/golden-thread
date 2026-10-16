import type { PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * The animals of day six as pixel sprites, built from shapes (see shapes.ts). Each faces
 * right and stands on its base. Walking moves diagonal pairs of legs together over four
 * frames; standing still, each has its own small movement.
 */

/** How far each diagonal pair of legs reaches, frame by frame, in a walk. */
const STRIDE = [1.6, 0, -1.6, 0]

/** Four walking frames and two standing ones, from one drawing function. */
function animal(draw: (g: Grid, stride: number, idle: number) => void, width: number, height: number, walkFps: number, idleFps: number) {
  return {
    walk: { frames: STRIDE.map((s) => sprite(width, height, (g) => draw(g, s, 0))), fps: walkFps },
    idle: { frames: [0, 1].map((i) => sprite(width, height, (g) => draw(g, 0, i))), fps: idleFps },
  }
}

const lion: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  anchor: 'base',
  colors: { Y: C.sand, S: C.sand2, M: C.wood2, m: C.wood3, N: C.wood1, k: C.ink },
  poses: animal(
    (g, s, idle) => {
      // Far legs, then the tail, the body and head, then the near legs in front.
      g.line(8, 13, 8 + s, 18, 'S', 2).rect(Math.round(8 + s), 19, 3, 1, 'S')
      g.line(20, 13, 20 - s, 18, 'S', 2).rect(Math.round(20 - s), 19, 3, 1, 'S')
      if (idle) g.line(5, 10, 2, 7, 'Y').rect(1, 5, 2, 3, 'M')
      else g.line(5, 10, 2, 13, 'Y').rect(1, 13, 2, 3, 'M')
      g.ellipse(14, 10.5, 9.5, 4.6, 'Y').ellipse(14, 10.5, 9.5, 4.6, 'S', (y) => y >= 13)
      g.ellipse(24, 8, 5.6, 6.2, 'M').ellipse(24.6, 8.4, 4, 4.6, 'm')
      g.ellipse(26.4, 8.6, 2.8, 2.8, 'Y').rect(28, 9, 2, 2, 'Y').set(30, 9, 'N').set(26, 7, 'k')
      g.line(10, 13, 10 - s, 18, 'Y', 2).rect(Math.round(10 - s), 19, 3, 1, 'Y')
      g.line(22, 13, 22 + s, 18, 'Y', 2).rect(Math.round(22 + s), 19, 3, 1, 'Y')
    },
    32,
    20,
    7,
    0.7,
  ),
}

const deer: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  anchor: 'base',
  colors: { B: C.wood3, b: C.wood2, L: C.sand, W: C.white, A: C.wood1, N: C.ink, k: C.ink },
  poses: animal(
    (g, s, idle) => {
      g.line(8, 17, 8 + s, 25, 'b').set(8 + s, 26, 'N')
      g.line(16, 17, 16 - s, 25, 'b').set(16 - s, 26, 'N')
      g.set(4, 13, 'W').set(4, 14, 'W')
      g.ellipse(11.5, 15, 8, 3.8, 'B').ellipse(11.5, 15, 8, 3.8, 'L', (y) => y >= 17)
      g.poly(
        [
          [16, 14],
          [19, 6],
          [22, 7],
          [19.5, 15],
        ],
        'B',
      )
      g.ellipse(22, 6, 3.2, 2.1, 'B').set(25, 6, 'N').set(22, 5, 'k')
      if (idle) g.set(19, 3, 'b').set(18, 2, 'b')
      else g.set(19, 4, 'b').set(18, 4, 'b')
      g.line(21, 4, 19, 0, 'A').line(22, 4, 24, 0, 'A').set(18, 1, 'A').set(25, 1, 'A')
      g.line(10, 17, 10 - s, 25, 'B').set(10 - s, 26, 'N')
      g.line(18, 17, 18 + s, 25, 'B').set(18 + s, 26, 'N')
    },
    26,
    27,
    6,
    0.5,
  ),
}

const sheep: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  anchor: 'base',
  colors: { W: C.white, P: C.pale, F: C.dslate },
  poses: animal(
    (g, s, idle) => {
      g.line(5, 10, 5 + s, 13, 'F').line(13, 10, 13 - s, 13, 'F')
      g.ellipse(6, 7, 4, 3.4, 'W').ellipse(10, 5, 4, 3.4, 'W').ellipse(13.5, 7, 4, 3.4, 'W').ellipse(9.5, 9, 6, 2.6, 'W')
      g.ellipse(9.5, 9, 6, 2.6, 'P', (y) => y >= 10)
      const head = idle ? 1 : 0
      g.ellipse(17, 6.5 + head, 2.3, 2.1, 'F').set(15, 5 + head, 'F').set(18, 6 + head, 'W').set(16, 4 + head, 'W')
      g.line(7, 10, 7 - s, 13, 'F').line(15, 10, 15 + s, 13, 'F')
    },
    20,
    15,
    8,
    0.45,
  ),
}

const elephant: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  anchor: 'base',
  colors: { G: C.slate, g: C.dslate, E: C.pale, w: C.white, k: C.ink },
  poses: animal(
    (g, s, idle) => {
      g.line(9 + s, 24, 9 + s, 34, 'g', 4).rect(Math.round(9 + s), 35, 4, 1, 'w')
      g.line(26 - s, 24, 26 - s, 34, 'g', 4).rect(Math.round(26 - s), 35, 4, 1, 'w')
      g.line(4, 15, 2, 23, 'g').set(2, 24, 'g')
      g.ellipse(19, 17, 15, 10, 'G').ellipse(19, 17, 15, 10, 'g', (y) => y >= 25)
      g.ellipse(34, 13, 7, 7, 'G')
      g.ellipse(31, 16, 4.6 + idle, 6.4, 'g').ellipse(31, 16, 3 + idle, 4.6, 'E')
      g.line(39, 15, 41, 24, 'G', 3).line(41, 24, 40, 31, 'G', 2).set(39, 32, 'G')
      g.line(38, 20, 41, 22, 'w').set(36, 11, 'k')
      g.line(12 - s, 25, 12 - s, 34, 'G', 4).rect(Math.round(12 - s), 35, 4, 1, 'w')
      g.line(29 + s, 25, 29 + s, 34, 'G', 4).rect(Math.round(29 + s), 35, 4, 1, 'w')
    },
    44,
    36,
    5,
    0.6,
  ),
}

export const animals: Record<string, PixelSpriteArt> = { lion, deer, sheep, elephant }
