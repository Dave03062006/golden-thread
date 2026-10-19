import { abelsFlock } from './abels-flock'
import { familyTree, familyTreeShem } from './family-tree'
import type { AnyGameRules } from './framework'
import { letThereBe } from './let-there-be'
import { lightsInTheDark } from './lights-in-the-dark'
import { naming } from './naming'
import { twist } from './twist'
import { walkWithGod } from './walk-with-god'
import { buildTheArk } from './build-the-ark'
import { throughTheStorm } from './through-the-storm'
import { theDove } from './the-dove'
import { colorsOfThePromise } from './colors-of-the-promise'
import { scatter, theTower } from './the-tower'
import { theJourney } from './the-journey'
import { dividingTheFlocks } from './dividing-the-flocks'

/** Every interactive moment, by the name a story's `play` beat uses. */
export const GAMES: Record<string, AnyGameRules> = { ...letThereBe, naming, twist, 'lights-in-the-dark': lightsInTheDark, 'abels-flock': abelsFlock, 'family-tree': familyTree, 'walk-with-god': walkWithGod, 'build-the-ark': buildTheArk, 'through-the-storm': throughTheStorm, ...theDove, 'colors-of-the-promise': colorsOfThePromise, 'the-tower': theTower, scatter, 'family-tree-shem': familyTreeShem, 'the-journey': theJourney, 'dividing-the-flocks': dividingTheFlocks }
