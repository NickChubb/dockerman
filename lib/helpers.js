/* 
    Contains useful helper functions that may be used in multiple
    other files.
*/

const filterInPlace = (a, condition, thisArg) => {
    let j = 0;

    a.forEach((e, i) => { 
        if (condition.call(thisArg, e, i, a)) {
        if (i!==j) a[j] = e; 
        j++;
        }
    });

    a.length = j;
    return a;
}

module.exports = { filterInPlace };