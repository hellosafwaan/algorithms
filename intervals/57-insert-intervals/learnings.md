Session: [052_2026-07-07_insert-interval.md](../../safwaan/sessions/052_2026-07-07_insert-interval.md)

## How It Felt
Opened as a total blank — "I don't even know how to solve this," the first genuinely new pattern in a while. The case breakdown (before / overlap / after) came together through Socratic questioning rather than instinct. Coding hit real bugs, all caught via tracing except one mechanism that needed to be given directly after getting stuck twice. Then went further unprompted — asked whether the code itself could be cleaner (not faster), and correctly reasoned through a loop invariant to push back on a redundant condition.

## Key Insight
The intervals array comes in sorted and already non-overlapping, so a single pass works: compare each interval to `newInterval` and it falls into exactly one of three cases. Ends before `newInterval` starts → unaffected, push straight through. Overlaps → don't push anything, just grow `newInterval` (`min` of starts, `max` of ends). Starts after `newInterval` ends → nothing else can merge into it, so this is the moment `newInterval` itself finally gets pushed, and everything from here on just gets pushed as-is.

## Solution Walkthrough

**Solution 1 — single pass with a flag.** Walk the array once. For each `current` interval:
1. `current[1] < newInterval[0]` → current ends before `newInterval` even starts. No overlap possible, unaffected — push it straight to `result`.
2. `current[0] > newInterval[1]` → current starts after `newInterval` ends. No overlap, and since the array is sorted, `newInterval` is *done growing* — nothing after this point can merge into it either. This is where `newInterval` gets pushed. But it can only be pushed here *once* — if there are several intervals after it, you'd push it again on the second, third, etc. That's what `newIntervalAdded` is for: a boolean flag that starts `false`, flips to `true` the moment `newInterval` is pushed, and gates every later attempt.
3. Otherwise → overlap. Grow `newInterval` — `newInterval[0] = Math.min(newInterval[0], current[0])`, `newInterval[1] = Math.max(newInterval[1], current[1])` — and push nothing. `current` has been absorbed.

One more edge case the loop alone can't cover: what if `newInterval` is after *every* interval in the array (or the array is empty)? Then case 2 never fires, the flag stays `false` for the whole loop, and `newInterval` never gets pushed. Fix: after the loop, `if (!newIntervalAdded) result.push(newInterval)`.

**Solution 2 — three while loops, no flag.** Same three cases, but restructured as three sequential phases sharing one index `i`, instead of one loop with a flag:
1. `while (i < n && intervals[i][1] < newInterval[0])` — push everything strictly before, advance `i`.
2. `while (i < n && intervals[i][0] <= newInterval[1])` — merge everything overlapping into `newInterval`, advance `i`.
3. Push `newInterval` — exactly once, by construction, right between phase 2 and phase 3. No flag needed, because the loop *structure itself* guarantees it only happens once.
4. `while (i < n)` — push everything left over, unconditionally.

The interesting detail is why phase 2's condition only checks `intervals[i][0] <= newInterval[1]`, when the *original* overlap check (from Solution 1, derived earlier in the session) was the full `current[0] <= newInterval[1] && current[1] >= newInterval[0]`. The answer: phase 1 just finished, and phase 1's loop condition was `intervals[i][1] < newInterval[0]`. The only way phase 1 *stops* is when that's false — i.e. `intervals[i][1] >= newInterval[0]` is already guaranteed true for whatever `i` phase 2 starts at. That's exactly the other half of the full overlap condition. Checking it again in phase 2 would always evaluate to `true` — correct, but redundant. So phase 2 only needs to check the half that isn't already guaranteed: `intervals[i][0] <= newInterval[1]`.

## Pattern Introduced
**Intervals — classify-and-merge single pass.** First problem in the Intervals phase. Core shape: given a sorted, non-overlapping interval list and one new interval to insert, classify each existing interval into exactly one of three buckets relative to the new interval (strictly before / overlapping / strictly after) in a single pass, growing the new interval via `min`/`max` while it's in the overlap bucket. Two implementation shapes for the same logic: a flag-gated single loop, or three sequential phase-loops that make the "push exactly once" property structural instead of flag-enforced.

## Watch Out For
- `const` on a variable you plan to mutate later (`newIntervalAdded`) throws — this recurred from earlier sessions (LC 167, 977). Reflexively check `let` vs `const` before assigning inside a loop.
- `Math.min`/`Math.max` mixup when writing the merge formula — easy to typo one for the other since they're visually similar and adjacent. Worth a deliberate double-check on this specific line.
- The two non-overlap cases (before/after) are NOT the same branch just because both are "no overlap" — they need opposite handling (push immediately vs. push `newInterval` first). Don't collapse them into one `if(!overlap)` branch.
- The one-time-push problem (only push `newInterval` on the *first* qualifying interval, not every one after) needs an explicit mechanism — either a boolean flag, or restructure the loop so the push only happens once by construction (three-phase version).
- Don't forget the post-loop check: if `newInterval` never triggered the "after" case (it's the last interval, or the array is empty), it still needs to be pushed once the loop ends.

## Template
```js
// Flag-gated single pass
function insert(intervals, newInterval) {
    const result = [];
    let newIntervalAdded = false;
    const n = intervals.length;
    for (let i = 0; i < n; i++) {
        const current = intervals[i];
        if (current[1] < newInterval[0]) {
            result.push(current);
        } else if (current[0] > newInterval[1]) {
            if (!newIntervalAdded) {
                result.push(newInterval);
                newIntervalAdded = true;
            }
            result.push(current);
        } else {
            newInterval[0] = Math.min(newInterval[0], current[0]);
            newInterval[1] = Math.max(newInterval[1], current[1]);
        }
    }
    if (!newIntervalAdded) result.push(newInterval);
    return result;
}

// Three-phase, no flag
function insertThreePass(intervals, newInterval) {
    const result = [];
    let i = 0;
    const n = intervals.length;
    while (i < n && intervals[i][1] < newInterval[0]) { result.push(intervals[i]); i++; }
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    while (i < n) { result.push(intervals[i]); i++; }
    return result;
}
```

## Trace Through
`intervals = [[1,3],[6,9]]`, `newInterval = [2,5]` (expected `[[1,5],[6,9]]`):
- `i=0`: `current=[1,3]`. `3 < 2`? No. `1 > 5`? No. → overlap: `newInterval = [min(2,1), max(5,3)] = [1,5]`.
- `i=1`: `current=[6,9]`. `9 < 1`? No. `6 > 5`? Yes → after case: push `[1,5]` (flag → `true`), push `[6,9]`.
- Result: `[[1,5],[6,9]]`. Correct.

## Complexity
**Time: O(n)** — one pass through `intervals`, each element inspected exactly once, constant work per element.
**Space: O(n)** — `result` scales with the input size (n existing intervals plus the one merged/new interval).

## Submissions
- https://leetcode.com/problems/insert-interval/submissions/2058474964 — Accepted, 59.32nd percentile runtime, 54.80th percentile memory.

## Open Questions
- Does the three-case classification (before/overlap/after) transfer cold to LC 56 (Merge Intervals), which drops the "insert a new interval" framing but keeps the same merge-while-overlapping core?
- The one-time-push mechanism (boolean flag vs. structural three-phase loop) — does this generalize as a recognizable pattern for other "insert into a single pass, but only once" problems?
- Loop invariant reasoning (recognizing that an earlier loop's exit condition already guarantees part of a later condition) — first time this showed up as something he pushed back on and reasoned through correctly. Worth testing again cold.
