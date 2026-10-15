/**
 * The 73 books of the Catholic Bible, in the order of the RSV Catholic Edition, with
 * how many chapters each has. Codes are the standard three-letter book codes (USFM), so
 * a reference like "GEN 1:3" means Genesis, chapter 1, verse 3.
 */

export interface Book {
  code: string
  name: string
  testament: 'old' | 'new'
  chapters: number
}

const OLD: [code: string, name: string, chapters: number][] = [
  ['GEN', 'Genesis', 50],
  ['EXO', 'Exodus', 40],
  ['LEV', 'Leviticus', 27],
  ['NUM', 'Numbers', 36],
  ['DEU', 'Deuteronomy', 34],
  ['JOS', 'Joshua', 24],
  ['JDG', 'Judges', 21],
  ['RUT', 'Ruth', 4],
  ['1SA', '1 Samuel', 31],
  ['2SA', '2 Samuel', 24],
  ['1KI', '1 Kings', 22],
  ['2KI', '2 Kings', 25],
  ['1CH', '1 Chronicles', 29],
  ['2CH', '2 Chronicles', 36],
  ['EZR', 'Ezra', 10],
  ['NEH', 'Nehemiah', 13],
  ['TOB', 'Tobit', 14],
  ['JDT', 'Judith', 16],
  // Esther counts its Greek additions as chapters 11–16, as the Catholic Edition does.
  ['EST', 'Esther', 16],
  ['1MA', '1 Maccabees', 16],
  ['2MA', '2 Maccabees', 15],
  ['JOB', 'Job', 42],
  ['PSA', 'Psalms', 150],
  ['PRO', 'Proverbs', 31],
  ['ECC', 'Ecclesiastes', 12],
  ['SNG', 'Song of Solomon', 8],
  ['WIS', 'Wisdom', 19],
  ['SIR', 'Sirach', 51],
  ['ISA', 'Isaiah', 66],
  ['JER', 'Jeremiah', 52],
  ['LAM', 'Lamentations', 5],
  ['BAR', 'Baruch', 6],
  ['EZK', 'Ezekiel', 48],
  // Daniel includes Susanna (13) and Bel and the Dragon (14).
  ['DAN', 'Daniel', 14],
  ['HOS', 'Hosea', 14],
  ['JOL', 'Joel', 3],
  ['AMO', 'Amos', 9],
  ['OBA', 'Obadiah', 1],
  ['JON', 'Jonah', 4],
  ['MIC', 'Micah', 7],
  ['NAM', 'Nahum', 3],
  ['HAB', 'Habakkuk', 3],
  ['ZEP', 'Zephaniah', 3],
  ['HAG', 'Haggai', 2],
  ['ZEC', 'Zechariah', 14],
  ['MAL', 'Malachi', 4],
]

const NEW: [code: string, name: string, chapters: number][] = [
  ['MAT', 'Matthew', 28],
  ['MRK', 'Mark', 16],
  ['LUK', 'Luke', 24],
  ['JHN', 'John', 21],
  ['ACT', 'Acts', 28],
  ['ROM', 'Romans', 16],
  ['1CO', '1 Corinthians', 16],
  ['2CO', '2 Corinthians', 13],
  ['GAL', 'Galatians', 6],
  ['EPH', 'Ephesians', 6],
  ['PHP', 'Philippians', 4],
  ['COL', 'Colossians', 4],
  ['1TH', '1 Thessalonians', 5],
  ['2TH', '2 Thessalonians', 3],
  ['1TI', '1 Timothy', 6],
  ['2TI', '2 Timothy', 4],
  ['TIT', 'Titus', 3],
  ['PHM', 'Philemon', 1],
  ['HEB', 'Hebrews', 13],
  ['JAS', 'James', 5],
  ['1PE', '1 Peter', 5],
  ['2PE', '2 Peter', 3],
  ['1JN', '1 John', 5],
  ['2JN', '2 John', 1],
  ['3JN', '3 John', 1],
  ['JUD', 'Jude', 1],
  ['REV', 'Revelation', 22],
]

export const BOOKS: readonly Book[] = [
  ...OLD.map(([code, name, chapters]) => ({ code, name, testament: 'old' as const, chapters })),
  ...NEW.map(([code, name, chapters]) => ({ code, name, testament: 'new' as const, chapters })),
]

const BY_CODE = new Map(BOOKS.map((book) => [book.code, book]))

export function bookByCode(code: string): Book | undefined {
  return BY_CODE.get(code)
}

/** A parsed reference: a book, a chapter, and a verse or a range of verses. */
export interface Reference {
  book: Book
  chapter: number
  verse: number
  /** The last verse of a range, if it is one. */
  toVerse?: number
  /** A range that runs into a later chapter, like Genesis 1:1–2:3. */
  toChapter?: number
}

/**
 * Reads a reference written like "GEN 1:3", "JHN 1:1-3" or "GEN 1:1-2:3". Returns null
 * if it isn't a real place in the Bible (an unknown book, or a chapter it doesn't have).
 */
export function parseReference(text: string): Reference | null {
  const match = /^([1-3]?[A-Z]{2,3}) (\d+):(\d+)(?:-(?:(\d+):)?(\d+))?$/.exec(text)
  if (!match) return null
  const [, code, chapter, verse, toChapter, toVerse] = match
  const book = bookByCode(code!)
  if (!book) return null
  const ref: Reference = { book, chapter: Number(chapter), verse: Number(verse) }
  if (toVerse) ref.toVerse = Number(toVerse)
  if (toChapter) ref.toChapter = Number(toChapter)
  const lastChapter = ref.toChapter ?? ref.chapter
  if (ref.chapter < 1 || lastChapter > book.chapters || lastChapter < ref.chapter || ref.verse < 1) return null
  if (ref.toVerse !== undefined && !ref.toChapter && ref.toVerse < ref.verse) return null
  return ref
}

/** How a reference is shown to the player, like "Genesis 1:3" or "John 1:1–3". */
export function formatReference(text: string): string {
  const ref = parseReference(text)
  if (!ref) return text
  const start = `${ref.book.name} ${ref.chapter}:${ref.verse}`
  if (ref.toChapter) return `${start}–${ref.toChapter}:${ref.toVerse}`
  if (ref.toVerse) return `${start}–${ref.toVerse}`
  return start
}
