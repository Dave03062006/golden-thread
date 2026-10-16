import { formatReference } from '../../content/bible/books'
import { mapRegion } from '../../map/core/regions'

/** A question's passages, like "Genesis 2:16–17; Genesis 3:1". */
export const formatRefs = (ref: string) =>
  ref
    .split(';')
    .map((r) => formatReference(r.trim()))
    .join('; ')

/** A map place's name, for answers given by tapping the map. */
export const regionName = (id: string) => mapRegion(id)?.name ?? id
