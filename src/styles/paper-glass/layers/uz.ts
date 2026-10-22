import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { cloud, hillCrest, hills, rays } from '../shapes'

/**
 * Level 6 · Job: the land of Uz. Job's pastures, rolling hills under a wide sky with his
 * stone house among the trees; the ash heap outside the town, bare and gray, the town
 * wall far off; the court of heaven above the clouds, filled with light; and the great
 * rock beside Job, with a smooth face where his words are carved.
 */

const FAR = [470, 500, 460, 490, 470, 500, 480, 460, 490, 470]
const MID = [560, 540, 575, 545, 560, 590, 550, 570, 545, 565]
const NEAR = [670, 660, 680, 665, 675, 660, 680, 670, 665, 675]

/** A rounded tree: a trunk and a crown of overlapping leaves. */
const tree = (x: number, y: number, s: number, leaf: string, dark: string) =>
  `<path d="M${x - 4 * s} ${y}L${x - 2 * s} ${y - 40 * s}L${x + 2 * s} ${y - 40 * s}L${x + 4 * s} ${y}Z" fill="#6a4a2a"/>` +
  `<ellipse cx="${x}" cy="${y - 52 * s}" rx="${30 * s}" ry="${22 * s}" fill="${dark}"/><ellipse cx="${x - 8 * s}" cy="${y - 58 * s}" rx="${20 * s}" ry="${16 * s}" fill="${leaf}"/>`

