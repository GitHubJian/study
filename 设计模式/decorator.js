class Plain {
    constructor() {}
    fly() {
        console.log('fly');
    }
}

class DescoratorPlain {
    constructor(descorated) {
        this.descorated = descorated;
    }
    fly() {
        this.descorated.fly();
        console.log('fly----');
    }
}

let plain = new Plain();
let descorator = new DescoratorPlain(plain);
descorator.fly();
