
function maximumWealth(accounts) {
  let maxWealth = 0;
  for (let row = 0; row < accounts.length; row++) {
    let sum = 0;
    for (let col = 0; col < accounts[row].length; col++) {
      sum += accounts[row][col];
    }
    maxWealth = Math.max(maxWealth, sum);
  }
  return maxWealth;
}