import type { PaperPropArt } from '../art'

/**
 * Props of Level 4, Episode 5: the great round stone over the mouth of the well near
 * Haran, which the shepherds waited to roll off together, and Jacob rolled away alone.
 */

const wellStone: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 40 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'stone',
      svg: `<ellipse cx="60" cy="25" rx="58" ry="15" fill="#7e7466"/><ellipse cx="60" cy="20" rx="54" ry="12" fill="#a89a86"/>
        <path d="M18 18Q60 6 102 18" stroke="#c8bca8" stroke-width="3" fill="none"/><path d="M40 24L46 30M76 22L84 27" stroke="#8a7e6e" stroke-width="2"/>`,
    },
  ],
}

export const rachelAndLeahProps: Record<string, PaperPropArt> = { 'well-stone': wellStone }
