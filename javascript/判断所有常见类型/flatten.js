const isArgument = require('./isArgument');

const spreadableSymbol = Symbol.isConcatSpreadable;

function isFlattenable(val) {
    return (
        Array.isArray(val) ||
        isArgument(val) ||
        !!(spreadableSymbol && val && val[spreadableSymbol])
    );
}

function baseFlatten(array, depth, predicate, isStrict, result) {
    predicate || (predicate = isFlattenable);
    result || (result = []);

    if (array == null) {
        return result;
    }

    for (const value of array) {
        if (depth > 0 && predicate(value)) {
            if (depth > 1) {
                // Recursively flatten arrays (susceptible to call stack limits).
                baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
                result.push(...value);
            }
        } else if (!isStrict) {
            result[result.length] = value;
        }
    }
    return result;
}

function flatten(array) {
    const length = array == null ? 0 : array.length;
    return length ? baseFlatten(array, 1) : [];
}

const INFINITY = 1 / 0;

function flattenDeep(array) {
    const length = array == null ? 0 : array.length;
    return length ? baseFlatten(array, INFINITY) : [];
}

function flattenDepth(array, depth) {
    const length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    depth = depth === undefined ? 1 : +depth;
    return baseFlatten(array, depth);
}

const arr = [1, [2, [3, [4, [5, 6]]], 7]];

console.log(flatten(arr));
console.log(flattenDeep(arr));
console.log(flattenDepth(arr, 3));
