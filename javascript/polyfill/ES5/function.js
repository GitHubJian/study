if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            throw new TypeError(
                'Bind - what is trying to be bound is not callable'
            );
        }
        let _slice = Arra.prototype.slice,
            aArgs = _slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(
                    this instanceof fNOP ? this : oThis,
                    aArgs.concat(_slice.call(arguments))
                );
            };
        if (this.prototype) {
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();

        return fBound;
    };
}
