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
    'state':0,//是否验证通过的用户
    'password':{
        type: 'String',
        required:[true,'请您输入密码'],
    },
    'name': {
        type: 'String',
        required:[true,'请您输入用户名'],
    },
    'phone': {
        type: 'String',
        required:[false,'请您输入手机号码'],
        validate:{
            validator: function(v) {
                if(/^1[3|4|5|7|8]\d{9}$/.test(v)){
                    return true
                }else{
                    return false;
                }
            },
            message: '{VALUE} 无效手机号码'
        }
    },
    'email': {
        type: 'String',
        required:[true,'请您输入邮箱'],
        validate:{
            validator: function(v) {
                return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);
            },
            message: '{VALUE} 您的电子邮件格式不正确'
        }
    },
    'avatar':{
        type: 'String'
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
