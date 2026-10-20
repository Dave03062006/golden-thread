import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT } from '../frame'
import { hills } from '../shapes'

/**
 * Level 4, Episode 6: the ford of the Jabbok at night. Rocky walls close in on both sides
 * of a deep valley; far hills between them; the stream winding through its stony bed, and
 * the bank where Jacob is left alone.
 */

export const jabbokLayers: Record<string, PaperLayerArt> = {
  'jabbok-gorge': {
    bounds: FULL,
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([560, 520, 540, 500, 520, 540, 510, 530, 520, 550])}" fill="#2e3456" opacity=".9"/>
      <path d="M${LEFT} 120L80 160L180 300L240 280L330 470L300 560L380 700L${LEFT} 760Z" fill="#26283e"/>
      <path d="M80 160L180 300L240 280L330 470L300 560L380 700" stroke="#5a6088" stroke-width="5" fill="none" opacity=".7"/>
      <path d="M${RIGHT} 80L1520 140L1430 320L1360 300L1290 500L1320 600L1230 710L${RIGHT} 760Z" fill="#232438"/>
      <path d="M1520 140L1430 320L1360 300L1290 500L1320 600L1230 710" stroke="#4e5478" stroke-width="5" fill="none" opacity=".6"/>
      <path d="M${LEFT} 700C300 680 1300 690 ${RIGHT} 700L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#2c2a3c"/>
      <path d="M${LEFT} 830C200 800 420 860 700 820C980 780 1240 850 ${RIGHT} 810L${RIGHT} 880C1240 920 980 850 700 890C420 930 200 870 ${LEFT} 900Z" fill="#2e5a8a"/>
      <path d="M${LEFT + 60} 846C220 826 420 874 700 838M900 828C1100 806 1300 856 ${RIGHT - 80} 834" stroke="#8ac0e8" stroke-width="3" fill="none" opacity=".6"/>
      ${[
        [120, 760, 30],
        [520, 780, 20],
        [1080, 770, 26],
        [1460, 760, 34],
        [860, 920, 22],
      ]
        .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r! * 0.55}" fill="#3e3c54"/>`)
        .join('')}`,
  },
}

