/**
 * Created by liuqingling on 16/12/16.
 */
var axios = require('axios');
var baseUrl = 'http://localhost:8080';

var http = require('http');
var Article = require('../models/Article');
var querystring = require('querystring');

var article = new Article({
    'state': 0,//是否验证通过的用户
    'title': "标题",
    'content': "内容",
    'category': ['默认', '热门', "推荐"],
    'userName': '刘清灵',
    'userIcon': 'http://upload.jianshu.io/collections/images/47/%E9%A6%96%E9%A1%B5%E6%8A%95%E7%A8%BF.png?imageMogr/thumbnail/180x180',
    'cover': "http://upload-images.jianshu.io/upload_images/1225251-6c8621d1df4d8198.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    'likeNum': 24,
    'commentNum': 0,
    'readNum': 0,
    'createTime': Date.now()
});
//增加
// for (var i = 0 ;i<200;i++){
//     article.title+=i;
//     article.content+=i;
//     article.save(function (err) {
//         if (err){
//             console.log(err.errors);
//         }else{
//             console.log('ok')
//         }
//
//     });
// }

//return;
// axios.get(baseUrl + '/invitecode').then(function () {
//     axios.post(baseUrl + '/createArticle', {
//         'state': 0,//是否验证通过的用户
//         'title': "",
//         'content': "内容666",
//         'category': ['默认', '热门', "推荐"],
//         'userName': '刘清灵',
//         'userIcon': 'http://upload.jianshu.io/collections/images/47/%E9%A6%96%E9%A1%B5%E6%8A%95%E7%A8%BF.png?imageMogr/thumbnail/180x180',
//         'cover': "http://upload-images.jianshu.io/upload_images/1225251-6c8621d1df4d8198.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
//         'likeNum': 24,
//         'commentNum': 0,
//         'readNum': 0,
//         'createTime': Date.now()
//     }).then(function (res) {
//         console.log(res.data);
//     });
// })
// axios.get(baseUrl + '/article/5853b0167b6fb687c9643db2').then(function (res) {
//     console.log(res.data);
// });
