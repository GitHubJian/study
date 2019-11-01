// 穷人版

function concat() {
  var that = this
  var assign = []
  var args = Array.prototype.slice.call(arguments)

  assign.push.apply(assign, that)

  for (var i = 0; i < args.length; i++) {
    assign.push.apply(assign, args[i])
  }

  return assign
}

Array.prototype.concat = concat
var res = [1].concat([2, 3, 4], [5], [6])

console.log(res)
