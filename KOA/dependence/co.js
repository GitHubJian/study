function co(gen) {
    let ctx = this,
        args = Array.prototype.slice.call(arguments, 1);

    return new Promise(function(resolve, reject) {
        if (typeof gen === 'function') gen = gen.apply(ctx, args);
        if (!gen || typeof gen.then !== 'function') return resolve(gen);

        onFulfilled();

        function onFulfilled(res) {
            let ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }

            next(ret);
            return null;
        }

        function onRejected(err) {
            let ret;
            try {
                ret = gen.throw(err);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        function next(ret) {
            if (ret.done) return resolve(ret.value);
            let value = toPromise.call(ctx, ret.value);

            if (value && isPromise(value)) {
                return value.then(onFulfilled, onRejected);
            }

            return onRejected(
                new TypeError(
                    'You may only yield a function, promise, generator, array, or object, ' +
                        'but the following object was passed: "' +
                        String(ret.value) +
                        '"'
                )
            );
        }
    });
}
