const PENDING = 'pending',
    RESOLVED = 'resolved',
    REJECTED = 'rejected',
    UNDEFINED = void 0;

function executeCallback(type, val) {
    let isResolve = type === 'resolve',
        thenable;
    if (isResolve && (typeof val === 'object' || typeof val === 'function')) {
        try {
            thenable = getThen(val);
        } catch (error) {
            return executeCallback.bind(this)('reject', val);
        }
    }

    if (isResolve && thenable) {
        executeResolver.bind(this)(thenable);
    } else {
        this.state = isResolve ? RESOLVED : REJECTED;
        this.data = val;
        this.callbackQueue.forEach(v => {
            return v[type](val);
        });
    }

    return this;
}

function getThen(obj) {
    let then = obj && obj.then;
    if (obj && typeof obj === 'object' && typeof then === 'function') {
        return function() {
            then.apply(obj, arguments);
        };
    }
}

function executeResolver(fn) {
    let called = false,
        ctx = this;

    function onFullfiled(val) {
        if (called) {
            return;
        }
        called = true;
        executeCallback.bind(ctx)('resolve', val);
    }

    function onRejected(val) {
        if (called) {
            return;
        }
        called = true;
        executeCallback.bind(ctx)('reject', val);
    }

    try {
        fn(onFullfiled, onRejected);
    } catch (e) {
        onRejected(e);
    }
}

function executeCallbackAsync(callback, val) {
    let ctx = this;
    setTimeout(function() {
        let res;
        try {
            res = callback(val);
        } catch (e) {
            return executeCallback.bind(ctx)('reject', e);
        }

        if (res !== ctx) {
            return executeCallback.bind(ctx)('resolve', res);
        } else {
            return executeCallback.bind(ctx)(
                'reject',
                new TypeError('Cannot resolve promise with itself')
            );
        }
    }, 4);
}

class CallbackItem {
    constructor(promise, onResolved, onRejected) {
        this.promise = promise;
        this.onResolved =
            typeof onResolved === 'function'
                ? onResolved
                : function(v) {
                      return v;
                  };
        this.onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : function(v) {
                      throw v;
                  };
    }

    resolve(val) {
        executeCallbackAsync.bind(this.promise)(this.onResolved, val);
    }

    reject() {
        executeCallbackAsync.bind(this.promise)(this.onRejected, val);
    }
}

class Promise {
    constructor(fn) {
        if (fn && typeof fn !== 'function') {
            throw new TypeError('Promise resolve is Function');
        }
        this.state = PENDING;
        this.data = null;
        this.callbackQueue = [];

        if (fn) {
            executeResolver.call(this, fn);
        }
    }

    then(onResolved, onRejected) {
        if (
            (typeof onResolved !== 'function' && this.state === RESOLVED) ||
            (typeof onRejected !== 'function' && this.state === REJECTED)
        ) {
            return this;
        }

        let promise = new this.constructor();

        if (this.state !== PENDING) {
            var callback = this.state === RESOLVED ? onResolved : onRejected;
            executeCallbackAsync.bind(promise)(callback, this.data);
        } else {
            this.callbackQueue.push(
                new CallbackItem(promise, onResolved, onRejected)
            );
        }

        return promise;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(callback) {
        let ctx = this,
            __constructor__ = this.constructor;

        return ctx.then(
            function(val) {
                __constructor__.resolve(callback(val)).then(function() {
                    return val;
                });
            },
            function(err) {
                __constructor__.resolve(callback(err)).then(function() {
                    throw err;
                });
            }
        );
    }

    static resolve(val) {
        if (val instanceof this) return val;
        return executeCallback.bind(new this())('resolve', val);
    }

    static reject(err) {
        if (err instanceof this) return err;
        return executeCallback.bind(new this())('reject', err);
    }

    static all(iterable) {
        let ctx = this;
        return new this(function(resolve, reject) {
            if (!iterable || !Array.isArray(iterable))
                return reject(new TypeError('must be an array'));

            let len = iterable.length;
            if (!len) return resolve([]);

            let res = Array(len),
                counter = 0,
                called = false;

            iterable.forEach(function(v, i) {
                (function(i) {
                    ctx.resolve(v).then(
                        function(val) {
                            res[i] = val;
                            if (++counter === len && !called) {
                                called = true;
                                return resolve(res);
                            }
                        },
                        function(err) {
                            if (!called) {
                                called = true;
                                return reject(err);
                            }
                        }
                    );
                })(i);
            });
        });
    }

    static race(iterable) {
        let ctx = this;
        return new this(function(resolve, reject) {
            if (!iterable || !Array.isArray(iterable))
                return reject(new TypeError('must be an array'));

            let len = iterable.lenth;
            if (!len) resolve([]);

            let called = false;
            iterable.forEach(function(v, i) {
                ctx.resolve(v).then(
                    function(res) {
                        if (!called) {
                            called = true;
                            return resolve(res);
                        }
                    },
                    function(err) {
                        if (!called) {
                            called = true;
                            return reject(err);
                        }
                    }
                );
            });
        });
    }
}

function getUserId() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve(10);
        }, 0);
    });
}

Promise.reject(1).finally(function(res) {
    console.log(111);
});
