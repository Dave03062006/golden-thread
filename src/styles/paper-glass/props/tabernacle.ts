import type { PaperPropArt, PartMotion } from '../art'

/**
 * Props of Level 11 · The Tabernacle and the Holy Life: the pieces of the tabernacle, each
 * drawn in its own place in one picture 400 units wide, so actors with the same place fit
 * together into the whole tabernacle in its court, cut away at the side to show the ark,
 * the table and the lampstand inside (see content/levels/11-the-tabernacle-and-the-holy-life/
 * stage.ts); the gifts for the sanctuary; the holy garments and their rail; the signs of the
 * feasts; the altar's flame; a dark stone, for a sin; the plan of the tabernacle drawn in
 * light; and a row of standing grain.
 */

const TAU = Math.PI * 2
const GOLD = '#e0b040'
const GOLD_LIGHT = '#f4d070'
const BRONZE = '#b07a3a'
const BLUE = '#3a5aa8'
const PURPLE = '#6a3a7a'
const SCARLET = '#b8323a'
const LINEN = '#f4efe2'

/** Each pose shows its own part, and only that. */
const onePart = (part: string, pose: string): PartMotion => ({ opacity: part === pose ? 1 : 0 })
const rect = (x: number, y: number, w: number, h: number, fill: string, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${extra}/>`
/** A curtain of blue, purple and scarlet, with cherubim worked on it in gold. */
const curtain = (x: number, w: number) =>
  `${rect(x, 44, w, 106, BLUE)}${rect(x, 44, w * 0.3, 106, PURPLE)}${rect(x + w * 0.7, 44, w * 0.3, 106, SCARLET)}${[64, 92, 120].map((y) => `<path d="M${x + w / 2} ${y}l-${w * 0.25} 6h${w * 0.5}z" fill="${GOLD}"/>`).join('')}`

const tabernaclePiece: PaperPropArt = {
  box: { x: 0, y: 0, w: 400, h: 170 },
  facing: 1,
  poses: ['frames', 'coverings', 'tent', 'ark', 'veil', 'table', 'lampstand', 'incense', 'screen', 'laver', 'altar', 'court'],
  anchor: 'base',
  parts: [
    // The golden boards of the walls, on their silver bases.
    { id: 'frames', svg: `${rect(40, 44, 210, 106, '#8a5a32')}${Array.from({ length: 22 }, (_, i) => rect(40 + i * 10, 44, 3, 106, GOLD)).join('')}${rect(38, 145, 214, 5, '#c8ccd4')}` },
    // The coverings over the top, rams' skins dyed red, and down the far end.
    { id: 'coverings', svg: `<path d="M34 44L34 32Q145 24 256 32L256 44Z" fill="${SCARLET}"/><path d="M34 32Q145 24 256 32" stroke="#5a2a20" stroke-width="5" fill="none"/>${rect(34, 44, 7, 106, SCARLET)}` },
    // The whole tent, closed, from outside.
    {
      id: 'tent',
      svg: `<path d="M36 150L36 38Q145 26 254 38L254 150Z" fill="#8a5a46"/><path d="M36 38Q145 26 254 38L254 50Q145 40 36 50Z" fill="${SCARLET}"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${60 + i * 25} 44L${60 + i * 25} 150" stroke="#6a4434" stroke-width="2.4"/>`).join('')}`,
    },
    // The ark: a chest of acacia wood covered with gold, its carrying poles, the mercy seat, and the two cherubim.
    {
      id: 'ark',
      svg: `${rect(46, 140, 48, 3, '#8a5a32')}${rect(55, 133, 30, 17, GOLD)}${rect(57, 136, 26, 2, GOLD_LIGHT)}${rect(53, 130, 34, 4, GOLD_LIGHT)}<path d="M58 130L58 120Q60 112 68 116L66 130Z" fill="${GOLD}"/><path d="M82 130L82 120Q80 112 72 116L74 130Z" fill="${GOLD}"/><path d="M60 118Q70 108 80 118" stroke="${GOLD_LIGHT}" stroke-width="2.4" fill="none"/>`,
    },
    // The veil before the ark.
    { id: 'veil', svg: curtain(100, 10) },
    // The golden table, with the twelve loaves in two rows.
    {
      id: 'table',
      svg: `${[129, 135, 141, 147, 132, 144].map((x, i) => `<ellipse cx="${x + 2.5}" cy="${i < 4 ? 124 : 120}" rx="3.2" ry="2.4" fill="#e8c48a"/>`).join('')}${rect(126, 127, 28, 3, GOLD)}${rect(128, 130, 2.4, 20, GOLD)}${rect(150, 130, 2.4, 20, GOLD)}`,
    },
    // The golden lampstand, its seven branches like an almond tree's, and a flame on each.
    {
      id: 'lampstand',
      svg: `${rect(172, 146, 13, 4, GOLD)}${rect(177, 104, 3, 43, GOLD)}${[1, 2, 3].map((k) => `<path d="M${178.5 - 6 * k} 104L${178.5 - 6 * k} ${110 + k * 5}Q178.5 ${118 + k * 5} ${178.5 + 6 * k} ${110 + k * 5}L${178.5 + 6 * k} 104" stroke="${GOLD}" stroke-width="2.2" fill="none"/>`).join('')}${[-3, -2, -1, 0, 1, 2, 3].map((k) => `<path d="M${178.5 + 6 * k} 97Q${181 + 6 * k} 101 ${178.5 + 6 * k} 104Q${176 + 6 * k} 101 ${178.5 + 6 * k} 97Z" fill="#ffcf5a"/>`).join('')}`,
    },
    // The golden altar of incense, its smoke rising.
    { id: 'incense', svg: `${rect(208, 129, 14, 3, GOLD_LIGHT)}${rect(210, 132, 10, 18, GOLD)}<path d="M215 128Q211 122 215 117Q219 112 215 106" stroke="#d8d4e4" stroke-width="2" fill="none" opacity=".8"/>` },
    // The screen for the door of the tent.
    { id: 'screen', svg: curtain(246, 8) },
    // The laver of bronze, with its water.
    { id: 'laver', svg: `<path d="M275 137Q285 145 295 137Z" fill="${BRONZE}"/><ellipse cx="285" cy="137" rx="10" ry="2" fill="#8ac8e8"/>${rect(283, 142, 4, 7, BRONZE)}${rect(279, 148, 12, 2, BRONZE)}` },
    // The altar of burnt offering, bronze, with a horn at each corner.
    {
      id: 'altar',
      svg: `${rect(318, 126, 34, 24, BRONZE)}${rect(318, 137, 34, 2.4, '#6a4424')}${Array.from({ length: 6 }, (_, i) => rect(321 + i * 5, 128, 2, 8, '#8a5a2a')).join('')}<path d="M317 126L318 120L322 126ZM353 126L352 120L348 126Z" fill="${BRONZE}"/>`,
    },
    // The hangings of the court, fine linen on posts, with the gate of blue, purple and scarlet.
    {
      id: 'court',
      svg: `${rect(0, 152, 400, 16, LINEN)}${rect(0, 152, 400, 2, '#d8d0c0')}${rect(355, 152, 40, 16, BLUE)}${rect(361, 152, 7, 16, PURPLE)}${rect(381, 152, 7, 16, SCARLET)}${Array.from({ length: 17 }, (_, i) => `${rect(i * 25 - 1, 149, 3, 21, '#8a6a4a')}${rect(i * 25 - 1.5, 148, 4, 2, '#c8ccd4')}`).join('')}`,
    },
  ],
  animate: onePart,
}

