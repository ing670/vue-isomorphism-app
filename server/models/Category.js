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
var categoryJson = {
    'title':{
        type: 'String',
        required:[true,'请您输入分类名'],
    },
    'createTime':{type:'String', default: new Date().getTime() }
};
var categorySchema =  new Schema(categoryJson);
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

var Category=mongoose.model('Category', categorySchema);
module.exports =Category;