/**
 * Created by sdsd on 2017/8/30.
 */
const Article = require('../models/Article');
let userAuth=require('../middleware/userAuthorization')
const ERROR_CODE = require('./errorcodes')
module.exports = [
    {
        path: '/article',
        method: 'post',
        action: "article",
        mid:userAuth.checkLogin,
        callback: function (req, res) {
            req.body.likeNum=0;
            req.body.commentNum=0;
            req.body.readNum=0;
            req.body.author=req.loginUser._id
            let article = new Article(req.body);
            article.save(function (err,article) {
                if (err) {
                    res.json(ERROR_CODE.ADD_ARTICLE_FAIL);
                } else {
                    res.json({code: 0,data:article});
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
                Article.findOne({'_id': req.params.id}).populate('tags').populate('author').exec(function (err, article) {
                    if (!err) {
                        article.readNum=article.readNum+1
                        article.save(function(saveerr){
                            if(!saveerr){
                                res.json({code: 0, data: article});
                            }else{
                                res.json({...ERROR_CODE.GET_ARTICLE_FAIL,data: null});
                                
                            }
                        })
                    }else{
                        res.json({...ERROR_CODE.GET_ARTICLE_FAIL,data: null});                        
                    }
                })

            } else {
                Article.find(function (err, articles) {
                    res.json({code: 0, data: articles});
                })
            }

        }
    },
    {
        path: '/article/:id',
        method: 'delete',
        action: "deleteArticle",
        mid:userAuth.checkLogin,
        callback: function (req, res) {
            if (req.params.id) {
                Article.deleteOne({'_id': req.params.id}, function (err, article) {
                    if (!err) {
                        res.json({code: 0,data: null, msg: "删除成功"});
                    } else {
                        res.json({...ERROR_CODE.DEL_ARTICLE_FAIL,data: null});
                    }
                })
            }

        }
    },
    {
        path: '/article/:id',
        method: 'patch',
        action: "updateArticle",
        mid:userAuth.checkLogin,
        callback: function (req, res) {
            if (req.params.id) {
                let patch=req.body
                Article.findOneAndUpdate({'_id': req.params.id},patch).populate('tags').exec(function (err, article) {
                    if (!err) {
                        let at=article.toJSON();
                        res.json({code: 0,data: {...at,...patch}, msg: "更新成功"});
                    } else {
                        res.json(ERROR_CODE.UPDATE_ARTICLE_FAIL);
                    }
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
                Article.find({}).populate('tags').populate('author','name avatar').sort({'_id':'-1'}).exec(function (err, articles) {
                    if (err) {
                        res.json({...ERROR_CODE.GET_ARTICLES_FAIL,data:[]});
                    }
                    res.json({code: 0, data: articles});
                })
            }
    },{
        path: '/myArticles',
        method: 'get',
        action: "getArticles",
        mid:userAuth.checkLogin,
        callback: function (req, res) {
            if(req.loginUser){
                Article.find({author:req.loginUser._id}).populate('tags').sort({'_id':'-1'}).exec(function (err, articles) {
                    if (err) {
                        res.json({...ERROR_CODE.GET_MY_ARTICLES_FAIL,data:[]});
                    }
                    res.json({code: 0, data: articles});
                })
            }
        }
    }
]