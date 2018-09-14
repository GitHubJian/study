const { fork } = require('child_process');
const { resolve } = require('path');

const sub = fork(resolve(__dirname, './c.js'), [1, 2], { argv0: '1' });

sub.on('message', msg => {
    console.log('C');
});

process.send('B: 222');

process.on('message', msg => {
    console.log(`say to B: ${msg}`);
});
