import type { PaperPropArt } from '../art'
import { fourLegged, leg } from './animals'

/**
 * Props of the garden of Eden (Episode 2): God shown as light (spec §6), the breath of
 * life, the two trees in the middle of the garden, and the animals that join those of
 * day six to be named.
 */

const TAU = Math.PI * 2

/** A column of soft light, coming down to the ground. */
const glory: PaperPropArt = {
  // Wider than the light, so its soft edges aren't cut off.
  box: { x: -140, y: -220, w: 280, h: 320 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.35,
  parts: [
    {
      id: 'column',
      svg: `
        <defs>
          <linearGradient id="c" x1="0" y1="-220" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff7dc" stop-opacity="0"/>
            <stop offset=".35" stop-color="#fffbea" stop-opacity=".55"/>
            <stop offset=".85" stop-color="#fffdf4" stop-opacity=".85"/>
            <stop offset="1" stop-color="#fffdf4" stop-opacity="0"/>
          </linearGradient>
          <radialGradient id="g" cx="0" cy="60" r="90" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ffffff" stop-opacity=".9"/>
            <stop offset="1" stop-color="#fff2c8" stop-opacity="0"/>
          </radialGradient>
          <filter id="b" x="-80%" y="-10%" width="260%" height="120%"><feGaussianBlur stdDeviation="22"/></filter>
        </defs>
        <path d="M-30 -220L30 -220L62 90L-62 90Z" fill="url(#c)" filter="url(#b)"/>
        <ellipse cx="0" cy="60" rx="96" ry="40" fill="url(#g)"/>`,
    },
  ],
  animate: (_part, _pose, time) => ({ opacity: 0.85 + 0.15 * Math.sin(time * TAU * 0.25) }),
}

/** The breath of life: three wisps of light, turning slowly like wind. */
const breath: PaperPropArt = {
  box: { x: -60, y: -50, w: 120, h: 100 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.6,
  parts: [
    {
      id: 'wisps',
      pivot: { x: 0, y: 0 },
      svg: `
        <g fill="none" stroke="#fffbea" stroke-linecap="round">
          <path d="M-46 10C-30 -30 20 -36 34 -8C44 12 20 26 4 14" stroke-width="5" opacity=".85"/>
          <path d="M-30 30C-6 6 30 6 44 24" stroke-width="3.5" opacity=".6"/>
          <path d="M-50 -24C-34 -42 -8 -44 6 -34" stroke-width="3" opacity=".5"/>
        </g>`,
    },
  ],
  animate: (_part, _pose, time) => ({ rotate: time * 24, opacity: 0.8 + 0.2 * Math.sin(time * TAU * 0.5) }),
}

/** The tree of the knowledge of good and evil: dark leaves, deep red fruit. */
const treeKnowledge: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 120 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'trunk',
      svg: `
        <path d="M42 120C44 102 45 86 43 70L36 60L43 63L45 52L51 63L60 56L55 70C55 88 56 104 59 120Z" fill="#5a3a26"/>
        <path d="M42 120C44 102 45 86 43 70L46 72C46 90 46 106 46 120Z" fill="#7a5034"/>`,
    },
    {
      id: 'crown',
      pivot: { x: 50, y: 68 },
      svg: `
        <circle cx="50" cy="44" r="32" fill="#245a32"/>
        <circle cx="26" cy="56" r="20" fill="#2a6638"/>
        <circle cx="75" cy="54" r="21" fill="#2a6638"/>
        <circle cx="47" cy="25" r="22" fill="#34763f"/>
        <circle cx="66" cy="34" r="15" fill="#3c8246"/>
        <circle cx="38" cy="24" r="8" fill="#5a9a58" opacity=".8"/>
        ${[
          [34, 52],
          [60, 40],
          [72, 60],
          [48, 62],
          [27, 40],
        ]
          .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.4" fill="#a8183a"/><circle cx="${x! - 1.6}" cy="${y! - 1.8}" r="1.7" fill="#ff8aa0"/>`)
          .join('')}`,
    },
  ],
  animate: (part, _pose, time) => (part === 'crown' ? { rotate: 1.2 * Math.sin(time * TAU * 0.17) } : {}),
}

/** The tree of life: a golden-green crown that glows, hung with golden fruit. */
const treeOfLife: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 120 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'aura',
      svg: `
        <defs>
          <radialGradient id="a" cx="50" cy="48" r="58" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff6c8" stop-opacity=".8"/>
            <stop offset="1" stop-color="#fff6c8" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="50" cy="48" r="58" fill="url(#a)"/>`,
    },
    {
      id: 'trunk',
      svg: `
        <path d="M43 120C45 104 46 88 45 72L39 62L46 66L48 55L52 66L60 59L55 72C55 88 56 104 58 120Z" fill="#8a5a34"/>
        <path d="M43 120C45 104 46 88 45 72L48 74C48 90 47 106 47 120Z" fill="#b07a4a"/>`,
    },
    {
      id: 'crown',
      pivot: { x: 50, y: 70 },
      svg: `
        <circle cx="50" cy="45" r="31" fill="#5aa848"/>
        <circle cx="27" cy="57" r="20" fill="#68b652"/>
        <circle cx="74" cy="56" r="20" fill="#68b652"/>
        <circle cx="50" cy="26" r="22" fill="#86cc62"/>
        <circle cx="36" cy="36" r="15" fill="#a2dc76"/>
        <circle cx="64" cy="38" r="15" fill="#94d46c"/>
        <circle cx="40" cy="24" r="8" fill="#d8f4a8" opacity=".9"/>
        ${[
          [32, 50],
          [58, 34],
          [70, 60],
          [46, 62],
          [24, 64],
          [62, 52],
          [46, 40],
        ]
          .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="#ffd36e"/><circle cx="${x! - 1.4}" cy="${y! - 1.4}" r="1.6" fill="#fff6d0"/>`)
          .join('')}`,
    },
  ],
  animate: (part, _pose, time) => {
    if (part === 'crown') return { rotate: 1.2 * Math.sin(time * TAU * 0.19) }
    if (part === 'aura') return { opacity: 0.75 + 0.25 * Math.sin(time * TAU * 0.3) }
    return {}
  },
}

