# DSA Vocabulary

Terms encountered during sessions, defined concisely.

---

## Sentinel value
A special value returned from a function to signal an error or exceptional state, disguised as the normal return type. Used to avoid mixing types.

**Example:** In Balanced Binary Tree (LC 110), `dfs` returns `-1` instead of a real height when the subtree is unbalanced. Callers check `if (result === -1)` to propagate the signal up without needing a separate boolean.

**Why it matters:** Lets you keep a single return type (number) while still communicating two distinct things: a valid answer vs. a failure state.

---
