'use strict';

let toStr = Object.prototype.toString,
    fnToStr = Function.prototype.toString,
    isFnRegex = /^\s*(?:function)?\*/,
    hasToStringTag =
        typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol',
    getProto = Object.getPrototypeOf,
    getGeneratorFunc = function() {
        if (!hasToStringTag) {
            return false;
        }
        try {
            return Function('return function*() {}')();
        } catch (e) {}
    },
    generatorFunc = getGeneratorFunc(),
    GeneratorFunction = generatorFunc ? getProto(generatorFunc) : {};

function isGeneratorFunction(fn) {
    if (typeof fn !== 'function') {
        return false;
    }

    if (isFnRegex.test(fnToStr.call(fn))) {
        return true;
    }

    if (!hasToStringTag) {
        var str = toStr.call(fn);
        return str === '[object GeneratorFunction]';
    }

    return getProto(fn) === GeneratorFunction;
}

module.exports = isGeneratorFunction;