/** An eagle in flight, with broad wings that beat slowly. It faces right. */
const eagle: PaperPropArt = {
  box: { x: 0, y: 0, w: 70, h: 40 },
  facing: 1,
  poses: ['idle'],
  parts: [
    {
      id: 'far-wing',
      pivot: { x: 34, y: 22 },
      svg: `<path d="M36 22C40 12 48 4 60 0C56 8 52 14 46 20Z" fill="#4a3220"/>`,
    },
    {
      id: 'body',
      svg: `
        <path d="M10 24L2 20L4 26L0 32L12 28Z" fill="#5a3c24"/>
        <path d="M10 26C18 20 34 18 48 20C54 21 58 24 58 26C50 30 30 32 10 28Z" fill="#6b4a2e"/>
        <path d="M52 20C56 16 64 16 66 21C64 25 58 26 54 25Z" fill="#f4efe4"/>
        <path d="M65 20L70 22L65 24Z" fill="#ffc444"/>
        <circle cx="62" cy="20" r="1.1" fill="#1d120c"/>`,
    },
    {
      id: 'wing',
      pivot: { x: 32, y: 24 },
      svg: `<path d="M32 24C26 14 18 6 6 2C10 10 14 16 18 20C14 20 10 22 8 24C18 26 26 26 32 24Z" fill="#7a5634"/><path d="M8 4L12 10M12 2L15 9" stroke="#3a2618" stroke-width="1.2"/>`,
    },
  ],
  animate: (part, _pose, time) => {
    const beat = Math.sin(time * TAU * 1.6)
    if (part === 'wing') return { rotate: 26 * beat }
    if (part === 'far-wing') return { rotate: -18 * beat }
    return {}
  },
}

