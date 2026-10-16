import { creationSet } from '../../content/levels/01-creation-and-fall/episode-1'
import type { AnyGameRules } from '../framework'
import { animals, creatures } from './creatures'
import { liftGame } from './lift'
import { light } from './light'
import { stars, sunAndMoon } from './lights'
import { plants } from './plants'
import { rest } from './rest'
import { HINTS } from './shared'

/** Where a layer of the creation set starts, lowered into the waters. */
const startingOffset = (id: string) => creationSet.layers.find((l) => l.id === id)?.offsetY ?? 0

/** "Let there be…": the interactions of Episode 1, one for each of the days' works. */
export const letThereBe: Record<string, AnyGameRules> = {
  light,
  firmament: liftGame('firmament', HINTS.firmament, [{ channel: 'layer:firmament.offsetY', from: startingOffset('firmament') }]),
  land: liftGame('land', HINTS.land, [
    { channel: 'layer:land.offsetY', from: startingOffset('land') },
    { channel: 'layer:grass.offsetY', from: startingOffset('grass') },
  ]),
  plants,
  'sun-and-moon': sunAndMoon,
  stars,
  creatures,
  animals,
  rest,
}
