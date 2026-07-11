Session: [055_2026-07-11_interval-list-intersections.md](../../safwaan/sessions/055_2026-07-11_interval-list-intersections.md)

## How It Felt
Felt easy — solved via a video walkthrough (disclosed honestly upfront, same as LC 200), code was correct and accepted on the first submission with no bugs. The real test came at wrap-up: initially couldn't explain why the pointer-advance rule works ("I forgot"), but after being given the answer directly and then walking a concrete trace, rebuilt the reasoning fully himself — including catching his own mid-trace slip on a boolean condition.

## Key Insight
Both lists are internally sorted and non-overlapping. When comparing `firstList[i]` and `secondList[j]`, whichever interval has the **smaller end** has already extracted everything it possibly could from the other list — it can't reach any further, and every subsequent interval in the other list only starts later. So that interval is "exhausted" and its pointer advances. The interval with the larger end is still "in play" — it might still overlap the next interval in the list you just advanced past — so its pointer stays put.

## Solution Walkthrough

The approach uses two pointers, `i` for `firstList` and `j` for `secondList`, walking both simultaneously:

1. While both pointers are still in range, destructure the current interval from each list: `[s1, e1]` from `firstList[i]`, `[s2, e2]` from `secondList[j]`.
2. Check for overlap: `e1 >= s2 && e2 >= s1`. This is the general two-interval overlap condition — it holds unless one interval ends entirely before the other starts. If they overlap, the intersection is `[Math.max(s1, s2), Math.min(e1, e2)]` — the intersection always starts at the later of the two starts and ends at the earlier of the two ends, whether or not one interval fully contains the other.
3. Whether or not there was an overlap, decide which pointer to advance: compare `e1` and `e2`. Whichever interval ends earlier is "exhausted" — it has no potential to overlap with anything further in the other list, since the other list's remaining intervals only start later and later. Advance that pointer. The interval that ends later stays, because it might still overlap the *next* interval in the list whose pointer just moved.
4. Repeat until either pointer runs out of intervals.

Traced through `firstList=[[0,2],[5,10]]`, `secondList=[[1,5],[8,12]]`:
- `i=0, j=0`: `[0,2]` vs `[1,5]`. Overlap (`2>=1 && 5>=0`) → push `[max(0,1), min(2,5)] = [1,2]`. `e1=2 < e2=5` → `i++`.
- `i=1, j=0`: `[5,10]` vs `[1,5]`. Overlap (`10>=1 && 5>=5`) → push `[max(5,1), min(10,5)] = [5,5]`. Now `e1=10`, `e2=5` — **`e1<e2` is false**, not true (this is the exact slip made mid-session) — so the `else` branch runs: `j++`. `[1,5]` is exhausted (ends at 5, already overlapped everything it could with `[5,10]`); `[5,10]` (ends at 10) stays because it might still catch `secondList`'s next interval.
- `i=1, j=1`: `[5,10]` vs `[8,12]`. Overlap (`10>=8 && 12>=5`) → push `[8,10]`.
- Loop continues until a pointer runs out.

## Pattern Introduced
New sub-shape of **Two Pointers**: two independent, internally-sorted lists compared against each other, rather than one array compared against itself (LC 57/56/252) or merged into a single output stream from both ends (LC 88). The pointer-advance rule — "drop whichever interval ends first, it's exhausted" — is the core mechanism, distinct from anything seen so far in the Intervals bucket.

## Watch Out For
- When tracing, verify the *actual* truth value of a boolean condition (is `e1` really less than `e2`, with the real numbers?), not just which branch "feels right" based on the outcome you expect. A mid-trace slip here stated the wrong condition even though the resulting action happened to be correct.
- The overlap check `e1 >= s2 && e2 >= s1` is the general two-interval overlap condition — worth having this memorized cold, since it comes up across the whole Intervals topic in various forms.

## Template
```js
function intervalIntersection(firstList, secondList) {
    const result = [];
    let i = 0, j = 0;
    while (i < firstList.length && j < secondList.length) {
        const [s1, e1] = firstList[i];
        const [s2, e2] = secondList[j];
        if (e1 >= s2 && e2 >= s1) {
            result.push([Math.max(s1, s2), Math.min(e1, e2)]);
        }
        if (e1 < e2) i++;
        else j++;
    }
    return result;
}
```

## Trace Through
See Solution Walkthrough above — `firstList=[[0,2],[5,10]]`, `secondList=[[1,5],[8,12]]` produces `[[1,2],[5,5],[8,10]]`.

## Complexity
**Time: O(n + m)** — each pointer advances by at least one on every iteration (never both stalling), and each can advance at most `n` or `m` times total, so the loop runs at most `n + m` times.
**Space: O(1)** extra, not counting the output array — just two index variables.

## Submissions
- https://leetcode.com/problems/interval-list-intersections/submissions/2064159942/ — Accepted.

## Open Questions
- Does the "exhausted interval" framing transfer cold to a similarly-shaped two-list problem without needing the direct explanation again?
- Does the mid-trace boolean-evaluation slip (pattern #60) recur on future two-pointer problems, or was this a one-off?
