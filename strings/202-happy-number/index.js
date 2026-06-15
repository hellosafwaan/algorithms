/**
 * @param {number} n
 * @return {boolean}

 * Input: n = 19
 * Output: true
 * Explanation:
 * 1^2 + 9^2 = 82
 * 8^2 + 2^2 = 68
 * 6^2 + 8^2 = 100
 * 1^2 + 0^2 + 0^2 = 1
 */

function isHappy(n) {
    const valuesToBeSquared = new Set([n])
    let currentSquaredValue = n;
    while(currentSquaredValue !== 1) {
        const currentNumberToBeSquared = String(currentSquaredValue)
        let runningSquaredSum = 0;
        for (let i = 0; i < currentNumberToBeSquared.length; i++) {
            runningSquaredSum += Number(currentNumberToBeSquared[i]) * Number(currentNumberToBeSquared[i]);
        }
        if(valuesToBeSquared.has(runningSquaredSum)) return false;
        valuesToBeSquared.add(runningSquaredSum)
        currentSquaredValue = runningSquaredSum;
    }
    return true;

};

// This is solution to iterate over the number's digit without converting the number to a string.
// The iteration of the digits is done through pure maths. that's what the sumOfSquares does. 
// This pattern is very important to rememebr. 
function isHappy(n) {
    function sumOfSquares(n) {
        let squaredSum = 0;
        while (n > 0) {
            const digit = n % 10
            squaredSum += digit * digit;
            n = Math.floor(n / 10);
        }
        return squaredSum;
    }

    const numbersToBeSquared = new Set([n]);
    let currentNumberToBeSquared = n;
    while(currentNumberToBeSquared !== 1) {
        const number = sumOfSquares(currentNumberToBeSquared);
        if(numbersToBeSquared.has(number)) return false;
        numbersToBeSquared.add(number)
        currentNumberToBeSquared = number
    }
    return true;
};

/**
 * This is a much cleaner solution. I have complicated the logic a 
 * little bit in the above solution.  I have defined variable naming and variable assingment maybe complicated
 */
function isHappy(n) {
    function sumOfSquares(n) {
        let sum = 0;
        while (n > 0) {
            const digit = n % 10;
            sum += digit * digit;
            n = Math.floor(n / 10);
        }
        return sum;
    }

    const seen = new Set();
    while (n !== 1) {
        if (seen.has(n)) return false;
        seen.add(n);
        n = sumOfSquares(n);
    }
    return true;
}