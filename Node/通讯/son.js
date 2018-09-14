const { fork } = require('child_process');
const { resolve } = require('path');

const son = fork(resolve(__dirname, './grandson.js'));

son.send('Hi, son');
son.on('message', msg => {
    console.log(msg);
});

// 给主线程发消息
process.send('Hello, Papa');
// 接受主线程发送的消息
process.on('message', msg => {
    console.log(`P to C: ${msg}`);
});

setTimeout(() => {
    process.exit();
}, 2000);
