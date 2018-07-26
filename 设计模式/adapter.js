let json = {
    a: 1,
    b: 2
};

function convert(obj) {
    return Object.entries(obj).reduce((prev, [k, v]) => {
        if (k == 'a') {
            v += 1;
        }
        if (k == 'b') {
            v += 4;
        }
        prev[k] = v;

        return prev;
    }, {});
}

console.log(convert(json));
