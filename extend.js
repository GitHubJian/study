function Parent() {
    //TODO
}
function Children() {
    //TODO
}
//原型链继承
Children.prototype = new Parent();

//构造继承
//复制父类的实例属性给子类
function Children() {
    Parent.call(this);
    //TODO
}

//实例继承
//为父类实例添加新特性，作为子类实例返回
function Children() {
    let instance = new Parent();
    //TODO
    return instance;
}

//拷贝继承
function Children() {
    let instance = new Parent();
    for (const key in instance) {
        Children.prototype[key] = instance[key]
    }
}

