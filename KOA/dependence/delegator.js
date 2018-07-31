class Delegator {
    constructor(prop, target) {
        if (!(this instanceof Delegator)) return new Delegator(prop, target);
        this.proto = proto;
        this.target = target;
        this.methods = [];
        this.getters = [];
        this.setters = [];
        this.fluents = [];
    }

    static auto(proto, targetProto, targetProp) {}

    method(name) {}

    access(name) {}

    getter(name) {}

    setter(name) {}

    fluent(name) {}
}
