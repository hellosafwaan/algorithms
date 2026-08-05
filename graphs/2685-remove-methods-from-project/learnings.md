Session: [082_2026-08-05_remove-methods-from-project](../../safwaan/sessions/082_2026-08-05_remove-methods-from-project.md) — solved in a separate claude.ai chat session, logged here retroactively.

## How It Felt

Struggled to even parse the problem statement at first. Mid-session, after all tests finally passed: "Okay all test case passed. But I genuinely did not understand shit lol." Whether a later re-explanation (invited by the other session right at the end) actually happened and landed is not known — open question for next session.

## Key Insight

"Suspicious" is method `k` plus everything reachable from it by following the invocation arrows forward (direction matters — reachability, not connectivity). Removal is only safe if the suspicious set is fully "closed off": no method outside it directly invokes anything inside it. That second check needs no traversal at all — it's a single pass over the raw edge list, since "does an outside node directly invoke a suspicious one" is a one-hop question, not a reachability question.

## Solution Walkthrough

The problem is a directed graph dressed up in "methods and invocations" language. `invocations[i] = [a, b]` means "method `a` calls method `b`" — a directed edge, `a → b`. Method `k` has a bug, and so does anything reachable from it by following those arrows forward, however many hops away. That reachable set (including `k` itself) is "suspicious."

You want to delete every suspicious method — but only if it's safe. Safe means: no method *outside* the suspicious set has an edge pointing *into* it. If even one clean method calls into the suspicious group, deleting the group would leave that clean method calling something that no longer exists — not allowed. In that case, nothing gets removed at all, and the answer is every method, unchanged.

So the algorithm is two steps:

1. **Find the suspicious set.** DFS (or BFS) from `k`, following outgoing edges. Everything you can reach, including `k`, is suspicious.
2. **Check for a boundary violation.** Loop through the raw `invocations` array once. For each edge `[a, b]`: if `a` is *not* in the suspicious set but `b` *is*, that's a violation — some outside method calls into the group. The moment you find one, stop and return all methods, `0` to `n-1`, unchanged.
3. **If no violation is found**, it's safe to remove the suspicious set — return every method from `0` to `n-1` except the ones in that set.

The one thing worth calling out about step 2: it's tempting to think you need another traversal (starting from every "outside" node, checking if any of them can *reach* into the suspicious set) — but the rule only cares about *direct* invocation, not multi-hop reachability. A single pass over the edges you already have is enough.

Two structural bugs came up while building this, both worth remembering as general lessons, not just fixes for this problem:

**Undirected vs directed.** It's easy to instinctively push both `graph[a].push(b)` and `graph[b].push(a)` when building an adjacency list — but "a invokes b" is one-directional. `main()` calling `helper()` doesn't mean `helper()` calls `main()`. Only push one direction.

**The isolated-node trap, in a new form.** If a node never appears as a source in any edge (a "leaf" that invokes nothing), it never gets a key in the `graph` object — `graph[thatNode]` is `undefined`, and iterating over it crashes. Seeding both `a` and `b` when building the graph handles the common case. But there's a deeper version of this same trap: what if the *entire* `invocations` array is empty? Then even the starting node `k` never gets seeded, since it never appears anywhere at all. The fully general fix isn't "seed harder" — it's a **read-time guard** in the traversal itself: `const neighbors = graph[node] || []`. That's safe no matter which specific scenario caused the missing entry.

## Pattern Introduced

**Directed Graph Reachability + Single-Pass Boundary Check**

DFS/BFS to find a reachable set, then a single pass over the raw edge list (not a second traversal) to check whether any edge crosses the set's boundary from outside. The boundary check is a one-hop question — resist the urge to reach for another graph traversal for it.

## Watch Out For

