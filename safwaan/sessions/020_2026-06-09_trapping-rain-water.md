# Session: Trapping Rain Water — 2026-06-09

## What He Attempted

**Brute force (O(n²)):** Got the core formula — `min(maxLeft, maxRight) - height[i]` — cold before writing any code. Built the naive approach with inner while loops scanning left and right from each index. Two bugs: wrong index in right scan (`height[rightMaxHeight]` instead of `height[rightStartIndex]`), and an infinite loop in the left scan (forgot to decrement `leftStartIndex` in the else branch). Both caught via guided questions. Added a guard for negative accumulation (`if (waterAccumulatedAtIndex > 0)`). TLE'd at case 323/324.

**Prefix max (O(n) time, O(n) space):** Derived this himself cleanly after identifying the bottleneck in the brute force. Built `leftMaxHeights` (left-to-right pass, push before update) and `rightMaxHeights` (right-to-left, assign by index). Third pass to accumulate water. No bugs. Accepted at 23rd percentile.

**Two-pointer (O(n) time, O(1) space):** Struggled with the key insight. Went to a separate Claude chat to build physical intuition (why `leftMax <= rightMax` is the condition, not `height[left] < height[right]`). In that chat the condition was given to him after he said he couldn't derive it. Built the rest of the code with guided nudges in this session. Accepted at 100th percentile.

## Where He Got Stuck

Two-pointer condition. He couldn't land on `leftMax <= rightMax` independently — the reasoning (process the bottleneck side, not the side with the smaller current height) wasn't clicking without visual help. After getting the condition from the external chat, the rest of the code came together quickly.

## Mistakes Made

1. **Wrong index in right scan** — `height[rightMaxHeight]` instead of `height[rightStartIndex]`. Spotted with one nudge.
2. **Infinite loop in left scan** — `leftStartIndex` only decremented inside the `if` branch, so when the condition was false the pointer never moved. Caught via "what happens when the height isn't greater?"
3. **Two-pointer condition not derived** — went to an external chat rather than working through it here. The condition `leftMax <= rightMax` was given, not derived.

## Key Insight

Three layers:

1. **Per-index formula:** Water at any index = `min(maxLeft, maxRight) - height[i]`. The min of the two walls is the effective container height; subtract the floor; clamp to zero.

2. **Prefix max:** Instead of scanning left and right for every index (O(n²)), precompute. One left-to-right pass builds the left max array, one right-to-left pass builds the right max array. Then one more pass to accumulate. O(n) time, O(n) space.

3. **Two-pointer:** You don't need both max arrays upfront. The condition `leftMax <= rightMax` tells you which side is the bottleneck *right now* — and when you know which side is the bottleneck, you can compute water there without knowing the exact value on the other side. Just knowing it's ≥ the bottleneck is enough.

## Complexity Reached

| Approach | Time | Space |
|----------|------|-------|
| Brute force | O(n²) | O(1) |
| Prefix max | O(n) — 3 passes | O(n) — 2 arrays |
| Two-pointer | O(n) — 1 pass | O(1) |

**Why brute force is O(n²):** Outer loop n times × inner scan up to n each time = n².  
**Why prefix max is O(n):** Three sequential passes, each O(n). Three separate loops ≠ nested loops.  
**Why two-pointer is O(1) space:** No auxiliary arrays — just 4 variables.

## Submissions

- Prefix max: https://leetcode.com/problems/trapping-rain-water/submissions/2026591755 — 23rd percentile runtime, 18th percentile memory
- Two-pointer: https://leetcode.com/problems/trapping-rain-water/submissions/2027062161 — 100th percentile runtime, 92nd percentile memory

## Coach Notes for Next Session

- Two-pointer condition (`leftMax <= rightMax`) was given, not derived. Safwaan agreed to a hard redo of just the two-pointer approach by end of this week. Flag this for the next session.
- The prefix max approach was entirely independently derived — clean and confident.
- Watch for: the "process the bottleneck side" reasoning. This pattern generalises. He understands it now after explanation but hasn't had to derive it.
- Phase 2 is complete. Start Phase 3 — Sliding Window.
