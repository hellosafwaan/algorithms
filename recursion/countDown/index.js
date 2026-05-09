function countdown(num) {
    if(num === 0) console.log('Done!');
    else {
        console.log(num);
        countdown(num - 1);
    }
}
countdown(3);