- **Directed means one direction only.** Don't reflexively push both `graph[a].push(b)` and `graph[b].push(a)` unless the relationship is genuinely symmetric.
- **Guard `graph[node]` at read-time, not just write-time.** Seeding nodes when building the graph covers the common case (leaf nodes), but a read-time guard (`graph[node] || []`) survives every scenario, including a completely empty edge list where even the traversal's starting node never gets seeded.
- **Check `visited` immediately after popping, before exploring neighbors** — pushing all of a node's neighbors unconditionally (even ones already visited) causes infinite loops on cyclic graphs, since a node can get re-pushed onto the stack indefinitely.
- **Always declare loop/destructuring variables with `let`/`const`.** `[a, b] = edge;` without a keyword is an implicit global — same recurring bug shape logged multiple times before (patterns.md #10), now confirmed to happen outside Claude Code too.
- **A `.filter()` predicate returning `true` means "keep it."** Double-check which direction the condition should go — `suspiciousNodes.has(node)` alone keeps the suspicious ones; you want `!suspiciousNodes.has(node)` to discard them.

## Template

```javascript
function remainingMethods(n, k, invocations) {
    const graph = buildGraph(invocations);
    const suspiciousNodes = dfs(k, graph);

    const result = [];
    for (let i = 0; i < n; i++) result.push(i);

    for (let i = 0; i < invocations.length; i++) {
        const [a, b] = invocations[i];
        if (!suspiciousNodes.has(a) && suspiciousNodes.has(b)) return result;
    }

    return result.filter((node) => !suspiciousNodes.has(node));
}

function dfs(source, graph) {
    const stack = [source];
    const visited = new Set();
    while (stack.length > 0) {
        const currentNode = stack.pop();
        if (visited.has(currentNode)) continue;
        visited.add(currentNode);
        const neighbors = graph[currentNode] || [];
        for (let i = 0; i < neighbors.length; i++) stack.push(neighbors[i]);
    }
    return visited;
}

function buildGraph(edges) {
    const graph = {};
    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        if (!(a in graph)) graph[a] = [];
        if (!(b in graph)) graph[b] = [];
        graph[a].push(b);
    }
    return graph;
}
```

## Trace Through

`n=5, k=0, invocations=[[1,2],[0,2],[0,1],[3,4]]`

`buildGraph`: `{0: [2,1], 1: [2], 2: [], 3: [4], 4: []}`

`dfs(0, graph)`: stack starts `[0]` → pop 0, visited={0}, push [2,1] → stack=[2,1] → pop 1, visited={0,1}, push [2] → stack=[2,2] → pop 2, visited={0,1,2}, push [] → stack=[2] → pop 2, already visited, skip → stack empty. `suspiciousNodes = {0,1,2}`.

Boundary check over `invocations`: `[1,2]` → both suspicious, fine. `[0,2]` → both suspicious, fine. `[0,1]` → both suspicious, fine. `[3,4]` → neither suspicious, fine. No violation found.

Return `[0,1,2,3,4].filter(n => !suspicious.has(n))` → `[3,4]`. ✓ (matches the example)

## Complexity

**Time: O(V + E).** Building the graph is O(E). The DFS visits each node once and each edge once (bounded by the `visited` check). The boundary check is one more O(E) pass. The final filter is O(V). Total: O(V + E).

**Space: O(V + E).** The adjacency list is O(E); the `visited`/suspicious Set and the result array are O(V).

## Alternative Approaches

BFS instead of DFS for step 1 — identical complexity, just a queue instead of a stack; the choice doesn't matter here since only the *set* of reachable nodes is needed, not any ordering or shortest-path property. Not implemented/discussed in the session.

## Submissions

- [Accepted](https://leetcode.com/problems/remove-methods-from-project/submissions/2095219683) — 2026-08-05

## Open Questions

- Did the final re-explanation (invited by the other Claude session right at the end) actually happen, and did it land? Not visible in the shared transcript — ask directly next session.
- Does the "fix the specific trigger vs. the general root cause" distinction (patterns.md #80) get applied proactively on the next bug found — asking "is this fix general enough?" before moving on?
- Does the missing-declaration-keyword bug (patterns.md #10, now 5 occurrences across two different tools/sessions) ever get self-caught before being flagged?
