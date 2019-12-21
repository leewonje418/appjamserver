const Joi = require('joi');
const Tip = require('models/tip');

exports.getByDate = async(ctx) => {
    let tip = null;
    try {
        tip = await Tip.findByDate();
    } catch(e) {
        ctx.throw(500, e);
    }
    
    ctx.body = tip;
};

exports.postTip = async(ctx) => {
    try {
        await Tip.postTip(ctx.request.body);
    } catch(e) {
        ctx.throw(500, e);
    }

    ctx.body = { result: 1 };
};

exports.myPosts = async(ctx) => {
    let myposts = null;
    try {
        myposts = await Tip.myPosts(ctx.params.userId);
    } catch(e) {
        ctx.throw(500, e);
    }
    ctx.body = myposts;
};

exports.thumbup = async(ctx) => {
    let tip = null;
    try {
        tip = await Tip.thumbUp(ctx.request.body);
    } catch(e) {
        ctx.throw(500, e);
    }
    
    ctx.body = { result: tip };
};

exports.myThumbUps = async(ctx) => {
    let tip = null;
    try {
        tip = await Tip.myThumbUps(ctx.params.userId);
    } catch(e) {
        ctx.throw(500, e);
    }
    
    ctx.body = tip;
};

exports.findByThumbUp = async(ctx) => {
    let tip = null;
    try {
        tip = await Tip.findByThumbUp();
    } catch(e) {
        ctx.throw(500, e);
    }
    
    ctx.body = tip;
};

exports.searchByKeyword = async(ctx) => {
    let tip = null;
    try {
        tip = await Tip.searchByKeyword(ctx.params.keyword);
    } catch(e) {
        ctx.throw(500, e);
    }
    
    ctx.body = tip;
};
