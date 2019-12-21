require('dotenv');
const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;
const Tip = new Schema({
    userId: Schema.Types.ObjectId,
    title: String,
    content: String,
    thumbcount: Number,
    thumbusers: [Schema.Types.ObjectId],
    createdAt: { type: Date, default: Date.now() }
});

Tip.statics.findByDate = function() {
    return this.find({}).sort('-createdAt').exec();
};

Tip.statics.findByThumbUp = function() {
    return this.find({ createdAt: { $gte: moment().add(-24, 'hours'), $lte: moment() } }).sort('-thumbcount').exec();
};

Tip.statics.thumbUp = function({ id, userId }) {
    this.findById(id, function(err, res) {
        if(err) return console.log(err);
        
        if(res.thumbusers.indexOf(userId) !== -1) return -1;
        
        res.thumbusers.push(userId);
        console.log(res.thumbusers);
        res.thumbcount = res.thumbusers.length;
        res.save();
        return 1;
    });
};

Tip.statics.postTip = function({ userId, title, content }) {
    const tip = new this({
        userId,
        title,
        thumbup: 0,
        content,
        createdAt: Date.now()    
    });

    return tip.save();
};

Tip.statics.myPosts = function(userId) {
    return this.find({ userId: userId }).sort('-createdAt').exec();
};

Tip.statics.myThumbUps = function(userId) {
    return this.find({ thumbusers: userId }).sort('-createdAt').exec();
};

Tip.statics.searchByKeyword = function(keyword) {
    return this.find({ title: { $regex: '.*' + keyword + '.*' } }).exec();
};

module.exports = mongoose.model('Tip', Tip);