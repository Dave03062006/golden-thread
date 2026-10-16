import type { AnyGameRules } from './framework'
import { letThereBe } from './let-there-be'
import { naming } from './naming'

/** Every interactive moment, by the name a story's `play` beat uses. */
export const GAMES: Record<string, AnyGameRules> = { ...letThereBe, naming }
