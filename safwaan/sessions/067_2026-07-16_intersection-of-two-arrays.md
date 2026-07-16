# Session: Intersection of Two Arrays — 2026-07-16

## What He Attempted

Brought a fully working, self-written solution to the session (part of a self-directed sweep of "missing hashing problems," not curriculum-driven this session):

```js
function intersection(nums1, nums2) {
    const setNums1 = new Set(nums1);
    const setNums2 = new Set(nums2);
    result = []
    for (const number of setNums1) {
        if(setNums2.has(number)) result.push(number);
    }
    return result;
};
```

Accepted, 57/57 test cases, 1ms runtime (78.72nd percentile).

## Where He Got Stuck

Nowhere during solving — arrived with a correct, accepted solution. The only follow-up was his own question: "Do we have any better way to solve this?"

## Mistakes Made

`result = []` declared with no `const`/`let` — an implicit global. Same recurring shape as the LC 977 `right` bug (patterns.md #10), six weeks later, still not self-caught before submission. Flagged when reviewing the pasted code, not something he noticed himself.

## Key Insight

In his own words: "I saw that the arrays can contain duplicate elements, so while computing the intersection, I don't want duplicate elements to be a problem... The only purpose of converting them to sets was to avoid duplicate elements." Then, unprompted, extended the reasoning to a hypothetical: "In the case where the problem has a better constraint, like they don't contain duplicate elements, I would probably not need a set at all... a simple one-level iteration would be fine."

## Complexity Reached

Time: O(n + m) — Space: O(n + m). Already optimal — confirmed directly when he asked about a "better way": can't beat linear since every element of both arrays must be examined at least once.

## Coach Notes for Next Session

- Self-solved, no video, no hints needed on the algorithm itself — clean session.
- Correctly and unprompted reasoned about constraint-sensitivity (how the approach would change if the duplicate constraint were removed) — good instinct, distinct from but adjacent to the established "checks sorted-ness before committing to a strategy" habit.
- The implicit-global bug is now a 3rd occurrence across 6 weeks (LC 167/977 → LC 349), different variable name each time. Not yet self-caught proactively. Worth a direct pre-submission checklist callout next time it's relevant, rather than waiting for a 4th instance.
- Mentioned ES2024's native `Set.prototype.intersection` as a modern alternative when asked about better approaches — informational only, not load-bearing knowledge.
