/**
 * Created by sdsd on 2017/8/30.
 */
var Tag = require('../models/Tag');

module.exports = [
    {
        path: '/tag',
        method: 'post',
        action: "tag",
        callback: function (req, res) {
            var tag = new Tag(req.body);
            tag.save(function (err) {
                if (err) {
                    res.json({code: 1002,msg:"添加分类失败"});
                } else {
                    res.json({code: 0});
                }
            });

        }
    },
    //获取tag详情
    {
        path: '/tag/:id',
        method: 'get',
        action: "getTagDetail",
        callback: function (req, res) {
            if (req.params.id) {
                Tag.findOne({'_id': req.params.id}, function (err, category) {
                    if (!err) {
                        res.json({code: 0, data: category});
                    } else {
                        res.json({code: 0, data: {}});
                    }

                })
            } else {
                Tag.find(function (err, categorys) {
                    res.json({code: 0, data: categorys});
                })
            }

        }
    },
    {
        path: '/tag/:id',
        method: 'delete',
        action: "deleteTag",
        callback: function (req, res) {
            if (req.params.id) {
                Tag.deleteOne({'_id': req.params.id}, function (err) {
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
        path: '/tag/:id',
        method: 'patch',
        action: "updateTag",
        callback: function (req, res) {
            if (req.params.id) {
                Tag.findOneAndUpdate({'_id': req.params.id},req.body, function (err, category) {
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
        path: '/tag',
        method: 'get',
        action: "getTag",
        callback: function (req, res) {
            Tag.find(function (err, categorys) {
                if (err) {
                    res.json({code: -1, data: []});
                }
                res.json({code: 0, data: categorys});
            })
        }
    }
]