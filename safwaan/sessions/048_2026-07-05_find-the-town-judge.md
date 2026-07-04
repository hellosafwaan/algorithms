# Session: Find the Town Judge (LC 997) — 2026-07-05

## What He Attempted
Third problem of the day (after LC 200 and LC 130). Brought a pre-written, already-wrong attempt:
```js
function findJudge(n, trust) {
    const graph = buildAdjacenyListFromEdges(trust);
    for (const key in graph) {
        if (graph[key].length === 0) return key;
    }
    return -1;
}
```
Built an adjacency list of who-trusts-whom, then returned the first person with an empty outgoing list.

## Where He Got Stuck
Traced against `n=3, trust=[[1,3],[2,1]]`: person 3 has out-degree 0 (nothing in `graph[3]`), so the code returns `"3"` — but person 3 is only trusted by 1 of the other 2 people, not both. Not the judge. First response to this counterexample was to (correctly, but separately) flag a different gap — isolated nodes missing from the graph entirely — rather than see the missing in-degree condition directly. Needed the full trace walked (build the graph object by hand, confirm what's actually in it) before the real gap surfaced: "everyone should trust the town judge" — he'd only ever checked "trusts nobody," never "is trusted by everyone else."

## Mistakes Made
- **Missing in-degree check entirely** (pattern #44) — solved one half of a two-part condition and treated it as the whole answer.
- **`outDegreeCount[b]++` instead of `[a]++`** — copy-paste residue from the adjacent `trustFreq[b]` block. Self-caught immediately once traced against `trust=[[1,2],[1,3]]` (same person trusting two others).
- **`=` instead of `===`** inside a compound boolean condition (pattern #45) — silent bug, no exception, would have produced wrong results. Caught in one question once isolated to "what operator is that."
- **Looping over object keys instead of 1 to n** — recurrence of the isolated-node gap he'd already flagged himself; needed to be walked through the `n=1, trust=[]` case twice (once before the `??` fix, once after) to see it actually still failed.
- **Missing `?? 0` default** (pattern #46) — even after switching to a `1..n` loop, `inDegreeCount[i]` is `undefined` for people with no incoming trust, and `undefined === 0` is `false`. Could not recall the `??` operator even when pointed directly at Ransom Note, where he'd used it before. Likely fatigue (3am, third problem of the day) — given directly.

## Key Insight
"Candidate p: trusts nobody. Everybody trusts p except p." — the two-sided definition, once stated explicitly, made the missing half obvious. Second insight: looping over the keys of a map you built from `trust` will always miss people who never appear in `trust` at all — the fix is to loop over the known range `1..n`, not over whatever happens to exist in an object.

## Complexity Reached
Time: O(n + T) where T = trust.length — first loop processes every edge once, second loop checks every person once; these are independent quantities (T can be as large as n(n-1), not bounded by n).
Space: O(n) — two count maps, each bounded by n entries.

## Coach Notes for Next Session
- This session ran late (started well into the night, ended ~3am) and was the third problem of the day. Energy and patience visibly dropped toward the end — several "idk" and one explicit "just tell me" on complexity. Don't read the `??` recall gap as a fresh, confirmed toolkit hole without a retest in a fresh session — check it again next time Ransom Note (LC 383) comes up on the revisit queue.
- Pattern #44 (checking only one half of a two-sided graph condition) is worth watching for on the next in-degree/out-degree style problem (e.g., Course Schedule's cycle detection touches similar directed-graph reasoning, though the condition shape is different).
- Good self-catch this session despite the fatigue: found his own `outDegreeCount[b]++` typo via one targeted trace, no hint given beyond the trace itself.
- Strongly recommend flagging pace/timing to Safwaan directly: three problems in one day, ending at 3am, is not sustainable pacing and likely degraded the quality of this session's learning relative to LC 130 earlier the same day.
