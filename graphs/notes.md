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
