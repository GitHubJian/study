var myIterable = {};
myIterable[Symbol.iterator] = function*() {
    yield 1;
    yield 2;
    yield 3;
};

[...myIterable]; // [1, 2, 3]

var obj = {
    [Symbol.iterator]: function() {
        let self = this;
        let index = 0;
        let keys = Object.keys(this);
        debugger;
        return {
            next: function() {
                let value = self[keys[index]];
                let done = index > keys.length;
                index++;

                return {
                    value: value,
                    done: done
                };
            }
        };
    },
    a: 1,
    b: 2,
    c: 3
};

for (let i of obj) {
    console.log(i);
}
