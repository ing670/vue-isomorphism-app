var Article = require('../models/Article');
var Category = require('../models/Tag');

var querystring = require('querystring');
var axios = require('axios');
var baseUrl = 'http://localhost:3000';

var article = new Article({
    'title': "9999",
    'content': "内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas",
    // 'category': ["59aa44934a52651d78d98877","59a7765f675d871bbdc14ca9"],
    'tags': ["59aa44934a52651d78d98877"],
    'author':'59b0c3f339b75522048d4590',
    'cover': "http://upload-images.jianshu.io/upload_images/1225251-6c8621d1df4d8198.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    'likeNum': 24,
    'commentNum': 0,
    'readNum': 0,
    'createTime': new Date().getTime()
});

axios.post(baseUrl+'/api/article',article.toJSON()).then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
