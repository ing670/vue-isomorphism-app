/**
 * Created by sdsd on 2017/8/30.
 * 原创的文章
 * 转载的文章
 * 加精的文章
 */
var Category = require('../models/Category');

module.exports = [
    {
        path: '/category',
        method: 'post',
        action: "category",
        callback: function (req, res) {
            var category = new Category(req.body);
            category.save(function (err) {
                if (err) {
                    res.json({code: 1002,msg:"添加分类失败"});
                } else {
                    res.json({code: 0});
                }
            });

        }
    },
    //获取文章详情
    {
        path: '/category/:id',
        method: 'get',
        action: "getCategoryDetail",
        callback: function (req, res) {
            if (req.params.id) {
                Category.findOne({'_id': req.params.id}, function (err, category) {
                    if (!err) {
                        res.json({code: 0, data: category});
                    } else {
                        res.json({code: 0, data: {}});
                    }

                })
            } else {
                Category.find(function (err, categorys) {
                    res.json({code: 0, data: categorys});
                })
            }

        }
    },
    {
        path: '/category/:id',
        method: 'delete',
        action: "deleteCategory",
        callback: function (req, res) {
            if (req.params.id) {
                Category.deleteOne({'_id': req.params.id}, function (err) {
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
        path: '/category/:id',
        method: 'patch',
        action: "updateCategory",
        callback: function (req, res) {
            if (req.params.id) {
                Category.findOneAndUpdate({'_id': req.params.id},req.body, function (err, category) {
                    if (!err) {
                        res.json({code: 0,data: category, msg: "更新成功"});
                    } else {
                        res.json({code: 0, data: null,msg:'更新失败'});
                    }

                })
            }

        }
    },
    //获取所有分类
    {
        path: '/categorys',
        method: 'get',
        action: "getCategorys",
        callback: function (req, res) {
            Category.find(function (err, categorys) {
                if (err) {
                    res.json({code: -1, data: []});
                }
                res.json({code: 0, data: categorys});
            })
        }
    }
]