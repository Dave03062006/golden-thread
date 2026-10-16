import { abelsFlock } from './abels-flock'
import { familyTree } from './family-tree'
import type { AnyGameRules } from './framework'
import { letThereBe } from './let-there-be'
import { lightsInTheDark } from './lights-in-the-dark'
import { naming } from './naming'
import { twist } from './twist'

/** Every interactive moment, by the name a story's `play` beat uses. */
export const GAMES: Record<string, AnyGameRules> = { ...letThereBe, naming, twist, 'lights-in-the-dark': lightsInTheDark, 'abels-flock': abelsFlock, 'family-tree': familyTree }
