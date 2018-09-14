module.exports = {
    hyphenate(str) {
        return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
    },
    initial(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    camelize(str) {
        return str.replace(/-(\w)/g, function(_, c) {
            return c ? c.toUpperCase() : '';
        });
    }
};
