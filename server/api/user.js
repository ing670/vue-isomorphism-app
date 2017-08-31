/**
 * Created by sdsd on 2017/8/30.
 */
let jwt = require('jsonwebtoken');
let User = require('../models/User');
let passport=require('../middleware/PassportMid')
module.exports = [
    {
        path: '/register',
        method: 'post',
        action: "register",
        callback (req, res) {
            test.home = "register";
            var userInfo = {};
            userInfo.name = req.body.userName;
            userInfo.password = req.body.passWord;
            req.body.phone && (userInfo.phone = req.body.phone)
            userInfo.email = req.body.email;
            userInfo.createTime = Date.now();
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
                    return res.json({code:0,userInfo: user});
                });
            })(req, res, next);
        }
    }
]