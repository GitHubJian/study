// let validator = {
//     set: function(target, property, value, receiver) {
//         if (property === 'age') {
//             if (!Number.isInteger(value)) {
//                 throw new TypeError('The age is not an integer');
//             }

//             if (value > 200) {
//                 throw new RangeError('The age seems invalid');
//             }
//         }

//         Reflect.set(target, property, value, receiver);
//     }
// };

// let person = new Proxy({}, validator);

// let children = Object.create(person);

// children.age = 100;

// console.log(children.age);
// console.log(person.age);

// var target = function() {
//     return 'I am target';
// };

// var handler = {
//     apply: function() {
//         return 'I am proxy';
//     }
// };

// var p = new Proxy(target, handler);

// console.log(p());

// var handler = {
//     apply(target, ctx, args) {
//         return Reflect.apply(...arguments);
//     }
// };

// function sum(left, right) {
//     return left + right;
// }

// var proxy = new Proxy(sum, handler);

// proxy(1 + 2);

var handler = {
    deleteProperty(target, key) {}
};
