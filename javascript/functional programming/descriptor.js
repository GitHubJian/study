/**
 * 经过简单的封装函数，变成一个新的函数
 * 
 * Case: 
 * Koa 源码
 * Before
 * After
 */

const descriptor = function(fn, ctx) {
    return function(...args) {
        const start = Date.now();
        let result = fn.apply(ctx, args);
        const times = Date.now() - start;
        console.log(`Call ${fn.name}(${args}) used ${times}ms.`);
        return result;
    };
};

function calculate(times) {
    let sum = 0,
        i = 1;
    while (i < times) {
        sum += i++;
    }

    return sum;
}

descriptor(calculate)(100000);
