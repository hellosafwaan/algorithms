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
