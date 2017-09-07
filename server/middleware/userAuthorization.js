const jwt = require('jsonwebtoken');
const key = '*ing670*';

module.exports = {

    checkLogin: function (req, res, next) {
        let token = req.query.token ? req.query.token : req.headers.authorization

        if (token) {
            jwt.verify(token, key, function (err, user) {
                if (user&&(tokenMap[user._id] == token)) {
                    //res.json({code:0,data: user});
                    user.token = token;
                    req.loginUser = user;
                    next()
                } else {
                    res.json({code: 1001, data: null, msg: "用户未登录"});
                }
            });
        } else {
            res.json({code: 1002, data: null, msg: "请在头部或者url带上token[?token=xxxx]"});
        }
    },
    logout: function (req, res, next) {

        let token = req.query.token ? req.query.token : req.headers.authorization
        console.log("deluser",token)

        if (token) {
            jwt.verify(token, key, function (err, user) {
                console.log("deluser",user)

                if (user&&(tokenMap[user._id] == token)) {
                    delete tokenMap[user._id]
                    next()
                } else {
                    res.json({code: 1001, data: null, msg: "用户未登录"});
                }
            });
        } else {
            res.json({code: 1002, data: null, msg: "请在头部或者url带上token[?token=xxxx]"});
        }

    }
}