const { fork } = require('child_process');
const { resolve } = require('path');

const child = fork(resolve(__dirname, './son.js'));

// 接受子线程的信息
child.on('message', msg => {
    console.log(`C to P: ${msg}`);
});
// 给子线程发送信息
child.send('Hi, son');

setTimeout(() => {
    process.exit();
}, 4000);
