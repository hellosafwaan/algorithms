
// Wrong

function sameTree(p,q) {
    function depthFirstValues(root) {
        if(root === null) return []
        const leftValues = depthFirstValues(root.left);
        const rightValues = depthFirstValues(root.right);
        return [root.val, ...leftValues, ...rightValues]
    }
    const pValues = depthFirstValues(p)
    const qValues = depthFirstValues(q)
    const pLen = pValues.length;
    const qLen = qValues.length;
    if(pLen !== qLen) return false;
    for(let i = 0; i < pLen.length; i++) {
        if(pValues[i] !== qValues[i]) return false
    }
    return true;
}

// Stupidly wrong
function isSameTree(p,q) {
    const pValues = p
    const qValues = q
    const pLen = pValues.length;
    const qLen = qValues.length;
    if(pLen !== qLen) return false;
    for(let i = 0; i < pLen; i++) {
        if(pValues[i] !== qValues[i]) return false
    }
    return true;
}


function isSameTree(p, q) {
    if(p === null && q === null) return true;
    if(p === null || q === null) return false;
    if(p.val !== q.val) return false;
    const isLeftSame = isSameTree(p.left, q.left);
    const isRightSame = isSameTree(p.right, q.right);
    return isLeftSame && isRightSame;
}