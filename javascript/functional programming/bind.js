// 穷人版
Function.prototype.bind =
    Function.prototype.bind ||
    function(context) {
        var that = this;
        return function() {
            return that.apply(context, arguments);
        };
    };
// MDN
Function.prototype.bind =
    Function.prototype.bind ||
    function(oThis) {
        var aArgs = Array.prototype.slice.call(arguments, 1),
            //由于bind是原型方法,fToBind指调用bind的函数对象
            fToBind = this,
            F = function() {},
            fBound = function() {
                //fBound若作为构造函数，则this就是fBound构造出来的对象
                //构造函数中有return，若return的是标量，则忽略，return的是对象，则覆盖构造的实例
                return fToBind.apply(
                    this instanceof F ? this : oThis || this,
                    aArgs.concat(Array.prototype.slice.call(arguments))
                );
            };

        F.prototype = fToBind.prototype;
        fBound.prototype = new F();

        return fBound;
    };