const horse: PaperPropArt = {
  box: { x: 0, y: 0, w: 130, h: 112 },
  facing: 1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    { id: 'leg-bf', pivot: { x: 32, y: 62 }, svg: leg(32, 62, 112, 9, '#6e3e22', '#2a1a12') },
    { id: 'leg-ff', pivot: { x: 92, y: 62 }, svg: leg(92, 62, 112, 9, '#6e3e22', '#2a1a12') },
    {
      id: 'tail',
      pivot: { x: 20, y: 48 },
      svg: `<path d="M20 48C10 52 6 66 8 82C12 70 16 60 22 54Z" fill="#3a2418"/>`,
    },
    {
      id: 'body',
      svg: `
        <path d="M20 56C18 42 34 36 60 36C84 36 98 40 102 50C104 62 92 70 62 70C38 70 22 66 20 56Z" fill="#8a4f2c"/>
        <path d="M26 62C40 70 80 70 98 60C86 66 52 68 26 62Z" fill="#743f22"/>
        <path d="M92 46C96 34 102 22 110 14L122 18C120 28 112 40 104 52Z" fill="#8a4f2c"/>
        <path d="M110 12C116 10 124 12 128 18C128 24 124 28 118 28C114 26 112 20 110 12Z" fill="#8a4f2c"/>
        <path d="M94 44C98 32 104 20 112 10L106 18C102 26 98 36 96 46Z" fill="#3a2418"/>
        <path d="M108 8L112 2L114 10Z" fill="#743f22"/>
        <circle cx="118" cy="16" r="1.4" fill="#1d120c"/>
        <path d="M128 22L130 23" stroke="#1d120c" stroke-width="1.4"/>`,
    },
    { id: 'leg-bn', pivot: { x: 38, y: 64 }, svg: leg(38, 64, 112, 10, '#8a4f2c', '#2a1a12') },
    { id: 'leg-fn', pivot: { x: 86, y: 64 }, svg: leg(86, 64, 112, 10, '#8a4f2c', '#2a1a12') },
  ],
  animate: fourLegged(1.4, 22),
}

const hare: PaperPropArt = {
  box: { x: 0, y: 0, w: 60, h: 52 },
  facing: 1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    { id: 'leg-bf', pivot: { x: 16, y: 38 }, svg: leg(16, 38, 52, 6, '#8a6a4a') },
    { id: 'leg-ff', pivot: { x: 40, y: 38 }, svg: leg(40, 38, 52, 4, '#8a6a4a') },
    {
      id: 'body',
      svg: `
        <ellipse cx="26" cy="34" rx="18" ry="11" fill="#a8845e"/>
        <circle cx="9" cy="31" r="5" fill="#f4efe4"/>
        <ellipse cx="44" cy="26" rx="9" ry="7.5" fill="#a8845e"/>
        <path d="M42 20C40 10 41 2 44 0C47 4 47 12 46 20Z" fill="#a8845e"/>
        <path d="M46 20C46 10 49 3 53 2C54 8 51 14 49 21Z" fill="#9a7650"/>
        <path d="M43 18C42 10 43 4 44 2C45 6 45 12 45 18Z" fill="#e8b8a0"/>
        <circle cx="48" cy="25" r="1.3" fill="#1d120c"/>
        <circle cx="52.5" cy="28" r="1" fill="#5a3020"/>`,
    },
    { id: 'leg-bn', pivot: { x: 20, y: 40 }, svg: leg(20, 40, 52, 7, '#a8845e') },
    { id: 'leg-fn', pivot: { x: 36, y: 40 }, svg: leg(36, 40, 52, 4.5, '#a8845e') },
  ],
  animate: fourLegged(2.2, 26),
}

export const gardenProps: Record<string, PaperPropArt> = {
  glory,
  breath,
  'tree-knowledge': treeKnowledge,
  'tree-of-life': treeOfLife,
  eagle,
  horse,
  hare,
}
