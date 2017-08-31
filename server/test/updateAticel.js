var Article = require('../models/Article');
var querystring = require('querystring');
var axios = require('axios');
var baseUrl = 'http://localhost:3000';


var article = {
    'title': "标题",
    'content': "内容666",
    'category': ['默认', '热门', "推荐"],
    'userName': '刘清灵',
    'userIcon': 'http://upload.jianshu.io/collections/images/47/%E9%A6%96%E9%A1%B5%E6%8A%95%E7%A8%BF.png?imageMogr/thumbnail/180x180',
    'cover': "http://upload-images.jianshu.io/upload_images/1225251-6c8621d1df4d8198.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    'likeNum': 24,
    'commentNum': 0,
    'readNum': 0,
    'createTime': Date.now()
};
axios.patch(baseUrl+'/api/article/59a63c983109710bc4a42831',article).then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
