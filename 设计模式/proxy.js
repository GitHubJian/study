class Server {
    constructor(name) {
        this.name = name;
    }

    set(msg) {
        console.log(`I'm ${this.name}, Someone say: ${msg}`);
    }

    get() {
        return `Hello, I'm ${this.name}`;
    }
}

class ProxyServer {
    constructor(name) {
        this.server = new Server(name);
    }

    set(msg) {
        this.server.set(msg);
    }

    get() {
        return this.server.get();
    }
}

class Client {
    constructor(proxy) {
        this.proxy = proxy;
    }

    set(msg) {
        this.proxy.set(msg);
    }

    get() {
        let msg = this.proxy.get();
        console.log(msg);
    }
}

let proxy = new ProxyServer('Server');
let client = new Client(proxy);
client.get();
client.set('Haaaaa');
