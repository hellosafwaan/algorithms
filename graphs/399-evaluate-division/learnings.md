Session: [050_2026-07-05_evaluate-division.md](../../safwaan/sessions/050_2026-07-05_evaluate-division.md)

## How It Felt
Started this one with genuinely zero idea how to even approach it — fifth problem of the day, and the first one all session that felt like a real step up in difficulty. The graph-modeling part actually came together fast once I started thinking about it out loud. The part that wrecked me was the DFS combining logic — I kept almost getting it, fixing one thing, and breaking into a new bug. Complexity reasoning also felt genuinely hard here, "hard ass problem" energy, but breaking it into pieces (build cost, one query, then all queries) got me there.

## Key Insight
Division equations are secretly a weighted, directed graph. `a/b = 2.0` isn't just one fact — it's **two** directed edges: `a → b` with weight `2.0`, and `b → a` with weight `1/2.0`. Once you see that, a query like `a/c` stops being an algebra question and becomes "is there a path from `a` to `c`, and what's the product of the weights along it?"

The second, harder insight: searching for "any valid path that reaches a target" is different from the graph searches I'd done before. You need a way to say "this branch failed" that's distinct from any real answer — a sentinel value (`-1`, since real ratios are never negative) — and the moment you find a branch that *did* succeed, you have to stop and return immediately. If you keep looping after finding a success, you risk multiplying a dead branch's fake "found nothing, here's 1" result into your real answer, silently corrupting it.

## Solution Walkthrough

### Step 1 — see the graph
Take `a/b = 2.0`, `b/c = 3.0`, query `a/c`. Manually: `b = 3.0 × c` (from the second equation), substitute into the first: `a = 2.0 × b = 2.0 × 3.0 × c = 6.0 × c`, so `a/c = 6.0`. That's just chaining two known ratios — exactly what walking a path through a graph does, one edge at a time, multiplying weights as you go.

### Step 2 — build the graph
Each equation `[a, b]` with `values[i]` gives you two directed edges:
```js
function buildAdjacencyList(equations, values) {
    const graph = {};
    for (let i = 0; i < equations.length; i++) {
        const [a, b] = equations[i];
        const weight = values[i];
        if (!(a in graph)) graph[a] = [];
        if (!(b in graph)) graph[b] = [];
        graph[a].push([b, weight]);       // a -> b, weight
        graph[b].push([a, 1 / weight]);   // b -> a, reciprocal
    }
    return graph;
}
```
No bugs here on the first try — this part transferred cleanly from every other adjacency-list-building problem this session.

### Step 3 — answer one query
For a query `[src, dst]`: first, two instant failure checks — if `src` or `dst` never appeared in *any* equation, they're not in `graph` at all, so return `-1.0` immediately, no searching needed.

Otherwise, DFS from `src` toward `dst`, exactly like every other graph search this session — except now you're accumulating a **running product**, not just marking cells or cloning nodes:

```js
function dfs(graph, src, dst, visited) {
    if (src === dst) return 1;          // arrived — no more multiplication needed
    visited.add(src);
    const neighbors = graph[src];
    for (const [neighbor, weight] of neighbors) {
        if (!visited.has(neighbor)) {
            const result = dfs(graph, neighbor, dst, visited);
            if (result !== -1) return weight * result;  // found a path — stop immediately
        }
    }
    return -1; // every neighbor was a dead end
}
```

Here's the part that took several tries to get right, and it's worth understanding *why* each piece is there:

- **Base case:** if you're standing on `dst` already, you're done — the "remaining path" contributes nothing more to multiply, so `return 1` (multiplying by `1` is a no-op, which is exactly what you want).
- **`weight` has to actually be used.** My first draft destructured `[neighbor, weight]` from each edge but only ever multiplied by the *recursive result* — never by `weight` itself. That meant the entire ratio information from the graph was being silently thrown away. Traced against the simplest possible case (`a/b` with one direct edge) to catch this: the function was returning `1` instead of `2.0`.
- **The dead-end problem.** If a neighbor doesn't lead anywhere useful, what should its recursive call return? It needs to say "I failed" in a way that's unmistakably different from any real ratio — that's the `-1`. Without this, a dead-end branch would just return whatever a stray `answer` variable happened to hold (like an untouched `1`), and that fake "success" would get multiplied into the real answer from a different, actually-successful branch, wrecking it.
- **Return immediately on success.** The moment `result !== -1`, you've found a working path — `return weight * result` right there. Don't keep looping through the rest of the neighbors. If you keep going, and another neighbor *also* happens to lead somewhere (a second valid path, or worse, a partially-explored dead branch interacting weirdly with the shared `visited` set), you could multiply extra garbage into the answer.
- **If the loop finishes with no early return,** every neighbor was checked and none worked — `return -1`.

