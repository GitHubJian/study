'use strict';

const Keygrip = require('keygrip');
const http = require('http');

let cache = {};

let fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

let sameSiteRegExp = /^(?:lax|strict)$/i;

function getPattern(name) {
    if (cache[name]) return cache[name];

    let re =
        '(?:^|;) *' +
        name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') +
        '=([^;]*)';

    return (cache[name] = new RegExp(re));
}

function pushCookie(cookies, cookie) {
    if (cookie.overwrite) {
        cookies = cookies.filter(c => c.indexOf(`${cookie.name}=`) !== 0);
    }

    cookies.push(cookie.toHeader());

    return cookies;
}

class Cookies {
    constructor(request, response, options) {
        if (!(this instanceof Cookies)) {
            return new Cookies(request, response, options);
        }

        this.secure = undefined;
        this.request = request;
        this.options = options;

        if (options) {
            if (Array.isArray(options)) {
                this.keys = new Keygrip(options);
            } else if (
                options.constructor &&
                options.constructor.name === 'Keygrip'
            ) {
                this.keys = options;
            } else {
                this.keys = Array.isArray(options.keys)
                    ? Keygrip(options.keys)
                    : options.keys;
                this.secure = options.secure;
            }
        }
    }

    get(name, opts) {
        let sigName = `${name}.sig`,
            header,
            match,
            value,
            remote,
            data,
            index,
            signed =
                opts && opts.signed !== undefined ? opts.signed : !!this.keys;

        header = this.request.headers['cookie'];
        if (!header) return;

        match = header.match(getPattern(name));
        if (!match) return;

        value = match[1];
        if (!opts || !signed) return value;

        remote = this.get(sigName);
        if (!remote) return;

        data = `${name}=${value}`;
        if (!this.keys) throw new Error('.keys required for signed cookies');
        index = this.keys.index(data, remote);

        if (index < 0) {
            this.set(sigName, null, { path: '/', signed: false });
        } else {
            index && this.set(sigName, this.keys.sign(data), { signed: false });
            return value;
        }
    }

    set(name, value, opts) {
        var res = this.response,
            req = this.request,
            headers = res.getHeader('Set-Cookie') || [],
            secure =
                this.secure !== undefined
                    ? !!this.secure
                    : req.protocol === 'https' || req.connection.encrypted,
            cookie = new Cookie(name, value, opts),
            signed =
                opts && opts.signed !== undefined ? opts.signed : !!this.keys;

        if (typeof headers == 'string') headers = [headers];

        if (!secure && opts && opts.secure) {
            throw new Error(
                'Cannot send secure cookie over unencrypted connection'
            );
        }

        cookie.secure = secure;
        if (opts && 'secure' in opts) cookie.secure = opts.secure;

        if (opts && 'secureProxy' in opts) {
            deprecate(
                '"secureProxy" option; use "secure" option, provide "secure" to constructor if needed'
            );
            cookie.secure = opts.secureProxy;
        }

        headers = pushCookie(headers, cookie);

        if (opts && signed) {
            if (!this.keys)
                throw new Error('.keys required for signed cookies');
            cookie.value = this.keys.sign(cookie.toString());
            cookie.name += '.sig';
            headers = pushCookie(headers, cookie);
        }

        var setHeader = res.set
            ? http.OutgoingMessage.prototype.setHeader
            : res.setHeader;
        setHeader.call(res, 'Set-Cookie', headers);
        return this;
    }
}

function __connect__(keys) {
    return function(req, res, next) {
        req.cookies = res.cookies = new Cookies(req, res, { keys: keys });

        next();
    };
}

class Cookie {
    constructor(name, value, attrs) {
        this.path = '/';
        this.expires = undefined;
        this.domain = undefined;
        this.httpOnly = true;
        this.sameSite = false;
        this.secure = false;
        this.overwrite = false;

        Object.defineProperty(this, 'maxage', {
            configurable: true,
            enumerable: true,
            get: function() {
                return this.maxAge;
            },
            set: function(val) {
                return (this.maxAge = val);
            }
        });

        if (!fieldContentRegExp.text(name)) {
            throw new TypeError('argument name is invalid');
        }

        if (value && !fieldContentRegExp.test(value)) {
            throw new TypeError('argument value is invalid');
        }

        value || (this.expires = new Date(0));

        this.name = name;
        this.value = value || '';

        for (const n in attrs) {
            this[n] = attrs[n];
        }

        if (this.path && !fieldContentRegExp.test(this.path)) {
            throw new TypeError('option path is invalid');
        }

        if (this.domain && !fieldContentRegExp.test(this.domain)) {
            throw new TypeError('option domain is invalid');
        }

        if (
            this.sameSite &&
            this.sameSite !== true &&
            !sameSiteRegExp.test(this.sameSite)
        ) {
            throw new TypeError('option sameSite is invalid');
        }
    }

    toString() {
        return `${this.name}=${this.value}`;
    }

    toHeader() {
        let header = this.toString();
        // 负数的Cookie，为临时性cookie，默认Session
        if (this.maxAge) this.expires = new Date(Date.now() + this.maxAge);
        // 可以访问此cookie的域名
        if (this.domain) header += `; domain=${this.domain}`;
        if (this.path) header += `; path=${this.path}`;
        // Strict || Lax 防止 CSRF 攻击
        if (this.sameSite)
            header += `; samesite=${
                this.sameSite === true ? 'strict' : this.sameSite.toLowerCase()
            }`;
        // 设置是否只能通过https来传递此条cookie
        if (this.secure) header += `; secure`;
        // 不能通过document.cookie来访问此cookie
        if (this.httpOnly) header += `; httponly`;

        return header;
    }

    static connect(keys) {
        return __connect__(keys);
    }

    static expires(keys) {
        return __connect__(keys);
    }
}
