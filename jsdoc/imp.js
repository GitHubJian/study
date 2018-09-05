/**
 * Interface for classes that represent a color
 * @interface
 */
class A {
    consutructor() {
        if (new.target === A) {
            throw new Error('This Class A is not instance');
        }
    }

    /**
     * @function A#name
     * @return {string}
     */
    name() {
        throw new Error('This function is implemented');
    }
}

/**
 * @implements A
 */
class B extends A {
    consutructor() {
        super();
    }
}