export const uzLayers: Record<string, PaperLayerArt> = {
  'uz-pastures': {
    bounds: bandFrom(400),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills(FAR)}" fill="#9aaa8a" opacity=".85"/>
      <path d="${hills(MID)}" fill="#8aa45a"/>
      <path d="${hillCrest(MID)}" stroke="#b8c878" stroke-width="5" fill="none"/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${LEFT + 60 + i * 230} ${620 + (i % 3) * 12}C${LEFT + 140 + i * 230} ${610 + (i % 2) * 10} ${LEFT + 220 + i * 230} ${616} ${LEFT + 290 + i * 230} ${624 + (i % 3) * 8}" stroke="#a8b86a" stroke-width="3" fill="none" opacity=".7"/>`).join('')}
      <path d="M1090 652L1090 590L1250 590L1250 652Z" fill="#c8b48a"/>
      <path d="M1080 594L1260 594L1260 582L1080 582Z" fill="#a8946a"/>
      <path d="M1100 652L1100 600L1250 600" stroke="#a8946a" stroke-width="3" fill="none" opacity=".6"/>
      <path d="M1158 652L1158 618Q1170 606 1182 618L1182 652Z" fill="#5a4630"/>
      <path d="M1112 612L1132 612L1132 628L1112 628ZM1210 612L1230 612L1230 628L1210 628Z" fill="#6a5438"/>
      ${tree(1050, 650, 1.1, '#6a9a4a', '#4a7a3a')}${tree(1300, 652, 0.9, '#6a9a4a', '#4a7a3a')}${tree(140, 600, 0.8, '#7aa858', '#5a8a42')}${tree(820, 598, 0.7, '#7aa858', '#5a8a42')}
      <path d="${hills(NEAR)}" fill="#7a9a48"/>
      <path d="${hillCrest(NEAR)}" stroke="#9ab860" stroke-width="4" fill="none"/>
      ${Array.from({ length: 26 }, (_, i) => `<path d="M${LEFT + 40 + i * 80} ${720 + (i % 4) * 26}l${6 + (i % 3) * 3} -${12 + (i % 4) * 3}M${LEFT + 46 + i * 80} ${722 + (i % 4) * 26}l-${6 + (i % 2) * 4} -${10 + (i % 3) * 3}" stroke="#5a7a34" stroke-width="3" stroke-linecap="round"/>`).join('')}`,
  },
  'ash-heap': {
    bounds: bandFrom(420),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([520, 500, 530, 510, 525, 505, 520, 500, 515, 525])}" fill="#a49a8a" opacity=".8"/>
      <path d="M40 600L40 520L90 520L90 500L130 500L130 520L300 520L300 505L340 505L340 520L470 520L470 600Z" fill="#9a8c74"/>
      <path d="M232 600L232 556Q248 540 264 556L264 600Z" fill="#5a4e40"/>
      ${[60, 100, 150, 200, 250, 310, 360, 410, 450].map((x) => `<path d="M${x} 520L${x + 10} 520L${x + 10} 512L${x} 512Z" fill="#8a7c64"/>`).join('')}
      <path d="${hills([620, 610, 630, 600, 615, 625, 605, 620, 610, 630])}" fill="#8e8270"/>
      <path d="${hillCrest([620, 610, 630, 600, 615, 625, 605, 620, 610, 630])}" stroke="#b0a48e" stroke-width="4" fill="none"/>
      <path d="M${LEFT} 690C300 680 500 666 760 660C1020 654 1300 676 ${RIGHT} 688L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#7a7062"/>
      <path d="M520 700C600 664 700 650 780 652C880 654 960 670 1040 702Z" fill="#9a948a"/>
      <path d="M560 694C640 670 720 662 790 664C860 666 920 676 990 698" stroke="#b8b2a6" stroke-width="4" fill="none"/>
      ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(LEFT + 50 + i * 70 + (i % 3) * 17).toFixed(0)}" cy="${(730 + (i % 5) * 34).toFixed(0)}" r="${(3 + (i % 3) * 1.5).toFixed(1)}" fill="${i % 2 ? '#5a5248' : '#a89c88'}"/>`).join('')}
      ${[
        [420, 742],
        [1120, 760],
        [880, 820],
      ]
        .map(([x, y]) => `<path d="M${x} ${y}l18 -6l10 8l-20 6Z" fill="#b0704a"/>`)
        .join('')}`,
  },
  'heaven-court': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <defs>
        <radialGradient id="heaven-glow" cx="800" cy="160" r="1300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fffbe8"/>
          <stop offset=".35" stop-color="#fbe9b4"/>
          <stop offset=".7" stop-color="#d8d0e8"/>
          <stop offset="1" stop-color="#9aa8d0"/>
        </radialGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#heaven-glow)"/>
      <g fill="#fff6d0" opacity=".35">${rays(800, 160, { count: 28, from: 0, to: Math.PI * 2, width: 0.035, length: 2000 })}</g>
      ${[
        [-200, 560, 3.4],
        [260, 600, 3],
        [700, 580, 3.6],
        [1150, 600, 3.2],
        [1500, 570, 3],
        [-100, 700, 4],
        [500, 720, 4.2],
        [1000, 710, 4],
        [1450, 720, 3.8],
      ]
        .map(([x, y, s]) => cloud(x!, y!, s!, ['#e8e4f4', '#f6f2fa', '#ffffff']))
        .join('')}
      <path d="M${LEFT} 820L${RIGHT} 820L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#f2eef8"/>`,
  },
  'rock-face': {
    bounds: { x: 880, y: 120, w: 980, h: 680 },
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M960 790L930 560L980 360L1040 230L1130 160L1290 140L1420 190L1510 300L1560 470L1600 640L1640 790Z" fill="#9a8a72"/>
      <path d="M1000 380L1060 250L1140 190L1280 175L1390 215L1460 310L1480 420L1460 560L1020 580Z" fill="#b4a488"/>
      <path d="M1040 400L1080 290L1150 236L1270 222L1370 254L1420 330L1430 420L1410 530L1060 548Z" fill="#c4b698"/>
      <path d="M930 560L980 360L1000 380L1020 580Z" fill="#847660"/>
      <path d="M1460 560L1480 420L1510 300L1560 470L1600 640L1530 620Z" fill="#847660"/>
      <path d="M960 640C1100 620 1300 650 1600 630M948 700C1120 690 1350 712 1620 700" stroke="#7a6c58" stroke-width="5" fill="none"/>
      <path d="M1160 196L1150 232M1350 236L1372 268M1040 470L1010 520M1450 480L1470 520" stroke="#8a7c64" stroke-width="4" stroke-linecap="round"/>`,
  },
}
