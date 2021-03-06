require('dotenv');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    nickname: String,
    id: String,
    accessToken: String
});

Account.statics.findByUserId = function(userId) {
    return this.findOne({ id: userId }).exec();
};

Account.statics.localRegister = function({ nickname, id, accessToken }) {
    const account = new this({
        nickname,
        id,
        accessToken
    });

    return account.save();
};

Account.methods.validatePassword = function(password) {
    const hashed = hash(password);
    return this.password === hashed;
};

module.exports = mongoose.model('Account', Account);