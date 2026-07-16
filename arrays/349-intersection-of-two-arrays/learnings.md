Session: [067_2026-07-16_intersection-of-two-arrays](../../safwaan/sessions/067_2026-07-16_intersection-of-two-arrays.md)

## How It Felt

Felt pretty smooth — clicked fast once the idea of using Sets came to mind.

## Key Insight

The arrays can contain duplicates, and duplicates would just get in the way of computing a clean intersection. Converting both arrays to Sets kills that problem for free — now every element is unique and every lookup is O(1). Pick one Set, walk it, and check membership in the other. Whatever's in both goes in the result.

If the problem instead guaranteed no duplicates, the Sets wouldn't be needed at all — a single pass over one array checking membership in the other (even with `.includes()`, or better, one Set for lookup) would do, since there'd be no dedup problem to solve in the first place.

## Solution Walkthrough

The problem wants the intersection of two arrays — the values that show up in both. The catch is that either array can have repeated elements, and the output should only contain each shared value once.

So the plan: turn both arrays into Sets first. That does two things at once — it removes duplicates, and it gives O(1) membership checks instead of scanning.

Once both are Sets, walk one of them (`setNums1`) and ask, for each number, "is this also in `setNums2`?" If yes, push it to `result`. Since we're iterating a Set (not the original array), we never see the same number twice, so `result` naturally comes out deduplicated without any extra work.

## Pattern Introduced

Hash Set — Cross-Set Membership (Intersection). Convert both inputs to Sets, iterate one, check membership in the other.

## Watch Out For

- `result = []` with no `const`/`let` is an implicit global — works by accident here (nothing else touches a global `result`), but it's a landmine in a larger program. Same shape as a bug that showed up before on LC 977 (`right` declared with no keyword) — this is a recurring one, not caught proactively yet.
- Native ES2024 Set methods (`setNums1.intersection(setNums2)`) do exactly this in one call on modern runtimes (Node 22+) — worth knowing exists, not required knowledge.

## Template

```js
function intersection(nums1, nums2) {
    const setNums1 = new Set(nums1);
    const setNums2 = new Set(nums2);
    const result = [];
    for (const number of setNums1) {
        if (setNums2.has(number)) result.push(number);
    }
    return result;
}
```

## Trace Through

Input: `nums1 = [4,9,5]`, `nums2 = [9,4,9,8,4]`

- `setNums1 = {4, 9, 5}`, `setNums2 = {9, 4, 8}`
- `number = 4`: `setNums2.has(4)` → true → push `4`. `result = [4]`
- `number = 9`: `setNums2.has(9)` → true → push `9`. `result = [4, 9]`
- `number = 5`: `setNums2.has(5)` → false → skip

Result: `[4, 9]` ✓ (order doesn't matter per the problem)

## Complexity

**Time: O(n + m)** — building `setNums1` is O(n), building `setNums2` is O(m), and the final loop over `setNums1` does O(1) membership checks against `setNums2`, so O(n) for the loop. Total is O(n + m), and there's no way to do better since every element of both arrays has to be looked at at least once.

**Space: O(n + m)** — both Sets are stored in full (worst case, no duplicates within either array).

## Submissions

- https://leetcode.com/problems/intersection-of-two-arrays/submissions/2070252981 — Accepted, 57/57, 1ms runtime (beats 78.72%)

## Open Questions

None open for this problem — it's the optimal approach already.
