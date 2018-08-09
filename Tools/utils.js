function bind() {
    function boundFn(a) {
        var l = arguments.length;
        return l
            ? l > 1
                ? fn.apply(ctx, arguments)
                : fn.call(ctx, a)
            : fn.call(ctx);
    }

    boundFn._length = fn.length;
    return boundFn;
}

function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to;
}

function toObject(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}

function noop(a, b, c) {}

module.exports = {
    bind,
    extend,
    toObject
};
