/**
 * Created by liuqingling on 16/4/11.
 * {
 *  state:0/1  //state=0 未通过审批 state=1 通过审批
 * }
 */
// var bcrypt = require('bcrypt');
var mongoose = require('../database/db');
var Schema = mongoose.Schema;
var articleJson = {
    'state':0,//是否验证通过的用户
    'title':{ //文章标题
        type: 'String',
        required:[true,'请输入标题'],
    },
    'content': { //文章内容
        type: 'String',
        required:[true,'请输入内容'],
    },
    'category': [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    'userName': { //用户名
        type: 'String',
    },
    'userIcon': { //用户头像
        type: 'String',
    },
    'cover': { //文章封面
        type: 'String',
    },
    'likeNum':{ //点赞次数
        type: 'Number',
    },
    'commentNum':{ //评论数
        type: 'Number',
    },
    'readNum':{ //阅读数
        type: 'Number',
    },
    'createTime':{ type: 'String', default: new Date().getTime() } //创建时间
};
var articleSchema =  new Schema(articleJson);
// articleSchema.pre('save',function(next){
//     var user = this;
//     if (!user.isModified('password')) return next();
//     bcrypt.genSalt(10, function(err, salt) {
//         if (err) return next(err);
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// });
// userSchema.methods.comparePassword = function(password, cb) {
//     bcrypt.compare(password, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(isMatch);
//     });
// };
var Article=mongoose.model('Article', articleSchema);
module.exports =Article;