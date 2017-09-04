/**
 * Created by sdsd on 2017/8/30.
 */

let User = require('../models/User');
let passport=require('../middleware/PassportMid')
let userAuth=require('../middleware/userAuthorization')
const jwt = require('jsonwebtoken');
const key = '*ing670*';
module.exports = [
    {
        path: '/register',
        method: 'post',
        action: "register",
        callback (req, res) {
            // test.home = "register";
            var userInfo = {};
            userInfo.name = req.body.userName;
            userInfo.password = req.body.passWord;
            req.body.phone && (userInfo.phone = req.body.phone)
            userInfo.email = req.body.email;
            var user = new User(userInfo);
            user.save(function (err) {
                if (err) {
                    res.json({code: -1});
                }
                res.json({code: 0});
            })
        }
    }, {
        path: '/login',
        method: 'post',
        callback: function (req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.json({code:1001,msg:"登录失败"}); }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    let userInfo = user.toJSON();
                    delete userInfo.password;
                    let token = jwt.sign(userInfo, key);
                    //let token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),data:user}, '*ing670*');
                    userInfo.token = token;
                    tokenMap[userInfo._id] = token;
                    console.log(tokenMap)
                    return res.json({code:0,data: userInfo});
                });
            })(req, res, next);
        }
    },{
        path: '/getUserInfo',
        method: 'get',
        mid:userAuth.checkLogin,
        callback: function (req, res, user) {
            res.json({code:0,data: req.loginUser});
        }
    },{
        path: '/logOut',
        method: 'get',
        mid:userAuth.logout,
        callback: function (req, res, next) {
            res.json({code:0,data:null,msg:"用户已退出"});
        }
    }
]