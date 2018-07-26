class Person {
    leve() {}
}
class Work extends Person {
    level() {
        console.log(this.constructor.name);
    }
}
class Work1 extends Person {
    level() {
        console.log(this.constructor.name);
    }
}

let roles = {
    work: Work
};

//工厂生产同一类的东西
const Factory = {
    createCharacter(role) {
        let char = roles[role];
        return char ? new char() : null;
    },
    registerCharacter(role, char) {
        let prop = char.prototype;
        if (prop.level) {
            roles[role] = char;
        }
    }
};

//调用者生产需要的类型
class Player {
    constructor() {}
    play(role) {
        let char = Factory.createCharacter(role);
        char.level();
    }
}

Factory.registerCharacter('wrok1', Work1);
new Player().play('wrok1');
