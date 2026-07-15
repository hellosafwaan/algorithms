/**
 * @param {string} s
 * @return {string}
 */
function reverseVowels(s) {
    const stack = [];
    const vowels = 'aeiouAEIOU';
    for(let i = 0; i < s.length; i++) {
        const char = s[i];
        if(vowels.includes(char)) stack.push(char)
    }
    const result = [];
    for(let i = 0 ; i < s.length; i++) {
        const char = s[i];
        if(vowels.includes(char)) result.push(stack.pop())
        else result.push(char)
    }
    return result.join('')
};