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

  // Level 2 · Noah and the Nations: Genesis 6–12, and the passages its golden threads quote.
  // Downloaded from Bible Gateway (RSVCE and DRA) and extracted by script, not retyped.
  'GEN 6:5': {
    rsv: 'The LORD saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually.',
    dra: 'And God seeing that the wickedness of men was great on the earth, and that all the thought of their heart was bent upon evil at all times,',
  },
  'GEN 6:6': {
    rsv: 'And the LORD was sorry that he had made man on the earth, and it grieved him to his heart.',
    dra: 'It repented him that he had made man on the earth. And being touched inwardly with sorrow of heart,',
  },
  'GEN 6:8': {
    rsv: 'But Noah found favor in the eyes of the LORD.',
    dra: 'But Noe found grace before the Lord.',
  },
  'GEN 6:9': {
    rsv: 'These are the generations of Noah. Noah was a righteous man, blameless in his generation; Noah walked with God.',
    dra: 'These are the generations of Noe: Noe was a just and perfect man in his generations, he walked with God.',
  },
  'GEN 6:10': {
    rsv: 'And Noah had three sons, Shem, Ham, and Japheth.',
    dra: 'And he begot three sons, Sem, Cham, and Japheth.',
  },
  'GEN 6:11': {
    rsv: 'Now the earth was corrupt in God’s sight, and the earth was filled with violence.',
    dra: 'And the earth was corrupted before God, and was filled with iniquity.',
  },
  'GEN 6:13': {
    rsv: '…I have determined to make an end of all flesh; for the earth is filled with violence through them…',
    dra: '…The end of all flesh is come before me, the earth is filled with iniquity through them…',
    partial: true,
  },
  'GEN 6:14': {
    rsv: 'Make yourself an ark of gopher wood…',
    dra: 'Make thee an ark of timber planks…',
    partial: true,
  },
  'LUK 1:30': {
    rsv: '…Do not be afraid, Mary, for you have found favor with God.',
    dra: '…Fear not, Mary, for thou hast found grace with God.',
    partial: true,
    unconfirmed: true,
  },
  'GEN 6:15': {
    rsv: 'This is how you are to make it: the length of the ark three hundred cubits, its breadth fifty cubits, and its height thirty cubits.',
    dra: 'And thus shalt thou make it: The length of the ark shall be three hundred cubits: the breadth of it fifty cubits, and the height of it thirty cubits.',
  },
  'GEN 6:17': {
    rsv: 'For behold, I will bring a flood of waters upon the earth…',
    dra: 'Behold I will bring the waters of a great flood upon the earth…',
    partial: true,
  },
  'GEN 6:18': {
    rsv: 'But I will establish my covenant with you; and you shall come into the ark, you, your sons, your wife, and your sons’ wives with you.',
    dra: 'And I will establish my covenant with thee, and thou shalt enter into the ark, thou and thy sons, and thy wife, and the wives of thy sons with thee.',
  },
  'GEN 6:22': {
    rsv: 'Noah did this; he did all that God commanded him.',
    dra: 'And Noe did all things which God commanded him.',
  },
  'HEB 11:7': {
    rsv: 'By faith Noah, being warned by God concerning events as yet unseen, took heed and constructed an ark for the saving of his household…',
    dra: 'By faith Noe, having received an answer concerning those things which as yet were not seen, moved with fear, framed the ark for the saving of his house…',
    partial: true,
  },
  'GEN 6:19': {
    rsv: 'And of every living thing of all flesh, you shall bring two of every sort into the ark, to keep them alive with you; they shall be male and female.',
    dra: 'And of every living creature of all flesh, thou shalt bring two of a sort into the ark, that they may live with thee: of the male sex, and the female.',
  },
  'GEN 7:5': {
    rsv: 'And Noah did all that the LORD had commanded him.',
    dra: 'And Noe did all things which the Lord had commanded him.',
  },
  '1PE 3:20': {
    rsv: '…during the building of the ark, in which a few, that is, eight persons, were saved through water.',
    dra: '…when the ark was a building: wherein a few, that is, eight souls, were saved by water.',
    partial: true,
  },
  'GEN 7:9': {
    rsv: 'two and two, male and female, went into the ark with Noah, as God had commanded Noah.',
    dra: 'Two and two went in to Noe into the ark, male and female, as the Lord had commanded Noe.',
  },
  'GEN 7:16': {
    rsv: '…and the LORD shut him in.',
    dra: '…and the Lord shut him in on the outside.',
    partial: true,
  },
  'GEN 7:11': {
    rsv: 'In the six hundredth year of Noah’s life, in the second month, on the seventeenth day of the month, on that day all the fountains of the great deep burst forth, and the windows of the heavens were opened.',
    dra: 'In the six hundredth year of the life of Noe, in the second month, in the seventeenth day of the month, all the fountains of the great deep were broken up, and the flood gates of heaven were opened:',
  },
  'GEN 7:12': {
    rsv: 'And rain fell upon the earth forty days and forty nights.',
    dra: 'And the rain fell upon the earth forty days and forty nights.',
  },
  'GEN 7:17': {
    rsv: 'The flood continued forty days upon the earth; and the waters increased, and bore up the ark, and it rose high above the earth.',
    dra: 'And the flood was forty days upon the earth, and the waters increased, and lifted up the ark on high from the earth.',
  },
  'GEN 7:18': {
    rsv: 'The waters prevailed and increased greatly upon the earth; and the ark floated on the face of the waters.',
    dra: 'For they overflowed exceedingly: and filled all on the face of the earth: and the ark was carried upon the waters.',
  },
  'GEN 7:23': {
    rsv: '…Only Noah was left, and those that were with him in the ark.',
    dra: '…and Noe only remained, and they that were with him in the ark.',
    partial: true,
  },
  'GEN 7:24': {
    rsv: 'And the waters prevailed upon the earth a hundred and fifty days.',
    dra: 'And the waters prevailed upon the earth a hundred and fifty days.',
  },
  '1PE 3:21': {
    rsv: 'Baptism, which corresponds to this, now saves you…',
    dra: 'Whereunto baptism being of the like form, now saveth you also…',
    partial: true,
  },
  'GEN 8:1': {
    rsv: 'But God remembered Noah and all the beasts and all the cattle that were with him in the ark. And God made a wind blow over the earth, and the waters subsided;',
    dra: 'And God remembered Noe, and all the living creatures, and all the cattle which were with him in the ark, and brought a wind upon the earth, and the waters were abated.',
  },
  'GEN 8:4': {
    rsv: 'and in the seventh month, on the seventeenth day of the month, the ark came to rest upon the mountains of Ararat.',
    dra: 'And the ark rested in the seventh month, the seven and twentieth day of the month, upon the mountains of Armenia.',
  },
  'GEN 8:8': {
    rsv: 'Then he sent forth a dove from him, to see if the waters had subsided from the face of the ground;',
    dra: 'He sent forth also a dove after him, to see if the waters had now ceased upon the face of the earth.',
  },
  'GEN 8:9': {
    rsv: 'but the dove found no place to set her foot, and she returned to him to the ark…',
    dra: 'But she, not finding where her foot might rest, returned to him into the ark…',
    partial: true,
  },
  'GEN 8:11': {
    rsv: 'and the dove came back to him in the evening, and lo, in her mouth a freshly plucked olive leaf; so Noah knew that the waters had subsided from the earth.',
    dra: 'And she came to him in the evening, carrying a bough of an olive tree, with green leaves, in her mouth. Noe therefore understood that the waters were ceased upon the earth.',
  },
  'GEN 8:16': {
    rsv: '“Go forth from the ark, you and your wife, and your sons and your sons’ wives with you.',
    dra: 'Go out of the ark, thou and thy wife, thy sons, and the wives of thy sons with thee.',
  },
  'GEN 8:19': {
    rsv: 'And every beast, every creeping thing, and every bird, everything that moves upon the earth, went forth by families out of the ark.',
    dra: 'And all living things, and cattle, and creeping things that creep upon the earth, according to their kinds, went out of the ark.',
  },
  'MAT 3:16': {
    rsv: 'And when Jesus was baptized, he went up immediately from the water, and behold, the heavens were opened and he saw the Spirit of God descending like a dove, and alighting on him;',
    dra: 'And Jesus being baptized, forthwith came out of the water: and lo, the heavens were opened to him: and he saw the Spirit of God descending as a dove, and coming upon him.',
  },
  'GEN 8:20': {
    rsv: 'Then Noah built an altar to the LORD, and took of every clean animal and of every clean bird, and offered burnt offerings on the altar.',
    dra: 'And Noe built an altar unto the Lord: and taking of all cattle and fowls that were clean, offered holocausts upon the altar.',
  },
  'GEN 8:22': {
    rsv: 'While the earth remains, seedtime and harvest, cold and heat, summer and winter, day and night, shall not cease.”',
    dra: 'All the days of the earth, seedtime and harvest, cold and heat, summer and winter, night and day, shall not cease.',
  },
  'GEN 9:1': {
    rsv: 'And God blessed Noah and his sons, and said to them, “Be fruitful and multiply, and fill the earth.',
    dra: 'And God blessed Noe and his sons. And he said to them: Increase and multiply, and fill the earth.',
  },
  'GEN 9:6': {
    rsv: 'Whoever sheds the blood of man, by man shall his blood be shed; for God made man in his own image.',
    dra: 'Whosoever shall shed man\'s blood, his blood shall be shed: for man was made to the image of God.',
  },
  'GEN 9:11': {
    rsv: 'I establish my covenant with you, that never again shall all flesh be cut off by the waters of a flood, and never again shall there be a flood to destroy the earth.”',
    dra: 'I will establish my covenant with you, and all flesh shall be no more destroyed with the waters of a flood, neither shall there be from henceforth a flood to waste the earth.',
  },
  'GEN 9:13': {
    rsv: 'I set my bow in the cloud, and it shall be a sign of the covenant between me and the earth.',
    dra: 'I will set my bow in the clouds, and it shall be the sign of a covenant between me, and between the earth.',
  },
  'GEN 9:15': {
    rsv: 'I will remember my covenant which is between me and you and every living creature of all flesh; and the waters shall never again become a flood to destroy all flesh.',
    dra: 'And I will remember my covenant with you, and with every living soul that beareth flesh: and there shall no more be waters of a flood to destroy all flesh.',
  },
  'GEN 9:29': {
    rsv: 'All the days of Noah were nine hundred and fifty years; and he died.',
    dra: 'And all his days were in the whole nine hundred and fifty years: and he died.',
  },
  'LUK 22:20': {
    rsv: '…This cup which is poured out for you is the new covenant in my blood.',
    dra: '…This is the chalice, the new testament in my blood, which shall be shed for you.',
    partial: true,
    unconfirmed: true,
  },
  'GEN 10:32': {
    rsv: 'These are the families of the sons of Noah, according to their genealogies, in their nations; and from these the nations spread abroad on the earth after the flood.',
    dra: 'These are the families of Noe, according to their peoples and nations. By these were the nations divided on the earth after the flood.',
  },
  'GEN 11:1': {
    rsv: 'Now the whole earth had one language and few words.',
    dra: 'And the earth was of one tongue, and of the same speech.',
  },
  'GEN 11:2': {
    rsv: 'And as men migrated from the east, they found a plain in the land of Shinar and settled there.',
    dra: 'And when they removed from the east, they found a plain in the land of Sennaar, and dwelt in it.',
  },
  'GEN 11:4': {
    rsv: 'Then they said, “Come, let us build ourselves a city, and a tower with its top in the heavens, and let us make a name for ourselves, lest we be scattered abroad upon the face of the whole earth.”',
    dra: 'And they said: Come, let us make a city and a tower, the top whereof may reach to heaven: and let us make our name famous before we be scattered abroad into all lands.',
  },
  'GEN 11:5': {
    rsv: 'And the LORD came down to see the city and the tower, which the sons of men had built.',
    dra: 'And the Lord came down to see the city and the tower, which the children of Adam were building.',
  },
  'GEN 11:7': {
    rsv: 'Come, let us go down, and there confuse their language, that they may not understand one another’s speech.”',
    dra: 'Come ye, therefore, let us go down, and there confound their tongue, that they may not understand one another\'s speech.',
  },
  'GEN 11:8': {
    rsv: 'So the LORD scattered them abroad from there over the face of all the earth, and they left off building the city.',
    dra: 'And so the Lord scattered them from that place into all lands, and they ceased to build the city.',
  },
  'GEN 11:9': {
    rsv: 'Therefore its name was called Babel, because there the LORD confused the language of all the earth…',
    dra: 'And therefore the name thereof was called Babel, because there the language of the whole earth was confounded…',
    partial: true,
  },
  'ACT 2:6': {
    rsv: 'And at this sound the multitude came together, and they were bewildered, because each one heard them speaking in his own language.',
    dra: 'And when this was noised abroad, the multitude came together, and were confounded in mind, because that every man heard them speak in his own tongue.',
  },
  'GEN 11:10': {
    rsv: 'These are the descendants of Shem.…',
    dra: 'These are the generations of Sem…',
    partial: true,
  },
  'GEN 11:26': {
    rsv: 'When Terah had lived seventy years, he became the father of Abram, Nahor, and Haran.',
    dra: 'And Thare lived seventy years, and begot Abram, and Nachor, and Aran.',
  },
  'GEN 11:30': {
    rsv: 'Now Sarai was barren; she had no child.',
    dra: 'And Sarai was barren, and had no children.',
  },
  'GEN 11:31': {
    rsv: 'Terah took Abram his son and Lot the son of Haran, his grandson, and Sarai his daughter-in-law, his son Abram’s wife, and they went forth together from Ur of the Chaldeans to go into the land of Canaan; but when they came to Haran, they settled there.',
    dra: 'And Thare took Abram, his son, and Lot the son of Aran, his son\'s son, and Sarai his daughter in law, the wife of Abram his son, and brought them out of Ur of the Chaldees, to go into the land of Chanaan: and they came as far as Haran, and dwelt there.',
  },
  'GEN 11:32': {
    rsv: 'The days of Terah were two hundred and five years; and Terah died in Haran.',
    dra: 'And the days of Thare were two hundred and five years, and he died in Haran.',
  },
  'GEN 12:1': {
    rsv: 'Now the LORD said to Abram, “Go from your country and your kindred and your father’s house to the land that I will show you.',
    dra: 'And the Lord said to Abram: Go forth out of thy country, and from thy kindred, and out of thy father\'s house, and come into the land which I shall shew thee.',
  },
  'GAL 3:8': {
    rsv: 'And the scripture, foreseeing that God would justify the Gentiles by faith, preached the gospel beforehand to Abraham, saying, “In you shall all the nations be blessed.”',
    dra: 'And the scripture, foreseeing, that God justifieth the Gentiles by faith, told unto Abraham before: In thee shall all nations be blessed.',
  },
  // Level 3 · Abraham, Father of Faith
  'GEN 12:2': {
    rsv: 'And I will make of you a great nation, and I will bless you, and make your name great, so that you will be a blessing.',
    dra: 'And I will make of thee a great nation, and I will bless thee, and magnify thy name, and thou shalt be blessed.',
  },
  'GEN 12:3': {
    rsv: 'I will bless those who bless you, and him who curses you I will curse; and by you all the families of the earth shall bless themselves.”',
    dra: 'I will bless them that bless thee, and curse them that curse thee, and IN THEE shall all the kindred of the earth be blessed:',
  },
  'GEN 12:4': {
    rsv: 'So Abram went, as the LORD had told him; and Lot went with him. Abram was seventy-five years old when he departed from Haran.',
    dra: 'So Abram went out as the Lord had commanded him, and Lot went with him: Abram was seventy-five years old when he went forth from Haran.',
  },
  'GEN 12:7': {
    rsv: 'Then the LORD appeared to Abram, and said, “To your descendants I will give this land.” So he built there an altar to the LORD, who had appeared to him.',
    dra: 'And the Lord appeared to Abram, and said to him: To thy seed will I give this land. And he built there an altar to the Lord, who had appeared to him.',
  },
  'GEN 12:8': {
    rsv: 'Thence he removed to the mountain on the east of Bethel, and pitched his tent, with Bethel on the west and Ai on the east; and there he built an altar to the LORD and called on the name of the LORD.',
    dra: 'And passing on from thence to a mountain, that was on the east side of Bethel, he there pitched his tent, having Bethel on the west, and Hai on the east; he built there also an altar to the Lord, and called upon his name.',
  },
  'MAT 4:19': {
    rsv: 'And he said to them, “Follow me, and I will make you fishers of men.”',
    dra: 'And he saith to them: Come ye after me, and I will make you to be fishers of men.',
  },
  'GEN 12:10': {
    rsv: 'Now there was a famine in the land. So Abram went down to Egypt to sojourn there, for the famine was severe in the land.',
    dra: 'And there came a famine in the country; and Abram went down into Egypt, to sojourn there: for the famine was very grievous in the land.',
  },
  'GEN 13:6': {
    rsv: 'so that the land could not support both of them dwelling together; for their possessions were so great that they could not dwell together,',
    dra: 'Neither was the land able to bear them, that they might dwell together: for their substance was great, and they could not dwell together.',
  },
  'GEN 13:8': {
    rsv: 'Then Abram said to Lot, “Let there be no strife between you and me, and between your herdsmen and my herdsmen; for we are kinsmen.',
    dra: 'Abram therefore said to Lot: Let there be no quarrel, I beseech thee, between me and thee, and between my herdsmen and thy herdsmen: for we are brethren.',
  },
  'GEN 13:10': {
    rsv: 'And Lot lifted up his eyes, and saw that the Jordan valley was well watered everywhere like the garden of the LORD, like the land of Egypt, in the direction of Zoar; this was before the LORD destroyed Sodom and Gomorrah.',
    dra: 'And Lot, lifting up his eyes, saw all the country about the Jordan, which was watered throughout, before the Lord destroyed Sodom and Gomorrha, as the paradise of the Lord, and like Egypt as one comes to Segor.',
  },
  'GEN 13:13': {
    rsv: 'Now the men of Sodom were wicked, great sinners against the LORD.',
    dra: 'And the men of Sodom were very wicked, and sinners before the face of the Lord, beyond measure.',
  },
  'GEN 13:14': {
    rsv: 'The LORD said to Abram, after Lot had separated from him, “Lift up your eyes, and look from the place where you are, northward and southward and eastward and westward;',
    dra: 'And the Lord said to Abram, after Lot was separated from him: Lift up thy eyes, and look from the place wherein thou now art, to the north and to the south, to the east and to the west.',
  },
  'GEN 13:15': {
    rsv: 'for all the land which you see I will give to you and to your descendants for ever.',
    dra: 'All the land which thou seest, I will give to thee, and to thy seed for ever.',
  },
  'GEN 13:18': {
    rsv: 'So Abram moved his tent, and came and dwelt by the oaks of Mamre, which are at Hebron; and there he built an altar to the LORD.',
    dra: 'So Abram removing his tent came and dwelt by the vale of Mambre, which is in Hebron: and he built there an altar to the Lord.',
  },
  'MAT 6:33': {
    rsv: 'But seek first his kingdom and his righteousness, and all these things shall be yours as well.',
    dra: 'Seek ye therefore first the kingdom of God, and his justice, and all these things shall be added unto you.',
  },
  'GEN 14:12': {
    rsv: 'they also took Lot, the son of Abram’s brother, who dwelt in Sodom, and his goods, and departed.',
    dra: 'And Lot also, the son of Abram\'s brother, who dwelt in Sodom, and his substance.',
  },
  'GEN 14:14': {
    rsv: 'When Abram heard that his kinsman had been taken captive, he led forth his trained men, born in his house, three hundred and eighteen of them, and went in pursuit as far as Dan.',
    dra: 'Which when Abram had heard, to wit, that his brother Lot was taken, he numbered of the servants born in his house, three hundred and eighteen well appointed: and pursued them to Dan.',
  },
  'GEN 14:16': {
    rsv: 'Then he brought back all the goods, and also brought back his kinsman Lot with his goods, and the women and the people.',
    dra: 'And he brought back all the substance, and Lot his brother, with his substance, the women also and the people.',
  },
  'GEN 14:18': {
    rsv: 'And Melchizedek king of Salem brought out bread and wine; he was priest of God Most High.',
    dra: 'But Melchisedech the king of Salem, bringing forth bread and wine, for he was the priest of the most high God,',
  },
  'GEN 14:19': {
    rsv: 'And he blessed him and said, “Blessed be Abram by God Most High, maker of heaven and earth;',
    dra: 'Blessed him, and said: Blessed be Abram by the most high God, who created heaven and earth.',
  },
  'GEN 14:20': {
    rsv: 'and blessed be God Most High, who has delivered your enemies into your hand!” And Abram gave him a tenth of everything.',
    dra: 'And blessed be the most high God, by whose protection the enemies are in thy hands. And he gave him the tithes of all.',
  },
  'GEN 14:23': {
    rsv: 'that I would not take a thread or a sandal-thong or anything that is yours, lest you should say, ‘I have made Abram rich.’',
    dra: 'That from the very woof thread unto the shoe latchet, I will not take of any things that are thine, lest thou say I have enriched Abram:',
  },
  'PSA 110:4': {
    rsv: 'The LORD has sworn and will not change his mind, “You are a priest for ever after the order of Melchizedek.”',
    dra: 'The Lord hath sworn, and he will not repent: Thou art a priest for ever according to the order of Melchisedech.',
  },
  'GEN 15:1': {
    rsv: 'After these things the word of the LORD came to Abram in a vision, “Fear not, Abram, I am your shield; your reward shall be very great.”',
    dra: 'Now when these things were done, the word of the Lord came to Abram by a vision, saying: Fear not, Abram, I am thy protector, and thy reward exceeding great.',
  },
  'GEN 15:3': {
    rsv: 'And Abram said, “Behold, thou hast given me no offspring; and a slave born in my house will be my heir.”',
    dra: 'And Abram added: But to me thou hast not given seed: and lo my servant, born in my house, shall be my heir.',
  },
  'GEN 15:5': {
    rsv: 'And he brought him outside and said, “Look toward heaven, and number the stars, if you are able to number them.” Then he said to him, “So shall your descendants be.”',
    dra: 'And he brought him forth abroad, and said to him: Look up to heaven and number the stars, if thou canst. And he said to him: So shall thy seed be.',
  },
  'GEN 15:6': {
    rsv: 'And he believed the LORD; and he reckoned it to him as righteousness.',
    dra: 'Abram believed God, and it was reputed to him unto justice.',
  },
  'GEN 15:17': {
    rsv: 'When the sun had gone down and it was dark, behold, a smoking fire pot and a flaming torch passed between these pieces.',
    dra: 'And when the sun was set, there arose a dark mist, and there appeared a smoking furnace and a lamp of fire passing between those divisions.',
  },
  'GEN 15:18': {
    rsv: 'On that day the LORD made a covenant with Abram, saying, “To your descendants I give this land, from the river of Egypt to the great river, the river Euphrates,',
    dra: 'That day God made a covenant with Abram, saying: To thy seed will I give this land, from the river of Egypt even to the great river Euphrates.',
  },
  'GAL 3:29': {
    rsv: 'And if you are Christ’s, then you are Abraham’s offspring, heirs according to promise.',
    dra: 'And if you be Christ\'s, then are you the seed of Abraham, heirs according to the promise.',
  },
  'GEN 16:2': {
    rsv: 'and Sarai said to Abram, “Behold now, the LORD has prevented me from bearing children; go in to my maid; it may be that I shall obtain children by her.” And Abram hearkened to the voice of Sarai.',
    dra: 'She said to her husband: Behold, the Lord hath restrained me from bearing: go in unto my handmaid, it may be I may have children of her at least. And when he agreed to her request,',
  },
  'GEN 16:7': {
    rsv: 'The angel of the LORD found her by a spring of water in the wilderness, the spring on the way to Shur.',
    dra: 'And the angel of the Lord having found her, by a fountain of water in the wilderness, which is in the way to Sur in the desert,',
  },
  'GEN 16:11': {
    rsv: 'And the angel of the LORD said to her, “Behold, you are with child, and shall bear a son; you shall call his name Ishmael; because the LORD has given heed to your affliction.',
    dra: 'And again: Behold, said he, thou art with child, and thou shalt bring forth a son: and thou shalt call his name Ismael, because the Lord hath heard thy affliction.',
  },
  'GEN 16:13': {
    rsv: 'So she called the name of the LORD who spoke to her, “Thou art a God of seeing”; for she said, “Have I really seen God and remained alive after seeing him?”',
    dra: 'And she called the name of the Lord that spoke unto her: Thou the God who hast seen me. For she said: Verily here have I seen the hinder parts of him that seeth me.',
  },
  'GEN 21:14': {
    rsv: 'So Abraham rose early in the morning, and took bread and a skin of water, and gave it to Hagar, putting it on her shoulder, along with the child, and sent her away. And she departed, and wandered in the wilderness of Beer-sheba.',
    dra: 'So Abraham rose up in the morning, and taking bread and a bottle of water, put it upon her shoulder, and delivered the boy, and sent her away. And she departed, and wandered in the wilderness of Bersabee.',
  },
  'GEN 21:17': {
    rsv: 'And God heard the voice of the lad; and the angel of God called to Hagar from heaven, and said to her, “What troubles you, Hagar? Fear not; for God has heard the voice of the lad where he is.',
    dra: 'And God heard the voice of the boy: and an angel of God called to Agar from heaven, saying: What art thou doing, Agar? fear not: for God hath heard the voice of the boy, from the place wherein he is.',
  },
  'GEN 21:19': {
    rsv: 'Then God opened her eyes, and she saw a well of water; and she went, and filled the skin with water, and gave the lad a drink.',
    dra: 'And God opened her eyes: and she saw a well of water, and went and filled the bottle, and gave the boy to drink.',
  },
  'GEN 21:20': {
    rsv: 'And God was with the lad, and he grew up; he lived in the wilderness, and became an expert with the bow.',
    dra: 'And God was with him: and he grew, and dwelt in the wilderness, and became a young man, an archer.',
  },
  'JHN 4:14': {
    rsv: 'but whoever drinks of the water that I shall give him will never thirst; the water that I shall give him will become in him a spring of water welling up to eternal life.”',
    dra: 'But the water that I will give him, shall become in him a fountain of water, springing up into life everlasting.',
  },
  'GEN 17:1': {
    rsv: 'When Abram was ninety-nine years old the LORD appeared to Abram, and said to him, “I am God Almighty; walk before me, and be blameless.',
    dra: 'And after he began to be ninety and nine years old, the Lord appeared to him: and said unto him: I am the Almighty God: walk before me, and be perfect.',
  },
  'GEN 17:7': {
    rsv: 'And I will establish my covenant between me and you and your descendants after you throughout their generations for an everlasting covenant, to be God to you and to your descendants after you.',
    dra: 'And I will establish my covenant between me and thee, and between thy seed after thee in their generations, by a perpetual covenant: to be a God to thee, and to thy seed after thee.',
  },
  'GEN 17:5': {
    rsv: 'No longer shall your name be Abram, but your name shall be Abraham; for I have made you the father of a multitude of nations.',
    dra: 'Neither shall thy name be called any more Abram: but thou shalt be called Abraham: because I have made thee a father of many nations.',
  },
  'GEN 17:15': {
    rsv: 'And God said to Abraham, “As for Sarai your wife, you shall not call her name Sarai, but Sarah shall be her name.',
    dra: 'God said also to Abraham: Sarai thy wife thou shalt not call Sarai, but Sara.',
  },
  'GEN 17:10': {
    rsv: 'This is my covenant, which you shall keep, between me and you and your descendants after you: Every male among you shall be circumcised.',
    dra: 'This is my covenant which you shall observe, between me and you, and thy seed after thee: All the male kind of you shall be circumcised:',
  },
  'GEN 17:17': {
    rsv: 'Then Abraham fell on his face and laughed, and said to himself, “Shall a child be born to a man who is a hundred years old? Shall Sarah, who is ninety years old, bear a child?”',
    dra: 'Abraham fell upon his face, and laughed, saying in his heart: Shall a son, thinkest thou, be born to him that is a hundred years old? and shall Sara that is ninety years old bring forth?',
  },
  'GEN 17:21': {
    rsv: 'But I will establish my covenant with Isaac, whom Sarah shall bear to you at this season next year.”',
    dra: 'But my covenant I will establish with Isaac, whom Sara shall bring forth to thee at this time in the next year.',
  },
  'MAT 16:18': {
    rsv: 'And I tell you, you are Peter, and on this rock I will build my church, and the powers of death shall not prevail against it.',
    dra: 'And I say to thee: That thou art Peter; and upon this rock I will build my church, and the gates of hell shall not prevail against it.',
  },
  'GEN 18:1': {
    rsv: 'And the LORD appeared to him by the oaks of Mamre, as he sat at the door of his tent in the heat of the day.',
    dra: 'And the Lord appeared to him in the vale of Mambre as he was sitting at the door of his tent, in the very heat of the day.',
  },
  'GEN 18:2': {
    rsv: 'He lifted up his eyes and looked, and behold, three men stood in front of him. When he saw them, he ran from the tent door to meet them, and bowed himself to the earth,',
    dra: 'And when he had lifted up his eyes, there appeared to him three men standing near him: and as soon as he saw them he ran to meet them from the door of his tent, and adored down to the ground.',
  },
  'GEN 18:6': {
    rsv: 'And Abraham hastened into the tent to Sarah, and said, “Make ready quickly three measures of fine meal, knead it, and make cakes.”',
    dra: 'Abraham made haste into the tent to Sara, and said to her: Make haste, temper together three measures of flour, and make cakes upon the hearth.',
  },
  'GEN 18:8': {
    rsv: 'Then he took curds, and milk, and the calf which he had prepared, and set it before them; and he stood by them under the tree while they ate.',
    dra: 'He took also butter and milk, and the calf which he had boiled, and set before them: but he stood by them under the tree.',
  },
  'GEN 18:10': {
    rsv: 'The LORD said, “I will surely return to you in the spring, and Sarah your wife shall have a son.” And Sarah was listening at the tent door behind him.',
    dra: 'And he said to him: I will return and come to thee at this time, life accompanying and Sara thy wife shall have a son. Which when Sara heard, she laughed behind the door of the tent.',
  },
  'GEN 18:12': {
    rsv: 'So Sarah laughed to herself, saying, “After I have grown old, and my husband is old, shall I have pleasure?”',
    dra: 'And she laughed secretly, saying: After I am grown old and my lord is an old man, shall I give myself to pleasure?',
  },
  'GEN 18:14': {
    rsv: 'Is anything too hard for the LORD? At the appointed time I will return to you, in the spring, and Sarah shall have a son.”',
    dra: 'Is there any thing hard to God? According to appointment I will return to thee at this same time, life accompanying, and Sara shall have a son.',
  },
  'LUK 1:37': {
    rsv: 'For with God nothing will be impossible.”',
    dra: 'Because no word shall be impossible with God.',
  },
  'GEN 18:20': {
    rsv: 'Then the LORD said, “Because the outcry against Sodom and Gomorrah is great and their sin is very grave,',
    dra: 'And the Lord said: The cry of Sodom and Gomorrha is multiplied, and their sin is become exceedingly grievous.',
  },
  'GEN 18:23': {
    rsv: 'Then Abraham drew near, and said, “Wilt thou indeed destroy the righteous with the wicked?',
    dra: 'And drawing nigh he said: Wilt thou destroy the just with the wicked?',
  },
  'GEN 18:25': {
    rsv: 'Far be it from thee to do such a thing, to slay the righteous with the wicked, so that the righteous fare as the wicked! Far be that from thee! Shall not the Judge of all the earth do right?”',
    dra: 'Far be it from thee to do this thing, and to slay the just with the wicked, and for the just to be in like case as the wicked, this is not beseeming thee: thou who judgest all the earth, wilt not make this judgment.',
  },
  'GEN 18:32': {
    rsv: 'Then he said, “Oh let not the Lord be angry, and I will speak again but this once. Suppose ten are found there.” He answered, “For the sake of ten I will not destroy it.”',
    dra: 'I beseech thee, saith he, be not angry, Lord, if I speak yet once more: What if ten should be found there? And he said: I will not destroy it for the sake of ten.',
  },
  'GEN 19:16': {
    rsv: 'But he lingered; so the men seized him and his wife and his two daughters by the hand, the LORD being merciful to him, and they brought him forth and set him outside the city.',
    dra: 'And as he lingered, they took his hand, and the hand of his wife, and of his two daughters, because the Lord spared him.',
  },
  'GEN 19:17': {
    rsv: 'And when they had brought them forth, they said, “Flee for your life; do not look back or stop anywhere in the valley; flee to the hills, lest you be consumed.”',
    dra: 'And they brought him forth, and set him without the city: and there they spoke to him, saying: Save thy life: look not back, neither stay thou in all the country about: but save thyself in the mountain, lest thou be also consumed.',
  },
  'GEN 19:26': {
    rsv: 'But Lot’s wife behind him looked back, and she became a pillar of salt.',
    dra: 'And his wife looking behind her, was turned into a statue of salt.',
  },
  'GEN 19:28': {
    rsv: 'and he looked down toward Sodom and Gomorrah and toward all the land of the valley, and beheld, and lo, smoke of the land went up like the smoke of a furnace.',
    dra: 'He looked towards Sodom and Gomorrha, and the whole land of that country: and he saw the ashes rise up from the earth as the smoke of a furnace.',
  },
  'GEN 19:29': {
    rsv: 'So it was that, when God destroyed the cities of the valley, God remembered Abraham, and sent Lot out of the midst of the overthrow, when he overthrew the cities in which Lot dwelt.',
    dra: 'Now when God destroyed the cities of that country, remembering Abraham, he delivered Lot out of the destruction of the cities wherein he had dwelt.',
  },
  'HEB 7:25': {
    rsv: 'Consequently he is able for all time to save those who draw near to God through him, since he always lives to make intercession for them.',
    dra: 'Whereby he is able also to save for ever them that come to God by him; always living to make intercession for us.',
  },
  'GEN 21:1': {
    rsv: 'The LORD visited Sarah as he had said, and the LORD did to Sarah as he had promised.',
    dra: 'And the Lord visited Sara, as he had promised: and fulfilled what he had spoken.',
  },
  'GEN 21:2': {
    rsv: 'And Sarah conceived, and bore Abraham a son in his old age at the time of which God had spoken to him.',
    dra: 'And she conceived and bore a son in her old age, at the time that God had foretold her.',
  },
  'GEN 21:3': {
    rsv: 'Abraham called the name of his son who was born to him, whom Sarah bore him, Isaac.',
    dra: 'And Abraham called the name of his son, whom Sara bore him, Isaac.',
  },
  'GEN 21:6': {
    rsv: 'And Sarah said, “God has made laughter for me; every one who hears will laugh over me.”',
    dra: 'And Sara said: God hath made a laughter for me: whosoever shall hear of it will laugh with me.',
  },
  'GEN 21:8': {
    rsv: 'And the child grew, and was weaned; and Abraham made a great feast on the day that Isaac was weaned.',
    dra: 'And the child grew and was weaned: and Abraham made a great feast on the day of his weaning.',
  },
  'GAL 4:28': {
    rsv: 'Now we, brethren, like Isaac, are children of promise.',
    dra: 'Now we, brethren, as Isaac was, are the children of promise.',
  },
  'GEN 22:1': {
    rsv: 'After these things God tested Abraham, and said to him, “Abraham!” And he said, “Here am I.”',
    dra: 'After these things, God tempted Abraham, and said to him: Abraham, Abraham. And he answered: Here I am.',
  },
  'GEN 22:2': {
    rsv: 'He said, “Take your son, your only son Isaac, whom you love, and go to the land of Moriah, and offer him there as a burnt offering upon one of the mountains of which I shall tell you.”',
    dra: 'He said to him: Take thy only begotten son Isaac, whom thou lovest, and go into the land of vision: and there thou shalt offer him for an holocaust upon one of the mountains which I will shew thee.',
  },
  'GEN 22:6': {
    rsv: 'And Abraham took the wood of the burnt offering, and laid it on Isaac his son; and he took in his hand the fire and the knife. So they went both of them together.',
    dra: 'And he took the wood for the holocaust, and laid it upon Isaac his son: and he himself carried in his hands fire and a sword. And as they two went on together,',
  },
  'GEN 22:7': {
    rsv: 'And Isaac said to his father Abraham, “My father!” And he said, “Here am I, my son.” He said, “Behold, the fire and the wood; but where is the lamb for a burnt offering?”',
    dra: 'Isaac said to his father: My father. And he answered: What wilt thou, son? Behold, saith he, fire and wood: where is the victim for the holocaust?',
  },
  'GEN 22:8': {
    rsv: 'Abraham said, “God will provide himself the lamb for a burnt offering, my son.” So they went both of them together.',
    dra: 'And Abraham said: God will provide himself a victim for an holocaust, my son. So they went on together.',
  },
  'GEN 22:11': {
    rsv: 'But the angel of the LORD called to him from heaven, and said, “Abraham, Abraham!” And he said, “Here am I.”',
    dra: 'And behold an angel of the Lord from heaven called to him, saying: Abraham, Abraham. And he answered: Here I am.',
  },
  'GEN 22:12': {
    rsv: 'He said, “Do not lay your hand on the lad or do anything to him; for now I know that you fear God, seeing you have not withheld your son, your only son, from me.”',
    dra: 'And he said to him: Lay not thy hand upon the boy, neither do thou any thing to him: now I know that thou fearest God, and hast not spared thy only begotten son for my sake.',
  },
  'GEN 22:13': {
    rsv: 'And Abraham lifted up his eyes and looked, and behold, behind him was a ram, caught in a thicket by his horns; and Abraham went and took the ram, and offered it up as a burnt offering instead of his son.',
    dra: 'Abraham lifted up his eyes, and saw behind his back a ram amongst the briers sticking fast by the horns, which he took and offered for a holocaust instead of his son.',
  },
  'GEN 22:14': {
    rsv: 'So Abraham called the name of that place The LORD will provide; as it is said to this day, “On the mount of the LORD it shall be provided.”',
    dra: 'And he called the name of that place, The Lord seeth. Whereupon even to this day it is said: In the mountain the Lord will see.',
  },
  'GEN 22:17': {
    rsv: 'I will indeed bless you, and I will multiply your descendants as the stars of heaven and as the sand which is on the seashore. And your descendants shall possess the gate of their enemies,',
    dra: 'I will bless thee, and I will multiply thy seed as the stars of heaven, and as the sand that is by the sea shore: thy seed shall possess the gates of their enemies.',
  },
  'GEN 22:18': {
    rsv: 'and by your descendants shall all the nations of the earth bless themselves, because you have obeyed my voice.”',
    dra: 'And in thy seed shall all the nations of the earth be blessed, because thou hast obeyed my voice.',
  },
  'GEN 23:19': {
    rsv: 'After this, Abraham buried Sarah his wife in the cave of the field of Mach-pelah east of Mamre (that is, Hebron) in the land of Canaan.',
    dra: 'And so Abraham buried Sara his wife, in a double cave of the field, that looked towards Mambre, this is Hebron in the land of Chanaan.',
  },
  'JHN 1:29': {
    rsv: 'The next day he saw Jesus coming toward him, and said, “Behold, the Lamb of God, who takes away the sin of the world!',
    dra: 'The next day, John saw Jesus coming to him, and he saith: Behold the Lamb of God, behold him who taketh away the sin of the world.',
  },
  // Level 4 · Isaac and Jacob
  'GEN 24:1': {
    rsv: 'Now Abraham was old, well advanced in years; and the LORD had blessed Abraham in all things.',
    dra: 'Now Abraham was old; and advanced in age: and the Lord had blessed him in all things.',
  },
  'GEN 24:4': {
    rsv: 'but will go to my country and to my kindred, and take a wife for my son Isaac.”',
    dra: 'But that thou go to my own country and kindred, and take a wife from thence for my son Isaac.',
  },
  'GEN 24:10': {
    rsv: 'Then the servant took ten of his master’s camels and departed, taking all sorts of choice gifts from his master; and he arose, and went to Mesopotamia, to the city of Nahor.',
    dra: 'And he took ten camels of his master\'s herd, and departed, carrying something of all his goods with him, and he set forward and went on to Mesopotamia to the city of Nachor.',
  },
  'GEN 24:12': {
    rsv: 'And he said, “O LORD, God of my master Abraham, grant me success today, I pray thee, and show steadfast love to my master Abraham.',
    dra: 'O Lord the God of my master Abraham, meet me to day, I beseech thee, and shew kindness to my master Abraham.',
  },
  'GEN 24:15': {
    rsv: 'Before he had done speaking, behold, Rebekah, who was born to Bethuel the son of Milcah, the wife of Nahor, Abraham’s brother, came out with her water jar upon her shoulder.',
    dra: 'He had not yet ended these words within himself, and behold Rebecca came out, the daughter of Bathuel, son of Melcha, wife to Nachor the brother of Abraham, having a pitcher on her shoulder:',
  },
  'GEN 24:18': {
    rsv: 'She said, “Drink, my lord”; and she quickly let down her jar upon her hand, and gave him a drink.',
    dra: 'And she answered: Drink, my lord. And quickly she let down the pitcher upon her arm, and gave him drink.',
  },
  'GEN 24:19': {
    rsv: 'When she had finished giving him a drink, she said, “I will draw for your camels also, until they have done drinking.”',
    dra: 'And when he had drunk, she said: I will draw water for thy camels also, till they all drink.',
  },
  'GEN 24:58': {
    rsv: 'And they called Rebekah, and said to her, “Will you go with this man?” She said, “I will go.”',
    dra: 'And they called her, and when she was come, they asked: Wilt thou go with this man? She said: I will go.',
  },
  'GEN 24:63': {
    rsv: 'And Isaac went out to meditate in the field in the evening; and he lifted up his eyes and looked, and behold, there were camels coming.',
    dra: 'And he was gone forth to meditate in the field, the day being now well spent: and when he had lifted up his eyes, he saw camels coming afar off.',
  },
  'GEN 24:67': {
    rsv: 'Then Isaac brought her into the tent, and took Rebekah, and she became his wife; and he loved her. So Isaac was comforted after his mother’s death.',
    dra: 'Who brought her into the tent of Sara his mother, and took her to wife: and he loved her so much, that it moderated the sorrow which was occasioned by his mother\'s death.',
  },
  'LUK 1:38': {
    rsv: 'And Mary said, “Behold, I am the handmaid of the Lord; let it be to me according to your word.” And the angel departed from her.',
    dra: 'And Mary said: Behold the handmaid of the Lord; be it done to me according to thy word. And the angel departed from her.',
  },
  'GEN 25:8': {
    rsv: 'Abraham breathed his last and died in a good old age, an old man and full of years, and was gathered to his people.',
    dra: 'And decaying he died in a good old age, and having lived a long time, and being full of days: and was gathered to his people.',
  },
  'GEN 25:21': {
    rsv: 'And Isaac prayed to the LORD for his wife, because she was barren; and the LORD granted his prayer, and Rebekah his wife conceived.',
    dra: 'And Isaac besought the Lord for his wife, because she was barren; and he heard him, and made Rebecca to conceive.',
  },
  'GEN 25:23': {
    rsv: 'And the LORD said to her, “Two nations are in your womb, and two peoples, born of you, shall be divided; the one shall be stronger than the other, the elder shall serve the younger.”',
    dra: 'And he answering said: Two nations are in thy womb, and two peoples shall be divided out of thy womb, and one people shall overcome the other, and the elder shall serve the younger.',
  },
  'GEN 25:25': {
    rsv: 'The first came forth red, all his body like a hairy mantle; so they called his name Esau.',
    dra: 'He that came forth first was red, and hairy like a skin: and his name was called Esau. Immediately the other coming forth, held his brother\'s foot in his hand, and therefore he was called Jacob.',
  },
  'GEN 25:26': {
    rsv: 'Afterward his brother came forth, and his hand had taken hold of Esau’s heel; so his name was called Jacob. Isaac was sixty years old when she bore them.',
    dra: 'Isaac was threescore years old when the children were born unto him.',
  },
  'GEN 25:27': {
    rsv: 'When the boys grew up, Esau was a skilful hunter, a man of the field, while Jacob was a quiet man, dwelling in tents.',
    dra: 'And when they were grown up, Esau became a skillful hunter, and a husbandman, but Jacob a plain man dwelt in tents.',
  },
  'GEN 25:28': {
    rsv: 'Isaac loved Esau, because he ate of his game; but Rebekah loved Jacob.',
    dra: 'Isaac loved Esau, because he ate of his hunting: and Rebecca loved Jacob.',
  },
  'GEN 25:30': {
    rsv: 'And Esau said to Jacob, “Let me eat some of that red pottage, for I am famished!” (Therefore his name was called Edom.)',
    dra: 'Said: Give me of this red pottage, for I am exceeding faint. For which reason his name was called Edom.',
  },
  'GEN 25:31': {
    rsv: 'Jacob said, “First sell me your birthright.”',
    dra: 'And Jacob said to him: Sell me thy first birthright.',
  },
  'GEN 25:32': {
    rsv: 'Esau said, “I am about to die; of what use is a birthright to me?”',
    dra: 'He answered: Lo I die, what will the first birthright avail me?',
  },
  'GEN 25:34': {
    rsv: 'Then Jacob gave Esau bread and pottage of lentils, and he ate and drank, and rose and went his way. Thus Esau despised his birthright.',
    dra: 'And so taking bread and the pottage of lentils, he ate, and drank, and went his way; making little account of having sold his first birthright.',
  },
  'MAT 4:4': {
    rsv: 'But he answered, “It is written, ‘Man shall not live by bread alone, but by every word that proceeds from the mouth of God.’”',
    dra: 'Who answered and said: It is written, Not in bread alone doth man live, but in every word that proceedeth from the mouth of God.',
  },
  'GEN 27:1': {
    rsv: 'When Isaac was old and his eyes were dim so that he could not see, he called Esau his older son, and said to him, “My son”; and he answered, “Here I am.”',
    dra: 'Now Isaac was old, and his eyes were dim, and he could not see: and he called Esau, his elder son, and said to him: My son? And he answered: Here I am.',
  },
  'GEN 27:4': {
    rsv: 'and prepare for me savory food, such as I love, and bring it to me that I may eat; that I may bless you before I die.”',
    dra: 'Make me savoury meat thereof, as thou knowest I like, and bring it, that I may eat: and my soul may bless thee before I die.',
  },
  'GEN 27:16': {
    rsv: 'and the skins of the kids she put upon his hands and upon the smooth part of his neck;',
    dra: 'And the little skins of the kids she put about his hands, and covered the bare of his neck.',
  },
  'GEN 27:22': {
    rsv: 'So Jacob went near to Isaac his father, who felt him and said, “The voice is Jacob’s voice, but the hands are the hands of Esau.”',
    dra: 'He came near to his father, and when he had felt him, Isaac said: The voice indeed is the voice of Jacob; but the hands are the hands of Esau.',
  },
  'GEN 27:27': {
    rsv: 'So he came near and kissed him; and he smelled the smell of his garments, and blessed him, and said, “See, the smell of my son is as the smell of a field which the LORD has blessed!',
    dra: 'He came near, and kissed him. And immediately as he smelled the fragrant smell of his garments, blessing him, he said: Behold the smell of my son is as the smell of a plentiful field, which the Lord hath blessed.',
  },
  'GEN 27:28': {
    rsv: 'May God give you of the dew of heaven, and of the fatness of the earth, and plenty of grain and wine.',
    dra: 'God give thee the dew of heaven, and of the fatness of the earth, abundance of corn and wine.',
  },
  'GEN 27:29': {
    rsv: 'Let peoples serve you, and nations bow down to you. Be lord over your brothers, and may your mother’s sons bow down to you. Cursed be every one who curses you, and blessed be every one who blesses you!”',
    dra: 'And let peoples serve thee, and tribes worship thee: be thou lord of thy brethren, and let thy mother\'s children bow down before thee. Cursed be he that curseth thee: and let him that blesseth thee be filled with blessings.',
  },
  'GEN 27:34': {
    rsv: 'When Esau heard the words of his father, he cried out with an exceedingly great and bitter cry, and said to his father, “Bless me, even me also, O my father!”',
    dra: 'Esau having heard his father\'s words, roared out with a great cry: and being in a great consternation, said: Bless me also, my father.',
  },
  'GEN 27:43': {
    rsv: 'Now therefore, my son, obey my voice; arise, flee to Laban my brother in Haran,',
    dra: 'Now therefore, my son, hear my voice: arise and flee to Laban my brother to Haran:',
  },
  'GAL 3:27': {
    rsv: 'For as many of you as were baptized into Christ have put on Christ.',
    dra: 'For as many of you as have been baptized in Christ, have put on Christ.',
  },
  'GEN 28:10': {
    rsv: 'Jacob left Beer-sheba, and went toward Haran.',
    dra: 'But Jacob being departed from Bersabee, went on to Haran.',
  },
  'GEN 28:11': {
    rsv: 'And he came to a certain place, and stayed there that night, because the sun had set. Taking one of the stones of the place, he put it under his head and lay down in that place to sleep.',
    dra: 'And when he was come to a certain place, and would rest in it after sunset, he took of the stones that lay there, and putting under his head, slept in the same place.',
  },
  'GEN 28:12': {
    rsv: 'And he dreamed that there was a ladder set up on the earth, and the top of it reached to heaven; and behold, the angels of God were ascending and descending on it!',
    dra: 'And he saw in his sleep a ladder standing upon the earth, and the top thereof touching heaven: the angels also of God ascending and descending by it;',
  },
  'GEN 28:13': {
    rsv: 'And behold, the LORD stood above it and said, “I am the LORD, the God of Abraham your father and the God of Isaac; the land on which you lie I will give to you and to your descendants;',
    dra: 'And the Lord leaning upon the ladder, saying to him: I am the Lord God of Abraham thy father, and the God of Isaac; the land, wherein thou sleepest, I will give to thee and to thy seed.',
  },
  'GEN 28:15': {
    rsv: 'Behold, I am with you and will keep you wherever you go, and will bring you back to this land; for I will not leave you until I have done that of which I have spoken to you.”',
    dra: 'And I will be thy keeper whithersoever thou goest, and will bring thee back into this land: neither will I leave thee, till I shall have accomplished all that I have said.',
  },
  'GEN 28:16': {
    rsv: 'Then Jacob awoke from his sleep and said, “Surely the LORD is in this place; and I did not know it.”',
    dra: 'And when Jacob awaked out of sleep, he said: Indeed the Lord is in this place, and I knew it not.',
  },
  'GEN 28:17': {
    rsv: 'And he was afraid, and said, “How awesome is this place! This is none other than the house of God, and this is the gate of heaven.”',
    dra: 'And trembling he said: How terrible is this place! this is no other but the house of God, and the gate of heaven.',
  },
  'GEN 28:18': {
    rsv: 'So Jacob rose early in the morning, and he took the stone which he had put under his head and set it up for a pillar and poured oil on the top of it.',
    dra: 'And Jacob, arising in the morning, took the stone, which he had laid under his head, and set it up for a title, pouring oil upon the top of it.',
  },
  'GEN 28:19': {
    rsv: 'He called the name of that place Bethel; but the name of the city was Luz at the first.',
    dra: 'And he called the name of the city Bethel, which before was called Luza.',
  },
  'JHN 1:51': {
    rsv: 'And he said to him, “Truly, truly, I say to you, you will see heaven opened, and the angels of God ascending and descending upon the Son of man.”',
    dra: 'And he saith to him: Amen, amen I say to you, you shall see the heaven opened, and the angels of God ascending and descending upon the Son of man.',
  },
  'GEN 29:2': {
    rsv: 'As he looked, he saw a well in the field, and lo, three flocks of sheep lying beside it; for out of that well the flocks were watered. The stone on the well’s mouth was large,',
    dra: 'And he saw a well in the field, and three flocks of sheep lying by it: for the beasts were watered out of it, and the mouth thereof was closed with a great stone.',
  },
  'GEN 29:9': {
    rsv: 'While he was still speaking with them, Rachel came with her father’s sheep; for she kept them.',
    dra: 'They were yet speaking, and behold Rachel came with her father\'s sheep: for she fed the flock.',
  },
  'GEN 29:10': {
    rsv: 'Now when Jacob saw Rachel the daughter of Laban his mother’s brother, and the sheep of Laban his mother’s brother, Jacob went up and rolled the stone from the well’s mouth, and watered the flock of Laban his mother’s brother.',
    dra: 'And when Jacob saw her, and knew her to be his cousin-german, and that they were the sheep of Laban, his uncle: he removed the stone wherewith the well was closed.',
  },
  'GEN 29:11': {
    rsv: 'Then Jacob kissed Rachel, and wept aloud.',
    dra: 'And having watered the flock, he kissed her: and lifting up his voice, wept.',
  },
  'GEN 29:17': {
    rsv: 'Leah’s eyes were weak, but Rachel was beautiful and lovely.',
    dra: 'But Lia was blear eyed: Rachel was well favoured, and of a beautiful countenance.',
  },
  'GEN 29:18': {
    rsv: 'Jacob loved Rachel; and he said, “I will serve you seven years for your younger daughter Rachel.”',
    dra: 'And Jacob being in love with her, said: I will serve thee seven years for Rachel thy younger daughter.',
  },
  'GEN 29:20': {
    rsv: 'So Jacob served seven years for Rachel, and they seemed to him but a few days because of the love he had for her.',
    dra: 'So Jacob served seven years for Rachel: and they seemed but a few days, because of the greatness of his love.',
  },
  'GEN 29:25': {
    rsv: 'And in the morning, behold, it was Leah; and Jacob said to Laban, “What is this you have done to me? Did I not serve with you for Rachel? Why then have you deceived me?”',
    dra: 'And he said to his father in law: What is it that thou didst mean to do? did not I serve thee for Rachel? why hast thou deceived me?',
  },
  'GEN 29:26': {
    rsv: 'Laban said, “It is not so done in our country, to give the younger before the first-born.',
    dra: 'Laban answered: It is not the custom in this place, to give the younger in marriage first.',
  },
  'GEN 29:30': {
    rsv: 'So Jacob went in to Rachel also, and he loved Rachel more than Leah, and served Laban for another seven years.',
    dra: 'And having at length obtained the marriage he wished for, he preferred the love of the latter before the former, and served with him other seven years.',
  },
  'GEN 29:31': {
    rsv: 'When the LORD saw that Leah was hated, he opened her womb; but Rachel was barren.',
    dra: 'And the Lord seeing that he despised Lia, opened her womb, but her sister remained barren.',
  },
  'GEN 29:35': {
    rsv: 'And she conceived again and bore a son, and said, “This time I will praise the LORD”; therefore she called his name Judah; then she ceased bearing.',
    dra: 'The fourth time she conceived and bore a son, and said: now will I praise the Lord: and for this she called him Juda. And she left bearing.',
  },
  'GEN 30:22': {
    rsv: 'Then God remembered Rachel, and God hearkened to her and opened her womb.',
    dra: 'The Lord also remembering Rachel, heard her, and opened her womb.',
  },
  'GEN 30:24': {
    rsv: 'and she called his name Joseph, saying, “May the LORD add to me another son!”',
    dra: 'And she called his name Joseph, saying: The Lord give me also another son.',
  },
  'REV 5:5': {
    rsv: 'Then one of the elders said to me, “Weep not; lo, the Lion of the tribe of Judah, the Root of David, has conquered, so that he can open the scroll and its seven seals.”',
    dra: 'And one of the ancients said to me: Weep not; behold the lion of the tribe of Juda, the root of David, hath prevailed to open the book, and to loose the seven seals thereof.',
  },
  'GEN 31:3': {
    rsv: 'Then the LORD said to Jacob, “Return to the land of your fathers and to your kindred, and I will be with you.”',
    dra: 'Especially the Lord saying to him: Return into the land of thy fathers, and to thy kindred, and I will be with thee.',
  },
  'GEN 32:6': {
    rsv: 'And the messengers returned to Jacob, saying, “We came to your brother Esau, and he is coming to meet you, and four hundred men with him.”',
    dra: 'And the messengers returned to Jacob, saying: We came to Esau thy brother, and behold he cometh with speed to meet thee with four hundred men.',
  },
  'GEN 32:7': {
    rsv: 'Then Jacob was greatly afraid and distressed; and he divided the people that were with him, and the flocks and herds and camels, into two companies,',
    dra: 'Then Jacob was greatly afraid; and in his fear divided the people that was with him, and the flocks, and the sheep, and the oxen, and the camels, into two companies,',
  },
  'GEN 32:10': {
    rsv: 'I am not worthy of the least of all the steadfast love and all the faithfulness which thou hast shown to thy servant, for with only my staff I crossed this Jordan; and now I have become two companies.',
    dra: 'I am not worthy of the least of all thy mercies, and of thy truth which thou hast fulfilled to thy servant. With my staff I passed over this Jordan; and now I return with two companies.',
  },
  'GEN 32:11': {
    rsv: 'Deliver me, I pray thee, from the hand of my brother, from the hand of Esau, for I fear him, lest he come and slay us all, the mothers with the children.',
    dra: 'Deliver me from the hand of my brother Esau, for I am greatly afraid of him: lest perhaps he come, and kill the mother with the children.',
  },
  'GEN 32:22': {
    rsv: 'The same night he arose and took his two wives, his two maids, and his eleven children, and crossed the ford of the Jabbok.',
    dra: 'And rising early he took his two wives, and his two handmaids, with his eleven sons, and passed over the ford of Jaboc.',
  },
  'GEN 32:24': {
    rsv: 'And Jacob was left alone; and a man wrestled with him until the breaking of the day.',
    dra: 'He remained alone: and behold a man wrestled with him till morning.',
  },
  'GEN 32:25': {
    rsv: 'When the man saw that he did not prevail against Jacob, he touched the hollow of his thigh; and Jacob’s thigh was put out of joint as he wrestled with him.',
    dra: 'And when he saw that he could not overcome him, he touched the sinew of his thigh, and forthwith it shrank.',
  },
  'GEN 32:26': {
    rsv: 'Then he said, “Let me go, for the day is breaking.” But Jacob said, “I will not let you go, unless you bless me.”',
    dra: 'And he said to him: Let me go, for it is break of day. He answered: I will not let thee go except thou bless me.',
  },
  'GEN 32:27': {
    rsv: 'And he said to him, “What is your name?” And he said, “Jacob.”',
    dra: 'And he said: What is thy name? He answered: Jacob.',
  },
  'GEN 32:28': {
    rsv: 'Then he said, “Your name shall no more be called Jacob, but Israel, for you have striven with God and with men, and have prevailed.”',
    dra: 'But he said: Thy name shall not be called Jacob, but Israel: for if thou hast been strong against God, how much more shalt thou prevail against men?',
  },
  'GEN 32:30': {
    rsv: 'So Jacob called the name of the place Peniel, saying, “For I have seen God face to face, and yet my life is preserved.”',
    dra: 'And Jacob called the name of the place Phanuel, saying: I have seen God face to face, and my soul has been saved.',
  },
  'GEN 32:31': {
    rsv: 'The sun rose upon him as he passed Penuel, limping because of his thigh.',
    dra: 'And immediately the sun rose upon him, after he was past Phanuel; but he halted on his foot.',
  },
  'LUK 18:1': {
    rsv: 'And he told them a parable, to the effect that they ought always to pray and not lose heart.',
    dra: 'And he spoke also a parable to them, that we ought always to pray, and not to faint,',
  },
  'GEN 33:1': {
    rsv: 'And Jacob lifted up his eyes and looked, and behold, Esau was coming, and four hundred men with him. So he divided the children among Leah and Rachel and the two maids.',
    dra: 'And Jacob lifting up his eyes, saw Esau coming, and with him four hundred men: and he divided the children of Lia, and of Rachel, and of the two handmaids:',
  },
  'GEN 33:3': {
    rsv: 'He himself went on before them, bowing himself to the ground seven times, until he came near to his brother.',
    dra: 'And he went forward and bowed down with his face to the ground seven times until his brother came near.',
  },
  'GEN 33:4': {
    rsv: 'But Esau ran to meet him, and embraced him, and fell on his neck and kissed him, and they wept.',
    dra: 'Then Esau ran to meet his brother, and embraced him: and clasping him fast about the neck, and kissing him, wept.',
  },
  'GEN 33:9': {
    rsv: 'But Esau said, “I have enough, my brother; keep what you have for yourself.”',
    dra: 'But he said: I have plenty, my brother, keep what is thine for thyself.',
  },
  'GEN 33:10': {
    rsv: 'Jacob said, “No, I pray you, if I have found favor in your sight, then accept my present from my hand; for truly to see your face is like seeing the face of God, with such favor have you received me.',
    dra: 'And Jacob said: Do not so I beseech thee, but if I have found favour in thy eyes, receive a little present at my hands: for I have seen thy face, as if I should have seen the countenance of God: be gracious to me,',
  },
  'GEN 35:1': {
    rsv: 'God said to Jacob, “Arise, go up to Bethel, and dwell there; and make there an altar to the God who appeared to you when you fled from your brother Esau.”',
    dra: 'In the meantime God said to Jacob: Arise, and go up to Bethel, and dwell there, and make there an altar to God, who appeared to thee when thou didst flee from Esau thy brother.',
  },
  'GEN 35:2': {
    rsv: 'So Jacob said to his household and to all who were with him, “Put away the foreign gods that are among you, and purify yourselves, and change your garments;',
    dra: 'And Jacob having called together all his household, said: Cast away the strange gods that are among you, and be cleansed and change your garments.',
  },
  'GEN 35:10': {
    rsv: 'And God said to him, “Your name is Jacob; no longer shall your name be called Jacob, but Israel shall be your name.” So his name was called Israel.',
    dra: 'Saying: Thou shalt not be called any more Jacob, but Israel shall be thy name. And he called him Israel.',
  },
  'GEN 35:11': {
    rsv: 'And God said to him, “I am God Almighty: be fruitful and multiply; a nation and a company of nations shall come from you, and kings shall spring from you.',
    dra: 'And said to him: I am God Almighty, increase thou and be multiplied. Nations and peoples of nations shall be from thee, and kings shall come out of thy loins.',
  },
  'GEN 35:18': {
    rsv: 'And as her soul was departing (for she died), she called his name Ben-oni; but his father called his name Benjamin.',
    dra: 'And when her soul was departing for pain, and death was now at hand, she called the name of her son Benoni, that is, The son of my pain: but his father called him Benjamin, that is, The son of the right hand.',
  },
  'GEN 35:19': {
    rsv: 'So Rachel died, and she was buried on the way to Ephrath (that is, Bethlehem),',
    dra: 'So Rachel died, and was buried in the highway that leadeth to Ephrata, this is Bethlehem.',
  },
  'GEN 35:20': {
    rsv: 'and Jacob set up a pillar upon her grave; it is the pillar of Rachel’s tomb, which is there to this day.',
    dra: 'And Jacob erected a pillar over her sepulchre: this is the pillar of Rachel\'s monument, to this day.',
  },
  'GEN 35:22': {
    rsv: '…Now the sons of Jacob were twelve.',
    dra: '…Now the sons of Jacob were twelve.',
    partial: true,
  },
  'GEN 35:29': {
    rsv: 'And Isaac breathed his last; and he died and was gathered to his people, old and full of days; and his sons Esau and Jacob buried him.',
    dra: 'And being spent with age he died, and was gathered to his people, being old and full of days: and his sons Esau and Jacob buried him.',
  },
  'LUK 15:20': {
    rsv: 'And he arose and came to his father. But while he was yet at a distance, his father saw him and had compassion, and ran and embraced him and kissed him.',
    dra: 'And rising up he came to his father. And when he was yet a great way off, his father saw him, and was moved with compassion, and running to him fell upon his neck, and kissed him.',
  },
  // Level 5 · Joseph and His Brothers (the Douay-Rheims numbers Genesis 49:33 and 50:24–26 one lower)
  'GEN 37:3': {
    rsv: 'Now Israel loved Joseph more than any other of his children, because he was the son of his old age; and he made him a long robe with sleeves.',
    dra: 'Now Israel loved Joseph above all his sons, because he had him in his old age: and he made him a coat of divers colours.',
  },
  'GEN 37:4': {
    rsv: 'But when his brothers saw that their father loved him more than all his brothers, they hated him, and could not speak peaceably to him.',
    dra: 'And his brethren seeing that he was loved by his father, more than all his sons, hated him, and could not speak peaceably to him.',
  },
  'GEN 37:5': {
    rsv: 'Now Joseph had a dream, and when he told it to his brothers they only hated him the more.',
    dra: 'Now it fell out also that he told his brethren a dream, that he had dreamed: which occasioned them to hate him the more.',
  },
  'GEN 37:7': {
    rsv: 'behold, we were binding sheaves in the field, and lo, my sheaf arose and stood upright; and behold, your sheaves gathered round it, and bowed down to my sheaf.”',
    dra: 'I thought we were binding sheaves in the field: and my sheaf arose as it were, and stood, and your sheaves standing about, bowed down before my sheaf.',
  },
  'GEN 37:8': {
    rsv: 'His brothers said to him, “Are you indeed to reign over us? Or are you indeed to have dominion over us?” So they hated him yet more for his dreams and for his words.',
    dra: 'His brethren answered: Shalt thou be our king? or shall we be subject to thy dominion? Therefore this matter of his dreams and words ministered nourishment to their envy and hatred.',
  },
  'GEN 37:9': {
    rsv: 'Then he dreamed another dream, and told it to his brothers, and said, “Behold, I have dreamed another dream; and behold, the sun, the moon, and eleven stars were bowing down to me.”',
    dra: 'He dreamed also another dream, which he told his brethren, saying: I saw in a dream, as it were the sun, and the moon, and eleven stars worshipping me.',
  },
  'GEN 37:11': {
    rsv: 'And his brothers were jealous of him, but his father kept the saying in mind.',
    dra: 'His brethren therefore envied him: but his father considered the thing with himself.',
  },
  'GEN 37:13': {
    rsv: 'And Israel said to Joseph, “Are not your brothers pasturing the flock at Shechem? Come, I will send you to them.” And he said to him, “Here I am.”',
    dra: 'Israel said to him: Thy brethren feed the sheep in Sichem: come, I will send thee to them. And when he answered:',
  },
  'GEN 37:15': {
    rsv: 'And a man found him wandering in the fields; and the man asked him, “What are you seeking?”',
    dra: 'And a man found him there wandering in the field, and asked what he sought.',
  },
  'GEN 37:16': {
    rsv: '“I am seeking my brothers,” he said, “tell me, I pray you, where they are pasturing the flock.”',
    dra: 'But he answered: I seek my brethren; tell me where they feed the flocks.',
  },
  'GEN 37:17': {
    rsv: 'And the man said, “They have gone away, for I heard them say, ‘Let us go to Dothan.’” So Joseph went after his brothers, and found them at Dothan.',
    dra: 'And the man said to him: They are departed from this place: for I heard them say: Let us go to Dothain. And Joseph went forward after his brethren, and found them in Dothain.',
  },
  'GEN 37:18': {
    rsv: 'They saw him afar off, and before he came near to them they conspired against him to kill him.',
    dra: 'And when they saw him afar off, before he came nigh them, they thought to kill him.',
  },
  'GEN 37:19': {
    rsv: 'They said to one another, “Here comes this dreamer.',
    dra: 'And said one to another: Behold the dreamer cometh.',
  },
  'GEN 37:21': {
    rsv: 'But when Reuben heard it, he delivered him out of their hands, saying, “Let us not take his life.”',
    dra: 'And Ruben hearing this, endeavoured to deliver him out of their hands, and said:',
  },
  'GEN 37:24': {
    rsv: 'and they took him and cast him into a pit. The pit was empty, there was no water in it.',
    dra: 'And cast him into an old pit, where there was no water.',
  },
  'GEN 37:28': {
    rsv: 'Then Midianite traders passed by; and they drew Joseph up and lifted him out of the pit, and sold him to the Ishmaelites for twenty shekels of silver; and they took Joseph to Egypt.',
    dra: 'And when the Madianite merchants passed by, they drew him out of the pit, and sold him to the Ismaelites, for twenty pieces of silver: and they led him into Egypt.',
  },
  'GEN 37:35': {
    rsv: 'All his sons and all his daughters rose up to comfort him; but he refused to be comforted, and said, “No, I shall go down to Sheol to my son, mourning.” Thus his father wept for him.',
    dra: 'And all his children being gathered together to comfort their father in his sorrow, he would not receive comfort, but said: I will go down to my son into hell, mourning. And whilst he continued weeping,',
  },
  'MAT 26:15': {
    rsv: 'and said, “What will you give me if I deliver him to you?” And they paid him thirty pieces of silver.',
    dra: 'And said to them: What will you give me, and I will deliver him unto you? But they appointed him thirty pieces of silver.',
  },
  'GEN 39:1': {
    rsv: 'Now Joseph was taken down to Egypt, and Poti-phar, an officer of Pharaoh, the captain of the guard, an Egyptian, bought him from the Ishmaelites who had brought him down there.',
    dra: 'And Joseph was brought into Egypt, and Putiphar an eunuch of Pharao, chief captain of the army, an Egyptian, bought him of the Ismaelites, by whom he was brought.',
  },
  'GEN 39:2': {
    rsv: 'The LORD was with Joseph, and he became a successful man; and he was in the house of his master the Egyptian,',
    dra: 'And the Lord was with him, and he was a prosperous man in all things: and he dwelt in his master\'s house,',
  },
  'GEN 39:5': {
    rsv: 'From the time that he made him overseer in his house and over all that he had the LORD blessed the Egyptian’s house for Joseph’s sake; the blessing of the LORD was upon all that he had, in house and field.',
    dra: 'And the Lord blessed the house of the Egyptian for Joseph\'s sake, and multiplied all his substance, both at home, and in the fields.',
  },
  'GEN 39:9': {
    rsv: 'he is not greater in this house than I am; nor has he kept back anything from me except yourself, because you are his wife; how then can I do this great wickedness, and sin against God?”',
    dra: 'Neither is there any thing which is not in my power, or that he hath not delivered to me, but thee, who art his wife: how then can I do this wicked thing, and sin against my God?',
  },
  'GEN 39:20': {
    rsv: 'And Joseph’s master took him and put him into the prison, the place where the king’s prisoners were confined, and he was there in prison.',
    dra: 'And cast Joseph into the prison, where the king\'s prisoners were kept, and he was there shut up.',
  },
  'GEN 39:21': {
    rsv: 'But the LORD was with Joseph and showed him steadfast love, and gave him favor in the sight of the keeper of the prison.',
    dra: 'But the Lord was with Joseph and having mercy upon him gave him favour in the sight of the chief keeper of the prison:',
  },
  'GEN 39:22': {
    rsv: 'And the keeper of the prison committed to Joseph’s care all the prisoners who were in the prison; and whatever was done there, he was the doer of it;',
    dra: 'Who delivered into his hand all the prisoners that were kept in custody: and whatsoever was done was under him.',
  },
  'GEN 40:8': {
    rsv: 'They said to him, “We have had dreams, and there is no one to interpret them.” And Joseph said to them, “Do not interpretations belong to God? Tell them to me, I pray you.”',
    dra: 'They answered: We have dreamed a dream, and there is nobody to interpret it to us. And Joseph said to them: Doth not interpretation belong to God? Tell me what you have dreamed.',
  },
  'GEN 40:14': {
    rsv: 'But remember me, when it is well with you, and do me the kindness, I pray you, to make mention of me to Pharaoh, and so get me out of this house.',
    dra: 'Only remember me, when it shall be well with thee, and do me this kindness: to put Pharao in mind to take me out of this prison:',
  },
  'GEN 40:21': {
    rsv: 'He restored the chief butler to his butlership, and he placed the cup in Pharaoh’s hand;',
    dra: 'And he restored the one to his place to present him the cup:',
  },
  'GEN 40:23': {
    rsv: 'Yet the chief butler did not remember Joseph, but forgot him.',
    dra: 'But the chief butler, when things prospered with him, forgot his interpreter.',
  },
  'LUK 23:42': {
    rsv: 'And he said, “Jesus, remember me when you come in your kingly power.”',
    dra: 'And he said to Jesus: Lord, remember me when thou shalt come into thy kingdom.',
  },
  'LUK 23:43': {
    rsv: 'And he said to him, “Truly, I say to you, today you will be with me in Paradise.”',
    dra: 'And Jesus said to him: Amen I say to thee, this day thou shalt be with me in paradise.',
  },
  'GEN 41:1': {
    rsv: 'After two whole years, Pharaoh dreamed that he was standing by the Nile,',
    dra: 'After two years Pharao had a dream. He thought he stood by the river,',
  },
  'GEN 41:8': {
    rsv: 'So in the morning his spirit was troubled; and he sent and called for all the magicians of Egypt and all its wise men; and Pharaoh told them his dream, but there was none who could interpret it to Pharaoh.',
    dra: 'And when morning was come, being struck with fear, he sent to all the interpreters of Egypt, and to all the wise men: and they being called for, he told them his dream, and there was not any one that could interpret it.',
  },
  'GEN 41:9': {
    rsv: 'Then the chief butler said to Pharaoh, “I remember my faults today.',
    dra: 'Then at length the chief butler remembering, said: I confess my sin:',
  },
  'GEN 41:14': {
    rsv: 'Then Pharaoh sent and called Joseph, and they brought him hastily out of the dungeon; and when he had shaved himself and changed his clothes, he came in before Pharaoh.',
    dra: 'Forthwith at the king\'s command, Joseph was brought out of the prison, and they shaved him, and changing his apparel, brought him in to him.',
  },
  'GEN 41:16': {
    rsv: 'Joseph answered Pharaoh, “It is not in me; God will give Pharaoh a favorable answer.”',
    dra: 'Joseph answered: Without me, God shall give Pharao a prosperous answer.',
  },
  'GEN 41:25': {
    rsv: 'Then Joseph said to Pharaoh, “The dream of Pharaoh is one; God has revealed to Pharaoh what he is about to do.',
    dra: 'Joseph answered: The king\'s dream is one: God hath shewn to Pharao what he is about to do.',
  },
  'GEN 41:29': {
    rsv: 'There will come seven years of great plenty throughout all the land of Egypt,',
    dra: 'Behold, there shall come seven years of great plenty in the whole land of Egypt:',
  },
  'GEN 41:30': {
    rsv: 'but after them there will arise seven years of famine, and all the plenty will be forgotten in the land of Egypt; the famine will consume the land,',
    dra: 'After which shall follow other seven years of so great scarcity, that all the abundance before shall be forgotten: for the famine shall consume all the land,',
  },
  'GEN 41:38': {
    rsv: 'And Pharaoh said to his servants, “Can we find such a man as this, in whom is the Spirit of God?”',
    dra: 'And he said to them: Can we find such another man, that is full of the spirit of God?',
  },
  'GEN 41:41': {
    rsv: 'And Pharaoh said to Joseph, “Behold, I have set you over all the land of Egypt.”',
    dra: 'And again Pharao said to Joseph: Behold, I have appointed thee over the whole land of Egypt.',
  },
  'GEN 41:42': {
    rsv: 'Then Pharaoh took his signet ring from his hand and put it on Joseph’s hand, and arrayed him in garments of fine linen, and put a gold chain about his neck;',
    dra: 'And he took his ring from his own hand, and gave it into his hand: and he put upon him a robe of silk, and put a chain of gold about his neck.',
  },
  'GEN 41:43': {
    rsv: 'and he made him to ride in his second chariot; and they cried before him, “Bow the knee!” Thus he set him over all the land of Egypt.',
    dra: 'And he made him go up into his second chariot, the crier proclaiming that all should bow their knee before him, and that they should know he was made governor over the whole land of Egypt.',
  },
  'GEN 41:49': {
    rsv: 'And Joseph stored up grain in great abundance, like the sand of the sea, until he ceased to measure it, for it could not be measured.',
    dra: 'And there was so great abundance of wheat, that it was equal to the sand of the sea, and the plenty exceeded measure.',
  },
  'GEN 41:52': {
    rsv: 'The name of the second he called Ephraim, “For God has made me fruitful in the land of my affliction.”',
    dra: 'And he named the second Ephraim, saying: God hath made me to grow in the land of my poverty.',
  },
  'GEN 41:54': {
    rsv: 'and the seven years of famine began to come, as Joseph had said. There was famine in all lands; but in all the land of Egypt there was bread.',
    dra: 'The seven years of scarcity, which Joseph had foretold, began to come: and the famine prevailed in the whole world, but there was bread in all the land of Egypt.',
  },
  'GEN 41:55': {
    rsv: 'When all the land of Egypt was famished, the people cried to Pharaoh for bread; and Pharaoh said to all the Egyptians, “Go to Joseph; what he says to you, do.”',
    dra: 'And when there also they began to be famished, the people cried to Pharao for food. And he said to them: Go to Joseph: and do all that he shall say to you.',
  },
  'GEN 41:57': {
    rsv: 'Moreover, all the earth came to Egypt to Joseph to buy grain, because the famine was severe over all the earth.',
    dra: 'And all provinces came into Egypt, to buy food, and to seek some relief of their want.',
  },
  'JHN 2:5': {
    rsv: 'His mother said to the servants, “Do whatever he tells you.”',
    dra: 'His mother saith to the waiters: Whatsoever he shall say to you, do ye.',
  },
  'GEN 42:2': {
    rsv: 'And he said, “Behold, I have heard that there is grain in Egypt; go down and buy grain for us there, that we may live, and not die.”',
    dra: 'I have heard that wheat is sold in Egypt: go ye down, and buy us necessaries, that we may live, and not be consumed with want.',
  },
  'GEN 42:4': {
    rsv: 'But Jacob did not send Benjamin, Joseph’s brother, with his brothers, for he feared that harm might befall him.',
    dra: 'Whilst Benjamin was kept at home by Jacob, who said to his brethren: Lest perhaps he take any harm in the journey.',
  },
  'GEN 42:6': {
    rsv: 'Now Joseph was governor over the land; he it was who sold to all the people of the land. And Joseph’s brothers came, and bowed themselves before him with their faces to the ground.',
    dra: 'And Joseph was governor in the land of Egypt, and corn was sold by his direction to the people. And when his brethren had bowed down to him,',
  },
  'GEN 42:8': {
    rsv: 'Thus Joseph knew his brothers, but they did not know him.',
    dra: 'And though he knew his brethren, he was not known by them.',
  },
  'GEN 42:9': {
    rsv: 'And Joseph remembered the dreams which he had dreamed of them; and he said to them, “You are spies, you have come to see the weakness of the land.”',
    dra: 'And remembering the dreams, which formerly he had dreamed, he said to them: You are spies. You are come to view the weaker parts of the land.',
  },
  'GEN 42:21': {
    rsv: 'Then they said to one another, “In truth we are guilty concerning our brother, in that we saw the distress of his soul, when he besought us and we would not listen; therefore is this distress come upon us.”',
    dra: 'And they talked one to another: We deserve to suffer these things, because we have sinned against our brother, seeing the anguish of his soul, when he besought us, and we would not hear: therefore is this affliction come upon us.',
  },
  'GEN 42:24': {
    rsv: 'Then he turned away from them and wept; and he returned to them and spoke to them. And he took Simeon from them and bound him before their eyes.',
    dra: 'And he turned himself away a little while, and wept: and returning he spoke to them.',
  },
  'GEN 42:25': {
    rsv: 'And Joseph gave orders to fill their bags with grain, and to replace every man’s money in his sack, and to give them provisions for the journey. This was done for them.',
    dra: 'And taking Simeon, and binding him in their presence, he commanded his servants to fill their sacks with wheat, and to put every man\'s money again in their sacks, and to give them besides provisions for the way: and they did so.',
  },
  'GEN 42:28': {
    rsv: 'and he said to his brothers, “My money has been put back; here it is in the mouth of my sack!” At this their hearts failed them, and they turned trembling to one another, saying, “What is this that God has done to us?”',
    dra: 'And said to his brethren: My money is given me again, behold it is in the sack. And they were astonished, and troubled, and said to one another: What is this that God hath done unto us?',
  },
  'GEN 43:1': {
    rsv: 'Now the famine was severe in the land.',
    dra: 'In the mean time the famine was heavy upon all the land.',
  },
  'GEN 43:9': {
    rsv: 'I will be surety for him; of my hand you shall require him. If I do not bring him back to you and set him before you, then let me bear the blame for ever;',
    dra: 'I take the boy upon me, require him at my hand: unless I bring him again, and restore him to thee, I will be guilty of sin against thee for ever.',
  },
  'GEN 43:30': {
    rsv: 'Then Joseph made haste, for his heart yearned for his brother, and he sought a place to weep. And he entered his chamber and wept there.',
    dra: 'And he made haste because his heart was moved upon his brother, and tears gushed out: and going into his chamber he wept.',
  },
  'GEN 43:34': {
    rsv: 'Portions were taken to them from Joseph’s table, but Benjamin’s portion was five times as much as any of theirs. So they drank and were merry with him.',
    dra: 'Taking the messes which they received of him: and the greater mess came to Benjamin, so that it exceeded by five parts. And they drank, and were merry with him.',
  },
  'JHN 6:35': {
    rsv: 'Jesus said to them, “I am the bread of life; he who comes to me shall not hunger, and he who believes in me shall never thirst.',
    dra: 'And Jesus said to them: I am the bread of life: he that cometh to me shall not hunger: and he that believeth in me shall never thirst.',
  },
  'GEN 44:1': {
    rsv: 'Then he commanded the steward of his house, “Fill the men’s sacks with food, as much as they can carry, and put each man’s money in the mouth of his sack,',
    dra: 'And Joseph commanded the steward of his house, saying: Fill their sacks with corn, as much as they can hold: and put the money of every one in the top of his sack.',
  },
  'GEN 44:2': {
    rsv: 'and put my cup, the silver cup, in the mouth of the sack of the youngest, with his money for the grain.” And he did as Joseph told him.',
    dra: 'And in the mouth of the younger\'s sack put my silver cup, and the price which he gave for the wheat. And it was so done.',
  },
  'GEN 44:12': {
    rsv: 'And he searched, beginning with the eldest and ending with the youngest; and the cup was found in Benjamin’s sack.',
    dra: 'Which when he had searched, beginning at the eldest and ending at the youngest, he found the cup in Benjamin\'s sack.',
  },
  'GEN 44:13': {
    rsv: 'Then they rent their clothes, and every man loaded his ass, and they returned to the city.',
    dra: 'Then they rent their garments, and loading their asses again, returned into the town.',
  },
  'GEN 44:16': {
    rsv: 'And Judah said, “What shall we say to my lord? What shall we speak? Or how can we clear ourselves? God has found out the guilt of your servants; behold, we are my lord’s slaves, both we and he also in whose hand the cup has been found.”',
    dra: 'And Juda said to him: What shall we answer my lord? or what shall we say, or be able justly to allege? God hath found out the iniquity of thy servants: behold, we are all bondmen to my lord, both we, and he with whom the cup was found.',
  },
  'GEN 44:18': {
    rsv: 'Then Judah went up to him and said, “O my lord, let your servant, I pray you, speak a word in my lord’s ears, and let not your anger burn against your servant; for you are like Pharaoh himself.',
    dra: 'Then Juda coming nearer, said boldly: I beseech thee, my lord, let thy servant speak a word in thy ears, and be not angry with thy servant: for after Pharao thou art,',
  },
  'GEN 44:30': {
    rsv: 'Now therefore, when I come to your servant my father, and the lad is not with us, then, as his life is bound up in the lad’s life,',
    dra: 'Therefore if I shall go to thy servant our father, and the boy be wanting, (whereas his life dependeth upon the life of him,)',
  },
  'GEN 44:33': {
    rsv: 'Now therefore, let your servant, I pray you, remain instead of the lad as a slave to my lord; and let the lad go back with his brothers.',
    dra: 'Therefore I thy servant will stay instead of the boy in the service of my lord, and let the boy go up with his brethren.',
  },
  'GEN 44:34': {
    rsv: 'For how can I go back to my father if the lad is not with me? I fear to see the evil that would come upon my father.”',
    dra: 'For I cannot return to my father without the boy, lest I be a witness of the calamity that will oppress my father.',
  },
  'JHN 15:13': {
    rsv: 'Greater love has no man than this, that a man lay down his life for his friends.',
    dra: 'Greater love than this no man hath, that a man lay down his life for his friends.',
  },
  'GEN 45:1': {
    rsv: 'Then Joseph could not control himself before all those who stood by him; and he cried, “Make every one go out from me.” So no one stayed with him when Joseph made himself known to his brothers.',
    dra: 'Joseph could no longer refrain himself before many that stood by: whereupon he commanded that all should go out, and no stranger be present at their knowing one another.',
  },
  'GEN 45:2': {
    rsv: 'And he wept aloud, so that the Egyptians heard it, and the household of Pharaoh heard it.',
    dra: 'And he lifted up his voice with weeping, which the Egyptians and all the house of Pharao heard.',
  },
  'GEN 45:3': {
    rsv: 'And Joseph said to his brothers, “I am Joseph; is my father still alive?” But his brothers could not answer him, for they were dismayed at his presence.',
    dra: 'And he said to his brethren: I am Joseph: is my father yet living? His brethren could not answer him, being struck with exceeding great fear.',
  },
  'GEN 45:4': {
    rsv: 'So Joseph said to his brothers, “Come near to me, I pray you.” And they came near. And he said, “I am your brother, Joseph, whom you sold into Egypt.',
    dra: 'And he said mildly to them: Come nearer to me. And when they were come near him, he said: I am Joseph, your brother, whom you sold into Egypt.',
  },
  'GEN 45:5': {
    rsv: 'And now do not be distressed, or angry with yourselves, because you sold me here; for God sent me before you to preserve life.',
    dra: 'Be not afraid, and let it not seem to you a hard case that you sold me into these countries: for God sent me before you into Egypt for your preservation.',
  },
  'GEN 45:8': {
    rsv: 'So it was not you who sent me here, but God; and he has made me a father to Pharaoh, and lord of all his house and ruler over all the land of Egypt.',
    dra: 'Not by your counsel was I sent hither, but by the will of God: who hath made me as it were a father to Pharao, and lord of his whole house, and governor in all the land of Egypt.',
  },
  'GEN 45:14': {
    rsv: 'Then he fell upon his brother Benjamin’s neck and wept; and Benjamin wept upon his neck.',
    dra: 'And falling upon the neck of his brother Benjamin, he embraced him and wept: and Benjamin in like manner wept also on his neck.',
  },
  'GEN 45:15': {
    rsv: 'And he kissed all his brothers and wept upon them; and after that his brothers talked with him.',
    dra: 'And Joseph kissed all his brethren, and wept upon every one of them: after which they were emboldened to speak to him.',
  },
  'GEN 45:26': {
    rsv: 'And they told him, “Joseph is still alive, and he is ruler over all the land of Egypt.” And his heart fainted, for he did not believe them.',
    dra: 'And they told him, saying: Joseph thy son is living: and he is ruler in all the land of Egypt. Which when Jacob heard, he awaked as it were out of a deep sleep, yet did not believe them.',
  },
  'GEN 45:27': {
    rsv: 'But when they told him all the words of Joseph, which he had said to them, and when he saw the wagons which Joseph had sent to carry him, the spirit of their father Jacob revived;',
    dra: 'They, on the other side, told the whole order of the thing. And when he saw the wagons and all that he had sent his spirit revived,',
  },
  'GEN 45:28': {
    rsv: 'and Israel said, “It is enough; Joseph my son is still alive; I will go and see him before I die.”',
    dra: 'And he said: It is enough for me, if Joseph my son be yet living: I will go and see him before I die.',
  },
  'GEN 46:3': {
    rsv: 'Then he said, “I am God, the God of your father; do not be afraid to go down to Egypt; for I will there make of you a great nation.',
    dra: 'God said to him: I am the most mighty God of thy father: fear not, go down into Egypt, for I will make a great nation of thee there.',
  },
  'GEN 46:4': {
    rsv: 'I will go down with you to Egypt, and I will also bring you up again; and Joseph’s hand shall close your eyes.”',
    dra: 'I will go down with thee thither, and will bring thee back again from thence: Joseph also shall put his hands upon thy eyes.',
  },
  'GEN 46:29': {
    rsv: 'Then Joseph made ready his chariot and went up to meet Israel his father in Goshen; and he presented himself to him, and fell on his neck, and wept on his neck a good while.',
    dra: 'And when he was come thither, Joseph made ready his chariot, and went up to meet his father, in the same place: and seeing him, he fell upon his neck, and embracing him wept.',
  },
  'GEN 46:30': {
    rsv: 'Israel said to Joseph, “Now let me die, since I have seen your face and know that you are still alive.”',
    dra: 'And the father said to Joseph: Now shall I die with joy, because I have seen thy face, and leave thee alive.',
  },
  'LUK 23:34': {
    rsv: 'And Jesus said, “Father, forgive them; for they know not what they do.” And they cast lots to divide his garments.',
    dra: 'And Jesus said: Father, forgive them, for they know not what they do. But they, dividing his garments, cast lots.',
  },
  'GEN 47:7': {
    rsv: 'Then Joseph brought in Jacob his father, and set him before Pharaoh, and Jacob blessed Pharaoh.',
    dra: 'After this Joseph brought in his father to the king, and presented him before him: and he blessed him.',
  },
  'GEN 47:27': {
    rsv: 'Thus Israel dwelt in the land of Egypt, in the land of Goshen; and they gained possessions in it, and were fruitful and multiplied exceedingly.',
    dra: 'So Israel dwelt in Egypt, that is, in the land of Gessen, and possessed it: and grew, and was multiplied exceedingly.',
  },
  'GEN 48:14': {
    rsv: 'And Israel stretched out his right hand and laid it upon the head of Ephraim, who was the younger, and his left hand upon the head of Manasseh, crossing his hands, for Manasseh was the first-born.',
    dra: 'But he stretching forth his right hand, put it upon the head of Ephraim the younger brother; and the left upon the head of Manasses who was the elder, changing his hands.',
  },
  'GEN 48:16': {
    rsv: 'the angel who has redeemed me from all evil, bless the lads; and in them let my name be perpetuated, and the name of my fathers Abraham and Isaac; and let them grow into a multitude in the midst of the earth.”',
    dra: 'The angel that delivereth me from all evils, bless these boys: and let my name be called upon them, and the names of my fathers Abraham, and Isaac, and may they grow into a multitude upon the earth.',
  },
  'GEN 49:1': {
    rsv: 'Then Jacob called his sons, and said, “Gather yourselves together, that I may tell you what shall befall you in days to come.',
    dra: 'And Jacob called his sons, and said to them: Gather yourselves together that I may tell you the things that shall befall you in the last days.',
  },
  'GEN 49:9': {
    rsv: 'Judah is a lion’s whelp; from the prey, my son, you have gone up. He stooped down, he couched as a lion, and as a lioness; who dares rouse him up?',
    dra: 'Juda is a lion\'s whelp: to the prey, my son, thou art gone up: resting thou hast couched as a lion, and as a lioness, who shall rouse him?',
  },
  'GEN 49:10': {
    rsv: 'The scepter shall not depart from Judah, nor the ruler’s staff from between his feet, until he comes to whom it belongs; and to him shall be the obedience of the peoples.',
    dra: 'The sceptre shall not be taken away from Juda, nor a ruler from his thigh, till he come that is to be sent, and he shall be the expectation of nations.',
  },
  'GEN 49:28': {
    rsv: 'All these are the twelve tribes of Israel; and this is what their father said to them as he blessed them, blessing each with the blessing suitable to him.',
    dra: 'All these are the twelve tribes of Israel: these things their father spoke to them, and he blessed every one, with their proper blessings.',
  },
  'GEN 49:33': {
    rsv: 'When Jacob finished charging his sons, he drew up his feet into the bed, and breathed his last, and was gathered to his people.',
    dra: 'And when he had ended the commandments, wherewith he instructed his sons, he drew up his feet upon the bed, and died: and he was gathered to his people.',
  },
  'GEN 50:15': {
    rsv: 'When Joseph’s brothers saw that their father was dead, they said, “It may be that Joseph will hate us and pay us back for all the evil which we did to him.”',
    dra: 'Now he being dead, his brethren were afraid, and talked one with another: Lest perhaps he should remember the wrong he suffered, and requite us all the evil that we did to him.',
  },
  'GEN 50:19': {
    rsv: 'But Joseph said to them, “Fear not, for am I in the place of God?',
    dra: 'And he answered them: Fear not: can we resist the will of God?',
  },
  'GEN 50:20': {
    rsv: 'As for you, you meant evil against me; but God meant it for good, to bring it about that many people should be kept alive, as they are today.',
    dra: 'You thought evil against me: but God turned it into good, that he might exalt me, as at present you see, and might save many people.',
  },
  'GEN 50:21': {
    rsv: 'So do not fear; I will provide for you and your little ones.” Thus he reassured them and comforted them.',
    dra: 'Fear not: I will feed you and your children. And he comforted them, and spoke gently and mildly.',
  },
  'GEN 50:24': {
    rsv: 'And Joseph said to his brothers, “I am about to die; but God will visit you, and bring you up out of this land to the land which he swore to Abraham, to Isaac, and to Jacob.”',
    dra: 'After which he told his brethren: God will visit you after my death, and will make you go up out of this land, to the land which he swore to Abraham, Isaac, and Jacob.',
  },
  'GEN 50:25': {
    rsv: 'Then Joseph took an oath of the sons of Israel, saying, “God will visit you, and you shall carry up my bones from here.”',
    dra: 'And he made them swear to him, saying: God will visit you, carry my bones with you out of this place:',
  },
  'GEN 50:26': {
    rsv: 'So Joseph died, being a hundred and ten years old; and they embalmed him, and he was put in a coffin in Egypt.',
    dra: 'And he died being a hundred and ten years old. And being embalmed he was laid in a coffin in Egypt.',
  },
  'LUK 1:32': {
    rsv: 'He will be great, and will be called the Son of the Most High; and the Lord God will give to him the throne of his father David,',
    dra: 'He shall be great, and shall be called the Son of the most High; and the Lord God shall give unto him the throne of David his father; and he shall reign in the house of Jacob for ever.',
  },
  'LUK 1:33': {
    rsv: 'and he will reign over the house of Jacob for ever; and of his kingdom there will be no end.”',
    dra: 'And of his kingdom there shall be no end.',
  },
  // Level 6 · Job, with the verses its games quote. The Douay-Rheims numbers Job 16:19 as 16:20
  // and Job 40:4 as 39:34, and joins Mark 4:40–41 into one verse (only its second half is given).
  'JOB 1:1': {
    rsv: 'There was a man in the land of Uz, whose name was Job; and that man was blameless and upright, one who feared God, and turned away from evil.',
    dra: 'There was a man in the land of Hus, whose name was Job, and that man was simple and upright, and fearing God, and avoiding evil.',
  },
  'JOB 1:2': {
    rsv: 'There were born to him seven sons and three daughters.',
    dra: 'And there were born to him seven sons and three daughters.',
  },
  'JOB 1:3': {
    rsv: 'He had seven thousand sheep, three thousand camels, five hundred yoke of oxen, and five hundred she-asses, and very many servants; so that this man was the greatest of all the people of the east.',
    dra: 'And his possession was seven thousand sheep, and three thousand camels, and five hundred yoke of oxen, and five hundred she asses, and a family exceeding great: and this man was great among all the people of the east.',
  },
  'JOB 1:8': {
    rsv: 'And the LORD said to Satan, “Have you considered my servant Job, that there is none like him on the earth, a blameless and upright man, who fears God and turns away from evil?”',
    dra: 'And the Lord said to him: Hast thou considered my servant Job, that there is none like him in the earth, a simple and upright man, and fearing God, and avoiding evil?',
  },
  'JOB 1:9': {
    rsv: 'Then Satan answered the LORD, “Does Job fear God for nought?',
    dra: 'And Satan answering, said: Doth Job fear God in vain?',
  },
  'JOB 1:11': {
    rsv: 'But put forth thy hand now, and touch all that he has, and he will curse thee to thy face.”',
    dra: 'But stretch forth thy hand a little, and touch all that he hath, and see if he blesseth thee not to thy face.',
  },
  'JOB 1:12': {
    rsv: 'And the LORD said to Satan, “Behold, all that he has is in your power; only upon himself do not put forth your hand.” So Satan went forth from the presence of the LORD.',
    dra: 'Then the Lord said to Satan: Behold, all that he hath is in thy hand: only put not forth thy hand upon his person. And Satan went forth from the presence of the Lord.',
  },
  'JOB 1:20': {
    rsv: 'Then Job arose, and rent his robe, and shaved his head, and fell upon the ground, and worshiped.',
    dra: 'Then Job rose up, and rent his garments, and having shaven his head fell down upon the ground and worshipped,',
  },
  'JOB 1:21': {
    rsv: 'And he said, “Naked I came from my mother’s womb, and naked shall I return; the LORD gave, and the LORD has taken away; blessed be the name of the LORD.”',
    dra: 'And said: Naked came I out of my mother\'s womb, and naked shall I return thither: the Lord gave, and the Lord hath taken away: as it hath pleased the Lord so is it done: blessed be the name of the Lord.',
  },
  'JOB 1:22': {
    rsv: 'In all this Job did not sin or charge God with wrong.',
    dra: 'In all these things Job sinned not by his lips, nor spoke he any foolish thing against God.',
  },
  'JOB 2:8': {
    rsv: 'And he took a potsherd with which to scrape himself, and sat among the ashes.',
    dra: 'And he took a potsherd and scraped the corrupt matter, sitting on a dunghill.',
  },
  'JOB 2:9': {
    rsv: 'Then his wife said to him, “Do you still hold fast your integrity? Curse God, and die.”',
    dra: 'And his wife said to him: Dost thou still continue in thy simplicity? bless God and die.',
  },
  'JOB 2:10': {
    rsv: 'But he said to her, “You speak as one of the foolish women would speak. Shall we receive good at the hand of God, and shall we not receive evil?” In all this Job did not sin with his lips.',
    dra: 'And he said to her: Thou hast; spoken like one of the foolish women: if we have received good things at the hand of God, why should we not receive evil? In all these things Job did not sin with his lips.',
  },
  'LUK 22:31': {
    rsv: '“Simon, Simon, behold, Satan demanded to have you, that he might sift you like wheat,',
    dra: 'And the Lord said: Simon, Simon, behold Satan hath desired to have you, that he may sift you as wheat:',
  },
  'LUK 22:32': {
    rsv: 'but I have prayed for you that your faith may not fail; and when you have turned again, strengthen your brethren.”',
    dra: 'But I have prayed for thee, that thy faith fail not: and thou, being once converted, confirm thy brethren.',
  },
  'JOB 2:11': {
    rsv: 'Now when Job’s three friends heard of all this evil that had come upon him, they came each from his own place, Eliphaz the Temanite, Bildad the Shuhite, and Zophar the Naamathite. They made an appointment together to come to condole with him and comfort him.',
    dra: 'Now when Job\'s three friends heard all the evil that had befallen him, they came every one from his own place, Alphas the Themanite, and Baldad the Suhite, and Sophar the Naamathite. For they had made an appointment to come together and visit him, and comfort him.',
  },
  'JOB 2:12': {
    rsv: 'And when they saw him from afar, they did not recognize him; and they raised their voices and wept; and they rent their robes and sprinkled dust upon their heads toward heaven.',
    dra: 'And when they had lifted up their eyes afar off, they knew him not, and crying out they wept, and rending their garments they sprinkled dust upon their heads towards heaven.',
  },
  'JOB 2:13': {
    rsv: 'And they sat with him on the ground seven days and seven nights, and no one spoke a word to him, for they saw that his suffering was very great.',
    dra: 'And they sat with him on the ground seven days and seven nights, and no man spoke to him a word: for they saw that his grief was very great.',
  },
  'JOB 3:1': {
    rsv: 'After this Job opened his mouth and cursed the day of his birth.',
    dra: 'After this Job opened his mouth, and cursed his day,',
  },
  'JOB 3:3': {
    rsv: '“Let the day perish wherein I was born, and the night which said, ‘A man-child is conceived.’',
    dra: 'Let the day perish wherein I was born, and the night in which it was said: A man child is conceived.',
  },
  'JOB 3:20': {
    rsv: '“Why is light given to him that is in misery, and life to the bitter in soul,',
    dra: 'Why is light given to him that is in misery, and life to them that are in bitterness of soul?',
  },
  'JOB 3:24': {
    rsv: 'For my sighing comes as my bread, and my groanings are poured out like water.',
    dra: 'Before I eat I sigh: and as overflowing waters, so is my roaring:',
  },
  'JOB 3:26': {
    rsv: 'I am not at ease, nor am I quiet; I have no rest; but trouble comes.”',
    dra: 'Have I not dissembled? have I not kept silence? have I not been quiet? and indignation is come upon me.',
  },
  'MAT 27:46': {
    rsv: 'And about the ninth hour Jesus cried with a loud voice, “Eli, Eli, lama sabach-thani?” that is, “My God, my God, why hast thou forsaken me?”',
    dra: 'And about the ninth hour Jesus cried with a loud voice, saying: Eli, Eli, lamma sabacthani? that is, My God, my God, why hast thou forsaken me?',
  },
  'JOB 4:7': {
    rsv: '“Think now, who that was innocent ever perished? Or where were the upright cut off?',
    dra: 'Remember, I pray thee, who ever perished being innocent? or when were the just destroyed?',
  },
  'JOB 4:8': {
    rsv: 'As I have seen, those who plow iniquity and sow trouble reap the same.',
    dra: 'On the contrary I have seen those who work iniquity, and sow sorrows, and reap them,',
  },
  'JOB 8:3': {
    rsv: 'Does God pervert justice? Or does the Almighty pervert the right?',
    dra: 'Doth God pervert judgment, or doth the Almighty overthrow that which is just?',
  },
  'JOB 11:6': {
    rsv: 'and that he would tell you the secrets of wisdom! For he is manifold in understanding. Know then that God exacts of you less than your guilt deserves.',
    dra: 'That he might shew thee the secrets of wisdom, and that his law is manifold, and thou mightest understand that he exacteth much less of thee, than thy iniquity deserveth.',
  },
  'JOB 16:19': {
    rsv: 'Even now, behold, my witness is in heaven, and he that vouches for me is on high.',
    dra: 'For behold my witness is in heaven, and he that knoweth my conscience is on high.',
  },
  'JOB 23:10': {
    rsv: 'But he knows the way that I take; when he has tried me, I shall come forth as gold.',
    dra: 'But he knoweth my way, and has tried me as gold that passeth through the fire:',
  },
  'JHN 9:2': {
    rsv: 'And his disciples asked him, “Rabbi, who sinned, this man or his parents, that he was born blind?”',
    dra: 'And his disciples asked him: Rabbi, who hath sinned, this man, or his parents, that he should be born blind?',
  },
  'JHN 9:3': {
    rsv: 'Jesus answered, “It was not that this man sinned, or his parents, but that the works of God might be made manifest in him.',
    dra: 'Jesus answered: Neither hath this man sinned, nor his parents; but that the works of God should be made manifest in him.',
  },
  'JOB 19:23': {
    rsv: '“Oh that my words were written! Oh that they were inscribed in a book!',
    dra: 'Who will grant me that my words may be written? Who will grant me that they may be marked down in a book?',
  },
  'JOB 19:24': {
    rsv: 'Oh that with an iron pen and lead they were graven in the rock for ever!',
    dra: 'With an iron pen and in a plate of lead, or else be graven with an instrument in flint stone.',
  },
  'JOB 19:25': {
    rsv: 'For I know that my Redeemer lives, and at last he will stand upon the earth;',
    dra: 'For I know that my Redeemer liveth, and in the last day I shall rise out of the earth.',
  },
  'JOB 19:26': {
    rsv: 'and after my skin has been thus destroyed, then from my flesh I shall see God,',
    dra: 'And I shall be clothed again with my skin, and in my flesh I will see my God.',
  },
  'JOB 19:27': {
    rsv: 'whom I shall see on my side, and my eyes shall behold, and not another. My heart faints within me!',
    dra: 'Whom I myself shall see, and my eyes shall behold, and not another: this my hope is laid up in my bosom.',
  },
  'JHN 11:25': {
    rsv: 'Jesus said to her, “I am the resurrection and the life; he who believes in me, though he die, yet shall he live,',
    dra: 'Jesus said to her: I am the resurrection and the life: he that believeth in me, although he be dead, shall live:',
  },
  'JOB 38:1': {
    rsv: 'Then the LORD answered Job out of the whirlwind:',
    dra: 'Then the Lord answered Job out of a whirlwind, and said:',
  },
  'JOB 38:4': {
    rsv: '“Where were you when I laid the foundation of the earth? Tell me, if you have understanding.',
    dra: 'Where wast thou when I laid up the foundations of the earth? tell me if thou hast understanding.',
  },
  'JOB 38:7': {
    rsv: 'when the morning stars sang together, and all the sons of God shouted for joy?',
    dra: 'When the morning stars praised me together, and all the sons of God made a joyful melody?',
  },
  'JOB 38:8': {
    rsv: '“Or who shut in the sea with doors, when it burst forth from the womb;',
    dra: 'Who shut up the sea with doors, when it broke forth as issuing out of the womb:',
  },
  'JOB 38:11': {
    rsv: 'and said, ‘Thus far shall you come, and no farther, and here shall your proud waves be stayed’?',
    dra: 'And I said: Hitherto thou shalt come, and shalt go no further, and here thou shalt break thy swelling waves.',
  },
  'JOB 38:41': {
    rsv: 'Who provides for the raven its prey, when its young ones cry to God, and wander about for lack of food?',
    dra: 'Who provideth food for the raven, when her young ones cry to God, wandering about, because they have no meat?',
  },
  'JOB 40:4': {
    rsv: '“Behold, I am of small account; what shall I answer thee? I lay my hand on my mouth.',
    dra: 'What can I answer, who hath spoken inconsiderately? I will lay my hand upon my mouth.',
  },
  'JOB 42:2': {
    rsv: '“I know that thou canst do all things, and that no purpose of thine can be thwarted.',
    dra: 'I know that thou canst do all things, and no thought is hid from thee.',
  },
  'JOB 42:5': {
    rsv: 'I had heard of thee by the hearing of the ear, but now my eye sees thee;',
    dra: 'With the hearing of the ear, I have heard thee, but now my eye seeth thee.',
  },
  'MRK 4:39': {
    rsv: 'And he awoke and rebuked the wind, and said to the sea, “Peace! Be still!” And the wind ceased, and there was a great calm.',
    dra: 'And rising up, he rebuked the wind, and said to the sea: Peace, be still. And the wind ceased: and there was made a great calm.',
  },
  'MRK 4:41': {
    rsv: 'And they were filled with awe, and said to one another, “Who then is this, that even wind and sea obey him?”',
    dra: '…And they feared exceedingly: and they said one to another: Who is this (thinkest thou) that both wind and sea obey him?',
  },
  'JOB 42:7': {
    rsv: 'After the LORD had spoken these words to Job, the LORD said to Eliphaz the Temanite: “My wrath is kindled against you and against your two friends; for you have not spoken of me what is right, as my servant Job has.',
    dra: 'And after the Lord had spoken these words to Job, he said to Eliphaz the Themanite: My wrath is kindled against thee, and against thy two friends, because you have not spoken the thing that is right before me, as my servant Job hath.',
  },
  'JOB 42:8': {
    rsv: 'Now therefore take seven bulls and seven rams, and go to my servant Job, and offer up for yourselves a burnt offering; and my servant Job shall pray for you, for I will accept his prayer not to deal with you according to your folly; for you have not spoken of me what is right, as my servant Job has.”',
    dra: 'Take unto you therefore seven oxen, and seven rams, and go to my servant Job, and offer for yourselves a holocaust: and my servant Job shall pray for you: his face I will accept, that folly be not imputed to you: for you have not spoken right things before me, as my servant Job hath.',
  },
  'JOB 42:10': {
    rsv: 'And the LORD restored the fortunes of Job, when he had prayed for his friends; and the LORD gave Job twice as much as he had before.',
    dra: 'The Lord also was turned at the penance of Job, when he prayed for his friends. And the Lord gave Job twice as much as he had before.',
  },
  'JOB 42:12': {
    rsv: 'And the LORD blessed the latter days of Job more than his beginning; and he had fourteen thousand sheep, six thousand camels, a thousand yoke of oxen, and a thousand she-asses.',
    dra: 'And the Lord blessed the latter end of Job more than his beginning. And he had fourteen thousand sheep, and six thousand camels, and a thousand yoke of oxen, and a thousand she asses.',
  },
  'JOB 42:13': {
    rsv: 'He had also seven sons and three daughters.',
    dra: 'And he had seven sons, and three daughters.',
  },
  'JOB 42:14': {
    rsv: 'And he called the name of the first Jemimah; and the name of the second Keziah; and the name of the third Keren-happuch.',
    dra: 'And he called the names of one Dies, and the name of the second Cassia, and the name of the third Cornustibil.',
  },
  'JOB 42:16': {
    rsv: 'And after this Job lived a hundred and forty years, and saw his sons, and his sons’ sons, four generations.',
    dra: 'And Job lived after these things, a hundred and forty years, and he saw his children, and his children\'s children, unto the fourth generation, and he died an old man, and full of days.',
  },
  'JAS 5:11': {
    rsv: 'Behold, we call those happy who were steadfast. You have heard of the steadfastness of Job, and you have seen the purpose of the Lord, how the Lord is compassionate and merciful.',
    dra: 'Behold, we account them blessed who have endured. You have heard of the patience of Job, and you have seen the end of the Lord, that the Lord is merciful and compassionate.',
  },
  'JOB 5:17': {
    rsv: '…happy is the man whom God reproves…',
    dra: 'Blessed is the man whom God correcteth…',
    partial: true,
  },
  'JOB 38:22': {
    rsv: 'Have you entered the storehouses of the snow…',
    dra: 'Hast thou entered into the storehouses of the snow…',
    partial: true,
  },
  'JOB 38:31': {
    rsv: '“Can you bind the chains of the Pleiades, or loose the cords of Orion?',
    dra: 'Shalt thou be able to join together the shining stars the Pleiades, or canst thou stop the turning about of Arcturus?',
  },
  'JOB 38:39': {
    rsv: 'Can you hunt the prey for the lion…',
    dra: 'Wilt thou take the prey for the lioness…',
    partial: true,
  },
  'JOB 39:19': {
    rsv: 'Do you give the horse his might?…',
    dra: 'Wilt thou give strength to the horse…',
    partial: true,
  },
  'JOB 39:27': {
    rsv: 'Is it at your command that the eagle mounts up…',
    dra: 'Will the eagle mount up at thy command…',
    partial: true,
  },
  // Level 7 · Moses Is Called, with the verses its games quote.
  'EXO 1:7': {
    rsv: 'But the descendants of Israel were fruitful and increased greatly; they multiplied and grew exceedingly strong; so that the land was filled with them.',
    dra: 'The children of Israel increased, and sprung up into multitudes, and growing exceedingly strong they filled the land.',
  },
  'EXO 1:8': {
    rsv: 'Now there arose a new king over Egypt, who did not know Joseph.',
    dra: 'In the mean time there arose a new king over Egypt, that knew not Joseph:',
  },
  'EXO 1:9': {
    rsv: 'And he said to his people, “Behold, the people of Israel are too many and too mighty for us.',
    dra: 'And he said to his people: Behold the people of the children of Israel are numerous and stronger than we.',
  },
  'EXO 1:11': {
    rsv: 'Therefore they set taskmasters over them to afflict them with heavy burdens; and they built for Pharaoh store-cities, Pithom and Raamses.',
    dra: 'Therefore he set over them masters of the works, to afflict them with burdens, and they built for Pharao cities of tabernacles, Phithom and Ramesses.',
  },
  'EXO 1:12': {
    rsv: 'But the more they were oppressed, the more they multiplied and the more they spread abroad. And the Egyptians were in dread of the people of Israel.',
    dra: 'But the more they oppressed them, the more they were multiplied, and increased:',
  },
  'EXO 1:14': {
    rsv: 'and made their lives bitter with hard service, in mortar and brick, and in all kinds of work in the field; in all their work they made them serve with rigor.',
    dra: 'And they made their life bitter with hard works in clay, and brick, and with all manner of service, wherewith they were overcharged in the works of the earth.',
  },
  'EXO 1:17': {
    rsv: 'But the midwives feared God, and did not do as the king of Egypt commanded them, but let the male children live.',
    dra: 'But the midwives feared God, and did not do as the king of Egypt had commanded, but saved the men children.',
  },
  'EXO 1:18': {
    rsv: 'So the king of Egypt called the midwives, and said to them, “Why have you done this, and let the male children live?”',
    dra: 'And the king called for them and said: What is that you meant to do, that you would save the men children?',
  },
  'EXO 1:19': {
    rsv: 'The midwives said to Pharaoh, “Because the Hebrew women are not like the Egyptian women; for they are vigorous and are delivered before the midwife comes to them.”',
    dra: 'They answered: The Hebrew women are not as the Egyptian women: for they themselves are skillful in the office of a midwife; and they are delivered before we come to them.',
  },
  'EXO 1:20': {
    rsv: 'So God dealt well with the midwives; and the people multiplied and grew very strong.',
    dra: 'Therefore God dealt well with the midwives: and the people multiplied and grew exceedingly strong.',
  },
  'EXO 1:21': {
    rsv: 'And because the midwives feared God he gave them families.',
    dra: 'And because the midwives feared God, he built them houses.',
  },
  'EXO 1:22': {
    rsv: 'Then Pharaoh commanded all his people, “Every son that is born to the Hebrews you shall cast into the Nile, but you shall let every daughter live.”',
    dra: 'Pharao therefore charged all his people, saying: Whatsoever shall be born of the male sex, ye shall cast into the river: whatsoever of the female, ye shall save alive.',
  },
  'MAT 2:13': {
    rsv: 'Now when they had departed, behold, an angel of the Lord appeared to Joseph in a dream and said, “Rise, take the child and his mother, and flee to Egypt, and remain there till I tell you; for Herod is about to search for the child, to destroy him.”',
    dra: 'And after they were departed, behold an angel of the Lord appeared in sleep to Joseph, saying: Arise, and take the child and his mother, and fly into Egypt: and be there until I shall tell thee. For it will come to pass that Herod will seek the child to destroy him.',
  },
  'MAT 2:16': {
    rsv: 'Then Herod, when he saw that he had been tricked by the wise men, was in a furious rage, and he sent and killed all the male children in Bethlehem and in all that region who were two years old or under, according to the time which he had ascertained from the wise men.',
    dra: 'Then Herod perceiving that he was deluded by the wise men, was exceeding angry; and sending killed all the men children that were in Bethlehem, and in all the borders thereof, from two years old and under, according to the time which he had diligently inquired of the wise men.',
  },
  'EXO 2:1': {
    rsv: 'Now a man from the house of Levi went and took to wife a daughter of Levi.',
    dra: 'After this there went a man of the house of Levi; and took a wife of his own kindred.',
  },
  'EXO 2:2': {
    rsv: 'The woman conceived and bore a son; and when she saw that he was a goodly child, she hid him three months.',
    dra: 'And she conceived, and bore a son; and seeing him a goodly child hid him three months.',
  },
  'EXO 2:3': {
    rsv: 'And when she could hide him no longer she took for him a basket made of bulrushes, and daubed it with bitumen and pitch; and she put the child in it and placed it among the reeds at the river’s brink.',
    dra: 'And when she could hide him no longer, she took a basket made of bulrushes, and daubed it with slime and pitch: and put the little babe therein, and laid him in the sedges by the river\'s brink,',
  },
  'EXO 2:4': {
    rsv: 'And his sister stood at a distance, to know what would be done to him.',
    dra: 'His sister standing afar off, and taking notice what would be done.',
  },
  'EXO 2:5': {
    rsv: 'Now the daughter of Pharaoh came down to bathe at the river, and her maidens walked beside the river; she saw the basket among the reeds and sent her maid to fetch it.',
    dra: 'And behold the daughter of Pharao came down to wash herself in the river: and her maids walked by the river\'s brink. And when she saw the basket in the sedges, she sent one of her maids for it: and when it was brought,',
  },
  'EXO 2:6': {
    rsv: 'When she opened it she saw the child; and lo, the babe was crying. She took pity on him and said, “This is one of the Hebrews’ children.”',
    dra: 'She opened it and seeing within it an infant crying, having compassion on it she said: This is one of the babes of the Hebrews.',
  },
  'EXO 2:7': {
    rsv: 'Then his sister said to Pharaoh’s daughter, “Shall I go and call you a nurse from the Hebrew women to nurse the child for you?”',
    dra: 'And the child\'s sister said to her Shall I go and call to thee a Hebrew woman, to nurse the babe?',
  },
  'EXO 2:8': {
    rsv: 'And Pharaoh’s daughter said to her, “Go.” So the girl went and called the child’s mother.',
    dra: 'She answered: Go. The maid went and called her mother.',
  },
  'EXO 2:9': {
    rsv: 'And Pharaoh’s daughter said to her, “Take this child away, and nurse him for me, and I will give you your wages.” So the woman took the child and nursed him.',
    dra: 'And Pharao\'s daughter said to her. Take this child and nurse him for me: I will give thee thy wages. The woman took, and nursed the child: and when he was grown up, she delivered him to Pharao\'s daughter.',
  },
  'EXO 2:10': {
    rsv: 'And the child grew, and she brought him to Pharaoh’s daughter, and he became her son; and she named him Moses, for she said, “Because I drew him out of the water.”',
    dra: 'And she adopted him for a son, and called him Moses, saying: Because I took him out of the water.',
  },
  'GAL 4:4': {
    rsv: 'But when the time had fully come, God sent forth his Son, born of woman, born under the law,',
    dra: 'But when the fulness of the time was come, God sent his Son, made of a woman, made under the law:',
  },
  'GAL 4:5': {
    rsv: 'to redeem those who were under the law, so that we might receive adoption as sons.',
    dra: 'That he might redeem them who were under the law: that we might receive the adoption of sons.',
  },
  'EXO 2:11': {
    rsv: 'One day, when Moses had grown up, he went out to his people and looked on their burdens; and he saw an Egyptian beating a Hebrew, one of his people.',
    dra: 'In those days after Moses was grown up, he went out to his brethren: and saw their affliction, and an Egyptian striking one of the Hebrews his brethren.',
  },
  'EXO 2:13': {
    rsv: 'When he went out the next day, behold, two Hebrews were struggling together; and he said to the man that did the wrong, “Why do you strike your fellow?”',
    dra: 'And going out the next day, he saw two Hebrews quarrelling: and he said to him that did the wrong: Why strikest thou thy neighbour?',
  },
  'EXO 2:14': {
    rsv: 'He answered, “Who made you a prince and a judge over us? Do you mean to kill me as you killed the Egyptian?” Then Moses was afraid, and thought, “Surely the thing is known.”',
    dra: 'But he answered: Who hath appointed thee prince and judge over us: wilt thou kill me, as thou didst yesterday kill the Egyptian? Moses feared, and said: How is this come to be known?',
  },
  'EXO 2:15': {
    rsv: 'When Pharaoh heard of it, he sought to kill Moses. But Moses fled from Pharaoh, and stayed in the land of Midian; and he sat down by a well.',
    dra: 'And Pharao heard of this word and sought to kill Moses: but he fled from his sight, and abode in the land of Madian, and he sat down by a well.',
  },
  'EXO 2:16': {
    rsv: 'Now the priest of Midian had seven daughters; and they came and drew water, and filled the troughs to water their father’s flock.',
    dra: 'And the priest of Madian had seven daughters, who came to draw water: and when the troughs were filled, desired to water their father\'s flocks.',
  },
  'EXO 2:17': {
    rsv: 'The shepherds came and drove them away; but Moses stood up and helped them, and watered their flock.',
    dra: 'And the shepherds came and drove them away: and Moses arose, and defending the maids, watered their sheep.',
  },
  'EXO 2:19': {
    rsv: 'They said, “An Egyptian delivered us out of the hand of the shepherds, and even drew water for us and watered the flock.”',
    dra: 'They answered: A man of Egypt delivered us from the hands of the shepherds: and he drew water also with us, and gave the sheep to drink.',
  },
  'EXO 2:20': {
    rsv: 'He said to his daughters, “And where is he? Why have you left the man? Call him, that he may eat bread.”',
    dra: 'But he said: Where is he? why have you let the man go? call him that he may eat bread.',
  },
  'EXO 2:22': {
    rsv: 'She bore a son, and he called his name Gershom; for he said, “I have been a sojourner in a foreign land.”',
    dra: 'And she bore him a son, whom he called Gersam, saying: I have been a stranger in a foreign country. And she bore another, whom he called Eliezer, saying: For the God of my father, my helper hath delivered me out of the hand of Pharao.',
  },
  'EXO 2:23': {
    rsv: 'In the course of those many days the king of Egypt died. And the people of Israel groaned under their bondage, and cried out for help, and their cry under bondage came up to God.',
    dra: 'Now after a long time the king of Egypt died: and the children of Israel groaning, cried out because of the works: and their cry went up unto God from the works.',
  },
  'EXO 2:24': {
    rsv: 'And God heard their groaning, and God remembered his covenant with Abraham, with Isaac, and with Jacob.',
    dra: 'And he heard their groaning, and remembered the covenant which he made with Abraham, Isaac, and Jacob.',
  },
  'EXO 2:25': {
    rsv: 'And God saw the people of Israel, and God knew their condition.',
    dra: 'And the Lord looked upon the children of Israel, and he knew them.',
  },
  'ACT 7:35': {
    rsv: '“This Moses whom they refused, saying, ‘Who made you a ruler and a judge?’ God sent as both ruler and deliverer by the hand of the angel that appeared to him in the bush.',
    dra: 'This Moses, whom they refused, saying: Who hath appointed thee prince and judge? him God sent to be prince and redeemer by the hand of the angel who appeared to him in the bush.',
  },
  'JHN 1:11': {
    rsv: 'He came to his own home, and his own people received him not.',
    dra: 'He came unto his own, and his own received him not.',
  },
  'EXO 3:1': {
    rsv: 'Now Moses was keeping the flock of his father-in-law, Jethro, the priest of Midian; and he led his flock to the west side of the wilderness, and came to Horeb, the mountain of God.',
    dra: 'Now Moses fed the sheep of Jethro his father in law, the priest of Madian: and he drove the flock to the inner parts of the desert, and came to the mountain of God, Horeb.',
  },
  'EXO 3:2': {
    rsv: 'And the angel of the LORD appeared to him in a flame of fire out of the midst of a bush; and he looked, and lo, the bush was burning, yet it was not consumed.',
    dra: 'And the Lord appeared to him in a flame of fire out of the midst of a bush: and he saw that the bush was on fire and was not burnt.',
  },
  'EXO 3:3': {
    rsv: 'And Moses said, “I will turn aside and see this great sight, why the bush is not burnt.”',
    dra: 'And Moses said: I will go and see this great sight, why the bush is not burnt.',
  },
  'EXO 3:4': {
    rsv: 'When the LORD saw that he turned aside to see, God called to him out of the bush, “Moses, Moses!” And he said, “Here am I.”',
    dra: 'And when the Lord saw that he went forward to see, he called to him out of the midst of the bush, and said: Moses, Moses. And he answered: Here I am.',
  },
  'EXO 3:5': {
    rsv: 'Then he said, “Do not come near; put off your shoes from your feet, for the place on which you are standing is holy ground.”',
    dra: 'And he said: Come not nigh hither, put off the shoes from thy feet: for the place whereon thou standest is holy ground.',
  },
  'EXO 3:6': {
    rsv: 'And he said, “I am the God of your father, the God of Abraham, the God of Isaac, and the God of Jacob.” And Moses hid his face, for he was afraid to look at God.',
    dra: 'And he said: I am the God of thy father, the God of Abraham, the God of Isaac, and the God of Jacob. Moses hid his face: for he durst not look at God.',
  },
  'EXO 3:7': {
    rsv: 'Then the LORD said, “I have seen the affliction of my people who are in Egypt, and have heard their cry because of their taskmasters; I know their sufferings,',
    dra: 'And the Lord said to him: I have seen the affliction of my people in Egypt, and I have heard their cry because of the rigour of them that are over the works:',
  },
  'EXO 3:8': {
    rsv: 'and I have come down to deliver them out of the hand of the Egyptians, and to bring them up out of that land to a good and broad land, a land flowing with milk and honey…',
    dra: '…I am come down to deliver them out of the hands of the Egyptians, and to bring them out of that land into a good and spacious land, into a land that floweth with milk and honey…',
    partial: true,
  },
  'EXO 3:10': {
    rsv: 'Come, I will send you to Pharaoh that you may bring forth my people, the sons of Israel, out of Egypt.”',
    dra: 'But come, and I will send thee to Pharao, that thou mayst bring forth my people, the children of Israel out of Egypt.',
  },
  'EXO 3:11': {
    rsv: 'But Moses said to God, “Who am I that I should go to Pharaoh, and bring the sons of Israel out of Egypt?”',
    dra: 'And Moses said to God: Who am I that I should go to Pharao, and should bring forth the children of Israel out of Egypt?',
  },
  'EXO 3:12': {
    rsv: 'He said, “But I will be with you; and this shall be the sign for you, that I have sent you: when you have brought forth the people out of Egypt, you shall serve God upon this mountain.”',
    dra: 'And he said to him: I will be with thee: and this thou shalt have for a sign, that I have sent thee: When thou shalt have brought my people out of Egypt, thou shalt offer sacrifice to God upon this mountain.',
  },
  'EXO 3:13': {
    rsv: 'Then Moses said to God, “If I come to the people of Israel and say to them, ‘The God of your fathers has sent me to you,’ and they ask me, ‘What is his name?’ what shall I say to them?”',
    dra: 'Moses said to God: Lo, I shall go to the children of Israel, and say to them: The God of your fathers hath sent me to you. If they should say to me: What is his name? what shall I say to them?',
  },
  'EXO 3:14': {
    rsv: 'God said to Moses, “I AM WHO I AM.” And he said, “Say this to the people of Israel, ‘I AM has sent me to you.’”',
    dra: 'God said to Moses: I AM WHO AM. He said: Thus shalt thou say to the children of Israel: HE WHO IS, hath sent me to you.',
  },
  'EXO 4:1': {
    rsv: 'Then Moses answered, “But behold, they will not believe me or listen to my voice, for they will say, ‘The LORD did not appear to you.’”',
    dra: 'Moses answered and said: They will not believe me, nor hear my voice, but they will say: The Lord hath not appeared to thee.',
  },
  'EXO 4:2': {
    rsv: 'The LORD said to him, “What is that in your hand?” He said, “A rod.”',
    dra: 'Then he said to him: What is that thou holdest in thy hand? He answered: A rod.',
  },
  'EXO 4:3': {
    rsv: 'And he said, “Cast it on the ground.” So he cast it on the ground, and it became a serpent; and Moses fled from it.',
    dra: 'And the Lord said: Cast it down upon the ground. He cast it down, and it was turned into a serpent: so that Moses fled from it.',
  },
  'EXO 4:10': {
    rsv: 'But Moses said to the LORD, “Oh, my Lord, I am not eloquent, either heretofore or since thou hast spoken to thy servant; but I am slow of speech and of tongue.”',
    dra: 'Moses said: I beseech thee, Lord. I am not eloquent from yesterday and the day before: and since thou hast spoken to thy servant, I have more impediment and slowness of tongue.',
  },
  'EXO 4:12': {
    rsv: 'Now therefore go, and I will be with your mouth and teach you what you shall speak.”',
    dra: 'Go therefore and I will be in thy mouth: and I will teach thee what thou shalt speak.',
  },
  'EXO 4:17': {
    rsv: 'And you shall take in your hand this rod, with which you shall do the signs.”',
    dra: 'And take this rod in thy hand, wherewith thou shalt do the signs.',
  },
  'JHN 8:58': {
    rsv: 'Jesus said to them, “Truly, truly, I say to you, before Abraham was, I am.”',
    dra: 'Jesus said to them: Amen, amen I say to you, before Abraham was made, I am.',
  },
  'EXO 4:18': {
    rsv: 'Moses went back to Jethro his father-in-law and said to him, “Let me go back, I pray, to my kinsmen in Egypt and see whether they are still alive.” And Jethro said to Moses, “Go in peace.”',
    dra: 'Moses went his way, and returned to Jethro his father in law and said to him: I will go and return to my brethren into Egypt, that I may see if they be yet alive. And Jethro said to him: Go in peace.',
  },
  'EXO 4:19': {
    rsv: 'And the LORD said to Moses in Midian, “Go back to Egypt; for all the men who were seeking your life are dead.”',
    dra: 'And the Lord said to Moses, in Madian: Go, and return into Egypt: for they are all dead that sought thy life.',
  },
  'EXO 4:20': {
    rsv: 'So Moses took his wife and his sons and set them on an ass, and went back to the land of Egypt; and in his hand Moses took the rod of God.',
    dra: 'Moses therefore took his wife, and his sons, and set them upon an ass: and returned into Egypt, carrying the rod of God in his hand.',
  },
  'EXO 4:27': {
    rsv: 'The LORD said to Aaron, “Go into the wilderness to meet Moses.” So he went, and met him at the mountain of God and kissed him.',
    dra: 'And the Lord said to Aaron: Go into the desert to meet Moses. And he went forth to meet him in the mountain of God, and kissed him.',
  },
  'EXO 4:28': {
    rsv: 'And Moses told Aaron all the words of the LORD with which he had sent him, and all the signs which he had charged him to do.',
    dra: 'And Moses told Aaron all the words of the Lord, by which he had sent him, and the signs that he had commanded.',
  },
  'EXO 4:29': {
    rsv: 'Then Moses and Aaron went and gathered together all the elders of the people of Israel.',
    dra: 'And they came together, and they assembled all the ancients of the children of Israel.',
  },
  'EXO 4:30': {
    rsv: 'And Aaron spoke all the words which the LORD had spoken to Moses, and did the signs in the sight of the people.',
    dra: 'And Aaron spoke all the words which the Lord had said to Moses: and he wrought the signs before the people,',
  },
  'EXO 4:31': {
    rsv: 'And the people believed; and when they heard that the LORD had visited the people of Israel and that he had seen their affliction, they bowed their heads and worshiped.',
    dra: 'And the people believed. And they heard that the Lord had visited the children of Israel: and that he had looked upon their affliction: and falling down they adored.',
  },
  'MAT 2:20': {
    rsv: '“Rise, take the child and his mother, and go to the land of Israel, for those who sought the child’s life are dead.”',
    dra: 'Saying: Arise, and take the child and his mother, and go into the land of Israel. For they are dead that sought the life of the child.',
  },
  'EXO 4:4': {
    rsv: 'But the LORD said to Moses, “Put out your hand, and take it by the tail”—so he put out his hand and caught it, and it became a rod in his hand—',
    dra: 'And the Lord said: Put out thy hand and take it by the tail. He put forth his hand, and took hold of it, and it was turned into a rod.',
  },
  'EXO 4:6': {
    rsv: 'Again, the LORD said to him, “Put your hand into your bosom.” And he put his hand into his bosom; and when he took it out, behold, his hand was leprous, as white as snow.',
    dra: 'And the Lord said again: Put thy hand into thy bosom. And when he had put it into his bosom, he brought it forth leprous as snow.',
  },
  'EXO 4:7': {
    rsv: 'Then God said, “Put your hand back into your bosom.” So he put his hand back into his bosom; and when he took it out, behold, it was restored like the rest of his flesh.',
    dra: 'And he said: Put back thy hand into thy bosom. He put it back, and brought it out again, and it was like the other flesh.',
  },
  'EXO 4:9': {
    rsv: 'If they will not believe even these two signs or heed your voice, you shall take some water from the Nile and pour it upon the dry ground; and the water which you shall take from the Nile will become blood upon the dry ground.”',
    dra: 'But if they will not even believe these two signs, nor hear thy voice: take of the river water, and pour it out upon the dry land, and whatsoever thou drawest out of the river shall be turned into blood.',
  },
  // Level 8 · The Plagues and the Passover (Exodus 12:27's “LORD’s” corrected from the download's “LORD’S”).
  'EXO 5:1': {
    rsv: 'Afterward Moses and Aaron went to Pharaoh and said, “Thus says the LORD, the God of Israel, ‘Let my people go, that they may hold a feast to me in the wilderness.’”',
    dra: 'After these things Moses and Aaron went in, and said to Pharao: Thus saith the Lord God of Israel: Let my people go that they may sacrifice to me in the desert.',
  },
  'EXO 5:2': {
    rsv: 'But Pharaoh said, “Who is the LORD, that I should heed his voice and let Israel go? I do not know the LORD, and moreover I will not let Israel go.”',
    dra: 'But he answered: Who is the Lord, that I should hear his voice, and let Israel go? I know not the Lord, neither will I let Israel go.',
  },
  'EXO 5:4': {
    rsv: 'But the king of Egypt said to them, “Moses and Aaron, why do you take the people away from their work? Get to your burdens.”',
    dra: 'The king of Egypt said to them: Why do you Moses and Aaron draw off the people from their works? Get you gone to your burdens.',
  },
  'EXO 6:2': {
    rsv: 'And God said to Moses, “I am the LORD.',
    dra: 'And the Lord spoke to Moses, saying: I am the Lord,',
  },
  'EXO 6:6': {
    rsv: 'Say therefore to the people of Israel, ‘I am the LORD, and I will bring you out from under the burdens of the Egyptians, and I will deliver you from their bondage, and I will redeem you with an outstretched arm and with great acts of judgment,',
    dra: 'Therefore say to the children of Israel: I am the Lord who will bring you out from the work prison of the Egyptians, and will deliver you from bondage: and redeem you with a high arm, and great judgments.',
  },
  'EXO 6:7': {
    rsv: 'and I will take you for my people, and I will be your God; and you shall know that I am the LORD your God, who has brought you out from under the burdens of the Egyptians.',
    dra: 'And I will take you to myself for my people, I will be your God: and you shall know that I am the Lord your God who brought you out from the work prison of the Egyptians.',
  },
  'EXO 6:9': {
    rsv: 'Moses spoke thus to the people of Israel; but they did not listen to Moses, because of their broken spirit and their cruel bondage.',
    dra: 'And Moses told all this to the children of Israel: but they did not hearken to him, for anguish of spirit, and most painful work.',
  },
  'EXO 7:10': {
    rsv: 'So Moses and Aaron went to Pharaoh and did as the LORD commanded; Aaron cast down his rod before Pharaoh and his servants, and it became a serpent.',
    dra: 'So Moses and Aaron went in unto Pharao, and did as the Lord had commanded. And Aaron took the rod before Pharao, and his servants, and it was turned into a serpent.',
  },
  'EXO 7:11': {
    rsv: 'Then Pharaoh summoned the wise men and the sorcerers; and they also, the magicians of Egypt, did the same by their secret arts.',
    dra: 'And Pharao called the wise men and the magicians: and they also by Egyptian enchantments and certain secrets did in like manner.',
  },
  'EXO 7:12': {
    rsv: 'For every man cast down his rod, and they became serpents. But Aaron’s rod swallowed up their rods.',
    dra: 'And they every one cast down their rods, and they were turned into serpents: but Aaron\'s rod devoured their rods.',
  },
  'EXO 7:13': {
    rsv: 'Still Pharaoh’s heart was hardened, and he would not listen to them; as the LORD had said.',
    dra: 'And Pharao\'s heart was hardened, and he did not hearken to them, as the Lord had commanded.',
  },
  'JHN 8:34': {
    rsv: 'Jesus answered them, “Truly, truly, I say to you, every one who commits sin is a slave to sin.',
    dra: 'Jesus answered them: Amen, amen I say unto you: that whosoever committeth sin, is the servant of sin.',
  },
  'JHN 8:36': {
    rsv: 'So if the Son makes you free, you will be free indeed.',
    dra: 'If therefore the son shall make you free, you shall be free indeed.',
  },
  'EXO 5:6': {
    rsv: 'The same day Pharaoh commanded the taskmasters of the people and their foremen,',
    dra: 'Therefore he commanded the same day the overseers of the works, and the taskmasters of the people, saying:',
  },
  'EXO 5:7': {
    rsv: '“You shall no longer give the people straw to make bricks, as heretofore; let them go and gather straw for themselves.',
    dra: 'You shall give straw no more to the people to make brick, as before: but let them go and gather straw.',
  },
  'EXO 5:9': {
    rsv: 'Let heavier work be laid upon the men that they may labor at it and pay no regard to lying words.”',
    dra: 'Let them be oppressed, with works, and let them fulfill them: that they may not regard lying words.',
  },
  'EXO 5:12': {
    rsv: 'So the people were scattered abroad throughout all the land of Egypt, to gather stubble for straw.',
    dra: 'And the people was scattered through all the land of Egypt to gather straw.',
  },
  'EXO 5:13': {
    rsv: 'The taskmasters were urgent, saying, “Complete your work, your daily task, as when there was straw.”',
    dra: 'And the overseers of the works pressed them, saying: Fulfill your work every day as before you were wont to do when straw was given you.',
  },
  'EXO 5:15': {
    rsv: 'Then the foremen of the people of Israel came and cried to Pharaoh, “Why do you deal thus with your servants?',
    dra: 'And the officers of the children of Israel came, and cried out to Pharao, saying: Why dealest thou so with thy servants?',
  },
  'EXO 5:17': {
    rsv: 'But he said, “You are idle, you are idle; therefore you say, ‘Let us go and sacrifice to the LORD.’',
    dra: 'And he said: You are idle, and therefore you say: Let us go and sacrifice to the Lord.',
  },
  'EXO 5:21': {
    rsv: 'and they said to them, “The LORD look upon you and judge, because you have made us offensive in the sight of Pharaoh and his servants, and have put a sword in their hand to kill us.”',
    dra: 'And they said to them: The Lord see and judge, because you have made our savour to stink before Pharao and his servants, and you have given him a sword to kill us.',
  },
  'EXO 5:22': {
    rsv: 'Then Moses turned again to the LORD and said, “O LORD, why hast thou done evil to this people? Why didst thou ever send me?',
    dra: 'And Moses returned to the Lord, and said: Lord, why hast thou afflicted this people? wherefore hast thou sent me?',
  },
  'EXO 5:23': {
    rsv: 'For since I came to Pharaoh to speak in thy name, he has done evil to this people, and thou hast not delivered thy people at all.”',
    dra: 'For since the time that I went in to Pharao to speak in thy name, he hath afflicted thy people: and thou hast not delivered them.',
  },
  'EXO 6:1': {
    rsv: 'But the LORD said to Moses, “Now you shall see what I will do to Pharaoh; for with a strong hand he will send them out, yea, with a strong hand he will drive them out of his land.”',
    dra: 'And the Lord said to Moses: Now thou shalt see what I will do to Pharao: for by a mighty hand shall he let them go, and with a strong hand shall he cast them out of his land.',
  },
  'MAT 11:28': {
    rsv: 'Come to me, all who labor and are heavy laden, and I will give you rest.',
    dra: 'Come to me, all you that labour, and are burdened, and I will refresh you.',
  },
  'MAT 11:29': {
    rsv: 'Take my yoke upon you, and learn from me; for I am gentle and lowly in heart, and you will find rest for your souls.',
    dra: 'Take up my yoke upon you, and learn of me, because I am meek, and humble of heart: and you shall find rest to your souls.',
  },
  'EXO 7:16': {
    rsv: 'And you shall say to him, ‘The LORD, the God of the Hebrews, sent me to you, saying, “Let my people go, that they may serve me in the wilderness; and behold, you have not yet obeyed.”',
    dra: 'And thou shalt say to him: The Lord God of the Hebrews sent me to thee saying: Let my people go to sacrifice to me in the desert: and hitherto thou wouldst not hear.',
  },
  'EXO 7:20': {
    rsv: 'Moses and Aaron did as the LORD commanded; in the sight of Pharaoh and in the sight of his servants, he lifted up the rod and struck the water that was in the Nile, and all the water that was in the Nile turned to blood.',
    dra: 'And Moses and Aaron did as the Lord had commanded: and lifting up the rod he struck the water of the river before Pharao and his servants: and it was turned into blood.',
  },
  'EXO 7:21': {
    rsv: 'And the fish in the Nile died; and the Nile became foul, so that the Egyptians could not drink water from the Nile; and there was blood throughout all the land of Egypt.',
    dra: 'And the fishes that were in the river died: and the river corrupted, and the Egyptians could not drink the water of the river, and there was blood in all the land of Egypt.',
  },
  'EXO 7:23': {
    rsv: 'Pharaoh turned and went into his house, and he did not lay even this to heart.',
    dra: 'And he turned himself away and went into his house, neither did he set his heart to it this time also.',
  },
  'EXO 8:6': {
    rsv: 'So Aaron stretched out his hand over the waters of Egypt; and the frogs came up and covered the land of Egypt.',
    dra: 'And Aaron stretched forth his hand upon the waters of Egypt, and the frogs came up, and covered the land of Egypt.',
  },
  'EXO 8:19': {
    rsv: 'And the magicians said to Pharaoh, “This is the finger of God.” But Pharaoh’s heart was hardened, and he would not listen to them; as the LORD had said.',
    dra: 'And the magicians said to Pharao This is the finger of God. And Pharao heart was hardened, and he hearkened not unto them, as the Lord had commanded.',
  },
  'EXO 8:22': {
    rsv: 'But on that day I will set apart the land of Goshen, where my people dwell, so that no swarms of flies shall be there; that you may know that I am the LORD in the midst of the earth.',
    dra: 'And I will make the land of Gessen wherein my people is, wonderful in that lay, so that flies shall not be there: and thou shalt know that I am the Lord in the midst of the earth.',
  },
  'EXO 10:22': {
    rsv: 'So Moses stretched out his hand toward heaven, and there was thick darkness in all the land of Egypt three days;',
    dra: 'And Moses stretch forth his hand towards heaven: and there came horrible darkness in all the land of Egypt for three days.',
  },
  'EXO 10:23': {
    rsv: 'they did not see one another, nor did any rise from his place for three days; but all the people of Israel had light where they dwelt.',
    dra: 'No man saw his brother, nor moved himself out of the place where he was: but wheresoever the children of Israel dwelt there was light.',
  },
  'EXO 9:27': {
    rsv: 'Then Pharaoh sent, and called Moses and Aaron, and said to them, “I have sinned this time; the LORD is in the right, and I and my people are in the wrong.',
    dra: 'And Pharao sent and called Moses and Aaron, saying to them: I have sinned this time also; the Lord is just: I and my people are wicked.',
  },
  'EXO 10:28': {
    rsv: 'Then Pharaoh said to him, “Get away from me; take heed to yourself; never see my face again; for in the day you see my face you shall die.”',
    dra: 'And Pharao said to Moses: Get thee from me, and beware thou see not my face any more: in what day soever thou shalt come in my sight, thou shalt die.',
  },
  'EXO 10:29': {
    rsv: 'Moses said, “As you say! I will not see your face again.”',
    dra: 'Moses answered: So shall it be as thou hast spoken, I will not see thy face any more.',
  },
  'JHN 2:9': {
    rsv: 'When the steward of the feast tasted the water now become wine, and did not know where it came from (though the servants who had drawn the water knew), the steward of the feast called the bridegroom',
    dra: 'And when the chief steward had tasted the water made wine, and knew not whence it was, but the waiters knew who had drawn the water; the chief steward calleth the bridegroom,',
  },
  'JHN 2:11': {
    rsv: 'This, the first of his signs, Jesus did at Cana in Galilee, and manifested his glory; and his disciples believed in him.',
    dra: 'This beginning of miracles did Jesus in Cana of Galilee; and manifested his glory, and his disciples believed in him.',
  },
  'EXO 11:1': {
    rsv: 'The LORD said to Moses, “Yet one plague more I will bring upon Pharaoh and upon Egypt; afterwards he will let you go hence; when he lets you go, he will drive you away completely.',
    dra: 'And the Lord said to Moses: Yet one plague more will I bring upon Pharao and Egypt, and after that he shall let you go and thrust you out.',
  },
  'EXO 11:7': {
    rsv: 'But against any of the people of Israel, either man or beast, not a dog shall growl; that you may know that the LORD makes a distinction between the Egyptians and Israel.',
    dra: 'But with all the children of Israel there shall not a dog make the least noise, from man even to beast: that you may know how wonderful a difference the Lord maketh between the Egyptians and Israel.',
  },
  'EXO 12:3': {
    rsv: 'Tell all the congregation of Israel that on the tenth day of this month they shall take every man a lamb according to their fathers’ houses, a lamb for a household;',
    dra: 'Speak ye to the whole assembly of the children of Israel, and say to them: On the tenth day of this month let every man take a lamb by their families and houses.',
  },
  'EXO 12:5': {
    rsv: 'Your lamb shall be without blemish, a male a year old; you shall take it from the sheep or from the goats;',
    dra: 'And it shall be a lamb without blemish, a male, of one year: according to which rite also you shall take a kid.',
  },
  'EXO 12:7': {
    rsv: 'Then they shall take some of the blood, and put it on the two doorposts and the lintel of the houses in which they eat them.',
    dra: 'And they shall take of the blood thereof, and put it upon both the side posts, and on the upper door posts of the houses, wherein they shall eat it.',
  },
  'EXO 12:8': {
    rsv: 'They shall eat the flesh that night, roasted; with unleavened bread and bitter herbs they shall eat it.',
    dra: 'And they shall eat the flesh that night roasted at the fire, and unleavened bread with wild lettuce.',
  },
  'EXO 12:11': {
    rsv: 'In this manner you shall eat it: your loins girded, your sandals on your feet, and your staff in your hand; and you shall eat it in haste. It is the LORD’s passover.',
    dra: 'And thus you shall eat it: you shall gird your reins, and you shall have shoes on your feet, holding staves in your hands, and you shall eat in haste: for it is the Phase (that is the Passage) of the Lord.',
  },
  'EXO 12:13': {
    rsv: 'The blood shall be a sign for you, upon the houses where you are; and when I see the blood, I will pass over you, and no plague shall fall upon you to destroy you, when I smite the land of Egypt.',
    dra: 'And the blood shall be unto you for a sign in the houses where you shall be: and I shall see the blood, and shall pass over you: and the plague shall not be upon you to destroy you, when I shall strike the land of Egypt.',
  },
  'EXO 12:21': {
    rsv: 'Then Moses called all the elders of Israel, and said to them, “Select lambs for yourselves according to your families, and kill the passover lamb.',
    dra: 'And Moses called all the ancients of the children of Israel, and said to them: Go take a lamb by your families, and sacrifice the Phase.',
  },
  'EXO 12:28': {
    rsv: 'Then the people of Israel went and did so; as the LORD had commanded Moses and Aaron, so they did.',
    dra: 'And the children of Israel going forth did as the Lord had commanded Moses and Aaron.',
  },
  '1CO 5:7': {
    rsv: 'Cleanse out the old leaven that you may be a new lump, as you really are unleavened. For Christ, our paschal lamb, has been sacrificed.',
    dra: 'Purge out the old leaven, that you may be a new paste, as you are unleavened. For Christ our pasch is sacrificed.',
  },
  'EXO 12:31': {
    rsv: 'And he summoned Moses and Aaron by night, and said, “Rise up, go forth from among my people, both you and the people of Israel; and go, serve the LORD, as you have said.',
    dra: 'And Pharao calling Moses and Aaron, in the night, said: Arise and go forth from among my people, you and the children of Israel: go, sacrifice to the Lord as you say.',
  },
  'EXO 12:32': {
    rsv: 'Take your flocks and your herds, as you have said, and be gone; and bless me also!”',
    dra: 'Your sheep and herds take along with you, as you demanded, and departing, bless me.',
  },
  'EXO 12:34': {
    rsv: 'So the people took their dough before it was leavened, their kneading bowls being bound up in their mantles on their shoulders.',
    dra: 'The people therefore took dough before it was leavened: and tying it in their cloaks, put it on their shoulders.',
  },
  'EXO 12:37': {
    rsv: 'And the people of Israel journeyed from Rameses to Succoth, about six hundred thousand men on foot, besides women and children.',
    dra: 'And the children of Israel set forward from Ramesse to Socoth, being about six hundred thousand men on foot, beside children.',
  },
  'EXO 12:38': {
    rsv: 'A mixed multitude also went up with them, and very many cattle, both flocks and herds.',
    dra: 'And a mixed multitude without number went up also with them, sheep and herds and beasts of divers kinds, exceeding many.',
  },
  'EXO 12:40': {
    rsv: 'The time that the people of Israel dwelt in Egypt was four hundred and thirty years.',
    dra: 'And the abode of the children of Israel that they made in Egypt, was four hundred and thirty years.',
  },
  'EXO 12:41': {
    rsv: 'And at the end of four hundred and thirty years, on that very day, all the hosts of the LORD went out from the land of Egypt.',
    dra: 'Which being expired, the same day all the army of the Lord went forth out of the land of Egypt.',
  },
  'EXO 12:42': {
    rsv: 'It was a night of watching by the LORD, to bring them out of the land of Egypt; so this same night is a night of watching kept to the LORD by all the people of Israel throughout their generations.',
    dra: 'This is the observable night of the Lord, when he brought them forth out of the land of Egypt: this night all the children of Israel must observe in their generations.',
  },
  'EXO 13:21': {
    rsv: 'And the LORD went before them by day in a pillar of cloud to lead them along the way, and by night in a pillar of fire to give them light, that they might travel by day and by night;',
    dra: 'And the Lord went before them to shew the way by day in a pillar of a cloud, and by night in a pillar of fire: that he might be the guide of their journey at both times.',
  },
  'EXO 13:22': {
    rsv: 'the pillar of cloud by day and the pillar of fire by night did not depart from before the people.',
    dra: 'There never failed the pillar of the cloud by day, nor the pillar of fire by night, before the people.',
  },
  'LUK 9:30': {
    rsv: 'And behold, two men talked with him, Moses and Elijah,',
    dra: 'And behold two men were talking with him. And they were Moses and Elias,',
  },
  'LUK 9:31': {
    rsv: 'who appeared in glory and spoke of his departure, which he was to accomplish at Jerusalem.',
    dra: 'Appearing in majesty. And they spoke of his decease that he should accomplish in Jerusalem.',
  },
  'EXO 12:14': {
    rsv: '“This day shall be for you a memorial day, and you shall keep it as a feast to the LORD; throughout your generations you shall observe it as an ordinance for ever.',
    dra: 'And this day shall be for a memorial to you: and you shall keep it a feast to the Lord in your generations with an everlasting observance.',
  },
  'EXO 12:17': {
    rsv: 'And you shall observe the feast of unleavened bread, for on this very day I brought your hosts out of the land of Egypt: therefore you shall observe this day, throughout your generations, as an ordinance for ever.',
    dra: 'And you shall observe the feast of the unleavened bread: for in this same day I will bring forth your army out of the land of Egypt, and you shall keep this day in your generations by a perpetual observance.',
  },
  'EXO 13:3': {
    rsv: 'And Moses said to the people, “Remember this day, in which you came out from Egypt, out of the house of bondage, for by strength of hand the LORD brought you out from this place; no leavened bread shall be eaten.',
    dra: 'And Moses said to the people: Remember this day in which you came forth out of Egypt, and out of the house of bondage, for with a strong hand hath the Lord brought you forth out of this place: that you eat no leavened bread.',
  },
  'EXO 13:8': {
    rsv: 'And you shall tell your son on that day, ‘It is because of what the LORD did for me when I came out of Egypt.’',
    dra: 'And thou shalt tell thy son in that day, saying: This is what the Lord did to me when I came forth out of Egypt.',
  },
  'EXO 12:26': {
    rsv: 'And when your children say to you, ‘What do you mean by this service?’',
    dra: 'And when your children shall say to you: What is the meaning of this service?',
  },
  'EXO 12:27': {
    rsv: 'you shall say, ‘It is the sacrifice of the LORD’s passover, for he passed over the houses of the people of Israel in Egypt, when he slew the Egyptians but spared our houses.’” And the people bowed their heads and worshiped.',
    dra: 'You shall say to them: It is the victim of the passage of the Lord, when he passed over the houses of the children of Israel in Egypt, striking the Egyptians, and saving our houses. And the people bowing themselves, adored.',
  },
  'EXO 13:14': {
    rsv: 'And when in time to come your son asks you, ‘What does this mean?’ you shall say to him, ‘By strength of hand the LORD brought us out of Egypt, from the house of bondage.',
    dra: 'And when thy son shall ask thee to morrow, saying: What is this? thou shalt answer him: With a strong hand did the Lord bring us forth out of the land of Egypt, out of the house of bondage.',
  },
  'LUK 22:19': {
    rsv: 'And he took bread, and when he had given thanks he broke it and gave it to them, saying, “This is my body which is given for you. Do this in remembrance of me.”',
    dra: 'And taking bread, he gave thanks, and brake; and gave to them, saying: This is my body, which is given for you. Do this for a commemoration of me.',
  },
  // Level 9 · Through the Sea (the RSV's pronunciation marks in names, like Am′alek, left out).
  'EXO 14:5': {
    rsv: 'When the king of Egypt was told that the people had fled, the mind of Pharaoh and his servants was changed toward the people, and they said, “What is this we have done, that we have let Israel go from serving us?”',
    dra: 'And it was told the king of the Egyptians that the people was fled: and the heart of Pharao and of his servants was changed with regard to the people, and they said: What meant we to do, that we let Israel go from serving us?',
  },
  'EXO 14:6': {
    rsv: 'So he made ready his chariot and took his army with him,',
    dra: 'So he made ready his chariot, and took all his people with him.',
  },
  'EXO 14:7': {
    rsv: 'and took six hundred picked chariots and all the other chariots of Egypt with officers over all of them.',
    dra: 'And he took six hundred chosen chariots, and all the chariots that were in Egypt: and the captains of the whole army.',
  },
  'EXO 14:10': {
    rsv: 'When Pharaoh drew near, the people of Israel lifted up their eyes, and behold, the Egyptians were marching after them; and they were in great fear. And the people of Israel cried out to the LORD;',
    dra: 'And when Pharao drew near, the children of Israel, lifting up their eyes, saw the Egyptians behind them: and they feared exceedingly, and cried to the Lord.',
  },
  'EXO 14:11': {
    rsv: 'and they said to Moses, “Is it because there are no graves in Egypt that you have taken us away to die in the wilderness? What have you done to us, in bringing us out of Egypt?',
    dra: 'And they said to Moses: Perhaps there were no graves in Egypt, therefore thou hast brought us to die in the wilderness: why wouldst thou do this, to lead us out of Egypt?',
  },
  'EXO 14:13': {
    rsv: 'And Moses said to the people, “Fear not, stand firm, and see the salvation of the LORD, which he will work for you today; for the Egyptians whom you see today, you shall never see again.',
    dra: 'And Moses said to the people: Fear not: stand and see the great wonders of the Lord, which he will do this day: for the Egyptians, whom you see now, you shall see no more for ever.',
  },
  'EXO 14:14': {
    rsv: 'The LORD will fight for you, and you have only to be still.”',
    dra: 'The Lord will fight for you, and you shall hold your peace.',
  },
  'EXO 14:19': {
    rsv: 'Then the angel of God who went before the host of Israel moved and went behind them; and the pillar of cloud moved from before them and stood behind them,',
    dra: 'And the angel of God, who went before the camp of Israel, removing, went behind them: and together with him the pillar of the cloud, leaving the forepart,',
  },
  'EXO 14:20': {
    rsv: 'coming between the host of Egypt and the host of Israel. And there was the cloud and the darkness; and the night passed without one coming near the other all night.',
    dra: 'Stood behind, between the Egyptians\' camp and the camp of Israel: and it was a dark cloud, and enlightening the night, so that they could not come at one another all the night.',
  },
  'MAT 14:25': {
    rsv: 'And in the fourth watch of the night he came to them, walking on the sea.',
    dra: 'And in the fourth watch of the night, he came to them walking upon the sea.',
  },
  'MAT 14:27': {
    rsv: 'But immediately he spoke to them, saying, “Take heart, it is I; have no fear.”',
    dra: 'And immediately Jesus spoke to them, saying: Be of good heart: it is I, fear ye not.',
  },
  'EXO 14:15': {
    rsv: 'The LORD said to Moses, “Why do you cry to me? Tell the people of Israel to go forward.',
    dra: 'And the Lord said to Moses: Why criest thou to me? Speak to the children of Israel to go forward.',
  },
  'EXO 14:16': {
    rsv: 'Lift up your rod, and stretch out your hand over the sea and divide it, that the people of Israel may go on dry ground through the sea.',
    dra: 'But lift thou up thy rod, and stretch forth thy hand over the sea, and divide it: that the children of Israel may go through the midst of the sea on dry ground.',
  },
  'EXO 14:21': {
    rsv: 'Then Moses stretched out his hand over the sea; and the LORD drove the sea back by a strong east wind all night, and made the sea dry land, and the waters were divided.',
    dra: 'And when Moses had stretched forth his hand over the sea, the Lord took it away by a strong and burning wind blowing all the night, and turned it into dry ground: and the water was divided.',
  },
  'EXO 14:22': {
    rsv: 'And the people of Israel went into the midst of the sea on dry ground, the waters being a wall to them on their right hand and on their left.',
    dra: 'And the children of Israel went in through the midst of the sea dried up: for the water was as a wall on their right hand and on their left.',
  },
  'EXO 14:25': {
    rsv: 'clogging their chariot wheels so that they drove heavily; and the Egyptians said, “Let us flee from before Israel; for the LORD fights for them against the Egyptians.”',
    dra: 'And overthrew the wheels of the chariots, and they were carried into the deep. And the Egyptians said: Let us flee from Israel: for the Lord fighteth for them against us.',
  },
  'EXO 14:26': {
    rsv: 'Then the LORD said to Moses, “Stretch out your hand over the sea, that the water may come back upon the Egyptians, upon their chariots, and upon their horsemen.”',
    dra: 'And the Lord said to Moses: Stretch forth they hand over the sea, that the waters may come again upon the Egyptians, upon their chariots and horsemen.',
  },
  'EXO 14:28': {
    rsv: 'The waters returned and covered the chariots and the horsemen and all the host of Pharaoh that had followed them into the sea; not so much as one of them remained.',
    dra: 'And the waters returned, and covered the chariots and the horsemen of all the army of Pharao, who had come into the sea after them, neither did there so much as one of them remain.',
  },
  'EXO 14:29': {
    rsv: 'But the people of Israel walked on dry ground through the sea, the waters being a wall to them on their right hand and on their left.',
    dra: 'But the children of Israel marched through the midst of the sea upon dry land, and the waters were to them as a wall on the right hand and on the left:',
  },
  'EXO 14:31': {
    rsv: 'And Israel saw the great work which the LORD did against the Egyptians, and the people feared the LORD; and they believed in the LORD and in his servant Moses.',
    dra: 'And they saw the Egyptians dead upon the sea shore, and the mighty hand that the Lord had used against them: and the people feared the Lord, and they believed the Lord, and Moses his servant.',
  },
  '1CO 10:1': {
    rsv: 'I want you to know, brethren, that our fathers were all under the cloud, and all passed through the sea,',
    dra: 'For I would not have you ignorant, brethren, that our fathers were all under the cloud, and all passed through the sea.',
  },
  '1CO 10:2': {
    rsv: 'and all were baptized into Moses in the cloud and in the sea,',
    dra: 'And all in Moses were baptized, in the cloud, and in the sea:',
  },
  'EXO 15:1': {
    rsv: 'Then Moses and the people of Israel sang this song to the LORD, saying, “I will sing to the LORD, for he has triumphed gloriously; the horse and his rider he has thrown into the sea.',
    dra: 'Then Moses and the children of Israel sung this canticle to the Lord: and said: Let us sing to the Lord: for he is gloriously magnified, the horse and the rider he hath thrown into the sea.',
  },
  'EXO 15:2': {
    rsv: 'The LORD is my strength and my song, and he has become my salvation; this is my God, and I will praise him, my father’s God, and I will exalt him.',
    dra: 'The Lord is my strength and my praise, and he is become salvation to me: he is my God and I will glorify him: the God of my father, and I will exalt him.',
  },
  'EXO 15:11': {
    rsv: '“Who is like thee, O LORD, among the gods? Who is like thee, majestic in holiness, terrible in glorious deeds, doing wonders?',
    dra: 'Who is like to thee, among the strong, O Lord? who is like to thee, glorious in holiness, terrible and praiseworthy, doing wonders?',
  },
  'EXO 15:20': {
    rsv: 'Then Miriam, the prophetess, the sister of Aaron, took a timbrel in her hand; and all the women went out after her with timbrels and dancing.',
    dra: 'So Mary the prophetess, the sister of Aaron, took a timbrel in her hand: and all the women went forth after her with timbrels and with dances:',
  },
  'EXO 15:21': {
    rsv: 'And Miriam sang to them: “Sing to the LORD, for he has triumphed gloriously; the horse and his rider he has thrown into the sea.”',
    dra: 'And she began the song to them, saying: Let us sing to the Lord, for he is gloriously magnified, the horse and his rider he hath thrown into the sea.',
  },
  'EXO 15:13': {
    rsv: '“Thou hast led in thy steadfast love the people whom thou hast redeemed, thou hast guided them by thy strength to thy holy abode.',
    dra: 'In thy mercy thou hast been a leader to the people which thou hast redeemed: and in thy strength thou hast carried them to thy holy habitation.',
  },
  'EXO 15:17': {
    rsv: 'Thou wilt bring them in, and plant them on thy own mountain, the place, O LORD, which thou hast made for thy abode, the sanctuary, O LORD, which thy hands have established.',
    dra: 'Thou shalt bring them in, and plant them in the mountain of thy inheritance, in thy most firm habitation which thou hast made, O Lord; thy sanctuary, O Lord, which thy hands have established.',
  },
  'EXO 15:18': {
    rsv: 'The LORD will reign for ever and ever.”',
    dra: 'The Lord shall reign for ever and ever.',
  },
  'REV 15:2': {
    rsv: 'And I saw what appeared to be a sea of glass mingled with fire, and those who had conquered the beast and its image and the number of its name, standing beside the sea of glass with harps of God in their hands.',
    dra: 'And I saw as it were a sea of glass mingled with fire, and them that had overcome the beast, and his image, and the number of his name, standing on the sea of glass, having the harps of God:',
  },
  'REV 15:3': {
    rsv: 'And they sing the song of Moses, the servant of God, and the song of the Lamb, saying, “Great and wonderful are thy deeds, O Lord God the Almighty! Just and true are thy ways, O King of the ages!',
    dra: 'And singing the canticle of Moses, the servant of God, and the canticle of the Lamb, saying: Great and wonderful are thy works, O Lord God Almighty; just and true are thy ways, O King of ages.',
  },
  'EXO 15:22': {
    rsv: 'Then Moses led Israel onward from the Red Sea, and they went into the wilderness of Shur; they went three days in the wilderness and found no water.',
    dra: 'And Moses brought Israel from the Red Sea, and they went forth into the wilderness of Sur: and they marched three days through the wilderness, and found no water.',
  },
  'EXO 15:23': {
    rsv: 'When they came to Marah, they could not drink the water of Marah because it was bitter; therefore it was named Marah.',
    dra: 'And they came into Mara, and they could not drink the waters of Mara, because they were bitter: whereupon he gave a name also agreeable to the place, calling it Mara, that is, bitterness.',
  },
  'EXO 15:25': {
    rsv: 'And he cried to the LORD; and the LORD showed him a tree, and he threw it into the water, and the water became sweet.…',
    dra: 'But he cried to the Lord, and he shewed him a tree, which when he had cast into the waters, they were turned into sweetness.…',
    partial: true,
  },
  'EXO 15:27': {
    rsv: 'Then they came to Elim, where there were twelve springs of water and seventy palm trees; and they encamped there by the water.',
    dra: 'And the children of Israel came into Elim, where there were twelve fountains of water, and seventy palm trees: and they encamped by the waters.',
  },
  'EXO 16:2': {
    rsv: 'And the whole congregation of the people of Israel murmured against Moses and Aaron in the wilderness,',
    dra: 'And all the congregation of the children of Israel murmured against Moses and Aaron in the wilderness.',
  },
  'EXO 16:3': {
    rsv: 'and said to them, “Would that we had died by the hand of the LORD in the land of Egypt, when we sat by the fleshpots and ate bread to the full; for you have brought us out into this wilderness to kill this whole assembly with hunger.”',
    dra: 'And the children of Israel said to them: Would to God we had died by the hand of the Lord in the land of Egypt, when we sat over the flesh pots, and ate bread to the full. Why have you brought us into this desert, that you might destroy all the multitude with famine?',
  },
  'EXO 16:4': {
    rsv: 'Then the LORD said to Moses, “Behold, I will rain bread from heaven for you; and the people shall go out and gather a day’s portion every day, that I may prove them, whether they will walk in my law or not.',
    dra: 'And the Lord said to Moses: Behold I will rain bread from heaven for you: let the people go forth, and gather what is sufficient for every day: that I may prove them whether they will walk in my law, or not.',
  },
  'EXO 16:13': {
    rsv: 'In the evening quails came up and covered the camp; and in the morning dew lay round about the camp.',
    dra: 'So it came to pass in the evening, that quails coming up, covered the camp: and in the morning, a dew lay round about the camp.',
  },
  'EXO 16:14': {
    rsv: 'And when the dew had gone up, there was on the face of the wilderness a fine, flake-like thing, fine as hoarfrost on the ground.',
    dra: 'And when it had covered the face of the earth, it appeared in the wilderness small, and as it were beaten with a pestle, like unto the hoar frost on the ground.',
  },
  'EXO 16:15': {
    rsv: 'When the people of Israel saw it, they said to one another, “What is it?” For they did not know what it was. And Moses said to them, “It is the bread which the LORD has given you to eat.',
    dra: 'And when the children of Israel saw it, they said one to another: Manhu! which signifieth: What is this! for they knew not what it was. And Moses said to them: This is the bread, which the Lord hath given you to eat.',
  },
  'EXO 16:16': {
    rsv: 'This is what the LORD has commanded: ‘Gather of it, every man of you, as much as he can eat; you shall take an omer apiece, according to the number of the persons whom each of you has in his tent.’”',
    dra: 'This is the word, that the Lord hath commanded: Let every one gather of it as much as is enough to eat: a gomor for every man, according to the number of your souls that dwell in a tent, so shall you take of it.',
  },
  'EXO 16:18': {
    rsv: 'But when they measured it with an omer, he that gathered much had nothing over, and he that gathered little had no lack; each gathered according to what he could eat.',
    dra: 'And they measured by the measure of a gomor: neither had he more that had gathered more: nor did he find less that had provided less: but every one had gathered, according to what they were able to eat.',
  },
  'EXO 16:21': {
    rsv: 'Morning by morning they gathered it, each as much as he could eat; but when the sun grew hot, it melted.',
    dra: 'Now every one of them gathered in the morning, as much as might suffice to eat: and after the sun grew hot, it melted.',
  },
  'EXO 16:31': {
    rsv: 'Now the house of Israel called its name manna; it was like coriander seed, white, and the taste of it was like wafers made with honey.',
    dra: 'And the house of Israel called the name thereof Manna: and it was like coriander seed white, and the taste thereof like to flour with honey.',
  },
  'EXO 16:33': {
    rsv: 'And Moses said to Aaron, “Take a jar, and put an omer of manna in it, and place it before the LORD, to be kept throughout your generations.”',
    dra: 'And Moses said to Aaron: Take a vessel, and put manna into it, as much as a gomor can hold: and lay it up before the Lord to keep unto your generations,',
  },
  'EXO 16:35': {
    rsv: 'And the people of Israel ate the manna forty years, till they came to a habitable land; they ate the manna, till they came to the border of the land of Canaan.',
    dra: 'And the children of Israel ate manna forty years, till they came to a habitable land: with this meat were they fed, until they reached the borders of the land of Chanaan.',
  },
  'JHN 6:49': {
    rsv: 'Your fathers ate the manna in the wilderness, and they died.',
    dra: 'Your fathers did eat manna in the desert, and are dead.',
  },
  'JHN 6:50': {
    rsv: 'This is the bread which comes down from heaven, that a man may eat of it and not die.',
    dra: 'This is the bread which cometh down from heaven; that if any man eat of it, he may not die.',
  },
  'JHN 6:51': {
    rsv: 'I am the living bread which came down from heaven…',
    dra: 'I am the living bread which came down from heaven.',
    partial: true,
  },
  'EXO 17:1': {
    rsv: 'All the congregation of the people of Israel moved on from the wilderness of Sin by stages, according to the commandment of the LORD, and camped at Rephidim; but there was no water for the people to drink.',
    dra: 'Then all the multitude of the children of Israel setting forward from the desert of Sin, by their mansions, according to the word of the Lord, encamped in Raphidim, where there was no water for the people to drink.',
  },
  'EXO 17:2': {
    rsv: 'Therefore the people found fault with Moses, and said, “Give us water to drink.” And Moses said to them, “Why do you find fault with me? Why do you put the LORD to the proof?”',
    dra: 'And they chode with Moses, and said: Give us water, that we may drink. And Moses answered them: Why chide you with me? Wherefore do you tempt the Lord?',
  },
  'EXO 17:3': {
    rsv: 'But the people thirsted there for water, and the people murmured against Moses, and said, “Why did you bring us up out of Egypt, to kill us and our children and our cattle with thirst?”',
    dra: 'So the people were thirsty there for want of water, and murmured against Moses, saying: Why didst thou make us go forth out of Egypt, to kill us and our children, and our beasts with thirst?',
  },
  'EXO 17:4': {
    rsv: 'So Moses cried to the LORD, “What shall I do with this people? They are almost ready to stone me.”',
    dra: 'And Moses cried to the Lord, saying: What shall I do to this people? Yet a little more and they will stone me.',
  },
  'EXO 17:5': {
    rsv: 'And the LORD said to Moses, “Pass on before the people, taking with you some of the elders of Israel; and take in your hand the rod with which you struck the Nile, and go.',
    dra: 'And the Lord said to Moses: Go before the people, and take with thee of the ancients of Israel: and take in thy hand the rod wherewith thou didst strike the river, and go.',
  },
  'EXO 17:6': {
    rsv: 'Behold, I will stand before you there on the rock at Horeb; and you shall strike the rock, and water shall come out of it, that the people may drink.” And Moses did so, in the sight of the elders of Israel.',
    dra: 'Behold I will stand there before thee, upon the rock Horeb: and thou shalt strike the rock, and water shall come out of it that the people may drink. Moses did so before the ancients of Israel:',
  },
  'EXO 17:7': {
    rsv: 'And he called the name of the place Massah and Meribah, because of the faultfinding of the children of Israel, and because they put the LORD to the proof by saying, “Is the LORD among us or not?”',
    dra: 'And he called the name of that place Temptation, because the chiding of the children of Israel, and for that they tempted the Lord, saying: Is the Lord amongst us or not?',
  },
  '1CO 10:4': {
    rsv: 'and all drank the same supernatural drink. For they drank from the supernatural Rock which followed them, and the Rock was Christ.',
    dra: 'And all drank the same spiritual drink; (and they drank of the spiritual rock that followed them, and the rock was Christ.)',
  },
  'JHN 19:34': {
    rsv: 'But one of the soldiers pierced his side with a spear, and at once there came out blood and water.',
    dra: 'But one of the soldiers with a spear opened his side, and immediately there came out blood and water.',
  },
  'EXO 17:8': {
    rsv: 'Then came Amalek and fought with Israel at Rephidim.',
    dra: 'And Amalec came, and fought against Israel in Raphidim.',
  },
  'EXO 17:9': {
    rsv: 'And Moses said to Joshua, “Choose for us men, and go out, fight with Amalek; tomorrow I will stand on the top of the hill with the rod of God in my hand.”',
    dra: 'And Moses said to Josue: Choose out men: and go out and fight against Amalec: to morrow I will stand on the top of the hill having the rod of God in my hand.',
  },
  'EXO 17:10': {
    rsv: 'So Joshua did as Moses told him, and fought with Amalek; and Moses, Aaron, and Hur went up to the top of the hill.',
    dra: 'Josue did as Moses had spoken, and he fought against Amalec; but Moses, and Aaron, and Hur went up upon the top of the hill.',
  },
  'EXO 17:11': {
    rsv: 'Whenever Moses held up his hand, Israel prevailed; and whenever he lowered his hand, Amalek prevailed.',
    dra: 'And when Moses lifted up his hands, Israel overcame: but if he let them down a little, Amalec overcame.',
  },
  'EXO 17:12': {
    rsv: 'But Moses’ hands grew weary; so they took a stone and put it under him, and he sat upon it, and Aaron and Hur held up his hands, one on one side, and the other on the other side; so his hands were steady until the going down of the sun.',
    dra: 'And Moses\' hands were heavy: so they took a stone, and put under him, and he sat on it: and Aaron and Hur stayed up his hands on both sides. And it came to pass that his hands were not weary until sunset.',
  },
  'EXO 17:15': {
    rsv: 'And Moses built an altar and called the name of it, The LORD is my banner,',
    dra: 'And Moses built an altar: and called the name thereof, The Lord my exaltation, saying:',
  },
  'JHN 12:32': {
    rsv: 'and I, when I am lifted up from the earth, will draw all men to myself.”',
    dra: 'And I, if I be lifted up from the earth, will draw all things to myself.',
  },
  'JHN 12:33': {
    rsv: 'He said this to show by what death he was to die.',
    dra: '(Now this he said, signifying what death he should die.)',
  },
  'EXO 18:5': {
    rsv: 'And Jethro, Moses’ father-in-law, came with his sons and his wife to Moses in the wilderness where he was encamped at the mountain of God.',
    dra: 'And Jethro the kinsman of Moses came with his sons and his wife, to Moses into the desert, where he was camped by the mountain of God.',
  },
  'EXO 18:7': {
    rsv: 'Moses went out to meet his father-in-law, and did obeisance and kissed him; and they asked each other of their welfare, and went into the tent.',
    dra: 'And he went out to meet his kinsman, and worshipped and kissed him: and they saluted one another with words of peace. And when he was come into the tent,',
  },
  'EXO 18:8': {
    rsv: 'Then Moses told his father-in-law all that the LORD had done to Pharaoh and to the Egyptians for Israel’s sake, all the hardship that had come upon them in the way, and how the LORD had delivered them.',
    dra: 'Moses told his kinsman all that the Lord had done to Pharao, and the Egyptians, in favour of Israel: and all the labour which had befallen them in the journey, and that the Lord had delivered them.',
  },
  'EXO 18:11': {
    rsv: 'Now I know that the LORD is greater than all gods, because he delivered the people from under the hand of the Egyptians, when they dealt arrogantly with them.”',
    dra: 'Now I know that the Lord is great above all gods: because they dealt proudly against them.',
  },
  'EXO 18:13': {
    rsv: 'On the morrow Moses sat to judge the people, and the people stood about Moses from morning till evening.',
    dra: 'And the next day Moses sat, to judge the people, who stood by Moses from morning until night.',
  },
  'EXO 18:14': {
    rsv: 'When Moses’ father-in-law saw all that he was doing for the people, he said, “What is this that you are doing for the people? Why do you sit alone, and all the people stand about you from morning till evening?”',
    dra: 'And when his kinsman had seen all things that he did among the people, he said: What is it that thou dost among the people? Why sittest thou alone, and all the people wait from morning till night.',
  },
  'EXO 18:17': {
    rsv: 'Moses’ father-in-law said to him, “What you are doing is not good.',
    dra: 'But he said: The thing thou dost is not good.',
  },
  'EXO 18:18': {
    rsv: 'You and the people with you will wear yourselves out, for the thing is too heavy for you; you are not able to perform it alone.',
    dra: 'Thou are spent with foolish labour, both thou and this people that is with thee: the business is above thy strength, thou alone canst not bear it.',
  },
  'EXO 18:21': {
    rsv: 'Moreover choose able men from all the people, such as fear God, men who are trustworthy and who hate a bribe; and place such men over the people as rulers of thousands, of hundreds, of fifties, and of tens.',
    dra: 'And provide out of all the people able men, such as fear God, in whom there is truth, and that hate avarice, and appoint of them rulers of thousands, and of hundreds, and of fifties, and of tens.',
  },
  'EXO 18:22': {
    rsv: 'And let them judge the people at all times; every great matter they shall bring to you, but any small matter they shall decide themselves; so it will be easier for you, and they will bear the burden with you.',
    dra: 'Who may judge the people at all times: and when any great matter soever shall fall out, let them refer it to thee, and let them judge the lesser matters only: that so it may be lighter for thee, the burden being shared out unto others.',
  },
  'EXO 18:24': {
    rsv: 'So Moses gave heed to the voice of his father-in-law and did all that he had said.',
    dra: 'And when Moses heard this, he did all things that he had suggested unto him.',
  },
  'MRK 3:14': {
    rsv: 'And he appointed twelve, to be with him, and to be sent out to preach',
    dra: 'And he made that twelve should be with him, and that he might send them to preach.',
  },
  'LUK 10:2': {
    rsv: 'And he said to them, “The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers into his harvest.',
    dra: 'And he said to them: The harvest indeed is great, but the labourers are few. Pray ye therefore the Lord of the harvest, that he send labourers into his harvest.',
  },
  // Level 10 · Sinai (the RSV's pronunciation marks in names, like Abi′hu, left out).
  'EXO 19:2': {
    rsv: 'And when they set out from Rephidim and came into the wilderness of Sinai, they encamped in the wilderness; and there Israel encamped before the mountain.',
    dra: 'For departing out of Raphidim, and coming to the desert of Sinai, they camped in the same place, and there Israel pitched their tents over against the mountain.',
  },
  'EXO 19:4': {
    rsv: 'You have seen what I did to the Egyptians, and how I bore you on eagles’ wings and brought you to myself.',
    dra: 'You have seen what I have done to the Egyptians, how I have carried you upon the wings of eagles, and have taken you to myself.',
  },
  'EXO 19:5': {
    rsv: 'Now therefore, if you will obey my voice and keep my covenant, you shall be my own possession among all peoples; for all the earth is mine,',
    dra: 'If therefore you will hear my voice, and keep my covenant, you shall be my peculiar possession above all people: for all the earth is mine.',
  },
  'EXO 19:6': {
    rsv: 'and you shall be to me a kingdom of priests and a holy nation. These are the words which you shall speak to the children of Israel.”',
    dra: 'And you shall be to me a priestly kingdom, and a holy nation. Those are the words thou shalt speak to the children of Israel.',
  },
  'EXO 19:7': {
    rsv: 'So Moses came and called the elders of the people, and set before them all these words which the LORD had commanded him.',
    dra: 'Moses came, and calling together the elders of the people, he declared all the words which the Lord had commanded.',
  },
  'EXO 19:8': {
    rsv: 'And all the people answered together and said, “All that the LORD has spoken we will do.” And Moses reported the words of the people to the LORD.',
    dra: 'And all the people answered together: All that the Lord hath spoken, we will do. And when Moses had related the people\'s words to the Lord,',
  },
  'EXO 19:10': {
    rsv: 'And the LORD said to Moses, “Go to the people and consecrate them today and tomorrow, and let them wash their garments,',
    dra: 'And he said to him: Go to the people, and sanctify them to day, and to morrow, and let them wash their garments.',
  },
  'EXO 19:11': {
    rsv: 'and be ready by the third day; for on the third day the LORD will come down upon Mount Sinai in the sight of all the people.',
    dra: 'And let them be ready against the third day: for on the third day the Lord will come down in the sight of all the people upon mount Sinai.',
  },
  'EXO 19:16': {
    rsv: 'On the morning of the third day there were thunders and lightnings, and a thick cloud upon the mountain, and a very loud trumpet blast, so that all the people who were in the camp trembled.',
    dra: 'And now the third day was come, and the morning appeared: and behold thunders began to be heard, and lightning to flash, and a very thick cloud to cover the mount, and the noise of the trumpet sounded exceeding loud, and the people that was in the camp, feared.',
  },
  'EXO 19:18': {
    rsv: 'And Mount Sinai was wrapped in smoke, because the LORD descended upon it in fire; and the smoke of it went up like the smoke of a kiln, and the whole mountain quaked greatly.',
    dra: 'And all mount Sinai was on a smoke: because the Lord was come down upon it in fire, and the smoke arose from it as out of a furnace: and all the mount was terrible.',
  },
  'EXO 19:19': {
    rsv: 'And as the sound of the trumpet grew louder and louder, Moses spoke, and God answered him in thunder.',
    dra: 'And the sound of the trumpet grew by degrees louder and louder, and was drawn out to a greater length: Moses spoke, and God answered him.',
  },
  'EXO 19:20': {
    rsv: 'And the LORD came down upon Mount Sinai, to the top of the mountain; and the LORD called Moses to the top of the mountain, and Moses went up.',
    dra: 'And the Lord came down upon mount Sinai, in the very top of the mount, and he called Moses unto the top thereof. And when he was gone up thither,',
  },
  '1PE 2:9': {
    rsv: 'But you are a chosen race, a royal priesthood, a holy nation, God’s own people, that you may declare the wonderful deeds of him who called you out of darkness into his marvelous light.',
    dra: 'But you are a chosen generation, a kingly priesthood, a holy nation, a purchased people: that you may declare his virtues, who hath called you out of darkness into his marvellous light:',
  },
  '1PE 2:10': {
    rsv: 'Once you were no people but now you are God’s people; once you had not received mercy but now you have received mercy.',
    dra: 'Who in time past were not a people: but are now the people of God. Who had not obtained mercy; but now have obtained mercy.',
  },
  'EXO 20:1': {
    rsv: 'And God spoke all these words, saying,',
    dra: 'And the Lord spoke all these words:',
  },
  'EXO 20:2': {
    rsv: '“I am the LORD your God, who brought you out of the land of Egypt, out of the house of bondage.',
    dra: 'I am the Lord thy God, who brought thee out of the land of Egypt, out of the house of bondage.',
  },
  'EXO 20:3': {
    rsv: '“You shall have no other gods before me.',
    dra: 'Thou shalt not have strange gods before me.',
  },
  // The first commandment as one passage, for the comparison in Episode 4 (minigames/the-calf).
  'EXO 20:2-3': {
    rsv: '“I am the LORD your God, who brought you out of the land of Egypt, out of the house of bondage. “You shall have no other gods before me.',
    dra: 'I am the Lord thy God, who brought thee out of the land of Egypt, out of the house of bondage. Thou shalt not have strange gods before me.',
  },
  'EXO 20:7': {
    rsv: '“You shall not take the name of the LORD your God in vain; for the LORD will not hold him guiltless who takes his name in vain.',
    dra: 'Thou shalt not take the name of the Lord thy God in vain: for the Lord will not hold him guiltless that shall take the name of the Lord his God in vain.',
  },
  'EXO 20:8': {
    rsv: '“Remember the sabbath day, to keep it holy.',
    dra: 'Remember that thou keep holy the sabbath day.',
  },
  'EXO 20:12': {
    rsv: '“Honor your father and your mother, that your days may be long in the land which the LORD your God gives you.',
    dra: 'Honour thy father and thy mother, that thou mayest be longlived upon the land which the Lord thy God will give thee.',
  },
  'EXO 20:13': {
    rsv: '“You shall not kill.',
    dra: 'Thou shalt not kill.',
  },
  'EXO 20:14': {
    rsv: '“You shall not commit adultery.',
    dra: 'Thou shalt not commit adultery.',
  },
  'EXO 20:15': {
    rsv: '“You shall not steal.',
    dra: 'Thou shalt not steal.',
  },
  'EXO 20:16': {
    rsv: '“You shall not bear false witness against your neighbor.',
    dra: 'Thou shalt not bear false witness against thy neighbour.',
  },
  'EXO 20:17': {
    rsv: '“You shall not covet your neighbor’s house; you shall not covet your neighbor’s wife, or his manservant, or his maidservant, or his ox, or his ass, or anything that is your neighbor’s.”',
    dra: 'Thou shalt not covet thy neighbour\'s house: neither shalt thou desire his wife, nor his servant, nor his handmaid, nor his ox, nor his ass, nor any thing that is his.',
  },
  'EXO 20:18': {
    rsv: 'Now when all the people perceived the thunderings and the lightnings and the sound of the trumpet and the mountain smoking, the people were afraid and trembled; and they stood afar off,',
    dra: 'And all the people saw the voices and the flames, and the sound of the trumpet, and the mount smoking: and being terrified and struck with fear, they stood afar off,',
  },
  'EXO 20:20': {
    rsv: 'And Moses said to the people, “Do not fear; for God has come to prove you, and that the fear of him may be before your eyes, that you may not sin.”',
    dra: 'And Moses said to the people: Fear not: for God is come to prove you, and that the dread of him might be in you, and you should not sin.',
  },
  'EXO 20:21': {
    rsv: 'And the people stood afar off, while Moses drew near to the thick darkness where God was.',
    dra: 'And the people stood afar off. But Moses went to the dark cloud wherein God was.',
  },
  'MAT 22:37': {
    rsv: 'And he said to him, “You shall love the Lord your God with all your heart, and with all your soul, and with all your mind.',
    dra: 'Jesus said to him: Thou shalt love the Lord thy God with thy whole heart, and with thy whole soul, and with thy whole mind.',
  },
  'MAT 22:39': {
    rsv: 'And a second is like it, You shall love your neighbor as yourself.',
    dra: 'And the second is like to this: Thou shalt love thy neighbour as thyself.',
  },
  'MAT 22:40': {
    rsv: 'On these two commandments depend all the law and the prophets.”',
    dra: 'On these two commandments dependeth the whole law and the prophets.',
  },
  'EXO 24:3': {
    rsv: 'Moses came and told the people all the words of the LORD and all the ordinances; and all the people answered with one voice, and said, “All the words which the LORD has spoken we will do.”',
    dra: 'So Moses came and told the people all the words of the Lord, and all the judgments: and all the people answered with one voice: We will do all the words of the Lord, which he hath spoken.',
  },
  'EXO 24:4': {
    rsv: 'And Moses wrote all the words of the LORD. And he rose early in the morning, and built an altar at the foot of the mountain, and twelve pillars, according to the twelve tribes of Israel.',
    dra: 'And Moses wrote all the words of the Lord: and rising in the morning he built an altar at the foot of the mount, and twelve titles according to the twelve tribes of Israel.',
  },
  'EXO 24:5': {
    rsv: 'And he sent young men of the people of Israel, who offered burnt offerings and sacrificed peace offerings of oxen to the LORD.',
    dra: 'And he sent young men of the children of Israel, and they offered holocausts, and sacrificed pacific victims of calves to the Lord.',
  },
  'EXO 24:6': {
    rsv: 'And Moses took half of the blood and put it in basins, and half of the blood he threw against the altar.',
    dra: 'Then Moses took half of the blood, and put it into bowls: and the rest he poured upon the altar.',
  },
  'EXO 24:7': {
    rsv: 'Then he took the book of the covenant, and read it in the hearing of the people; and they said, “All that the LORD has spoken we will do, and we will be obedient.”',
    dra: 'And taking the book of the covenant, he read it in the hearing of the people: and they said: All things that the Lord hath spoken we will do, we will be obedient.',
  },
  'EXO 24:8': {
    rsv: 'And Moses took the blood and threw it upon the people, and said, “Behold the blood of the covenant which the LORD has made with you in accordance with all these words.”',
    dra: 'And he took the blood and sprinkled it upon the people, and he said: This is the blood of the covenant which the Lord hath made with you concerning all these words.',
  },
  'EXO 24:9': {
    rsv: 'Then Moses and Aaron, Nadab, and Abihu, and seventy of the elders of Israel went up,',
    dra: 'Then Moses and Aaron, Nadab and Abiu, and seventy of the ancients of Israel went up:',
  },
  'EXO 24:10': {
    rsv: 'and they saw the God of Israel; and there was under his feet as it were a pavement of sapphire stone, like the very heaven for clearness.',
    dra: 'And they saw the God of Israel: and under his feet as it were a work of sapphire stone, and as the heaven, when clear.',
  },
  'EXO 24:11': {
    rsv: 'And he did not lay his hand on the chief men of the people of Israel; they beheld God, and ate and drank.',
    dra: 'Neither did he lay his hand upon those of the children of Israel, that retired afar off, and they saw God, and they did eat and drink.',
  },
  'EXO 24:18': {
    rsv: 'And Moses entered the cloud, and went up on the mountain. And Moses was on the mountain forty days and forty nights.',
    dra: 'And Moses, entering into the midst of the cloud, went up into the mountain: and he was there forty days, and forty nights.',
  },
  'MRK 14:23': {
    rsv: 'And he took a cup, and when he had given thanks he gave it to them, and they all drank of it.',
    dra: 'And having taken the chalice, giving thanks, he gave it to them. And they all drank of it.',
  },
  'MRK 14:24': {
    rsv: 'And he said to them, “This is my blood of the covenant, which is poured out for many.',
    dra: 'And he said to them: This is my blood of the new testament, which shall be shed for many.',
  },
  'EXO 32:1': {
    rsv: 'When the people saw that Moses delayed to come down from the mountain, the people gathered themselves together to Aaron, and said to him, “Up, make us gods, who shall go before us; as for this Moses, the man who brought us up out of the land of Egypt, we do not know what has become of him.”',
    dra: 'And the people seeing that Moses delayed to come down from the mount, gathering together against Aaron, said: Arise, make us gods, that may go before us: for as to this Moses, the man that brought us out of the land of Egypt, we know not what has befallen him.',
  },
  'EXO 32:3': {
    rsv: 'So all the people took off the rings of gold which were in their ears, and brought them to Aaron.',
    dra: 'And the people did what he had commanded, bringing the earrings to Aaron.',
  },
  'EXO 32:4': {
    rsv: 'And he received the gold at their hand, and fashioned it with a graving tool, and made a molten calf; and they said, “These are your gods, O Israel, who brought you up out of the land of Egypt!”',
    dra: 'And when he had received them, he fashioned them by founders\' work, and made of them a molten calf. And they said: These are thy gods, O Israel, that have brought thee out of the land of Egypt.',
  },
  'EXO 32:5': {
    rsv: 'When Aaron saw this, he built an altar before it; and Aaron made proclamation and said, “Tomorrow shall be a feast to the LORD.”',
    dra: 'And when Aaron saw this, he built an altar before it, and made proclamation by a crier\'s voice, saying: To morrow is the solemnity of the Lord.',
  },
  'EXO 32:6': {
    rsv: 'And they rose up early on the morrow, and offered burnt offerings and brought peace offerings; and the people sat down to eat and drink, and rose up to play.',
    dra: 'And rising in the morning, they offered holocausts, and peace victims, and the people sat down to eat, and drink, and they rose up to play.',
  },
  'EXO 31:18': {
    rsv: 'And he gave to Moses, when he had made an end of speaking with him upon Mount Sinai, the two tables of the testimony, tables of stone, written with the finger of God.',
    dra: 'And the Lord, when he had ended these words in mount Sinai, gave to Moses two stone tables of testimony, written with the finger of God.',
  },
  'EXO 32:7': {
    rsv: 'And the LORD said to Moses, “Go down; for your people, whom you brought up out of the land of Egypt, have corrupted themselves;',
    dra: 'And the Lord spoke to Moses, saying: Go, get thee down: thy people, which thou hast brought out of the land of Egypt, hath sinned.',
  },
  'EXO 32:15': {
    rsv: 'And Moses turned, and went down from the mountain with the two tables of the testimony in his hands, tables that were written on both sides; on the one side and on the other were they written.',
    dra: 'And Moses returned from the mount, carrying the two tables of the testimony in his hand, written on both sides,',
  },
  'EXO 32:16': {
    rsv: 'And the tables were the work of God, and the writing was the writing of God, graven upon the tables.',
    dra: 'And made by the work of God: the writing also of God was graven in the tables.',
  },
  'EXO 32:17': {
    rsv: 'When Joshua heard the noise of the people as they shouted, he said to Moses, “There is a noise of war in the camp.”',
    dra: 'And Josue hearing the noise of the people shouting, said to Moses: The noise of battle is heard in the camp.',
  },
  'EXO 32:18': {
    rsv: 'But he said, “It is not the sound of shouting for victory, or the sound of the cry of defeat, but the sound of singing that I hear.”',
    dra: 'But he answered: It is not the cry of men encouraging to fight, nor the shout of men compelling to flee: but I hear the voice of singers.',
  },
  'EXO 32:19': {
    rsv: 'And as soon as he came near the camp and saw the calf and the dancing, Moses’ anger burned hot, and he threw the tables out of his hands and broke them at the foot of the mountain.',
    dra: 'And when he came nigh to the camp, he saw the calf, and the dances: and being very angry, he threw the tables out of his hand, and broke them at the foot of the mount:',
  },
  'EXO 32:20': {
    rsv: 'And he took the calf which they had made, and burnt it with fire, and ground it to powder, and scattered it upon the water, and made the people of Israel drink it.',
    dra: 'And laying hold of the calf which they had made, he burnt it, and beat it to powder, which he strowed into water, and gave thereof to the children of Israel to drink.',
  },
  '1CO 10:7': {
    rsv: 'Do not be idolaters as some of them were; as it is written, “The people sat down to eat and drink and rose up to dance.”',
    dra: 'Neither become ye idolaters, as some of them, as it is written: The people sat down to eat and drink, and rose up to play.',
  },
  'MAT 4:10': {
    rsv: 'Then Jesus said to him, “Begone, Satan! for it is written, ‘You shall worship the Lord your God and him only shall you serve.’”',
    dra: 'Then Jesus saith to him: Begone, Satan: for it is written, The Lord thy God shalt thou adore, and him only shalt thou serve.',
  },
  'EXO 32:9': {
    rsv: 'And the LORD said to Moses, “I have seen this people, and behold, it is a stiff-necked people;',
    dra: 'And again the Lord said to Moses: See that this people is stiffnecked:',
  },
  'EXO 32:10': {
    rsv: 'now therefore let me alone, that my wrath may burn hot against them and I may consume them; but of you I will make a great nation.”',
    dra: 'Let me alone, that my wrath may be kindled against them, and that I may destroy them, and I will make of thee a great nation.',
  },
  'EXO 32:14': {
    rsv: 'And the LORD repented of the evil which he thought to do to his people.',
    dra: 'And the Lord was appeased from doing the evil which he had spoken against his people.',
  },
  'EXO 32:30': {
    rsv: 'On the morrow Moses said to the people, “You have sinned a great sin. And now I will go up to the LORD; perhaps I can make atonement for your sin.”',
    dra: 'And when the next day was come, Moses spoke to the people: You have sinned a very great sin: I will go up to the Lord, if by any means I may be able to entreat him for your crime.',
  },
  'EXO 32:31': {
    rsv: 'So Moses returned to the LORD and said, “Alas, this people have sinned a great sin; they have made for themselves gods of gold.',
    dra: 'And returning to the Lord, he said: I beseech thee: this people hath sinned a heinous sin, and they have made to themselves gods of gold: either forgive them this trespass,',
  },
  'EXO 32:32': {
    rsv: 'But now, if thou wilt forgive their sin—and if not, blot me, I pray thee, out of thy book which thou hast written.”',
    dra: 'Or if thou do not, strike me out of the book that thou hast written.',
  },
  'EXO 33:7': {
    rsv: 'Now Moses used to take the tent and pitch it outside the camp, far off from the camp; and he called it the tent of meeting. And every one who sought the LORD would go out to the tent of meeting, which was outside the camp.',
    dra: 'Moses also taking the tabernacle, pitched it without the camp afar off, and called the name thereof, The tabernacle of the covenant. And all the people that had any question, went forth to the tabernacle of the covenant, without the camp.',
  },
  'EXO 33:9': {
    rsv: 'When Moses entered the tent, the pillar of cloud would descend and stand at the door of the tent, and the LORD would speak with Moses.',
    dra: 'And when he was gone into the tabernacle of the covenant, the pillar of the cloud came down, and stood at the door, and he spoke with Moses.',
  },
  'EXO 33:10': {
    rsv: 'And when all the people saw the pillar of cloud standing at the door of the tent, all the people would rise up and worship, every man at his tent door.',
    dra: 'And all saw that the pillar of the cloud stood at the door of the tabernacle. And they stood, and worshipped at the doors of their tents.',
  },
  'EXO 33:11': {
    rsv: 'Thus the LORD used to speak to Moses face to face, as a man speaks to his friend. When Moses turned again into the camp, his servant Joshua the son of Nun, a young man, did not depart from the tent.',
    dra: 'And the Lord spoke to Moses face to face, as a man is wont to speak to his friend. And when he returned into the camp, his servant Josue the son of Nun, a young man, departed not from the tabernacle.',
  },
  'EXO 33:14': {
    rsv: 'And he said, “My presence will go with you, and I will give you rest.”',
    dra: 'And the Lord said: My face shall go before thee, and I will give thee rest.',
  },
  'JHN 15:14': {
    rsv: 'You are my friends if you do what I command you.',
    dra: 'You are my friends, if you do the things that I command you.',
  },
  'JHN 15:15': {
    rsv: 'No longer do I call you servants, for the servant does not know what his master is doing; but I have called you friends, for all that I have heard from my Father I have made known to you.',
    dra: 'I will not now call you servants: for the servant knoweth not what his lord doth. But I have called you friends: because all things whatsoever I have heard of my Father, I have made known to you.',
  },
  'EXO 33:18': {
    rsv: 'Moses said, “I pray thee, show me thy glory.”',
    dra: 'And he said: shew me thy glory.',
  },
  'EXO 33:19': {
    rsv: 'And he said, “I will make all my goodness pass before you, and will proclaim before you my name ‘The LORD’; and I will be gracious to whom I will be gracious, and will show mercy on whom I will show mercy.',
    dra: 'He answered: I will shew thee all good, and I will proclaim in the name of the Lord before thee: and I will have mercy on whom I will, and I will be merciful to whom it shall please me.',
  },
  'EXO 33:20': {
    rsv: 'But,” he said, “you cannot see my face; for man shall not see me and live.”',
    dra: 'And again he said: Thou canst not see my face: for man shall not see me and live.',
  },
  'EXO 33:22': {
    rsv: 'and while my glory passes by I will put you in a cleft of the rock, and I will cover you with my hand until I have passed by;',
    dra: 'And when my glory shall pass, I will set thee in a hole of the rock, and protect thee with my right hand, till I pass:',
  },
  'EXO 34:1': {
    rsv: 'The LORD said to Moses, “Cut two tables of stone like the first; and I will write upon the tables the words that were on the first tables, which you broke.',
    dra: 'And after this he said: Hew thee two tables of stone like unto the former, and I will write upon them the words which were in the tables, which thou brokest.',
  },
  'EXO 34:4': {
    rsv: 'So Moses cut two tables of stone like the first; and he rose early in the morning and went up on Mount Sinai, as the LORD had commanded him, and took in his hand two tables of stone.',
    dra: 'Then he cut out two tables of stone, such as had been before: and rising very early he went up into the mount Sinai, as the Lord had commanded him, carrying with him the tables.',
  },
  'EXO 34:5': {
    rsv: 'And the LORD descended in the cloud and stood with him there, and proclaimed the name of the LORD.',
    dra: 'And when the Lord was come down in a cloud, Moses stood with him, calling upon the name of the Lord.',
  },
  'EXO 34:6': {
    rsv: 'The LORD passed before him, and proclaimed, “The LORD, the LORD, a God merciful and gracious, slow to anger, and abounding in steadfast love and faithfulness,',
    dra: 'And when he passed before him, he said: O the Lord, the Lord God, merciful and gracious, patient and of much compassion, and true,',
  },
  'EXO 34:8': {
    rsv: 'And Moses made haste to bow his head toward the earth, and worshiped.',
    dra: 'And Moses making haste, bowed down prostrate unto the earth, and adoring,',
  },
  'EXO 34:9': {
    rsv: 'And he said, “If now I have found favor in thy sight, O Lord, let the Lord, I pray thee, go in the midst of us, although it is a stiff-necked people; and pardon our iniquity and our sin, and take us for thy inheritance.”',
    dra: 'Said: If I have found grace in thy sight: O Lord, I beseech thee, that thou wilt go with us, (for it is a stiffnecked people,) and take away our iniquities and sin, and possess us.',
  },
  'EXO 34:28': {
    rsv: 'And he was there with the LORD forty days and forty nights; he neither ate bread nor drank water. And he wrote upon the tables the words of the covenant, the ten commandments.',
    dra: 'And he was there with the Lord forty days and forty nights: he neither ate bread nor drank water, and he wrote upon the tables the ten words of the covenant.',
  },
  'EXO 34:29': {
    rsv: 'When Moses came down from Mount Sinai, with the two tables of the testimony in his hand as he came down from the mountain, Moses did not know that the skin of his face shone because he had been talking with God.',
    dra: 'And when Moses came down from the mount Sinai, he held the two tables of the testimony, and he knew not that his face was horned from the conversation of the Lord.',
  },
  'EXO 34:30': {
    rsv: 'And when Aaron and all the people of Israel saw Moses, behold, the skin of his face shone, and they were afraid to come near him.',
    dra: 'And Aaron and the children of Israel seeing the face of Moses horned, were afraid to come near.',
  },
  'EXO 34:33': {
    rsv: 'And when Moses had finished speaking with them, he put a veil on his face;',
    dra: 'And having done speaking, he put a veil upon his face.',
  },
  'JHN 1:14': {
    rsv: 'And the Word became flesh and dwelt among us, full of grace and truth; we have beheld his glory, glory as of the only Son from the Father.',
    dra: 'And the Word was made flesh, and dwelt among us, (and we saw his glory, the glory as it were of the only begotten of the Father,) full of grace and truth.',
  },
  'JHN 1:17': {
    rsv: 'For the law was given through Moses; grace and truth came through Jesus Christ.',
    dra: 'For the law was given by Moses; grace and truth came by Jesus Christ.',
  },
  'JHN 1:18': {
    rsv: 'No one has ever seen God; the only Son, who is in the bosom of the Father, he has made him known.',
    dra: 'No man hath seen God at any time: the only begotten Son who is in the bosom of the Father, he hath declared him.',
  },
  // Level 11 · The Tabernacle and the Holy Life (the RSV's pronunciation marks in names left out; the
  // Douay-Rheims numbers the end of Exodus 40 two lower, and its "marrow" in Leviticus 23:16 is read "morrow").
  'EXO 25:2': {
    rsv: '“Speak to the people of Israel, that they take for me an offering; from every man whose heart makes him willing you shall receive the offering for me.',
    dra: 'Speak to the children of Israel, that they bring firstfruits to me: of every man that offereth of his own accord, you shall take them.',
  },
  'EXO 25:8': {
    rsv: 'And let them make me a sanctuary, that I may dwell in their midst.',
    dra: 'And they shall make me a sanctuary, and I will dwell in the midst of them:',
  },
  'EXO 25:9': {
    rsv: 'According to all that I show you concerning the pattern of the tabernacle, and of all its furniture, so you shall make it.',
    dra: 'According to all the likeness of the tabernacle which I will shew thee, and of all the vessels for the service thereof: and thus you shall make it:',
  },
  'EXO 25:10': {
    rsv: '“They shall make an ark of acacia wood; two cubits and a half shall be its length, a cubit and a half its breadth, and a cubit and a half its height.',
    dra: 'Frame an ark of setim wood, the length whereof shall be of two cubits and a half: the breadth, a cubit and a half: the height, likewise, a cubit and a half.',
  },
  'EXO 25:20': {
    rsv: 'The cherubim shall spread out their wings above, overshadowing the mercy seat with their wings, their faces one to another; toward the mercy seat shall the faces of the cherubim be.',
    dra: 'Let them cover both sides of the propitiatory, spreading their wings, and covering the oracle, and let them look one towards the other, their faces being turned towards the propitiatory wherewith the ark is to be covered.',
  },
  'EXO 25:21': {
    rsv: 'And you shall put the mercy seat on the top of the ark; and in the ark you shall put the testimony that I shall give you.',
    dra: 'In which thou shalt put the testimony that I will give thee.',
  },
  'EXO 25:22': {
    rsv: 'There I will meet with you, and from above the mercy seat, from between the two cherubim that are upon the ark of the testimony, I will speak with you of all that I will give you in commandment for the people of Israel.',
    dra: 'Thence will I give orders, and will speak to thee over the propitiatory, and from the midst of the two cherubims, which shall be upon the ark of the testimony, all things which I will command the children of Israel by thee.',
  },
  'EXO 25:30': {
    rsv: 'And you shall set the bread of the Presence on the table before me always.',
    dra: 'And thou shalt set upon the table loaves of proposition in my sight always.',
  },
  'EXO 25:37': {
    rsv: 'And you shall make the seven lamps for it; and the lamps shall be set up so as to give light upon the space in front of it.',
    dra: 'Thou shalt make also seven lamps, and shalt set them upon the candlestick, to give light over against.',
  },
  'EXO 27:20': {
    rsv: '“And you shall command the people of Israel that they bring to you pure beaten olive oil for the light, that a lamp may be set up to burn continually.',
    dra: 'Command the children of Israel that they bring thee the purest oil of the olives, and beaten with a pestle: that a lamp may burn always,',
  },
  'EXO 28:1': {
    rsv: '“Then bring near to you Aaron your brother, and his sons with him, from among the people of Israel, to serve me as priests—Aaron and Aaron’s sons, Nadab and Abihu, Eleazar and Ithamar.',
    dra: 'Take unto thee also Aaron thy brother with his sons, from among the children of Israel, that they may minister to me in the priest’s office: Aaron, Nadab, and Abiu, Eleazar, and Ithamar.',
  },
  'EXO 28:2': {
    rsv: 'And you shall make holy garments for Aaron your brother, for glory and for beauty.',
    dra: 'And thou shalt make a holy vesture for Aaron thy brother for glory and for beauty.',
  },
  'EXO 28:29': {
    rsv: 'So Aaron shall bear the names of the sons of Israel in the breastpiece of judgment upon his heart, when he goes into the holy place, to bring them to continual remembrance before the LORD.',
    dra: 'And Aaron shall bear the names of the children of Israel in the rational of judgement upon his breast, when he shall enter into the sanctuary, a memorial before the Lord for ever.',
  },
  'EXO 28:36': {
    rsv: '“And you shall make a plate of pure gold, and engrave on it, like the engraving of a signet, ‘Holy to the LORD.’',
    dra: 'Thou shalt make also a plate of the purest gold: wherein thou shalt grave with engraver’s work, Holy to the Lord.',
  },
  'EXO 31:2': {
    rsv: '“See, I have called by name Bezalel the son of Uri, son of Hur, of the tribe of Judah:',
    dra: 'Behold, I have called by name Beseleel the son of Uri the son of Hur of the tribe of Juda,',
  },
  'EXO 31:3': {
    rsv: 'and I have filled him with the Spirit of God, with ability and intelligence, with knowledge and all craftsmanship,',
    dra: 'And I have filled him with the spirit of God, with wisdom and understanding, and knowledge in all manner of work.',
  },
  'EXO 35:21': {
    rsv: 'And they came, every one whose heart stirred him, and every one whose spirit moved him, and brought the LORD’s offering to be used for the tent of meeting, and for all its service, and for the holy garments.',
    dra: 'Offered firstfruits to the Lord with a most ready and devout mind, to make the work of the tabernacle of the testimony. Whatsoever was necessary to the service, and to the holy vestments,',
  },
  'EXO 35:22': {
    rsv: 'So they came, both men and women; all who were of a willing heart brought brooches and earrings and signet rings and armlets, all sorts of gold objects, every man dedicating an offering of gold to the LORD.',
    dra: 'Both men and women gave bracelets and earrings, rings and tablets: every vessel of gold was set aside to be offered to the Lord.',
  },
  'EXO 36:5': {
    rsv: 'and said to Moses, “The people bring much more than enough for doing the work which the LORD has commanded us to do.”',
    dra: 'Said to Moses: The people offereth more than is necessary.',
  },
  'EXO 36:6': {
    rsv: 'So Moses gave command, and word was proclaimed throughout the camp, “Let neither man nor woman do anything more for the offering for the sanctuary.” So the people were restrained from bringing;',
    dra: 'Moses therefore commanded proclamation to be made by the crier’s voice: Let neither man nor woman offer any more for the work of the sanctuary. And so they ceased from offering gifts,',
  },
  'EXO 36:7': {
    rsv: 'for the stuff they had was sufficient to do all the work, and more.',
    dra: 'Because the things that were offered did suffice, and were too much.',
  },
  'EXO 39:42': {
    rsv: 'According to all that the LORD had commanded Moses, so the people of Israel had done all the work.',
    dra: 'The children of Israel offered as the Lord had commanded.',
  },
  'EXO 39:43': {
    rsv: 'And Moses saw all the work, and behold, they had done it; as the LORD had commanded, so had they done it. And Moses blessed them.',
    dra: 'And when Moses saw all things finished, he blessed them.',
  },
  'EXO 40:2': {
    rsv: '“On the first day of the first month you shall erect the tabernacle of the tent of meeting.',
    dra: 'The first month, the first day of the month, thou shalt set up the tabernacle of the testimony,',
  },
  'EXO 40:17': {
    rsv: 'And in the first month in the second year, on the first day of the month, the tabernacle was erected.',
    dra: 'So in the first month of the second year, the first day of the month, the tabernacle was set up.',
  },
  'EXO 40:33': {
    rsv: 'And he erected the court round the tabernacle and the altar, and set up the screen of the gate of the court. So Moses finished the work.',
    dra: 'He set up also the court round about the tabernacle and the altar, drawing the hanging in the entry thereof. After all things were perfected,',
  },
  'EXO 40:34': {
    rsv: 'Then the cloud covered the tent of meeting, and the glory of the LORD filled the tabernacle.',
    dra: 'The cloud covered the tabernacle of the testimony, and the glory of the Lord filled it.',
  },
  'EXO 40:35': {
    rsv: 'And Moses was not able to enter the tent of meeting, because the cloud abode upon it, and the glory of the LORD filled the tabernacle.',
    dra: 'Neither could Moses go into the tabernacle of the covenant, the cloud covering all things and the majesty of the Lord shining, for the cloud had covered all.',
  },
  'EXO 40:36': {
    rsv: 'Throughout all their journeys, whenever the cloud was taken up from over the tabernacle, the people of Israel would go onward;',
    dra: 'If at any time the cloud removed from the tabernacle, the children of Israel went forward by their troops:',
  },
  'EXO 40:38': {
    rsv: 'For throughout all their journeys the cloud of the LORD was upon the tabernacle by day, and fire was in it by night, in the sight of all the house of Israel.',
    dra: 'For the cloud of the Lord hung over the tabernacle by day, and a fire by night, in the sight of all the children of Israel throughout all their mansions.',
  },
  'LEV 1:1': {
    rsv: 'The LORD called Moses, and spoke to him from the tent of meeting, saying,',
    dra: 'And the Lord called Moses, and spoke to him from the tabernacle of the testimony, saying:',
  },
  'LEV 1:2': {
    rsv: '“Speak to the people of Israel, and say to them, When any man of you brings an offering to the LORD, you shall bring your offering of cattle from the herd or from the flock.',
    dra: 'Speak to the children of Israel, and thou shalt say to them: The man among you that shall offer to the Lord a sacrifice of the cattle, that is, offering victims of oxen and sheep,',
  },
  'LEV 1:4': {
    rsv: 'he shall lay his hand upon the head of the burnt offering, and it shall be accepted for him to make atonement for him.',
    dra: 'And he shall put his hand upon the head of the victim, and it shall be acceptable, and help to its expiation.',
  },
  'LEV 2:1': {
    rsv: '“When any one brings a cereal offering as an offering to the LORD, his offering shall be of fine flour; he shall pour oil upon it, and put frankincense on it,',
    dra: 'When any one shall offer an oblation of sacrifice to the Lord, his offering shall be of fine flour, and he shall pour oil upon it, and put frankincense,',
  },
  'LEV 2:2': {
    rsv: 'and bring it to Aaron’s sons the priests. And he shall take from it a handful of the fine flour and oil, with all of its frankincense; and the priest shall burn this as its memorial portion upon the altar, an offering by fire, a pleasing odor to the LORD.',
    dra: 'And shall bring it to the sons of Aaron the priests: and one of them shall take a handful of the flour and oil, and all the frankincense, and shall put it a memorial upon the altar for a most sweet savour to the Lord.',
  },
  'LEV 6:12': {
    rsv: 'The fire on the altar shall be kept burning on it, it shall not go out; the priest shall burn wood on it every morning, and he shall lay the burnt offering in order upon it, and shall burn on it the fat of the peace offerings.',
    dra: 'And the fire on the altar shall always burn, and the priest shall feed it, putting wood on it every day in the morning, and laying on the holocaust, shall burn thereupon the fat of the peace offerings.',
  },
  'LEV 6:13': {
    rsv: 'Fire shall be kept burning upon the altar continually; it shall not go out.',
    dra: 'This is the perpetual fire which shall never go out on the altar.',
  },
  'LEV 8:4': {
    rsv: 'And Moses did as the LORD commanded him; and the congregation was assembled at the door of the tent of meeting.',
    dra: 'And Moses did as the Lord had commanded. And all the multitude being gathered together before the door of the tabernacle,',
  },
  'LEV 8:6': {
    rsv: 'And Moses brought Aaron and his sons, and washed them with water.',
    dra: 'And immediately he offered Aaron and his sons: and when he had washed them,',
  },
  'LEV 8:12': {
    rsv: 'And he poured some of the anointing oil on Aaron’s head, and anointed him, to consecrate him.',
    dra: 'And he poured it upon Aaron’s head, and he anointed and consecrated him:',
  },
  'LEV 9:22': {
    rsv: 'Then Aaron lifted up his hands toward the people and blessed them; and he came down from offering the sin offering and the burnt offering and the peace offerings.',
    dra: 'And stretching forth his hands to the people, he blessed them. And so the victims for sin, and the holocausts, and the peace offerings being finished, he came down.',
  },
  'LEV 9:23': {
    rsv: 'And Moses and Aaron went into the tent of meeting; and when they came out they blessed the people, and the glory of the LORD appeared to all the people.',
    dra: 'And Moses and Aaron went into the tabernacle of the testimony, and afterwards came forth and blessed the people. And the glory of the Lord appeared to all the multitude:',
  },
  'LEV 9:24': {
    rsv: 'And fire came forth from before the LORD and consumed the burnt offering and the fat upon the altar; and when all the people saw it, they shouted, and fell on their faces.',
    dra: 'And behold a fire, coming forth from the Lord, devoured the holocaust, and the fat that was upon the altar: which when the multitude saw, they praised the Lord, falling on their faces.',
  },
  'LEV 16:2': {
    rsv: 'and the LORD said to Moses, “Tell Aaron your brother not to come at all times into the holy place within the veil, before the mercy seat which is upon the ark, lest he die; for I will appear in the cloud upon the mercy seat.',
    dra: 'And he commanded him, saying, Speak to Aaron thy brother, that he enter not at all into the sanctuary, which is within the veil before the propitiatory, with which the ark is covered, lest he die, (for I will appear in a cloud over the oracle,)',
  },
  'LEV 16:4': {
    rsv: 'He shall put on the holy linen coat, and shall have the linen breeches on his body, be girded with the linen girdle, and wear the linen turban; these are the holy garments. He shall bathe his body in water, and then put them on.',
    dra: 'He shall be vested with a linen tunick, he shall cover his nakedness with linen breeches: he shall be girded with a linen girdle, and he shall put a linen mitre upon his head: for these are holy vestments: all which he shall put on, after he is washed.',
  },
  'LEV 16:8': {
    rsv: 'and Aaron shall cast lots upon the two goats, one lot for the LORD and the other lot for Azazel.',
    dra: 'And casting lots upon them both, one to be offered to the Lord, and the other to be the emissary goat:',
  },
  'LEV 16:12': {
    rsv: 'And he shall take a censer full of coals of fire from the altar before the LORD, and two handfuls of sweet incense beaten small; and he shall bring it within the veil',
    dra: 'And taking the censer, which he hath filled with the burning coals of the altar, and taking up with his hand the compounded perfume for incense, he shall go in within the veil into the holy place:',
  },
  'LEV 16:13': {
    rsv: 'and put the incense on the fire before the LORD, that the cloud of the incense may cover the mercy seat which is upon the testimony, lest he die;',
    dra: 'That when the perfumes are put upon the fire, the cloud and vapour thereof may cover the oracle, which is over the testimony, and he may not die.',
  },
  'LEV 16:15': {
    rsv: '“Then he shall kill the goat of the sin offering which is for the people, and bring its blood within the veil, and do with its blood as he did with the blood of the bull, sprinkling it upon the mercy seat and before the mercy seat;',
    dra: 'And when he hath killed the buck goat for the sin of the people, he shall carry in the blood thereof within the veil, as he was commanded to do with the blood of the calf, that he may sprinkle it over against the oracle,',
  },
  'LEV 16:16': {
    rsv: 'thus he shall make atonement for the holy place, because of the uncleannesses of the people of Israel, and because of their transgressions, all their sins; and so he shall do for the tent of meeting, which abides with them in the midst of their uncleannesses.',
    dra: 'And may expiate the sanctuary from the uncleanness of the children of Israel, and from their transgressions, and all their sins. According to this rite shall he do to the tabernacle of the testimony, which is fixed among them in the midst of the filth of their habitation.',
  },
  'LEV 16:21': {
    rsv: 'and Aaron shall lay both his hands upon the head of the live goat, and confess over him all the iniquities of the people of Israel, and all their transgressions, all their sins; and he shall put them upon the head of the goat, and send him away into the wilderness by the hand of a man who is in readiness.',
    dra: 'And putting both hands upon his head, let him confess all the iniquities of the children of Israel, and all their offences and sins: and praying that they may light on his head, he shall turn him out by a man ready for it, into the desert.',
  },
  'LEV 16:22': {
    rsv: 'The goat shall bear all their iniquities upon him to a solitary land; and he shall let the goat go in the wilderness.',
    dra: 'And when the goat hath carried all their iniquities into an uninhabited land, and shall be let go into the desert,',
  },
  'LEV 16:30': {
    rsv: 'for on this day shall atonement be made for you, to cleanse you; from all your sins you shall be clean before the LORD.',
    dra: 'Upon this day shall be the expiation for you, and the cleansing from all your sins: you shall be cleansed before the Lord.',
  },
  'LEV 16:34': {
    rsv: 'And this shall be an everlasting statute for you, that atonement may be made for the people of Israel once in the year because of all their sins.” And Moses did as the LORD commanded him.',
    dra: 'And this shall be an ordinance for ever, that you pray for the children of Israel, and for all their sins once in a year. He did therefore as the Lord had commanded Moses.',
  },
  'LEV 19:2': {
    rsv: '“Say to all the congregation of the people of Israel, You shall be holy; for I the LORD your God am holy.',
    dra: 'Speak to all the congregation of the children of Israel, and thou shalt say to them: Be ye holy, because I the Lord your God am holy.',
  },
  'LEV 19:3': {
    rsv: 'Every one of you shall revere his mother and his father, and you shall keep my sabbaths: I am the LORD your God.',
    dra: 'Let every one fear his father, and his mother. Keep my sabbaths. I am the Lord your God.',
  },
  'LEV 19:9': {
    rsv: '“When you reap the harvest of your land, you shall not reap your field to its very border, neither shall you gather the gleanings after your harvest.',
    dra: 'When thou reapest the corn of thy land, thou shalt not cut down all that is on the face of the earth to the very ground: nor shalt thou gather the ears that remain.',
  },
  'LEV 19:10': {
    rsv: 'And you shall not strip your vineyard bare, neither shall you gather the fallen grapes of your vineyard; you shall leave them for the poor and for the sojourner: I am the LORD your God.',
    dra: 'Neither shalt thou gather the bunches and grapes that fall down in thy vineyard, but shalt leave them to the poor and the strangers to take. I am the Lord your God.',
  },
  'LEV 19:14': {
    rsv: 'You shall not curse the deaf or put a stumbling block before the blind, but you shall fear your God: I am the LORD.',
    dra: 'Thou shalt not speak evil of the deaf, nor put a stumblingblock before the blind: but thou shalt fear the Lord thy God, because I am the Lord.',
  },
  'LEV 19:18': {
    rsv: 'You shall not take vengeance or bear any grudge against the sons of your own people, but you shall love your neighbor as yourself: I am the LORD.',
    dra: 'Seek not revenge, nor be mindful of the injury of thy citizens. Thou shalt love thy friend as thyself. I am the Lord.',
  },
  'LEV 19:32': {
    rsv: '“You shall rise up before the hoary head, and honor the face of an old man, and you shall fear your God: I am the LORD.',
    dra: 'Rise up before the hoary head, and honour the person of the aged man: and fear the Lord thy God. I am the Lord.',
  },
  'LEV 19:34': {
    rsv: 'The stranger who sojourns with you shall be to you as the native among you, and you shall love him as yourself; for you were strangers in the land of Egypt: I am the LORD your God.',
    dra: 'But let him be among you as one of the same country: and you shall love him as yourselves: for you were strangers in the land of Egypt. I am the Lord your God.',
  },
  'LEV 23:2': {
    rsv: '“Say to the people of Israel, The appointed feasts of the LORD which you shall proclaim as holy convocations, my appointed feasts, are these.',
    dra: 'Speak to the children of Israel, and thou shalt say to them: These are the feasts of the Lord, which you shall call holy.',
  },
  'LEV 23:3': {
    rsv: 'Six days shall work be done; but on the seventh day is a sabbath of solemn rest, a holy convocation; you shall do no work; it is a sabbath to the LORD in all your dwellings.',
    dra: 'Six days shall ye do work: the seventh day, because it is the rest of the sabbath, shall be called holy. You shall do no work on that day: it is the sabbath of the Lord in all your habitations.',
  },
  'LEV 23:5': {
    rsv: 'In the first month, on the fourteenth day of the month in the evening, is the LORD’s passover.',
    dra: 'The first month, the fourteenth day of the month at evening, is the phase of the Lord:',
  },
  'LEV 23:6': {
    rsv: 'And on the fifteenth day of the same month is the feast of unleavened bread to the LORD; seven days you shall eat unleavened bread.',
    dra: 'And the fifteenth day of the same month is the solemnity of the unleavened bread of the Lord. Seven days shall you eat unleavened bread.',
  },
  'LEV 23:10': {
    rsv: '“Say to the people of Israel, When you come into the land which I give you and reap its harvest, you shall bring the sheaf of the first fruits of your harvest to the priest;',
    dra: 'Speak to the children of Israel, and thou shalt say to them: When you shall have entered into the land which I will give you, and shall reap your corn, you shall bring sheaves of ears, the firstfruits of your harvest to the priest:',
  },
  'LEV 23:11': {
    rsv: 'and he shall wave the sheaf before the LORD, that you may find acceptance; on the morrow after the sabbath the priest shall wave it.',
    dra: 'Who shall lift up the shed before the Lord, the next day after the sabbath, that it may be acceptable for you, and shall sanctify it.',
  },
  'LEV 23:15': {
    rsv: '“And you shall count from the morrow after the sabbath, from the day that you brought the sheaf of the wave offering; seven full weeks shall they be,',
    dra: 'You shall count therefore from the morrow after the sabbath, wherein you offered the sheaf of the firstfruits, seven full weeks.',
  },
  'LEV 23:16': {
    rsv: 'counting fifty days to the morrow after the seventh sabbath; then you shall present a cereal offering of new grain to the LORD.',
    dra: 'Even unto the morrow after the seventh week be expired, that is to say, fifty days, and so you shall offer a new sacrifice to the Lord.',
  },
  'LEV 23:40': {
    rsv: 'And you shall take on the first day the fruit of goodly trees, branches of palm trees, and boughs of leafy trees, and willows of the brook; and you shall rejoice before the LORD your God seven days.',
    dra: 'And you shall take to you on the first day the fruits of the fairest tree, and branches of palm trees, and boughs of thick trees, and willows of the brook, and you shall rejoice before the Lord your God.',
  },
  'LEV 23:42': {
    rsv: 'You shall dwell in booths for seven days; all that are native in Israel shall dwell in booths,',
    dra: 'And you shall dwell in bowers seven days: every one that is of the race of Israel, shall dwell in tabernacles:',
  },
  'LEV 23:43': {
    rsv: 'that your generations may know that I made the people of Israel dwell in booths when I brought them out of the land of Egypt: I am the LORD your God.”',
    dra: 'That your posterity may know, that I made the children of Israel to dwell in tabernacles, when I brought them out of the land of Egypt. I am the Lord your God.',
  },
  'MRK 15:37': {
    rsv: 'And Jesus uttered a loud cry, and breathed his last.',
    dra: 'And Jesus having cried out with a loud voice, gave up the ghost.',
  },
  'MRK 15:38': {
    rsv: 'And the curtain of the temple was torn in two, from top to bottom.',
    dra: 'And the veil of the temple was rent in two, from the top to the bottom.',
  },
  'LUK 1:35': {
    rsv: 'And the angel said to her, “The Holy Spirit will come upon you, and the power of the Most High will overshadow you; therefore the child to be born will be called holy, the Son of God.',
    dra: 'And the angel answering, said to her: The Holy Ghost shall come upon thee, and the power of the most High shall overshadow thee. And therefore also the Holy which shall be born of thee shall be called the Son of God.',
  },
  'LUK 10:29': {
    rsv: 'But he, desiring to justify himself, said to Jesus, “And who is my neighbor?”',
    dra: 'But he willing to justify himself, said to Jesus: And who is my neighbour?',
  },
  'LUK 10:36': {
    rsv: 'Which of these three, do you think, proved neighbor to the man who fell among the robbers?”',
    dra: 'Which of these three, in thy opinion, was neighbour to him that fell among the robbers?',
  },
  'LUK 10:37': {
    rsv: 'He said, “The one who showed mercy on him.” And Jesus said to him, “Go and do likewise.”',
    dra: 'But he said: He that shewed mercy to him. And Jesus said to him: Go, and do thou in like manner.',
  },
  'JHN 2:19': {
    rsv: 'Jesus answered them, “Destroy this temple, and in three days I will raise it up.”',
    dra: 'Jesus answered, and said to them: Destroy this temple, and in three days I will raise it up.',
  },
  'JHN 2:21': {
    rsv: 'But he spoke of the temple of his body.',
    dra: 'But he spoke of the temple of his body.',
  },
  'ACT 2:1': {
    rsv: 'When the day of Pentecost had come, they were all together in one place.',
    dra: 'And when the days of the Pentecost were accomplished, they were all together in one place:',
  },
  '1CO 3:16': {
    rsv: 'Do you not know that you are God’s temple and that God’s Spirit dwells in you?',
    dra: 'Know you not, that you are the temple of God, and that the Spirit of God dwelleth in you?',
  },
  '1CO 15:20': {
    rsv: 'But in fact Christ has been raised from the dead, the first fruits of those who have fallen asleep.',
    dra: 'But now Christ is risen from the dead, the firstfruits of them that sleep:',
  },
  'EPH 5:2': {
    rsv: 'And walk in love, as Christ loved us and gave himself up for us, a fragrant offering and sacrifice to God.',
    dra: 'And walk in love, as Christ also hath loved us, and hath delivered himself for us, an oblation and a sacrifice to God for an odour of sweetness.',
  },
  'HEB 4:14': {
    rsv: 'Since then we have a great high priest who has passed through the heavens, Jesus, the Son of God, let us hold fast our confession.',
    dra: 'Having therefore a great high priest that hath passed into the heavens, Jesus the Son of God: let us hold fast our confession.',
  },
  'HEB 4:15': {
    rsv: 'For we have not a high priest who is unable to sympathize with our weaknesses, but one who in every respect has been tempted as we are, yet without sinning.',
    dra: 'For we have not a high priest, who can not have compassion on our infirmities: but one tempted in all things like as we are, without sin.',
  },
  'HEB 9:11': {
    rsv: 'But when Christ appeared as a high priest of the good things that have come, then through the greater and more perfect tent (not made with hands, that is, not of this creation)',
    dra: 'But Christ, being come an high priest of the good things to come, by a greater and more perfect tabernacle not made with hand, that is, not of this creation:',
  },
  'HEB 9:12': {
    rsv: 'he entered once for all into the Holy Place, taking not the blood of goats and calves but his own blood, thus securing an eternal redemption.',
    dra: 'Neither by the blood of goats, or of calves, but by his own blood, entered once into the holies, having obtained eternal redemption.',
  },
  'HEB 10:10': {
    rsv: 'And by that will we have been sanctified through the offering of the body of Jesus Christ once for all.',
    dra: 'In the which will, we are sanctified by the oblation of the body of Jesus Christ once.',
  },
  'REV 11:19': {
    rsv: 'Then God’s temple in heaven was opened, and the ark of his covenant was seen within his temple; and there were flashes of lightning, loud noises, peals of thunder, an earthquake, and heavy hail.',
    dra: 'And the temple of God was opened in heaven: and the ark of his testament was seen in his temple, and there were lightnings, and voices, and an earthquake, and great hail.',
  },
  // Level 12 · Forty Years in the Wilderness (the RSV's pronunciation marks in names left out; the
  // Douay-Rheims numbers Numbers 13 one higher, and two of Bible Gateway's slips in it are set right).
  'NUM 1:1': {
    rsv: 'The LORD spoke to Moses in the wilderness of Sinai, in the tent of meeting, on the first day of the second month, in the second year after they had come out of the land of Egypt, saying,',
    dra: 'And the Lord spoke to Moses in the desert of Sinai in the tabernacle of the covenant, the first day of the second month, the second year of their going out of Egypt, saying:',
  },
  'NUM 1:2': {
    rsv: '“Take a census of all the congregation of the people of Israel, by families, by fathers’ houses, according to the number of names, every male, head by head;',
    dra: 'Take the sum of all the congregation of the children of Israel by their families, and houses, and the names of every one, as many as are of the male sex,',
  },
  'NUM 2:2': {
    rsv: '“The people of Israel shall encamp each by his own standard, with the ensigns of their fathers’ houses; they shall encamp facing the tent of meeting on every side.',
    dra: 'All the children of Israel shall camp by their troops, ensigns, and standards, and the houses of their kindreds, round about the tabernacle of the covenant.',
  },
  'NUM 6:23': {
    rsv: '“Say to Aaron and his sons, Thus you shall bless the people of Israel: you shall say to them,',
    dra: 'Say to Aaron and his sons: Thus shall you bless the children of Israel, and you shall say to them:',
  },
  'NUM 6:24': {
    rsv: 'The LORD bless you and keep you:',
    dra: 'The Lord bless thee, and keep thee.',
  },
  'NUM 6:25': {
    rsv: 'The LORD make his face to shine upon you, and be gracious to you:',
    dra: 'The Lord shew his face to thee, and have mercy on thee.',
  },
  'NUM 6:26': {
    rsv: 'The LORD lift up his countenance upon you, and give you peace.',
    dra: 'The Lord turn his countenance to thee, and give thee peace.',
  },
  'NUM 6:27': {
    rsv: '“So shall they put my name upon the people of Israel, and I will bless them.”',
    dra: 'And they shall invoke my name upon the children of Israel, and I will bless them.',
  },
  'NUM 9:15': {
    rsv: 'On the day that the tabernacle was set up, the cloud covered the tabernacle, the tent of the testimony; and at evening it was over the tabernacle like the appearance of fire until morning.',
    dra: 'Now on the day that the tabernacle was reared up, a cloud covered it. But from the evening there was over the tabernacle, as it were, the appearance of fire until the morning.',
  },
  'NUM 9:17': {
    rsv: 'And whenever the cloud was taken up from over the tent, after that the people of Israel set out; and in the place where the cloud settled down, there the people of Israel encamped.',
    dra: 'And when the cloud that covered the tabernacle was taken up, then the children of Israel marched forward: and in the place where the cloud stood still, there they camped.',
  },
  'NUM 9:18': {
    rsv: 'At the command of the LORD the people of Israel set out, and at the command of the LORD they encamped; as long as the cloud rested over the tabernacle, they remained in camp.',
    dra: 'At the commandment of the Lord they marched, and at his commandment they pitched the tabernacle. All the days that the cloud abode over the tabernacle, they remained in the same place:',
  },
  'NUM 10:33': {
    rsv: 'So they set out from the mount of the LORD three days’ journey; and the ark of the covenant of the LORD went before them three days’ journey, to seek out a resting place for them.',
    dra: 'So they marched from the mount of the Lord three days’ journey, and the ark of the covenant of the Lord went before them, for three days providing a place for the camp.',
  },
  'NUM 10:35': {
    rsv: 'And whenever the ark set out, Moses said, “Arise, O LORD, and let thy enemies be scattered; and let them that hate thee flee before thee.”',
    dra: 'And when the ark was lifted up, Moses said: Arise, O Lord, and let thy enemies be scattered, and let them that hate thee, flee from before thy face.',
  },
  'NUM 10:36': {
    rsv: 'And when it rested, he said, “Return, O LORD, to the ten thousand thousands of Israel.”',
    dra: 'And when it was set down, he said: Return, O Lord, to the multitude of the host of Israel.',
  },
  'NUM 11:4': {
    rsv: 'Now the rabble that was among them had a strong craving; and the people of Israel also wept again, and said, “O that we had meat to eat!',
    dra: 'For a mixt multitude of people, that came up with them, burned with desire, sitting and weeping, the children of Israel also being joined with them, and said: Who shall give us flesh to eat?',
  },
  'NUM 11:5': {
    rsv: 'We remember the fish we ate in Egypt for nothing, the cucumbers, the melons, the leeks, the onions, and the garlic;',
    dra: 'We remember the fish that we ate in Egypt free cost: the cucumbers come into our mind, and the melons, and the leeks, and the onions, and the garlic.',
  },
  'NUM 11:6': {
    rsv: 'but now our strength is dried up, and there is nothing at all but this manna to look at.”',
    dra: 'Our soul is dry, our eyes behold nothing else but manna.',
  },
  'NUM 11:10': {
    rsv: 'Moses heard the people weeping throughout their families, every man at the door of his tent; and the anger of the LORD blazed hotly, and Moses was displeased.',
    dra: 'Now Moses heard the people weeping by their families, every one at the door of his tent. And the wrath of the Lord was exceedingly enkindled: to Moses also the thing seemed insupportable.',
  },
  'NUM 11:11': {
    rsv: 'Moses said to the LORD, “Why hast thou dealt ill with thy servant? And why have I not found favor in thy sight, that thou dost lay the burden of all this people upon me?',
    dra: 'And he said to the Lord: Why hast thou afflicted thy servant? wherefore do I not find favour before thee? and why hast thou laid the weight of all this people upon me?',
  },
  'NUM 11:14': {
    rsv: 'I am not able to carry all this people alone, the burden is too heavy for me.',
    dra: 'I am not able alone to bear all this people, because it is too heavy for me.',
  },
  'NUM 11:16': {
    rsv: 'And the LORD said to Moses, “Gather for me seventy men of the elders of Israel, whom you know to be the elders of the people and officers over them; and bring them to the tent of meeting, and let them take their stand there with you.',
    dra: 'And the Lord said to Moses: Gather unto me seventy men of the ancients of Israel, whom thou knowest to be ancients and masters of the people: and thou shalt bring them to the door of the tabernacle of the covenant, and shalt make them stand there with thee,',
  },
  'NUM 11:17': {
    rsv: 'And I will come down and talk with you there; and I will take some of the spirit which is upon you and put it upon them; and they shall bear the burden of the people with you, that you may not bear it yourself alone.',
    dra: 'That I may come down and speak with thee: and I will take of thy spirit, and will give to them, that they may bear with thee the burden of the people, and thou mayest not be burthened alone.',
  },
  'NUM 11:25': {
    rsv: 'Then the LORD came down in the cloud and spoke to him, and took some of the spirit that was upon him and put it upon the seventy elders; and when the spirit rested upon them, they prophesied. But they did so no more.',
    dra: 'And the Lord came down in a cloud, and spoke to him, taking away of the spirit that was in Moses, and giving to the seventy men. And when the spirit had rested on them they prophesied, nor did they cease afterwards.',
  },
  'NUM 11:26': {
    rsv: 'Now two men remained in the camp, one named Eldad, and the other named Medad, and the spirit rested upon them; they were among those registered, but they had not gone out to the tent, and so they prophesied in the camp.',
    dra: 'Now there remained in the camp two of the men, of whom one was called Eldad, and the other Medad, upon whom the spirit rested; for they also had been enrolled, but were not gone forth to the tabernacle.',
  },
  'NUM 11:28': {
    rsv: 'And Joshua the son of Nun, the minister of Moses, one of his chosen men, said, “My lord Moses, forbid them.”',
    dra: 'Forthwith Josue the son of Nun, the minister of Moses, and chosen out of many, said: My lord Moses forbid them.',
  },
  'NUM 11:29': {
    rsv: 'But Moses said to him, “Are you jealous for my sake? Would that all the LORD’s people were prophets, that the LORD would put his spirit upon them!”',
    dra: 'But he said: Why hast thou emulation for me? O that all the people might prophesy, and that the Lord would give them his spirit!',
  },
  'NUM 11:31': {
    rsv: 'And there went forth a wind from the LORD, and it brought quails from the sea, and let them fall beside the camp, about a day’s journey on this side and a day’s journey on the other side, round about the camp, and about two cubits above the face of the earth.',
    dra: 'And a wind going out from the Lord, taking quails up beyond the sea brought them, and cast them into the camp for the space of one day’s journey, on every side of the camp round about, and they flew in the air two cubits high above the ground.',
  },
  'NUM 13:2': {
    rsv: '“Send men to spy out the land of Canaan, which I give to the people of Israel; from each tribe of their fathers shall you send a man, every one a leader among them.”',
    dra: 'Send men to view the land of Chanaan, which I will give to the children of Israel, one of every tribe, of the rulers.',
  },
  'NUM 13:18': {
    rsv: 'and see what the land is, and whether the people who dwell in it are strong or weak, whether they are few or many,',
    dra: 'View the land, of what sort it is: and the people that are the inhabitants thereof, whether they be strong or weak: few in number or many:',
  },
  'NUM 13:20': {
    rsv: 'and whether the land is rich or poor, and whether there is wood in it or not. Be of good courage, and bring some of the fruit of the land.” Now the time was the season of the first ripe grapes.',
    dra: 'The ground, fat or barren, woody or without trees. Be of good courage, and bring us of the fruits of the land. Now it was the time when the first ripe grapes are fit to be eaten.',
  },
  'NUM 13:21': {
    rsv: 'So they went up and spied out the land from the wilderness of Zin to Rehob, near the entrance of Hamath.',
    dra: 'And when they were gone up, they viewed the land from the desert of Sin, unto Rohob as you enter into Emath.',
  },
  'NUM 13:23': {
    rsv: 'And they came to the Valley of Eshcol, and cut down from there a branch with a single cluster of grapes, and they carried it on a pole between two of them; they brought also some pomegranates and figs.',
    dra: 'And going forward as far as the torrent of the cluster of grapes, they cut off a branch with its cluster of grapes, which two men carried upon a lever. They took also of the pomegranates and of the figs of that place:',
  },
  'NUM 13:25': {
    rsv: 'At the end of forty days they returned from spying out the land.',
    dra: 'And they that went to spy out the land returned after forty days, having gone round all the country,',
  },
  'NUM 13:27': {
    rsv: 'And they told him, “We came to the land to which you sent us; it flows with milk and honey, and this is its fruit.',
    dra: 'And they related and said: We came into the land to which thou sentest us, which in very deed floweth with milk and honey as may be known by these fruits:',
  },
  'NUM 13:28': {
    rsv: 'Yet the people who dwell in the land are strong, and the cities are fortified and very large; and besides, we saw the descendants of Anak there.',
    dra: 'But it hath very strong inhabitants, and the cities are great and walled. We saw there the race of Enac.',
  },
  'NUM 13:30': {
    rsv: 'But Caleb quieted the people before Moses, and said, “Let us go up at once, and occupy it; for we are well able to overcome it.”',
    dra: 'In the mean time Caleb, to still the murmuring of the people that rose against Moses, said: Let us go up and possess the land, for we shall be able to conquer it.',
  },
  'NUM 13:31': {
    rsv: 'Then the men who had gone up with him said, “We are not able to go up against the people; for they are stronger than we.”',
    dra: 'But the others, that had been with him, said: No, we are not able to go up to this people, because they are stronger than we.',
  },
  'NUM 13:33': {
    rsv: 'And there we saw the Nephilim (the sons of Anak, who come from the Nephilim); and we seemed to ourselves like grasshoppers, and so we seemed to them.”',
    dra: 'There we saw certain monsters of the sons of Enac, of the giant kind: in comparison of whom, we seemed like locusts.',
  },
  'NUM 14:1': {
    rsv: 'Then all the congregation raised a loud cry; and the people wept that night.',
    dra: 'Wherefore the whole multitude crying wept that night.',
  },
  'NUM 14:4': {
    rsv: 'And they said to one another, “Let us choose a captain, and go back to Egypt.”',
    dra: 'And they said one to another: Let us appoint a captain, and let us return into Egypt.',
  },
  'NUM 14:6': {
    rsv: 'And Joshua the son of Nun and Caleb the son of Jephunneh, who were among those who had spied out the land, rent their clothes,',
    dra: 'But Josue the son of Nun, and Caleb the son of Jephone, who themselves also had viewed the land, rent their garments,',
  },
  'NUM 14:7': {
    rsv: 'and said to all the congregation of the people of Israel, “The land, which we passed through to spy it out, is an exceedingly good land.',
    dra: 'And said to all the multitude of the children of Israel: The land which we have gone round is very good:',
  },
  'NUM 14:8': {
    rsv: 'If the LORD delights in us, he will bring us into this land and give it to us, a land which flows with milk and honey.',
    dra: 'If the Lord be favourable, he will bring us into it, and give us a land flowing with milk and honey.',
  },
  'NUM 14:9': {
    rsv: 'Only, do not rebel against the LORD; and do not fear the people of the land, for they are bread for us; their protection is removed from them, and the LORD is with us; do not fear them.”',
    dra: 'Be not rebellious against the Lord: and fear ye not the people of this land, for we are able to eat them up as bread. All aid is gone from them: the Lord is with us, fear ye not.',
  },
  'NUM 14:10': {
    rsv: 'But all the congregation said to stone them with stones. Then the glory of the LORD appeared at the tent of meeting to all the people of Israel.',
    dra: 'And when all the multitude cried out, and would have stoned them, the glory of the Lord appeared over the tabernacle of the covenant to all the children of Israel.',
  },
  'NUM 14:24': {
    rsv: 'But my servant Caleb, because he has a different spirit and has followed me fully, I will bring into the land into which he went, and his descendants shall possess it.',
    dra: 'My servant Caleb, who being full of another spirit hath followed me, I will bring into this land which he hath gone round: and his seed shall possess it.',
  },
  'NUM 14:34': {
    rsv: 'According to the number of the days in which you spied out the land, forty days, for every day a year, you shall bear your iniquity, forty years, and you shall know my displeasure.’',
    dra: 'According to the number of the forty days, wherein you viewed the land: year shall be counted for a day. And forty years you shall receive your iniquities, and shall know my revenge:',
  },
  'NUM 16:3': {
    rsv: 'and they assembled themselves together against Moses and against Aaron, and said to them, “You have gone too far! For all the congregation are holy, every one of them, and the LORD is among them; why then do you exalt yourselves above the assembly of the LORD?”',
    dra: 'And when they had stood up against Moses and Aaron, they said: Let it be enough for you, that all the multitude consisteth of holy ones, and the Lord is among them: Why lift you up yourselves above the people of the Lord?',
  },
  'NUM 16:9': {
    rsv: 'is it too small a thing for you that the God of Israel has separated you from the congregation of Israel, to bring you near to himself, to do service in the tabernacle of the LORD, and to stand before the congregation to minister to them;',
    dra: 'Is it a small thing unto you, that the God of Israel hath spared you from all the people, and joined you to himself, that you should serve him in the service of the tabernacle, and should stand before the congregation of the people, and should minister to him?',
  },
  'NUM 16:10': {
    rsv: 'and that he has brought you near him, and all your brethren the sons of Levi with you? And would you seek the priesthood also?',
    dra: 'Did he therefore make thee and all thy brethren the sons of Levi to approach unto him, that you should challenge to yourselves the priesthood also,',
  },
  'NUM 16:31': {
    rsv: 'And as he finished speaking all these words, the ground under them split asunder;',
    dra: 'And immediately as he had made an end of speaking, the earth broke asunder under their feet:',
  },
  'NUM 16:41': {
    rsv: 'But on the morrow all the congregation of the people of Israel murmured against Moses and against Aaron, saying, “You have killed the people of the LORD.”',
    dra: 'The following day all the multitude of the children of Israel murmured against Moses and Aaron, saying: You have killed the people of the Lord.',
  },
  'NUM 16:46': {
    rsv: 'And Moses said to Aaron, “Take your censer, and put fire therein from off the altar, and lay incense on it, and carry it quickly to the congregation, and make atonement for them; for wrath has gone forth from the LORD, the plague has begun.”',
    dra: 'Moses said to Aaron: Take the censer, and putting fire in it from the altar, put incense upon it, and go quickly to the people to pray for them: for already wrath is gone out from the Lord, and the plague rageth.',
  },
  'NUM 16:47': {
    rsv: 'So Aaron took it as Moses said, and ran into the midst of the assembly; and behold, the plague had already begun among the people; and he put on the incense, and made atonement for the people.',
    dra: 'When Aaron had done this, and had run to the midst of the multitude which the burning fire was now destroying, he offered the incense:',
  },
  'NUM 16:48': {
    rsv: 'And he stood between the dead and the living; and the plague was stopped.',
    dra: 'And standing between the dead and the living, he prayed for the people, and the plague ceased.',
  },
  'NUM 17:2': {
    rsv: '“Speak to the people of Israel, and get from them rods, one for each fathers’ house, from all their leaders according to their fathers’ houses, twelve rods. Write each man’s name upon his rod,',
    dra: 'Speak to the children of Israel, and take of every one of them a rod by their kindreds, of all the princes of the tribes, twelve rods, and write the name of every man upon his rod.',
  },
  'NUM 17:5': {
    rsv: 'And the rod of the man whom I choose shall sprout; thus I will make to cease from me the murmurings of the people of Israel, which they murmur against you.”',
    dra: 'Whomsoever of these I shall choose, his rod shall blossom: and I will make to cease from me the murmurings of the children of Israel, wherewith they murmur against you.',
  },
  'NUM 17:8': {
    rsv: 'And on the morrow Moses went into the tent of the testimony; and behold, the rod of Aaron for the house of Levi had sprouted and put forth buds, and produced blossoms, and it bore ripe almonds.',
    dra: 'He returned on the following day, and found that the rod of Aaron for the house of Levi, was budded: and that the buds swelling it had bloomed blossoms, which spreading the leaves, were formed into almonds.',
  },
  'NUM 17:10': {
    rsv: 'And the LORD said to Moses, “Put back the rod of Aaron before the testimony, to be kept as a sign for the rebels, that you may make an end of their murmurings against me, lest they die.”',
    dra: 'And the Lord said to Moses: Carry back the rod of Aaron into the tabernacle of the testimony, that it may be kept there for a token of the rebellious children of Israel, and that their complaints may cease from me lest they die.',
  },
  'NUM 20:1': {
    rsv: 'And the people of Israel, the whole congregation, came into the wilderness of Zin in the first month, and the people stayed in Kadesh; and Miriam died there, and was buried there.',
    dra: 'And the children of Israel, and all the multitude came into the desert of Sin, in the first month: and the people abode in Cades. And Mary died there, and was buried in the same place.',
  },
  'NUM 20:2': {
    rsv: 'Now there was no water for the congregation; and they assembled themselves together against Moses and against Aaron.',
    dra: 'And the people wanting water, came together against Moses and Aaron:',
  },
  'NUM 20:5': {
    rsv: 'And why have you made us come up out of Egypt, to bring us to this evil place? It is no place for grain, or figs, or vines, or pomegranates; and there is no water to drink.”',
    dra: 'Why have you made us come up out of Egypt, and have brought us into this wretched place which cannot be sowed, nor bringeth forth figs, nor vines, nor pomegranates, neither is there any water to drink?',
  },
  'NUM 20:6': {
    rsv: 'Then Moses and Aaron went from the presence of the assembly to the door of the tent of meeting, and fell on their faces. And the glory of the LORD appeared to them,',
    dra: 'And Moses and Aaron leaving the multitude, went into the tabernacle of the covenant, and fell flat upon the ground, and cried to the Lord, and said: O Lord God, hear the cry of this people, and open to them thy treasure, a fountain of living water, that being satisfied, they may cease to murmur. And the glory of the Lord appeared over them.',
  },
  'NUM 20:8': {
    rsv: '“Take the rod, and assemble the congregation, you and Aaron your brother, and tell the rock before their eyes to yield its water; so you shall bring water out of the rock for them; so you shall give drink to the congregation and their cattle.”',
    dra: 'Take the rod, and assemble the people together, thou and Aaron thy brother, and speak to the rock before them, and it shall yield waters. And when thou hast brought forth water out of the rock, all the multitude and their cattle shall drink.',
  },
  'NUM 20:10': {
    rsv: 'And Moses and Aaron gathered the assembly together before the rock, and he said to them, “Hear now, you rebels; shall we bring forth water for you out of this rock?”',
    dra: 'And having gathered together the multitude before the rock, he said to them: Hear, ye rebellious and incredulous: Can we bring you forth water out of this rock?',
  },
  'NUM 20:11': {
    rsv: 'And Moses lifted up his hand and struck the rock with his rod twice; and water came forth abundantly, and the congregation drank, and their cattle.',
    dra: 'And when Moses had lifted up his hand, and struck the rock twice with the rod, there came forth water in great abundance, so that the people and their cattle drank,',
  },
  'NUM 20:12': {
    rsv: 'And the LORD said to Moses and Aaron, “Because you did not believe in me, to sanctify me in the eyes of the people of Israel, therefore you shall not bring this assembly into the land which I have given them.”',
    dra: 'And the Lord said to Moses and Aaron: Because you have not believed me, to sanctify me before the children of Israel, you shall not bring these people into the land, which I will give them.',
  },
  'NUM 20:24': {
    rsv: '“Aaron shall be gathered to his people; for he shall not enter the land which I have given to the people of Israel, because you rebelled against my command at the waters of Meribah.',
    dra: 'Let Aaron, saith he, go to his people: for he shall not go into the land which I have given the children of Israel, because he was incredulous to my words, at the waters of contradiction.',
  },
  'NUM 20:26': {
    rsv: 'and strip Aaron of his garments, and put them upon Eleazar his son; and Aaron shall be gathered to his people, and shall die there.”',
    dra: 'And when thou hast stripped the father of his vesture, thou shalt vest therewith Eleazar his son: Aaron shall be gathered to his people, and die there.',
  },
  'NUM 20:27': {
    rsv: 'Moses did as the LORD commanded; and they went up Mount Hor in the sight of all the congregation.',
    dra: 'Moses did as the Lord had commanded: and they went up into mount Hor before all the multitude.',
  },
  'NUM 21:4': {
    rsv: 'From Mount Hor they set out by the way to the Red Sea, to go around the land of Edom; and the people became impatient on the way.',
    dra: 'And they marched from mount Hor, by the way that leadeth to the Red Sea, to compass the land of Edom. And the people began to be weary of their journey and labour:',
  },
  'NUM 21:5': {
    rsv: 'And the people spoke against God and against Moses, “Why have you brought us up out of Egypt to die in the wilderness? For there is no food and no water, and we loathe this worthless food.”',
    dra: 'And speaking against God and Moses, they said: Why didst thou bring us out of Egypt, to die in the wilderness? There is no bread, nor have we any waters: our soul now loatheth this very light food.',
  },
  'NUM 21:6': {
    rsv: 'Then the LORD sent fiery serpents among the people, and they bit the people, so that many people of Israel died.',
    dra: 'Wherefore the Lord sent among the people fiery serpents, which bit them and killed many of them.',
  },
  'NUM 21:7': {
    rsv: 'And the people came to Moses, and said, “We have sinned, for we have spoken against the LORD and against you; pray to the LORD, that he take away the serpents from us.” So Moses prayed for the people.',
    dra: 'Upon which they came to Moses, and said: We have sinned, because we have spoken against the Lord and thee: pray that he may take away these serpents from us. And Moses prayed for the people.',
  },
  'NUM 21:8': {
    rsv: 'And the LORD said to Moses, “Make a fiery serpent, and set it on a pole; and every one who is bitten, when he sees it, shall live.”',
    dra: 'And the Lord said to him: Make brazen serpent, and set it up for a sign: whosoever being struck shall look on it, shall live.',
  },
  'NUM 21:9': {
    rsv: 'So Moses made a bronze serpent, and set it on a pole; and if a serpent bit any man, he would look at the bronze serpent and live.',
    dra: 'Moses therefore made a brazen serpent, and set it up for a sign: which when they that were bitten looked upon, they were healed.',
  },
  'NUM 22:3': {
    rsv: 'And Moab was in great dread of the people, because they were many; Moab was overcome with fear of the people of Israel.',
    dra: 'And that the Moabites were in great fear of him, and were not able to sustain his assault,',
  },
  'NUM 22:6': {
    rsv: 'Come now, curse this people for me, since they are too mighty for me; perhaps I shall be able to defeat them and drive them from the land; for I know that he whom you bless is blessed, and he whom you curse is cursed.”',
    dra: 'Come therefore, and curse this people, because it is mightier than I: if by any means I may beat them and drive them out of my land: for I know that he whom thou shalt bless is blessed, and he whom thou shalt curse is cursed.',
  },
  'NUM 22:12': {
    rsv: 'God said to Balaam, “You shall not go with them; you shall not curse the people, for they are blessed.”',
    dra: 'And God said to Balaam: Thou shalt not go with them, nor shalt thou curse the people: because it is blessed.',
  },
  'NUM 22:18': {
    rsv: 'But Balaam answered and said to the servants of Balak, “Though Balak were to give me his house full of silver and gold, I could not go beyond the command of the LORD my God, to do less or more.',
    dra: 'Balaam answered: If Balac would give me his house full of silver and gold, I cannot alter the word of the Lord my God, to speak either more or less.',
  },
  'NUM 22:21': {
    rsv: 'So Balaam rose in the morning, and saddled his ass, and went with the princes of Moab.',
    dra: 'Balaam arose in the morning, and saddling his ass went with them.',
  },
  'NUM 22:22': {
    rsv: 'But God’s anger was kindled because he went; and the angel of the LORD took his stand in the way as his adversary. Now he was riding on the ass, and his two servants were with him.',
    dra: 'And God was angry. And an angel of the Lord stood in the way against Balaam, who sat on the ass, and had two servants with him.',
  },
  'NUM 22:23': {
    rsv: 'And the ass saw the angel of the LORD standing in the road, with a drawn sword in his hand; and the ass turned aside out of the road, and went into the field; and Balaam struck the ass, to turn her into the road.',
    dra: 'The ass seeing the angel standing in the way, with a drawn sword, turned herself out of the way, and went into the field. And when Balaam beat her, and had a mind to bring her again to the way,',
  },
  'NUM 22:27': {
    rsv: 'When the ass saw the angel of the LORD, she lay down under Balaam; and Balaam’s anger was kindled, and he struck the ass with his staff.',
    dra: 'And when the ass saw the angel standing, she fell under the feet of the rider: who being angry beat her sides more vehemently with a staff.',
  },
  'NUM 22:28': {
    rsv: 'Then the LORD opened the mouth of the ass, and she said to Balaam, “What have I done to you, that you have struck me these three times?”',
    dra: 'And the Lord opened the mouth of the ass, and she said: What have I done to thee? Why strikest thou me, lo, now this third time?',
  },
  'NUM 22:30': {
    rsv: 'And the ass said to Balaam, “Am I not your ass, upon which you have ridden all your life long to this day? Was I ever accustomed to do so to you?” And he said, “No.”',
    dra: 'The ass said: Am not I thy beast, on which thou hast been always accustomed to ride until this present day? tell me if I ever did the like thing to thee. But he said: Never.',
  },
  'NUM 22:31': {
    rsv: 'Then the LORD opened the eyes of Balaam, and he saw the angel of the LORD standing in the way, with his drawn sword in his hand; and he bowed his head, and fell on his face.',
    dra: 'Forthwith the Lord opened the eyes of Balaam, and he saw the angel standing in the way with a drawn sword, and he worshipped him falling flat on the ground.',
  },
  'NUM 22:34': {
    rsv: 'Then Balaam said to the angel of the LORD, “I have sinned, for I did not know that thou didst stand in the road against me. Now therefore, if it is evil in thy sight, I will go back again.”',
    dra: 'Balaam said: I have sinned, not knowing that thou didst stand against me: and now if it displease thee that I go, I will return.',
  },
  'NUM 22:35': {
    rsv: 'And the angel of the LORD said to Balaam, “Go with the men; but only the word which I bid you, that shall you speak.” So Balaam went on with the princes of Balak.',
    dra: 'The angel said: Go with these men, and see thou speak no other thing than what I shall command thee. He went therefore with the princes.',
  },
  'NUM 23:7': {
    rsv: 'And Balaam took up his discourse, and said, “From Aram Balak has brought me, the king of Moab from the eastern mountains: ‘Come, curse Jacob for me, and come, denounce Israel!’',
    dra: 'And taking up his parable, he said: Balac king of the Moabites hath brought me from Aram, from the mountains of the east: Come, said he, and curse Jacob: make haste and detest Israel.',
  },
  'NUM 23:8': {
    rsv: 'How can I curse whom God has not cursed? How can I denounce whom the LORD has not denounced?',
    dra: 'How shall I curse him, whom God hath not cursed? By what means should I detest him, whom the Lord detesteth not?',
  },
  'NUM 23:11': {
    rsv: 'And Balak said to Balaam, “What have you done to me? I took you to curse my enemies, and behold, you have done nothing but bless them.”',
    dra: 'And Balac said to Balaam: What is this that thou dost? I sent for thee to curse my enemies: and thou contrariwise blessest them.',
  },
  'NUM 23:12': {
    rsv: 'And he answered, “Must I not take heed to speak what the LORD puts in my mouth?”',
    dra: 'He answered him: Can I speak any thing else but what the Lord commandeth?',
  },
  'NUM 23:19': {
    rsv: 'God is not man, that he should lie, or a son of man, that he should repent. Has he said, and will he not do it? Or has he spoken, and will he not fulfil it?',
    dra: 'God is not a man, that he should lie, nor as the son of man, that he should be changed. Hath he said then, and will he not do? hath he spoken, and will he not fulfill?',
  },
  'NUM 23:20': {
    rsv: 'Behold, I received a command to bless: he has blessed, and I cannot revoke it.',
    dra: 'I was brought to bless, the blessing I am not able to hinder.',
  },
  'NUM 24:2': {
    rsv: 'And Balaam lifted up his eyes, and saw Israel encamping tribe by tribe. And the Spirit of God came upon him,',
    dra: 'And lifting up his eyes, he saw Israel abiding in their tents by their tribes: and the spirit of God rushing upon him,',
  },
  'NUM 24:5': {
    rsv: 'How fair are your tents, O Jacob, your encampments, O Israel!',
    dra: 'How beautiful are thy tabernacles, O Jacob, and thy tents, O Israel!',
  },
  'NUM 24:10': {
    rsv: 'And Balak’s anger was kindled against Balaam, and he struck his hands together; and Balak said to Balaam, “I called you to curse my enemies, and behold, you have blessed them these three times.',
    dra: 'And Balac being angry against Balaam, clapped his hands together and said: I called thee to curse my enemies, and thou on the contrary hast blessed them three times.',
  },
  'NUM 24:16': {
    rsv: 'the oracle of him who hears the words of God, and knows the knowledge of the Most High, who sees the vision of the Almighty, falling down, but having his eyes uncovered:',
    dra: 'The hearer of the words of God hath said, who knoweth the doctrine of the Highest, and seeth the visions of the Almighty, who falling hath his eyes opened:',
  },
  'NUM 24:17': {
    rsv: 'I see him, but not now; I behold him, but not nigh: a star shall come forth out of Jacob, and a scepter shall rise out of Israel; it shall crush the forehead of Moab, and break down all the sons of Sheth.',
    dra: 'I shall see him, but not now: I shall behold him, but not near. A STAR SHALL RISE out of Jacob and a sceptre shall spring up from Israel: and shall strike the chiefs of Moab, and shall waste all the children of Seth.',
  },
  'MAT 2:1': {
    rsv: 'Now when Jesus was born in Bethlehem of Judea in the days of Herod the king, behold, wise men from the East came to Jerusalem, saying,',
    dra: 'When Jesus therefore was born in Bethlehem of Juda, in the days of king Herod, behold, there came wise men from the east to Jerusalem.',
  },
  'MAT 2:2': {
    rsv: '“Where is he who has been born king of the Jews? For we have seen his star in the East, and have come to worship him.”',
    dra: 'Saying, Where is he that is born king of the Jews? For we have seen his star in the east, and are come to adore him.',
  },
  'LUK 24:50': {
    rsv: 'Then he led them out as far as Bethany, and lifting up his hands he blessed them.',
    dra: 'And he led them out as far as Bethania: and lifting up his hands, he blessed them.',
  },
  'LUK 24:51': {
    rsv: 'While he blessed them, he parted from them and was carried up into heaven.',
    dra: 'And it came to pass, whilst he blessed them, he departed from them, and was carried up to heaven.',
  },
  'JHN 3:14': {
    rsv: 'And as Moses lifted up the serpent in the wilderness, so must the Son of man be lifted up,',
    dra: 'And as Moses lifted up the serpent in the desert, so must the Son of man be lifted up:',
  },
  'JHN 3:15': {
    rsv: 'that whoever believes in him may have eternal life.”',
    dra: 'That whosoever believeth in him, may not perish; but may have life everlasting.',
  },
  'JHN 7:37': {
    rsv: 'On the last day of the feast, the great day, Jesus stood up and proclaimed, “If any one thirst, let him come to me and drink.',
    dra: 'And on the last, and great day of the festivity, Jesus stood and cried, saying: If any man thirst, let him come to me, and drink.',
  },
  'JHN 7:38': {
    rsv: 'He who believes in me, as the scripture has said, ‘Out of his heart shall flow rivers of living water.’”',
    dra: 'He that believeth in me, as the scripture saith, Out of his belly shall flow rivers of living water.',
  },
  'ACT 2:17': {
    rsv: '‘And in the last days it shall be, God declares, that I will pour out my Spirit upon all flesh, and your sons and your daughters shall prophesy, and your young men shall see visions, and your old men shall dream dreams;',
    dra: 'And it shall come to pass, in the last days, (saith the Lord,) I will pour out of my Spirit upon all flesh: and your sons and your daughters shall prophesy, and your young men shall see visions, and your old men shall dream dreams.',
  },
  'ACT 2:18': {
    rsv: 'yea, and on my menservants and my maidservants in those days I will pour out my Spirit; and they shall prophesy.',
    dra: 'And upon my servants indeed, and upon my handmaids will I pour out in those days of my spirit, and they shall prophesy.',
  },
  'GAL 3:13': {
    rsv: 'Christ redeemed us from the curse of the law, having become a curse for us—for it is written, “Cursed be every one who hangs on a tree”—',
    dra: 'Christ hath redeemed us from the curse of the law, being made a curse for us: for it is written: Cursed is every one that hangeth on a tree:',
  },
  'GAL 3:14': {
    rsv: 'that in Christ Jesus the blessing of Abraham might come upon the Gentiles, that we might receive the promise of the Spirit through faith.',
    dra: 'That the blessing of Abraham might come on the Gentiles through Christ Jesus: that we may receive the promise of the Spirit by faith.',
  },
  'HEB 3:19': {
    rsv: 'So we see that they were unable to enter because of unbelief.',
    dra: 'And we see that they could not enter in, because of unbelief.',
  },
  'HEB 4:9': {
    rsv: 'So then, there remains a sabbath rest for the people of God;',
    dra: 'There remaineth therefore a day of rest for the people of God.',
  },
  'HEB 5:4': {
    rsv: 'And one does not take the honor upon himself, but he is called by God, just as Aaron was.',
    dra: 'Neither doth any man take the honour to himself, but he that is called by God, as Aaron was.',
  },
  'HEB 5:5': {
    rsv: 'So also Christ did not exalt himself to be made a high priest, but was appointed by him who said to him, “Thou art my Son, today I have begotten thee”;',
    dra: 'So Christ also did not glorify himself, that he might be made a high priest: but he that said unto him: Thou art my Son, this day have I begotten thee.',
  },
  'HEB 9:4': {
    rsv: 'having the golden altar of incense and the ark of the covenant covered on all sides with gold, which contained a golden urn holding the manna, and Aaron’s rod that budded, and the tables of the covenant;',
    dra: 'Having a golden censer, and the ark of the testament covered about on every part with gold, in which was a golden pot that had manna, and the rod of Aaron, that had blossomed, and the tables of the testament.',
  },
  'REV 22:16': {
    rsv: '“I Jesus have sent my angel to you with this testimony for the churches. I am the root and the offspring of David, the bright morning star.”',
    dra: 'I Jesus have sent my angel, to testify to you these things in the churches. I am the root and stock of David, the bright and morning star.',
  },
  // Level 13 · Moses' Last Words (the Douay-Rheims numbers these chapters as the RSV does).
  'DEU 1:1': {
    rsv: 'These are the words that Moses spoke to all Israel beyond the Jordan in the wilderness, in the Arabah over against Suph, between Paran and Tophel, Laban, Hazeroth, and Dizahab.',
    dra: 'These are the words, which Moses spoke to all Israel beyond the Jordan, in the plain wilderness, over against the Red Sea, between Pharan and Thophel and Laban and Haseroth, where there is very much gold:',
  },
  'DEU 1:3': {
    rsv: 'And in the fortieth year, on the first day of the eleventh month, Moses spoke to the people of Israel according to all that the LORD had given him in commandment to them,',
    dra: 'In the fortieth year, the eleventh month, the first day of the month, Moses spoke to the children of Israel all that the Lord had commanded him to say to them:',
  },
  'DEU 1:5': {
    rsv: 'Beyond the Jordan, in the land of Moab, Moses undertook to explain this law, saying,',
    dra: 'Beyond the Jordan in the land of Moab. And Moses began to expound the law, and to say:',
  },
  'DEU 6:3': {
    rsv: 'Hear therefore, O Israel, and be careful to do them; that it may go well with you, and that you may multiply greatly, as the LORD, the God of your fathers, has promised you, in a land flowing with milk and honey.',
    dra: 'Hear, O Israel, and observe to do the things which the Lord hath commanded thee, that it may be well with thee, and thou mayst be greatly multiplied, as the Lord the God of thy fathers hath promised thee a land flowing with milk and honey.',
  },
  'DEU 6:4': {
    rsv: '“Hear, O Israel: The LORD our God is one LORD;',
    dra: 'Hear, O Israel, the Lord our God is one Lord.',
  },
  'DEU 6:5': {
    rsv: 'and you shall love the LORD your God with all your heart, and with all your soul, and with all your might.',
    dra: 'Thou shalt love the Lord thy God with thy whole heart, and with thy whole soul, and with thy whole strength.',
  },
  'DEU 6:6': {
    rsv: 'And these words which I command you this day shall be upon your heart;',
    dra: 'And these words which I command thee this day, shall be in thy heart:',
  },
  'DEU 6:7': {
    rsv: 'and you shall teach them diligently to your children, and shall talk of them when you sit in your house, and when you walk by the way, and when you lie down, and when you rise.',
    dra: 'And thou shalt tell them to thy children, and thou shalt meditate upon them sitting in thy house, and walking on thy journey, sleeping and rising.',
  },
  'DEU 6:8': {
    rsv: 'And you shall bind them as a sign upon your hand, and they shall be as frontlets between your eyes.',
    dra: 'And thou shalt bind them as a sign on thy hand, and they shall be and shall move between thy eyes.',
  },
  'DEU 6:9': {
    rsv: 'And you shall write them on the doorposts of your house and on your gates.',
    dra: 'And thou shalt write them in the entry, and on the doors of thy house.',
  },
  'DEU 6:20': {
    rsv: '“When your son asks you in time to come, ‘What is the meaning of the testimonies and the statutes and the ordinances which the LORD our God has commanded you?’',
    dra: 'And when thy son shall ask thee to morrow, saying: What mean these testimonies, and ceremonies and judgments, which the Lord our God hath commanded us?',
  },
  'DEU 6:21': {
    rsv: 'then you shall say to your son, ‘We were Pharaoh’s slaves in Egypt; and the LORD brought us out of Egypt with a mighty hand;',
    dra: 'Thou shalt say to him: We were bondmen of Pharao in Egypt, and the Lord brought us out of Egypt with a strong hand.',
  },
  'DEU 6:23': {
    rsv: 'and he brought us out from there, that he might bring us in and give us the land which he swore to give to our fathers.',
    dra: 'And he brought us out from thence, that he might bring us in and give us the land, concerning which he swore to our fathers.',
  },
  'DEU 6:24': {
    rsv: 'And the LORD commanded us to do all these statutes, to fear the LORD our God, for our good always, that he might preserve us alive, as at this day.',
    dra: 'And the Lord commanded that we should do all these ordinances, and should fear the Lord our God, that it might be well with us all the days of our life, as it is at this day.',
  },
  'DEU 8:2': {
    rsv: 'And you shall remember all the way which the LORD your God has led you these forty years in the wilderness, that he might humble you, testing you to know what was in your heart, whether you would keep his commandments, or not.',
    dra: 'And thou shalt remember all the way through which the Lord thy God hath brought thee for forty years through the desert, to afflict thee and to prove thee, and that the things that were in thy heart might be made known, whether thou wouldst keep his commandments or no.',
  },
  'DEU 8:3': {
    rsv: 'And he humbled you and let you hunger and fed you with manna, which you did not know, nor did your fathers know; that he might make you know that man does not live by bread alone, but that man lives by everything that proceeds out of the mouth of the LORD.',
    dra: 'He afflicted thee with want, and gave thee manna for thy food, which neither thou nor thy fathers knew: to shew that not in bread alone doth man live, but in every word that proceedeth from the mouth of God.',
  },
  'DEU 8:4': {
    rsv: 'Your clothing did not wear out upon you, and your foot did not swell, these forty years.',
    dra: 'Thy raiment, with which thou wast covered, hath not decayed for age, and thy foot is not worn, lo this is the fortieth year,',
  },
  'DEU 8:7': {
    rsv: 'For the LORD your God is bringing you into a good land, a land of brooks of water, of fountains and springs, flowing forth in valleys and hills,',
    dra: 'For the Lord thy God will bring thee into a good land, of brooks and of waters, and of fountains: in the plains of which and the hills deep rivers break out:',
  },
  'DEU 8:8': {
    rsv: 'a land of wheat and barley, of vines and fig trees and pomegranates, a land of olive trees and honey,',
    dra: 'A land of wheat, and barley, and vineyards, wherein fig trees and pomegranates, and oliveyards grow: a land of oil and honey.',
  },
  'DEU 8:10': {
    rsv: 'And you shall eat and be full, and you shall bless the LORD your God for the good land he has given you.',
    dra: 'That when thou hast eaten, and art full, thou mayst bless the Lord thy God for the excellent land which he hath given thee.',
  },
  'DEU 8:11': {
    rsv: '“Take heed lest you forget the LORD your God, by not keeping his commandments and his ordinances and his statutes, which I command you this day:',
    dra: 'Take heed, and beware lest at any time thou forget the Lord thy God, and neglect his commandments and judgments and ceremonies, which I command thee this day:',
  },
  'DEU 8:17': {
    rsv: 'Beware lest you say in your heart, ‘My power and the might of my hand have gotten me this wealth.’',
    dra: 'Lest thou shouldst say in thy heart: My own might, and the strength of my own hand have achieved all these things for me.',
  },
  'DEU 8:18': {
    rsv: 'You shall remember the LORD your God, for it is he who gives you power to get wealth; that he may confirm his covenant which he swore to your fathers, as at this day.',
    dra: 'But remember the Lord thy God, that he hath given thee strength, that he might fulfill his covenant, concerning which he swore to thy fathers, as this present day sheweth.',
  },
  'DEU 18:15': {
    rsv: '“The LORD your God will raise up for you a prophet like me from among you, from your brethren—him you shall heed—',
    dra: 'The Lord thy God will raise up to thee a PROPHET of thy nation and of thy brethren like unto me: him thou shalt hear:',
  },
  'DEU 18:16': {
    rsv: 'just as you desired of the LORD your God at Horeb on the day of the assembly, when you said, ‘Let me not hear again the voice of the LORD my God, or see this great fire any more, lest I die.’',
    dra: 'As thou desiredst of the Lord thy God in Horeb, when the assembly was gathered together, and saidst: Let me not hear any more the voice of the Lord my God, neither let me see any more this exceeding great fire, lest I die.',
  },
  'DEU 18:18': {
    rsv: 'I will raise up for them a prophet like you from among their brethren; and I will put my words in his mouth, and he shall speak to them all that I command him.',
    dra: 'I will raise them up a prophet out of the midst of their brethren like to thee: and I will put my words in his mouth, and he shall speak to them all that I shall command him.',
  },
  'DEU 30:11': {
    rsv: '“For this commandment which I command you this day is not too hard for you, neither is it far off.',
    dra: 'This commandment, that I command thee this day is not above thee, nor far off from thee:',
  },
  'DEU 30:12': {
    rsv: 'It is not in heaven, that you should say, ‘Who will go up for us to heaven, and bring it to us, that we may hear it and do it?’',
    dra: 'Nor is it in heaven, that thou shouldst say: Which of us can go up to heaven to bring it unto us, and we may hear and fulfill it in work?',
  },
  'DEU 30:13': {
    rsv: 'Neither is it beyond the sea, that you should say, ‘Who will go over the sea for us, and bring it to us, that we may hear it and do it?’',
    dra: 'Nor is it beyond the sea: that thou mayst excuse thyself, and say: Which of us can cross the sea, and bring it unto us: that we may hear, and do that which is commanded?',
  },
  'DEU 30:14': {
    rsv: 'But the word is very near you; it is in your mouth and in your heart, so that you can do it.',
    dra: 'But the word is very nigh unto thee, in thy mouth and in thy heart, that thou mayst do it.',
  },
  'DEU 30:15': {
    rsv: '“See, I have set before you this day life and good, death and evil.',
    dra: 'Consider that I have set before thee this day life and good, and on the other hand death and evil:',
  },
  'DEU 30:16': {
    rsv: 'If you obey the commandments of the LORD your God which I command you this day, by loving the LORD your God, by walking in his ways, and by keeping his commandments and his statutes and his ordinances, then you shall live and multiply, and the LORD your God will bless you in the land which you are entering to take possession of it.',
    dra: 'That thou mayst love the Lord thy God, and walk in his ways, and keep his commandments and ceremonies and judgments, and thou mayst live, and he may multiply thee, and bless thee in the land, which thou shalt go in to possess.',
  },
  'DEU 30:19': {
    rsv: 'I call heaven and earth to witness against you this day, that I have set before you life and death, blessing and curse; therefore choose life, that you and your descendants may live,',
    dra: 'I call heaven and earth to witness this day, that I have set before you life and death, blessing and cursing. Choose therefore life, that both thou and thy seed may live:',
  },
  'DEU 30:20': {
    rsv: 'loving the LORD your God, obeying his voice, and cleaving to him; for that means life to you and length of days, that you may dwell in the land which the LORD swore to your fathers, to Abraham, to Isaac, and to Jacob, to give them.”',
    dra: 'And that thou mayst love the Lord thy God, and obey his voice, and adhere to him (for he is thy life, and the length of thy days,) that thou mayst dwell in the land, for which the Lord swore to thy fathers Abraham, Isaac, and Jacob that he would give it them.',
  },
  'DEU 31:2': {
    rsv: 'And he said to them, “I am a hundred and twenty years old this day; I am no longer able to go out and come in. The LORD has said to me, ‘You shall not go over this Jordan.’',
    dra: 'And he said to them: I am this day a hundred and twenty years old, I can no longer go out and come in, especially as the Lord also hath said to me: O Thou shalt not pass over this Jordan.',
  },
  'DEU 31:6': {
    rsv: 'Be strong and of good courage, do not fear or be in dread of them: for it is the LORD your God who goes with you; he will not fail you or forsake you.”',
    dra: 'Do manfully and be of good heart: fear not, nor be ye dismayed at their sight: for the Lord thy God he himself is thy leader, and will not leave thee nor forsake thee.',
  },
  'DEU 31:7': {
    rsv: 'Then Moses summoned Joshua, and said to him in the sight of all Israel, “Be strong and of good courage; for you shall go with this people into the land which the LORD has sworn to their fathers to give them; and you shall put them in possession of it.',
    dra: 'And Moses called Josue, and said to him before all Israel: Take courage, and be valiant: for thou shalt bring this people into the land which the Lord swore he would give to their fathers, and thou shalt divide it by lot.',
  },
  'DEU 31:8': {
    rsv: 'It is the LORD who goes before you; he will be with you, he will not fail you or forsake you; do not fear or be dismayed.”',
    dra: 'And the Lord who is your leader, he himself will be with thee: he will not leave thee, nor forsake thee: fear not, neither be dismayed.',
  },
  'DEU 31:23': {
    rsv: 'And the LORD commissioned Joshua the son of Nun and said, “Be strong and of good courage; for you shall bring the children of Israel into the land which I swore to give them: I will be with you.”',
    dra: 'And the Lord commanded Josue the son of Nun, and said: Take courage, and be valiant: for thou shalt bring the children of Israel into the land which I have promised, and I will be with thee.',
  },
  'DEU 31:24': {
    rsv: 'When Moses had finished writing the words of this law in a book, to the very end,',
    dra: 'Therefore after Moses had wrote the words of this law in a volume, and finished it:',
  },
  'DEU 34:1': {
    rsv: 'And Moses went up from the plains of Moab to Mount Nebo, to the top of Pisgah, which is opposite Jericho. And the LORD showed him all the land, Gilead as far as Dan,',
    dra: 'Then Moses went up from the plains of Moab upon mount Nebo, to the top of Phasga over against Jericho: and the Lord shewed him all the land of Galaad as far as Dan.',
  },
  'DEU 34:2': {
    rsv: 'all Naphtali, the land of Ephraim and Manasseh, all the land of Judah as far as the western sea,',
    dra: 'And all Nephtali, and the land of Ephraim and Manasses, and all the land of Juda unto the furthermost sea,',
  },
  'DEU 34:3': {
    rsv: 'the Negeb, and the Plain, that is, the valley of Jericho the city of palm trees, as far as Zoar.',
    dra: 'And the south part, and the breadth of the plain of Jericho the city of palm trees as far as Segor.',
  },
  'DEU 34:4': {
    rsv: 'And the LORD said to him, “This is the land of which I swore to Abraham, to Isaac, and to Jacob, ‘I will give it to your descendants.’ I have let you see it with your eyes, but you shall not go over there.”',
    dra: 'And the Lord said to him: This is the land, for which I swore to Abraham, Isaac, and Jacob, saying: I will give it to thy seed. Thou hast seen it with thy eyes, and shalt not pass over to it.',
  },
  'DEU 34:5': {
    rsv: 'So Moses the servant of the LORD died there in the land of Moab, according to the word of the LORD,',
    dra: 'And Moses the servant of the Lord died there, in the land of Moab, by the commandment of the Lord:',
  },
  'DEU 34:6': {
    rsv: 'and he buried him in the valley in the land of Moab opposite Beth-peor; but no man knows the place of his burial to this day.',
    dra: 'And he buried him in the valley of the land of Moab over against Phogor: and no man hath known of his sepulchre until this present day.',
  },
  'DEU 34:7': {
    rsv: 'Moses was a hundred and twenty years old when he died; his eye was not dim, nor his natural force abated.',
    dra: 'Moses was a hundred and twenty years old when he died: his eye was not dim, neither were his teeth moved.',
  },
  'DEU 34:8': {
    rsv: 'And the people of Israel wept for Moses in the plains of Moab thirty days; then the days of weeping and mourning for Moses were ended.',
    dra: 'And the children of Israel mourned for him in the plains of Moab thirty days: and the days of their mourning in which they mourned for Moses were ended.',
  },
  'DEU 34:9': {
    rsv: 'And Joshua the son of Nun was full of the spirit of wisdom, for Moses had laid his hands upon him; so the people of Israel obeyed him, and did as the LORD had commanded Moses.',
    dra: 'And Josue the son of Nun was filled with the spirit of wisdom, because Moses had laid his hands upon him. And the children of Israel obeyed him, and did as the Lord commanded Moses.',
  },
  'DEU 34:10': {
    rsv: 'And there has not arisen a prophet since in Israel like Moses, whom the LORD knew face to face,',
    dra: 'And there arose no more a prophet in Israel like unto Moses, whom the Lord knew face to face,',
  },
  'DEU 34:11': {
    rsv: 'none like him for all the signs and the wonders which the LORD sent him to do in the land of Egypt, to Pharaoh and to all his servants and to all his land,',
    dra: 'In all the signs and wonders, which he sent by him, to do in the land of Egypt to Pharao, and to all his servants, and to his whole land,',
  },
  'MAT 17:1': {
    rsv: 'And after six days Jesus took with him Peter and James and John his brother, and led them up a high mountain apart.',
    dra: 'And after six days Jesus taketh unto him Peter and James, and John his brother, and bringeth them up into a high mountain apart:',
  },
  'MAT 17:3': {
    rsv: 'And behold, there appeared to them Moses and Elijah, talking with him.',
    dra: 'And behold there appeared to them Moses and Elias talking with him.',
  },
  'MAT 17:5': {
    rsv: 'He was still speaking, when lo, a bright cloud overshadowed them, and a voice from the cloud said, “This is my beloved Son, with whom I am well pleased; listen to him.”',
    dra: 'And as he was yet speaking, behold a bright cloud overshadowed them. And lo, a voice out of the cloud, saying: This is my beloved Son, in whom I am well pleased: hear ye him.',
  },
  'MRK 12:29': {
    rsv: 'Jesus answered, “The first is, ‘Hear, O Israel: The Lord our God, the Lord is one;',
    dra: 'And Jesus answered him: The first commandment of all is, Hear, O Israel: the Lord thy God is one God.',
  },
  'MRK 12:30': {
    rsv: 'and you shall love the Lord your God with all your heart, and with all your soul, and with all your mind, and with all your strength.’',
    dra: 'And thou shalt love the Lord thy God, with thy whole heart, and with thy whole soul, and with thy whole mind, and with thy whole strength. This is the first commandment.',
  },
  'LUK 4:1': {
    rsv: 'And Jesus, full of the Holy Spirit, returned from the Jordan, and was led by the Spirit',
    dra: 'And Jesus being full of the Holy Ghost, returned from the Jordan, and was led by the Spirit into the desert,',
  },
  'LUK 4:2': {
    rsv: 'for forty days in the wilderness, tempted by the devil. And he ate nothing in those days; and when they were ended, he was hungry.',
    dra: 'For the space of forty days; and was tempted by the devil. And he ate nothing in those days; and when they were ended, he was hungry.',
  },
  'LUK 4:4': {
    rsv: 'And Jesus answered him, “It is written, ‘Man shall not live by bread alone.’”',
    dra: 'And Jesus answered him: It is written, that Man liveth not by bread alone, but by every word of God.',
  },
  'JHN 10:10': {
    rsv: 'The thief comes only to steal and kill and destroy; I came that they may have life, and have it abundantly.',
    dra: 'The thief cometh not, but for to steal, and to kill, and to destroy. I am come that they may have life, and may have it more abundantly.',
  },
  'JHN 14:6': {
    rsv: 'Jesus said to him, “I am the way, and the truth, and the life; no one comes to the Father, but by me.',
    dra: 'Jesus saith to him: I am the way, and the truth, and the life. No man cometh to the Father, but by me.',
  },
  'ACT 3:22': {
    rsv: 'Moses said, ‘The Lord God will raise up for you a prophet from your brethren as he raised me up. You shall listen to him in whatever he tells you.',
    dra: 'For Moses said: A prophet shall the Lord your God raise up unto you of your brethren, like unto me: him you shall hear according to all things whatsoever he shall speak to you.',
  },
  // Level 14 · Joshua (the Douay-Rheims numbers the end of Joshua 5 one higher, the end of Joshua 21 two
  // lower and John 6 from verse 66 one higher; two of Bible Gateway's slips in it are set right).
  'JOS 1:1': {
    rsv: 'After the death of Moses the servant of the LORD, the LORD said to Joshua the son of Nun, Moses’ minister,',
    dra: 'Now it came to pass after the death of Moses the servant of the Lord, that the Lord spoke to Josue the son of Nun, the minister of Moses, and said to him:',
  },
  'JOS 1:2': {
    rsv: '“Moses my servant is dead; now therefore arise, go over this Jordan, you and all this people, into the land which I am giving to them, to the people of Israel.',
    dra: 'Moses my servant is dead: arise, and pass over this Jordan, thou and thy people with thee, into the land which I will give to the children of Israel.',
  },
  'JOS 1:5': {
    rsv: 'No man shall be able to stand before you all the days of your life; as I was with Moses, so I will be with you; I will not fail you or forsake you.',
    dra: 'No man shall be able to resist you all the days of thy life: as I have been with Moses, so will I be with thee: I will not leave thee, nor forsake thee.',
  },
  'JOS 1:9': {
    rsv: 'Have I not commanded you? Be strong and of good courage; be not frightened, neither be dismayed; for the LORD your God is with you wherever you go.”',
    dra: 'Behold I command thee, take courage, and be strong. Fear not and be not dismayed: because the Lord thy God is with thee in all things whatsoever thou shalt go to.',
  },
  'JOS 2:1': {
    rsv: 'And Joshua the son of Nun sent two men secretly from Shittim as spies, saying, “Go, view the land, especially Jericho.” And they went, and came into the house of a harlot whose name was Rahab, and lodged there.',
    dra: 'And Josue the son of Nun sent from Setim two men, to spy secretly: and said to them: Go, and view the land and the city of Jericho. They went and entered into the house of a woman that was a harlot named Rahab, and lodged with her.',
  },
  'JOS 2:3': {
    rsv: 'Then the king of Jericho sent to Rahab, saying, “Bring forth the men that have come to you, who entered your house; for they have come to search out all the land.”',
    dra: 'And the king of Jericho sent to Rahab, saying: Bring forth the men that came to thee, and are entered into thy house: for they are spies, and are come to view all the land.',
  },
  'JOS 2:4': {
    rsv: 'But the woman had taken the two men and hidden them; and she said, “True, men came to me, but I did not know where they came from;',
    dra: 'And the woman taking the men, hid them, and said: I confess they came to me, but I knew not whence they were:',
  },
  'JOS 2:9': {
    rsv: 'and said to the men, “I know that the LORD has given you the land, and that the fear of you has fallen upon us, and that all the inhabitants of the land melt away before you.',
    dra: 'I know that the Lord hath given this land to you: for the dread of you is fallen upon us, and all the inhabitants of the land have lost all strength.',
  },
  'JOS 2:11': {
    rsv: 'And as soon as we heard it, our hearts melted, and there was no courage left in any man, because of you; for the LORD your God is he who is God in heaven above and on earth beneath.',
    dra: 'And hearing these things we were affrighted, and our heart fainted away, neither did there remain any spirit in us at your coming in: for the Lord your God he is God in heaven above, and in the earth beneath.',
  },
  'JOS 2:12': {
    rsv: 'Now then, swear to me by the LORD that as I have dealt kindly with you, you also will deal kindly with my father’s house, and give me a sure sign,',
    dra: 'Now therefore swear ye to me by the Lord, that as I have shewn mercy to you, so you also will shew mercy to my father’s house: and give me a true token,',
  },
  'JOS 2:15': {
    rsv: 'Then she let them down by a rope through the window, for her house was built into the city wall, so that she dwelt in the wall.',
    dra: 'Then she let them down with a cord out of a window: for her house joined close to the wall.',
  },
  'JOS 2:18': {
    rsv: 'Behold, when we come into the land, you shall bind this scarlet cord in the window through which you let us down; and you shall gather into your house your father and mother, your brothers, and all your father’s household.',
    dra: 'If when we come into the land, this scarlet cord be a sign, and thou tie it in the window, by which thou hast let us down: and gather together thy father and mother, and brethren and all thy kindred into thy house.',
  },
  'JOS 2:21': {
    rsv: 'And she said, “According to your words, so be it.” Then she sent them away, and they departed; and she bound the scarlet cord in the window.',
    dra: 'And she answered: As you have spoken, so be it done. And sending them on their way, she hung the scarlet cord in the window.',
  },
  'JOS 2:24': {
    rsv: 'And they said to Joshua, “Truly the LORD has given all the land into our hands; and moreover all the inhabitants of the land are fainthearted because of us.”',
    dra: 'And said: The Lord hath delivered all this land into our hands, and all the inhabitants thereof are overthrown with fear.',
  },
  'JOS 3:5': {
    rsv: 'And Joshua said to the people, “Sanctify yourselves; for tomorrow the LORD will do wonders among you.”',
    dra: 'And Josue said to the people: Be ye sanctified: for to morrow the Lord will do wonders among you.',
  },
  'JOS 3:6': {
    rsv: 'And Joshua said to the priests, “Take up the ark of the covenant, and pass on before the people.” And they took up the ark of the covenant, and went before the people.',
    dra: 'And he said to the priests: Take up the ark of the covenant, and go before the people. And they obeyed his commands, and took it up and walked before them.',
  },
  'JOS 3:13': {
    rsv: 'And when the soles of the feet of the priests who bear the ark of the LORD, the Lord of all the earth, shall rest in the waters of the Jordan, the waters of the Jordan shall be stopped from flowing, and the waters coming down from above shall stand in one heap.”',
    dra: 'And when the priests, that carry the ark of the Lord the God of the whole earth, shall set the soles of their feet in the waters of the Jordan, the waters that are beneath shall run down and go off: and those that come from above, shall stand together upon a heap.',
  },
  'JOS 3:15': {
    rsv: 'and when those who bore the ark had come to the Jordan, and the feet of the priests bearing the ark were dipped in the brink of the water (the Jordan overflows all its banks throughout the time of harvest),',
    dra: 'And as soon as they came into the Jordan, and their feet were dipped in part of the water, (now the Jordan, it being harvest time, had filled the banks of its channel,)',
  },
  'JOS 3:16': {
    rsv: 'the waters coming down from above stood and rose up in a heap far off, at Adam, the city that is beside Zarethan, and those flowing down toward the sea of the Arabah, the Salt Sea, were wholly cut off; and the people passed over opposite Jericho.',
    dra: 'The waters that came down from above stood in one place, and swelling up like a mountain, were seen afar off from the city that is called Adom, to the place of Sarthan: but those that were beneath, ran down into the sea of the wilderness (which now is called the Dead Sea) until they wholly failed.',
  },
  'JOS 3:17': {
    rsv: 'And while all Israel were passing over on dry ground, the priests who bore the ark of the covenant of the LORD stood on dry ground in the midst of the Jordan, until all the nation finished passing over the Jordan.',
    dra: 'And the people marched over against Jericho: and the priests that carried the ark of the covenant of the Lord, stood girded upon the dry ground in the midst of the Jordan, and all the people passed over through the channel that was dried up.',
  },
  'JOS 4:2': {
    rsv: '“Take twelve men from the people, from each tribe a man,',
    dra: 'Choose twelve men, one of every tribe:',
  },
  'JOS 4:3': {
    rsv: 'and command them, ‘Take twelve stones from here out of the midst of the Jordan, from the very place where the priests’ feet stood, and carry them over with you, and lay them down in the place where you lodge tonight.’”',
    dra: 'And command them to take out of the midst of the Jordan, where the feet of the priests stood, twelve very hard stones, which you shall set in the place of the camp, where you shall pitch your tents this night.',
  },
  'JOS 4:6': {
    rsv: 'that this may be a sign among you, when your children ask in time to come, ‘What do those stones mean to you?’',
    dra: 'That it may be a sign among you and when your children shall ask you to morrow, saying: What mean these stones?',
  },
  'JOS 4:7': {
    rsv: 'Then you shall tell them that the waters of the Jordan were cut off before the ark of the covenant of the LORD; when it passed over the Jordan, the waters of the Jordan were cut off. So these stones shall be to the people of Israel a memorial for ever.”',
    dra: 'You shall answer them: The waters of the Jordan ran off before the ark of the covenant of the Lord, when it passed over the same: therefore were these atones set for a monument of the children of Israel for ever.',
  },
  'JOS 4:19': {
    rsv: 'The people came up out of the Jordan on the tenth day of the first month, and they encamped in Gilgal on the east border of Jericho.',
    dra: 'And the people came up out of the Jordan, the tenth day of the first month, and camped in Galgal, over against the east side of the city of Jericho.',
  },
  'JOS 4:20': {
    rsv: 'And those twelve stones, which they took out of the Jordan, Joshua set up in Gilgal.',
    dra: 'And the twelve stones which they had taken out of the channel of the Jordan, Josue pitched in Galgal,',
  },
  'JOS 5:10': {
    rsv: 'While the people of Israel were encamped in Gilgal they kept the passover on the fourteenth day of the month at evening in the plains of Jericho.',
    dra: 'And the children of Israel abode in Galgal, and they kept the phase on the fourteenth day of the month, at evening, in the plains of Jericho:',
  },
  'JOS 5:12': {
    rsv: 'And the manna ceased on the morrow, when they ate of the produce of the land; and the people of Israel had manna no more, but ate of the fruit of the land of Canaan that year.',
    dra: 'And the manna ceased after they ate of the corn of the land, neither did the children of Israel use that food any more, but they ate of the corn of the present year of the land of Chanaan.',
  },
  'JOS 5:13': {
    rsv: 'When Joshua was by Jericho, he lifted up his eyes and looked, and behold, a man stood before him with his drawn sword in his hand; and Joshua went to him and said to him, “Are you for us, or for our adversaries?”',
    dra: 'And when Josue was in the field of the city of Jericho, he lifted up his eyes, and saw a man standing over against him: holding a drawn sword, and he went to him, and said: Art thou one of ours, or of our adversaries?',
  },
  'JOS 5:15': {
    rsv: 'And the commander of the LORD’s army said to Joshua, “Put off your shoes from your feet; for the place where you stand is holy.” And Joshua did so.',
    dra: 'Loose, saith he, thy shoes from off thy feet: for the place whereon thou standest is holy. And Josue did as was commanded him.',
  },
  'JOS 6:1': {
    rsv: 'Now Jericho was shut up from within and from without because of the people of Israel; none went out, and none came in.',
    dra: 'Now Jericho was close shut up and fenced, for fear of the children of Israel, and no man durst go out or come in.',
  },
  'JOS 6:2': {
    rsv: 'And the LORD said to Joshua, “See, I have given into your hand Jericho, with its king and mighty men of valor.',
    dra: 'And the Lord said to Josue: Behold I have given into thy hands Jericho, and the king thereof, and all the valiant men.',
  },
  'JOS 6:3': {
    rsv: 'You shall march around the city, all the men of war going around the city once. Thus shall you do for six days.',
    dra: 'Go round about the city, all ye fighting men, once a day: so shall ye do for six days.',
  },
  'JOS 6:4': {
    rsv: 'And seven priests shall bear seven trumpets of rams’ horns before the ark; and on the seventh day you shall march around the city seven times, the priests blowing the trumpets.',
    dra: 'And on the seventh day the priests shall take the seven trumpets, which are used in the jubilee, and shall go before the ark of the covenant: and you shall go about the city seven times, and the priests shall sound the trumpets.',
  },
  'JOS 6:5': {
    rsv: 'And when they make a long blast with the ram’s horn, as soon as you hear the sound of the trumpet, then all the people shall shout with a great shout; and the wall of the city will fall down flat, and the people shall go up every man straight before him.”',
    dra: 'And when the voice of the trumpet shall give a longer and broken tune, and shall sound in your ears, all the people shall shout together with a very great shout, and the walls of the city shall fall to the ground, and they shall enter in every one at the place against which they shall stand.',
  },
  'JOS 6:10': {
    rsv: 'But Joshua commanded the people, “You shall not shout or let your voice be heard, neither shall any word go out of your mouth, until the day I bid you shout; then you shall shout.”',
    dra: 'But Josue had commanded the people, saying: You shall not shout, nor shall your voice be heard, nor any word go out of your mouth: until the day come wherein I shall say to you: Cry, and shout.',
  },
  'JOS 6:15': {
    rsv: 'On the seventh day they rose early at the dawn of day, and marched around the city in the same manner seven times: it was only on that day that they marched around the city seven times.',
    dra: 'But the seventh day, rising up early, they went about the city, as it was ordered, seven times.',
  },
  'JOS 6:16': {
    rsv: 'And at the seventh time, when the priests had blown the trumpets, Joshua said to the people, “Shout; for the LORD has given you the city.',
    dra: 'And when in the seventh going about the priests sounded with the trumpets, Josue said to all Israel: Shout: for the Lord hath delivered the city to you:',
  },
  'JOS 6:20': {
    rsv: 'So the people shouted, and the trumpets were blown. As soon as the people heard the sound of the trumpet, the people raised a great shout, and the wall fell down flat, so that the people went up into the city, every man straight before him, and they took the city.',
    dra: 'So all the people making a shout, and the trumpets sounding, when the voice and the sound thundered in the ears of the multitude, the walls forthwith fell down: and every man went up by the place that was over against him: and they took the city,',
  },
  'JOS 6:25': {
    rsv: 'But Rahab the harlot, and her father’s household, and all who belonged to her, Joshua saved alive; and she dwelt in Israel to this day, because she hid the messengers whom Joshua sent to spy out Jericho.',
    dra: 'But Josue saved Rahab the harlot and her father’s house, and all she had, and they dwelt in the midst of Israel until this present day: because she hid the messengers whom he had sent to spy out Jericho. At that time, Josue made an imprecation, saying:',
  },
  'JOS 6:27': {
    rsv: 'So the LORD was with Joshua; and his fame was in all the land.',
    dra: 'And the Lord was with Josue, and his name was noised throughout all the land.',
  },
  'JOS 7:1': {
    rsv: 'But the people of Israel broke faith in regard to the devoted things; for Achan the son of Carmi, son of Zabdi, son of Zerah, of the tribe of Judah, took some of the devoted things; and the anger of the LORD burned against the people of Israel.',
    dra: 'But the children of Israel transgressed the commandment, and took to their own use of the anathema. For Achan the son of Charmi, the son of Zabdi, the son of Zare of the tribe of Juda, took something of the anathema: and the Lord was angry against the children of Israel.',
  },
  'JOS 7:4': {
    rsv: 'So about three thousand went up there from the people; and they fled before the men of Ai,',
    dra: 'There went up therefore three thousand fighting men: who immediately turned their backs,',
  },
  'JOS 7:6': {
    rsv: 'Then Joshua rent his clothes, and fell to the earth upon his face before the ark of the LORD until the evening, he and the elders of Israel; and they put dust upon their heads.',
    dra: 'But Josue rent his garments, and fell flat on the ground before the ark of the Lord until the evening, both he and all the ancients of Israel: and they put dust upon their heads.',
  },
  'JOS 7:7': {
    rsv: 'And Joshua said, “Alas, O Lord GOD, why hast thou brought this people over the Jordan at all, to give us into the hands of the Amorites, to destroy us? Would that we had been content to dwell beyond the Jordan!',
    dra: 'And Josue said: Alas, O Lord God, why wouldst thou bring this people over the river Jordan, to deliver us into the hand of the Amorrhite, and to destroy us? would God, we had stayed beyond the Jordan as we began.',
  },
  'JOS 7:10': {
    rsv: 'The LORD said to Joshua, “Arise, why have you thus fallen upon your face?',
    dra: 'And the Lord said to Josue: Arise, why liest thou flat on the ground?',
  },
  'JOS 7:11': {
    rsv: 'Israel has sinned; they have transgressed my covenant which I commanded them; they have taken some of the devoted things; they have stolen, and lied, and put them among their own stuff.',
    dra: 'Israel hath sinned, and transgressed my covenant: and they have taken of the anathema, and have stolen and lied, and have hidden it among their goods.',
  },
  'JOS 7:19': {
    rsv: 'Then Joshua said to Achan, “My son, give glory to the LORD God of Israel, and render praise to him; and tell me now what you have done; do not hide it from me.”',
    dra: 'And Josue said to Achan: My son, give glory to the Lord God of Israel, and confess, and tell me what thou hast done, hide it not.',
  },
  'JOS 7:20': {
    rsv: 'And Achan answered Joshua, “Of a truth I have sinned against the LORD God of Israel, and this is what I did:',
    dra: 'And Achan answered Josue, and said to him: Indeed I have sinned against the Lord the God of Israel, and thus and thus have I done.',
  },
  'JOS 7:21': {
    rsv: 'when I saw among the spoil a beautiful mantle from Shinar, and two hundred shekels of silver, and a bar of gold weighing fifty shekels, then I coveted them, and took them; and behold, they are hidden in the earth inside my tent, with the silver underneath.”',
    dra: 'For I saw among the spoils a scarlet garment exceeding good, and two hundred sides of silver, and a golden rule of fifty sides: and I coveted them, and I took them away, and hid them in the ground is the midst of my tent, and the silver I covered with the earth that I dug up.',
  },
  'JOS 8:1': {
    rsv: 'And the LORD said to Joshua, “Do not fear or be dismayed; take all the fighting men with you, and arise, go up to Ai; see, I have given into your hand the king of Ai, and his people, his city, and his land;',
    dra: 'And the Lord said to Josue: Fear not, nor be thou dismayed: take with thee all the multitude of fighting men, arise and go up to the town of Hai. Behold I have delivered into thy hand the king thereof, and the people, and the city, and the land.',
  },
  'JOS 8:30': {
    rsv: 'Then Joshua built an altar on Mount Ebal to the LORD, the God of Israel,',
    dra: 'Then Josue built an altar to the Lord the God of Israel in mount Hebal,',
  },
  'JOS 8:34': {
    rsv: 'And afterward he read all the words of the law, the blessing and the curse, according to all that is written in the book of the law.',
    dra: 'After this he read all the words of the blessing and the cursing and all things that were written in the hook of the law.',
  },
  'JOS 8:35': {
    rsv: 'There was not a word of all that Moses commanded which Joshua did not read before all the assembly of Israel, and the women, and the little ones, and the sojourners who lived among them.',
    dra: 'He left out nothing of those things which Moses had commanded, but he repeated all before all the people of Israel, with the women and children and strangers that dwelt among them.',
  },
  'JOS 10:6': {
    rsv: 'And the men of Gibeon sent to Joshua at the camp in Gilgal, saying, “Do not relax your hand from your servants; come up to us quickly, and save us, and help us; for all the kings of the Amorites that dwell in the hill country are gathered against us.”',
    dra: 'But the inhabitants of the city of Gabaon which was besieged, sent to Josue, who then abode in the camp at Galgal, and said to him: Withdraw not thy hands from helping thy servants: come up quickly and save us, and bring us succour: for all the kings of the Amorrhites, who dwell in the mountains, are gathered together against us.',
  },
  'JOS 10:7': {
    rsv: 'So Joshua went up from Gilgal, he and all the people of war with him, and all the mighty men of valor.',
    dra: 'And Josue went up from Galgal, and all the army of the warriors with him, most valiant men.',
  },
  'JOS 10:8': {
    rsv: 'And the LORD said to Joshua, “Do not fear them, for I have given them into your hands; there shall not a man of them stand before you.”',
    dra: 'And the Lord said to Josue: Fear them not: for I have delivered them into thy hands: none of them shall be able to stand against thee.',
  },
  'JOS 10:9': {
    rsv: 'So Joshua came upon them suddenly, having marched up all night from Gilgal.',
    dra: 'So Josue going up from Galgal all the night, came upon them suddenly.',
  },
  'JOS 10:12': {
    rsv: 'Then spoke Joshua to the LORD in the day when the LORD gave the Amorites over to the men of Israel; and he said in the sight of Israel, “Sun, stand thou still at Gibeon, and thou Moon in the valley of Aijalon.”',
    dra: 'Then Josue spoke to the Lord, in the day that he delivered the Amorrhite in the sight of the children of Israel, and he said before them: Move not, O sun, toward Gabaon, nor thou, O moon, toward the valley of Ajalon.',
  },
  'JOS 10:13': {
    rsv: 'And the sun stood still, and the moon stayed, until the nation took vengeance on their enemies. Is this not written in the Book of Jashar? The sun stayed in the midst of heaven, and did not hasten to go down for about a whole day.',
    dra: 'And the sun and the moon stood still, till the people revenged themselves of their enemies. Is not this written in the book of the just? So the sun stood still in the midst of heaven, and hasted not to go down the space of one day.',
  },
  'JOS 10:14': {
    rsv: 'There has been no day like it before or since, when the LORD hearkened to the voice of a man; for the LORD fought for Israel.',
    dra: 'There was not before nor after so long a day, the Lord obeying the voice of a man, and fighting for Israel.',
  },
  'JOS 14:6': {
    rsv: 'Then the people of Judah came to Joshua at Gilgal; and Caleb the son of Jephunneh the Kenizzite said to him, “You know what the LORD said to Moses the man of God in Kadesh-barnea concerning you and me.',
    dra: 'Then the children of Juda came to Josue in Galgal, and Caleb the son of Jephone the Cenezite spoke to him: Thou knowest what the Lord spoke to Moses the man of God concerning me and thee in Cadesbarne.',
  },
  'JOS 14:7': {
    rsv: 'I was forty years old when Moses the servant of the LORD sent me from Kadesh-barnea to spy out the land; and I brought him word again as it was in my heart.',
    dra: 'I was forty years old when Moses the servant of the Lord sent me from Cadesbarne, to view the land, and I brought him word again as to me seemed true.',
  },
  'JOS 14:10': {
    rsv: 'And now, behold, the LORD has kept me alive, as he said, these forty-five years since the time that the LORD spoke this word to Moses, while Israel walked in the wilderness; and now, lo, I am this day eighty-five years old.',
    dra: 'The Lord therefore hath granted me life, as he promised until this present day. It is forty and five years since the Lord spoke this word to Moses, when Israel journeyed through the wilderness: this day I am eighty-five years old,',
  },
  'JOS 14:11': {
    rsv: 'I am still as strong to this day as I was in the day that Moses sent me; my strength now is as my strength was then, for war, and for going and coming.',
    dra: 'As strong as I was at that time when I was sent to view the land: the strength of that time continueth in me until this day, as well to fight as to march.',
  },
  'JOS 14:12': {
    rsv: 'So now give me this hill country of which the LORD spoke on that day; for you heard on that day how the Anakim were there, with great fortified cities: it may be that the LORD will be with me, and I shall drive them out as the LORD said.”',
    dra: 'Give me therefore this mountain, which the Lord promised, in thy hearing also, wherein are the Enacims, and cities great and strong: if so be the Lord will be with me, and I shall be able to destroy them, as he promised me.',
  },
  'JOS 14:13': {
    rsv: 'Then Joshua blessed him; and he gave Hebron to Caleb the son of Jephunneh for an inheritance.',
    dra: 'And Josue blessed him, and gave him Hebron in possession.',
  },
  'JOS 18:1': {
    rsv: 'Then the whole congregation of the people of Israel assembled at Shiloh, and set up the tent of meeting there; the land lay subdued before them.',
    dra: 'And all the children of Israel assembled together in Silo, and there they set up the tabernacle of the testimony, and the land was subdued before them.',
  },
  'JOS 18:8': {
    rsv: 'So the men started on their way; and Joshua charged those who went to write the description of the land, saying, “Go up and down and write a description of the land, and come again to me; and I will cast lots for you here before the LORD in Shiloh.”',
    dra: 'And when the men were risen up, to go to mark out the land, Josue commanded them, saying: Go round the land and mark it out, and return to me: that I may cast lots for you before the Lord in Silo.',
  },
  'JOS 18:10': {
    rsv: 'and Joshua cast lots for them in Shiloh before the LORD; and there Joshua apportioned the land to the people of Israel, to each his portion.',
    dra: 'And he cast lots before the Lord in Silo, and divided the land to the children of Israel into seven parts.',
  },
  'JOS 21:43': {
    rsv: 'Thus the LORD gave to Israel all the land which he swore to give to their fathers; and having taken possession of it, they settled there.',
    dra: 'And the Lord God gave to Israel all the land that he had sworn to give to their fathers: and they possessed it and dwelt in it.',
  },
  'JOS 21:45': {
    rsv: 'Not one of all the good promises which the LORD had made to the house of Israel had failed; all came to pass.',
    dra: 'Not so much as one word, which he had promised to perform unto them, was made void, but all came to pass.',
  },
  'JOS 24:1': {
    rsv: 'Then Joshua gathered all the tribes of Israel to Shechem, and summoned the elders, the heads, the judges, and the officers of Israel; and they presented themselves before God.',
    dra: 'And Josue gathered together all the tribes of Israel in Sichem, and called for the ancients, and the princes, and the judges, and the masters: and they stood in the sight of the Lord:',
  },
  'JOS 24:2': {
    rsv: 'And Joshua said to all the people, “Thus says the LORD, the God of Israel, ‘Your fathers lived of old beyond the Euphrates, Terah, the father of Abraham and of Nahor; and they served other gods.',
    dra: 'And he spoke thus to the people: Thus saith the Lord the God of Israel: Your fathers dwelt of old on the other side of the river, Thare the father of Abraham, and Nachor: and they served strange gods.',
  },
  'JOS 24:13': {
    rsv: 'I gave you a land on which you had not labored, and cities which you had not built, and you dwell therein; you eat the fruit of vineyards and oliveyards which you did not plant.’',
    dra: 'And I gave you a land, in which you had not laboured, and cities to dwell in which you built not, vineyards and oliveyards, which you planted not.',
  },
  'JOS 24:14': {
    rsv: '“Now therefore fear the LORD, and serve him in sincerity and in faithfulness; put away the gods which your fathers served beyond the River, and in Egypt, and serve the LORD.',
    dra: 'Now therefore fear the Lord, and serve him with a perfect and most sincere heart: and put away the gods which your fathers served in Mesopotamia and in Egypt, and serve the Lord.',
  },
  'JOS 24:15': {
    rsv: 'And if you be unwilling to serve the LORD, choose this day whom you will serve, whether the gods your fathers served in the region beyond the River, or the gods of the Amorites in whose land you dwell; but as for me and my house, we will serve the LORD.”',
    dra: 'But if it seem evil to you to serve the Lord, you have your choice: choose this day that which pleaseth you, whom you would rather serve, whether the gods which your fathers served in Mesopotamia, or the gods of the Amorrhites, in whose land you dwell: but as for me and my house we will serve the Lord.',
  },
  'JOS 24:16': {
    rsv: 'Then the people answered, “Far be it from us that we should forsake the LORD, to serve other gods;',
    dra: 'And the people answered, and said: God forbid we should leave the Lord, and serve strange gods.',
  },
  'JOS 24:17': {
    rsv: 'for it is the LORD our God who brought us and our fathers up from the land of Egypt, out of the house of bondage, and who did those great signs in our sight, and preserved us in all the way that we went, and among all the peoples through whom we passed;',
    dra: 'The Lord our God he brought us and our fathers out of the land of Egypt, out of the house of bondage: and did very great signs in our sight, and preserved us in all the way by which we journeyed, and among all the people through whom we passed.',
  },
  'JOS 24:18': {
    rsv: 'and the LORD drove out before us all the peoples, the Amorites who lived in the land; therefore we also will serve the LORD, for he is our God.”',
    dra: 'And he hath cast out all the nations, the Amorrhite the inhabitant of the land into which we are come. Therefore we will serve the Lord, for he is our God.',
  },
  'JOS 24:24': {
    rsv: 'And the people said to Joshua, “The LORD our God we will serve, and his voice we will obey.”',
    dra: 'And the people said to Josue: We will serve the Lord our God, and we will be obedient to his commandments.',
  },
  'JOS 24:25': {
    rsv: 'So Joshua made a covenant with the people that day, and made statutes and ordinances for them at Shechem.',
    dra: 'Josue therefore on that day made a covenant, and set before the people commandments and judgments in Sichem.',
  },
  'JOS 24:26': {
    rsv: 'And Joshua wrote these words in the book of the law of God; and he took a great stone, and set it up there under the oak in the sanctuary of the LORD.',
    dra: 'And he wrote all these things in the volume of the law of the Lord: and he took a great stone, and set it under the oak that was in the sanctuary of the Lord.',
  },
  'JOS 24:29': {
    rsv: 'After these things Joshua the son of Nun, the servant of the LORD, died, being a hundred and ten years old.',
    dra: 'And after these things Josue the son of Nun the servant of the Lord died, being a hundred and ten years old:',
  },
  'JOS 24:31': {
    rsv: 'And Israel served the LORD all the days of Joshua, and all the days of the elders who outlived Joshua and had known all the work which the LORD did for Israel.',
    dra: 'And Israel served the Lord all the days of Josue, and of the ancients that lived a long time after Josue, and that had known all the works of the Lord which he had done in Israel.',
  },
  'MAT 1:5': {
    rsv: 'and Salmon the father of Boaz by Rahab, and Boaz the father of Obed by Ruth, and Obed the father of Jesse,',
    dra: 'And Salmon begot Booz of Rahab. And Booz begot Obed of Ruth. And Obed begot Jesse.',
  },
  'MRK 1:9': {
    rsv: 'In those days Jesus came from Nazareth of Galilee and was baptized by John in the Jordan.',
    dra: 'And it came to pass, in those days, Jesus came from Nazareth of Galilee, and was baptized by John in the Jordan.',
  },
  'MRK 1:10': {
    rsv: 'And when he came up out of the water, immediately he saw the heavens opened and the Spirit descending upon him like a dove;',
    dra: 'And forthwith coming up out of the water, he saw the heavens opened, and the Spirit as a dove descending, and remaining on him.',
  },
  'JHN 6:67': {
    rsv: 'Jesus said to the twelve, “Will you also go away?”',
    dra: 'Then Jesus said to the twelve: Will you also go away?',
  },
  'JHN 6:68': {
    rsv: 'Simon Peter answered him, “Lord, to whom shall we go? You have the words of eternal life;',
    dra: 'And Simon Peter answered him: Lord, to whom shall we go? thou hast the words of eternal life.',
  },
  'ROM 8:31': {
    rsv: 'What then shall we say to this? If God is for us, who is against us?',
    dra: 'What shall we then say to these things? If God be for us, who is against us?',
  },
  '2CO 1:20': {
    rsv: 'For all the promises of God find their Yes in him. That is why we utter the Amen through him, to the glory of God.',
    dra: 'For all the promises of God are in him, It is; therefore also by him, amen to God, unto our glory.',
  },
  'HEB 11:30': {
    rsv: 'By faith the walls of Jericho fell down after they had been encircled for seven days.',
    dra: 'By faith the walls of Jericho fell down, by the going round them seven days.',
  },
  'HEB 11:31': {
    rsv: 'By faith Rahab the harlot did not perish with those who were disobedient, because she had given friendly welcome to the spies.',
    dra: 'By faith Rahab the harlot perished not with the unbelievers, receiving the spies with peace.',
  },
  '1PE 1:3': {
    rsv: 'Blessed be the God and Father of our Lord Jesus Christ! By his great mercy we have been born anew to a living hope through the resurrection of Jesus Christ from the dead,',
    dra: 'Blessed be the God and Father of our Lord Jesus Christ, who according to his great mercy hath regenerated us unto a lively hope, by the resurrection of Jesus Christ from the dead,',
  },
  '1PE 1:4': {
    rsv: 'and to an inheritance which is imperishable, undefiled, and unfading, kept in heaven for you,',
    dra: 'Unto an inheritance incorruptible, and undefiled, and that can not fade, reserved in heaven for you,',
  },
  '1JN 1:8': {
    rsv: 'If we say we have no sin, we deceive ourselves, and the truth is not in us.',
    dra: 'If we say that we have no sin, we deceive ourselves, and the truth is not in us.',
  },
  '1JN 1:9': {
    rsv: 'If we confess our sins, he is faithful and just, and will forgive our sins and cleanse us from all unrighteousness.',
    dra: 'If we confess our sins, he is faithful and just, to forgive us our sins, and to cleanse us from all iniquity.',
  },
  // Level 15 · The Judges (the Douay-Rheims splits Judges 5:31 in two and joins Judges 21:24–25 into
  // one verse; one of Bible Gateway's slips in it, in Judges 11:13, is set right).
  'JDG 2:7': {
    rsv: 'And the people served the LORD all the days of Joshua, and all the days of the elders who outlived Joshua, who had seen all the great work which the LORD had done for Israel.',
    dra: 'And they served the Lord all his days, and the days of the ancients, that lived a long time after him, and who knew all the works of the Lord, which he had done for Israel.',
  },
  'JDG 2:8': {
    rsv: 'And Joshua the son of Nun, the servant of the LORD, died at the age of one hundred and ten years.',
    dra: 'And Josue the son of Nun, the servant of the Lord, died, being a hundred and ten years old,',
  },
  'JDG 2:10': {
    rsv: 'And all that generation also were gathered to their fathers; and there arose another generation after them, who did not know the LORD or the work which he had done for Israel.',
    dra: 'And all that generation was gathered to their fathers: and there arose others that knew not the Lord, and the works which he had done for Israel.',
  },
  'JDG 2:11': {
    rsv: 'And the people of Israel did what was evil in the sight of the LORD and served the Baals;',
    dra: 'And the children of Israel did evil in the sight of the Lord, and they served Baalim.',
  },
  'JDG 2:12': {
    rsv: 'and they forsook the LORD, the God of their fathers, who had brought them out of the land of Egypt; they went after other gods, from among the gods of the peoples who were round about them, and bowed down to them; and they provoked the LORD to anger.',
    dra: 'And they left the Lord the God of their fathers, who had brought them out of the land of Egypt: and they followed strange gods, and the gods of the people that dwelt round about them, and they adored them: and they provoked the Lord to anger.',
  },
  'JDG 2:14': {
    rsv: 'So the anger of the LORD was kindled against Israel, and he gave them over to plunderers, who plundered them; and he sold them into the power of their enemies round about, so that they could no longer withstand their enemies.',
    dra: 'And the Lord being angry against Israel, delivered them into the hands of plunderers: who took them and sold them to their enemies, that dwelt round about: neither could they stand against their enemies:',
  },
  'JDG 2:16': {
    rsv: 'Then the LORD raised up judges, who saved them out of the power of those who plundered them.',
    dra: 'And the Lord raised up judges, to deliver them from the hands of those that oppressed them: but they would not hearken to them,',
  },
  'JDG 2:18': {
    rsv: 'Whenever the LORD raised up judges for them, the LORD was with the judge, and he saved them from the hand of their enemies all the days of the judge; for the LORD was moved to pity by their groaning because of those who afflicted and oppressed them.',
    dra: 'And when the Lord raised them up judges, in their days he was moved to mercy, and heard the groanings of the afflicted, and delivered them from the slaughter of the oppressors.',
  },
  'JDG 2:19': {
    rsv: 'But whenever the judge died, they turned back and behaved worse than their fathers, going after other gods, serving them and bowing down to them; they did not drop any of their practices or their stubborn ways.',
    dra: 'But after the judge was dead, they returned, and did much worse things than their fathers had done, following strange gods, serving them and adoring them. They left not their own inventions, and the stubborn way, by which they were accustomed to walk.',
  },
  'JDG 3:7': {
    rsv: 'And the people of Israel did what was evil in the sight of the LORD, forgetting the LORD their God, and serving the Baals and the Asheroth.',
    dra: 'And they did evil in the sight of the Lord, and they forgot their God, and served Baalim and Astaroth.',
  },
  'JDG 3:9': {
    rsv: 'But when the people of Israel cried to the LORD, the LORD raised up a deliverer for the people of Israel, who delivered them, Othni-el the son of Kenaz, Caleb’s younger brother.',
    dra: 'And they cried to the Lord, who raised them up a saviour, and delivered them, to wit, Othoniel the son of Cenez, the younger brother of Caleb:',
  },
  'JDG 3:10': {
    rsv: 'The Spirit of the LORD came upon him, and he judged Israel; he went out to war, and the LORD gave Cushan-rishathaim king of Mesopotamia into his hand; and his hand prevailed over Cushan-rishathaim.',
    dra: 'And the spirit of the Lord was in him, and he judged Israel. And he went out to fight, and the Lord delivered into his hands Chusan Rasathaim king of Syria, and he overthrew him.',
  },
  'JDG 3:11': {
    rsv: 'So the land had rest forty years. Then Othni-el the son of Kenaz died.',
    dra: 'And the land rested forty years, and Othoniel the son of Cenez died.',
  },
  'JDG 3:15': {
    rsv: 'But when the people of Israel cried to the LORD, the LORD raised up for them a deliverer, Ehud, the son of Gera, the Benjaminite, a left-handed man. The people of Israel sent tribute by him to Eglon the king of Moab.',
    dra: 'And afterwards they cried to the Lord, who raised them up a saviour called Aod, the son of Gera, the son of Jemini, who used the left hand as well as the right. And the children of Israel sent presents to Eglon king of Moab by him.',
  },
  'JDG 3:30': {
    rsv: 'So Moab was subdued that day under the hand of Israel. And the land had rest for eighty years.',
    dra: 'And Moab was humbled that day under the hand of Israel: and the land rested eighty years.',
  },
  'JDG 4:3': {
    rsv: 'Then the people of Israel cried to the LORD for help; for he had nine hundred chariots of iron, and oppressed the people of Israel cruelly for twenty years.',
    dra: 'And the children of Israel cried to the Lord: for he had nine hundred chariots set with scythes, and for twenty years had grievously oppressed them.',
  },
  'JDG 4:4': {
    rsv: 'Now Deborah, a prophetess, the wife of Lappidoth, was judging Israel at that time.',
    dra: 'And there was at that time Debbora a prophetess the wife of Lapidoth, who judged the people,',
  },
  'JDG 4:5': {
    rsv: 'She used to sit under the palm of Deborah between Ramah and Bethel in the hill country of Ephraim; and the people of Israel came up to her for judgment.',
    dra: 'And she sat under a palm tree, which was called by her name, between Rama and Bethel in mount Ephraim: and the children of Israel came up to her for all judgment.',
  },
  'JDG 4:6': {
    rsv: 'She sent and summoned Barak the son of Abino-am from Kedesh in Naphtali, and said to him, “The LORD, the God of Israel, commands you, ‘Go, gather your men at Mount Tabor, taking ten thousand from the tribe of Naphtali and the tribe of Zebulun.',
    dra: 'And she sent and called Barac the son of Abinoem out of Cedes in Nephtali: and she said to him: The Lord God of Israel hath commanded thee: Go, and lead an army to mount Thabor, and thou shalt take with thee ten thousand fighting men of the children of Nephtali, and of the children of Zabulon:',
  },
  'JDG 4:7': {
    rsv: 'And I will draw out Sisera, the general of Jabin’s army, to meet you by the river Kishon with his chariots and his troops; and I will give him into your hand.’”',
    dra: 'And I will bring unto thee in the place of the torrent Cison, Sisara the general of Jabin’s army, and his chariots, and all his multitude, and will deliver them into thy hand.',
  },
  'JDG 4:8': {
    rsv: 'Barak said to her, “If you will go with me, I will go; but if you will not go with me, I will not go.”',
    dra: 'And Barac said to her: If thou wilt come with me, I will go: if thou wilt not come with me, I will not go.',
  },
  'JDG 4:9': {
    rsv: 'And she said, “I will surely go with you; nevertheless, the road on which you are going will not lead to your glory, for the LORD will sell Sisera into the hand of a woman.” Then Deborah arose, and went with Barak to Kedesh.',
    dra: 'She said to him: I will go indeed with thee, but at this time the victory shall not be attributed to thee, because Sisara shall be delivered into the hand of a woman. Debbora therefore arose, and went with Barac to Cedes.',
  },
  'JDG 4:14': {
    rsv: 'And Deborah said to Barak, “Up! For this is the day in which the LORD has given Sisera into your hand. Does not the LORD go out before you?” So Barak went down from Mount Tabor with ten thousand men following him.',
    dra: 'And Debbora said to Barac: Arise, for this is the day wherein the Lord hath delivered Sisara into thy hands: behold he is thy leader. And Barac went down from mount Thabor, and ten thousand fighting men with him.',
  },
  'JDG 4:15': {
    rsv: 'And the LORD routed Sisera and all his chariots and all his army before Barak at the edge of the sword; and Sisera alighted from his chariot and fled away on foot.',
    dra: 'And the Lord struck a terror into Sisara, and all his chariots, and all his multitude, with the edge of the sword, at the sight of Barac, insomuch that Sisara leaping down from off his chariot, fled away on foot.',
  },
  'JDG 4:17': {
    rsv: 'But Sisera fled away on foot to the tent of Jael, the wife of Heber the Kenite; for there was peace between Jabin the king of Hazor and the house of Heber the Kenite.',
    dra: 'But Sisara fleeing came to the tent of Jahel the wife of Haber the Cinite, for there was peace between Jabin the king of Asor, and the house of Haber the Cinite.',
  },
  'JDG 5:1': {
    rsv: 'Then sang Deborah and Barak the son of Abino-am on that day:',
    dra: 'In that day Debbora and Barac son of Abinoem sung, and said:',
  },
  'JDG 5:3': {
    rsv: '“Hear, O kings; give ear, O princes; to the LORD I will sing, I will make melody to the LORD, the God of Israel.',
    dra: 'Hear, O ye kings, give ear, ye princes: It is I, it is I, that will sing to the Lord, I will sing to the Lord the God of Israel.',
  },
  'JDG 5:7': {
    rsv: 'The peasantry ceased in Israel, they ceased until you arose, Deborah, arose as a mother in Israel.',
    dra: 'The valiant men ceased, and rested in Israel: until Debbora arose, a mother arose in Israel.',
  },
  'JDG 5:12': {
    rsv: '“Awake, awake, Deborah! Awake, awake, utter a song! Arise, Barak, lead away your captives, O son of Abino-am.',
    dra: 'Arise, arise, O Debbora, arise, arise, and utter a canticle. Arise, Barac, and take hold of thy captives, O son of Abinoem.',
  },
  'JDG 5:20': {
    rsv: 'From heaven fought the stars, from their courses they fought against Sisera.',
    dra: 'War from heaven was made against them, the stars remaining in their order and courses fought against Sisara.',
  },
  'JDG 5:21': {
    rsv: 'The torrent Kishon swept them away, the onrushing torrent, the torrent Kishon. March on, my soul, with might!',
    dra: 'The torrent of Cison dragged their carcasses, the torrent of Cadumim, the torrent of Cisoii: tread thou, my soul, upon the strong ones.',
  },
  'JDG 5:31': {
    rsv: '“So perish all thine enemies, O LORD! But thy friends be like the sun as he rises in his might.” And the land had rest for forty years.',
    dra: 'So let all thy enemies perish, O Lord: but let them that love thee shine, as the sun shineth in his rising. And the land rested for forty years.',
  },
  'JDG 6:6': {
    rsv: 'And Israel was brought very low because of Midian; and the people of Israel cried for help to the LORD.',
    dra: 'And Israel was humbled exceedingly in the sight of Madian.',
  },
  'JDG 6:11': {
    rsv: 'Now the angel of the LORD came and sat under the oak at Ophrah, which belonged to Joash the Abiezrite, as his son Gideon was beating out wheat in the wine press, to hide it from the Midianites.',
    dra: 'And an angel of the Lord came, and sat under an oak, that was in Ephra, and belonged to Joas the father of the family of Ezri. And when Gedeon his son was threshing and cleansing wheat by the winepress, to flee from Madian,',
  },
  'JDG 6:12': {
    rsv: 'And the angel of the LORD appeared to him and said to him, “The LORD is with you, you mighty man of valor.”',
    dra: 'The angel of the Lord appeared to him, and said: The Lord is with thee, O most valiant of men.',
  },
  'JDG 6:13': {
    rsv: 'And Gideon said to him, “Pray, sir, if the LORD is with us, why then has all this befallen us? And where are all his wonderful deeds which our fathers recounted to us, saying, ‘Did not the LORD bring us up from Egypt?’ But now the LORD has cast us off, and given us into the hand of Midian.”',
    dra: 'And Gedeon said to him: I beseech thee, my lord, if the Lord be with us, why have these evils fallen upon us? Where are his miracles, which our fathers have told us of, saying: The Lord brought us Out of Egypt? but now the Lord hath forsaken us, and delivered us into the bands of Madian.',
  },
  'JDG 6:14': {
    rsv: 'And the LORD turned to him and said, “Go in this might of yours and deliver Israel from the hand of Midian; do not I send you?”',
    dra: 'And the Lord looked upon him, and said: Go in this thy strength, and thou shalt deliver Israel out of the hand of Madian: know that I have sent thee.',
  },
  'JDG 6:15': {
    rsv: 'And he said to him, “Pray, Lord, how can I deliver Israel? Behold, my clan is the weakest in Manasseh, and I am the least in my family.”',
    dra: 'He answered and said: I beseech thee, my lord, wherewith shall I deliver Israel? Behold my family is the meanest in Manasses, and I am the least in my father’s house.',
  },
  'JDG 6:16': {
    rsv: 'And the LORD said to him, “But I will be with you, and you shall smite the Midianites as one man.”',
    dra: 'And the Lord said to him: I will be with thee: and thou shalt cut off Madian as one man.',
  },
  'JDG 6:37': {
    rsv: 'behold, I am laying a fleece of wool on the threshing floor; if there is dew on the fleece alone, and it is dry on all the ground, then I shall know that thou wilt deliver Israel by my hand, as thou hast said.”',
    dra: 'I will put this fleece of wool on the floor: if there be dew on the fleece only, and it be dry on all the ground beside, I, shall know that by my hand, as thou hast said, thou wilt deliver Israel.',
  },
  'JDG 6:38': {
    rsv: 'And it was so. When he rose early next morning and squeezed the fleece, he wrung enough dew from the fleece to fill a bowl with water.',
    dra: 'And it was so. And rising before day wringing the fleece, he filled a vessel with the dew.',
  },
  'JDG 6:39': {
    rsv: 'Then Gideon said to God, “Let not thy anger burn against me, let me speak but this once; pray, let me make trial only this once with the fleece; pray, let it be dry only on the fleece, and on all the ground let there be dew.”',
    dra: 'And he said again to God: let not thy wrath be kindled against me if I try once more, seeking a sign in the fleece. I pray that the fleece only may be dry, and all the ground wet with dew.',
  },
  'JDG 6:40': {
    rsv: 'And God did so that night; for it was dry on the fleece only, and on all the ground there was dew.',
    dra: 'And God did that night as he had requested: and it was dry on the fleece only, and there was dew on all the ground.',
  },
  'JDG 7:2': {
    rsv: 'The LORD said to Gideon, “The people with you are too many for me to give the Midianites into their hand, lest Israel vaunt themselves against me, saying, ‘My own hand has delivered me.’',
    dra: 'And the Lord said to Gedeon: The people that are with thee are many, and Madian shall not be delivered into their hands: lest Israel should glory against me, and say: I was delivered by my own strength.',
  },
  'JDG 7:6': {
    rsv: 'And the number of those that lapped, putting their hands to their mouths, was three hundred men; but all the rest of the people knelt down to drink water.',
    dra: 'And the number of them that had lapped water, casting it with the hand to their mouth, was three hundred men: and all the rest of the multitude had drunk kneeling.',
  },
  'JDG 7:7': {
    rsv: 'And the LORD said to Gideon, “With the three hundred men that lapped I will deliver you, and give the Midianites into your hand; and let all the others go every man to his home.”',
    dra: 'And the Lord said to Gedeon: By the three hundred men, that lapped water, I will save you, and deliver Madian into thy hand: but let all the rest of the people return to their place.',
  },
  'JDG 7:16': {
    rsv: 'And he divided the three hundred men into three companies, and put trumpets into the hands of all of them and empty jars, with torches inside the jars.',
    dra: 'And he divided the three hundred men into three parts, and gave them trumpets in their hands, and empty pitchers, and lamps within the pitchers.',
  },
  'JDG 7:17': {
    rsv: 'And he said to them, “Look at me, and do likewise; when I come to the outskirts of the camp, do as I do.',
    dra: 'And he said to them: What you shall see me do, do you the same: I will go into one part of the camp, and do you as I shall do.',
  },
  'JDG 7:20': {
    rsv: 'And the three companies blew the trumpets and broke the jars, holding in their left hands the torches, and in their right hands the trumpets to blow; and they cried, “A sword for the LORD and for Gideon!”',
    dra: 'And when they sounded their trumpets in three places round about the camp, and had broken their pitchers, they held their lamps in their left hands, and with their right hands the trumpets which they blew, and they cried out: The sword of the Lord and of Gedeon;',
  },
  'JDG 7:21': {
    rsv: 'They stood every man in his place round about the camp, and all the army ran; they cried out and fled.',
    dra: 'Standing every man in his place round about the enemies’ camp. So all the camp was troubled, and crying out and howling they fled away.',
  },
  'JDG 8:22': {
    rsv: 'Then the men of Israel said to Gideon, “Rule over us, you and your son and your grandson also; for you have delivered us out of the hand of Midian.”',
    dra: 'And all the men of Israel said to Gedeon: Rule thou over us and thy son, and thy son’s son: because thou hast delivered us from the hand of Madian.',
  },
  'JDG 8:23': {
    rsv: 'Gideon said to them, “I will not rule over you, and my son will not rule over you; the LORD will rule over you.”',
    dra: 'And he said to them: I will not rule over you, neither shall my son rule over you, but the Lord shall rule over you.',
  },
  'JDG 8:28': {
    rsv: 'So Midian was subdued before the people of Israel, and they lifted up their heads no more. And the land had rest forty years in the days of Gideon.',
    dra: 'But Madian was humbled before the children of Israel, neither could they any more lift up their beads: but the land rested for forty years, while Gedeon presided.',
  },
  'JDG 10:10': {
    rsv: 'And the people of Israel cried to the LORD, saying, “We have sinned against thee, because we have forsaken our God and have served the Baals.”',
    dra: 'And they cried to the Lord, and said: We have sinned against thee, because we have forsaken the Lord our God, and have served Baalim.',
  },
  'JDG 10:15': {
    rsv: 'And the people of Israel said to the LORD, “We have sinned; do to us whatever seems good to thee; only deliver us, we pray thee, this day.”',
    dra: 'And the children of Israel said to the Lord: We have sinned, do thou unto us whatsoever pleaseth thee: only deliver us this time.',
  },
  'JDG 10:16': {
    rsv: 'So they put away the foreign gods from among them and served the LORD; and he became indignant over the misery of Israel.',
    dra: 'And saying these things, they cast away out of their coasts all the idols of strange gods and served the Lord their God: and he was touched with their miseries.',
  },
  'JDG 11:1': {
    rsv: 'Now Jephthah the Gileadite was a mighty warrior, but he was the son of a harlot. Gilead was the father of Jephthah.',
    dra: 'There was at that time Jephte the Galaadite, a most valiant man and a warrior, the son of a woman that was a harlot, and his father was Galaad.',
  },
  'JDG 11:2': {
    rsv: 'And Gilead’s wife also bore him sons; and when his wife’s sons grew up, they thrust Jephthah out, and said to him, “You shall not inherit in our father’s house; for you are the son of another woman.”',
    dra: 'Now Galaad had a wife of whom he had sons: who after they were grown up, thrust out Jephte, saying: Thou canst not inherit in the house of our father, because thou art born of another mother.',
  },
  'JDG 11:7': {
    rsv: 'But Jephthah said to the elders of Gilead, “Did you not hate me, and drive me out of my father’s house? Why have you come to me now when you are in trouble?”',
    dra: 'And he answered them: Are not you the men that hated me, and cast me out of my father’s house, and now you are come to me constrained by necessity?',
  },
  'JDG 11:11': {
    rsv: 'So Jephthah went with the elders of Gilead, and the people made him head and leader over them; and Jephthah spoke all his words before the LORD at Mizpah.',
    dra: 'Jephte therefore went with the princes of Galaad, and all the people made him their prince. And Jephte spoke all his words before the Lord in Maspha.',
  },
  'JDG 11:12': {
    rsv: 'Then Jephthah sent messengers to the king of the Ammonites and said, “What have you against me, that you have come to me to fight against my land?”',
    dra: 'And he sent messengers to the king of the children of Ammon, to say in his name, What hast thou to do with me, that thou art come against me, to waste my land?',
  },
  'JDG 11:13': {
    rsv: 'And the king of the Ammonites answered the messengers of Jephthah, “Because Israel on coming from Egypt took away my land, from the Arnon to the Jabbok and to the Jordan; now therefore restore it peaceably.”',
    dra: 'And he answered them: Because Israel took away my land when he came up out of Egypt, from the confines of the Arnon unto the Jaboc and the Jordan: now therefore restore the same peaceably to me.',
  },
  'JDG 11:27': {
    rsv: 'I therefore have not sinned against you, and you do me wrong by making war on me; the LORD, the Judge, decide this day between the people of Israel and the people of Ammon.”',
    dra: 'Therefore I do not trespass against thee, but thou wrongest me by declaring an unjust war against me. The Lord be judge and decide this day between Israel and the children of Ammon.',
  },
  'JDG 11:28': {
    rsv: 'But the king of the Ammonites did not heed the message of Jephthah which he sent to him.',
    dra: 'And the king of the children of Ammon would not hearken to the words of Jephte, which he sent him by the messengers.',
  },
  'JDG 11:29': {
    rsv: 'Then the Spirit of the LORD came upon Jephthah, and he passed through Gilead and Manasseh, and passed on to Mizpah of Gilead, and from Mizpah of Gilead he passed on to the Ammonites.',
    dra: 'Therefore the spirit of the Lord came upon Jephte, and going round Galaad, and Manasses, and Maspha of Galaad, and passing over from thence to the children of Ammon,',
  },
  'JDG 11:30': {
    rsv: 'And Jephthah made a vow to the LORD, and said, “If thou wilt give the Ammonites into my hand,',
    dra: 'He made a vow to the Lord, saying: If thou wilt deliver the children of Ammon into my hands,',
  },
  'JDG 11:31': {
    rsv: 'then whoever comes forth from the doors of my house to meet me, when I return victorious from the Ammonites, shall be the LORD’s, and I will offer him up for a burnt offering.”',
    dra: 'Whosoever shall first come forth out of the doors of my house, and shall meet me when I return in peace from the children of Ammon, the same will I offer a holocaust to the Lord.',
  },
  'JDG 11:32': {
    rsv: 'So Jephthah crossed over to the Ammonites to fight against them; and the LORD gave them into his hand.',
    dra: 'And Jephte passed over to the children of Ammon, to fight against them: and the Lord delivered them into his hands.',
  },
  'JDG 11:34': {
    rsv: 'Then Jephthah came to his home at Mizpah; and behold, his daughter came out to meet him with timbrels and with dances; she was his only child; beside her he had neither son nor daughter.',
    dra: 'And when Jephte returned into Maspha to his house, his only daughter met him with timbrels and with dances: for he had no other children.',
  },
  'JDG 11:35': {
    rsv: 'And when he saw her, he rent his clothes, and said, “Alas, my daughter! you have brought me very low, and you have become the cause of great trouble to me; for I have opened my mouth to the LORD, and I cannot take back my vow.”',
    dra: 'And when he saw her, he rent his garments, and said: Alas! my daughter, thou hast deceived me, and thou thyself art deceived: for I have opened my mouth to the Lord, and I can do no other thing.',
  },
  'JDG 11:36': {
    rsv: 'And she said to him, “My father, if you have opened your mouth to the LORD, do to me according to what has gone forth from your mouth, now that the LORD has avenged you on your enemies, on the Ammonites.”',
    dra: 'And she answered him: My father, if thou hast opened thy mouth to the Lord, do unto me whatsoever thou hast promised, since the victory hath been granted to thee, and revenge of thy enemies.',
  },
  'JDG 11:37': {
    rsv: 'And she said to her father, “Let this thing be done for me; let me alone two months, that I may go and wander on the mountains, and bewail my virginity, I and my companions.”',
    dra: 'And she said to her father: Grant me only this which I desire: Let me go, that I may go about the mountains for two months, and may bewail my virginity with my companions.',
  },
  'JDG 11:40': {
    rsv: 'that the daughters of Israel went year by year to lament the daughter of Jephthah the Gileadite four days in the year.',
    dra: 'That from year to year the daughters of Israel assemble together, and lament the daughter of Jephte the Galaadite for four days.',
  },
  'JDG 13:2': {
    rsv: 'And there was a certain man of Zorah, of the tribe of the Danites, whose name was Manoah; and his wife was barren and had no children.',
    dra: 'Now there was a certain man of Saraa, and of the race of Dan, whose name was Manue, and his wife was barren.',
  },
  'JDG 13:3': {
    rsv: 'And the angel of the LORD appeared to the woman and said to her, “Behold, you are barren and have no children; but you shall conceive and bear a son.',
    dra: 'And an angel of the Lord appeared to her, and said: Thou art barren and without children: but thou shalt conceive and bear a son.',
  },
  'JDG 13:5': {
    rsv: 'for lo, you shall conceive and bear a son. No razor shall come upon his head, for the boy shall be a Nazirite to God from birth; and he shall begin to deliver Israel from the hand of the Philistines.”',
    dra: 'Because thou shalt conceive and bear a son, and no razor shall touch his head: for he shall be a Nazarite of God, from his infancy, and from his mother’s womb, and he shall begin to deliver Israel from the hands of the Philistines.',
  },
  'JDG 13:8': {
    rsv: 'Then Manoah entreated the LORD, and said, “O, LORD, I pray thee, let the man of God whom thou didst send come again to us, and teach us what we are to do with the boy that will be born.”',
    dra: 'Then Manue prayed to the Lord, and said: I beseech thee, O Lord, that the mail of God, whom thou didst send, may come again, and teach us what we ought to do concerning the child that shall be born.',
  },
  'JDG 13:18': {
    rsv: 'And the angel of the LORD said to him, “Why do you ask my name, seeing it is wonderful?”',
    dra: 'And he answered him: Why askest thou my name, which is wonderful?',
  },
  'JDG 13:20': {
    rsv: 'And when the flame went up toward heaven from the altar, the angel of the LORD ascended in the flame of the altar while Manoah and his wife looked on; and they fell on their faces to the ground.',
    dra: 'And when the flame from the altar went up towards heaven, the angel of the lord ascended also in the flame. And when Manue and his wife saw this, they fell flat on the ground.',
  },
  'JDG 13:24': {
    rsv: 'And the woman bore a son, and called his name Samson; and the boy grew, and the LORD blessed him.',
    dra: 'And she bore a son, and called his name Samson. And the child grew, and the Lord blessed him.',
  },
  'JDG 14:5': {
    rsv: 'Then Samson went down with his father and mother to Timnah, and he came to the vineyards of Timnah. And behold, a young lion roared against him;',
    dra: 'Then Samson went down with his father and mother to Thamnatha. And when they were come to the vineyards of the town, behold a young lion met him raging and roaring.',
  },
  'JDG 14:6': {
    rsv: 'and the Spirit of the LORD came mightily upon him, and he tore the lion asunder as one tears a kid; and he had nothing in his hand. But he did not tell his father or his mother what he had done.',
    dra: 'And the spirit of the Lord came upon Samson, and he tore the lion as he would have torn a kid in pieces, having nothing at all in his hand: and he would not tell this to his father and mother.',
  },
  'JDG 14:8': {
    rsv: 'And after a while he returned to take her; and he turned aside to see the carcass of the lion, and behold, there was a swarm of bees in the body of the lion, and honey.',
    dra: 'And after some days returning to take her, he went aside to see the carcass of the lion, and behold there was a swarm of bees in the mouth of the lion and a honeycomb.',
  },
  'JDG 14:14': {
    rsv: 'And he said to them, “Out of the eater came something to eat. Out of the strong came something sweet.” And they could not in three days tell what the riddle was.',
    dra: 'And he said to them: Out of the eater came forth meat, and out of the strong came forth sweetness. And they could not in three days expound the riddle.',
  },
  'JDG 14:18': {
    rsv: 'And the men of the city said to him on the seventh day before the sun went down, “What is sweeter than honey? What is stronger than a lion?” And he said to them, “If you had not plowed with my heifer, you would not have found out my riddle.”',
    dra: 'And they on the seventh day before the sun went down said to him: What is sweeter than honey? and what is stronger than a lion? And he said to them: If you had not ploughed with my heifer, you had not found out my riddle.',
  },
  'JDG 16:4': {
    rsv: 'After this he loved a woman in the valley of Sorek, whose name was Delilah.',
    dra: 'After this he loved a woman, who dwelt in the valley of Sorec, and she was called Dalila.',
  },
  'JDG 16:5': {
    rsv: 'And the lords of the Philistines came to her and said to her, “Entice him, and see wherein his great strength lies, and by what means we may overpower him, that we may bind him to subdue him; and we will each give you eleven hundred pieces of silver.”',
    dra: 'And the princes of the Philistines came to her, and said: Deceive him, and learn of him wherein his great strength lieth, and how we may be able to overcome him, to bind and afflict him: which if thou shalt do, we will give thee every one of us eleven hundred pieces of silver.',
  },
  'JDG 16:15': {
    rsv: 'And she said to him, “How can you say, ‘I love you,’ when your heart is not with me? You have mocked me these three times, and you have not told me wherein your great strength lies.”',
    dra: 'And Dalila said to him: How dost thou say thou lovest me, when thy mind is not with me? Thou hast told me lies these three times, and wouldst not tell me wherein thy great strength lieth.',
  },
  'JDG 16:17': {
    rsv: 'And he told her all his mind, and said to her, “A razor has never come upon my head; for I have been a Nazirite to God from my mother’s womb. If I be shaved, then my strength will leave me, and I shall become weak, and be like any other man.”',
    dra: 'Then opening the truth of the thing, he said to her: The razor hath never come upon my head, for I am a Nazarite, that is to say, consecrated to God from my mother’s womb: if my head be shaven, my strength shall depart from me, and I shall become weak, and shall be like other men.',
  },
  'JDG 16:19': {
    rsv: 'She made him sleep upon her knees; and she called a man, and had him shave off the seven locks of his head. Then she began to torment him, and his strength left him.',
    dra: 'But she made him sleep upon her knees, and lay his head in her bosom. And she called a barber, and shaved his seven locks, and began to drive him away, and thrust him from her: for immediately his strength departed from him.',
  },
  'JDG 16:20': {
    rsv: 'And she said, “The Philistines are upon you, Samson!” And he awoke from his sleep, and said, “I will go out as at other times, and shake myself free.” And he did not know that the LORD had left him.',
    dra: 'And she said: The Philistines are upon thee, Samson. And awaking from sleep, he said in his mind: I will go out as I did before, and shake myself, not knowing that the Lord was departed from him.',
  },
  'JDG 16:21': {
    rsv: 'And the Philistines seized him and gouged out his eyes, and brought him down to Gaza, and bound him with bronze fetters; and he ground at the mill in the prison.',
    dra: 'Then the Philistines seized upon him, and forthwith pulled out his eyes, and led him bound in chains to Gaza, and shutting him up in prison made him grind.',
  },
  'JDG 16:22': {
    rsv: 'But the hair of his head began to grow again after it had been shaved.',
    dra: 'And now his hair began to grow again.',
  },
  'JDG 16:23': {
    rsv: 'Now the lords of the Philistines gathered to offer a great sacrifice to Dagon their god, and to rejoice; for they said, “Our god has given Samson our enemy into our hand.”',
    dra: 'And the princes of the Philistines assembled together, to offer great sacrifices to Dagon their god, and to make merry, saying: Our god hath delivered our enemy Samson into our hands.',
  },
  'JDG 16:25': {
    rsv: 'And when their hearts were merry, they said, “Call Samson, that he may make sport for us.” So they called Samson out of the prison, and he made sport before them. They made him stand between the pillars;',
    dra: 'And rejoicing in their feasts, when they had now taken their good cheer, they commanded that Samson should be called, and should play before them. And being brought out of prison he played before them, and they made him stand between two pillars.',
  },
  'JDG 16:26': {
    rsv: 'and Samson said to the lad who held him by the hand, “Let me feel the pillars on which the house rests, that I may lean against them.”',
    dra: 'And he said to the lad that guided his steps: Suffer me to touch the pillars which support the whole house, and let me lean upon them, and rest a little.',
  },
  'JDG 16:28': {
    rsv: 'Then Samson called to the LORD and said, “O Lord GOD, remember me, I pray thee, and strengthen me, I pray thee, only this once, O God, that I may be avenged upon the Philistines for one of my two eyes.”',
    dra: 'But he called upon the Lord, saying: O Lord God, remember me, and restore to me now my former strength, O my God, that I may revenge myself on my enemies, and for the loss of my two eyes I may take one revenge.',
  },
  'JDG 16:30': {
    rsv: 'And Samson said, “Let me die with the Philistines.” Then he bowed with all his might; and the house fell upon the lords and upon all the people that were in it. So the dead whom he slew at his death were more than those whom he had slain during his life.',
    dra: 'He said: Let me die with the Philistines. And when he had strongly shook the pillars, the house fell upon all the princes, and the rest of the multitude that was there: and he killed many more at his death, than he had killed before in his life.',
  },
  'JDG 16:31': {
    rsv: 'Then his brothers and all his family came down and took him and brought him up and buried him between Zorah and Eshta-ol in the tomb of Manoah his father. He had judged Israel twenty years.',
    dra: 'And his brethren and all his kindred, going down took his body, and buried it between Saraa and Esthaol in the buryingplace of his father Manue: and he judged Israel twenty years.',
  },
  'JDG 17:1': {
    rsv: 'There was a man of the hill country of Ephraim, whose name was Micah.',
    dra: 'There was at that time a man of mount Ephraim whose name was Michas,',
  },
  'JDG 17:3': {
    rsv: 'And he restored the eleven hundred pieces of silver to his mother; and his mother said, “I consecrate the silver to the LORD from my hand for my son, to make a graven image and a molten image; now therefore I will restore it to you.”',
    dra: 'So he restored them to his mother, who said to him: I have consecrated and vowed this silver to the Lord, that my son may receive it at my hand, and make a graven and a molten god, so now I deliver it to thee.',
  },
  'JDG 17:5': {
    rsv: 'And the man Micah had a shrine, and he made an ephod and teraphim, and installed one of his sons, who became his priest.',
    dra: 'And he separated also therein a little temple for the god, and made an ephod, and theraphim, that is to say, a priestly garment, and idols: and he filled the hand of one of his sons, and he became his priest.',
  },
  'JDG 17:6': {
    rsv: 'In those days there was no king in Israel; every man did what was right in his own eyes.',
    dra: 'In those days there was no king in Israel, but every one did that which seemed right to himself.',
  },
  'JDG 17:9': {
    rsv: 'And Micah said to him, “From where do you come?” And he said to him, “I am a Levite of Bethlehem in Judah, and I am going to sojourn where I may find a place.”',
    dra: 'He was asked by him whence he came. And he answered: I am a Levite of Bethlehem Juda, and I am going to dwell where I can, and where I shall find a place to my advantage.',
  },
  'JDG 17:10': {
    rsv: 'And Micah said to him, “Stay with me, and be to me a father and a priest, and I will give you ten pieces of silver a year, and a suit of apparel, and your living.”',
    dra: 'And Michas said: Stay with me, and be unto me a father and a priest, and I will give thee every year ten pieces of silver, and a double suit of apparel, and thy victuals.',
  },
  'JDG 17:13': {
    rsv: 'Then Micah said, “Now I know that the LORD will prosper me, because I have a Levite as priest.”',
    dra: 'Now I know God will do me good, since I have a priest of the race of the Levites.',
  },
  'JDG 18:1': {
    rsv: 'In those days there was no king in Israel. And in those days the tribe of the Danites was seeking for itself an inheritance to dwell in; for until then no inheritance among the tribes of Israel had fallen to them.',
    dra: 'In those days there was no king in Israel, and the tribe of Dan sought them an inheritance to dwell in: for unto that day they had not received their lot among the other tribes.',
  },
  'JDG 18:17': {
    rsv: 'and the five men who had gone to spy out the land went up, and entered and took the graven image, the ephod, the teraphim, and the molten image, while the priest stood by the entrance of the gate with the six hundred men armed with weapons of war.',
    dra: 'But they that were gone into the house of the young man, went about to take away the graven god, and the ephod, and the theraphim, and the molten god, and the priest stood before the door, the six hundred valiant men waiting not far off.',
  },
  'JDG 18:19': {
    rsv: 'And they said to him, “Keep quiet, put your hand upon your mouth, and come with us, and be to us a father and a priest. Is it better for you to be priest to the house of one man, or to be priest to a tribe and family in Israel?”',
    dra: 'And they said to him: Hold thy peace and put thy finger on thy mouth and come with us, that we may have thee for a father, and a priest. Whether is better for thee, to be a priest in the house of one man, or in a tribe and family in Israel?',
  },
  'JDG 18:20': {
    rsv: 'And the priest’s heart was glad; he took the ephod, and the teraphim, and the graven image, and went in the midst of the people.',
    dra: 'When he had heard this, he agreed to their words, and took the ephod, and the idols, and the graven god, and departed with them.',
  },
  'JDG 18:24': {
    rsv: 'And he said, “You take my gods which I made, and the priest, and go away, and what have I left? How then do you ask me, ‘What ails you?’”',
    dra: 'And he answered: You have taken away my gods which I have made me and the priest, and all that I have, and do you say: What aileth thee?',
  },
  'JDG 18:29': {
    rsv: 'And they named the city Dan, after the name of Dan their ancestor, who was born to Israel; but the name of the city was Laish at the first.',
    dra: 'Calling the name of the city Dan after the name of their father, who was the son of Israel, which before was called Lais.',
  },
  'JDG 18:30': {
    rsv: 'And the Danites set up the graven image for themselves; and Jonathan the son of Gershom, son of Moses, and his sons were priests to the tribe of the Danites until the day of the captivity of the land.',
    dra: 'And they set up to themselves the graven idol, and Jonathan the son of Gersam the son of Moses, he and his sons were priests in the tribe of Dan, until the day of their captivity.',
  },
  'JDG 20:1': {
    rsv: 'Then all the people of Israel came out, from Dan to Beer-sheba, including the land of Gilead, and the congregation assembled as one man to the LORD at Mizpah.',
    dra: 'Then all the children of Israel went out and gathered together as one man from Dan to Bersabee, with the land of Galaad, to the Lord in Maspha:',
  },
  'JDG 21:2': {
    rsv: 'And the people came to Bethel, and sat there till evening before God, and they lifted up their voices and wept bitterly.',
    dra: 'And they all came to the house of God in Silo, and abiding before him till the evening, lifted up their voices, and began to lament and weep, saying:',
  },
  'JDG 21:3': {
    rsv: 'And they said, “O LORD, the God of Israel, why has this come to pass in Israel, that there should be today one tribe lacking in Israel?”',
    dra: 'O Lord God of Israel, why is so great an evil come to pass in thy people, that this day one tribe should be taken away from among us?',
  },
  'JDG 21:6': {
    rsv: 'And the people of Israel had compassion for Benjamin their brother, and said, “One tribe is cut off from Israel this day.',
    dra: 'And the children of Israel being moved with repentance for their brother Benjamin, began to say: One tribe is taken away from Israel.',
  },
  'JDG 21:25': {
    rsv: 'In those days there was no king in Israel; every man did what was right in his own eyes.',
    dra: 'In those days there was no king in Israel: but every one did that which seemed right to himself.',
  },
  'MAT 2:6': {
    rsv: '‘And you, O Bethlehem, in the land of Judah, are by no means least among the rulers of Judah; for from you shall come a ruler who will govern my people Israel.’”',
    dra: 'And thou Bethlehem the land of Juda art not the least among the princes of Juda: for out of thee shall come forth the captain that shall rule my people Israel.',
  },
  'MAT 5:34': {
    rsv: 'But I say to you, Do not swear at all, either by heaven, for it is the throne of God,',
    dra: 'But I say to you not to swear at all, neither by heaven, for it is the throne of God:',
  },
  'MAT 5:37': {
    rsv: 'Let what you say be simply ‘Yes’ or ‘No’; anything more than this comes from evil.',
    dra: 'But let your speech be yea, yea: no, no: and that which is over and above these, is of evil.',
  },
  'MAT 13:43': {
    rsv: 'Then the righteous will shine like the sun in the kingdom of their Father. He who has ears, let him hear.',
    dra: 'Then shall the just shine as the sun, in the kingdom of their Father. He that hath ears to hear, let him hear.',
  },
  'LUK 1:13': {
    rsv: 'But the angel said to him, “Do not be afraid, Zechariah, for your prayer is heard, and your wife Elizabeth will bear you a son, and you shall call his name John.',
    dra: 'But the angel said to him: Fear not, Zachary, for thy prayer is heard; and thy wife Elizabeth shall bear thee a son, and thou shalt call his name John:',
  },
  'LUK 1:15': {
    rsv: 'for he will be great before the Lord, and he shall drink no wine nor strong drink, and he will be filled with the Holy Spirit, even from his mother’s womb.',
    dra: 'For he shall be great before the Lord; and shall drink no wine nor strong drink: and he shall be filled with the Holy Ghost, even from his mother’s womb.',
  },
  '2CO 4:6': {
    rsv: 'For it is the God who said, “Let light shine out of darkness,” who has shone in our hearts to give the light of the knowledge of the glory of God in the face of Christ.',
    dra: 'For God, who commanded the light to shine out of darkness, hath shined in our hearts, to give the light of the knowledge of the glory of God, in the face of Christ Jesus.',
  },
  '2CO 4:7': {
    rsv: 'But we have this treasure in earthen vessels, to show that the transcendent power belongs to God and not to us.',
    dra: 'But we have this treasure in earthen vessels, that the excellency may be of the power of God, and not of us.',
  },
  '2TI 2:13': {
    rsv: 'if we are faithless, he remains faithful— for he cannot deny himself.',
    dra: 'If we believe not, he continueth faithful, he can not deny himself.',
  },
  'HEB 11:32': {
    rsv: 'And what more shall I say? For time would fail me to tell of Gideon, Barak, Samson, Jephthah, of David and Samuel and the prophets—',
    dra: 'And what shall I yet say? For the time would fail me to tell of Gedeon, Barac, Samson, Jephthe, David, Samuel, and the prophets:',
  },
  'HEB 11:34': {
    rsv: 'quenched raging fire, escaped the edge of the sword, won strength out of weakness, became mighty in war, put foreign armies to flight.',
    dra: 'Quenched the violence of fire, escaped the edge of the sword, recovered strength from weakness, became valiant in battle, put to flight the armies of foreigners:',
  },
  // Level 16 · Ruth (the Douay-Rheims numbers these chapters as the RSV does).
  'RUT 1:1': {
    rsv: 'In the days when the judges ruled there was a famine in the land, and a certain man of Bethlehem in Judah went to sojourn in the country of Moab, he and his wife and his two sons.',
    dra: 'In the days of one of the judges, when the judges ruled, there came a famine in the land. And a certain man of Bethlehem Juda, went to sojourn in the land of Moab with his wife and his two sons.',
  },
  'RUT 1:2': {
    rsv: 'The name of the man was Elimelech and the name of his wife Naomi, and the names of his two sons were Mahlon and Chilion; they were Ephrathites from Bethlehem in Judah. They went into the country of Moab and remained there.',
    dra: 'He was named Elimelech, and his wife, Noemi: and his two sons, the one Mahalon, and the other Chelion, Ephrathites of Bethlehem Juda. And entering into the country of Moab, they abode there.',
  },
  'RUT 1:3': {
    rsv: 'But Elimelech, the husband of Naomi, died, and she was left with her two sons.',
    dra: 'And Elimelech the husband of Noemi died: and she remained with her sons.',
  },
  'RUT 1:4': {
    rsv: 'These took Moabite wives; the name of the one was Orpah and the name of the other Ruth. They lived there about ten years;',
    dra: 'And they took wives of the women of Moab, of which one was called Orpha, and the other Ruth. And they dwelt there ten years.',
  },
  'RUT 1:5': {
    rsv: 'and both Mahlon and Chilion died, so that the woman was bereft of her two sons and her husband.',
    dra: 'And they both died, to wit, Mahalon and Chelion: and the woman was left alone, having lost both her sons and her husband.',
  },
  'RUT 1:6': {
    rsv: 'Then she started with her daughters-in-law to return from the country of Moab, for she had heard in the country of Moab that the LORD had visited his people and given them food.',
    dra: 'And she arose to go from the land of Moab to her own country with both her daughters in law: for she had heard that the Lord had looked upon his people, and had given them food.',
  },
  'RUT 1:7': {
    rsv: 'So she set out from the place where she was, with her two daughters-in-law, and they went on the way to return to the land of Judah.',
    dra: 'Wherefore she went forth out of the place of her sojournment, with both her daughters in law: and being now in the way to return into the land of Juda,',
  },
  'RUT 1:8': {
    rsv: 'But Naomi said to her two daughters-in-law, “Go, return each of you to her mother’s house. May the LORD deal kindly with you, as you have dealt with the dead and with me.',
    dra: 'She said to them: Go ye home to your mothers: the Lord deal mercifully with you, as you have dealt with the dead and with me.',
  },
  'RUT 1:9': {
    rsv: 'The LORD grant that you may find a home, each of you in the house of her husband!” Then she kissed them, and they lifted up their voices and wept.',
    dra: 'May he grant you to find rest in the houses of the husbands which you shall take. And she kissed them. And they lifted up their voice and began to weep,',
  },
  'RUT 1:10': {
    rsv: 'And they said to her, “No, we will return with you to your people.”',
    dra: 'And to say: We will go on with thee to thy people.',
  },
  'RUT 1:13': {
    rsv: 'would you therefore wait till they were grown? Would you therefore refrain from marrying? No, my daughters, for it is exceedingly bitter to me for your sake that the hand of the LORD has gone forth against me.”',
    dra: 'If you would wait till they were grown up, and come to man’s estate, you would be old women before you marry. Do not so, my daughters, I beseech you: for I am grieved the more for your distress, and the hand of the Lord is gone out against me.',
  },
  'RUT 1:14': {
    rsv: 'Then they lifted up their voices and wept again; and Orpah kissed her mother-in-law, but Ruth clung to her.',
    dra: 'And they lifted up their voice, and began to weep again: Orpha kissed her mother in law and returned: Ruth stuck close to her mother in law.',
  },
  'RUT 1:15': {
    rsv: 'And she said, “See, your sister-in-law has gone back to her people and to her gods; return after your sister-in-law.”',
    dra: 'And Noemi said to her: Behold thy kinswoman is returned to her people, and to her gods, go thou with her.',
  },
  'RUT 1:16': {
    rsv: 'But Ruth said, “Entreat me not to leave you or to return from following you; for where you go I will go, and where you lodge I will lodge; your people shall be my people, and your God my God;',
    dra: 'She answered: Be not against me, to desire that I should leave thee and depart: for whithersoever thou shalt go, I will go: and where thou shalt dwell, I also will dwell. Thy people shall be my people, and thy God my God.',
  },
  'RUT 1:17': {
    rsv: 'where you die I will die, and there will I be buried. May the LORD do so to me and more also if even death parts me from you.”',
    dra: 'The land that shall receive thee dying, in the same will I die: and there will I be buried. The Lord do so and so to me, and add more also, if aught but death part me and thee.',
  },
  'RUT 1:18': {
    rsv: 'And when Naomi saw that she was determined to go with her, she said no more.',
    dra: 'Then Noemi, seeing that Ruth was steadfastly determined to go with her, would not be against it, nor persuade her any more to return to her friends:',
  },
  'RUT 1:19': {
    rsv: 'So the two of them went on until they came to Bethlehem. And when they came to Bethlehem, the whole town was stirred because of them; and the women said, “Is this Naomi?”',
    dra: 'So they went together and came to Bethlehem. And when they were come into the city, the report was quickly spread among all: and the women said: This is that Noemi.',
  },
  'RUT 1:20': {
    rsv: 'She said to them, “Do not call me Naomi, call me Mara, for the Almighty has dealt very bitterly with me.',
    dra: 'But she said to them: Call me not Noemi, (that is, beautiful,) but call me Mara, (that is, bitter,) for the Almighty hath quite filled me with bitterness.',
  },
  'RUT 1:21': {
    rsv: 'I went away full, and the LORD has brought me back empty. Why call me Naomi, when the LORD has afflicted me and the Almighty has brought calamity upon me?”',
    dra: 'I went out full, and the Lord hath brought me back empty. Why then do you call me Noemi, whom the Lord hath humbled and the Almighty hath afflicted?',
  },
  'RUT 1:22': {
    rsv: 'So Naomi returned, and Ruth the Moabitess her daughter-in-law with her, who returned from the country of Moab. And they came to Bethlehem at the beginning of barley harvest.',
    dra: 'So Noemi came with Ruth the Moabitess her daughter in law, from the land of her sojournment: and returned into Bethlehem, in the beginning of the barley harvest.',
  },
  'RUT 2:1': {
    rsv: 'Now Naomi had a kinsman of her husband’s, a man of wealth, of the family of Elimelech, whose name was Boaz.',
    dra: 'Now her husband Elimelech had a kinsman, a powerful man, and very rich, whose name was Booz.',
  },
  'RUT 2:2': {
    rsv: 'And Ruth the Moabitess said to Naomi, “Let me go to the field, and glean among the ears of grain after him in whose sight I shall find favor.” And she said to her, “Go, my daughter.”',
    dra: 'And Ruth the Moabitess said to her mother in law: If thou wilt, I will go into the field, and glean the ears of corn that escape the hands of the reapers, wheresoever I shall find grace with a householder that will be favourable to me. And she answered her: Go, my daughter.',
  },
  'RUT 2:3': {
    rsv: 'So she set forth and went and gleaned in the field after the reapers; and she happened to come to the part of the field belonging to Boaz, who was of the family of Elimelech.',
    dra: 'She went therefore and gleaned the ears of corn after the reapers. And it happened that the owner of that field was Booz, who was of the kindred of Elimelech.',
  },
  'RUT 2:4': {
    rsv: 'And behold, Boaz came from Bethlehem; and he said to the reapers, “The LORD be with you!” And they answered, “The LORD bless you.”',
    dra: 'And behold, he came out of Bethlehem, and said to the reapers: The Lord be with you. And they answered him: The Lord bless thee.',
  },
  'RUT 2:5': {
    rsv: 'Then Boaz said to his servant who was in charge of the reapers, “Whose maiden is this?”',
    dra: 'And Booz said to the young man that was set over the reapers: Whose maid is this?',
  },
  'RUT 2:8': {
    rsv: 'Then Boaz said to Ruth, “Now, listen, my daughter, do not go to glean in another field or leave this one, but keep close to my maidens.',
    dra: 'And Booz said to Ruth: Hear me, daughter, do not go to glean in any other field, and do not depart from this place: but keep with my maids,',
  },
  'RUT 2:10': {
    rsv: 'Then she fell on her face, bowing to the ground, and said to him, “Why have I found favor in your eyes, that you should take notice of me, when I am a foreigner?”',
    dra: 'She fell on her face and worshipping upon the ground, said to him: Whence cometh this to me, that I should find grace before thy eyes, and that thou shouldst vouchsafe to take notice of me a woman of another country?',
  },
  'RUT 2:11': {
    rsv: 'But Boaz answered her, “All that you have done for your mother-in-law since the death of your husband has been fully told me, and how you left your father and mother and your native land and came to a people that you did not know before.',
    dra: 'And he answered her: All hath been told me, that thou hast done to thy mother in law after the death of thy husband: and how thou hast left thy parents, and the land wherein thou wast born, and art come to a people which thou knewest not heretofore.',
  },
  'RUT 2:12': {
    rsv: 'The LORD recompense you for what you have done, and a full reward be given you by the LORD, the God of Israel, under whose wings you have come to take refuge!”',
    dra: 'The Lord render unto thee for thy work, and mayest thou receive a full reward of the Lord the God of Israel, to whom thou art come, and under whose wings thou art fled.',
  },
  'RUT 2:14': {
    rsv: 'And at mealtime Boaz said to her, “Come here, and eat some bread, and dip your morsel in the wine.” So she sat beside the reapers, and he passed to her parched grain; and she ate until she was satisfied, and she had some left over.',
    dra: 'And Booz said to her: At mealtime come thou hither, and eat of the bread, and dip thy morsel in the vinegar. So she sat at the side of the reapers, and she heaped to herself frumenty, and ate and was filled, and took the leavings.',
  },
  'RUT 2:15': {
    rsv: 'When she rose to glean, Boaz instructed his young men, saying, “Let her glean even among the sheaves, and do not reproach her.',
    dra: 'And she arose from thence, to glean the ears of corn as before. And Booz commanded his servants, saying: If she would even reap with you, hinder her not:',
  },
  'RUT 2:16': {
    rsv: 'And also pull out some from the bundles for her, and leave it for her to glean, and do not rebuke her.”',
    dra: 'And let fall some of your handfuls of purpose, and leave them, that she may gather them without shame, and let no man rebuke her when she gathereth them.',
  },
  'RUT 2:17': {
    rsv: 'So she gleaned in the field until evening; then she beat out what she had gleaned, and it was about an ephah of barley.',
    dra: 'She gleaned therefore in the field till evening: and beating out with a rod and threshing what she had gleaned, she found about the measure of an ephi of barley, that is, three bushels:',
  },
  'RUT 2:20': {
    rsv: 'And Naomi said to her daughter-in-law, “Blessed be he by the LORD, whose kindness has not forsaken the living or the dead!” Naomi also said to her, “The man is a relative of ours, one of our nearest kin.”',
    dra: 'And Noemi answered her: Blessed be he of the Lord: because the same kindness which he shewed to the living, he hath kept also to the dead. And again she said: The man is our kinsman.',
  },
  'RUT 3:1': {
    rsv: 'Then Naomi her mother-in-law said to her, “My daughter, should I not seek a home for you, that it may be well with you?',
    dra: 'After she was returned to her mother in law, Noemi said to her: My daughter, I will seek rest for thee, and will provide that it may be well with thee.',
  },
  'RUT 3:2': {
    rsv: 'Now is not Boaz our kinsman, with whose maidens you were? See, he is winnowing barley tonight at the threshing floor.',
    dra: 'This Booz, with whose maids thou wast joined in the field, is our near kinsman, and behold this night he winnoweth barley in the threshingfloor.',
  },
  'RUT 3:5': {
    rsv: 'And she replied, “All that you say I will do.”',
    dra: 'She answered: Whatsoever thou shalt command, I will do.',
  },
  'RUT 3:6': {
    rsv: 'So she went down to the threshing floor and did just as her mother-in-law had told her.',
    dra: 'And she went down to the barnfloor, and did all that her mother in law had bid her.',
  },
  'RUT 3:8': {
    rsv: 'At midnight the man was startled, and turned over, and behold, a woman lay at his feet!',
    dra: 'And behold, when it was now midnight the man was afraid, and troubled: and he saw a woman lying at his feet,',
  },
  'RUT 3:9': {
    rsv: 'He said, “Who are you?” And she answered, “I am Ruth, your maidservant; spread your skirt over your maidservant, for you are next of kin.”',
    dra: 'And he said to her: Who art thou? And she answered: I am Ruth thy handmaid: spread thy coverlet over thy servant, for thou art a near kinsman.',
  },
  'RUT 3:10': {
    rsv: 'And he said, “May you be blessed by the LORD, my daughter; you have made this last kindness greater than the first, in that you have not gone after young men, whether poor or rich.',
    dra: 'And he said: Blessed art thou of the Lord, my daughter, and thy latter kindness has surpassed the former: because thou hast not followed young men either poor or rich.',
  },
  'RUT 3:11': {
    rsv: 'And now, my daughter, do not fear, I will do for you all that you ask, for all my fellow townsmen know that you are a woman of worth.',
    dra: 'Fear not therefore, but whatsoever thou shalt say to me I will do to thee. For all the people that dwell within the gates of my city, know that thou art a virtuous woman.',
  },
  'RUT 3:12': {
    rsv: 'And now it is true that I am a near kinsman, yet there is a kinsman nearer than I.',
    dra: 'Neither do I deny myself to be near of kin, but there is another nearer than I.',
  },
  'RUT 3:13': {
    rsv: 'Remain this night, and in the morning, if he will do the part of the next of kin for you, well; let him do it; but if he is not willing to do the part of the next of kin for you, then, as the LORD lives, I will do the part of the next of kin for you. Lie down until the morning.”',
    dra: 'Rest thou this night: and when morning is come, if he will take thee by the right of kindred, all is well: but if he will not, I will undoubtedly take thee, as the Lord liveth: sleep till the morning.',
  },
  'RUT 3:15': {
    rsv: 'And he said, “Bring the mantle you are wearing and hold it out.” So she held it, and he measured out six measures of barley, and laid it upon her; then she went into the city.',
    dra: 'And again he said: Spread thy mantle, wherewith thou art covered, and hold it with both hands. And when she spread it and held it, he measured six measures of barley, and laid it upon her. And she carried it and went into the city,',
  },
  'RUT 3:16': {
    rsv: 'And when she came to her mother-in-law, she said, “How did you fare, my daughter?” Then she told her all that the man had done for her,',
    dra: 'And came to her mother in law; who said to her: What hast thou done, daughter? And she told her all that the man had done to her.',
  },
  'RUT 3:17': {
    rsv: 'saying, “These six measures of barley he gave to me, for he said, ‘You must not go back empty-handed to your mother-in-law.’”',
    dra: 'And she said: Behold he hath given me six measures of barley: for he said: I will not have thee return empty to thy mother in law.',
  },
  'RUT 3:18': {
    rsv: 'She replied, “Wait, my daughter, until you learn how the matter turns out, for the man will not rest, but will settle the matter today.”',
    dra: 'And Noemi said: Wait my daughter, till we see what end the thing will have. For the man will not rest until he have accomplished what he hath said.',
  },
  'RUT 4:1': {
    rsv: 'And Boaz went up to the gate and sat down there; and behold, the next of kin, of whom Boaz had spoken, came by. So Boaz said, “Turn aside, friend; sit down here”; and he turned aside and sat down.',
    dra: 'Then Booz went up to the gate, and sat there. And when he had seen the kinsman going by, of whom he had spoken before, he said to him, calling him by his name: Turn aside for a little while, and sit down here. He turned aside, and sat down.',
  },
  'RUT 4:2': {
    rsv: 'And he took ten men of the elders of the city, and said, “Sit down here”; so they sat down.',
    dra: 'And Booz taking ten men of the ancients of the city, said to them: Sit ye down here.',
  },
  'RUT 4:3': {
    rsv: 'Then he said to the next of kin, “Naomi, who has come back from the country of Moab, is selling the parcel of land which belonged to our kinsman Elimelech.',
    dra: 'They sat down, and he spoke to the kinsman: Noemi, who is returned from the country of Moab, will sell a parcel of land that belonged to our brother Elimelech.',
  },
  'RUT 4:5': {
    rsv: 'Then Boaz said, “The day you buy the field from the hand of Naomi, you are also buying Ruth the Moabitess, the widow of the dead, in order to restore the name of the dead to his inheritance.”',
    dra: 'And Booz said to him: When thou shalt buy the field at the woman’s hand, thou must take also Ruth the Moabitess, who was the wife of the deceased: to raise up the name of thy kinsman in his inheritance.',
  },
  'RUT 4:6': {
    rsv: 'Then the next of kin said, “I cannot redeem it for myself, lest I impair my own inheritance. Take my right of redemption yourself, for I cannot redeem it.”',
    dra: 'He answered: I yield up my right of next akin: for I must not cut off the posterity of my own family. Do thou make use of my privilege, which I profess I do willingly forego.',
  },
  'RUT 4:7': {
    rsv: 'Now this was the custom in former times in Israel concerning redeeming and exchanging: to confirm a transaction, the one drew off his sandal and gave it to the other, and this was the manner of attesting in Israel.',
    dra: 'Now this in former times was the manner in Israel between kinsmen, that if at any time one yielded his right to another: that the grant might be sure, the man put off his shoe, and gave it to his neighhour; this was a testimony of cession of right in Israel.',
  },
  'RUT 4:9': {
    rsv: 'Then Boaz said to the elders and all the people, “You are witnesses this day that I have bought from the hand of Naomi all that belonged to Elimelech and all that belonged to Chilion and to Mahlon.',
    dra: 'And he said to the ancients and to all the people: You are witnesses this day, that I have bought all that was Elimelech’s, and Chelion’s, and Mahalon’s, of the hand of Noemi:',
  },
  'RUT 4:10': {
    rsv: 'Also Ruth the Moabitess, the widow of Mahlon, I have bought to be my wife, to perpetuate the name of the dead in his inheritance, that the name of the dead may not be cut off from among his brethren and from the gate of his native place; you are witnesses this day.”',
    dra: 'And have taken to wife Ruth the Moabitess, the wife of Mahalon, to raise up the name of the deceased in his inheritance lest his name be cut off, from among his family and his brethren and his people. You, I say, are witnesses of this thing.',
  },
  'RUT 4:11': {
    rsv: 'Then all the people who were at the gate, and the elders, said, “We are witnesses. May the LORD make the woman, who is coming into your house, like Rachel and Leah, who together built up the house of Israel. May you prosper in Ephrathah and be renowned in Bethlehem;',
    dra: 'Then all the people that were in the gate, and the ancients answered: We are witnesses: The Lord make this woman who cometh into thy house, like Rachel, and Lia, who built up the house of Israel: that she may be an example of virtue in Ephrata, and may have a famous name in Bethlehem:',
  },
  'RUT 4:14': {
    rsv: 'Then the women said to Naomi, “Blessed be the LORD, who has not left you this day without next of kin; and may his name be renowned in Israel!',
    dra: 'And the women said to Noemi: Blessed be the Lord, who hath not suffered thy family to want a successor, that his name should be preserved in Israel.',
  },
  'RUT 4:15': {
    rsv: 'He shall be to you a restorer of life and a nourisher of your old age; for your daughter-in-law who loves you, who is more to you than seven sons, has borne him.”',
    dra: 'And thou shouldst have one to comfort thy soul, and cherish thy old age. For he is born of thy daughter in law: who loveth thee: and is much better to thee, than if thou hadst seven sons.',
  },
  'RUT 4:16': {
    rsv: 'Then Naomi took the child and laid him in her bosom, and became his nurse.',
    dra: 'And Noemi taking the child laid it in her bosom, and she carried it, and was a nurse unto it.',
  },
  'RUT 4:17': {
    rsv: 'And the women of the neighborhood gave him a name, saying, “A son has been born to Naomi.” They named him Obed; he was the father of Jesse, the father of David.',
    dra: 'And the women her neighbours, congratulating with her and saying: There is a son born to Noemi: called his name Obed: he is the father of Isai, the father of David.',
  },
  'RUT 4:18': {
    rsv: 'Now these are the descendants of Perez: Perez was the father of Hezron,',
    dra: 'These are the generations of Phares: Phares begot Esron,',
  },
  'RUT 4:21': {
    rsv: 'Salmon of Boaz, Boaz of Obed,',
    dra: 'Salmon begot Booz, Booz begot Obed,',
  },
  'RUT 4:22': {
    rsv: 'Obed of Jesse, and Jesse of David.',
    dra: 'Obed begot Isai, Isai begot David.',
  },
  'MAT 1:6': {
    rsv: 'and Jesse the father of David the king. And David was the father of Solomon by the wife of Uriah,',
    dra: 'And Jesse begot David the king. And David the king begot Solomon, of her that had been the wife of Urias.',
  },
  'MAT 23:37': {
    rsv: '“O Jerusalem, Jerusalem, killing the prophets and stoning those who are sent to you! How often would I have gathered your children together as a hen gathers her brood under her wings, and you would not!',
    dra: 'Jerusalem, Jerusalem, thou that killest the prophets, and stonest them that are sent unto thee, how often would I have gathered together thy children, as the hen doth gather her chickens under her wings, and thou wouldest not?',
  },
  'JHN 1:16': {
    rsv: 'And from his fulness have we all received, grace upon grace.',
    dra: 'And of his fulness we all have received, and grace for grace.',
  },
  'JHN 16:20': {
    rsv: 'Truly, truly, I say to you, you will weep and lament, but the world will rejoice; you will be sorrowful, but your sorrow will turn into joy.',
    dra: 'Amen, amen I say to you, that you shall lament and weep, but the world shall rejoice; and you shall be made sorrowful, but your sorrow shall be turned into joy.',
  },
  'JHN 16:22': {
    rsv: 'So you have sorrow now, but I will see you again and your hearts will rejoice, and no one will take your joy from you.',
    dra: 'So also you now indeed have sorrow; but I will see you again, and your heart shall rejoice; and your joy no man shall take from you.',
  },
  'EPH 2:19': {
    rsv: 'So then you are no longer strangers and sojourners, but you are fellow citizens with the saints and members of the household of God,',
    dra: 'Now therefore you are no more strangers and foreigners; but you are fellow citizens with the saints, and the domestics of God,',
  },
  '1PE 1:18': {
    rsv: 'You know that you were ransomed from the futile ways inherited from your fathers, not with perishable things such as silver or gold,',
    dra: 'Knowing that you were not redeemed with corruptible things as gold or silver, from your vain conversation of the tradition of your fathers:',
  },
  '1PE 1:19': {
    rsv: 'but with the precious blood of Christ, like that of a lamb without blemish or spot.',
    dra: 'But with the precious blood of Christ, as of a lamb unspotted and undefiled,',
  },
}

/** A verse's words in the active translation. Throws for a verse that isn't in the list (a content check catches these first). */
export function verseText(ref: string, translation: TranslationId = ACTIVE_TRANSLATION): string {
  const verse = VERSES[ref]
  if (!verse) throw new Error(`No text for ${ref}`)
  return verse[translation]
}
