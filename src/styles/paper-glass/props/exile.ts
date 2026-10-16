import type { PaperPropArt } from '../art'
import { sparkle } from '../shapes'

/**
 * Props of the promise and the exile (Episode 4): thorns rising from the ground, the
 * cherub and the flaming sword at the east of the garden, and the three signs of God's
 * mercy found in "Lights in the dark".
 *
 * The cherub is drawn as Scripture's guardians are: a figure of light and great wings,
 * with no face drawn (spec §6), awesome rather than sweet.
 */

const TAU = Math.PI * 2

/** A thorn bush: dark bare stems with hooked thorns. It grows up from its base. */
const thorns: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 70 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'stems',
      svg: `
        <g fill="none" stroke="#3a2a22" stroke-linecap="round">
          <path d="M50 70C46 54 34 40 16 30" stroke-width="3.4"/>
          <path d="M50 70C52 50 60 32 78 18" stroke-width="3.4"/>
          <path d="M50 70C50 52 48 30 44 8" stroke-width="3"/>
          <path d="M40 46C30 46 22 50 12 58" stroke-width="2.4"/>
          <path d="M58 44C68 44 80 48 90 56" stroke-width="2.4"/>
          <path d="M47 30C40 24 34 20 26 18" stroke-width="2"/>
        </g>
        <g fill="#3a2a22">
          ${[
            [22, 33, 1],
            [32, 40, -1],
            [64, 30, 1],
            [72, 23, -1],
            [46, 18, 1],
            [44, 40, -1],
            [20, 54, 1],
            [80, 51, -1],
            [34, 22, 1],
            [56, 56, -1],
          ]
            .map(([x, y, s]) => `<path d="M${x} ${y}L${x! + 6 * s!} ${y! - 4}L${x! + 1 * s!} ${y! + 2}Z"/>`)
            .join('')}
        </g>`,
    },
  ],
}

/**
 * A cherub guarding the way: a tall form of light with great wings, two raised and two
 * folded down, faintly shimmering.
 */
const cherub: PaperPropArt = {
  box: { x: -80, y: -120, w: 160, h: 240 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.6,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs>
          <radialGradient id="g" cx="0" cy="0" r="110" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff6d8" stop-opacity=".7"/>
            <stop offset="1" stop-color="#ffd890" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <ellipse rx="80" ry="118" fill="url(#g)"/>`,
    },
    {
      id: 'wings-low',
      svg: `
        <path d="M-8 10C-40 20 -60 50 -66 96C-48 78 -30 62 -10 48Z" fill="#f4e2b0" opacity=".85"/>
        <path d="M8 10C40 20 60 50 66 96C48 78 30 62 10 48Z" fill="#f4e2b0" opacity=".85"/>`,
    },
    {
      id: 'body',
      svg: `
        <path d="M-14 -50C-16 -20 -20 30 -24 100L24 100C20 30 16 -20 14 -50C8 -60 -8 -60 -14 -50Z" fill="#fff4d6"/>
        <ellipse cy="-66" rx="13" ry="15" fill="#fffaf0"/>
        <path d="M-10 -20L10 -20M-12 10L12 10M-16 50L16 50" stroke="#e8c47a" stroke-width="1.6" opacity=".7"/>`,
    },
    {
      id: 'wing-left',
      pivot: { x: -10, y: -40 },
      svg: `
        <path d="M-10 -40C-40 -60 -64 -92 -74 -118C-56 -104 -40 -98 -24 -96C-36 -84 -40 -72 -40 -60C-30 -58 -20 -52 -10 -30Z" fill="#fff0c8"/>
        <path d="M-20 -50L-56 -100M-26 -46L-60 -84M-30 -40L-52 -64" stroke="#e0b860" stroke-width="1.4" opacity=".8"/>`,
    },
    {
      id: 'wing-right',
      pivot: { x: 10, y: -40 },
      svg: `
        <path d="M10 -40C40 -60 64 -92 74 -118C56 -104 40 -98 24 -96C36 -84 40 -72 40 -60C30 -58 20 -52 10 -30Z" fill="#fff0c8"/>
        <path d="M20 -50L56 -100M26 -46L60 -84M30 -40L52 -64" stroke="#e0b860" stroke-width="1.4" opacity=".8"/>`,
    },
  ],
  animate: (part, _pose, time) => {
    const beat = Math.sin(time * TAU * 0.2)
    if (part === 'wing-left') return { rotate: -3 * beat }
    if (part === 'wing-right') return { rotate: 3 * beat }
    if (part === 'glow') return { opacity: 0.8 + 0.2 * Math.sin(time * TAU * 0.6) }
    return {}
  },
}

/** The flaming sword which turned every way (Genesis 3:24): a blade of fire, turning. */
const flamingSword: PaperPropArt = {
  box: { x: -70, y: -70, w: 140, h: 140 },
  facing: 1,
  poses: ['idle'],
  shadow: false,
  resolution: 0.7,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs>
          <radialGradient id="g" cx="0" cy="0" r="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ffd27a" stop-opacity=".7"/>
            <stop offset="1" stop-color="#ff7a3a" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle r="70" fill="url(#g)"/>`,
    },
    {
      id: 'blade',
      pivot: { x: 0, y: 0 },
      svg: `
        <path d="M0 -62C6 -40 7 -14 5 0L-5 0C-7 -14 -6 -40 0 -62Z" fill="#fff4c8"/>
        <path d="M0 -60C10 -42 14 -20 8 0C14 -22 10 -40 4 -52Z" fill="#ff9a3a" opacity=".85"/>
        <path d="M0 -60C-10 -42 -14 -20 -8 0C-14 -22 -10 -40 -4 -52Z" fill="#ff7a2a" opacity=".85"/>
        <rect x="-16" y="0" width="32" height="5" rx="2" fill="#c8902a"/>
        <rect x="-3" y="5" width="6" height="18" fill="#8a5a2a"/>
        <circle cy="26" r="4" fill="#c8902a"/>`,
    },
  ],
  animate: (part, _pose, time) => {
    if (part === 'blade') return { rotate: time * 40 }
    return { opacity: 0.75 + 0.25 * Math.sin(time * TAU * 1.3) }
  },
}

