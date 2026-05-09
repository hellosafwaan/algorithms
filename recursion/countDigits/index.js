function countDigits(number) {
    const n = Math.abs(Math.floor(number))
    if (n < 10) return 1                    // Base case: 0-9 all have 1 digit
    return 1 + countDigits(Math.floor(n / 10))
}