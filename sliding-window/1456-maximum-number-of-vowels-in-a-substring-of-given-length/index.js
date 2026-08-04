function maxVowels(s, k) {
    const vowels = new Set('aeiou');
    let max = 0;
    let currentVowelCount = 0;
    for(let i = 0; i < k; i++) {
        const elem = s[i];
        if(vowels.has(elem)) currentVowelCount += 1;
    }
    max = currentVowelCount;

    for(let i = 0; i < s.length - k ; i++) {
        const startElement = s[i];
        if(vowels.has(startElement)) currentVowelCount--;
        const nextElement = s[i + k];
        if(vowels.has(nextElement)) currentVowelCount++;
        max = Math.max(max, currentVowelCount);
    }
    return max;
}