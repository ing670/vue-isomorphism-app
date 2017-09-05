/**
 * Created by sdsd on 2017/8/31.
 */
/**
 * Created by liuqingling on 16/4/11.
 * {
 *  title 分类名
 * }
 */
var mongoose = require('../database/db');
var Schema = mongoose.Schema;
var tagJson = {
    'title':{
        type: 'String',
    },
    'createTime':{type:'String', default: new Date().getTime() }
};
var tagSchema =  new Schema(tagJson);
// userSchema.pre('save',function(next){
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

var Tag=mongoose.model('Tag', tagSchema);
module.exports =Tag;