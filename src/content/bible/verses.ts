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
}

/** A verse's words in the active translation. Throws for a verse that isn't in the list (a content check catches these first). */
export function verseText(ref: string, translation: TranslationId = ACTIVE_TRANSLATION): string {
  const verse = VERSES[ref]
  if (!verse) throw new Error(`No text for ${ref}`)
  return verse[translation]
}
