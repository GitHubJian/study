module.exports = function(obj = {}, keys) {
    if ('string' === typeof keys) keys = keys.split('/ +/');

    return keys.reduce((ret, key) => {
        if (null == obj[key]) return ret;
        ret[key] = obj[key];
        return ret;
    }, {});
};
