# Graphs — Topic Notes

## Grid as Graph
A 2D grid is a graph in disguise: every cell is a node, and each cell has up to 4 edges (up, down, left, right — 8 if diagonals count). "Islands," "regions," "areas" → connected components of land cells.

## DFS vs BFS — the load-bearing fact
**The data structure holding pending work defines the traversal — not how the code reads.**

| | DFS | BFS |
|---|-----|-----|
| Data structure | Stack (or the call stack, via recursion) | Queue |
| Order | Commit to one direction, go as deep as possible, back up | Visit everything at distance 1, then distance 2, ... |
| Natural fit | "Is there a path / flood everything reachable / count components" | "Shortest path / minimum steps / level by level" |
| Grid risk | Recursion depth O(m·n) on one giant region — stack overflow on huge inputs | None (heap-allocated queue) |

**Trap (LC 200):** four recursive calls written in a row *look* like visiting a layer (BFS). They aren't — the first call runs to completion before the second starts. Sequential calls ≠ a layer; recursion depth hides inside the first call.

## Flood Fill (Grid DFS) — pattern
Introduced at LC 200. Structure:
1. **Outer scan** — double loop offers every cell to the recursive helper.
2. **Self-guarding recursion** — the helper checks its own validity at the top (bounds → invalid cell → visited), so callers recurse blindly with no pre-checks. Bounds check must come first (`grid[-1][c]` throws).
3. **Mark visited BEFORE recursing** — otherwise neighbours re-enter each other forever.
4. **Return a signal to the scanner** — `true` = "this call was a flood origin / discovered something new." Exactly one cell per component can ever return true.

Template: see [200-number-of-islands/learnings.md](200-number-of-islands/learnings.md).

## Visited tracking options
- **Set of `'r,c'` strings** — keys must be primitives; `Set.has([r,c])` is always false (reference equality).
- **Mutate the grid** (`'1'` → `'0'` as you flood) — O(1) auxiliary space, but mutates input; name the trade-off out loud in an interview.

## Complexity of grid flood fill
O(m·n) time — each cell is marked at most once; rejected probes are O(1) and bounded by 4 per cell. Not O((m·n)²) despite the outer loop calling the helper everywhere: visited makes repeat calls constant-time bounces. Space O(m·n): visited Set + worst-case recursion depth (snake-shaped single island).

## Flood Fill — Region Decision variant (LC 130, Surrounded Regions)
Sometimes a per-cell boolean signal (LC 200's "did this flood a new island?") isn't enough — you need to know a property of the *whole region* before deciding what to do with any of its cells (e.g., "does this region touch the border?"). Extend the flood fill:
1. The walk **collects every coordinate it touches into a per-region array**, not just a boolean.
2. The verdict (safe / captured) can only be computed once the walk is fully complete — never decide mid-walk, and never stop the walk early even if you already know the answer (the rest of the region still needs to be marked `visited`, or the outer loop will re-discover it and redo the work).
3. **Decide, then act, as two separate passes** over the collected array. You can't merge "check the condition" with "apply the consequence" — a disqualifying cell found late would otherwise invalidate action already taken on earlier cells.

**Canonical alternative — Border-first flood fill:** instead of walking from every cell and checking after the fact, flood *only from the cells already on the border*, marking everything reachable as safe (mutate the board itself, e.g. `'O'` → `'#'`, using the board as the visited-tracker — no separate Set needed). One final full-board pass: anything still in the original "unsafe" state was never reached, so it gets the fate applied; anything marked safe gets restored. Same O(m·n) time, but O(1) auxiliary space instead of O(m·n) for a Set + per-region arrays. See [130-surronded-regions/learnings.md](130-surronded-regions/learnings.md) for both versions side by side, plus an interactive comparison visualiser.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 130 — Surrounded Regions | Region decision (walk full region, decide after) | Collect per-region array during the walk; decide safe/captured only once complete; two separate passes (decide, then act) |

## In-degree / Out-degree Counting
When a problem defines a special node by its relationship to *every other* node in a directed graph (not just local structure), track both directions separately — one counter per direction, built in a single pass over the edge list. A single adjacency list only captures one direction and will miss half of a two-sided condition (e.g., "trusts nobody AND is trusted by everyone").

**Isolated-node trap:** looping over the keys of a map built from the edge list misses any node with zero edges at all. Loop over the known range (`1..n`) instead, defaulting missing map entries with `?? 0`.

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 997 — Find the Town Judge | Two-sided directed-graph condition | Judge = out-degree 0 AND in-degree n-1. Track both counts in one pass; loop 1..n (not map keys) so isolated people are checked; default missing counts with `?? 0` |

## Graph Traversal — Clone-and-Reuse via Map
When duplicating a graph (or any cyclic structure), track original→clone with a `Map` (not a `Set` — you need to retrieve the clone, not just know it exists). Register a node's clone the instant it's discovered (before recursing/enqueueing further) — this is what breaks cycles, regardless of whether you use recursion, a queue, or a stack.

**DFS vs BFS is purely about which end of the pending-work list you take from** — not recursion vs loops. An iterative BFS and iterative DFS solution to the same problem can be identical code except for one line: `queue.shift()` (oldest first → BFS) vs `stack.pop()` (newest first → DFS).

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 133 — Clone Graph | Clone-and-reuse via Map, 3 traversal variants | Register clone before recursing (cycle-safety); Map for reference-keyed lookup; DFS/BFS distinction proven by a one-line diff between iterative versions |

## Weighted Graph DFS — Search-and-Accumulate with a Sentinel
When a graph problem asks you to find *any one* valid path and compute something along it (not just check reachability), the DFS needs to accumulate a running value (e.g., a product) AND use a sentinel (a value impossible as a real answer, like `-1`) to distinguish "this branch found the target" from "this branch dead-ended."

**Critical structural point:** return **immediately** the moment a branch succeeds (`result !== sentinel`) — don't keep looping through remaining neighbors. Otherwise a dead branch's placeholder/failure value can get combined into an already-correct answer from an earlier successful branch.

Each "equation" style input (`a op b = value`) often models as **two** directed edges: the given relationship, and its inverse (e.g., division → reciprocal weight).

| Problem | Flavor | Key Insight |
|---------|--------|-------------|
| LC 399 — Evaluate Division | Weighted graph, search + accumulate product | Each equation → 2 directed edges (value + reciprocal); DFS multiplies weights along the path; `-1` sentinel for dead ends; return immediately on success, don't keep looping. Canonical alternative: Weighted Union-Find (near-O(1) queries after graph build) — not yet implemented, flagged for when Union-Find is formally introduced (Redundant Connection, Connected Components, Graph Valid Tree). |
