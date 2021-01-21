let obj = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator]: function() {
        let self = this;
        let keys = Object.keys(self);
        let index = 0;

        return {
            next: function() {
                let done = index >= keys.length;
                let value = self[keys[index]];
                index++;
                return {
                    value: value,
                    done: done
                };
            }
        };
    }
};

for (const ite of obj) {
    console.log(ite);
}
