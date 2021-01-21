/**
 * Currying can be described
 * as transforming a function of N arguments
 * in such a way that it can be called
 * as a chain of N functions each with a single argument.
 */

const _slice = Array.prototype.slice;
//不可变参数
function curry(fn) {
    return function curried() {
        let args = _slice.call(arguments),
            ctx = this;

        //形参个数，所以不能处理可变参数
        return args.length >= fn.length
            ? fn.apply(ctx, args)
            : function() {
                  let rest = _slice.call(arguments);
                  return curried.apply(ctx, args.concat(rest));
              };
    };
}

function add(a, b, c) {
    let sum = _slice.call(arguments).reduce((prev, cur) => {
        prev += cur;
        return prev;
    }, 0);
    console.log(sum);
}

curry(add)(1, 2, 3);
