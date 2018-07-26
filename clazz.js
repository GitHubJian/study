class Test {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }

    [Symbol.iterator]() {
        let [self, index, keys] = [this, 0, Object.keys(this)];
        // console.log(index)
        // console.log(keys);
        // console.log(keys[index]);
        // console.log(self[keys[index]])
        return {
            next: function () {
                let done = index >= keys.length
                return {
                    value: self[keys[index++]],
                    done: done
                }
            }
        }
    }
}

let ts = new Test(1, 2);
for (const ite of ts) {
    console.log(ite)
}