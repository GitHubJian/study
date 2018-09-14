let instance = Symbol['instance'];

class Worker {
    constructor() {
        console.log('222');
    }
}

let signle = {
    [instance]: undefined,
    getInstance() {
        return this[instance] !== undefined
            ? this[instance]
            : (this[instance] = new Worker());
    }
};

signle.getInstance();
signle.getInstance();
signle.getInstance();
signle.getInstance();

// class Signleton {
//     constructor() {
//         this[instance] = undefined;
//     }

//     getInstance() {
//         return this[instance];
//     }
// }

// class ImpClass extends Signleton {
//     constructor() {
//         super();
//     }

//     getInstance() {
//         if (this[instance] === undefined) {
//             this[instance] = new Worker();
//         }
//         return this[instance];
//     }
// }

// let impClass = new ImpClass();

// impClass.getInstance();
// impClass.getInstance();
// impClass.getInstance();
