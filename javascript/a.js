const { fork } = require('child_process');
const { resolve } = require('path');

const sub = fork(resolve(__dirname, './b.js'), [1, 2], { argv0: '1' });

sub.send('hello, fork');

sub.on('message', (msg, handle) => {
    console.log(msg);
});

setTimeout(() => {
    process.exit();
}, 5);
