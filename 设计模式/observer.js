class TargetObj {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

function observer(newValue, oldValue) {
    console.log(
        `Property Name value is change from ${oldValue} to ${newValue}`
    );
}

let targetObj = new TargetObj('xiaows', 12);
let proxy = new Proxy(targetObj, {
    get(target, property, value, reciever) {
        return Reflect.get(target, property, reciever);
    },
    set(target, property, value, reciever) {
        if (property == 'name') {
            observer(value, target[property]);
        }

        Reflect.set(target, property, value, reciever);
    }
});

// proxy.name = '11';
// console.log(proxy.name);

let targetObj2 = {};
function defineProperty(obj, key, val) {
    let property = Object.getOwnPropertyDescriptor(obj, key);

    let getter = property && property.get,
        setter = property && property.set;

    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key];
    }

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            const value = getter ? getter.call(obj) : val;
            return value;
        },
        set(newVal) {
            const value = getter ? getter.call(obj) : val;

            observer(newVal, value);

            if (setter) {
                setter.call(obj, newVal);
            } else {
                val = newVal;
            }
        }
    });
}

defineProperty(targetObj2, 'name');
// targetObj2.name = '111';

targetObj2.name = '1111111';
