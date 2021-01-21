if (!Function.prototype.bind) {
  Function.prototype.bind = function bind(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('Bind - what is trying to be bound is not callable')
    }

    var slice = Array.prototype.slice
    var args = slice.call(arguments, 1)
    var fToBind = this
    var fNOP = function() {}
    var fBound = function() {
      var assign = []
      var args2 = slice.call(arguments)

      assign.push.apply(assign, args)
      assign.push.apply(assign, args2)

      return fToBind.apply(this instanceof fNOP ? this : oThis, assign)
    }

    if (this.prototype) {
      fNOP.prototype = this.prototype
    }

    fBound.prototype = new fNOP()

    return fBound
  }
}
