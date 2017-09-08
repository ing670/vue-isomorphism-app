var Tag = require('../models/Tag');
var axios = require('axios');
var baseUrl = 'http://localhost:3000';


var tag = new Tag({
    'icon':'https://dn-mhke0kuv.qbox.me/0d614af263aa63aa6a77.png?imageView2/2/w/200/h/64/q/85/interlace/1',
    'title': "nodeJS",
    'createTime': new Date().getTime()
});
axios.post(baseUrl+'/api/tag',tag.toJSON()).then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
