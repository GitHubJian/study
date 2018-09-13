const spreadableSymbol = Symbol.isConcatSpreadable;

function isFlattenable(val) {
    return (
        Array.isArray(val) ||
        isArgument(val) ||
        !!(spreadableSymbol && val && val[spreadableSymbol])
    );
}
