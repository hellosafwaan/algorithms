function climbingStairs(n) {
    if (n === 1) return 1
    if (n === 2) return 2

    /*
        To reach step 3, i must have reached step 1 and step 2.
        so the number of ways in which i can reach step 3, would be 
        the sum of the number of ways i reached the previous two steps
    */
   return climbingStairs(n - 1) + climbingStairs(n - 2)
}

module.exports = climbingStairs;