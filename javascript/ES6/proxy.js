var handler = {
    get: function(target, propKey, receiver) {
        // 拦截某个属性的读取操作
        // target 目标对象
        // propKey 属性名
        // receiver 操作行为所针对的对象
        // 不可写不可配置的属性 TypeError
    },
    set: function(target, propKey, value, receiver) {
        // 拦截某个属性的写入操作
        // target 目标对象
        // propKey 属性名
        // value 属性值
        // receiver 操作行为所针对的对象
        // 不可写的属性 代理将失效
    },
    has(target, propKey) {
        // 拦截 propKey in proxy的操作，返回一个布尔值
    },
    deleteProperty(target, propKey) {
        // 拦截 delete proxy[propKey]的操作，返回一个布尔值
        // 若该方法报错或者返回false，则属性无法delete
    },
    ownKeys(target) {
        // 拦截 Object.getOwnPropertyNames(proxy)、
        // Object.getOwnPropertySymbols(proxy)、
        // Object.keys(proxy)、
        // for...in循环，返回一个数组。
        // 该方法返回目标对象所有自身的属性的属性名，
        // 而Object.keys()的返回结果仅包括目标对象自身的可遍历属性
    },
    getOwnPropertyDescriptor(target, propKey) {
        // 拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
    },
    defineProperty(target, propKey, propDesc) {
        // 拦截 Object.defineProperty(proxy, propKey, propDesc）、
        // Object.defineProperties(proxy, propDescs)，返回一个布尔值
        // 对象不可扩展（extensible)，则报错
        // 对象不可写或不可配置，则报错
    },
    preventExtensions(target) {
        // 拦截 Object.preventExtensions(proxy)，返回一个布尔值
        // 强制性 只有目标对象不可扩展时，才能返回true 否则报错
    },
    getPrototypeOf(target) {
        //拦截 Object.getPrototypeOf(proxy)，返回一个对象
        // Object.prototype.__proto__
        // Object.prototype.isPrototypeOf()
        // Object.getPrototypeOf()
        // Reflect.getPrototypeOf()
        // instanceof
    },
    isExtensible(target) {
        // 拦截 Object.isExtensible(proxy)，返回一个布尔值
        // 它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误
    },
    setPrototypeOf(target, proto) {
        // 拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。
        // 如果目标对象是函数，那么还有两种额外操作可以拦截。
    },
    apply: function(target, object, args) {
        // 拦截 Proxy 实例作为函数调用的操作
        // proxy(...args) proxy.call(object,...args) proxy.apply(...)
        // 直接调用Reflect.apply方法，也会被拦截
    },
    construct(target, args, newTarget) {
        // 拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
        // newTarget new作用的构造函数
    }
};

var target = {};
// proxy
// revoke() 取消 Proxy 实例
let { proxy, revoke } = Proxy.revocable(target, handler);

//Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理
this;

function createWebService(baseUrl) {
    return new Proxy(
        {},
        {
            get(target, propKey, receiver) {
                return () => Promise.resolve(`${baseUrl}/${propKey}`);
            }
        }
    );
}

let server = createWebService('baidu.com');

server.data().then(res => console.log(res));
server.getdata().then(res => {
    console.log(res);
});
