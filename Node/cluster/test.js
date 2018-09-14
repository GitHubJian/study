const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    Object.entries(cluster.workers).forEach(([k, worker]) => {
        worker.on('message', msg => {
            console.log(`worker#${worker.id}接收到了消息${msg}`);
        });
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });

    cluster.on('listen', worker => {
        console.log(`工作进程 ${worker.process.pid} 已监听`);
    });
} else {
    http.createServer((req, res) => {
        if (req.url === '/') {
            res.writeHead(200);
            res.end('Hello world \n');

            process.send('123');
        }
    }).listen(8419);

    console.log(`工作进程 ${process.pid} 正在运行`);
}
