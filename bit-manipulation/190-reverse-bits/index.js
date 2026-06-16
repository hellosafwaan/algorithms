/**
 * @param {number} n
 * @return {number}
 */

function reverseBits(n) {
    // Bit at position i moves to position (31 - i), so we process all 32 positions.
    let result = 0;
    for (let i = 0; i < 32; i++) {
        const lastBit = n & 1;       // read n's last bit
        result = result << 1;        // make room on the right of result
        result = result | lastBit;   // drop the bit in
        n = n >>> 1;                 // advance to n's next bit (>>> avoids sign-extension)
    }
    return result;
}

