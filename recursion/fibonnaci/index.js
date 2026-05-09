function fibonnaci(n) {
    if(n === 0) return 0;
    if(n === 1) return 1;
    return fibonnaci(n - 1) + fibonnaci(n - 2)
}

function fibonnaciOptimized(n, cache = {}) {
    if(n < 2) return n
    if(n in cache) return cache[n]
    cache[n] = fibonnaciOptimized(n - 1, cache) + fibonnaciOptimized(n - 2, cache)
    return cache[n]
}

console.time('naive');
console.log(fibonnaci(35))
console.timeEnd('naive');
console.time('optimized');
console.log(fibonnaciOptimized(35))
console.timeEnd('optimized');