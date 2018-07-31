module.exports = class Application {
    constructor() {
        super();

        this.proxy = false;
        this.middleware = [];
        this.subdomainOffset = 2;
        this.env = process.env.NODE_ENV || 'development';
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
        if (util.inspect.custom) {
            this[util.inspect.custom] = this.inspect;
        }
    }

    listen(...args) {
        debug('listen');
        const server = http.createServer(this.callback());
        return server.listen(...args);
    }

    toJSON() {
        return only(this, ['subdomainOffset', 'proxy', 'env']);
    }

    inspect() {
        return this.toJSON();
    }

    use(fn) {
        if (typeof fn !== 'function')
            throw new TypeError('middleware must be a function!');
        if (isGeneratorFunction(fn)) {
            fn = convert(fn);
        }

        this.middleware.push(fn);
        return this;
    }

    callback() {
        const fn = compose(this.middleware);

        const handleRequest = (req, res) => {
            const ctx = this.createContext(req, res);
            return this.handleRequest(ctx, fn);
        };

        return handleRequest;
    }

    handleRequest(ctx, fnMiddleware) {
        const res = ctx.res;
        res.statusCode = 404;
        const onerror = err => ctx.onerror(err);
        const handleResponse = () => respond(ctx);
        onFinished(res, onerror);
        return fnMiddleware(ctx)
            .then(handleResponse)
            .catch(onerror);
    }

    createContext(req, res) {
        const context = Object.create(this.context);
        return context;
    }

    onerror(err) {
        if (!(error instanceof Error))
            throw new TypeError(util.format('non-error thrown: %j', err));
        if (404 == err.status || err.expose) return;
        if (this.silent) return;

        const msg = err.stack || err.toString();
        console.error();
        console.error(msg.replace(/^/gm, '  '));
        console.error();
    }
};

function respond(ctx) {
    if (false === ctx.respond) return;

    const res = ctx.res;
    if (!ctx.writable) return;

    let body = ctx.body;
    const code = ctx.status;

    if (statuses.empty[code]) {
        // strip headers
        ctx.body = null;
        return res.end();
    }

    if ('HEAD' == ctx.method) {
        if (!res.headersSent && isJSON(body)) {
            ctx.length = Buffer.byteLength(JSON.stringify(body));
        }
        return res.end();
    }

    if (null == body) {
        body = ctx.message || String(code);
        if (!res.headersSent) {
            ctx.type = 'text';
            ctx.length = Buffer.byteLength(body);
        }
        return res.end(body);
    }

    if (Buffer.isBuffer(body)) return res.end(body);
    if ('string' == typeof body) return res.end(body);
    if (body instanceof Stream) return body.pipe(res);

    body = JSON.stringify(body);
    if (!res.headersSent) {
        ctx.length = Buffer.byteLength(body);
    }
    res.end(body);
}
