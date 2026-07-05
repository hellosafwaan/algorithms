Session: [049_2026-07-05_clone-graph.md](../../safwaan/sessions/049_2026-07-05_clone-graph.md)

## How It Felt
Fourth problem of the day, but a completely different feel from the previous one (Find the Town Judge, which ran to 3am) — sharp again, mostly self-driven, only needed small mechanical nudges. Built three full solutions this time because I wanted to actually see the DFS-vs-BFS distinction proven, not just told.

## Key Insight
Two, stacked on top of each other:

1. **"Add it before recursing, or we end up in an infinite loop."** Same rule as Number of Islands (mark visited before recursing), applied fresh to a completely different problem shape. A `Map` from original node → clone plays the exact same role `visited` played there — except this time it's not just "have I seen this," it's "give me back the specific clone I already made," which is why it has to be a `Map` and not a `Set`.

2. **DFS vs BFS is not about recursion vs loops — it's about which end of the pending-work list you take from.** Proved this directly by writing the iterative BFS and iterative DFS versions back to back: they are identical code except for one single line. `queue.shift()` (take the oldest thing) gives you BFS. `stack.pop()` (take the newest thing) gives you DFS. Nothing else about the algorithm changes.

## Solution Walkthrough

### The setup — what are you actually working with?
First thing to get straight: the array-of-arrays you see in LeetCode's examples (`[[2,4],[1,3],[2,4],[1,3]]`) is just how they *display* the test case for you to read — it's never what your function receives. Your function gets a real `Node` object (or `null`, for an empty graph), and `node.neighbors` is already an array of real `Node` references. You never touch the array format yourself. And you return a `Node` too — specifically, a **brand new** node with the same `.val`, whose `.neighbors` contains brand new clones of the original neighbors, recursively, all the way through the connected graph. Nothing in your output should ever point back into the original input.

### Solution 1 — Recursive DFS
The plan: clone the starting node, then walk its neighbors and clone each one too. Sounds simple, but there's a trap the moment the graph has a cycle — and every graph in this problem is undirected, so cycles are the norm, not the exception (even a 2-node graph where A and B are each other's only neighbor is a cycle).

Trace it naively: clone A, look at A's neighbors, find B, clone B, look at B's neighbors, find A again. If you just re-clone A here, you clone B's neighbor, which reclones A's neighbor, forever. So before you can even write this, you need an answer to: *how do I know I've already cloned something, and how do I get back the clone I already made (not just know that I made one)?*

That "get back the clone" requirement is exactly why this is a `Map`, not a `Set` — a `Set` only tells you membership, but you need the actual clone object to attach as a neighbor. `Map` in JS can use object references as keys directly too (no string conversion, unlike plain `{}`), so `map.set(originalNode, itsClone)` and later `map.get(originalNode)` works perfectly using reference equality.

Now the ordering, which is the real crux: you must register the new clone in the map **before** you recurse into its neighbors — not after. Walk the A/B cycle again with that order: `clone(A)` creates A's clone and registers it immediately, *then* recurses into B. `clone(B)` creates B's clone, registers it, then recurses back into A. This second call to `clone(A)` checks the map first — A is already there — so it just returns the existing clone instead of recursing again. Cycle broken, no duplicate, no infinite loop. If you register *after* recursing instead, that check would still find nothing when the cycle circles back, and you're stuck forever.

So the shape is: check the map first (reuse if found), otherwise create a stub clone with empty neighbors and register it immediately, then loop over the original neighbors, recursively clone each one, and push the results into the stub's neighbors array, then return it.

### Solution 2 — Iterative BFS
Same map, same "register the moment you discover something, not the moment you finish it" rule — just no recursion. A queue holds nodes that have been discovered but not yet had their own neighbor list processed. Start by registering the start node and pushing it onto the queue. Then: pop the oldest thing off the queue, look at all of *its* neighbors, and for each one — clone it and enqueue it if it's brand new, or just note that it already exists — then wire the edge either way (push the neighbor's clone into the current node's clone's neighbor list). Repeat until the queue's empty.

### Solution 3 — Iterative DFS
Take Solution 2 and change exactly one thing: instead of `queue.shift()` (take the oldest), use `stack.pop()` (take the newest). That's the entire difference. Everything else — the map, the registration rule, the wiring — is untouched.

Why does that one change flip BFS into DFS? Because "take the newest" means the node you *just* discovered gets processed immediately, before any of its siblings — so you dive straight down one path as deep as it goes before backing out. "Take the oldest" means you finish everything you already knew about before touching anything new — so you spread outward one full layer at a time. The traversal *order* is a direct consequence of which end of that list you read from, nothing else.

