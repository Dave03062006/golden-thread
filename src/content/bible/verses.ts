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
}

/** A verse's words in the active translation. Throws for a verse that isn't in the list (a content check catches these first). */
export function verseText(ref: string, translation: TranslationId = ACTIVE_TRANSLATION): string {
  const verse = VERSES[ref]
  if (!verse) throw new Error(`No text for ${ref}`)
  return verse[translation]
}
