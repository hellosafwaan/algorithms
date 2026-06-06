# Session: Remove Element (LC 27) — 2026-06-06

## What He Attempted

First instinct was to mark target elements with -1. Once he understood that wouldn't satisfy the "first k elements must be valid" constraint, he landed on a swap approach independently: two pointers converging from both ends, swapping targets at p1 with valid elements pulled from the right.

The read/write pointer approach was new to him — needed the setup ("one pointer reads, the other only moves when you write a valid element"), then derived the rest himself.

## Where He Got Stuck

**Swap solution:** Three separate termination issues.
1. Forgot to increment p1 when the element is NOT a target — infinite loop on first non-target.
2. After fixing that, added p1++ both inside and outside the if block — double increment.
3. The real termination bug: `if(swappableIndex === 0) break` — doesn't catch the case where pointers cross mid-array. Fixing to `swappableIndex <= p1` required a full trace of [3, 2, 2, 3] to expose (took ~40 minutes).

Also: returned `n - valuesSwapped` instead of `p1`. He realised this was wrong himself when asked to trace [3, 3, 2].

**Read/write solution:** No major sticking points once the setup was given. He got it on the first attempt with minor cleanup.

## Mistakes Made

- Missing p1++ for non-target case — caught by himself when asked to trace [1, 3]
- Double p1++ — caught by himself when asked what happens in iteration 1 of [3, 2, 2, 3]
- Termination condition `swappableIndex === 0` instead of `swappableIndex <= p1` — required a guided trace to expose
- Return value `n - valuesSwapped` instead of `p1` — caught himself when asked to trace [3, 3, 2]
- Redundant `valuesSwapped` variable in final version — self-identified

## Key Insight

**Swap:** The loop must terminate when the two pointers cross, not when swappableIndex hits zero. If swappableIndex <= p1, there's nothing valid left on the right to swap with — every element from p1 onward is a target. Return p1, not `n - valuesSwapped`, because p1 is exactly the count of valid elements placed.

**Read/Write:** The write pointer only moves when a valid element is written. Overwriting is always safe because the write pointer can never get ahead of the read pointer — so you never destroy a value you still need. Return p1 because it counts how many valid elements were written.

## Complexity Reached

Both solutions — Time: O(n) · Space: O(1)

## Coach Notes for Next Session

- He spent 40 minutes tracing [3, 2, 2, 3]. Taught the "use the smallest input that exposes the bug" heuristic — he acknowledged it immediately. Worth probing if he applies it next time he needs to trace.
- The read/write pattern is new. He said he needs to "understand when to reach for it vs other patterns." Good candidate for a future carry-forward probe.
- The `currentIndex >= nums1Pointer` invariant from LC 88 was deferred again at session start — he still hasn't answered it. Keep in carry-forward.
- Two solutions on the same problem, both 100th percentile runtime. He noted the swap approach is less common and harder to implement correctly — he's right. His instinct to reach for the harder solution first is worth noting.
