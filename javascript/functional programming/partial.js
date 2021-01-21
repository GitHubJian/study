/**
 * Partial application can be described
 * as taking a function that accepts some number of arguments,
 * binding values to one or more of those arguments,
 * and returning a new function that only accepts the remaining,
 * un-bound arguments.
 */

/**
 * unary 一元
 * binary 二元
 * ternary 三元
 * polyadic 多元
 * variadic 可变元
 */

/**
 * leftmost 最左形式
 * rightmost 最右形式
 */

const _slice = Array.prototype.slice;

/**
 * Partial Application
 *
 * @param {Function} fn 函数
 * @param {Number} n 当前函数执行所需要的参数个数
 * @param {Array} init 初始化参数
 */

function partial(fn, n, init) {
    let arity = fn.length;

    if (Array.isArray(n)) {
        init = JSON.parse(JSON.stringify(n));
    } else {
        arity = n || fn.length;
        init = init || [];
    }

    if (!arity) {
        throw new Error('参数列表数不能为空');
    }

    return function curried() {
        let args = _slice.call(arguments).concat(init),
            ctx = this;

        return args.length >= arity
            ? fn.apply(ctx, args)
            : function() {
                  const rest = _slice.call(arguments);
                  return curried.apply(ctx, args.concat(rest));
              };
    };
}

function add() {
    let sum = _slice.call(arguments).reduce((prev, cur) => {
        prev += cur;
        return prev;
    }, 0);
    console.log(sum);
}

partial(add, 3, [1, 2])(3);
