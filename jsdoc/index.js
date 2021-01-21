/**
 * 模块描述符，用在模块引入的时候
 * @module a
 * @author ws.xiao <jian958753831@qq.com>
 * @file First doc
 * @copyright ws.xiao
 */

/**@global */
const path = 111;

import a from './a';

/**@private */
const a = {};

/**
 * 类描述符，用在new的操作时
 * @class
 * @classdesc
 */
class A {
    /**
     * Create A
     * @param {string} x The x Value
     */
    constructor(x) {}

    /**
     * 子类需要实现方法
     * @abstract
     * @returns {string} Return name
     */
    getName() {
        throw new Error();
    }
}
/**
 * Class B
 * @extends A
 */
class B extends A {
    constructor() {}
    /**
     * @alias name 函数别名
     */
    getName() {}

    name() {
        return this.getName();
    }
}

/**
 * 返回字符串
 * @param {*} str
 */
function toString(str) {
    return str;
}

/**
 * @namespace 命名空间
 * @borrows toString as toStr 允许您将另一个标识符的描述添加到你的当前描述
 */
const util = {
    toStr: toString
};

/**
 *
 * @function
 * @param {string} key
 * @param {getCookieCovert} convert
 */
function getCookie(key, convert) {}

/**
 * 回调函数的描述
 * @callback getCookie~getCookieCovert
 * @param {*} value
 */

/**
 * 常量定义
 * @const
 * @type {number}
 * @default 0
 */
const RED = 0;

/**
 * @deprecated
 * @example
 * // return 1
 * a(1)
 */
function a1(n) {
    return n;
}

/**
 * Enum for color value
 * @enum
 */
const COLOR = {
    red: 'red',
    blue: 'blue'
};

/**
 * @function
 * @name b
 */
const b1 = function() {};

/**
 * @export
 */
export const a222 = () => {};
