/**
 * Every verse the game quotes, in both translations (spec §12.1). Everything else the
 * game says is our own retelling; these are the exact words of Scripture.
 *
 * - `rsv` is the Revised Standard Version, Second Catholic Edition (RSV-2CE), the
 *   game's main translation while Ignatius Press's permission is pending (spec §12.2).
 *   The wording comes from the RSV Catholic Edition, which matches the RSV-2CE almost
 *   everywhere; entries marked `unconfirmed` may differ and are checked against a
 *   printed RSV-2CE.
 * - `dra` is the Douay-Rheims (1899 American edition), which is in the public domain,
 *   the fallback if permission isn't given.
 *
 * "LORD" in capitals stands for God's holy name, printed in small capitals in the RSV.
 */

export type TranslationId = 'rsv' | 'dra'

export const TRANSLATIONS: Record<TranslationId, { name: string; short: string }> = {
  rsv: { name: 'Revised Standard Version, Second Catholic Edition', short: 'RSV-2CE' },
  dra: { name: 'Douay-Rheims', short: 'DRA' },
}

/** The translation the game quotes. Switching it to 'dra' uses the Douay-Rheims everywhere. */
export const ACTIVE_TRANSLATION: TranslationId = 'rsv'

export interface Verse {
  rsv: string
  dra: string
  /** Only part of the verse (or range) is quoted. */
  partial?: boolean
  /** The RSV-2CE wording still needs checking against a printed copy. */
  unconfirmed?: boolean
}

