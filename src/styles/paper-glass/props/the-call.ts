import type { PaperPropArt } from '../art'

/**
 * Props of Level 3: the great oak (at Shechem, and the oaks of Mamre), and Abram's
 * shepherd's staff, which he leaves leaning against his first altar.
 */

/** A great spreading oak, its crown stirring a little in the wind. */
const greatOak: PaperPropArt = {
  box: { x: 0, y: 0, w: 320, h: 320 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'trunk',
      svg: `<path d="M140 320L152 200Q128 170 96 160L104 150Q140 160 156 184L160 120L176 120L178 184Q196 158 236 150L240 160Q206 172 186 200L198 320Z" fill="#5a4030"/>
        <path d="M160 320L166 200" stroke="#7a5a40" stroke-width="4" opacity=".6"/>`,
    },
    {
      id: 'crown',
      pivot: { x: 168, y: 200 },
      svg: `${[
        [90, 130, 70],
        [168, 90, 86],
        [250, 130, 70],
        [130, 170, 60],
        [210, 170, 60],
        [168, 150, 70],
      ]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#3e6a38"/>`)
        .join('')}${[
        [70, 110, 34],
        [150, 64, 40],
        [236, 104, 34],
        [190, 130, 30],
      ]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#5a8a48" opacity=".9"/>`)
        .join('')}`,
    },
  ],
  animate: (part, _pose, time) => (part === 'crown' ? { rotate: 0.8 * Math.sin(time * Math.PI * 2 * 0.12) } : {}),
}

/** A shepherd's staff with a crook at the top. */
const staff: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 160 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'staff',
      svg: `<path d="M18 160L20 30Q20 8 32 8Q40 8 40 20Q40 30 32 30" stroke="#7a5230" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M17 150L19 34" stroke="#a87a4a" stroke-width="2" opacity=".7"/>`,
    },
  ],
}

export const theCallProps: Record<string, PaperPropArt> = { 'great-oak': greatOak, 'walking-staff': staff }
