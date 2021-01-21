'use strict';

const co = require('co');
const compose = require('koa-compose');

function convert(mw) {
    if (typeof mw !== 'function')
        throw new TypeError('middleware must be a function');
    if (mw.constructor.name !== 'GeneratorFunction') {
        return mw;
    }
    const converted = function(ctx, next) {
        return co.call(ctx, mw.call(ctx, createGenerator(next)));
    };

    converted._name = mw._name || mw.name;
    return converted;
}

function* createGenerator(next) {
    return yield next();
}

convert.compose = function(arr) {
    if (!Array.isArray(arr)) {
        arr = Array.from(arguments);
    }
    return compose(arr.map(convert));
};

convert.back = function(mw) {
    if (typeof mw !== 'function') {
        throw new TypeError('middleware must be a function');
    }

    if (mw.constructor.name === 'GeneratorFunction') {
        return mw;
    }

    const converted = function*(next) {
        let ctx = this,
            called = false;

        yield Promise.resolve(
            mw(ctx, function() {
                if (called) {
                    return Promise.reject(
                        new Error('next() called multiple times')
                    );
                }

                called = true;
                return co.call(ctx, next);
            })
        );
    };

    converted._name = mw._name || mw.name;
    return converted;
};

module.exports = convert;
