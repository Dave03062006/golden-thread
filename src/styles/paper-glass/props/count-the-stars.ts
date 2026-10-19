import type { PaperPropArt } from '../art'

/**
 * Props of Level 3, Episode 4: a star the player lights by counting it; the covenant
 * between the pieces, shown simply as two rows covered with cloth; and the smoking fire
 * pot and the flaming torch that pass between them.
 */

/** A bright star, twinkling. */
const star: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 40 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  parts: [
    {
      id: 'star',
      pivot: { x: 20, y: 20 },
      svg: `<circle cx="20" cy="20" r="14" fill="#fff2c0" opacity=".25"/><path d="M20 4L23 17L36 20L23 23L20 36L17 23L4 20L17 17Z" fill="#fffbe8"/><circle cx="20" cy="20" r="3" fill="#ffffff"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ opacity: 0.8 + 0.2 * Math.sin(time * Math.PI * 2 * 0.9), rotate: 6 * Math.sin(time * 0.7) }),
}

/** The pieces of the covenant, laid in two rows facing each other, covered with cloths. */
const covenantPieces: PaperPropArt = {
  box: { x: 0, y: 0, w: 320, h: 90 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'rows',
      svg: [0, 1]
        .map((row) =>
          [0, 1, 2]
            .map((i) => {
              const x = 30 + i * 100
              const y = row ? 78 : 40
              return `<path d="M${x} ${y}Q${x + 34} ${y - 26} ${x + 68} ${y}Z" fill="${(i + row) % 2 ? '#b8a07a' : '#a8906a'}"/><path d="M${x + 6} ${y - 4}Q${x + 34} ${y - 22} ${x + 62} ${y - 4}" stroke="#d8c4a0" stroke-width="2" fill="none"/>`
            })
            .join(''),
        )
        .join(''),
    },
  ],
}

/** A smoking fire pot: a clay pot glowing at its mouth, smoke curling up from it. */
const firePot: PaperPropArt = {
  box: { x: 0, y: 0, w: 70, h: 140 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'smoke', svg: `<circle cx="34" cy="50" r="16" fill="#c8c4cc" opacity=".45"/><circle cx="40" cy="26" r="13" fill="#c8c4cc" opacity=".3"/><circle cx="30" cy="8" r="9" fill="#c8c4cc" opacity=".2"/>` },
    { id: 'pot', svg: `<circle cx="35" cy="80" r="26" fill="#ff9a40" opacity=".3"/><path d="M14 90Q12 136 35 140Q58 136 56 90Z" fill="#8a5232"/><ellipse cx="35" cy="90" rx="21" ry="7" fill="#ffb040"/>` },
  ],
  animate: (part, _pose, time) => (part === 'smoke' ? { y: -8 * ((time * 0.35) % 1), x: 3 * Math.sin(time * 1.3) } : {}),
}

/** A flaming torch, its fire streaming. */
const flamingTorch: PaperPropArt = {
  box: { x: 0, y: 0, w: 50, h: 150 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'stick', svg: `<path d="M24 150L26 50" stroke="#6a4428" stroke-width="7" stroke-linecap="round"/>` },
    {
      id: 'fire',
      pivot: { x: 25, y: 52 },
      svg: `<circle cx="25" cy="30" r="24" fill="#ffb060" opacity=".3"/><path d="M14 52Q8 30 22 14Q24 26 28 22Q30 6 38 0Q40 22 40 34Q42 46 36 52Z" fill="#f08a3a"/><path d="M20 52Q18 38 26 30Q30 40 34 38Q36 46 32 52Z" fill="#ffd27a"/>`,
    },
  ],
  animate: (part, _pose, time) => (part === 'fire' ? { rotate: 5 * Math.sin(time * Math.PI * 2 * 1.5), opacity: 0.85 + 0.15 * Math.sin(time * 11) } : {}),
}

export const countTheStarsProps: Record<string, PaperPropArt> = { 'counted-star': star, 'covenant-pieces': covenantPieces, 'fire-pot': firePot, 'flaming-torch': flamingTorch }