/**
 * A sign of God's mercy, glowing in the dark: the promise (a point of light), the
 * garments (a small cloak), or the name Eve (a sprig of new life). Its pose says which.
 */
const sign: PaperPropArt = {
  box: { x: -50, y: -50, w: 100, h: 100 },
  facing: 1,
  poses: ['promise', 'garments', 'eve'],
  shadow: false,
  resolution: 0.8,
  parts: [
    {
      id: 'glow',
      svg: `
        <defs>
          <radialGradient id="g" cx="0" cy="0" r="50" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff6d8" stop-opacity=".9"/>
            <stop offset=".4" stop-color="#ffe0a0" stop-opacity=".4"/>
            <stop offset="1" stop-color="#ffd27a" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle r="50" fill="url(#g)"/>`,
    },
    { id: 'promise', svg: `<g fill="#ffffff">${sparkle(0, 0, 16)}</g>` },
    {
      id: 'garments',
      svg: `<path d="M-12 -14L-4 -16C-2 -12 2 -12 4 -16L12 -14L16 -4L10 -2L10 16L-10 16L-10 -2L-16 -4Z" fill="#c89a6a"/><path d="M-10 8L10 8" stroke="#8a6040" stroke-width="1.4"/>`,
    },
    {
      id: 'eve',
      svg: `<path d="M0 16C0 6 0 -2 0 -10" stroke="#6ab04c" stroke-width="2.4" fill="none"/><path d="M0 -2C-8 -4 -12 -10 -12 -16C-6 -14 -2 -10 0 -2ZM0 -6C8 -8 12 -14 12 -18C6 -16 2 -12 0 -6Z" fill="#8ad06a"/><circle cy="-12" r="4" fill="#fff6d0"/>`,
    },
  ],
  animate: (part, pose, time) => {
    if (part === 'glow') return { opacity: 0.7 + 0.3 * Math.sin(time * TAU * 0.6) }
    return { opacity: part === pose ? 1 : 0 }
  },
}

export const exileProps: Record<string, PaperPropArt> = { thorns, cherub, 'flaming-sword': flamingSword, sign }
