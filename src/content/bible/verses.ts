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
}

/** A verse's words in the active translation. Throws for a verse that isn't in the list (a content check catches these first). */
export function verseText(ref: string, translation: TranslationId = ACTIVE_TRANSLATION): string {
  const verse = VERSES[ref]
  if (!verse) throw new Error(`No text for ${ref}`)
  return verse[translation]
}
