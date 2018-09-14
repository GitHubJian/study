const { fork, exec, execFile } = require('child_process');
const { resolve } = require('path');
const root = process.cwd();
//fork(resolve(__dirname, './b.js'), [1, 2], { argv0: '1' });

// exec(resolve(__dirname, './b.js'));
execFile('./b.sh', [1, 2], { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});
