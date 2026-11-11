import type { Place } from './types'

/**
 * Places in the Bible, with real coordinates where they can be found (spec §13.3). The
 * world map draws them; the "Where and when" card names them.
 */
export const PLACES: Place[] = [
  // Level 1 · Creation and the Fall
  {
    id: 'eden',
    name: 'Eden',
    kind: 'region',
    unknown: true,
    note: 'Genesis places the garden “in the east,” where four rivers part. Two of them, the Tigris and the Euphrates, point to Mesopotamia.',
  },
  {
    id: 'mesopotamia',
    name: 'Mesopotamia',
    kind: 'region',
    at: { lat: 33.3, lon: 44.4 },
    note: 'The land “between the rivers,” in modern Iraq and Syria.',
  },
  {
    id: 'tigris',
    name: 'Tigris',
    kind: 'river',
    course: [
      { lat: 38.5, lon: 39.6 },
      { lat: 37.9, lon: 40.2 },
      { lat: 37.1, lon: 42.4 },
      { lat: 36.3, lon: 43.1 },
      { lat: 34.6, lon: 43.7 },
      { lat: 33.3, lon: 44.4 },
      { lat: 32.5, lon: 45.8 },
      { lat: 31.0, lon: 47.4 },
      { lat: 29.95, lon: 48.55 },
    ],
    note: 'Called the Hiddekel in Hebrew. It still flows through Turkey and Iraq.',
  },
  {
    id: 'euphrates',
    name: 'Euphrates',
    kind: 'river',
    course: [
      { lat: 39.0, lon: 38.9 },
      { lat: 37.1, lon: 38.0 },
      { lat: 36.1, lon: 38.1 },
      { lat: 35.3, lon: 40.1 },
      { lat: 34.4, lon: 41.0 },
      { lat: 33.4, lon: 43.3 },
      { lat: 32.5, lon: 44.4 },
      { lat: 31.0, lon: 46.2 },
      { lat: 31.0, lon: 47.4 },
    ],
    note: 'The great river of the Bible lands, flowing from Turkey through Syria and Iraq.',
  },
  {
    id: 'nile',
    name: 'Nile',
    kind: 'river',
    course: [
      { lat: 23.0, lon: 32.9 },
      { lat: 24.1, lon: 32.9 },
      { lat: 25.7, lon: 32.6 },
      { lat: 26.2, lon: 32.3 },
      { lat: 27.2, lon: 31.2 },
      { lat: 28.1, lon: 30.75 },
      { lat: 29.3, lon: 31.2 },
      { lat: 30.05, lon: 31.25 },
      { lat: 30.8, lon: 31.0 },
      { lat: 31.45, lon: 30.6 },
    ],
    note: 'The great river of Egypt.',
  },
  {
    id: 'jordan',
    name: 'Jordan',
    kind: 'river',
    course: [
      { lat: 33.2, lon: 35.62 },
      { lat: 32.85, lon: 35.6 },
      { lat: 32.7, lon: 35.57 },
      { lat: 32.3, lon: 35.55 },
      { lat: 31.76, lon: 35.55 },
    ],
    note: 'From the Sea of Galilee down to the Dead Sea.',
  },
  {
    id: 'jerusalem',
    name: 'Jerusalem',
    kind: 'city',
    at: { lat: 31.78, lon: 35.23 },
    note: 'Where Jesus prayed in the garden of Gethsemane, died on the cross and rose again.',
  },
  { id: 'pishon', name: 'Pishon', kind: 'river', unknown: true, note: 'It flowed around the land of Havilah, “where there is gold.” Nobody knows which river it was.' },
  { id: 'gihon', name: 'Gihon', kind: 'river', unknown: true, note: 'It flowed around the land of Cush. Nobody knows which river it was.' },
  { id: 'nod', name: 'Nod', kind: 'region', unknown: true, note: '“East of Eden.” Its name sounds like the Hebrew word for wandering.' },

  // Level 2 · Noah and the Nations
  {
    id: 'ararat',
    name: 'The mountains of Ararat',
    kind: 'mountain',
    at: { lat: 39.7, lon: 44.3 },
    note: 'The land the Assyrians called Urartu, where Turkey, Armenia and Iran meet today. Its highest peak rises over 5,000 meters.',
  },
  {
    id: 'shinar',
    name: 'Shinar',
    kind: 'region',
    at: { lat: 32.0, lon: 45.2 },
    note: 'The plain between the Tigris and the Euphrates in the south of Mesopotamia, in modern Iraq: the land of Babylon.',
  },
  { id: 'babel', name: 'Babel', kind: 'city', at: { lat: 32.54, lon: 44.42 }, note: 'Babylon, on the Euphrates, in modern Iraq. Its great ziggurat rose about 90 meters high.' },
  { id: 'ur', name: 'Ur of the Chaldeans', kind: 'city', at: { lat: 30.96, lon: 46.1 }, note: 'One of the greatest cities of its time, near where the Euphrates met the Persian Gulf.' },
  { id: 'haran', name: 'Haran', kind: 'city', at: { lat: 36.86, lon: 39.03 }, note: 'A trading city on the road from Mesopotamia to Canaan, in southern Turkey today.' },
  { id: 'nazareth', name: 'Nazareth', kind: 'city', at: { lat: 32.7, lon: 35.3 }, note: 'The village in Galilee where the angel Gabriel came to Mary.' },
  // Level 3 · Abraham, Father of Faith
  { id: 'shechem', name: 'Shechem', kind: 'city', at: { lat: 32.21, lon: 35.28 }, note: 'Among the hills of Samaria, by the oak of Moreh: Abram’s first altar in Canaan.' },
  { id: 'bethel', name: 'Bethel', kind: 'city', at: { lat: 31.93, lon: 35.22 }, note: '“House of God.” Abram built an altar on the mountain east of it; Jacob will dream of a ladder here.' },
  { id: 'egypt', name: 'Egypt', kind: 'region', at: { lat: 29.85, lon: 31.25 }, note: 'Fed by the Nile, the breadbasket of the ancient world, where families from Canaan went in famines.' },
  { id: 'hebron', name: 'Hebron (Mamre)', kind: 'city', at: { lat: 31.53, lon: 35.1 }, note: 'The oaks of Mamre, where Abraham lived and welcomed three visitors; the cave of Machpelah, where he buried Sarah.' },
  { id: 'beersheba', name: 'Beer-sheba', kind: 'city', at: { lat: 31.25, lon: 34.79 }, note: '“Well of the oath,” at the edge of the desert in the south, the Negeb.' },
  { id: 'dan', name: 'Dan', kind: 'city', at: { lat: 33.25, lon: 35.65 }, note: 'At the far north of the land, near the springs of the Jordan, where Abram caught up with the kings.' },
  {
    id: 'sodom',
    name: 'Sodom and Gomorrah',
    kind: 'region',
    unknown: true,
    note: 'Somewhere near the southern end of the Dead Sea, most scholars think. No one knows the exact place.',
  },
  { id: 'galilee', name: 'The Sea of Galilee', kind: 'region', at: { lat: 32.82, lon: 35.59 }, note: 'Where Jesus called Peter and Andrew from their fishing nets, and taught the crowds.' },
  { id: 'sychar', name: 'Sychar (Jacob’s well)', kind: 'city', at: { lat: 32.21, lon: 35.29 }, note: 'Near ancient Shechem, where Jesus met the Samaritan woman at Jacob’s well.' },
  { id: 'caesarea-philippi', name: 'Caesarea Philippi', kind: 'city', at: { lat: 33.25, lon: 35.69 }, note: 'At the springs of the Jordan, where Jesus renamed Simon “Peter.”' },
  // Level 4 · Isaac and Jacob
  {
    id: 'jabbok',
    name: 'Jabbok',
    kind: 'river',
    // From its springs near Amman, north-east, then west through its deep valley into the Jordan.
    course: [
      { lat: 31.95, lon: 35.93 },
      { lat: 32.07, lon: 36.08 },
      { lat: 32.17, lon: 35.95 },
      { lat: 32.2, lon: 35.8 },
      { lat: 32.12, lon: 35.62 },
      { lat: 32.1, lon: 35.55 },
    ],
    note: 'A stream east of the Jordan, in a deep, rocky valley, where Jacob wrestled until dawn. Today it is called the Zarqa.',
  },
  { id: 'edom', name: 'Edom (Seir)', kind: 'region', at: { lat: 30.6, lon: 35.5 }, note: 'The mountains south of the Dead Sea, where Esau and his descendants lived. “Edom” means “red.”' },
  { id: 'bethlehem', name: 'Bethlehem (Ephrath)', kind: 'city', at: { lat: 31.7, lon: 35.2 }, note: 'Where Rachel was buried on the road south, and where, centuries later, Jesus was born.' },
  // Level 5 · Joseph and His Brothers
  { id: 'dothan', name: 'Dothan', kind: 'city', at: { lat: 32.42, lon: 35.24 }, note: 'A town on the trade road north of Shechem, where Joseph found his brothers and they sold him to traders bound for Egypt.' },
  { id: 'goshen', name: 'Goshen', kind: 'region', at: { lat: 30.6, lon: 31.9 }, note: 'Green land in the eastern Nile delta, good for flocks, where Jacob’s family settled in Egypt.' },
  // Level 6 · Job
  { id: 'uz', name: 'The land of Uz', kind: 'region', at: { lat: 30.4, lon: 36.4 }, note: 'Where Job lived. No one knows exactly where it was: the Book of Lamentations links Uz with Edom, south-east of the Dead Sea; others place it farther east, toward the desert.' },
  // Level 7 · Moses Is Called
  { id: 'midian', name: 'Midian', kind: 'region', at: { lat: 28.5, lon: 35.6 }, note: 'The land of the Midianites, east of the Gulf of Aqaba, where Moses fled from Pharaoh and kept Jethro’s flock for forty years.' },
  { id: 'horeb', name: 'Horeb, the mountain of God', kind: 'mountain', at: { lat: 28.54, lon: 33.97 }, note: 'Another name for Mount Sinai, where Moses saw the burning bush. Tradition places it at Jebel Musa, in the south of the Sinai peninsula.' },
  // Level 8 · The Plagues and the Passover
  { id: 'rameses', name: 'Rameses', kind: 'city', at: { lat: 30.8, lon: 31.83 }, note: 'One of the store-cities the Hebrew slaves built for Pharaoh, in the eastern Nile delta, where the Exodus began.' },
  { id: 'succoth', name: 'Succoth', kind: 'city', at: { lat: 30.55, lon: 32.1 }, note: 'The first camp of the Israelites on their way out of Egypt; the name means “booths.”' },
  // Level 9 · Through the Sea. The stations of the journey are traditional sites only: where
  // they were depends on where Mount Sinai was, which no one knows for certain.
  { id: 'red-sea', name: 'The Red Sea', kind: 'region', at: { lat: 29.95, lon: 32.55 }, note: 'Exodus calls it Yam Suph, “the Red Sea” or “the Sea of Reeds.” No one knows exactly where the people crossed: perhaps at the lakes north of the Gulf of Suez, perhaps at the gulf itself.' },
  { id: 'marah', name: 'Marah', kind: 'city', at: { lat: 29.33, lon: 32.88 }, note: '“Bitter.” Traditionally placed at the spring of Ain Hawarah, about fifty miles south of Suez, whose water is still bitter.' },
  { id: 'elim', name: 'Elim', kind: 'city', at: { lat: 29.24, lon: 32.97 }, note: 'An oasis with twelve springs and seventy palm trees, traditionally placed in Wadi Gharandel, a few miles south of Marah.' },
  { id: 'wilderness-of-sin', name: 'The wilderness of Sin', kind: 'region', at: { lat: 28.85, lon: 33.25 }, note: 'Between Elim and Sinai, where the manna first fell. Traditionally the coastal plain of el-Markha, in the west of the Sinai peninsula.' },
  { id: 'rephidim', name: 'Rephidim', kind: 'city', at: { lat: 28.72, lon: 33.63 }, note: 'Where Moses struck the rock and Israel fought Amalek. Often placed in Wadi Feiran, the largest oasis valley in Sinai.' },
  // Level 12 · Forty Years in the Wilderness
  { id: 'kadesh', name: 'Kadesh', kind: 'city', at: { lat: 30.69, lon: 34.49 }, note: 'An oasis on the southern edge of Canaan, perhaps Ain el-Qudeirat, where the people camped for many years. The twelve spies set out from here.' },
  { id: 'mount-hor', name: 'Mount Hor', kind: 'mountain', at: { lat: 30.32, lon: 35.41 }, note: 'On the border of Edom, where Aaron died. Traditionally Jebel Harun, “Aaron’s mountain,” near Petra.' },
  { id: 'plains-of-moab', name: 'The plains of Moab', kind: 'region', at: { lat: 31.85, lon: 35.6 }, note: 'The plain east of the Jordan, across from Jericho, where Israel camped at the end of the forty years.' },
  // Level 13 · Moses' Last Words
  // Level 14 · Joshua
  { id: 'jericho', name: 'Jericho', kind: 'city', at: { lat: 31.87, lon: 35.44 }, note: 'One of the oldest cities in the world, in an oasis west of the Jordan near the Dead Sea: “the city of palm trees.” Its walls fell at the sound of the trumpets.' },
  { id: 'gilgal', name: 'Gilgal', kind: 'city', at: { lat: 31.85, lon: 35.5 }, note: 'The first camp in the promised land, near Jericho, where the twelve stones from the Jordan were set up.' },
  { id: 'ai', name: 'Ai', kind: 'city', at: { lat: 31.92, lon: 35.26 }, note: 'A small town on a hill east of Bethel. Its name means “the ruin.”' },
  { id: 'gibeon', name: 'Gibeon', kind: 'city', at: { lat: 31.85, lon: 35.18 }, note: 'A town on a hill north of Jerusalem, whose people made peace with Joshua. There the sun stood still.' },
  { id: 'shiloh', name: 'Shiloh', kind: 'city', at: { lat: 32.06, lon: 35.29 }, note: 'A town in the hills of Ephraim where the tabernacle stood for many generations, until the time of Samuel.' },
  { id: 'nebo', name: 'Mount Nebo', kind: 'mountain', at: { lat: 31.77, lon: 35.73 }, note: 'The ridge in Moab, about 700 meters high, from whose top, Pisgah, God showed Moses the promised land. Moses died there.' },
  // Level 15 · The Judges
  { id: 'mount-tabor', name: 'Mount Tabor', kind: 'mountain', at: { lat: 32.69, lon: 35.39 }, note: 'A round mountain standing alone at the edge of the Jezreel Valley. Barak’s ten thousand came down from it against Sisera; Christians honor it as the mountain of the Transfiguration.' },
  { id: 'harod', name: 'The spring of Harod', kind: 'river', at: { lat: 32.55, lon: 35.36 }, note: 'A spring at the foot of Mount Gilboa, where God chose Gideon’s three hundred men by the way they drank. It still flows today.' },
  { id: 'mizpah-of-gilead', name: 'Mizpah of Gilead', kind: 'city', at: { lat: 32.3, lon: 35.8 }, note: 'Jephthah’s home in the hills east of the Jordan. Its name means “watchtower”; its exact place is not known.' },
  { id: 'zorah', name: 'Zorah', kind: 'city', at: { lat: 31.77, lon: 34.98 }, note: 'Samson’s home village, on a hill of the tribe of Dan looking down on the land of the Philistines.' },
  { id: 'gaza', name: 'Gaza', kind: 'city', at: { lat: 31.5, lon: 34.46 }, note: 'The southernmost city of the Philistines, by the sea. Samson died there, when the house of Dagon fell.' },
  // Level 17 · Samuel and Saul
  { id: 'ramah', name: 'Ramah', kind: 'city', at: { lat: 31.85, lon: 35.23 }, note: 'Samuel’s home town, in the hills of Benjamin north of Jerusalem, where the elders came to ask for a king.' },
  { id: 'mizpah', name: 'Mizpah', kind: 'city', at: { lat: 31.89, lon: 35.21 }, note: 'A town in Benjamin where Israel gathered to pray, where Samuel set up the stone Ebenezer nearby, and where Saul was chosen by lot.' },
  { id: 'ashdod', name: 'Ashdod', kind: 'city', at: { lat: 31.75, lon: 34.65 }, note: 'A Philistine city near the coast, where the ark was set in the house of Dagon, and Dagon fell before it.' },
  { id: 'beth-shemesh', name: 'Beth-shemesh', kind: 'city', at: { lat: 31.73, lon: 34.99 }, note: '“House of the sun,” a town of Israel on the edge of the hills, where the ark came home on a cart.' },
  // Level 18 · David, the Shepherd King
  { id: 'valley-of-elah', name: 'The valley of Elah', kind: 'region', at: { lat: 31.69, lon: 34.96 }, note: 'A wide valley between the hills of Judah and Philistine country, where David faced Goliath.' },
  { id: 'adullam', name: 'Adullam', kind: 'city', at: { lat: 31.65, lon: 34.98 }, note: 'A cave-riddled hill near the valley of Elah, where David hid from Saul and four hundred men gathered to him.' },
  { id: 'en-gedi', name: 'En-gedi', kind: 'city', at: { lat: 31.46, lon: 35.39 }, note: 'A spring and waterfall in the cliffs above the Dead Sea, where David spared Saul in a cave.' },
]

const BY_ID = new Map(PLACES.map((place) => [place.id, place]))

export function placeById(id: string): Place | undefined {
  return BY_ID.get(id)
}
