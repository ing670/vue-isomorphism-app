/**
 * Created by sdsd on 2017/8/30.
 */
var Article = require('../models/Article');

module.exports = [
    {
        path: '/article',
        method: 'post',
        action: "article",
        callback: function (req, res) {
            var article = new Article(req.body);
            article.save(function (err) {
                if (err) {
                    res.json({code: 1002,msg:"添加文章失败"});
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
                Article.findOne({'_id': req.params.id}).populate('category').exec(function (err, article) {
                    if (!err) {
                        res.json({code: 0, data: article});
                    } else {
                        res.json({code: 0, data: {}});
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
        callback: function (req, res) {
            if (req.params.id) {
                Article.deleteOne({'_id': req.params.id}, function (err, article) {
                    if (!err) {
                        res.json({code: 0,data: null, msg: "删除成功"});
                    } else {
                        res.json({code: 0, data: null,msg:'删除失败'});
                    }

                })
            }

        }
    },
    {
        path: '/article/:id',
        method: 'patch',
        action: "updateArticle",
        callback: function (req, res) {
            if (req.params.id) {
                console.log(req.body)
                Article.findOneAndUpdate({'_id': req.params.id},req.body, function (err, article) {
                    console.log(err)
                    if (!err) {
                        res.json({code: 0,data: article, msg: "更新成功"});
                    } else {
                        res.json({code: 0, data: null,msg:'更新失败'});
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
            Article.find({}).populate('category').exec(function (err, articles) {
                if (err) {
                    res.json({code: -1, data: []});
                }
                res.json({code: 0, data: articles});
            })
        }
    }
]