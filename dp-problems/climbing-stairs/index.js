const climbingStairs = require('./climbingStairs');
const cachedClimbingStairs = require('./cachedClimbingStairs');

console.time('climbingStairs(35)')
console.log(climbingStairs(35))
console.timeEnd('climbingStairs(35)')

console.time('climbingStairs(40)')
console.log(climbingStairs(40))
console.timeEnd('climbingStairs(40)')
// Computing n = 50 will take atleast 40s
// console.time('climbingStairs(50)')
// console.log(climbingStairs(50))
// console.timeEnd('climbingStairs(50)')

console.time('cachedClimbingStairs(35)')
console.log(cachedClimbingStairs(35))
console.timeEnd('cachedClimbingStairs(35)')

console.time('cachedClimbingStairs(40)')
console.log(cachedClimbingStairs(40))
console.timeEnd('cachedClimbingStairs(40)')

console.time('cachedClimbingStairs(50)')
console.log(cachedClimbingStairs(50))
console.timeEnd('cachedClimbingStairs(50)')
console.time('cachedClimbingStairs(75)')
console.log(cachedClimbingStairs(75))
console.timeEnd('cachedClimbingStairs(75)')

console.time('cachedClimbingStairs(100)')
console.log(cachedClimbingStairs(100))
console.timeEnd('cachedClimbingStairs(100)')

console.time('cachedClimbingStairs(125)')
console.log(cachedClimbingStairs(125))
console.timeEnd('cachedClimbingStairs(125)')

