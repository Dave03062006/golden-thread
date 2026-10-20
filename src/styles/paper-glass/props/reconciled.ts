import type { PaperPropArt } from '../art'

/**
 * Props of Level 4, Episode 7: the cloud of dust raised by Esau's four hundred men on the
 * far hills, and the twelve sons of Jacob, standing together in a row, from Reuben, the
 * eldest, down to little Benjamin.
 */

const TAU = Math.PI * 2

const dustCloud: PaperPropArt = {
  box: { x: 0, y: 0, w: 300, h: 140 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  shadow: false,
  resolution: 0.5,
  parts: [
    {
      id: 'back',
      svg: `<ellipse cx="150" cy="96" rx="146" ry="40" fill="#d8c09a" opacity=".45"/><ellipse cx="96" cy="70" rx="80" ry="42" fill="#d8c09a" opacity=".4"/><ellipse cx="206" cy="66" rx="84" ry="46" fill="#e0caa6" opacity=".4"/>`,
    },
    { id: 'front', svg: `<ellipse cx="150" cy="110" rx="120" ry="28" fill="#c8a878" opacity=".5"/><ellipse cx="150" cy="56" rx="60" ry="34" fill="#ead6b4" opacity=".35"/>` },
  ],
  animate(part, _pose, time) {
    const drift = Math.sin(time * TAU * (part === 'back' ? 0.08 : 0.11))
    return { x: 6 * drift, y: part === 'back' ? -2 * drift : 0, opacity: 0.9 + 0.1 * drift }
  },
}

/** The twelve sons, each a small figure in his own robe; Benjamin, the youngest, last and smallest. */
const ROBES = ['#5a6aa8', '#3c6a4a', '#8a3a3a', '#c8843a', '#6a5a7a', '#2a6a6a', '#8a7a5a', '#4a3a6a', '#7a6a2a', '#3a5a7e', '#a84a6a', '#b0843e']
const twelveSons: PaperPropArt = {
  box: { x: 0, y: 0, w: 360, h: 110 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'sons',
      svg: ROBES.map((robe, i) => {
        const x = 16 + i * 30
        const h = i === 11 ? 62 : i === 10 ? 84 : 92 + ((i * 7) % 12)
        const top = 110 - h
        return `<path d="M${x - 9} 110L${x - 7} ${top + 22}Q${x} ${top + 16} ${x + 7} ${top + 22}L${x + 9} 110Z" fill="${robe}"/>
          <circle cx="${x}" cy="${top + 11}" r="${i === 11 ? 6 : 7}" fill="#3a2a42"/>
          <path d="M${x - 7} ${top + 24}L${x - 8.5} 108" stroke="#ffd99a" stroke-width="1.2" opacity=".85"/>`
      }).join(''),
    },
  ],
}

export const reconciledProps: Record<string, PaperPropArt> = { 'dust-cloud': dustCloud, 'twelve-sons': twelveSons }
