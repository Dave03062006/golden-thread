# Golden Thread: design

**Owner:** Dave Tristian Nurcahyo
**Date:** 2026-10-15
**Status:** Designed and approved section by section on 2026-10-15. This document collects those decisions and is awaiting Dave's review.
**Working title:** *Golden Thread*. It can be renamed at any time.

## In plain words

Golden Thread is a web game that walks through the whole Catholic Bible, all 73 books, in the order the story happens, from Creation to Revelation. It is made for adults who want to understand the Bible properly and grow in faith, so it favors depth over speed. Every story is retold scene by scene, close to the text, with key verses quoted. Each one also has a playable moment, background on history and geography, and a **golden thread** showing how it points to Christ. Every level ends with a quiz and a time of reflection and prayer.

The game has two complete art styles that the player can switch between at any time, even in the middle of a scene:

- **Paper & Glass.** Stories and minigames play in a backlit paper-cut theater. The hub is a cathedral whose stained-glass windows fill in as stories are finished.
- **Pixel.** Everything is 16-bit pixel art, with a pixel world map of the Bible lands and a pixel cathedral.

Background music has two modes. **Sacred music** is built in: real recordings of chant, hymns and sacred classics, all properly licensed. **Worship songs** (Hillsong and others) come from the player's own copies, or the player listens along in their own music app.

It is built with React, TypeScript and Vite, like Dave's portfolio, and hosted on Vercel. It is built level by level, starting with Level 1.

## 1. Goals and non-goals

**Goals**

- A player who finishes a level understands that part of the Bible: what happened, in what order, where and when, what it meant, and how it points to Christ.
- It deepens faith, not only knowledge. Every level ends in reflection and prayer, and every episode sends the player to read the real chapters in their own Bible.
- It covers all 73 books of the Catholic canon, in story order, without skipping arcs.
- It is a real game. Every episode has an interactive moment, animation is fluid at the screen's full refresh rate, and both art styles are complete.
- Progress is never lost. Every scene is a checkpoint, and there are three save files, automatic backups, and export and import.
- The quiz can be replayed at any time and is different every time.
- It is faithful to Scripture and the Catholic faith, and handles hard passages honestly but tastefully.
- It respects copyright. No copyrighted recordings ship with the game, and every free track and quoted translation is properly licensed.
- The code is readable for a React learner, and comes with a code tour.

**Non-goals (not building these)**

- Accounts, cloud saves, multiplayer, leaderboards.
- Streaming music inside the game from Spotify or YouTube. Their developer policies forbid it (section 12.4).
- Copyrighted songs bundled inside the game.
- A full-chapter Bible reader. It needs translation permission; a Douay-Rheims reader may come later.
- Separate Church-teaching notes on each story. Dave chose not to include them. Golden threads still name their sources.
- Branching story choices. The biblical narrative is fixed.
- Timers in the story or the quiz.

## 2. Decisions at a glance