### Step 4 — tie it together
```js
function computeQuery(graph, src, dst, visited) {
    if (!(src in graph)) return -1.0;
    if (!(dst in graph)) return -1.0;
    return dfs(graph, src, dst, visited);
}

function calcEquation(equations, values, queries) {
    const graph = buildAdjacencyList(equations, values);
    const result = [];
    for (const [src, dst] of queries) {
        result.push(computeQuery(graph, src, dst, new Set()));
    }
    return result;
}
```
Note: a **fresh** `visited` Set gets created for every single query — one query's traversal never contaminates another's.

## Pattern Introduced
**Weighted Graph DFS with a search-and-accumulate sentinel.** Distinct from this session's earlier graph patterns:
- LC 200 (flood fill): boolean signal, "did I discover something new."
- LC 130 (region decision): collect a whole region, decide after the fact.
- LC 133 (clone-and-reuse): combine children's results unconditionally (every child contributes to the parent).
- **LC 399 (this one):** search for *any one* valid path among several branches, accumulating a value (the product) along the way, and use a sentinel (`-1`) to distinguish "this branch worked" from "this branch failed" — returning immediately the moment one branch succeeds, ignoring the rest.

## Watch Out For
- A destructured variable (`weight`) that's never actually used anywhere is easy to miss when the code otherwise "looks" complete — trace the simplest possible input (one direct edge, no branching) to catch this fast.
- `const` can't be reassigned — if you're building up a value across a loop (`answer = answer * x`), it needs `let`.
- Any time a recursive search is looking for "does a valid path/answer exist," you need a sentinel value distinguishable from every real answer, AND you need to return immediately once you find success — don't let the loop keep running and risk combining a real result with a dead branch's placeholder value.
- Build the graph once, but use a **fresh** `visited` Set per query — traversals for different queries must never share state.

## Trace Through
`equations = [["a","b"],["b","c"]]`, `values = [2.0, 3.0]`, query `a/c`:
`graph = {a: [[b,2.0]], b: [[a,0.5],[c,3.0]], c: [[b, 1/3]]}`.
`dfs("a","c",{})`: not equal, visit `a`, try neighbor `b` (weight 2.0) → `dfs("b","c",{a})`: not equal, visit `b`, skip `a` (visited), try `c` (weight 3.0) → `dfs("c","c",{a,b})`: equal → return `1`. Back up: `3.0 × 1 = 3.0`, return. Back up again: `2.0 × 3.0 = 6.0`, return. Final answer: `6.0`. Correct.

Branching dead-end case: `a` connects to both `b` (weight 2, leads to `d` via weight 3) and `c` (weight 5, dead end w.r.t. `d`). Query `a/d`: the loop tries `b` first, recurses, finds `d`, returns `2 × 3 = 6` immediately — the `c` branch is never even touched, because the function returned as soon as `b`'s branch succeeded.

## Complexity
**Time: O(E + Q(N + E))** — E = number of equations, Q = number of queries, N = number of distinct variables. Building the graph is one pass over the equations, O(E). Each query does its own **fresh** DFS (own `visited` Set, no reuse across queries) — in the worst case that traversal visits every node (N) and scans every neighbor list, totaling E edges, so O(N+E) per query. Across Q independent queries, that's O(Q(N+E)), plus the one-time O(E) build.

**Space: O(N + E)** for the graph itself; O(N) per query for `visited` and the recursion stack (not cumulative — each query's space is freed once that query finishes).

## Submissions
- https://leetcode.com/problems/evaluate-division/submissions/2057216346 (accepted, 61.94th percentile runtime)

## Open Questions
- **Union-Find (Weighted Disjoint Set Union)** — introduced conceptually this session (what problem it solves, `find`/`union`, path compression, union by rank/size) but not yet implemented anywhere. It's the canonical "better way" to solve this exact problem (near-O(1) queries after graph construction) and previews the pattern used later in Redundant Connection, Number of Connected Components, and Graph Valid Tree. Revisit properly when those come up — and optionally circle back to implement the weighted-union-find version of this problem itself.
- The "search for a valid path, accumulate a value, sentinel + return-on-success" pattern (#52) needed to be given directly after real struggle. Probe cold on the next problem with this shape — don't assume one guided pass means it's owned.
