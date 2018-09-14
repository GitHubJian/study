function isArrayLike(val) {
    return val !== null && typeof val !== 'function' && isLength(val.length);
}