## Pattern Introduced
**Graph Traversal — Clone-and-Reuse via Map.** When you need to duplicate a graph (or any structure with possible cycles) node-by-node:
- A `Map` from original → clone (not a `Set`) — you need to retrieve the actual clone, not just know it exists.
- Register a node's clone the moment you *discover* it (create the stub, add to map) — before you finish building its full connections. This is what breaks cycles, whether you're using recursion or an explicit queue/stack.
- The traversal order (DFS vs BFS) is a separate, independent choice from the clone-and-reuse logic — the same map-based safety works underneath either one.

## Watch Out For
- Calling a constructor function without `new` — `_Node(val, neighbors)` silently does *not* create a new object (no error thrown, just wrong/undefined result). Always `new _Node(...)`.
- Passing the *original* node's `neighbors` array straight into a "clone" — that just shares the same array and the same un-cloned neighbor references. Build a fresh array of freshly-cloned neighbors instead.
- Don't reuse an outer function's parameter name as a loop variable (`for (const node of node.neighbors)`) — it happens to still work in JS due to scoping order, but it's a serious readability trap and an easy way to accidentally reference the wrong thing inside the loop.
- Saying the "register before recursing" rule out loud correctly doesn't guarantee your code actually does it in that order — trace the exact cycle example against your literal code to verify, don't just trust that you understand it.

## Template

**Recursive DFS:**
```js
function cloneGraph(node) {
    if (node === null) return null;
    const clonedNodes = new Map();
    return clone(node, clonedNodes);
}
function clone(node, clonedNodes) {
    if (clonedNodes.has(node)) return clonedNodes.get(node);
    const clonedNode = new _Node(node.val, []);
    clonedNodes.set(node, clonedNode);
    clonedNode.neighbors = node.neighbors.map(n => clone(n, clonedNodes));
    return clonedNode;
}
```

**Iterative BFS:**
```js
function cloneGraph(node) {
    if (node === null) return null;
    const clonedNodes = new Map();
    clonedNodes.set(node, new _Node(node.val, []));
    const queue = [node];
    while (queue.length > 0) {
        const current = queue.shift();
        for (const neighbor of current.neighbors) {
            if (!clonedNodes.has(neighbor)) {
                clonedNodes.set(neighbor, new _Node(neighbor.val, []));
                queue.push(neighbor);
            }
            clonedNodes.get(current).neighbors.push(clonedNodes.get(neighbor));
        }
    }
    return clonedNodes.get(node);
}
```

**Iterative DFS:** identical to the above, just `stack.pop()` instead of `queue.shift()`.

## Trace Through
A/B two-node cycle, `A.neighbors=[B]`, `B.neighbors=[A]` (recursive DFS):
`clone(A)` → not in map → create cloneA, `map.set(A, cloneA)` → recurse into B.
`clone(B)` → not in map → create cloneB, `map.set(B, cloneB)` → recurse into A.
`clone(A)` (second call) → **is** in map now → return existing `cloneA`. No infinite loop.
Back in `clone(B)`: `cloneB.neighbors = [cloneA]`. Back in `clone(A)`: `cloneA.neighbors = [cloneB]`. Final graph correctly mirrors the cycle, with two entirely new node objects.

Full interactive comparison of all three solutions, with the original and clone graphs rendered side by side as they build: [index.html](index.html).

## Complexity
**Time: O(V + E)** — V = nodes, E = edges. The map guarantees each node is created and fully processed exactly once (O(V)); the total work spent iterating every node's `neighbors` list, across the whole graph, is bounded by the total edge count (O(E)). These are additive, not nested, so it's O(V+E), not O(V·E).

**Space: O(V)** — the map holds one entry per node. The recursive version can also use O(V) call-stack depth in the worst case (a long chain); the iterative versions avoid that entirely since there's no recursion.

## Submissions
- Recursive DFS: https://leetcode.com/problems/clone-graph/submissions/2056863764 (accepted, 13.68th percentile runtime — recursion overhead)
- Iterative BFS: https://leetcode.com/problems/clone-graph/submissions/2056865654 (accepted, 84.25th percentile runtime)
- Iterative DFS (explicit stack): written and compared in the visualiser, not separately submitted (identical performance profile to BFS expected, since it's the same code shape).

## Open Questions
- Does the "which end of the pending-work list" framing for DFS/BFS stick better than the stack/queue framing from LC 200? Probe on the next graph traversal problem — if confusion resurfaces a third time, try yet another framing.
- Could the clone-and-reuse-via-map pattern apply to other "duplicate a structure with possible cycles" problems? What's the general shape beyond graphs (e.g., linked lists with random pointers — LC 138 is already on the curriculum and uses the exact same map-based clone trick)?
