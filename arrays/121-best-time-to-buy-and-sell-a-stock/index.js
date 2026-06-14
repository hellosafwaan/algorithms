/**
 * @param {number[]} prices
 * @return {number}
 * 
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
 * Note that buying on day 2 and selling on day 1 is not allowed because you 
 * must buy before you sell.
 * 
 * Example 2:
 * Input: prices = [7,6,4,3,1]
 * Output: 0
 * Explanation: In this case, no transactions are done and the max profit = 0.
 */
function maxProfit(prices) {
    const n = prices.length;
    const maxProfits = [];
    for (let i = 0; i < n; i++) {
        const buyingPrice = prices[i];
        let maxSellingPrice = -1;
        for (let j = i + 1; j < n; j++) {
            const currentSellingPrice = prices[j]; 
            if(currentSellingPrice > maxSellingPrice) maxSellingPrice = currentSellingPrice; 
        }
        if(i !== n - 1) {
            // const profitMade = maxSellingPrice - buyingPrice
            // if (profitMade < 0) maxProfits[i] = 0;
            // else maxProfits[i] = profitMade
            // Easier way to write than above is below (only the commented section)
            maxProfits[i] = Math.max(0, maxSellingPrice - buyingPrice) 
        } else {
            maxProfits[i] = 0;
        }
        
    }
    let maximumProfit = -1;
    for (let i = 0; i < n; i++) {
        maximumProfit = Math.max(maximumProfit, maxProfits[i]);
    }
    return maximumProfit;
};


/**
 * @param {number[]} prices
 * @return {number}
 * 
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
 * Note that buying on day 2 and selling on day 1 is not allowed because you 
 * must buy before you sell.
 * 
 * Example 2:
 * Input: prices = [7,6,4,3,1]
 * Output: 0
 * Explanation: In this case, no transactions are done and the max profit = 0.
 */

function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    const n = prices.length;
    for (let i = 0; i < n; i++) {
        const currentPrice = prices[i];
        if (currentPrice < minPrice) {
            minPrice = currentPrice;
        }
        const currentProfit = currentPrice - minPrice;
        if (currentProfit >  maxProfit) {
            maxProfit = currentProfit;
        }
    }
    return maxProfit
}


/**
 * Input: prices = [7,1,5,3,6,4]
 * 
 * 
 * minPrice = Infinity
 * maxProfit = 0
 * n = 6
 * prices = [7,1,5,3,6,4]
 * 
 * i = 0
 *  currentPrice = 7
 *  currentPrice < minPrice => 7 < Infinity => true
 *  minPrice = 7
 *  currentProfit = currentPrice - minPrice = 0 
 *  currentProfit > maxProfit =>  0 > 0 => false 
 *
 * 
 * Variable State before Iteration
 * 
 * minPrice = 7
 * maxProfit = 0
 * n = 6
 * prices = [7,1,5,3,6,4]
 * 
 * i = 1
 *  currentPrice = 1
 *  currentPrice < minPrice => 1 < 7 => true
 *  minPrice = 1
 *  currentProfit = currentPrice - minPrice = 1 - 1 => 0 
 *  currentProfit > maxProfit =>  0 > 0 => false 
 *
 * 
 * Variable State before Iteration
 * 
 * minPrice = 1
 * maxProfit = 0
 * n = 6
 * prices = [7,1,5,3,6,4]
 * 
 * i = 2
 *  currentPrice = 5
 *  currentPrice < minPrice => 5 < 1 => false
 *  currentProfit = currentPrice - minPrice = 5 - 1 => 4
 *  currentProfit > maxProfit =>  4 > 0 => true
 *  maxProfit = 4; 
 * 
 * Variable State before Iteration
 * 
 * minPrice = 1
 * maxProfit = 4
 * n = 6
 * prices = [7,1,5,3,6,4]
 * 
 * i = 3
 *  currentPrice = 3
 *  currentPrice < minPrice  => 3 < 1 => false
 *  currentProfit = currentPrice - minPrice => 3 - 1 => 2
 *  currentProfit > maxProfit => 2 > 4 => false => so you don't update the maxProfit
 * 
 * Variable State before Iteration
 * 
 * minPrice = 1; 
 * maxProfit = 4;
 * n = 6; 
 * prices = [7,1,5,3,6,4]
 * 
 * i = 4; 
 *  currentPrice = 6
 *  currentPrice < minPrice  => 6 < 1 => false
 *  currentProfit = currentPrice - minPrice => 6 - 1 => 5
 *  currentProfit > maxProfit => 5 > 4 => true
 *  maxProfit = 5;
 * 
 * Variable State before Iteration
 * 
 * minPrice = 1; 
 * maxProfit = 5;
 * n = 6; 
 * prices = [7,1,5,3,6,4]
 * 
 * i = 5;
 *  currentPrice = 4
 *  currentPrice < minPrice  => 4 < 1 => false
 *  currentProfit = currentPrice - minPrice => 4 - 1 => 3
 *  currentProfit > maxProfit => 3 > 4 => false
 * 
 * Iterations ends
 * We return the maxProfit which is 5
 */
