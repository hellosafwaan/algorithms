# Session: Find the Difference of Two Arrays — 2026-07-16

## What He Attempted

Second problem of the same "missing hashing problems" sweep, right after LC 349. Brought a fully working, self-written solution:

```js
function findDifference(nums1, nums2) {
    const nums1Set = new Set(nums1);
    const nums2Set = new Set(nums2);
    const nums1Difference = [];
    const nums2Difference = [];
    for(let number of nums1Set) {
        if(!nums2Set.has(number)) nums1Difference.push(number);
    }
    for(let number of nums2Set) {
        if(!nums1Set.has(number)) nums2Difference.push(number);
    }
    return [nums1Difference, nums2Difference];
};
```

Accepted, 202/202 test cases, 7ms runtime (88.49th percentile), 62.01MB memory (49.14th percentile).

## Where He Got Stuck

Nowhere — correct on arrival, no debugging needed.

## Mistakes Made

None. Notably, both result arrays were correctly declared with `const` this time — no repeat of the implicit-global slip from the immediately preceding LC 349 session.

## Key Insight

In his own words: "I saw that one of the inputs also contains duplicate elements, so I don't want that coming in when finding the difference... that's the reason for using a set." Then walked the two-direction structure cleanly and unprompted: iterate one array's Set, keep non-members of the other Set, then do the same in reverse.

## Complexity Reached

Time: O(n + m) — Space: O(n + m). Already optimal, same reasoning as LC 349 (every element of both arrays must be examined at least once).

## Coach Notes for Next Session

- Correctly identified this as the mirror image of LC 349 (Intersection) without being told — same Set-and-check shape, condition negated, run twice.
- Clean own-words explanation given unprompted this time (unlike some recent stack-phase sessions where it was declined) — good sign, no ownership concerns here.
- No implicit-global slip this time, right after it appeared at LC 349. Single clean data point — don't close the open question yet (carry-forward.md), but worth watching whether this holds on the next few array/result-accumulator problems.
