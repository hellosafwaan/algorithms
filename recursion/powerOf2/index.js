function powerOf2(n) {
    if(n === 0) return 1
    else return 2 * powerOf2(n - 1)
}
console.log(powerOf2(4))