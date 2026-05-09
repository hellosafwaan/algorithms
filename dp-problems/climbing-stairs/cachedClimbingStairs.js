function cachedClimbingStairs(n, cache = {}) {
    if (n === 1) return 1
    if (n === 2) return 2
    // If cache is hit use it
    if(n in cache) return cache[n]
    // If cache is a miss, compute and store it.
    cache[n] = cachedClimbingStairs(n - 1, cache) + cachedClimbingStairs(n - 2, cache)
    // return the computed value, so that it can be used in the call stack
    return cache[n]

}

module.exports = cachedClimbingStairs