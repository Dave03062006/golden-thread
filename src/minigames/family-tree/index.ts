import { GENERATIONS as LEVEL_1_LINE } from '../../content/levels/01-creation-and-fall/episode-6'
import { STEP, type Choice, type GameRules } from '../framework'

/**
 * The family tree (Level 1 script, Episode 6; Level 2 script, Episode 7). The names of a
 * family line drift down as leaves (from Adam to Noah, or from Shem to Abram), and the
 * player places each on the tree in order. Each right placement grows the next branch and
 * shows its short fact, if it has one. A misplaced leaf floats back with a hint about
 * where it belongs ("Seth came after Adam"). In gentle mode the next right leaf glows.
 */

/** One name on the tree: its leaf and branch actors, and the fact shown when it's placed. */
export interface Generation {
  name: string
  note?: string
  leaf: string
  branch: string
}

/** How long a placed name's fact stays before the next question, in seconds. */
const SHOW = 2.2
/** How long the tree takes to grow each new branch. */
const GROW = 1.2

export interface TreeState {
  /** How many names are placed. */
  placed: number
  /** Seconds since the last name was placed (or since the start). */
  clock: number
  /** The leaf just tried in the wrong place, if any. */
  misplaced: string | null
}

/** A family tree game for a line of names, under its own id (the name a story's `play` beat uses). */
export function makeFamilyTree(id: string, line: Generation[]): GameRules<TreeState> {
  /** The leaves still to place, in a fixed scattered order, so each question looks different. */
  function remaining(placed: number) {
    return line.slice(placed)
      .map((g, i) => ({ g, k: Math.sin((placed + 1) * 12.9898 + i * 78.233) }))
      .sort((a, b) => a.k - b.k)
      .map(({ g }) => ({ id: g.name, text: g.name }))
  }

  const trailOf = (placed: number) => line.slice(0, placed).map((g) => ({ title: g.name, note: g.note }))
  const questionOf = (placed: number) => (placed === 0 ? 'Who is at the root of the tree?' : `Who comes next, after ${line[placed - 1]!.name}?`)

  /** A hint for a leaf put in the wrong place: where it really belongs. */
  function hintFor(name: string): string {
    const i = line.findIndex((g) => g.name === name)
    return i === 0 ? `${name} comes first, at the root.` : `${name} came after ${line[i - 1]!.name}.`
  }

  /** What the screen shows, kept the same object while nothing changes. */
  const views = new Map<string, Choice>()
  function choiceFor(state: TreeState, gentle: boolean): Choice {
    // A placed name's fact shows for a moment; once the tree is complete, the last one stays.
    const showing = state.placed > 0 && (state.clock < SHOW || state.placed === line.length)
    const key = `${state.placed}|${showing}|${state.misplaced}|${gentle}`
    let view = views.get(key)
    if (!view) {
      if (showing) {
        const g = line[state.placed - 1]!
        view = {
          id: `placed-${state.placed}`,
          question: questionOf(state.placed - 1),
          options: [],
          feedback: { right: true, text: g.note ? `${g.name}: ${g.note}` : g.name },
          trail: trailOf(state.placed),
          compact: true,
        }
      } else {
        view = {
          id: `next-${state.placed}`,
          question: questionOf(state.placed),
          options: remaining(state.placed),
          feedback: state.misplaced ? { right: false, text: hintFor(state.misplaced) } : null,
          trail: trailOf(state.placed),
          glow: gentle ? line[state.placed]!.name : undefined,
          compact: true,
        }
      }
      views.set(key, view)
    }
    return view
  }

  return {
    id,
    start: () => ({ placed: 0, clock: SHOW, misplaced: null }),
    step(state, inputs) {
      let { placed, clock, misplaced } = state
      const asking = placed < line.length && (placed === 0 || clock >= SHOW)
      for (const input of inputs) {
        if (input.kind !== 'choose' || !asking) continue
        if (input.option === line[placed]!.name) {
          placed += 1
          clock = 0
          misplaced = null
          break
        }
        misplaced = input.option
      }
      return { placed, clock: clock + STEP, misplaced }
    },
    view(state, context) {
      const live: Record<string, number> = {}
      // Each placed name grows its branch out from the trunk, and its leaf comes out at the tip.
      line.forEach((g, i) => {
        const latest = i === state.placed - 1
        live[`actor:${g.branch}.grow`] = i < state.placed - 1 ? 1 : latest ? Math.min(1, state.clock / GROW) : 0
        live[`actor:${g.leaf}.opacity`] = i < state.placed - 1 ? 1 : latest ? Math.min(1, Math.max(0, (state.clock - GROW * 0.6) / 0.8)) : 0
      })
      const finished = state.placed === line.length
      return {
        live,
        hint: null,
        choice: choiceFor(state, context.gentle),
        done: finished && state.clock >= SHOW + 0.4,
      }
    },
  }
}

/** Level 1: from Adam to Noah. */
export const familyTree = makeFamilyTree('family-tree', LEVEL_1_LINE)
