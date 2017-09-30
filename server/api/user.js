/**
 * Created by sdsd on 2017/8/30.
 */

let User = require('../models/User');
let passport=require('../middleware/PassportMid')
let userAuth=require('../middleware/userAuthorization')
const jwt = require('jsonwebtoken');
const ERROR_CODE = require('./errorcodes');
const key = '*ing670*';
module.exports = [
    {
        path: '/register',
        method: 'post',
        action: "register",
        async callback (req, res) {
            // test.home = "register";
            var userInfo = {};
            userInfo.name = req.body.userName;
            userInfo.password = req.body.passWord;
            req.body.phone && (userInfo.phone = req.body.phone)
            userInfo.email = req.body.userName;
            var user = new User(userInfo);
            let exist = await  User.findOne({'email':userInfo.email})
            if(!exist){
                try{
                   let uinfo=await user.save();
                   if(uinfo){

                       res.json({code:0,msg:"注册成功"})
                   }else{
                       res.json(ERROR_CODE.USER_REGISTER_ERROR)
                   }
                }catch (err){
                    console.log(err)
                }finally{
                    res.json(ERROR_CODE.USER_REGISTER_ERROR)
                }
            }else{
                res.json(ERROR_CODE.USER_EXIST)
            }
        }
    }, {
        path: '/login',
        method: 'post',
        callback: function (req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.json({code:1000,msg:"登录失败"}); }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    let userInfo = user.toJSON();
                    delete userInfo.password;
                    let token = jwt.sign(userInfo, key);
                    //let token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),data:user}, '*ing670*');
                    userInfo.token = token;
                    tokenMap[userInfo._id] = token;
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