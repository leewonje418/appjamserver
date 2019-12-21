const Router = require('koa-router');
const tip = new Router();
const tipCtrl = require('./tip.controller');

tip.get('/getByDate', tipCtrl.getByDate);
tip.post('/postTip', tipCtrl.postTip);
tip.get('/myposts/:userId', tipCtrl.myPosts);
tip.get('/mythumbups/:userId', tipCtrl.myThumbUps);
tip.get('/getBythumbup', tipCtrl.findByThumbUp);
tip.get('/searchByKeyword/:keyword', tipCtrl.searchByKeyword);
tip.post('/postthumbup', tipCtrl.thumbup);
module.exports = tip;