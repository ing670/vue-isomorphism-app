var Article = require('../models/Article');
var Category = require('../models/Tag');

var querystring = require('querystring');
var axios = require('axios');
var baseUrl = 'http://localhost:3000';

var article = new Article({
    'title': "9999",
    'content': "内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas内容asdasdasdas",
    // 'category': ["59aa44934a52651d78d98877","59a7765f675d871bbdc14ca9"],
    'tags': [],
    // 'author':'59b0c3f339b75522048d4590',
    'cover': "http://upload-images.jianshu.io/upload_images/1225251-6c8621d1df4d8198.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    'createTime': new Date().getTime()
});
let at =article.toJSON();
console.log(at)
    axios.post(baseUrl+'/api/article?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWFhNTA4ZjZjN2RmMDBhOTBlMTQzZmUiLCJuYW1lIjoiaW5nNjcwIiwicGhvbmUiOiIxMzI0OTcyNjI3MiIsImVtYWlsIjoiMzQ2NDY3MTY3QHFxLmNvbSIsImF2YXRhciI6Imh0dHA6Ly93eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvZXQyenJRenJxQlpaODBvdldFZkEwZDZzMlFrNzRJQ3AwbUVvMmNPV1N6VjZndm5wUmNJUHJmZEQwSTBsNUJyeVdpY2FDY0IzbWVPWGtxNkNpYkVpY1VMZVEvMCIsIl9fdiI6MCwiY3JlYXRlVGltZSI6IjE1MDQzMzM2ODAyNTciLCJpYXQiOjE1MDQ2MTY4MTR9.yK6zfH6o05EnouQ7ZVSYQhKVuoIbxlzQe3UZjfHP-dQ',at).then(function (res) {
        console.log(res.data);
    }).catch(err=>console.log(err));


