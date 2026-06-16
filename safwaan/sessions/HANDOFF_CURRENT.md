# Handoff — Interview Prep Sprint (Day 3 of 5)

## Context

Safwaan has an interview on **Friday 2026-06-19**. Today (Tue 2026-06-16) he solved three bonus bit-manipulation problems pulled forward from later in the curriculum: Single Number (LC 136), Number of 1 Bits (LC 191), and Reverse Bits (LC 190) — all Phase 18. Justification: high-frequency easy-tier interview questions, and he'd pre-built a bit manipulation cheat sheet covering the operators ahead of time.

## What Was Just Completed

**LC 190 — Reverse Bits**

Pattern: Mask & Shift, build variant. Unlike LC 191 (which only counts bits), this problem requires constructing a second, positionally-correct number — so several new wrinkles surfaced that weren't covered by the LC 191 mental model:

1. **First instinct was rotation, not reversal.** Believed repeatedly shifting the whole number would reverse it. Corrected by tracing `1100` rotated right 4 times — landed back at the start, exposing that rotation cycles rather than mirrors. Once shown the mirror relationship (`position i → position (n-1-i)`), redirected cleanly.
2. **OR-then-shift vs shift-then-OR.** Proposed OR-ing the new bit into `result` before left-shifting — this re-shifts the just-placed bit on the same iteration, corrupting its final position. A verbal explanation didn't land; a full iteration-by-iteration trace table (both orderings, same input) did. **He explicitly confirmed this worked and asked for more trace tables going forward** — this is now baked into CLAUDE.md's Expertise Calibration.
3. **Tested OR-then-right-shift as an alternative** (good instinct — actively probing alternatives rather than passively accepting the first fix). Caught via trace table that this discards bits entirely.
4. **`while(n !== 0)` terminated too early.** Reused the LC 191 loop shape, but building a positionally-correct result needs every one of 32 positions visited, regardless of when `n`'s remaining bits hit 0. Traced `n = 1` to see the bug concretely — the loop ran once and stopped, leaving the bit at the wrong position. Fixed with a 32-iteration `for` loop.
5. **`n >> 1` vs `n >>> 1`.** Used signed right shift, which risks infinite sign-extension for any `n` with the leftmost bit set. Genuine knowledge gap — given directly, then correctly picked `>>>` when asked which one matches "we don't have to preserve the sign."
6. **Pushed back on `>>> 0` before returning** ("why force unsigned if input is signed?") — good instinct. Resolved by distinguishing the *declared type* (signed int, a labeling convention) from what the algorithm actually does (treats bits as a positionless pattern). Then **independently noticed the actual problem page's constraints** (`n` even, `0 <= n <= 2^31-2` — Top Interview 150 variant, not the classic unconstrained version) and correctly reasoned that since `n` is even, bit 0 of `n` (which lands at the sign bit of `result`) is always `0` — so `result` is guaranteed non-negative here without needing `>>> 0`.

Submitted: Accepted, 600/600, 46ms (beats 63.65%), 54.26MB (beats 49.66%).

## Sprint Summary (original 9, now 12 with bonuses)

| # | Problem | Status |
|---|---------|--------|
| 1 | Valid Anagram (LC 242) | ✅ Done |
| 2 | Group Anagrams (LC 49) | ✅ Done |
| 3 | Longest Substring Without Repeating Characters (LC 3) | ✅ Done |
| 4 | Ransom Note (LC 383) | ✅ Done |
| 5 | Isomorphic Strings (LC 205) | ✅ Done |
| 6 | Word Pattern (LC 290) | ✅ Done |
| 7 | Contains Duplicate II (LC 219) | ✅ Done |
| 8 | Happy Number (LC 202) | ✅ Done |
| 9 | Longest Consecutive Sequence (LC 128) | ✅ Done |
| 10 | Single Number (LC 136) *(bonus, pulled forward)* | ✅ Done 2026-06-16 |
| 11 | Number of 1 Bits (LC 191) *(bonus, pulled forward)* | ✅ Done 2026-06-16 |
| 12 | Reverse Bits (LC 190) *(bonus, pulled forward)* | ✅ Done 2026-06-16 |

## Remaining Days Before Interview

| Day | Plan |
|-----|------|
| Wed 2026-06-17 | LC 3 cold redo (planned) |
| Thu 2026-06-18 | Final review |
| Fri 2026-06-19 | **Interview** |

## Next Session — Start Here

**No new problems unless a quick high-value bonus comes up (like today, three times).** Options:
1. **LC 3 cold redo** — still the plan for Wednesday. Probe: `Math.max(left, map[char]+1)` and why `Math.max` is needed; window size formula `i - left + 1`.
2. **Pattern consolidation** — hash map/set family: bijection, sliding window, cycle detection, sequence start, XOR cancellation, mask & shift (count vs build variants). Ask him to explain each pattern cold.
3. **JS toolkit drill** — `for...in` vs `for...of`, Set API, Map API, `Array.from`, and now `>>` vs `>>>`. Still the highest-priority gap, came up again at LC 190.
4. **Log-based complexity drill** — gap from LC 191, not yet probed cold.

## Safwaan's Current State

**What he knows:**
- Hash Set / Hash Map family — solid across membership, cycle detection, sliding window, sequence start, bijection, frequency counting
- XOR self-cancellation — solid, zero-hint cold application (LC 136)
- Bit manipulation mask & shift, count variant (`n & 1` + `n = n >>> 1`, while loop) — solid (LC 191)
- Bit manipulation mask & shift, **build variant** (shift-then-OR, fixed 32-iteration loop) — now understood after guided debugging through three distinct ordering/termination bugs (LC 190)
- Constraint-reading: independently caught that LC 190's actual constraints differ from the classic version and reasoned through the implication correctly — a new, positive signal worth reinforcing

**Gaps to probe at interview:**
- `for...in` vs `for...of` — still not drilled directly despite being flagged multiple times
- `>>` vs `>>>` — **new gap, surfaced directly at LC 190** (separate from the LC 191 "no conversion needed" fact, which did NOT resurface — that one's resolved)
- Counting loop (`while(n!==0)`) vs building loop (fixed `for`) — new distinction, watch for it on LC 268 / LC 338
- Math.max guard in sliding window — not cold yet
- Log-based complexity reasoning — self-identified weak spot, still not probed cold since LC 191

## Coach Notes

- **Trace tables, not verbal explanations, are the unlock for bit-operator ordering confusion.** Confirmed explicitly by Safwaan this session ("reason like this, remember to do this more often") — now in CLAUDE.md. Default to trace tables whenever he's stuck on operator semantics or ordering, not just index math.
- LC 190 needed far more guided debugging than LC 136/191 — three distinct bugs (rotate-vs-reverse confusion, shift/OR ordering, early loop termination) plus one knowledge gap (`>>` vs `>>>`). This is a genuinely harder problem than the other two bonuses, not a regression in his ability.
- Good instincts to reinforce: (1) actively tested an alternative approach (OR-then-right-shift) instead of just accepting the first fix; (2) pushed back on `>>> 0` instead of blindly applying it; (3) independently read the actual problem constraints and used them to justify skipping a defensive fix.
- LC 42 two-pointer redo: still deferred to after interview.
- The `for...in`/`for...of` gap remains the highest-priority quick fix — still hasn't been directly drilled.
