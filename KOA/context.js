'use strict';

const util = require('util');
const createError = require('http-errors');
const httpAssert = require('http-assert');
const delegate = require('delegates');
const statuses = require('statuses');
const Cookies = require('cookies');

const COOKIES = Symbol('context#cookies');

const proto = {
    assert: httpAssert,
    inspect() {},
    toJSON() {},
    throw() {},
    onerror(){},
    get cookie(){},
    set cookie(){}
};

module.exports = proto;
