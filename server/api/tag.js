/**
 * Created by sdsd on 2017/8/30.
 */
const Tag = require('../models/Tag');
const ERROR_CODE = require('./errorcodes')
module.exports = [
    {
        path: '/tag',
        method: 'post',
        action: "tag",
        callback: function (req, res) {
            var tag = new Tag(req.body);
            tag.save(function (err) {
                if (err) {
                    res.json({code: 1002, msg: "添加分类失败"});
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
                Tag.findOne({'_id': req.params.id}, function (err, tag) {
                    if (!err) {
                        res.json({code: 0, data: tag});
                    } else {
                        res.json({...ERROR_CODE.GET_TAG_FAIL, data: null});
                    }
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
                        res.json({code: 0, data: null, msg: "删除成功"});
                    } else {
                        res.json({...ERROR_CODE.DEL_TAG_FAIL, data: null});
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
                Tag.findOneAndUpdate({'_id': req.params.id}, req.body, function (err, category) {
                    if (!err) {
                        res.json({code: 0, data: category, msg: "更新成功"});
                    } else {
                        res.json({...ERROR_CODE.UPDATE_TAG_FAIL, data: null});
                    }

                })
            }

        }
    },
    {
        path: '/tags',
        method: 'get',
        action: "getTags",
        callback: function (req, res) {
            Tag.find(function (err, tags) {
                if (err) {
                    res.json({...ERROR_CODE.GET_TAG_LIST_FAIL, data: []});
                }
                res.json({code: 0, data: tags});
            })
        }
    }, {
        path: '/searchTag/:keyword',
        method: 'get',
        action: "searchTag",
        callback: function (req, res) {
            let keyword = req.params.keyword;
            if (keyword) {
                const reg = new RegExp(keyword, 'i');
                Tag.find({
                    $or: [{'title': {'$regex': reg, $options: '$i'}}],
                }, function (err, tags) {
                    if (err) {
                        res.json({...ERROR_CODE.GET_TAG_LIST_FAIL, data: []});
                    }
                    res.json({code: 0, data: tags});
                })
            }else{
                Tag.find(function (err, tags) {
                    if (err) {
                        res.json({...ERROR_CODE.GET_TAG_LIST_FAIL, data: []});
                    }
                    res.json({code: 0, data: tags});
                })
            }
        }
    },
    {
        path: '/searchTag',
        method: 'get',
        action: "searchTag",
        callback: function (req, res) {

                Tag.find(function (err, tags) {
                    if (err) {
                        res.json({...ERROR_CODE.GET_TAG_LIST_FAIL, data: []});
                    }
                    res.json({code: 0, data: tags});
                })

        }
    }
]