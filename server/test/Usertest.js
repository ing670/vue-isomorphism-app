/**
 * Created by liuqingling on 16/4/11.
 */
var http = require('http');
var User = require('../models/User');
var querystring = require('querystring');

var u = new User({
    'state':0,
    'name': 'qingling',
    'password':'123456',
    'phone': '13247262122',
    'email': 'qinglin@173.com',
    'captcha':'captcha',
    'date': new Date()
});
//增加
// u.save(function(err){
//     if (err)
//         console.log(err.errors);
// });
//查
User.findOne({'name': 'ing670'},function(err,user){
   console.log(user);
});
//找
//User.find({'phone':'13249726272'},function(err,user){
//    console.log(user.toString());
//});
//User.update({'_id': '571f1bf34c3ba9ed281512df'},{$set: { state: 0 }},function(err,user){
//    console.log("fuk");
//
//    console.log(user);
//});
