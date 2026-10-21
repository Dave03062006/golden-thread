import type { PaperPropArt } from '../art'

/**
 * Props of Level 5, Episode 3: the cows and the ears of grain of Pharaoh's dreams, fat and
 * full or thin and blighted; Pharaoh's throne; the chariot Joseph rides in; and a granary,
 * one of the round storehouses filled in the seven good years.
 */

const TAU = Math.PI * 2

const cow: PaperPropArt = {
  box: { x: 0, y: 0, w: 130, h: 90 },
  facing: -1,
  poses: ['fat', 'thin'],
  anchor: 'base',
  parts: [
    {
      id: 'fat',
      svg: `<path d="M24 34Q30 18 70 20Q110 18 116 40Q118 60 104 62L36 62Q22 58 24 34Z" fill="#c89870"/>
        <path d="M24 34Q14 26 6 30L4 44Q14 48 24 44Z" fill="#c89870"/><circle cx="10" cy="36" r="1.8" fill="#2a1e14"/><path d="M8 28L4 18M14 28L18 18" stroke="#e8dcc0" stroke-width="3" stroke-linecap="round"/>
        <path d="M54 30Q70 26 84 34" stroke="#a87850" stroke-width="3" fill="none"/>
        ${[34, 48, 92, 106].map((x) => `<path d="M${x} 60L${x + 6} 60L${x + 5} 88L${x + 1} 88Z" fill="#a87850"/>`).join('')}`,
    },
    {
      id: 'thin',
      svg: `<path d="M30 38Q40 30 70 32Q100 30 106 42Q108 52 98 54L40 54Q30 50 30 38Z" fill="#8a7462"/>
        <path d="M44 34L44 52M56 33L56 53M68 33L68 53M80 33L80 53" stroke="#6a5444" stroke-width="2"/>
        <path d="M30 38Q20 32 10 36L8 48Q18 50 30 46Z" fill="#8a7462"/><circle cx="14" cy="41" r="1.6" fill="#2a1e14"/>
        ${[38, 50, 86, 98].map((x) => `<path d="M${x} 52L${x + 4} 52L${x + 4} 88L${x} 88Z" fill="#6a5444"/>`).join('')}`,
    },
  ],
  animate(part, pose, time) {
    const bob = 0.6 * Math.sin(time * TAU * 0.3)
    return { y: bob, opacity: part === pose ? 1 : 0 }
  },
}

const grainStalk: PaperPropArt = {
  box: { x: 0, y: 0, w: 40, h: 120 },
  facing: 1,
  poses: ['full', 'thin'],
  anchor: 'base',
  parts: [
    { id: 'stalk', pivot: { x: 20, y: 120 }, svg: `<path d="M19 120L21 120L21 40L19 40Z" fill="#a8843a"/>` },
    { id: 'full', pivot: { x: 20, y: 120 }, svg: [0, 1, 2, 3, 4, 5, 6].map((k) => `<ellipse cx="${20 + (k % 2 ? 6 : -6)}" cy="${12 + k * 5}" rx="5" ry="7" fill="#f0c850"/>`).join('') },
    { id: 'thin', pivot: { x: 20, y: 120 }, svg: [0, 1, 2, 3, 4, 5, 6].map((k) => `<path d="M20 ${16 + k * 4}L${20 + (k % 2 ? 8 : -8)} ${12 + k * 4}" stroke="#a8946a" stroke-width="2.4"/>`).join('') },
  ],
  animate: (part, pose, time) => (part === 'stalk' ? { rotate: 2 * Math.sin(time * TAU * 0.25) } : { opacity: part === pose ? 1 : 0, rotate: 2 * Math.sin(time * TAU * 0.25) }),
}

const throne: PaperPropArt = {
  box: { x: 0, y: 0, w: 90, h: 120 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'throne',
      svg: `<path d="M14 10L36 10L36 70L76 70L76 120L14 120Z" fill="#e8c050"/>
        <path d="M18 14L32 14L32 66L18 66Z" fill="#3a6aa8"/><path d="M14 80L76 80" stroke="#c8503a" stroke-width="5"/>
        <path d="M70 120L74 96L84 96L84 120Z" fill="#c89838"/><path d="M6 120L84 120L84 114L6 114Z" fill="#a8803a"/>`,
    },
  ],
}

const chariot: PaperPropArt = {
  box: { x: 0, y: 0, w: 120, h: 80 },
  facing: -1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    { id: 'car', svg: `<path d="M50 20L104 20L110 54L44 54Z" fill="#e8c050"/><path d="M50 30L104 30" stroke="#c8503a" stroke-width="4"/><path d="M6 46L56 46" stroke="#8a6a3a" stroke-width="5" stroke-linecap="round"/>` },
    { id: 'wheel', pivot: { x: 82, y: 58 }, svg: `<circle cx="82" cy="58" r="21" fill="none" stroke="#8a6a3a" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M82 58L${(82 + Math.cos((k * Math.PI) / 3) * 20).toFixed(1)} ${(58 + Math.sin((k * Math.PI) / 3) * 20).toFixed(1)}" stroke="#8a6a3a" stroke-width="3"/>`).join('')}` },
  ],
  animate: (part, pose, time) => (part === 'wheel' && pose === 'walk' ? { rotate: -((time * 360) % 360) } : {}),
}

const granary: PaperPropArt = {
  box: { x: 0, y: 0, w: 100, h: 140 },
  facing: 1,
  poses: ['idle'],
  anchor: 'base',
  parts: [
    {
      id: 'granary',
      svg: `<path d="M10 140L10 60Q10 6 50 6Q90 6 90 60L90 140Z" fill="#d8c09a"/>
        <path d="M30 140L30 112Q30 100 50 100Q70 100 70 112L70 140Z" fill="#6a4a2a"/>
        <path d="M44 6L56 6L56 20L44 20Z" fill="#a8946a"/><path d="M16 60L84 60M12 90L88 90" stroke="#b8a07a" stroke-width="4"/>`,
    },
  ],
}

export const pharaohProps: Record<string, PaperPropArt> = { cow, 'grain-stalk': grainStalk, throne, chariot, granary }
