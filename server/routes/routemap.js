/**
 * Created by liuqingling on 16/5/19.
 */
//src覆盖des
var jwt = require('jsonwebtoken');
var User = require('../models/User');
var Article = require('../models/Article');

var test = {};
function extend(des, src, override) {
    for (var i in src) {
        if (override || !(i in des)) {
            des[i] = src[i];
        }
    }
    return des;
}
var routemap = [
    //注册功能
    {
        path: '/register',
        method: 'post',
        action: "register",
        callback: function (req, res) {
            test.home = "register";
            //res.json(req.session.invitecode);
            //if (req.session.invitecode == req.body.captcha) {
            //res.json('ok');
            var user = {};
            user.name = req.body.userName;
            user.password = req.body.passWord;
            req.body.phone ? user.phone = req.body.phone : '';
            user.email = req.body.email;
            user.createTime = Date.now();
            var u = new User(user);
            u.save(function (err) {
                if (err) {
                    console.log(err.errors);
                    res.json({code: -1});
                }
                res.json({code: 0});
            })
            //}

        }
    },
    //添加文章功能
    {
        path: '/createArticle',
        method: 'post',
        action: "createArticle",
        callback: function (req, res) {
            var article = new Article(req.body);
            article.save(function (err) {
                if (err) {
                    res.json(err.errors);
                } else {
                    res.json({code: 0});
                }
            });

        }
    },
    //获取文章详情
    {
        path: '/article/:id',
        method: 'get',
        action: "getArticleDetail",
        callback: function (req, res) {
            if (req.params.id) {
                Article.findOne({'_id': req.params.id}, function (err, article) {
                    if (!err) {
                        res.json({code: 0, data: article});
                    } else {
                        res.json({code: 0, data: {}});
                    }

                })
            } else {
                Article.find(function (err, articles) {
                    res.json({code: 0, data: []});
                })
            }

        }
    },
    //获取所有文章
    {
        path: '/articles',
        method: 'get',
        action: "getArticles",
        callback: function (req, res) {
            Article.find(function (err, articles) {
                if(err){
                    res.json({code: -1, data: []});
                }
                res.json({code: 0, data: articles});
            })
        }
    },
    //主页
    {
        path: '/',
        method: 'get',
        action: 'index',
        callback: function (req, res, next) {
            if (req.user) {
                res.json(req.user);
            } else {
                res.redirect('/login');
            }

        }
    }, {
    //验证码
        path: '/invitecode',
        method: 'get',
        callback: function (req, res, next) {
            var ary = require('../utils/captcha').get();
            //req.session.invitecode = ary[0];
            req.session.invitecode = 123456;
            res.end(ary[1]);
            console.log(ary[0]);
            // console.log(req.session);
        }
    }, {
        path: '/login',
        method: 'get',
        callback: function (req, res, next) {
            res.render("login");
        }
    },
    {
        //退出
        path: '/api/logout',
        method: 'get',
        callback: function (req, res, next) {
            var token = req.query['token'];
            require('../database/redis').redisClient.del(token, function (err, rep) {
                if (err) {
                    console.log(err);
                    return;
                }
                rep && res.json(rep);
                rep || res.redirect('/');
            });
        }
    },
    {
        path: '/logout',
        method: 'get',
        callback: function (req, res, next) {
            req.logout();
            res.json(req.user);
        }
    },
    {
        path: '/login',
        method: 'post',
        mid: require('../middleware/PassportMid').authenticate('local', {failureRedirect: '/ccc'}),
        callback: function (req, res, next) {
            if (req.isAuthenticated()) {
                var user = req.user.toJSON();
                console.log(user._id);
                var token = jwt.sign(user._id, "liuqingling");
                require('../database/redis').redisClient.set(token, "");
                res.json({token: token});
            } else {
                res.redirect('/login');
            }
        }
    }, {
        path: '/sign',
        method: 'get',
        callback: function (req, res, next) {
            if (req.isAuthenticated()) {
                var user = req.user.toJSON();
                console.log(user._id);
                var token = jwt.sign(user._id, "liuqingling");
                require('../database/redis').redisClient.set(token);
                res.json({token: token});
            } else {
                res.redirect('/login');
            }
        }
    }, {
        path: '/api/getdata',
        method: 'get',
        callback: function (req, res, next) {
            //if(req.isAuthenticated()){
            var token = req.query['token'];
            require('../database/redis').redisClient.exists(token, function (err, rep) {
                if (err) {
                    console.log(err);
                    res.redirect('/login');
                }
                rep && res.json('fuck');
                rep || res.redirect('/login');
            });

            //jwt.verify(token,'liuqingling',function(err,decoded){
            //    if(err){
            //        res.redirect('/login');
            //    }else {
            //        res.json(decoded.head);
            //    }
            //});
            //}else {
            //    res.json("fuck");
            //}
        }
    }, {
        path: '/api/test',
        method: 'get',
        callback: function (req, res, next) {
            console.log(req.headers);
            req.session.t = req.query.token;
            res.json({data: 'ok'});
        }
    }, {
        path: '/api/test2',
        method: 'get',
        callback: function (req, res, next) {
            console.log(req.headers);
            if (req.session.t == req.query.token) {
                res.json({data: req.session.t});
            } else {
                res.json({data: '滚'});
            }

        }
    }
];
module.exports = routemap;
