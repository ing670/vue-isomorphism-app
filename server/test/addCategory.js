var Category = require('../models/Category');
var axios = require('axios');
var baseUrl = 'http://localhost:3000';


var category = new Category({
    'title': "分类三",
    'createTime': new Date().getTime()
});
axios.post(baseUrl+'/api/category',category.toJSON()).then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
