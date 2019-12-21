const Joi = require('joi');
const Account = require('models/Account');

// 로컬 회원가입
exports.localRegister = async (ctx) => {
    const schema = Joi.object().keys({
        nickname: Joi.string().required(),
        id: Joi.string().required(),
        accessToken: Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        return;
    }

    let existing = null;
    try {
        existing = await Account.findByUserId(ctx.request.body.id);
    } catch(e) {
        ctx.throw(500, e);
    }

        
    if(existing) {
        ctx.status = 409;
        ctx.body = {
            result: -1
        };
        return;
    }

    let account = null;
    try {
        account = await Account.localRegister(ctx.request.body);
    } catch(e) {
        ctx.throw(500, e);
    }
    
    ctx.body = account.profile;
};

// 이메일 / 아이디 존재유무 확인
exports.exists = async (ctx) => {
    let existing = null;
    try {
        existing = await Account.findByUserId(ctx.params.userId);
    } catch(e) {
        ctx.throw(500, e);
    }
    if(!existing) {
        ctx.body = {
            result: 0
        };
    }

    ctx.body = {
        result: 1,
        existing
    };
};
