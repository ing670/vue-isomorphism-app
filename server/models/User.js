/**
 * Created by liuqingling on 16/4/11.
 * {
 *  state 0/1  //state=0 未经过验证 state=1 经过验证
 *  password 密码
 *  name 用户名
 *  phone 手机号码
 *  email 邮件
 *  date 创建日期
 * }
 */
var mongoose = require('../database/db');
var Schema = mongoose.Schema;
var userJson = {
    'state':{
        type: 'Number',
        required:true,
        default:0
    },
    'password':{
        type: 'String',
        required:true,
        default:''
    },
    'name': {
        type: 'String',
        required:true,
        default:''
    },
    'phone': {
        type: 'String',
        required:false,
        default:''
    },
    'email': {
        type: 'String',
        required:true,
        default:''
    },
    'avatar':{
        type: 'String',
        required:true,
        default:''
    },
    'createTime':{type:'String', default: new Date().getTime() }
};
var userSchema =  new Schema(userJson);
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
userSchema.methods.comparePassword = function(password, cb) {
    if(password == this.password){
        cb(true);
    }else{
        cb(false);
    }
};
var User=mongoose.model('User', userSchema);
module.exports =User;
