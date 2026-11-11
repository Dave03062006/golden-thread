import { WINDOW, medallionCentres } from '../../../cathedral/layout'
import type { CathedralWindow, PanelState } from '../../../cathedral/model'
import { createRng } from '../../../engine/random'
import { PixelBuffer } from '../buffer'
import { C } from '../palette'

/**
 * The cathedral's glass in pixel art (spec §9.2): each window a pixel lancet of glass
 * pieces with one-pixel lead lines between them, and its medallions with pixel emblems.
 * Windows are drawn a third of the nave's size, one art pixel to three nave units.
 */

export const PX = 3
export const PW = Math.round(WINDOW.w / PX)
export const PH = Math.round(WINDOW.h / PX)
/** A medallion's ring and disc radius, in art pixels. */
const RING = 8
const DISC = 6

/** Each lit color, and the dull one it has when its panel is dark. */
const UNLIT: Record<string, string> = {
  [C.navy]: C.ink,
  [C.blue]: C.dslate,
  [C.sky]: C.dslate,
  [C.rose]: C.purple,
  [C.gold]: C.wood2,
  [C.white]: C.slate,
  [C.green]: C.teal,
  [C.lime]: C.teal,
  [C.orange]: C.wood2,
  [C.wood2]: C.wood1,
  [C.wood3]: C.wood2,
  [C.pale]: C.slate,
  [C.purple]: C.ink,
  [C.teal]: C.dslate,
}
const dull = (color: string) => UNLIT[color] ?? C.dslate

/**
 * Each episode's emblem as a 9 × 9 pixel picture; a letter is a color, '.' shows the
 * medallion's background.
 */
