function isArgument(val) {
    return (
        typeof val === 'object' &&
        val !== null &&
        Object.prototype.toString.call(arguments) === '[object Arguments]'
    );
}

module.exports = isArgument;
