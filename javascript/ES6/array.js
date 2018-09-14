Array.prototype.reduce = function(callback) {
    if (this === null) {
        throw new TypeError(
            'Array.prototype.reduce called on nul or undefined'
        );
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    var o = Object(this), len = o.length >>> 0, k = 0, value;
    if (arguments.length >= 2) {
        value = arguments[1];
    } else {
        while (k < len && !(k in o)) {
            k++;
        }
        if (k >= len) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        value = o[k++];
    }
    while (k < len) {
        if (k in o) {
            value = callback(value, o[k], k, o);
        }
        k++;
    }
    return value;
};