export const VERSES: Record<string, Verse> = {
  // Genesis 1
  'GEN 1:1': {
    rsv: 'In the beginning God created the heavens and the earth.',
    dra: 'In the beginning God created heaven, and earth.',
  },
  'GEN 1:2': {
    rsv: 'The earth was without form and void, and darkness was upon the face of the deep; and the Spirit of God was moving over the face of the waters.',
    dra: 'And the earth was void and empty, and darkness was upon the face of the deep; and the spirit of God moved over the waters.',
  },
  'GEN 1:3': {
    rsv: 'And God said, “Let there be light”; and there was light.',
    dra: 'And God said: Be light made. And light was made.',
  },
  'GEN 1:26': {
    rsv: '“Let us make man in our image, after our likeness.”',
    dra: 'Let us make man to our image and likeness.',
    partial: true,
  },
  'GEN 1:27': {
    rsv: 'So God created man in his own image, in the image of God he created him; male and female he created them.',
    dra: 'And God created man to his own image: to the image of God he created him: male and female he created them.',
  },
  'GEN 1:31': {
    rsv: 'And God saw everything that he had made, and behold, it was very good.',
    dra: 'And God saw all the things that he had made, and they were very good.',
    partial: true,
  },

  // Genesis 2
  'GEN 2:7': {
    rsv: 'Then the LORD God formed man of dust from the ground, and breathed into his nostrils the breath of life; and man became a living being.',
    dra: 'And the Lord God formed man of the slime of the earth: and breathed into his face the breath of life, and man became a living soul.',
  },
  'GEN 2:8': {
    rsv: 'And the LORD God planted a garden in Eden, in the east; and there he put the man whom he had formed.',
    dra: 'And the Lord God had planted a paradise of pleasure from the beginning: wherein he placed man whom he had formed.',
  },
  'GEN 2:16-17': {
    rsv: 'And the LORD God commanded the man, saying, “You may freely eat of every tree of the garden; but of the tree of the knowledge of good and evil you shall not eat, for in the day that you eat of it you shall die.”',
    dra: 'And he commanded him, saying: Of every tree of paradise thou shalt eat: But of the tree of knowledge of good and evil, thou shalt not eat. For in what day soever thou shalt eat of it, thou shalt die the death.',
  },
  'GEN 2:18': {
    rsv: 'Then the LORD God said, “It is not good that the man should be alone; I will make him a helper fit for him.”',
    dra: 'And the Lord God said: It is not good for man to be alone: let us make him a help like unto himself.',
  },
  'GEN 2:20': {
    rsv: '…but for the man there was not found a helper fit for him.',
    dra: '…but for Adam there was not found a helper like himself.',
    partial: true,
  },
  'GEN 2:23': {
    rsv: 'Then the man said, “This at last is bone of my bones and flesh of my flesh; she shall be called Woman, because she was taken out of Man.”',
    dra: 'And Adam said: This now is bone of my bones, and flesh of my flesh; she shall be called woman, because she was taken out of man.',
  },
  'GEN 2:24': {
    rsv: 'Therefore a man leaves his father and his mother and cleaves to his wife, and they become one flesh.',
    dra: 'Wherefore a man shall leave father and mother, and shall cleave to his wife: and they shall be two in one flesh.',
  },

  // Genesis 3
  'GEN 3:1': {
    rsv: 'Now the serpent was more subtle than any other wild creature that the LORD God had made. He said to the woman, “Did God say, ‘You shall not eat of any tree of the garden’?”',
    dra: 'Now the serpent was more subtle than any of the beasts of the earth which the Lord God had made. And he said to the woman: Why hath God commanded you, that you should not eat of every tree of paradise?',
  },
  'GEN 3:2-3': {
    rsv: 'And the woman said to the serpent, “We may eat of the fruit of the trees of the garden; but God said, ‘You shall not eat of the fruit of the tree which is in the midst of the garden, neither shall you touch it, lest you die.’”',
    dra: 'And the woman answered him, saying: Of the fruit of the trees that are in paradise we do eat: But of the fruit of the tree which is in the midst of paradise, God hath commanded us that we should not eat; and that we should not touch it, lest perhaps we die.',
  },
  'GEN 3:4-5': {
    rsv: 'But the serpent said to the woman, “You will not die. For God knows that when you eat of it your eyes will be opened, and you will be like God, knowing good and evil.”',
    dra: 'And the serpent said to the woman: No, you shall not die the death. For God doth know that in what day soever you shall eat thereof, your eyes shall be opened: and you shall be as Gods, knowing good and evil.',
  },
  'GEN 3:6': {
    rsv: 'So when the woman saw that the tree was good for food, and that it was a delight to the eyes, and that the tree was to be desired to make one wise, she took of its fruit and ate; and she also gave some to her husband, and he ate.',
    dra: 'And the woman saw that the tree was good to eat, and fair to the eyes, and delightful to behold: and she took of the fruit thereof, and did eat, and gave to her husband who did eat.',
  },
  'GEN 3:9': {
    rsv: 'But the LORD God called to the man, and said to him, “Where are you?”',
    dra: 'And the Lord God called Adam, and said to him: Where art thou?',
  },
  'GEN 3:15': {
    rsv: 'I will put enmity between you and the woman, and between your seed and her seed; he shall bruise your head, and you shall bruise his heel.',
    dra: 'I will put enmities between thee and the woman, and thy seed and her seed: she shall crush thy head, and thou shalt lie in wait for her heel.',
  },
  'GEN 3:19': {
    rsv: '…you are dust, and to dust you shall return.',
    dra: '…for dust thou art, and into dust thou shalt return.',
    partial: true,
  },
  'GEN 3:20': {
    rsv: 'The man called his wife’s name Eve, because she was the mother of all living.',
    dra: 'And Adam called the name of his wife Eve: because she was the mother of all the living.',
  },
  'GEN 3:21': {
    rsv: 'And the LORD God made for Adam and for his wife garments of skins, and clothed them.',
    dra: 'And the Lord God made for Adam and his wife, garments of skins, and clothed them.',
  },
  'GEN 3:24': {
    rsv: 'He drove out the man; and at the east of the garden of Eden he placed the cherubim, and a flaming sword which turned every way, to guard the way to the tree of life.',
    dra: 'And he cast out Adam; and placed before the paradise of pleasure Cherubims, and a flaming sword, turning every way, to keep the way of the tree of life.',
  },

  // Genesis 4–5
  'GEN 4:1': {
    rsv: '“I have gotten a man with the help of the LORD.”',
    dra: 'I have gotten a man through God.',
    partial: true,
  },
  'GEN 4:4': {
    rsv: '…and Abel brought of the firstlings of his flock and of their fat portions.',
    dra: 'Abel also offered of the firstlings of his flock, and of their fat.',
    partial: true,
  },
  'GEN 4:7': {
    rsv: 'If you do well, will you not be accepted? And if you do not do well, sin is couching at the door; its desire is for you, but you must master it.',
    dra: 'If thou do well, shalt thou not receive? but if ill, shall not sin forthwith be present at the door? but the lust thereof shall be under thee, and thou shalt have dominion over it.',
  },
  'GEN 4:9': {
    rsv: 'Then the LORD said to Cain, “Where is Abel your brother?” He said, “I do not know; am I my brother’s keeper?”',
    dra: 'And the Lord said to Cain: Where is thy brother Abel? And he answered, I know not: am I my brother’s keeper?',
  },
  'GEN 4:10': {
    rsv: 'And the LORD said, “What have you done? The voice of your brother’s blood is crying to me from the ground.”',
    dra: 'And he said to him: What hast thou done? the voice of thy brother’s blood crieth to me from the earth.',
  },
  'GEN 4:16': {
    rsv: '…east of Eden.',
    dra: '…at the east side of Eden.',
    partial: true,
  },
  'GEN 4:25': {
    rsv: '“God has appointed for me another child instead of Abel, for Cain slew him.”',
    dra: 'God hath given me another seed, for Abel whom Cain slew.',
    partial: true,
  },
  'GEN 4:26': {
    rsv: 'At that time men began to call upon the name of the LORD.',
    dra: '…this man began to call upon the name of the Lord.',
    partial: true,
  },
  'GEN 5:24': {
    rsv: 'Enoch walked with God; and he was not, for God took him.',
    dra: 'And he walked with God, and was seen no more: because God took him.',
  },
  'GEN 5:29': {
    rsv: '…and called his name Noah, saying, “Out of the ground which the LORD has cursed this one shall bring us relief from our work and from the toil of our hands.”',
    dra: 'And he called his name Noe, saying: This same shall comfort us from the works and labours of our hands on the earth, which the Lord hath cursed.',
  },

  // The New Testament
  'MAT 18:22': {
    rsv: '“I do not say to you seven times, but seventy times seven.”',
    dra: 'I say not to thee, till seven times; but till seventy times seven times.',
    partial: true,
  },
  'LUK 3:38': {
    rsv: '…the son of Enos, the son of Seth, the son of Adam, the son of God.',
    dra: 'Who was of Henos, who was of Seth, who was of Adam, who was of God.',
  },
  'LUK 22:42': {
    rsv: '“Father, if thou art willing, remove this cup from me; nevertheless not my will, but thine, be done.”',
    dra: 'Father, if thou wilt, remove this chalice from me: but yet not my will, but thine be done.',
    unconfirmed: true,
  },
  'JHN 1:1-3': {
    rsv: 'In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God; all things were made through him, and without him was not anything made that was made.',
    dra: 'In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God. All things were made by him: and without him was made nothing that was made.',
  },
  'JHN 18:1': {
    rsv: '…across the Kidron valley, where there was a garden…',
    dra: '…over the brook Cedron, where there was a garden…',
    partial: true,
  },
  'JHN 19:26': {
    rsv: 'When Jesus saw his mother, and the disciple whom he loved standing near, he said to his mother, “Woman, behold, your son!”',
    dra: 'When Jesus therefore had seen his mother and the disciple standing whom he loved, he saith to his mother: Woman, behold thy son.',
  },
  'ROM 5:19': {
    rsv: 'For as by one man’s disobedience many were made sinners, so by one man’s obedience many will be made righteous.',
    dra: 'For as by the disobedience of one man, many were made sinners; so also by the obedience of one, many shall be made just.',
  },
  'EPH 5:31-32': {
    rsv: '“For this reason a man shall leave his father and mother and be joined to his wife, and the two shall become one flesh.” This is a great mystery, and I mean in reference to Christ and the church.',
    dra: 'For this cause shall a man leave his father and mother, and shall cleave to his wife, and they shall be two in one flesh. This is a great sacrament; but I speak in Christ and in the church.',
    unconfirmed: true,
  },
  'HEB 11:4': {
    rsv: 'By faith Abel offered to God a more acceptable sacrifice than Cain…',
    dra: 'By faith Abel offered to God a sacrifice exceeding that of Cain…',
    partial: true,
  },
  'HEB 11:5': {
    rsv: 'By faith Enoch was taken up so that he should not see death…',
    dra: 'By faith Henoch was translated, that he should not see death…',
    partial: true,
  },
  'HEB 12:24': {
    rsv: '…and to Jesus, the mediator of a new covenant, and to the sprinkled blood that speaks more graciously than the blood of Abel.',
    dra: 'And to Jesus the mediator of the new testament, and to the sprinkling of blood which speaketh better than that of Abel.',
  },
  'REV 12:1': {
    rsv: 'And a great portent appeared in heaven, a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars…',
    dra: 'And a great sign appeared in heaven: A woman clothed with the sun, and the moon under her feet, and on her head a crown of twelve stars.',
    unconfirmed: true,
  },
  'REV 12:9': {
    rsv: '…that ancient serpent, who is called the Devil and Satan…',
    dra: '…that old serpent, who is called the devil and Satan…',
    partial: true,
  },
}

/** A verse's words in the active translation. Throws for a verse that isn't in the list (a content check catches these first). */
export function verseText(ref: string, translation: TranslationId = ACTIVE_TRANSLATION): string {
  const verse = VERSES[ref]
  if (!verse) throw new Error(`No text for ${ref}`)
  return verse[translation]
}
