// let arr = [Promise.resolve('a'), Promise.resolve('b')]

// let a = Promise.all(arr);
// let [prom1, prom2] = arr;
// let p1 = prom1();
// let p2 = prom2();
// let foo = await p1;
// let bar = await p2;

// function logInOrder(urls) {
//     let proms = urls.map(url => {
//         return fetch(url).then(res => { return res.text() });
//     });

//     proms.reduce((chain, prom) => {
//         return chain.then(() => prom).then(res => console.log(res.text()));
//     }, Promise.resolve());
// }

// async function logInOrder(urls) {
//     let proms = urls.map(async url => {
//         const res = await fetch(url);
//         return res.text();
//     });

//     for (const prom of proms) {
//         console.log(await prom);
//     }
// }

// async function* createAsyncIterable(syncIterable) {
//     for (const elem of syncIterable) {
//         yield elem;
//     }
// }
// const asyncGenObj = createAsyncIterable(['a', 'b']);

// async function f() {
//     const [v1, v2] = await Promise.all([asyncGenObj.next(), asyncGenObj.next()])
//     console.log(v1, v2)
// }

// // f()

// async function f2() {
//     asyncGenObj.next()
//     asyncGenObj.next()
//     await asyncGenObj.return();
// }

// f2()

// function* foo(x) {
//     var y = 2 * (yield (x + 1));
//     var z = yield (y / 3);
//     return (x + y + z);
// }

// for (const ite of foo(1)) {
//     console.log(ite)
// }

// function* fibonacci() {
//     let [prev, cur] = [0, 1];
//     for (; ;) {
//         [prev, cur] = [prev, cur + prev];
//         yield cur
//     }
// }

// let obj = {
//     [Symbol.iterator]: function () {
//         let keys = Object.keys(this);
//         let index = 0;
//         let self = this;
//         return {
//             next: function () {
//                 let done = index >= keys.length;

//                 return {
//                     value: self[keys[index++]],
//                     done: done
//                 }
//             }
//         }
//     },
//     a: 1,
//     b: 2,
//     c: 3
// }

// let a = obj[Symbol.iterator]();
// async function f() {
//     const [{ value: v1 }, { value: v2 }] = await Promise.all([a.next(), a.next()])
//     console.log(v1, v2)
// }

// f()

function copyProperties(target, source) {
    for (const key of Reflect.ownKeys(source)) {
        if (!['constructor', 'prototype', 'name'].includes(key)) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperties(target, key, desc);
        }
    }
}

function mix(...mixins) {
    class Mix {}

    for (const minin of mixins) {
        copyProperties(Mix, minin);
        copyProperties(Mix.prototype, minin.prototype);
    }

    return Mix;
}
