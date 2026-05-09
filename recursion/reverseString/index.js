function reverseString(str) {
    const n = str.length
    if (n === 0) return ""
    else return str[n - 1] + reverseString(str.slice(0, n - 1))
}

// Avoiding the usage of slice
function reverseString2(str, index = 0) {
    if (str.length === 0) return ""
    if (index == str.length - 1) return str[index]
    else return reverseString2(str, index + 1)+ str[index]
}

console.log(reverseString("hello"))      // Should be "olleh"
console.log(reverseString("abc"))        // Should be "cba"
console.log(reverseString("a"))          // Should be "a"
console.log(reverseString(""))           // Should be ""


console.log(reverseString2("hello"))      // Should be "olleh"
console.log(reverseString2("abc"))        // Should be "cba"
console.log(reverseString2("a"))          // Should be "a"
console.log(reverseString2(""))           // Should be ???