Session: [068_2026-07-16_find-the-difference-of-two-arrays](../../safwaan/sessions/068_2026-07-16_find-the-difference-of-two-arrays.md)

## How It Felt

Felt pretty easy.

## Key Insight

In his own words: "I saw that one of the inputs also contains duplicate elements, so I don't want that coming in when finding the difference... that's the reason for using a set." Then the two-direction structure: iterate one array's Set, keep only what's NOT a member of the other Set — do that in both directions, and you have both halves of the answer.

## Solution Walkthrough

The problem asks for two things: what's in `nums1` but not `nums2`, and what's in `nums2` but not `nums1` — the symmetric difference, split into two lists. Duplicates within either array shouldn't cause the same value to be reported twice, so both arrays get converted to Sets first.

From there it's the mirror image of Intersection of Two Arrays (LC 349) — same Set-and-check shape, just the condition flips. For intersection you push when a number IS in the other Set; for difference you push when it's NOT.

**Step 1** — Build `nums1Set` and `nums2Set`.
**Step 2** — Walk `nums1Set`, push anything not found in `nums2Set` into `nums1Difference`.
**Step 3** — Walk `nums2Set`, push anything not found in `nums1Set` into `nums2Difference`.
**Step 4** — Return `[nums1Difference, nums2Difference]`.

## Pattern Introduced

Hash Set — Cross-Set Membership (Difference variant). Same core tool as LC 349's Intersection — Sets for dedup + O(1) lookup — with the membership check negated and run in both directions instead of once.

## Watch Out For

- Order in the returned pair matters: `[nums1-only, nums2-only]`, not the reverse.
- Nothing else — clean solve, and notably no implicit-global slip this time (`const` used correctly on both result arrays), unlike the recurring bug on LC 349/977/167.

## Template

```js
function findDifference(nums1, nums2) {
    const nums1Set = new Set(nums1);
    const nums2Set = new Set(nums2);
    const nums1Difference = [];
    const nums2Difference = [];
    for (let number of nums1Set) {
        if (!nums2Set.has(number)) nums1Difference.push(number);
    }
    for (let number of nums2Set) {
        if (!nums1Set.has(number)) nums2Difference.push(number);
    }
    return [nums1Difference, nums2Difference];
}
```

## Trace Through

Input: `nums1 = [1,2,3]`, `nums2 = [2,4,6]`

- `nums1Set = {1,2,3}`, `nums2Set = {2,4,6}`
- Walk `nums1Set`: `1` not in `nums2Set` → push. `2` in `nums2Set` → skip. `3` not in `nums2Set` → push. → `nums1Difference = [1,3]`
- Walk `nums2Set`: `2` in `nums1Set` → skip. `4` not in `nums1Set` → push. `6` not in `nums1Set` → push. → `nums2Difference = [4,6]`

Result: `[[1,3],[4,6]]` ✓

## Complexity

**Time: O(n + m)** — building both Sets is O(n) + O(m); each subsequent walk-and-check pass is O(1) per element against the other Set, so O(n) and O(m) respectively. Total O(n+m), optimal — every element of both arrays must be looked at at least once.

**Space: O(n + m)** — both Sets stored in full, plus the two result arrays (bounded by n and m respectively).

## Submissions

- https://leetcode.com/problems/find-the-difference-of-two-arrays/submissions/2070263659 — Accepted, 202/202, 7ms runtime (beats 88.49%)

## Open Questions

None open for this problem — optimal approach, clean solve.