/** The gifts for the sanctuary, each one heaped or folded, and the heap that grows past the list. */
const gift: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 40 },
  facing: 1,
  poses: ['gold', 'silver', 'bronze', 'yarn', 'linen', 'goats-hair', 'rams-skins', 'acacia', 'oil', 'spices', 'onyx', 'flour', 'heap'],
  anchor: 'base',
  parts: [
    { id: 'gold', svg: [[11, 33], [21, 35], [29, 31], [16, 27], [25, 25]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.5" ry="3" fill="none" stroke="${GOLD}" stroke-width="2"/>`).join('') },
    { id: 'silver', svg: `<path d="M6 38L9 32L19 32L22 38ZM20 38L23 32L33 32L36 38Z" fill="#b8bcc4"/><path d="M13 32L16 26L26 26L29 32Z" fill="#dce0e8"/>` },
    { id: 'bronze', svg: `<ellipse cx="20" cy="34" rx="14" ry="4.5" fill="${BRONZE}"/><circle cx="20" cy="25" r="8" fill="#d08a4a"/><circle cx="18" cy="23" r="3" fill="#f0c08a"/>` },
    { id: 'yarn', svg: [[9, BLUE], [20, PURPLE], [31, SCARLET]].map(([x, c]) => `<ellipse cx="${x}" cy="31" rx="5.4" ry="7" fill="${c}"/><path d="M${Number(x) - 4} 28Q${x} 31 ${Number(x) + 4} 28M${Number(x) - 4} 33Q${x} 36 ${Number(x) + 4} 33" stroke="#ffffff" stroke-width=".8" opacity=".5" fill="none"/>`).join('') },
    { id: 'linen', svg: `${rect(5, 26, 30, 12, LINEN)}${rect(5, 31, 30, 1.6, '#d8d0c0')}${rect(7, 22, 26, 5, '#ffffff')}` },
    { id: 'goats-hair', svg: `<path d="M5 38Q4 26 12 24Q20 20 28 24Q36 26 35 38Z" fill="#3a3440"/><path d="M10 28Q20 24 30 28" stroke="#5a5460" stroke-width="1.4" fill="none"/>` },
    { id: 'rams-skins', svg: `<path d="M4 38L6 28Q20 24 34 28L36 38Z" fill="${SCARLET}"/><path d="M9 28L12 22Q20 20 28 22L31 28Z" fill="#7a3a2a"/>` },
    { id: 'acacia', svg: [26, 30, 34].map((y, i) => rect(2 + i, y, 36 - i * 2, 3.6, i % 2 ? '#a8743a' : '#c8945a')).join('') },
    { id: 'oil', svg: `<path d="M13 38L13 24Q13 18 20 18Q27 18 27 24L27 38Z" fill="#a8743a"/>${rect(16, 13, 8, 5, '#8a5a32')}${rect(14, 24, 12, 2.6, GOLD)}` },
    { id: 'spices', svg: `<path d="M6 32Q8 38 20 38Q32 38 34 32Z" fill="#8a5a32"/><circle cx="12" cy="30" r="4" fill="#e0782a"/><circle cx="20" cy="29" r="4.4" fill="${SCARLET}"/><circle cx="28" cy="30" r="4" fill="${GOLD}"/>` },
    { id: 'onyx', svg: [[9, 35, '#2a2430'], [19, 33, '#2a8a7a'], [29, 35, SCARLET], [14, 28, '#4aa85a'], [24, 27, '#5ab8e8']].map(([x, y, c]) => `<path d="M${Number(x) - 4} ${y}l4-4 4 4-4 3z" fill="${c}"/>`).join('') },
    { id: 'flour', svg: `<path d="M6 32Q8 38 20 38Q32 38 34 32Z" fill="#8a5a32"/><path d="M8 32Q20 22 32 32Z" fill="#f8f4ec"/>` },
    {
      id: 'heap',
      svg: `<path d="M0 40Q2 28 10 26Q14 14 24 16Q34 18 36 28Q40 32 40 40Z" fill="#c8945a"/><path d="M6 30Q16 22 28 26" stroke="${SCARLET}" stroke-width="4" fill="none"/><path d="M10 34Q20 30 32 34" stroke="${BLUE}" stroke-width="3" fill="none"/>${[[14, 22], [22, 19], [28, 24]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="2" fill="none" stroke="${GOLD}" stroke-width="1.6"/>`).join('')}${rect(24, 32, 12, 5, LINEN)}`,
    },
  ],
  animate: onePart,
}

/** The holy garments for Aaron, and the rail they hang on. */
const vestment: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 60 },
  facing: 1,
  poses: ['rail', 'coat', 'girdle', 'robe', 'ephod', 'breastpiece', 'turban', 'plate'],
  anchor: 'base',
  parts: [
    { id: 'rail', svg: `${rect(0, 43.5, 40, 1.2, '#8a5a32')}${rect(0.8, 43.5, 1, 16.5, '#8a5a32')}${rect(38.2, 43.5, 1, 16.5, '#8a5a32')}` },
    { id: 'coat', svg: `<path d="M6 8L34 8L34 16L30 16L30 56L10 56L10 16L6 16Z" fill="${LINEN}"/><path d="M16 8L20 14L24 8" stroke="#d8d0c0" stroke-width="1.4" fill="none"/>` },
    { id: 'girdle', svg: `${rect(17, 8, 6, 44, BLUE)}${rect(17, 8, 2, 44, PURPLE)}${rect(21, 8, 2, 44, SCARLET)}` },
    {
      id: 'robe',
      svg: `<path d="M5 8L35 8L35 16L31 16L32 54L8 54L9 16L5 16Z" fill="${BLUE}"/>${[11, 15, 19, 23, 27].map((x, i) => `<circle cx="${x + 1}" cy="55.5" r="1.6" fill="${i % 2 ? SCARLET : GOLD}"/>`).join('')}`,
    },
    { id: 'ephod', svg: `<path d="M10 14L30 14L30 40L10 40Z" fill="${GOLD}"/>${rect(10, 14, 20, 3, PURPLE)}${rect(10, 26, 20, 2, BLUE)}<circle cx="12" cy="10" r="3.4" fill="#2a2430"/><circle cx="28" cy="10" r="3.4" fill="#2a2430"/>` },
    {
      id: 'breastpiece',
      svg: `${rect(8, 16, 24, 26, GOLD)}${[0, 1, 2, 3].flatMap((row) => [0, 1, 2].map((col) => `<rect x="${11 + col * 7}" y="${19 + row * 6}" width="4.4" height="4.4" rx="1" fill="${[SCARLET, '#4aa85a', '#5ab8e8', PURPLE][row]}"/>`)).join('')}`,
    },
    { id: 'turban', svg: `<path d="M8 46Q8 30 20 30Q32 30 32 46Z" fill="${LINEN}"/><path d="M9 38Q20 34 31 38M9 42Q20 38 31 42" stroke="#d8d0c0" stroke-width="1.2" fill="none"/>` },
    { id: 'plate', svg: `<path d="M8 36Q20 32 32 36L32 44Q20 40 8 44Z" fill="${GOLD_LIGHT}"/><path d="M11 39Q20 36 29 39" stroke="#8a6a2a" stroke-width="1.2" stroke-dasharray="2 1" fill="none"/><path d="M20 28L20 34" stroke="${BLUE}" stroke-width="1.4"/>` },
  ],
  animate: onePart,
}

/** The signs of the feasts: unleavened bread, the first sheaf, two loaves, the ram's horn, the veil, and a shelter of branches. */
const feastSign: PaperPropArt = {
  box: { x: 0, y: 0, w: 50, h: 50 },
  facing: 1,
  poses: ['bread', 'sheaf', 'loaves', 'horn', 'veil', 'booth'],
  anchor: 'base',
  parts: [
    { id: 'bread', svg: [0, 1, 2, 3].map((i) => `<ellipse cx="25" cy="${45 - i * 6}" rx="${17 - i}" ry="3.4" fill="${i % 2 ? '#d8b070' : '#e8c890'}"/>`).join('') },
    {
      id: 'sheaf',
      svg: `${Array.from({ length: 8 }, (_, i) => `<path d="M25 48L${13 + i * 3.4} 8" stroke="#c8a050" stroke-width="1.6"/><ellipse cx="${13 + i * 3.4}" cy="7" rx="1.8" ry="4.4" fill="#f0c850"/>`).join('')}${rect(15, 28, 20, 3.4, '#8a5a32')}`,
    },
    { id: 'loaves', svg: `<path d="M3 46Q3 32 14 32Q25 32 25 46Z" fill="#c8945a"/><path d="M25 46Q25 32 36 32Q47 32 47 46Z" fill="#c8945a"/><path d="M8 36Q14 33 20 36M30 36Q36 33 42 36" stroke="#e8c48a" stroke-width="1.6" fill="none"/>` },
    { id: 'horn', svg: `<path d="M5 40Q4 34 10 34L24 32Q34 28 38 16Q42 8 46 10Q44 24 36 34Q28 42 12 44Q6 44 5 40Z" fill="#e0c890"/><path d="M38 16Q42 8 46 10L44 16Z" fill="#8a6a4a"/>` },
    { id: 'veil', svg: `${rect(10, 4, 30, 46, BLUE)}${rect(10, 4, 7, 46, PURPLE)}${rect(33, 4, 7, 46, SCARLET)}<path d="M25 20l-4 6h8z" fill="${GOLD}"/>${rect(8, 2, 34, 3, GOLD)}` },
    {
      id: 'booth',
      svg: `${rect(4, 14, 2.4, 36, '#8a5a32')}${rect(43.6, 14, 2.4, 36, '#8a5a32')}<path d="M0 16Q12 2 25 8Q38 2 50 16L50 18L0 18Z" fill="#4a8a3a"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${2 + i * 6} 17q2 6 -1 8" stroke="#6aa84a" stroke-width="2" fill="none"/>`).join('')}`,
    },
  ],
  animate: onePart,
}

