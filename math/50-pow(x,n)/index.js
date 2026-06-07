/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */

function myPow(x, n) { // This soultion doesnt handle negative poweres
    let result = x
    for (let i = 2; i <= n; i++) {
        result = result * x
    }
    return result
};

function myPow(x, n) { // This soultion doesn't handle when the power of the value is 0
    let poweredValue = x;
    let timesToBePoweredBy = Math.abs(n)
    for (let i = 2; i <= timesToBePoweredBy; i++) {
        poweredValue = poweredValue * x
    }
    if(n < 0) {
        return 1 / poweredValue
    } else {
        return poweredValue
    }
};


function myPow(x, n) { // This soultion passed 302 / 307 testcases. Brute force is not working. 
    let poweredValue = 1;
    let timesToBePoweredBy = Math.abs(n)
    for (let i = 1; i <= timesToBePoweredBy; i++) {
        poweredValue = poweredValue * x
    }
    if(n < 0) {
        return 1 / poweredValue
    } else {
        return poweredValue
    }
};


// Let me try  recursion, recursion is another kind of iteration
/**
 * 
 * Well, this function handles values of n greater than one, 
 * so it handles all positive numbers, but it fails when n 
 * is equal to zero. It goes into an infinite recursion because
 * there is no base case for that, so we need to have an explicit 
 * base case for n is equal to zero. 
 */
function myPow(x, n) {
    if (n === 1) {
        return x;
    }
    return x * myPow(x, n - 1)
}

/**
 * Now this solution handles all the values of exponents, 
 * that is, from 0 to n, but it does not handle values from 
 * minus n. All negative n are not handled. 
 */

function myPow(x, n) {
    if (n === 0) {
        return 1;
    }
    if (n === 1) {
        return x;
    }
    return x * myPow(x, n - 1)
}


// Removd the unnessary condition that will automatically handled by the recursive relation.
function myPow(x, n) {
    if (n === 0) {
        return 1;
    }

    if(n < 0) {
        return (1 / x) * myPow(x, n + 1)
    }

    return x * myPow(x, n - 1)
}


// This was the divide and conquor solution using mathetmatical proof
function myPow(x, n) {
    if (n === 0) {
        return 1;
    }

    if (n < 0) return 1 / myPow(x, -n)
    const powerOfHalfed = myPow(x, Math.floor(n/2))
    if(n % 2 === 0) {
        return powerOfHalfed * powerOfHalfed
    }
    else return x * powerOfHalfed * powerOfHalfed
}