export const EMBLEMS: Record<string, { rows: string[]; colors: Record<string, string> }> = {
  creation: { rows: ['....o....', '.o..o..o.', '..oyyyo..', '..yWWWy..', 'ooyWWWyoo', '..yWWWy..', '..oyyyo..', '.o..o..o.', '....o....'], colors: { o: C.orange, y: C.gold, W: C.white } },
  garden: { rows: ['...ggg...', '..gGGGg..', '.gGGGGGg.', '..gGGGg..', '....b....', '....b....', 'sssssssss', '.s.....s.', 's.......s'], colors: { g: C.green, G: C.lime, b: C.wood2, s: C.sky } },
  fruit: { rows: ['...ggg...', '..ggggg..', '.gggggrr.', '.ggggg.rr', '..ggggg..', '....b....', '.vv.b....', 'v..vb....', '.vv.b....'], colors: { g: C.teal, r: C.rose, b: C.wood2, v: C.lime } },
  promise: { rows: ['....W....', '....W....', '...WyW...', '.WWyyyWW.', 'WWyyWyyWW', '.WWyyyWW.', '...WyW...', '....W....', '....W....'], colors: { W: C.white, y: C.gold } },
  lamb: { rows: ['.........', '..WWWWWw.', '.WWWWWWWw', '.WWWWWWW.', '..k...k..', 'sssssssss', 'sSsSsSsSs', 'sssssssss', '.........'], colors: { W: C.white, w: C.pale, k: C.ink, s: C.slate, S: C.pale } },
  'family-tree': { rows: ['y...b...y', '.b..b..b.', '..b.b.b..', 'y..bbb..y', '.b..b..b.', '..b.b.b..', '...bbb...', '....b....', '...bbb...'], colors: { b: C.wood2, y: C.gold } },
  // Level 2 · Noah and the Nations
  walk: { rows: ['....y....', '...yWy...', '....y....', '....s....', '...sss...', '...sSs...', '..ssSss..', '.sssSsss.', 'sssSSssss'], colors: { y: C.gold, W: C.white, s: C.sand2, S: C.sand } },
  ark: { rows: ['.........', '....r....', '..rrrrr..', '..wwyww..', 'bbbbbbbbb', '.bbbbbbb.', '..bbbbb..', 'sssssssss', 'sSsSsSsSs'], colors: { r: C.wood1, w: C.wood3, y: C.gold, b: C.wood2, s: C.blue, S: C.sky } },
  storm: { rows: ['.ggg.ggg.', 'ggggggggg', '.ggggggg.', '.c.c.c.c.', 'c.c.c.c..', '.........', 's...s...s', 'sSssSssSs', 'sssssssss'], colors: { g: C.slate, c: C.cyan, s: C.navy, S: C.blue } },
  'olive-dove': { rows: ['.........', '..w......', '..ww.....', '...ww..o.', '.wwwwwwol', 'wwwwwww.l', '..www....', '.........', '.........'], colors: { w: C.white, o: C.orange, l: C.lime } },
  rainbow: { rows: ['..rrrrr..', '.roooooo.', 'roYYYYYor', 'oYgggggYo', 'Ygb...bgY', 'gb.....bg', 'b.......b', 'GGG.GGGGG', 'GGGGGGGGG'], colors: { r: C.rose, o: C.orange, Y: C.gold, g: C.green, b: C.blue, G: C.teal } },
  tower: { rows: ['....y....', '...yyy...', '...ooo...', '..ooooo..', '..wwwww..', '.wwwwwww.', '.kkkkkkk.', 'kkkkkkkkk', 'kkkkkkkkk'], colors: { y: C.gold, o: C.sand, w: C.wood3, k: C.wood2 } },
  star: { rows: ['....W....', '...WYW...', '..WYWYW..', '...WYW...', '....W....', '.........', '...ttt...', '..ttTtt..', '.ttTTTtt.'], colors: { W: C.white, Y: C.gold, t: C.sand2, T: C.wood1 } },
  // Level 3 · Abraham, Father of Faith
  call: { rows: ['......yy.', '.b...yyy.', '.bb...yy.', '.b.......', '.b..gg.gg', 'gbggssggg', 'gbgsssggg', 'ggsssssgg', 'gssssssgg'], colors: { y: C.gold, b: C.wood1, g: C.green, s: C.sand } },
  'altar-hill': { rows: ['....o....', '...ooo...', '...oyo...', '..WWWWW..', '..PPPPP..', '..WWWWW..', '.ggggggg.', 'ggggggggg', 'ggggggggg'], colors: { o: C.orange, y: C.gold, W: C.pale, P: C.slate, g: C.green } },
  'bread-wine': { rows: ['......yyy', '......rrr', '......yry', '.ttt...y.', 'tTTTt..y.', 'tTTTt..y.', '.ttt...y.', '......yyy', '.........'], colors: { y: C.gold, r: C.rose, t: C.wood2, T: C.wood3 } },
  stars: { rows: ['nnnnnnnnn', 'nYnnnnnYn', 'nnnnWnnnn', 'nnnWYWnnn', 'nYnnWnnnn', 'nnnnnnnYn', 'nnYnnnnnn', 'nnnnnYnnn', 'nnnnnnnnn'], colors: { n: C.navy, Y: C.gold, W: C.white } },
  well: { rows: ['......gg.', '.....g.b.', '.......b.', '..ppppp..', '..pbbbp..', '..ppppp..', '..ppppp..', 'sssssssss', 'sssssssss'], colors: { g: C.green, b: C.blue, p: C.pale, s: C.sand } },
  'new-name': { rows: ['.........', '.yyyyyyy.', '.yyyyyyy.', '......yy.', '.yy.W.yy.', '.yy...yy.', '.yy...yy.', '.yy...yy.', '.........'], colors: { y: C.gold, W: C.white } },
  visitors: { rows: ['..ggggg..', '.ggggggg.', '..ggggg..', '.W..W..W.', '.W..W..W.', 'WWWWWWWWW', '.W..W..W.', '.W..W..W.', '.W..W..W.'], colors: { g: C.green, W: C.white } },
  pleading: { rows: ['....y....', 'a.a...a.a', 'aaa...aaa', '.aa...aa.', '.aa...aa.', '..a...a..', '..a...a..', '..a...a..', '..a...a..'], colors: { y: C.gold, a: C.sand } },
  laughter: { rows: ['.......y.', '......yyy', '.......y.', '..ss.....', '.sssWWWW.', 'bbbbbbbbb', '.bbbbbbb.', '..bbbbb..', '.b.....b.'], colors: { y: C.gold, s: C.sand, W: C.white, b: C.wood2 } },
  ram: { rows: ['.........', 'hh.hh....', 'h.WWh....', '.WWWWWWW.', '.kWWWWWWW', '..WWWWWW.', 'g.W.g.W.g', 'gggggggGg', 'GgGgggGgg'], colors: { h: C.sand2, W: C.white, k: C.ink, g: C.green, G: C.teal } },
  // Level 4 · Isaac and Jacob
  jar: { rows: ['.........', '..ooo....', '.ooooo...', '.oooooO..', '..ooo.Oc.', '.......c.', '.......c.', 'ppppppppp', 'pcccccccp'], colors: { o: C.orange, O: C.wood2, c: C.sky, p: C.pale } },
  stew: { rows: ['..W.W.W..', '...W.W...', '..W.W.W..', '.........', 'rrrrrrrrr', 'bbbbbbbbb', '.bbbbbbb.', '..bbbbb..', '...BBB...'], colors: { W: C.white, r: C.rose, b: C.wood2, B: C.wood1 } },
  blessing: { rows: ['.......y.', 'aaaaa.yyy', '.aaaaa.y.', '...sss...', '..sssss..', '...sss...', '..ggggg..', '.ggggggg.', 'ggggggggg'], colors: { y: C.gold, a: C.sand, s: C.sand2, g: C.green } },
  ladder: { rows: ['...yWy...', '...y.y...', '...yyy...', '..y...y..', '..yyyyy..', '..y...y..', '.yyyyyyy.', '.y.....y.', 'yyyyyyyyy'], colors: { y: C.gold, W: C.white } },
  lion: { rows: ['.......y.', '......yyy', '.....mmmy', '.....mfmm', 'tbbbbmmm.', '.bbbbbbb.', '.b.b..b.b', 'ggggggggg', 'ggggggggg'], colors: { y: C.gold, m: C.wood2, f: C.gold, b: C.sand, t: C.sand2, g: C.green } },
  dawn: { rows: ['.........', '...o.o...', '.o.yyy.o.', '..yyyyy..', 'oyyWWWyyo', 'kkyyyyykk', 'kkkkkkkkk', 'sssssssss', 'kkkkkkkkk'], colors: { o: C.orange, y: C.gold, W: C.white, k: C.dslate, s: C.sky } },
  embrace: { rows: ['....y....', '..s...s..', '.sss.sss.', '..saaas..', '.gggarrr.', '.ggg.rrr.', '.ggg.rrr.', '.ggg.rrr.', 'gggg.rrrr'], colors: { y: C.gold, s: C.sand, a: C.sand2, g: C.green, r: C.rose } },
  // Level 5 · Joseph and His Brothers
  silver: { rows: ['.W.......', '.........', '.bb......', 'bbbb.....', 'bbbb.ww..', '.bb.wwww.', '...ww.ww.', '..wwww.ww', '...ww..ww'], colors: { W: C.white, b: C.wood2, w: C.pale } },
  'prison-window': { rows: ['.........', '..ykykyk.', '..ykykyk.', '..ykykyk.', '..ykykyk.', '.........', '..yy.....', '.yyyy....', 'yyyyyy...'], colors: { y: C.gold, k: C.dslate } },
  'grain-ears': { rows: ['....y....', '.y.yyy.y.', 'yyyyyyyyy', 'yyy.y.yyy', '.y..y..y.', '.b..b..b.', '.b..b..b.', '..b.b.b..', '...bbb...'], colors: { y: C.gold, b: C.wood3 } },
  'grain-sack': { rows: ['...yyy...', '..y.y.y..', '...ttt...', '..sssss..', '.sssssss.', '.sssssss.', 'sssssssss', 'sssssssss', '.sssssss.'], colors: { y: C.gold, t: C.wood2, s: C.sand } },
  'silver-cup': { rows: ['.......W.', 'wwwwwww..', '.wwwwww..', '..wwww...', '...ww....', '...ww....', '...ww....', '..wwww...', '.wwwwww..'], colors: { W: C.white, w: C.pale } },
  'open-arms': { rows: ['....y....', '....s....', 's..sss..s', '.s.www.s.', '..swwws..', '...www...', '...www...', '...www...', '..wwwww..'], colors: { y: C.gold, s: C.sand, w: C.white } },
  scepter: { rows: ['..y.y.y..', '..yyyyy..', '...yry...', '...yyy...', '....y....', '....y....', '....y....', '....y....', '...yyy...'], colors: { y: C.gold, r: C.rose } },
  // Level 6 · Job
  'open-hand': { rows: ['....y....', '.........', '.s.s.s.s.', '.s.s.s.s.', '.sssssss.', '.sssssss.', '.ssssssss', '..ssssss.', '..aaaaa..'], colors: { y: C.gold, s: C.sand, a: C.sand2 } },
  'seven-marks': { rows: ['.....ww..', '.W..w....', '....w....', '.....ww..', '.W.......', '.........', 'sssssssss', 'kskskskks', 'sssssssss'], colors: { w: C.white, W: C.pale, s: C.sand2, k: C.wood1 } },
  'refined-gold': { rows: ['.......W.', '..yyyyy..', '.yyyyyyy.', '.........', '...o.o...', '..ooooo..', '.oOoOoOo.', 'oOOOOOOOo', '.ooooooo.'], colors: { W: C.white, y: C.gold, o: C.orange, O: C.rose } },
  'carved-rock': { rows: ['..sssss..', '.sssssss.', 'syyyyyyss', 'sssssssss', 'syyyyysss', 'sssssssss', 'syyyyyyss', 'sssssssss', 'kkkkkkkkk'], colors: { s: C.slate, y: C.gold, k: C.dslate } },
  whirlwind: { rows: ['ppppppppp', '.PPPPPPP.', '.ppppppp.', 'y.PPWPP..', '..ppppp..', '...PPP...', '...ppp...', '....P....', '....p....'], colors: { p: C.pale, P: C.slate, W: C.gold, y: C.gold } },
  twofold: { rows: ['....y....', '.........', 'www..www.', 'wwwkwwwwk', 'wwwwwwwww', 'wwww.wwww', '.k.k..k.k', '.k.k..k.k', 'ggggggggg'], colors: { y: C.gold, w: C.white, k: C.ink, g: C.green } },
  // Level 7 · Moses Is Called
  'window-lamp': { rows: ['....s....', '...sss...', '..sssss..', '.sskkkss.', '.sskykss.', '.sskrkss.', '.sskkkss.', '.sssssss.', '.sssssss.'], colors: { s: C.sand2, k: C.dslate, y: C.gold, r: C.orange } },
  'reed-basket': { rows: ['g...y...g', 'g.......g', '.g.....g.', '.g.....g.', '..ttttt..', '.bbbbbbb.', '..bbbbb..', 'wwwwwwwww', 'wwwwwwwww'], colors: { g: C.green, y: C.gold, t: C.sand, b: C.wood3, w: C.blue } },
  'water-trough': { rows: ['..y......', '.........', '......ww.', '.....wwwk', '.....wwww', 'bbbbbwww.', 'bsssb.k.k', 'bbbbb.k.k', '.........'], colors: { y: C.gold, w: C.white, k: C.ink, b: C.wood2, s: C.sky } },
  'burning-bush': { rows: ['....o....', '...ooo...', '.o.oyo.o.', '.ooyyyoo.', 'ooyyyyyoo', '.ogygygo.', '..ggggg..', '.........', 'sssssssss'], colors: { o: C.orange, y: C.gold, g: C.green, s: C.sand2 } },
  'rod-serpent': { rows: ['ww.....gg', '.w....g..', '.w...g...', '..w...g..', '..w....g.', '..w...g..', '...w.g...', '...w..g..', '...w...g.'], colors: { w: C.wood3, g: C.green } },
  // Level 8 · The Plagues and the Passover
  'i-will': { rows: ['..y.y.y..', '.y.....y.', 'y........', '......ss.', '.....ss..', '....ss...', '...ss....', 'bbss.....', 'bbs......'], colors: { y: C.gold, s: C.sand, b: C.blue } },
  stubble: { rows: ['...y.....', '.........', '.s.......', '.s.s.s...', 'ss.s.s...', 'sSsSsSbbb', 'sSsSsSbbb', 'sSsSsSbbb', 'wwwwwwwww'], colors: { y: C.gold, s: C.sand, S: C.sand2, b: C.wood2, w: C.wood3 } },
  frog: { rows: ['.........', '..ll.ll..', '..lkllk..', '.ggggggg.', 'ggggggggg', 'ggggggggg', 'g.g...g.g', '.........', 'bbbbbbbbb'], colors: { l: C.lime, k: C.ink, g: C.green, b: C.blue } },
  'marked-door': { rows: ['sssssssss', 'srrrrrrrs', 'ssskkksss', 'srkkkkkrs', 'srkkkkkrs', 'srkkykkrs', 'srkkkkkrs', 'srkkkkkrs', 'srkkkkkrs'], colors: { s: C.sand2, r: C.rose, k: C.navy, y: C.gold } },
  'pillar-of-fire': { rows: ['....o....', '...ooo...', '...oyo...', '..oyyyo..', '..oyyyo..', '..oyyyo..', '..oyyyo..', '.ooyyyoo.', 'sssssssss'], colors: { o: C.orange, y: C.gold, s: C.sand2 } },
  'unleavened-bread': { rows: ['....y....', '.........', '..sssss..', '.sSsssSs.', 'sssSssssS', 'sSsssSsss', '.ssSsssS.', '..sssss..', '.........'], colors: { y: C.gold, s: C.sand, S: C.wood2 } },
  // Level 9 · Through the Sea
  'stand-firm': { rows: ['....y....', '...yyy...', '....w....', '....w....', '....w....', '....w....', 'b.b.w.b.b', 'bbbbwbbbb', 'nnnnnnnnn'], colors: { y: C.gold, w: C.wood3, b: C.sky, n: C.blue } },
  'parted-sea': { rows: ['nn..y..nn', 'nwn...nwn', 'nnn...nnn', 'nnns.snnn', 'nnns.snnn', 'nnnsssnnn', 'nnnsssnnn', 'nnsssssnn', 'nnsssssnn'], colors: { y: C.gold, w: C.white, n: C.blue, s: C.sand } },
  timbrel: { rows: ['...g.g...', '..wwwww..', '.gwwwwwg.', '.wwwywww.', '.gwwwwwg.', '..wwwww..', '...g.g...', '.........', '.........'], colors: { g: C.gold, w: C.sand, y: C.orange } },
  'manna-jar': { rows: ['w.......w', '...www...', '..wwwww..', '...ddd...', '..bbbbb..', '.bbbbbbb.', '.bbbbbbb.', '..bbbbb..', '..bbbbb..'], colors: { w: C.white, d: C.wood1, b: C.wood2 } },
  'struck-rock': { rows: ['..rrrr...', '.rRRrrr..', 'rrRrrrrr.', 'rrrrsrrr.', 'rrrrssrrr', 'rrrrrsrrr', 'rrrrrssrr', 'rrrrrrsrr', '......sss'], colors: { r: C.wood2, R: C.rose, s: C.sky } },
  'raised-hands': { rows: ['k.......k', '.k.....k.', '..k.p.k..', '...kpk...', '....b....', '...obo...', '..ooboo..', '.bbbbbbb.', 'bbbbbbbbb'], colors: { k: C.sand, p: C.pale, b: C.wood2, o: C.orange } },
  'shared-load': { rows: ['....y....', '.........', '....h....', '.h..b..h.', '.g.hbh.r.', '.g.ghr.r.', '.g.ghr.r.', '.........', 'sssssssss'], colors: { y: C.gold, h: C.ink, b: C.wood3, g: C.green, r: C.rose, s: C.sand2 } },
  // Level 10 · Sinai
  'eagles-wings': { rows: ['.........', 'ww.....ww', '.wwwbwww.', '...bWb...', '....b....', '.........', '...rrr...', '..rrrrr..', '.rrrrrrr.'], colors: { w: C.wood1, b: C.wood0, W: C.white, r: C.wood2 } },
  'two-tablets': { rows: ['....y....', '.sss.sss.', 'sssssssss', 'skkssskks', 'sssssssss', 'skkssskks', 'sssssssss', 'skkssskks', 'sssssssss'], colors: { y: C.gold, s: C.pale, k: C.dslate } },
  'twelve-pillars': { rows: ['.........', 's.s.s.s.s', 's.s.s.s.s', 'sss.o.sss', 'sss.o.sss', 'ss.aaa.ss', 'ss.aaa.ss', 'sssaaasss', 'ggggggggg'], colors: { s: C.pale, o: C.orange, a: C.wood2, g: C.sand2 } },
  'broken-tablets': { rows: ['.ss....ss', 'sss...sss', '.s.....s.', '.........', 'ss..s.ss.', 'sss.ssss.', 'ssss.sss.', 'sssssssss', 'ggggggggg'], colors: { s: C.pale, g: C.wood2 } },
  'tent-of-meeting': { rows: ['......ww.', '.....wwww', '...t.wyyw', '..ttt.wyw', '.ttttt.y.', 'ttkkttty.', 'ttkkttty.', 'ttkkttty.', 'ggggggggg'], colors: { w: C.pale, y: C.gold, t: C.wood3, k: C.ink, g: C.sand2 } },
  'shining-face': { rows: ['y...y...y', '.y.www.y.', '..wsssw..', 'ywsssssw.', '..wsssw.y', '.y.www.y.', 'y..bbb..y', '..bbbbb..', '.bbbbbbb.'], colors: { y: C.gold, w: C.white, s: C.sand, b: C.wood3 } },
  // Level 11 · The Tabernacle and the Holy Life
  'tabernacle-plan': { rows: ['yyyyyyyyy', 'y.......y', 'y.yyyy..y', 'y.ywyy.ay', 'y.yyyy..y', 'y.......y', 'yyyyyy.yy', '.........', 'ggggggggg'], colors: { y: C.gold, w: C.white, a: C.wood3, g: C.sand2 } },
  'mercy-seat': { rows: ['.........', 'yy.....yy', '.yy...yy.', '..yy.yy..', 'wwwwwwwww', '.yyyyyyy.', '.yyyyyyy.', 'bbyyyyybb', '.........'], colors: { y: C.gold, w: C.white, b: C.wood3 } },
  'twelve-stones': { rows: ['.yyyyyyy.', '.y.....y.', '.yrrgggy.', '.ybbbsssy', '.ypppoooy', '.yttwwwy.', '.y.....y.', '.yyyyyyy.', '.........'], colors: { y: C.gold, r: C.rose, g: C.green, b: C.blue, s: C.sky, p: C.purple, o: C.orange, t: C.teal, w: C.white } },
  'altar-fire': { rows: ['....y....', '...yoy...', '..yooy...', '..orroo..', '.b.ror.b.', 'bbbbbbbbb', 'bkkkkkkkb', 'bbbbbbbbb', 'b.......b'], colors: { y: C.gold, o: C.orange, r: C.rose, b: C.wood3, k: C.wood1 } },
  'the-veil': { rows: ['ppbbbbbrr', 'ppbbbbbrr', 'ppbbybbrr', 'ppbyyybrr', 'ppbbybbrr', 'ppbbbbbrr', 'ppbbbbbrr', 'ppbbbbbrr', 'ggggggggg'], colors: { p: C.purple, b: C.blue, r: C.rose, y: C.gold, g: C.sand2 } },
  'first-sheaf': { rows: ['.y.y.y.y.', '.yyyyyyy.', '..sssss..', '...sss...', '..wwwww..', '...sss...', '..sssss..', '.sssssss.', 'ggggggggg'], colors: { y: C.gold, s: C.sand2, w: C.wood2, g: C.wood3 } },
  'edges-of-the-field': { rows: ['.........', 'y.......y', 'y..h....y', 'y..k....y', 'yy.k...yy', 'yy.ss.yyy', 'yy....yyy', 'yy....yyy', 'ggggggggg'], colors: { y: C.gold, h: C.ink, k: C.teal, s: C.sand2, g: C.wood2 } },
  // Level 12 · Forty Years in the Wilderness
  'priestly-blessing': { rows: ['y...y...y', '.y.....y.', '..yy.yy..', '..ww.ww..', '...www...', '...bbb...', '..bbbbb..', '..bbbbb..', '.bbbbbbb.'], colors: { y: C.gold, w: C.sand, b: C.blue } },
  'seventy-elders': { rows: ['....y....', '...yyy...', '.y..t..y.', 'yyy.t.yyy', '.s..t..s.', 'sss.t.sss', 'sss...sss', 'sss...sss', 'ggggggggg'], colors: { y: C.gold, t: C.wood3, s: C.sand2, g: C.wood2 } },
  'cluster-of-grapes': { rows: ['wwwwwwwww', '....g....', '..ppppp..', '..ppppp..', '...ppp...', '...ppp...', '....p....', '.........', '.........'], colors: { w: C.wood2, g: C.green, p: C.purple } },
  'rod-that-budded': { rows: ['....w....', '...wbw...', '....b..l.', '.l..b.ll.', 'll..b....', '....bw...', '...wb....', '....b....', 'ggggggggg'], colors: { w: C.white, b: C.wood2, l: C.lime, g: C.wood3 } },
  'water-from-the-rock': { rows: ['rrrrrrr..', 'rrrrrrrr.', 'rrrrcrrr.', 'rrrrcrr..', '....cc...', '.....cc..', '....cccc.', '...cccccc', 'gggcccggg'], colors: { r: C.wood2, c: C.sky, g: C.sand2 } },
  'bronze-serpent': { rows: ['..ooo....', '...wooo..', '....w..o.', '..oow....', '.o..w....', '..oow....', '....w....', '....w....', 'ggggwgggg'], colors: { o: C.orange, w: C.wood2, g: C.sand2 } },
  'balaams-donkey': { rows: ['y.......y', '.y.....y.', '..y...ss.', '..y..sss.', '..y...s..', 'ssssssss.', 'sssssss..', 's.s..s.s.', 'ggggggggg'], colors: { y: C.white, s: C.slate, g: C.sand2 } },
  'star-out-of-jacob': { rows: ['....w....', '....y....', '.wyyyyyw.', '...yyy...', '..yy.yy..', '.y.....y.', '....r....', '....r....', 'ggggrgggg'], colors: { w: C.white, y: C.gold, r: C.gold, g: C.navy } },
  // Level 13 · Moses' Last Words
  'remember-the-way': { rows: ['......ttt', '.....s...', '....s....', '...s.....', '..s......', '.s.......', 's........', 'p........', 'ggggggggg'], colors: { t: C.wood3, s: C.sand, p: C.rose, g: C.sand2 } },
  'shema': { rows: ['.wwwwwww.', '.w.....w.', '.w.kkk.w.', '.w.....w.', '.w.kkk.w.', '.w.....w.', '.w.kk..w.', '.w.....w.', '.wwwwwww.'], colors: { w: C.wood2, k: C.gold } },
  'hands-on-joshua': { rows: ['....y....', '...yyy...', '.hh...hh.', '..hhhhh..', '...jjj...', '..jjjjj..', '..jjjjj..', '..j...j..', 'ggggggggg'], colors: { y: C.gold, h: C.sand, j: C.wood3, g: C.sand2 } },
  'two-roads': { rows: ['....ggggg', '....ggggg', '..c.ggggg', 'ss.c.gggg', '.ss.c..ll', '..ss.c.ll', 'dd..ssll.', 'dd.....s.', 'dddddddss'], colors: { g: C.green, c: C.sky, s: C.sand, l: C.lime, d: C.wood2 } },
  'mount-nebo': { rows: ['yyyyyyyyy', '.........', '....w....', '...www...', '..wwwww..', '.wwwwwww.', 'wwwwwwwww', 'gbgbgbgbg', 'ggggggggg'], colors: { y: C.gold, w: C.wood2, g: C.green, b: C.blue } },
  // Level 14 · Joshua
  'scarlet-cord': { rows: ['.........', 'sssssssss', 'sssssssss', 'sss..ssss', 'sss..ssss', 'ssssrssss', 'ssssrssss', 'ssssrssss', 'ggggrgggg'], colors: { s: C.sand2, r: C.rose, g: C.wood3 } },
  'stones-from-the-jordan': { rows: ['.........', '...s.s...', '.s.....s.', 's.......s', '.s.....s.', '...s.s...', '.........', 'ccccccccc', 'ccccccccc'], colors: { s: C.pale, c: C.sky } },
  'walls-of-jericho': { rows: ['yy.......', '.yyy.....', '..yyyyy..', '.........', '.s.......', 'sss..s...', 'ssss.sss.', 'sssssssss', 'ggggggggg'], colors: { y: C.gold, s: C.sand2, g: C.wood3 } },
  'lamp-in-the-tent': { rows: ['.........', '...www...', '..wwoww..', '..wwoww..', '...yyy...', '....y....', '.........', 'wwwwwwwww', 'wwwwwwwww'], colors: { w: C.white, o: C.orange, y: C.gold } },
  'sun-stands-still': { rows: ['..y....m.', '.yyy..mm.', 'yywyy....', '.yyy.....', '..y......', '.........', 'gg....ggg', 'ggggggggg', 'ggggggggg'], colors: { y: C.gold, w: C.white, m: C.pale, g: C.wood2 } },
  'twelve-portions': { rows: ['bbaaarrr.', 'bbaaarrr.', 'bgggpppd.', 'bgggpppd.', 'byyyooodd', 'byyyooodd', 'blllkkkdd', 'blllkkkdd', 'bbbbbbbbb'], colors: { b: C.blue, a: C.gold, r: C.rose, g: C.green, p: C.purple, d: C.wood3, y: C.sand, o: C.orange, l: C.lime, k: C.teal } },
  'stone-under-the-oak': { rows: ['.ggggg...', 'ggggggg..', 'ggggggg..', '.ggggg...', '...w..ss.', '...w.sss.', '...w.sss.', '...w.sss.', 'ggggggggg'], colors: { g: C.green, w: C.wood1, s: C.pale } },
  // Level 15 · The Judges
  'circle-of-the-judges': { rows: ['...yyy...', '.y.....y.', '.........', 'y...w...y', '.........', '.y.....y.', '...yyy...', '.........', 'ggggggggg'], colors: { y: C.gold, w: C.white, g: C.wood3 } },
  'palm-of-deborah': { rows: ['..g.g.g..', '.ggggggg.', 'gg.gwg.gg', '....w....', '....w....', '....w....', '....w....', 'sssswssss', 'sssssssss'], colors: { g: C.green, w: C.wood2, s: C.sand } },
  'torches-and-jars': { rows: ['....y....', '...yoy...', '...yoy...', '....o....', '.r.....r.', '.rr...rr.', '.rrrrrrr.', '..rrrrr..', '.........'], colors: { y: C.gold, o: C.orange, r: C.wood3 } },
  'timbrel-of-mizpah': { rows: ['.........', '..ywwwy..', '.wppppppw', '.wppppppw', '.yppppppy', '.wppppppw', '..ywwwy..', '.........', 'rrrrrrrrr'], colors: { y: C.gold, w: C.wood3, p: C.sand, r: C.rose } },
  'two-pillars': { rows: ['sssssssss', '.pp...pp.', '.pp...pp.', '.pp.w.pp.', '.pp...pp.', '.pp...pp.', '.pp...pp.', '.pp...pp.', 'ggggggggg'], colors: { s: C.wood3, p: C.sand, w: C.white, g: C.wood2 } },
  'lamp-in-bethlehem': { rows: ['....w....', '...wyw...', '....w....', '.........', '.hh.hhh..', '.hh.hyh..', 'ggggggggg', 'ggggggggg', 'ggggggggg'], colors: { w: C.white, y: C.gold, h: C.sand, g: C.green } },
  // Level 16 · Ruth
  'road-from-moab': { rows: ['.ww......', 'wyyw.....', '.ww......', '.........', '.....ss..', '..ssss...', 'ssggggggg', 'gggggssgg', 'gggggggss'], colors: { w: C.white, y: C.gold, s: C.sand, g: C.wood3 } },
  'where-you-go': { rows: ['.........', '.........', 'aaa...bbb', 'aaaa.bbbb', 'aaaayybbb', '....yy...', '.........', '.........', '.........'], colors: { a: C.sand, b: C.wood3, y: C.gold } },
  'sheaf-of-barley': { rows: ['y.y.y.y.y', '.y.y.y.y.', '..yyyyy..', '...yyy...', '..wwwww..', '...yyy...', '..yyyyy..', '.yy.y.yy.', 'ggggggggg'], colors: { y: C.gold, w: C.wood2, g: C.wood3 } },
  'six-measures': { rows: ['.........', '.yy.yy.yy', '.yy.yy.yy', '.........', 'ooooooooo', '.ooooooo.', '..ooooo..', '...ooo...', '.........'], colors: { y: C.gold, o: C.orange } },
  'sandal-at-the-gate': { rows: ['pp.....pp', 'pp.....pp', 'pp.....pp', 'pp.....pp', 'pp..w..pp', 'pp.www.pp', 'pwwwwwwwp', 'pp.....pp', 'ggggggggg'], colors: { p: C.sand2, w: C.wood2, g: C.wood3 } },
}

