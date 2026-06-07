# Session: Contains Duplicate (LC 217) — 2026-06-07

## What He Attempted

Described the approach verbally before writing a single line of code: iterate the array, add unseen elements to a data structure, check before each insert, return true if seen, return false at the end. Went straight to HashMap — never considered brute force.

```js
function containsDuplicate(nums) {
    const n = nums.length;
    const seen = {};
    for (let i = 0; i < n; i++) {
        const currentElement = nums[i]
        if(seen[currentElement]) return true;
        else seen[currentElement] = true;
    }
    return false;
}
```

Submitted. Accepted, 13th percentile.

## Where He Got Stuck

Not stuck on approach at all. One edge case missed: `if(seen[currentElement])` is falsy when `currentElement` is `0` because `seen[0]` evaluates to `undefined`. Caught immediately after one prompt ("what does `seen[currentElement]` evaluate to when `currentElement` is `0`?"). Fixed to `!== undefined`.

## Mistakes Made

- `if(seen[currentElement])` fails for `0` — falsy check. Fixed to `!== undefined`. (caught when prompted, not pre-empted)
- Used plain object instead of Set — JS converts number keys to strings on object access, adding overhead → 13th percentile. Swapped to Set → 65th percentile.

## Key Insight

HashMap clicked immediately — no brute force considered. Then independently observed that Set is more appropriate for this class of problem: "whenever we're working with a duplicate problem, ideally the Set solution should come first" — membership tracking has no falsy edge case and no key-type conversion overhead.

## Complexity Reached

Time: O(n) — Space: O(n)

## Coach Notes for Next Session

- HashMap/Set pattern recognition is now solid. Don't explain the motivation for the data structure — he already sees it.
- The "Set first for membership, HashMap when you need a value" heuristic was self-articulated — worth probing cold in a future session to see if it sticks.
- Falsy-zero bug (`if(obj[key])` instead of `key in obj`) — he catches it when prompted, doesn't pre-empt it yet. Watch for this in future HashMap problems.
- Next: Trapping Rain Water (LC #42), or Valid Anagram / Group Anagrams for Phase 1 cleanup.
