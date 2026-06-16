function hammingWeight(n) {
    let count = 0;
    while(n !== 0) {
        const lastBit = n & 1
        if(lastBit === 1) count++
        n = n >>> 1;
    }
    return count;
};