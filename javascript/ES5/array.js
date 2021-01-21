let es5 = {
    isArray: function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
};
