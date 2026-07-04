Session: [048_2026-07-05_find-the-town-judge.md](../../safwaan/sessions/048_2026-07-05_find-the-town-judge.md)

## How It Felt
Third problem of the night, and it showed — this one was a grind. Brought an already-wrong attempt in, and it took a while to see that I'd only solved half the problem. Got the logic right in the end but needed more direct help than usual on the last couple of pieces (the `??` operator especially just wasn't coming to me at 3am).

## Key Insight
The judge isn't just "someone who trusts nobody" — that's only half the definition. The full condition is two-sided: **candidate p trusts nobody, AND everybody else trusts p.** My first attempt only ever checked the first half (out-degree 0), which meant it could return someone who trusts nobody but also isn't fully trusted by the town — not the actual judge.

Second piece: if you only track people who show up in `trust` (as either a truster or trustee), you'll miss anyone with zero involvement at all — like a town of exactly 1 person with no trust relationships, who's trivially the judge. The fix is to always loop over the full range `1` to `n`, never just over the keys of whatever map you happened to build.

## Solution Walkthrough
So the actual definition has two conditions, and you need both:
1. The judge trusts nobody → out-degree 0.
2. Every other person trusts the judge → in-degree exactly `n - 1`.

One pass over `trust` builds two counters: for every edge `[a, b]` (a trusts b), bump `inDegreeCount[b]` (someone now trusts b) and bump `outDegreeCount[a]` (a now trusts someone). After that one pass, you know both numbers for everyone who appears anywhere in `trust`.

Then — and this is the part that's easy to get wrong — loop from `1` to `n`, not over the keys of either count map. Why? Because a person who's mentioned nowhere in `trust` at all (no one trusts them, they trust no one) simply won't be a key in either object. If you loop over the map's keys, that person never gets checked, even though for a town of 1 person they'd trivially be the judge. Looping `1..n` guarantees everyone gets checked regardless of whether `trust` ever mentions them.

For each candidate `i`, check both conditions: `inDegreeCount[i] === n - 1` and `outDegreeCount[i] === 0`. But since a person might not appear in either map, `inDegreeCount[i]` could be `undefined` rather than `0` — so default it with `?? 0` before comparing. Return the first `i` that satisfies both; if nobody does, `-1`.

## Pattern Introduced
**Graph — In-degree / Out-degree Counting.** When a problem defines a special node by its relationship to *every other* node in a directed graph (not just its local neighbors), you typically need to track both directions separately — one counter per direction, built in a single pass over the edge list — rather than a single adjacency structure that only captures one direction.

## Watch Out For
- A two-sided definition ("X and Y") is easy to half-solve without noticing, especially when one condition is more visually obvious in your data structure than the other.
- `for...in` / `for...of` over a map you built from the edge list will always miss nodes with zero edges at all — loop over the known range instead.
- A single `=` inside a compound `if` condition silently turns a comparison into an assignment. No crash, just wrong output. When a boolean condition misbehaves with no exception thrown, check every `=` in it first.
- `map[key]` is `undefined`, not `0`, when the key was never set. Default with `?? 0` before comparing against a number — this is the same trick from Ransom Note.

## Template
```js
function findJudge(n, trust) {
    const inDegreeCount = {};
    const outDegreeCount = {};
    for (const [a, b] of trust) {
        inDegreeCount[b] = (inDegreeCount[b] ?? 0) + 1;
        outDegreeCount[a] = (outDegreeCount[a] ?? 0) + 1;
    }
    for (let i = 1; i <= n; i++) {
        if ((inDegreeCount[i] ?? 0) === n - 1 && (outDegreeCount[i] ?? 0) === 0) return i;
    }
    return -1;
}
```

## Trace Through
`n = 3, trust = [[1,3],[2,1]]` — the counterexample that broke my first attempt.
`inDegreeCount = {3: 1, 1: 1}`, `outDegreeCount = {1: 1, 2: 1}`.
- `i=1`: `inDegreeCount[1]=1`, need `n-1=2` → no match.
- `i=2`: `inDegreeCount[2]` undefined → `0`, need `2` → no match.
- `i=3`: `inDegreeCount[3]=1`, need `2` → no match (this is where my first attempt wrongly returned `3`, since it only checked `outDegreeCount[3]=0`).
Return `-1`. Correct — nobody in this town is trusted by both other people.

`n = 1, trust = []` — the isolated-person edge case.
Both maps empty. `i=1`: `(undefined ?? 0) === 0` on both checks → `true` → return `1`. Correct.

## Complexity
**Time: O(n + T)**, where `T = trust.length`. Building the two count maps is one pass over every edge (O(T)). Checking every candidate is one pass over every person (O(n)). These are genuinely independent quantities — `T` isn't bounded by `n`; in the worst case (everyone trusts everyone else) `T` can be as large as `n(n-1)`. Since the two passes are sequential, not nested, total time is their sum, not their product.

**Space: O(n)** — each count map holds at most one entry per person who appears in `trust`, so bounded by `n`.

## Submissions
- https://leetcode.com/problems/find-the-town-judge/submissions/2056279453 (accepted)

## Open Questions
- Retest `?? 0` recall in a fresh (non-3am) session — Ransom Note is already on the revisit queue and will show whether this is a real gap or just fatigue.
- Next directed-graph problem with a "special node" definition (in-degree/out-degree related): does the two-sided-condition trap (checking only one direction) resurface?