/** The fire on the altar, flickering. */
const flame: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 60 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  parts: [
    { id: 'outer', svg: `<path d="M20 0Q30 18 34 34Q38 52 20 60Q2 52 6 34Q10 18 20 0Z" fill="#e0602a"/>` },
    { id: 'inner', svg: `<path d="M20 18Q27 32 28 42Q28 56 20 60Q12 56 12 42Q13 32 20 18Z" fill="#ffcf5a"/>` },
  ],
  animate: (part, _pose, time): PartMotion => ({ y: Math.sin(time * TAU * (part === 'outer' ? 1.3 : 2.1)) * 1.2, opacity: part === 'inner' ? 0.85 + 0.15 * Math.sin(time * TAU * 3.1) : 1 }),
}

/** A small dark stone, for one of the people's sins. */
const darkStone: PaperPropArt = {
  box: { x: 0, y: 0, w: 30, h: 20 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [{ id: 'stone', svg: `<path d="M3 20Q1 10 9 6Q16 2 23 6Q30 10 27 20Z" fill="#2a2430"/><path d="M9 9Q14 6 18 8" stroke="#5a5460" stroke-width="1.6" fill="none"/>` }],
}

/** The plan of the tabernacle, drawn in lines of golden light: the court, the tent, the ark, the altar. */
const tabernaclePlan: PaperPropArt = {
  box: { x: 0, y: 0, w: 200, h: 110 },
  facing: 1,
  poses: ['idle'],
  anchor: 'center',
  shadow: false,
  parts: [
    {
      id: 'plan',
      svg: `<g fill="none" stroke="#ffe48a" stroke-width="2.4" stroke-linejoin="round"><rect x="10" y="15" width="180" height="80"/><rect x="30" y="38" width="90" height="34"/><path d="M53 38L53 72"/><rect x="38" y="51" width="9" height="8" fill="#fff6d0"/><rect x="150" y="49" width="14" height="12"/><path d="M190 46L190 64" stroke="#ffffff" stroke-width="4"/></g>`,
    },
  ],
  animate: (_part, _pose, time): PartMotion => ({ opacity: 0.8 + 0.2 * Math.sin(time * TAU * 0.4) }),
}

/** A row of ripe grain, and a patch left standing at the edge of the field. */
const stalks = (x0: number, x1: number, top: number) =>
  Array.from({ length: Math.floor((x1 - x0) / 4) }, (_, i) => {
    const x = x0 + i * 4 + 2
    const y = top + ((i * 7) % 3)
    return `<path d="M${x} 40L${x + 1} ${y + 4}" stroke="#c8a050" stroke-width="1.4"/><ellipse cx="${x + 1}" cy="${y + 2}" rx="1.6" ry="3.4" fill="#f0c850"/>`
  }).join('')
const grainRow: PaperPropArt = {
  box: { x: 0, y: 0, w: 200, h: 40 },
  facing: 1,
  poses: ['idle', 'edge'],
  anchor: 'base',
  parts: [
    { id: 'idle', svg: stalks(0, 200, 24) },
    { id: 'edge', svg: stalks(80, 120, 4) },
  ],
  animate: (part, pose, time): PartMotion => ({ opacity: part === pose ? 1 : 0, x: Math.sin(time * TAU * 0.25) * 0.6 }),
}

export const tabernacleProps: Record<string, PaperPropArt> = {
  'tabernacle-piece': tabernaclePiece,
  gift,
  vestment,
  'feast-sign': feastSign,
  flame,
  'dark-stone': darkStone,
  'tabernacle-plan': tabernaclePlan,
  'grain-row': grainRow,
}
