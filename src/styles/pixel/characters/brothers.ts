import type { PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * Cain and Abel as pixel sprites, silhouettes like their parents with the light on their
 * left edge. Cain wears a dark garment and carries a hoe; Abel wears pale fleece and
 * carries a shepherd's staff. Drawn in the same 18-pixel grid as the man and the woman.
 */

const X = 4
const WIDTH = 18
const HEIGHT = 31

type Arm = 'down' | 'forward' | 'low' | 'up' | 'in'

/** The figure, with its garment, the front arm, and whatever it holds in that hand. */
function brother(g: Grid, up: number, bow: number, arm: Arm, tool: 'hoe' | 'staff') {
  g.rect(X + 3, 18, 2, 12, 'S').rect(X + 6, 18, 2, 12, 'S')
  g.rect(X + 2, 30, 3, 1, 'S').rect(X + 5, 30, 3, 1, 'S')
  g.rect(X + 3, 8 + up, 5, 10 - up, 'S').rect(X + 2, 8 + up, 7, 2, 'S')
  g.rect(X + 8, 9 + up, 1, 7, 'S')
  g.rect(X + 5, 6 + up, 2, 2, 'S')
  g.ellipse(X + 5.5 - bow * 0.5, 3.6 + up + bow, 2.6, 2.7, 'S')
  g.set(X + 2 - bow, 4 + up + bow, 'S')
  g.ellipse(X + 6.2, 2.4 + up + bow, 2.2, 1.6, 'H')
  if (tool === 'hoe') g.set(X + 3 - bow, 6 + up + bow, 'H').set(X + 4 - bow, 7 + up + bow, 'H')
  else g.rect(X + 3, 1 + up + bow, 5, 1, 'B')
  // The garment, shoulders to knees, ragged at the hem.
  g.rect(X + 2, 9 + up, 7, 14 - up, 'K')
  for (let i = 0; i < 7; i += 2) g.set(X + 2 + i, 23, 'K')
  // The front arm and the tool in its hand.
  const sx = X + 2
  const sy = 9 + up
  let hand = { x: sx, y: sy + 7 }
  if (arm === 'down') g.rect(sx, sy, 1, 8, 'S')
  else if (arm === 'forward') {
    g.line(sx, sy, sx - 4, sy + 4, 'S')
    hand = { x: sx - 4, y: sy + 4 }
  } else if (arm === 'low') {
    g.line(sx, sy, sx - 3, sy + 7, 'S')
    hand = { x: sx - 3, y: sy + 7 }
  } else if (arm === 'up') {
    g.line(sx, sy, sx - 3, sy - 6, 'S')
    hand = { x: sx - 3, y: sy - 6 }
  } else hand = { x: sx + 2, y: sy + 5 }
  if (tool === 'hoe' && arm !== 'up' && arm !== 'in') {
    g.line(hand.x, hand.y, hand.x - 2, hand.y + 8, 'T')
    g.rect(hand.x - 4, hand.y + 8, 3, 1, 'G')
  }
  if (tool === 'staff' && arm !== 'up' && arm !== 'in') {
    g.line(hand.x, Math.min(hand.y + 10, 29), hand.x, hand.y - 12, 'T')
    g.set(hand.x - 1, hand.y - 13, 'T').set(hand.x - 2, hand.y - 12, 'T').set(hand.x - 2, hand.y - 11, 'T')
  }
  g.rim('S', 'R', 'left')
  g.rim('K', 'R', 'left')
}

const pose = (frames: string[][], fps: number) => ({ frames, fps })
const breathing = (arm: Arm, tool: 'hoe' | 'staff', bow = 0) => [0, 1].map((lift) => sprite(WIDTH, HEIGHT, (g) => brother(g, -lift, bow, arm, tool)))

const cain: PixelSpriteArt = {
  kind: 'sprite',
  facing: -1,
  anchor: 'base',
  colors: { S: C.wood1, H: C.wood0, R: C.gold, K: C.purple, T: C.wood2, G: C.slate, M: C.white, m: C.gold },
  poses: {
    idle: pose(breathing('down', 'hoe'), 0.45),
    // The hoe rising and falling into the ground.
    work: pose([sprite(WIDTH, HEIGHT, (g) => brother(g, 0, 1, 'forward', 'hoe')), sprite(WIDTH, HEIGHT, (g) => brother(g, 0, 1, 'low', 'hoe'))], 1.4),
    offer: pose(breathing('up', 'hoe'), 0.45),
    fallen: pose(breathing('in', 'hoe', 1), 0.35),
    // The mark the LORD put on Cain: a small light on his forehead.
    marked: pose(
      [0, 1].map((lift) =>
        sprite(WIDTH, HEIGHT, (g) => {
          brother(g, -lift, 0, 'down', 'hoe')
          g.set(X + 3, 2 - lift, 'M').set(X + 2, 2 - lift, 'm').set(X + 4, 2 - lift, 'm').set(X + 3, 1 - lift, 'm')
        }),
      ),
      0.45,
    ),
  },
}

const abel: PixelSpriteArt = {
  kind: 'sprite',
  facing: -1,
  anchor: 'base',
  colors: { S: C.wood1, H: C.wood0, R: C.gold, K: C.white, T: C.wood2, B: C.gold },
  poses: {
    idle: pose(breathing('down', 'staff'), 0.45),
    tend: pose(breathing('forward', 'staff'), 0.45),
    offer: pose(breathing('up', 'staff'), 0.45),
    fallen: pose(breathing('in', 'staff', 1), 0.35),
  },
}

export const brothers: Record<string, PixelSpriteArt> = { cain, abel }
