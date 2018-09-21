// 所有带async function 的都会主动生成Promise, await会主动生成then

function getConstant() {
    return 1;
}
async function getAsyncConstant() {
    return 1;
}
async function getPromise() {
    return new Promise((resolved, rejected) => {
        resolved(1);
    });
}
async function test() {
    a = 2;
    c = 1;
    await getConstant();
    d = 3;
    await getPromise();
    d = 4;
    await getAsyncConstant();
    return 2;
}
// -------------------
function getConstant() {
    return 1;
}
function getAsyncConstant() {
    return Promise.resolve().then(function() {
        return 1;
    });
}
function getPromise() {
    return Promise.resolve().then(function() {
        return new Promise((resolved, rejected) => {
            resolved(1);
        });
    });
}
function test() {
    return Promise.resolve()
        .then(function() {
            a = 2;
            c = 1;
            return getConstant();
        })
        .then(function() {
            d = 3;
            return getPromise();
        })
        .then(function() {
            d = 4;
            return getAsyncConstant();
        })
        .then(function() {
            return 2;
        });
}

//