| Topic | Decision |
|---|---|
| Audience | Teens and adults who want real understanding. Fuller stories; hard passages handled honestly but tastefully. |
| Gameplay | Story scenes plus one interactive moment per episode |
| Faith and learning | Golden threads (Old Testament → Christ), reflection and prayer, maps, timeline and history, and an end-of-level quiz |
| Bible translation | RSV-2CE for quotes, pending Ignatius Press permission before public launch; Douay-Rheims as the fallback |
| Order | Story order (chronological), not book order |
| Art | Two full styles, Paper & Glass and Pixel, switchable at any time |
| Rollout | Both styles from the start. Level 1 is the checkpoint for the real cost. |
| Tech | React 19, TypeScript, Vite. SVG for Paper & Glass, canvas for Pixel, our own small engine pieces. |
| Music | Two modes: free sacred music (built in) and worship songs (the player's own copies, or listening along) |
| Platform | Web browser on desktop, tablet and phone, hosted on Vercel |

## 3. Structure

### 3.1 Four layers

| Layer | Count | What it is |
|---|---|---|
| Age | 14 | A great era of salvation history. The Ages form the timeline strip on the map and the bays of the cathedral. |
| Level | 53 | One arc, for example *Joseph and His Brothers*. Each has one cathedral window and one map region, and takes 30–65 minutes. |
| Episode | about 340 | One story, for example *"I Am Joseph"*. Each takes 5–12 minutes. |
| Scene | several per episode | One beat of the story. **Every scene is a checkpoint.** |

The whole game comes to about 40 hours of play.

### 3.2 An episode

1. **Story.** Animated scenes are narrated in plain modern English, following the Bible closely in our own words. Key verses are quoted exactly from the active translation. Nothing is timed: the player taps, clicks or presses Space to continue. Auto-advance is an optional setting. A history panel lets the player scroll back through every line of the episode.
2. **Where and when.** A card, available at any moment, with the place on the map, the approximate date (marked honestly when uncertain or debated), and background on the culture, customs and empires behind the story.
3. **Play.** One interactive moment per episode. It is either a minigame from a library of about 20 kinds of play (section 13.7), redressed for each story, or a quiet reflective interaction. No game can block the story, because every minigame has a gentle mode.
4. **Golden thread.** Something in the scene glows. When the player finds it, the game shows how this moment points to Christ, with both references side by side and the source of the connection. The thread is recorded in the cathedral and on the map.
5. **Read it in your Bible.** The exact chapters to read, with an "I've read it" mark.

### 3.3 The end of a level

After the last episode, in this order:

1. **The quiz** (section 5).
2. **Reflection and prayer.** A verse to ponder, a question for the player's own life, an optional written answer saved to the journal, and a short prayer. The prayer is original and is often followed by a traditional one such as the Glory Be.
3. **The window ceremony.** The level's cathedral window is completed and its map region lights up.

### 3.4 Replaying

Any finished episode can be replayed from the cathedral or the map without changing progress. Quizzes can be replayed at any time (section 5).

## 4. Saves and checkpoints

- **Three save files** on the title screen. Each shows the player's name, current level and episode, time played, art style, last played date, and a picture of where the player stopped.
- **Automatic saving:**
  - at the start of every scene
  - at the start of every minigame, and halfway through longer ones
  - when a quiz or reflection is finished
  - while the player types in the journal
- **Continue** returns to the exact scene. A minigame resumes from its start or from its halfway checkpoint.
- **Pause menu:** Resume · Save & Quit · Journal · Settings · Main Menu.
- **Export and import.** A save can be downloaded as a file for backup or for moving to another device or browser, and loaded there. There are no accounts; everything stays on the device.
- **Safety.** The previous save is kept as a backup, and a checksum detects damage. Saves carry a version number and are upgraded automatically after game updates.
- **What belongs where:**
  - *Per save:* name, art style, progress, golden threads found, quiz history, journal and "I've read it" marks.
  - *Per device:* volumes, text size and other comfort settings, and the worship-music library.
- **Keeping data.** The game asks the browser for permanent storage, and now and then reminds the player to export a backup.

## 5. The quiz

- **When:** at the end of every level, before reflection and prayer.
- **Replay at any time:**
  - from **Quiz** on the main menu, choosing one level, a whole Age, or *Everything so far* (a mix drawn evenly from all finished levels)
  - from any finished window in the cathedral or region on the map
- **Each run:** 10 questions picked at random from the level's bank of **at least 40**. Answer order is shuffled, and the same set never comes twice in a row. Questions the player missed come back more often until answered correctly.
- **Seven question types:**
  1. multiple choice
  2. true or false
  3. who said it?
  4. put the events in order
  5. where did it happen? (tap the map)
  6. finish the verse
  7. match the golden thread
- **It teaches, not just tests.** After each answer the player sees the correct answer, a short explanation and the passage to read.
- **No clock and no failing.** The player earns 1–3 stars, and the best score is saved.
- **Review.** After a run, "Review your answers" shows that exact run again.

## 6. Hard passages and how things are shown

- Violence and sin, such as the Flood, Cain, the Judges, Judith, the martyrs and the Passion, are **told honestly but shown tastefully**: off-screen, in silhouette or implied, never graphic. A short note appears before an intense episode.
- Mature themes, such as David and Bathsheba or the Song of Songs, are told with restraint and focus on their meaning.
- God the Father is shown as light and voice. Jesus is shown with reverence. Angels are figures of light.

## 7. Level 1 in full: *Creation and the Fall*

Genesis 1–5, about 55–60 minutes. Every scene listed is a checkpoint.

### Episode 1 · In the Beginning (Genesis 1:1–2:3, about 12 min)

Scenes:

1. Darkness, and "the Spirit of God was moving over the face of the waters" (1:2)
2. Day 1: light. "Let there be light" (1:3)
3. Day 2: the firmament divides the waters
4. Day 3: land, seas and plants
5. Day 4: sun, moon and stars
6. Day 5: fish and birds
7. Day 6: the animals, then man and woman made "in his own image" (1:27), and "it was very good" (1:31)
8. Day 7: God rests and blesses the day

- **Play: "Let there be…"** On each day the player brings forth that day's works: separating light from darkness, parting the waters, raising the land, hanging the lights, releasing the fish and birds. It has no fail state and is meant to be contemplative. The order of the days stays with the player.
- **Golden thread:** Creation → the Word through whom all things were made (John 1:1–3).
- **Where and when:** Genesis 1–11 tells of the time before recorded history. The Church reads these chapters as revealing true things about God, creation and humanity in symbolic language (Catechism 337, 390).
- **Music cue:** in Haydn's *The Creation*, the blazing chord on "and there was light" lands at the moment light bursts across the screen.

### Episode 2 · The Garden of Eden (Genesis 2:4–25, about 8 min)

Scenes:

1. Formed from dust, filled with the breath of life (2:7)
2. The garden and its four rivers
3. The two trees and the one command (2:16–17)
4. "It is not good that the man should be alone" (2:18), so Adam names the animals
5. The woman: "bone of my bones" (2:23), and the two become one flesh (2:24)

- **Play: naming the animals.** The creatures come to Adam one by one, and the player names each from its description. It ends with "for the man there was not found a helper fit for him" (2:20).
- **Golden thread:** marriage → Christ and the Church (Ephesians 5:31–32).
- **Where and when:** Eden's rivers. The Tigris and Euphrates still flow through modern Iraq, while the Pishon and Gihon are unknown.

### Episode 3 · The Serpent and the Fall (Genesis 3:1–13, about 7 min)

Scenes:

1. The serpent's question
2. The fruit
3. Eyes opened, fig leaves
4. "Where are you?" (3:9)
5. The man blames the woman, and the woman blames the serpent

- **Play: "Spot the twist."** God's real words (2:16–17) are set beside the serpent's version (3:1, 4–5), and the player finds each distortion. The player learns how temptation bends the truth.
- **Golden thread:** disobedience in a garden → obedience in a garden (Romans 5:19; Jesus in the garden of Gethsemane, Luke 22:42 and John 18:1).

### Episode 4 · The Promise and the Exile (Genesis 3:14–24, about 8 min)

Scenes:

1. The serpent cursed, and the first promise: "he shall bruise your head, and you shall bruise his heel" (3:15)
2. The consequences: "you are dust, and to dust you shall return" (3:19), the words of Ash Wednesday
3. Eve, "mother of all living" (3:20)
4. God makes them garments of skins, caring for them even in judgment
5. The exile, with the cherubim guarding the tree of life

- **Play: "Lights in the dark."** The garden darkens as they leave. The player gathers its points of light, God's mercies inside the judgment: the promise, the garments and the name "Eve."
- **Golden thread, the main thread of Level 1:** the Woman and her offspring → Mary and Jesus (John 19:26, "Woman, behold, your son"; Revelation 12; Catechism 410–411). In Level 53 the woman clothed with the sun closes this loop.

### Episode 5 · Cain and Abel (Genesis 4:1–16, about 9 min)

Scenes:

1. Two brothers: a shepherd and a farmer
2. Two offerings, and only one is accepted
3. "Sin is couching at the door… you must master it" (4:7)
4. In the field (told with restraint)
5. "Am I my brother's keeper?" (4:9)
6. "The voice of your brother's blood is crying to me from the ground" (4:10), then the mark that protects Cain

- **Play: Abel's flock.** The player tends the sheep and chooses the firstlings and best portions for the offering: giving God your best.
- **Golden thread:** Abel's blood → the blood of Jesus that "speaks more graciously than the blood of Abel" (Hebrews 12:24). The Mass still names "the gifts of your servant Abel the just" (Roman Canon).
- **Where and when:** the land of Nod, "east of Eden" (4:16).

### Episode 6 · From Adam to Noah (Genesis 4:17–5:32, about 6 min)

Scenes:

1. Cain's line: the first cities, music and metalwork
2. Seth, and "men began to call upon the name of the LORD" (4:26)
3. Ten generations from Adam
4. "Enoch walked with God; and he was not, for God took him" (5:24)
5. Noah is born: "this one shall bring us relief" (5:29)

- **Play: the family tree.** The player builds the line from Adam to Noah, generation by generation.
- **Golden thread:** this family line runs all the way to Jesus, whose genealogy ends "the son of Adam, the son of God" (Luke 3:38).

### Level 1 quiz

The bank has at least 40 questions. One example of each type:

- **Multiple choice:** On which day did God make the sun, moon and stars?
- **True or false:** Adam named the animals before Eve was created. (True, Genesis 2:19–22)
- **Who said it?** "Am I my brother's keeper?"
- **Put in order:** the seven days of creation.
- **Where?** Tap the two rivers of Eden that still flow today.
- **Finish the verse:** "In the beginning God created the ___ and the ___."
- **Match the thread:** Abel's blood → ?

### Level 1 reflection and prayer

- **Verse to ponder:** "Where are you?" (Genesis 3:9)
- **Question:** God came looking for Adam and Eve even after they hid. Where are you with God today?
- **Prayer:** a short original prayer of trust in the promise, followed by the Glory Be.

### Level 1 music

- **Sacred music:** Haydn, *The Creation*.
- **Worship song:** "So Will I (100 Billion X)", Hillsong United.

## 8. Every Age and level, with its episodes

**Age I · The Beginning**

- **L1 · Creation and the Fall** (Genesis 1–5, about 55 min): In the Beginning · The Garden of Eden · The Serpent and the Fall · The Promise and the Exile · Cain and Abel · From Adam to Noah
- **L2 · Noah and the Nations** (Genesis 6–11, about 50 min): A World Gone Wrong, a Man Who Walked with God · Building the Ark · The Flood · The Dove Returns · The Rainbow Covenant · The Tower of Babel · From Shem to Abram

**Age II · The Patriarchs**

- **L3 · Abraham, Father of Faith** (Genesis 12–23, about 65 min): The Call · Lot Chooses the Plain · Melchizedek's Bread and Wine · Count the Stars · Hagar and Ishmael · New Names, Everlasting Covenant · Three Visitors at Mamre · Sodom and Gomorrah · Laughter: Isaac Is Born · The Binding of Isaac
- **L4 · Isaac and Jacob** (Genesis 24–36, about 50 min): A Bride for Isaac · The Birthright · The Stolen Blessing · Jacob's Ladder · Rachel and Leah · Wrestling with God · Brothers Reconciled
- **L5 · Joseph and His Brothers** (Genesis 37–50, about 55 min): Sold for Silver · Faithful in Potiphar's House and in Prison · Pharaoh's Dreams · The Brothers Come for Grain · Benjamin and the Silver Cup · "I Am Joseph" · Jacob's Blessings
- **L6 · Job** (Job, about 35 min): The Trial · Job's Lament · The Friends' Arguments · "I Know That My Redeemer Lives" · God Answers from the Whirlwind · Restored

**Age III · Out of Egypt**

- **L7 · Moses Is Called** (Exodus 1–4, about 40 min): Slavery and the Brave Midwives · The Baby in the Basket · Flight to Midian · The Burning Bush · Return to Egypt
- **L8 · The Plagues and the Passover** (Exodus 5–13, about 50 min): "Let My People Go" · Bricks Without Straw · The First Nine Plagues · The Passover Lamb · The Night of Departure · Remember This Day
- **L9 · Through the Sea** (Exodus 14–18, about 45 min): Trapped at the Sea · The Waters Part · The Song of Moses and Miriam · Manna and Quail · Water from the Rock · Hands Raised Against Amalek · Jethro's Advice

**Age IV · The Covenant in the Desert**

- **L10 · Sinai** (Exodus 19–24, 32–34, about 50 min): The Mountain of Fire · The Ten Commandments · The Blood of the Covenant · The Golden Calf · Moses Intercedes · God's Glory Passes By
- **L11 · The Tabernacle and the Holy Life** (Exodus 25–31, 35–40, Leviticus, about 45 min): The Pattern of the Tabernacle · The Ark of the Covenant · Priests and Their Vestments · Offerings and Sacrifices · The Day of Atonement · The Feasts of the Year · "Love Your Neighbor as Yourself"
- **L12 · Forty Years in the Wilderness** (Numbers, about 55 min): The Camp and the Priestly Blessing · Complaints and Quail · The Twelve Spies · Korah's Rebellion and Aaron's Rod · Water at Meribah · The Bronze Serpent · Balaam and His Donkey · A Star Out of Jacob
- **L13 · Moses' Last Words** (Deuteronomy, about 35 min): Remember the Way · "Hear, O Israel" · A Prophet Like Moses · Choose Life · Moses Sees the Land

**Age V · The Promised Land**

- **L14 · Joshua** (Joshua, about 50 min): Rahab and the Spies · Crossing the Jordan · The Walls of Jericho · Achan and Ai · The Sun Stands Still · Dividing the Land · "As for Me and My House"
- **L15 · The Judges** (Judges, about 50 min): The Cycle of Forgetting · Deborah and Barak · Gideon's Fleece and Three Hundred Men · Jephthah's Vow · Samson · Everyone Did What Was Right in His Own Eyes
- **L16 · Ruth** (Ruth, about 35 min): Naomi's Sorrow · "Where You Go I Will Go" · Gleaning in Boaz's Field · The Threshing Floor · The Redeemer

**Age VI · The Kingdom**

- **L17 · Samuel and Saul** (1 Samuel 1–15, about 50 min): Hannah's Prayer · "Speak, Lord, for Your Servant Hears" · The Ark Is Captured · Israel Asks for a King · Saul Anointed · To Obey Is Better Than Sacrifice
- **L18 · David, the Shepherd King** (1 Samuel 16–31, 2 Samuel 1–10, 1 Chronicles 10–19, about 65 min): The Shepherd Boy Anointed · David and Goliath · Jonathan's Friendship · On the Run from Saul · Sparing the Lord's Anointed · King in Jerusalem · David Dances Before the Ark · God's Covenant with David
- **L19 · David's Sin and Repentance** (2 Samuel 11–24, Psalm 51, about 40 min): Bathsheba and Uriah · Nathan's Parable · "Have Mercy on Me, O God" · Absalom's Rebellion · David's Last Words
- **L20 · The Psalms** (Psalms, about 45 min): Songs of Praise · The Lord Is My Shepherd · Songs of Lament · Songs of Repentance · The King Who Is to Come · Songs of the Road to Jerusalem
- **L21 · Solomon and the Temple** (1 Kings 1–11, 2 Chronicles 1–9, about 45 min): Solomon Asks for Wisdom · The Two Mothers · Building the Temple · The Glory Fills the House · The Queen of Sheba · Solomon's Heart Turns Away
- **L22 · Wisdom for Life** (Proverbs, Ecclesiastes, Song of Songs, about 35 min): The Fear of the Lord · Lady Wisdom · A Time for Everything · The Song of Songs

**Age VII · A Kingdom Divided**

- **L23 · The Kingdom Splits, and Elijah** (1 Kings 12–22, 2 Kings 1–2, 2 Chronicles 10–20, about 55 min): The Kingdom Torn in Two · Elijah and the Drought · The Widow of Zarephath · Fire on Mount Carmel · The Still Small Voice · Naboth's Vineyard · The Chariot of Fire
- **L24 · Elisha** (2 Kings 2–13, about 45 min): A Double Portion · The Widow's Oil · The Shunammite's Son · Naaman Washed Clean · Horses and Chariots of Fire · Bread for a Hundred
- **L25 · Prophets to the North** (Amos, Hosea, Jonah, 2 Kings 14–17, about 45 min): Amos: Let Justice Roll Down · Hosea: A Love That Will Not Let Go · Jonah Runs Away · Three Days in the Fish · Nineveh Repents · Samaria Falls
- **L26 · Tobit** (Tobit, about 40 min): Tobit's Good Works · Two Prayers Heard · The Journey with Raphael · Tobias and Sarah · Sight Restored
- **L27 · Isaiah and Hezekiah** (Isaiah 1–39, Micah, 2 Kings 18–20, 2 Chronicles 29–32, about 50 min): "Holy, Holy, Holy" · The Virgin Shall Conceive · "To Us a Child Is Born" · A Shoot from the Stump of Jesse · Bethlehem, Small Among the Clans · Hezekiah and the Assyrians · Hezekiah's Prayer
- **L28 · The Last Kings of Judah** (2 Kings 21–23, 2 Chronicles 33–36, Nahum, Habakkuk, Zephaniah, about 35 min): Manasseh · Josiah Finds the Book of the Law · Nineveh Falls · "The Righteous Shall Live by Faith"

**Age VIII · Exile in Babylon**

- **L29 · Jeremiah and the Fall of Jerusalem** (Jeremiah, Lamentations, Obadiah, 2 Kings 24–25, about 55 min): Jeremiah's Call · The Potter's House · The Yoke · A New Covenant · The Siege · Jerusalem Falls · "His Mercies Are New Every Morning"
- **L30 · Comfort in Exile** (Isaiah 40–66, Ezekiel, Baruch, about 50 min): By the Rivers of Babylon · Ezekiel's Vision of Glory · The Good Shepherd · The Valley of Dry Bones · "Comfort My People" · The Suffering Servant · Baruch's Prayer
- **L31 · Daniel** (Daniel 1–14, about 55 min): Faithful in a Foreign Court · The King's Dream · The Fiery Furnace · The Writing on the Wall · The Lions' Den · One Like a Son of Man · Susanna · Bel and the Dragon

**Age IX · The Return**

- **L32 · Rebuilding the Temple** (Ezra 1–6, Haggai, Zechariah, about 35 min): Cyrus Lets the People Go · Laughter and Tears at the Foundation · Haggai: Build the House · Zechariah: Your King Comes on a Donkey
- **L33 · Esther** (Esther with the Greek additions, about 40 min): A Queen Is Chosen · Haman's Plot · "For Such a Time as This" · Esther's Prayer · The Tables Turn
- **L34 · Ezra and Nehemiah** (Ezra 7–10, Nehemiah, Malachi, Joel, about 45 min): Ezra Teaches the Law · Nehemiah's Prayer · Building the Walls with a Sword in Hand · The Book Is Read Aloud · Malachi: A Pure Offering · Joel: I Will Pour Out My Spirit
- **L35 · Judith** (Judith, about 35 min): The Siege of Bethulia · Judith's Prayer · In the Enemy Camp · Deliverance and Song

**Age X · The Maccabees**

- **L36 · The Maccabean Revolt** (1–2 Maccabees, about 55 min): The Temple Defiled · Eleazar's Witness · A Mother and Seven Sons · Mattathias Refuses · Judas Maccabeus · The Temple Rededicated · Prayer for the Dead
- **L37 · Wisdom in the Late Age** (Sirach, Wisdom, about 35 min): The Teaching of Ben Sira · Honor Your Father and Mother · The Just One Persecuted · Wisdom, Reflection of Eternal Light

**Age XI · The Word Made Flesh**

- **L38 · The Annunciation and the Nativity** (Luke 1–2, Matthew 1–2, about 65 min): Zechariah in the Temple · The Annunciation · The Visitation and the Magnificat · John Is Born · The Birth of Jesus · The Shepherds · Simeon and Anna · The Magi · Flight into Egypt · Finding in the Temple
- **L39 · The Baptism and the First Disciples** (Matthew 3–4, Mark 1, Luke 3–5, John 1–2, about 50 min): The Voice in the Wilderness · The Baptism in the Jordan · Temptation in the Desert · "Behold, the Lamb of God" · Fishers of Men · The Wedding at Cana
- **L40 · The Sermon on the Mount** (Matthew 5–7, Luke 6, about 45 min): The Beatitudes · Salt and Light · The Law Fulfilled · Love Your Enemies · The Lord's Prayer · Do Not Be Anxious · The House on the Rock
- **L41 · Signs and Wonders** (the Gospels, about 50 min): Through the Roof · Calming the Storm · The Centurion's Faith · Jairus's Daughter and the Woman Who Touched His Cloak · The Man Born Blind · "Lazarus, Come Out"
- **L42 · The Parables** (the Gospels, about 50 min): The Sower · The Mustard Seed and the Yeast · The Lost Sheep and the Lost Coin · The Prodigal Son · The Good Samaritan · The Rich Man and Lazarus · The Talents · The Sheep and the Goats
- **L43 · Bread from Heaven** (John 6, Matthew 14–17, about 40 min): Five Loaves and Two Fish · Walking on the Water · "I Am the Bread of Life" · "You Are Peter" · The Transfiguration
- **L44 · The Road to Jerusalem** (Luke 9–19, John 10–12, Matthew 18–20, about 45 min): The Seventy-Two Are Sent · Martha and Mary · The Good Shepherd · Let the Children Come · The Rich Young Man · Zacchaeus · The Anointing at Bethany

**Age XII · The Passion and Resurrection**

- **L45 · Holy Week** (Matthew 21–26, Mark 11–14, Luke 19–22, John 12–17, about 55 min): Hosanna! · The Temple Cleansed · The Widow's Two Coins · Thirty Pieces of Silver · Washing the Disciples' Feet · The Last Supper · "That They May All Be One"
- **L46 · The Passion** (Matthew 26–27, Mark 14–15, Luke 22–23, John 18–19, about 60 min): Gethsemane · Betrayed and Arrested · Peter's Denial · Before Pilate · The Crown of Thorns · The Way of the Cross · The Crucifixion · "Behold, Your Mother" · Laid in the Tomb
- **L47 · He Is Risen** (Matthew 28, Mark 16, Luke 24, John 20–21, Acts 1, about 50 min): The Empty Tomb · Mary Magdalene · The Road to Emmaus · Thomas Believes · Breakfast by the Sea · "Do You Love Me?" · The Ascension

**Age XIII · The Church Is Born**

- **L48 · Pentecost** (Acts 1–7, about 45 min): Waiting in the Upper Room · Tongues of Fire · Peter's First Sermon · The First Christians · Healing at the Beautiful Gate · Stephen, the First Martyr
- **L49 · The Gospel Spreads** (Acts 8–12, about 35 min): Philip and the Ethiopian · Saul on the Road to Damascus · Peter and Cornelius · Peter Freed from Prison
- **L50 · Paul's Journeys, Part 1** (Acts 13–18, Galatians, 1–2 Thessalonians, 1–2 Corinthians, about 55 min): The First Journey · The Council of Jerusalem · Lydia and the Jailer at Philippi · The Unknown God in Athens · Corinth · Courier missions: Freedom in Christ, The Hope of the Resurrection, The Greatest Is Love
- **L51 · Paul's Journeys, Part 2** (Acts 19–28, Romans, Ephesians, Philippians, Colossians, Philemon, 1–2 Timothy, Titus, about 60 min): Riot in Ephesus · Farewell at Miletus · Arrested in Jerusalem · Shipwreck · Rome at Last · Courier missions: Romans, Letters from Prison, Letters to Shepherds
- **L52 · Letters to the Whole Church** (Hebrews, James, 1–2 Peter, 1–3 John, Jude, about 45 min): The Great High Priest · Faith That Works · Living Stones · God Is Love · Contend for the Faith

**Age XIV · All Things Made New**

- **L53 · Revelation** (Revelation 1–22, about 60 min): John on Patmos · Letters to the Seven Churches · The Throne of God · The Lamb Who Was Slain · The Woman Clothed with the Sun · The Fall of Babylon · The Wedding Feast of the Lamb · The New Jerusalem

The last level completes the cathedral's rose window, and every golden thread lights up at once.

**Books that aren't stories still have a role:**

- **Psalms and the wisdom books** are songs and sayings the player collects. For example, David writes Psalm 23 after his shepherd minigame.
- **The prophets** are messengers the player meets, each with a short mission.
- **The letters** are courier missions: the player carries Paul's letters to each city on the map.

## 9. Look and feel

### 9.1 Paper & Glass

**Stories and minigames take place in a paper theater.**

- **Layers.** Every scene is built from 5–8 layers of cut paper: sky, far hills, middle ground, near ground, characters and foreground. Each layer casts a soft shadow and has a real paper grain.
- **Light.** Each scene has a light source behind the paper, such as the sun, a fire, a lamp, or God's glory shown as light. It makes the paper glow at the edges.
- **Characters.** Paper puppets with jointed limbs (head, shoulders, elbows, hips, knees), a nod to wayang. They move by bending at the joints the way a real cut-out puppet does. Faces are simple profiles, and costumes are cut from colored paper with fine pierced details.
- **Text.** Cormorant Garamond for the story, Cinzel for titles and labels.
- **Interface.** Soft paper cards, gold-thread accents, rounded buttons.

**The cathedral is the glass part, and serves as the hub.**

- **The nave.** The player walks along a nave with 14 bays, one per Age. Each level has its own tall window, and each episode is one medallion inside it, read bottom to top like real medieval windows.
- **Setting a panel.** When the player finishes an episode, its panel is set. The glass pieces drift into place, the lead lines draw themselves in, and light floods through.
- **Light and threads.** The cathedral's light follows the player's real time of day: morning light in the morning, evening glow at night. Golden threads glow between panels across the nave. A thread that points ahead to an unreached window glimmers there until the player arrives.
- **The finale.** The rose window above the altar belongs to Revelation and is completed last.
- **Step inside.** Choosing a finished panel and *Step inside* flies the camera into the medallion, and the glass becomes the paper scene.

**The map in Paper & Glass** is a layered paper relief of the Bible lands. Rivers are satin ribbons, cities are small cut-outs, and the player's route is stitched in gold thread.

### 9.2 Pixel

- **Resolution.** Scenes are drawn at a fixed 320×180 and enlarged by a whole number (×4 on a laptop, ×6 on a 1080p screen), so every pixel stays perfectly sharp. A themed border fills any leftover space.
- **Colors.** One master palette of 32 colors, with a sub-palette per Age echoing the same colors as Paper & Glass (section 9.3).
- **Characters and faces.** Characters are sprites of about 16×24 pixels, with animation sets for idle, walk, run, gesture, kneel and pray. Dialogue shows a large 48×48 portrait with expressions (joy, sorrow, fear, awe, anger, peace), which is where the emotion lives.
- **Text.** Pixelify Sans for reading, Press Start 2P for headings. Symbols the pixel fonts lack, such as arrows, are drawn as pixel art or replaced with plain text.
- **Interface.** Classic double-bordered game panels.
- **Cathedral and map.** A pixel cathedral with pixel stained glass, and a world map of the Bible lands. The map shows real geography (the Great Sea, the Nile, the Tigris and Euphrates, Mount Ararat), the route, level markers, golden threads and the Ages strip, as prototyped in the comparison mockup.

### 9.3 Colors per Age

Each Age has a bold palette in both styles, echoing the colors of the Church year: violet for the Exile and the waiting prophets, white and gold for the Nativity and Easter, red for the Passion and Pentecost.

| Age | Palette |
|---|---|
| I · The Beginning | dawn gold, Eden green, deep indigo night |
| II · The Patriarchs | desert ochre, tent crimson, starry blue |
| III · Out of Egypt | Nile turquoise, lapis blue, papyrus gold, plague red |
| IV · The Covenant in the Desert | Sinai stone, fire orange, storm violet, tabernacle gold |
| V · The Promised Land | olive green, wheat gold, Jordan blue |
| VI · The Kingdom | royal purple, cedar brown, Temple gold |
| VII · A Kingdom Divided | ash grey, prophet's-fire red, drought tan |
| VIII · Exile in Babylon | Ishtar-gate blue, brick terracotta, Advent violet |
| IX · The Return | sunrise rose, new-stone cream, Persian turquoise |
| X · The Maccabees | bronze, olive, lamp flame |
| XI · The Word Made Flesh | Galilee blue, spring green, Christmas white and gold |
| XII · The Passion and Resurrection | crimson and violet dusk, then Easter white and gold |
| XIII · The Church Is Born | Pentecost flame red, Mediterranean blue |
| XIV · All Things Made New | the twelve jewels of the heavenly city (Revelation 21:19–20) and white gold |

### 9.4 Switching styles

- **First launch.** The player chooses a style from a live, animated preview of the dove scene in both styles, side by side.
- **Any time after that,** in Settings → Art style. If the player switches in the middle of a story, the scene crossfades to the other style at the exact same moment, with the same line and position. Nothing restarts.
- **Per save file.** Each save remembers its own style.
- **Same features.** Switching styles changes the look, never the features. Every screen exists in both styles, including both the cathedral and the world map.

### 9.5 Screens

- **Title.** The three save files, plus New Game.
- **Main menu.** An animated background of the cathedral nave at dusk, or its pixel version. Items: Continue · New Game · Load · Cathedral · World Map · Quiz · Journal · Settings.
- **Story.**
  - the scene, with the narration panel beneath it
  - continue with a tap, a click or Space
  - the line history, to scroll back through the episode
  - *Where and when* and pause, always one tap away
- **Minigame.** Full screen, with controls shown before starting, for touch, mouse and keyboard.
- **Quiz.** One question card at a time. The explanation and reference unfold after each answer.
- **Reflection and prayer.** A deliberately quiet screen with the verse, the question, the journal box and the prayer.
- **Journal.** All reflections from every level, gathered to reread.
- **Cathedral and World Map.** Described in 9.1 and 9.2.
- **Settings.** Art style, music mode, volumes, text size, high contrast, readable font, reduced motion, gentle mode, auto-advance and read-aloud.
- **Music Library.** The worship-songs setup and coverage checklist (section 11.4).
- **Credits.** Including every music track and its license.

### 9.6 Devices

- Laptops and desktops with mouse and keyboard.
- Tablets and phones with touch.
- On phones, stories and minigames play in landscape (the game asks the player to rotate). Menus, the quiz, the journal and settings also work upright.

### 9.7 Accessibility and comfort

- **Text.** Three text sizes, a high-contrast option and an extra-readable font (Atkinson Hyperlegible).
- **Gentle mode for minigames.** Slower and more forgiving. The goal is the story, not skill, so nobody gets stuck.
- **Navigation.** Full keyboard control with visible focus. Story text is real text, so screen readers can read it.
- **Pacing.** Auto-advance is off by default, and nothing in the story is timed.
- **Motion.** Reduced motion is respected (section 10).
- **Color.** Color is never the only signal, so the game works with color blindness.

## 10. Motion

Fluid animation is a core requirement.

1. **One clock.** Everything moves on one master clock running at the screen's full refresh rate: 60 frames per second, or 120 on high-refresh screens. Movement is calculated from real elapsed time, so speed is identical on every device and a slow frame never makes things jump. When the game pauses, every animation pauses together, and a hidden browser tab costs nothing.
2. **Frame budget.** At 60 fps a frame has 16.7 ms. The game's own work must stay under about 8 ms of it. The minimum target is a steady 60 fps on a mid-range phone from a few years ago.
3. **Nothing starts or stops abruptly.** All motion uses easing curves and springs from a shared set of timings:
   - buttons and menus: quick and springy, 0.2–0.4 s
   - story camera moves: slow and graceful, 1.2–2.5 s
   - prayer and other quiet moments: very slow drifts
4. **No hard cuts.**
   - The camera pans, glides forward and zooms through the layers. Near layers move faster than far ones, which creates depth.
   - Dissolves and changes in light, such as evening falling or a fire flaring, carry the story forward.
   - Moving between screens is one continuous motion, as with *Step inside* in section 9.1.
5. **Scenes are alive.** Water ripples, clouds drift, fire flickers, leaves sway, light shimmers, and characters breathe and blink while waiting. No scene is ever a frozen picture.
6. **Character animation.**
   - *Paper:* puppet poses are keyframed with easing and blended smoothly into each other (walking, stopping, then reaching out). Cloth, hair and wings follow through and settle.
   - *Pixel:* animations are made frame by frame (6–8 frames for walking and flying, 4 for idle), while the characters' movement across the screen glides at the full frame rate.
7. **Smooth pixel scrolling.** The pixel scene is drawn with a small margin and slid by fractions of a pixel when it's enlarged. Sprites stay crisp on the grid while the camera glides.
8. **Performance techniques.**
   - Heavy effects (paper grain, glass texture, soft shadows) are rendered once into sharp images at the screen's resolution when a scene loads, never recomputed every frame.
   - Animation only moves, scales, rotates and fades, which graphics cards do cheaply.
   - The next scene and its sounds load in the background, so a scene change never waits. The first scene appears within about 2 seconds.
   - Every scene has an art budget, checked automatically.
9. **Measured, not guessed.** An on-screen meter during development shows frames per second and frame time. An automatic test plays every scene on a slowed processor and fails if frames drop (section 14).
10. **Reduced motion.** If the device asks for less motion, big camera moves become gentle fades and background motion slows down. Nothing in the story is lost.

## 11. Sound and music

### 11.1 Sound

- **Soundscapes.** Each scene has its own ambient sound (wind, sea, birds, crowds, fire, rain) from free-licensed libraries, under the same license rules as music (section 12.3).
- **Sound effects.** Each style has its own. Paper & Glass is soft and organic; Pixel is classic chiptune.
- **Read aloud (optional).** The device's built-in voice can read the story text aloud. It's free; voice quality depends on the device.
- **Volume.** Separate sliders for music, sound effects and voice.

### 11.2 Two music modes

The player switches in Settings → Music, or from the pause menu at any moment: **Sacred music (free)** · **Worship songs (your copies)** · **Off**.

- **Sacred music (free)** is the default and is built in. It uses real recordings of chant, hymns, spirituals and the great sacred works. Handel and others wrote oratorios on almost every arc of the Bible, so most levels get music written for that very story.
- **Worship songs (your copies)** is the copyrighted mode, with famous songs from Hillsong and others. The game never ships these recordings (section 12.4). The player either plays songs they own inside the game, or listens along in their own music app (section 11.4).
- Real recordings play in both art styles. Eight-bit arrangements of the music are an optional idea for later.

### 11.3 Sacred music: sourcing

- Recordings are gathered from public-domain and open-license libraries such as Musopen, Wikimedia Commons, the Internet Archive, and US military band recordings (which are public domain).
- Every track's license is checked before it is added (section 12.3) and credited on the Credits screen.
- If a planned piece has no good free recording, another fitting piece that has one replaces it, and Dave is told.

### 11.4 Worship songs: setup and use

When the player first chooses Worship songs, a short guide asks *"How do you want to listen?"*

**A · Play songs I own, in the game.** This is the full experience: songs change with each level, crossfade and loop.

1. **Add music.** The player drops in a music folder, or selects many files at once on a phone. The game reads every file in one go.
2. **Automatic matching.** The game reads each song's real title and artist from the file's tags, not just the file name. It ignores differences like "(Live)", "feat.", track numbers and capital letters, and matches songs to all 53 levels. It reports the result, for example *"Matched 31 songs to 34 levels."* **Accept all** is one tap.
3. **Unmatched songs** can be dragged onto any level or picked from a list. A level can have several songs, in the order the player chooses.

**B · Listen along in my music app** (Spotify, Apple Music, YouTube Music or YouTube).

1. The player picks their app once.
2. Every recommended song has a one-tap button that opens it in that app.
3. The player can paste their own playlist link for any level or Age, after which the whole playlist opens with one tap.
4. When a new level begins, a small card appears, for example *"Level 3: 'Jireh' · Open in Spotify."* The game turns its own music off in this mode and keeps its sound effects.

**Always available:**

- **Coverage checklist.** All 53 levels, showing which have songs. Missing songs come with **Find this song** links (Spotify, Apple Music, YouTube Music, YouTube) and where to buy them.
- **Which files work.** Songs bought from the iTunes Store, Amazon or Bandcamp, or copied from CDs, work. Songs downloaded inside Spotify or Apple Music don't, because they're locked to those apps. The game says this plainly.
- **Your own choices.** Any recommendation can be replaced with a song of the player's choice for that level.
- **Gaps.** A level without an added song falls back to its free sacred music, so there's never silence.
- **Keep story scenes instrumental.** An option that plays worship songs in menus, minigames, the quiz and reflection, while story scenes use the instrumental free music, so lyrics don't compete with reading.
- **Storage.** Songs are kept in the browser on the player's device and are never uploaded, shared or included in exported saves. The game asks for permanent storage, shows the space used, and has **Remove all**.
- **Moving devices.** An exported save remembers *which* songs were used. When the player adds their folder on the new device, everything re-matches automatically.
- **Now playing.** A small card shows the title and artist when a new song starts.

### 11.5 How music plays

- **A playlist per level.** Each level has 3–6 pieces, led by the one in section 11.6:
  - a main piece for story scenes
  - a livelier one for minigames
  - a calm one, usually chant, for reflection and prayer
  - a light one for the quiz
- **Hubs.** The cathedral has its own organ and chant music. The map plays the current Age's theme.
- **Smooth changes.** Tracks crossfade over 2–3 seconds and never cut. Music continues across scenes and checkpoints instead of restarting.
- **Cues.** A moment in the music can be pinned to a story beat. For example, Haydn's chord on "and there was light" lands as light bursts across the screen in Level 1, Episode 1.
- **Ducking.** Music softens automatically under the read-aloud voice.

### 11.6 Music for every level

Each level's full playlist (3–6 pieces in each mode) is written into its script for approval.

| Level | Sacred music (free) | Worship songs (your copies) |
|---|---|---|
| 1 · Creation and the Fall | Haydn, *The Creation* ("And there was light") | "So Will I (100 Billion X)", Hillsong United |
| 2 · Noah and the Nations | "Eternal Father, Strong to Save" (the sailors' hymn), chant *Vidi aquam* (water and baptism) | "Promises", Maverick City Music |
| 3 · Abraham, Father of Faith | "The God of Abraham Praise" | "Jireh" (named from Genesis 22:14, "The LORD will provide"), Elevation Worship & Maverick City |
| 4 · Isaac and Jacob | "We Are Climbing Jacob's Ladder" (spiritual) | "Goodness of God", Bethel Music |
| 5 · Joseph and His Brothers | Handel, *Joseph and His Brethren* | "Even When It Hurts (Praise Song)", Hillsong United |
| 6 · Job | Handel, *Messiah*: "I know that my Redeemer liveth" (Job 19:25) | "Blessed Be Your Name" ("You give and take away"), Matt Redman |
| 7 · Moses Is Called | "Go Down, Moses" (spiritual) | "Great I Am", Phillips, Craig & Dean |
| 8 · The Plagues and the Passover | Handel, *Israel in Egypt* (the plague choruses) | "Worthy Is the Lamb", Hillsong Worship |
| 9 · Through the Sea | Handel, *Israel in Egypt* ("The horse and his rider"), the Easter *Exsultet* | "Red Sea Road", Ellie Holcomb |
| 10 · Sinai | Bach, "These Are the Holy Ten Commandments" (organ chorale) | "Holy Forever", Chris Tomlin |
| 11 · The Tabernacle and the Holy Life | Bruckner, *Locus iste* ("This place was made by God") | "Build My Life", Housefires |
| 12 · Forty Years in the Wilderness | "Guide Me, O Thou Great Jehovah" ("Bread of heaven, feed me") | "The Blessing" (Numbers 6:24–26), Kari Jobe & Cody Carnes |
| 13 · Moses' Last Words | "O God, Our Help in Ages Past" (Psalm 90, "a prayer of Moses") | "10,000 Reasons (Bless the Lord)", Matt Redman |
| 14 · Joshua | "Joshua Fit the Battle of Jericho" (spiritual), Handel, *Joshua* | "Do It Again" ("walking around these walls"), Elevation Worship |
| 15 · The Judges | Handel, *Samson* and *Jephtha* | "Surrounded (Fight My Battles)", UPPERROOM / Michael W. Smith |
| 16 · Ruth | César Franck, *Ruth* | "Graves into Gardens" (mourning into dancing), Elevation Worship |
| 17 · Samuel and Saul | Handel, *Saul* | "Here I Am, Lord" ("I have heard you calling in the night"), Dan Schutte |
| 18 · David, the Shepherd King | Bach, "Sheep May Safely Graze", Schubert's Psalm 23 | "Who You Say I Am", Hillsong Worship |
| 19 · David's Sin and Repentance | Allegri, *Miserere* (Psalm 51 itself) | "Lord, I Need You", Matt Maher |
| 20 · The Psalms | Gregorian psalm chant, Mendelssohn, "Hear My Prayer" | "The Lord's My Shepherd", Stuart Townend |
| 21 · Solomon and the Temple | Handel, "Zadok the Priest" (set to 1 Kings 1:38–40), "The Arrival of the Queen of Sheba" | "How Great Is Our God", Chris Tomlin |
| 22 · Wisdom for Life | Palestrina, *Song of Songs* motets | "Song of Solomon", Martin Smith |
| 23 · The Kingdom Splits, and Elijah | Mendelssohn, *Elijah*, "Swing Low, Sweet Chariot" | "Still" (the still small voice), Hillsong Worship |
| 24 · Elisha | "Wade in the Water" (Naaman in the Jordan) | "Raise a Hallelujah", Bethel Music |
| 25 · Prophets to the North | Carissimi, *Jonah* | "Hosea (Come Back to Me)", Weston Priory |
| 26 · Tobit | "Ye Holy Angels Bright" | "On Eagle's Wings" ("he will give his angels charge over you"), Michael Joncas |
| 27 · Isaiah and Hezekiah | "Lo, How a Rose E'er Blooming" (Isaiah 11:1), chant *Rorate caeli*, *Messiah* ("For unto us a child is born") | "Here I Am to Worship" ("Light of the world"), Tim Hughes |
| 28 · The Last Kings of Judah | Chant *Dies irae* (its words come from Zephaniah 1:15) | "Even If", MercyMe |
| 29 · Jeremiah and the Fall of Jerusalem | Tallis, *Lamentations of Jeremiah* | "The Steadfast Love of the Lord" (Lamentations 3:22–23), Edith McNeill |
| 30 · Comfort in Exile | Verdi, "Va, pensiero" (exiles by the rivers of Babylon), *Messiah* ("Comfort ye", "Every valley") | "Come Alive (Dry Bones)", Lauren Daigle |
| 31 · Daniel | Handel, *Belshazzar*, "Didn't My Lord Deliver Daniel" | "Cornerstone" (the stone of Daniel 2), Hillsong Worship |
| 32 · Rebuilding the Temple | *Messiah*, "Rejoice greatly" (Zechariah 9:9) | "Firm Foundation (He Won't)", Cody Carnes |
| 33 · Esther | Handel, *Esther* | "Same God", Elevation Worship |
| 34 · Ezra and Nehemiah | *Messiah*, "But who may abide" and "And he shall purify" (Malachi 3) | "Joy of the Lord" (Nehemiah 8:10), Rend Collective |
| 35 · Judith | Vivaldi, *Juditha triumphans* | "Champion", Bethel Music |
| 36 · The Maccabean Revolt | Handel, *Judas Maccabaeus* ("See, the conqu'ring hero comes") | "Battle Belongs", Phil Wickham |
| 37 · Wisdom in the Late Age | Hildegard of Bingen, *O virtus Sapientiae* | "Restless", Audrey Assad |
| 38 · The Annunciation and the Nativity | Bach, *Magnificat* and *Christmas Oratorio*, "Silent Night" | "Mary, Did You Know?", Pentatonix |
| 39 · The Baptism and the First Disciples | *Messiah*, "Behold the Lamb of God" (John 1:29), Bach, "Jesu, Joy of Man's Desiring" | "Behold the Lamb of God", Andrew Peterson |
| 40 · The Sermon on the Mount | Chant *Pater noster*, Rachmaninoff, *The Beatitudes* | "The Lord's Prayer", Hillsong Worship |
| 41 · Signs and Wonders | "Amazing Grace" ("was blind, but now I see") | "Way Maker", Leeland |
| 42 · The Parables | "Softly and Tenderly Jesus Is Calling", "The King of Love My Shepherd Is" | "Reckless Love" (the ninety-nine), Cory Asbury |
| 43 · Bread from Heaven | Franck, *Panis angelicus*, chant *Adoro te devote* | "I Am the Bread of Life", Suzanne Toolan; "Oceans", Hillsong United |
| 44 · The Road to Jerusalem | *Messiah*, "He shall feed his flock" | "Good Good Father", Chris Tomlin |
| 45 · Holy Week | Chants *Pueri Hebraeorum* (Palm Sunday) and *Ubi caritas* (Holy Thursday) | "Hosanna", Hillsong United; "Remembrance (Communion Song)", Matt Maher |
| 46 · The Passion | Bach, *St Matthew Passion*, Pergolesi, *Stabat Mater*, Haydn, *The Seven Last Words* | "Man of Sorrows", Hillsong Worship |
| 47 · He Is Risen | Chant *Victimae paschali laudes*, "Jesus Christ Is Risen Today" | "Christ Is Risen", Matt Maher; "What a Beautiful Name", Hillsong Worship |
| 48 · Pentecost | Chants *Veni Creator Spiritus* and *Veni Sancte Spiritus* | "Holy Spirit", Francesca Battistelli |
| 49 · The Gospel Spreads | Mendelssohn, *St. Paul* ("Saul, Saul, why persecutest thou me?") | "Amazing Grace (My Chains Are Gone)", Chris Tomlin |
| 50 · Paul's Journeys, Part 1 | Brahms, *Four Serious Songs* No. 4 (1 Corinthians 13) | "No Longer Slaves" (Galatians 4:7), Bethel Music |
| 51 · Paul's Journeys, Part 2 | Mozart, *Laudate Dominum* (Psalm 117, quoted in Romans 15:11) | "Christ Is Enough", Hillsong Worship |
| 52 · Letters to the Whole Church | Bruckner, *Ecce sacerdos magnus* ("Behold, a great high priest"), *Ubi caritas* ("where love is, God is there") | "Before the Throne of God Above", Shane & Shane |
| 53 · Revelation | *Messiah*, "Hallelujah" and "Worthy is the Lamb", chant *In paradisum*, the *Te Deum* | "Revelation Song", Kari Jobe; "King of Kings", Hillsong Worship |

## 12. Bible text and licensing

### 12.1 Quotes and retellings

- The retold story text is original writing, so it isn't affected by translation licenses.
- Quoted verses live in one file, with a text per translation. The active translation is one setting.
- An automatic test counts the total number of quoted verses, so the total can be matched to whatever permission allows.

### 12.2 RSV-2CE permission

- The licensing page of the RSV's copyright holder ([Friendship Press](https://friendshippress.org/bible-licensing)) says it cannot grant permissions for the RSV-2CE and refers requests to **Ignatius Press**.
- The same page says its free-quotation allowance for other RSV editions (up to 500 verses) does not apply to apps and other new media, which require permission or a license.
- **Plan:**
  - Develop with the RSV-2CE while the game is private.
  - Ask Ignatius Press for written permission before the public launch (a draft request is prepared).
  - If permission hasn't arrived by launch, the public version quotes the public-domain **Douay-Rheims** and switches when permission comes.

### 12.3 Rules for free music and sound

- Allowed licenses: **public domain, CC0 and CC BY**.
- Not allowed:
  - *NonCommercial* licenses, to keep future options open
  - *NoDerivatives* licenses, because looping and trimming may count as changes
  - *ShareAlike* licenses, because Creative Commons 4.0 treats music synced to moving images as an adaptation, which could pull the game itself under ShareAlike
- Each track records its title, composer, performer, license, source link and credit line. A test refuses any track without an allowed license and a credit.

### 12.4 Copyrighted worship songs

- The game never includes copyrighted recordings. Distributing them without a license from their publishers would be infringement, and licenses for games are expensive and rarely granted to small projects.
- In-game streaming isn't possible:
  - The [Spotify Developer Policy](https://developer.spotify.com/policy/) says "Do not create a game, including trivia quizzes" and "Do not synchronize any sound recordings with any visual media."
  - The [YouTube API Services Developer Policies](https://developers.google.com/youtube/terms/developer-policies) forbid separating a video's audio from its video and playing content "from a background player."
- So worship mode only plays the player's own files, which stay on their device, or opens songs and playlists in the player's own music app (section 11.4).

## 13. Architecture

### 13.1 Tools

- **React 19, TypeScript, Vite, Vitest and oxlint**, the same as Dave's portfolio.
- **Zustand** for game state such as the current save and settings. It's a tiny store that's easy to read.
- **IndexedDB**, the browser's built-in database, for saves and worship-music files.
- **Web Audio** for music crossfades, cues, ducking and sound.
- **A small tag reader**, such as `music-metadata`, to read title and artist from music files.
- **Playwright with headless Edge** for screenshot and performance tests.
- **Vercel** for hosting.

### 13.2 Folder layout

```
bible-game/
  docs/                    design spec, plans, level scripts, code tour
  src/
    app/                   app shell, screen changes, providers
    engine/
      clock.ts             the one master clock (screen refresh rate, real elapsed time, pause)
      motion.ts            easing curves, springs, timelines
      input.ts             touch, mouse and keyboard turned into the same game actions
      random.ts            seeded random numbers (quiz, minigames, repeatable tests)
      audio/               music player (crossfades, ducking, cues), sound effects
      save/                save files, checkpoints, backups, version upgrades, export/import
    content/
      types.ts             the exact shape of a level, episode, scene, question
      bible/verses.ts      every quoted verse in one place, per translation
      bible/books.ts       the 73 books and their chapters
      threads.ts           every golden thread (Old Testament ↔ New)
      geography.ts         places, map coordinates, routes
      levels/01-creation-and-fall/
        level.ts           episodes, scenes, threads, where and when, reflection
        narration.ts       the retold story text (our own words)
        quiz.ts            the question bank (40+)
        music.ts           free playlist + worship recommendations
    scene/
      types.ts             style-free scene description: layers, props, actors, camera
      director.ts          plays a scene: narration, movement, camera, light, music cues
    styles/
      types.ts             the contract every style must fulfil
      paper-glass/         SVG props, puppet rigs, UI theme, glass cathedral, paper map
      pixel/               sprites and animations, props, UI theme, pixel cathedral, world map
    minigames/
      framework.ts         shared start / update / checkpoint / finish
      flight/  herding/  building/  …   each kind of play: rules + paper view + pixel view
    music/                 free-track catalog, worship library, matcher, listen-along links
    quiz/                  question picking, weighting, scoring
    screens/               Title, Menu, Story, Minigame, Quiz, Reflection, Journal,
                           Cathedral, Map, Settings, Music Library, Credits
  tests/                   content checks, engine tests, screenshot and performance tests
```

### 13.3 Content is data, written once

A scene is a plain description that both styles draw. Positions run from 0 to 1 across the screen, so both styles place things identically:

```ts
{
  id: 'l2-e4-s3',
  backdrop: { sky: 'evening', layers: ['ararat-far', 'flood-water'] },
  actors: [
    { prop: 'ark', at: [0.42, 0.62], pose: 'resting' },
    { prop: 'dove', path: 'toArkWindow', carrying: 'oliveLeaf' },
  ],
  camera: { from: 'wide', to: 'ark-window', seconds: 2.5, ease: 'gentle' },
  narration: ['l2e4.s3.n1', 'l2e4.s3.n2'],  // our retelling, stored in narration.ts
  verse: 'GEN 8:11',                         // looked up in verses.ts
}
```

**Other content records:**

- **Golden thread:** id, the episode where it's found, its Old Testament reference, its New Testament reference(s), a short explanation, and its source (Scripture, Catechism paragraph or Church Father).
- **Where and when:** place ids from `geography.ts`, a date with a certainty note, and background notes.
- **Quiz question:** see section 13.9.
- **Journal entry and "I've read it" mark:** stored in the save, linked to their level or episode.

### 13.4 The style contract

- **What each style provides:** backdrops, props, characters (puppet rigs in Paper & Glass, sprite sets in Pixel, with the same named poses), a UI theme, the cathedral and the map.
- **Kept in step automatically:** if any scene uses a prop, character or pose, **both styles must provide it**. An automatic test fails otherwise.

### 13.5 Drawing

- **Paper & Glass:**
  - Each prop and layer is an SVG component.
  - When a scene loads, every layer is rendered to a sharp image at the screen's resolution, with grain and shadows baked in.
  - Layers are stacked and moved by the graphics card.
  - Puppets are made of small part images that rotate at their joints.
- **Pixel:** a 320×180 canvas holds the scene, drawn by sprite and prop drawers, then enlarged by a whole number with the sub-pixel camera (section 10, rule 7).
- **The cathedral:** windows are built from real glass pieces and lead lines, as in the mockup, then cached as images per state (unlit, lit, newly set). Light and shimmer are layered on top.
- **Menus, text and buttons** are normal web page elements: sharp, accessible and readable by screen readers.

### 13.6 The director

- A scene's timeline holds narration beats, character actions (move, pose, gesture), camera moves, light changes, music cues and sounds, each with its own timing and easing.
- Between beats it waits for the player, and the scene keeps breathing while it waits.
- It reports a checkpoint at every scene boundary, which the save system writes.
- It knows nothing about styles. Switching style swaps the renderer at the same moment, which produces the crossfade.

### 13.7 Minigames

- **How each kind is built:**
  - Its **rules** are written in plain TypeScript: start with settings and a seed, update with input and time, report when finished and how it went.
  - Each style has a **view** that only draws what the rules say.
- **Fixed-step rules.** They advance in fixed steps of 120 per second, and drawing blends smoothly between steps. Games behave identically on 60 Hz and 120 Hz screens.
- **Gentle mode** is just different settings: slower speed and more tolerance.
- **Testable.** A test plays the rules with scripted inputs, without a screen, and checks the result.
- **The starting library of about 20 kinds of play, built as levels need them:**
  1. Flight: the dove, the ravens
  2. Herding and gathering: Abel's flock, animals two by two, manna, gleaning
  3. Building and stacking: the ark, altars, the tabernacle, the Temple, Nehemiah's walls, Babel
  4. Aiming: David's sling, Jonathan's arrows
  5. Rhythm: Jericho's march, psalms on the lyre, Miriam's song
  6. Pathfinding: the wilderness, the Red Sea crossing
  7. Steering: the ark in the storm, Jonah's ship, Paul's shipwreck
  8. Searching: the lost coin, Joseph's cup
  9. Ordering: the days of creation, the plagues, genealogies
  10. Matching and naming: naming the animals, the twelve tribes, the apostles
  11. Light and reveal: the burning bush, the pillar of fire, the lamps
  12. Pouring and water: water from the rock, Cana, Elijah's drenched altar
  13. Catching: the miraculous catch of fish
  14. Memory: the Ten Commandments, the Beatitudes, the Our Father
  15. Courier routes: Abraham's journeys, Paul's letters
  16. Timing: Gideon's trumpets and torches, Nehemiah's guards
  17. Stealth and escape: the spies with Rahab, Paul in the basket, Peter freed
  18. Decoding: dreams, the writing on the wall
  19. Serving and distributing: the loaves and fish, the Passover meal
  20. Quiet interactions: walking toward God's voice, lights in the dark, spot the twist
- **Level 1 uses:**
  - Ordering, in the family tree
  - Matching and naming, in naming the animals and spot the twist
  - Herding, in Abel's flock
  - Quiet interactions, in "Let there be…" and lights in the dark

### 13.8 Saves

- **Save record:** version, name, created and last-played dates, time played, art style, position (level, episode, scene, minigame checkpoint), completed episodes and levels, golden threads found, quiz history (best score per level, past runs with their seeds, how often each question was missed), journal entries and read marks.
- **Writing.** Saves are written to IndexedDB at every checkpoint (journal typing is debounced). The previous save is kept as a backup, and a checksum detects damage.
- **Upgrades.** A list of version upgrade steps brings older saves up to date.
- **Export and import.** Export downloads the save as a file with its checksum. Import checks the file, upgrades it if needed, and loads it into a chosen slot.
- **Device settings.** Volumes, text size and the other comfort settings, plus the worship-music library, are stored per device.

### 13.9 Quiz engine

- **Each question holds:** an id, a type, the question, the answers, an explanation, the Bible reference, the episode it comes from and a difficulty.
- **How questions are picked:**
  - at random, without repeats within a run
  - missed questions weigh more, and ones seen recently weigh less
  - questions are spread across the level's episodes
  - no more than three of one question type per run
- **Repeatable runs.** Each run stores its random seed, so "Review your answers" shows exactly that run.
- **Everything so far** draws evenly from all finished levels.

### 13.10 Music system

- **Free-track catalog:** each track carries its file, title, composer, performer, license, source link and credit line (section 12.3).
- **Player:** two audio channels crossfade into each other. Playlists follow the context (story, minigame, reflection, quiz, cathedral or map). Cue points pin a moment in the music to a story beat, and music ducks under the read-aloud voice.
- **Worship library:** the player's files (stored as blobs in IndexedDB), the title and artist read from their tags, the matcher, level assignments, and listen-along links and playlist links.
- **Matcher:** normalizes titles and artists (case, punctuation, "(Live)", "feat.", track numbers), compares them with a fuzzy similarity score, auto-accepts above a threshold and asks about borderline matches.

### 13.11 Hosting the music

About 200 free recordings is far too much to download up front. They're compressed to the Opus format and fetched one level at a time from a separate file host, such as Cloudflare R2's free tier, then kept in the browser's cache. The host is chosen with Dave at milestone M3.

## 14. Quality gates

- **Content checks:**
  - every prop, character and pose exists in both styles
  - every verse reference exists in `verses.ts`
  - every golden thread links real episodes and references
  - every level has at least 40 quiz questions, covering all its episodes
  - every free track has an allowed license and a credit
  - the total of quoted verses is reported
- **Engine tests:** clock, easing, save upgrades and checksums, quiz picking, minigame rules and the music matcher.
- **Screenshots:** every scene in both styles, at laptop and phone sizes, compared against the last approved images to catch accidental changes. This is like the portfolio's `shots` script, using headless Edge.
- **Performance:** each scene plays for 10 seconds in headless Edge with the processor slowed to phone speed. The test fails if the game's own work goes over its frame budget or frames drop.
- **Accessibility:** automated checks on every screen, plus a keyboard-only run.
- **Code:** typecheck and lint on every change.

## 15. How each level is made

1. **Script.** The full level script is written: scenes, narration, quoted verses, minigames, golden threads, where and when, the quiz bank, reflection and prayer, and both music playlists. **Dave approves it.** Having a priest or catechist read the scripts is recommended.
2. **Art.** Any new props and characters are built in both styles.
3. **Build.** The scenes, minigames, quiz and music are assembled.
4. **Checks.** The quality gates in section 14 run.
5. **Play-test.** Dave plays the level, what's found is fixed, and the level ships.

## 16. Scope and roadmap

### 16.1 The first build: foundations plus Level 1

Seven milestones. Each ends with something Dave can open and play-test.

**M1 · Skeleton**

- App shell, master clock, motion (easing and springs), and input for touch, mouse and keyboard.
- Save files with checkpoints, backups, version upgrades, and export and import.
- Settings: art style, text size, high contrast, readable font, reduced motion, gentle mode, auto-advance and read-aloud.
- The style system, the performance test kit and the screenshot test kit.
- *Playable:* one demo scene, with the camera gliding through its layers and the style switching live in the middle of it.

**M2 · Story player and Episode 1**

- The director, the narration panel with its history, *Where and when* cards, golden-thread discovery and "I've read it" marks.
- **Episode 1, *In the Beginning*,** complete in both styles, with its *"Let there be…"* moment.

**M3 · Music and sound**

- The music engine with crossfades, cues and ducking.
- Level 1's free playlist, plus the menu and cathedral music, sourced with licenses checked, and the Credits screen.
- The full worship-songs system: folder import, automatic matching, the coverage checklist, listen-along links and the recommendations for all 53 levels.
- Sound effects for both styles.

**M4 · The rest of Level 1**

- Episodes 2–6 in both styles, with their moments: naming the animals, spot the twist, lights in the dark, Abel's flock and the family tree.

**M5 · Quiz, reflection and journal**

- The quiz engine with all seven question types, random weighted picking, stars and best scores, and review.
- Level 1's bank of at least 40 questions.
- **Quiz** on the main menu, including *Everything so far*.
- The reflection and prayer screen, and the journal.

**M6 · Cathedral and world map**

- Both views in both styles.
- The nave with the Age I bay and Level 1's window: 6 medallions and the panel-setting animation.
- Golden threads reaching toward windows that are still dark.
- The full map of the Bible lands, with Eden's region and the start of the route.

**M7 · Polish and release**

- An accessibility pass, a performance pass on a slowed "phone" processor, and approved screenshot baselines.
- Deployment to Vercel.
- `docs/code-tour.md`, a guide to the code for a React learner, like the portfolio's.

### 16.2 The Level 1 checkpoint

After M7, Dave looks at what it really cost to make Level 1 in two styles. If it's sustainable, both styles continue. If not, one becomes the main style.

### 16.3 After Level 1

- **Age by Age, in Bible order.** Level 2 (Noah) completes Age I, then Age II (Levels 3–6), and so on.
- **Every level follows section 15.**
- **New kinds of play** join the library as levels need them. Each later level reuses what came before, so levels get faster to make over time.
- **Ideas for later, not planned yet:**
  - offline install on the home screen
  - a Bahasa Indonesia version
  - recorded voice narration
  - 8-bit arrangements of the music
  - gamepad support
  - a Douay-Rheims chapter reader

### 16.4 What Dave provides, and when

| What | When |
|---|---|
| Approval of each level's script | before each level is built |
| A free file-hosting account for the music recordings, such as Cloudflare R2 | M3 |
| A Vercel project on Dave's account | M7 |
| Ignatius Press permission for RSV-2CE quotes (a draft request is prepared) | before the public launch |
| The final name of the game | any time |
| Optionally, a priest or catechist to read the scripts | from the first script |

### 16.5 Risks

| Risk | How it's handled |
|---|---|
| The full game is huge: 53 levels, about 40 hours | Release Age by Age. Reusable props and kinds of play. Each script is approved before it's built. |
| Two styles double the art | The Level 1 checkpoint measures the real cost before committing further (16.2). |
| RSV-2CE permission | The translation is one setting, with Douay-Rheims as the fallback (12.2). |
| Some pieces have no free recording | Another fitting piece is swapped in, and Dave is told. |
| Stutter on phones | Performance tests run on a slowed processor from M1 on, and frame budgets are enforced. |
| Theological mistakes | Dave reviews every script, optionally with a priest or catechist. Golden threads cite where the Church draws each connection. |
| The browser clears stored data | The game asks for permanent storage, keeps backups, and reminds the player to export a save now and then. |
| Copyright | No copyrighted recordings ship. Worship mode only uses the player's own files and links. Every free track is license-checked. |

## 17. To verify during the build

- **M3:** free recordings and their licenses for every Level 1 piece and for the menu and cathedral music.
- **M3:** folder selection on iPhone and iPad browsers. If unsupported, multi-file selection is used.
- **M1–M2:** read-aloud voice quality on the devices Dave uses.
- **Before the public launch:** Ignatius Press's answer on RSV-2CE.

## 18. References

- **Mockups from the design stage** (stored locally, outside git):
  - `art-style.html`: the first four style samples
  - `compare.html`: Paper & Glass plus the cathedral, against Pixel, across the story, a minigame and the map
- [Friendship Press: Bible licensing](https://friendshippress.org/bible-licensing)
- [Spotify Developer Policy](https://developer.spotify.com/policy/)
- [YouTube API Services Developer Policies](https://developers.google.com/youtube/terms/developer-policies)
