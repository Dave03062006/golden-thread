import type { AnyGameRules } from './framework'

/** The plays of the levels loaded so far, by the name a story's `play` beat uses (filled by content/story-loading.ts). */
export const GAMES: Record<string, AnyGameRules> = {}
