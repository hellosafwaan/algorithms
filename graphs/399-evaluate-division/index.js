/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
function calcEquation(equations, values, queries) {
    const graph = buildAdjacencyList(equations, values);
    const result = [];
    for (let i = 0; i < queries.length; i++) {
        const [src, dst] = queries[i];
        const visited = new Set();
        const answer = computeQuery(graph, src, dst, visited);
        result.push(answer);
    }
    return result;
};

function buildAdjacencyList(equations, values) {
    const n = equations.length;
    const graph = {};
    for (let i = 0; i < n; i++) {
        const [a, b] = equations[i];
        const weight = values[i];
        if(!(a in graph)) graph[a] = [];
        if(!(b in graph)) graph[b] = [];
        graph[a].push([b, weight]);
        graph[b].push([a, 1 / weight]);
    }
    return graph;
}

function computeQuery(graph, src, dst, visited) {
    if(!(src in graph)) return -1.0
    if(!(dst in graph)) return -1.0
    return dfs(graph, src, dst, visited)
}

function dfs(graph, src, dst, visited) {
    if(src === dst) return 1;
    visited.add(src);
    const neighbors = graph[src]
    for (const [neighbor, weight] of neighbors) {
        if(!(visited.has(neighbor))) {
            const result = dfs(graph, neighbor, dst, visited);
            if(result > 0) return weight * result
        }
    }
    return -1;
}

