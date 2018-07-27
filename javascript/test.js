let obj = {
    a: undefined,
    prototype: {
        __proto__: {
            a: 1
        }
    }
};

console.log('a' in obj);