/** The pointed outline of a window, inside which the glass is: whether a pixel is in it. */
function inLancet(x: number, y: number, inset = 0): boolean {
  const w = PW
  const r = 0.8 * w
  const spring = Math.sqrt(r * r - (r - w / 2) ** 2)
  if (x < inset || x >= w - inset || y >= PH - inset) return false
  if (y >= spring) return true
  // Above the springing line, a pointed arch: inside both arcs, whose centres are a
  // radius away from each side.
  const cx = x + 0.5
  const cy = y + 0.5
  return Math.hypot(cx - (w - r), cy - spring) <= r - inset && Math.hypot(cx - r, cy - spring) <= r - inset
}

/** Draws a window: its stone frame, its glass, and (if its level is built) its medallions. */
export function drawWindow(window: CathedralWindow, states: Record<string, PanelState>): PixelBuffer {
  const buf = new PixelBuffer(PW, PH)
  const built = !!window.level
  const fieldLit = built && Object.values(states).some((s) => s === 'lit')
  const rng = createRng(2000 + window.number * 41)

  // The glass pieces: every pixel belongs to its nearest site; lead runs where pieces meet.
  const sites: { x: number; y: number; color: string }[] = []
  for (let y = 2; y < PH; y += 5) {
    for (let x = (y / 5) % 2 ? 1 : 3; x < PW; x += 5) {
      const roll = rng.next()
      const color = roll < 0.13 ? C.rose : roll < 0.19 ? C.gold : [C.navy, C.blue, C.blue, C.sky][Math.floor(rng.next() * 4)]!
      sites.push({ x: x + (rng.next() - 0.5) * 3, y: y + (rng.next() - 0.5) * 3, color })
    }
  }
  const owner = new Int32Array(PW * PH).fill(-1)
  for (let y = 0; y < PH; y++) {
    for (let x = 0; x < PW; x++) {
      if (!inLancet(x, y, 1)) continue
      let best = 0
      let bestD = Infinity
      sites.forEach((s, i) => {
        const d = (s.x - x) ** 2 + (s.y - y) ** 2
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      owner[y * PW + x] = best
    }
  }
  for (let y = 0; y < PH; y++) {
    for (let x = 0; x < PW; x++) {
      const o = owner[y * PW + x]!
      if (o < 0) {
        // The stone frame around the glass.
        if (inLancet(x, y, 0)) buf.set(x, y, C.dslate)
        continue
      }
      const right = x + 1 < PW ? owner[y * PW + x + 1]! : o
      const below = y + 1 < PH ? owner[(y + 1) * PW + x]! : o
      const lead = (right !== o && right >= 0) || (below !== o && below >= 0)
      const color = sites[o]!.color
      buf.set(x, y, lead ? C.ink : fieldLit ? color : dull(color))
    }
  }
  // Iron bars across.
  for (const t of [0.3, 0.55, 0.8]) {
    const y = Math.round(PH * t)
    for (let x = 0; x < PW; x++) if (inLancet(x, y, 1)) buf.set(x, y, C.ink)
  }

  if (built) {
    const centres = medallionCentres(window.panels.length)
    window.panels.forEach((panel, i) => {
      const c = centres[i]!
      drawMedallion(buf, Math.round(c.x / PX), Math.round(c.y / PX), panel.emblem, states[panel.episode] === 'lit')
    })
  }
  return buf
}

/** A medallion: a ruby ring, a deep blue disc, and the emblem. */
export function drawMedallion(buf: PixelBuffer, cx: number, cy: number, emblem: string, lit: boolean, reveal?: (x: number, y: number) => boolean) {
  const paint = (x: number, y: number, color: string) => {
    if (!reveal || reveal(x, y)) buf.set(x, y, lit ? color : dull(color))
  }
  for (let y = -RING; y <= RING; y++) {
    for (let x = -RING; x <= RING; x++) {
      const d = Math.hypot(x, y)
      if (d > RING + 0.4) continue
      if (d > RING - 0.6 || Math.abs(d - (DISC + 0.6)) < 0.5) paint(cx + x, cy + y, C.ink)
      else if (d > DISC + 1) paint(cx + x, cy + y, C.rose)
      else paint(cx + x, cy + y, C.navy)
    }
  }
  const art = EMBLEMS[emblem]
  if (!art) return
  art.rows.forEach((row, j) =>
    [...row].forEach((ch, i) => {
      const color = art.colors[ch]
      if (color) paint(cx - 4 + i, cy - 4 + j, color)
    }),
  )
}

export { RING as PIXEL_RING }
