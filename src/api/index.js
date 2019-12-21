const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const tip = require('./tip');

api.use('/auth', auth.routes());
api.use('/tip', tip.routes());

module.exports = api;