var Tag = require('../models/Tag');
var axios = require('axios');
var baseUrl = 'http://localhost:3000';


var tag = new Tag({
    'title': "分类三",
    'createTime': new Date().getTime()
});
axios.post(baseUrl+'/api/tag',tag.toJSON()).then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
