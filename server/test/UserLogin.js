/**
 * Created by liuqingling on 16/12/16.
 */
var axios = require('axios');
var baseUrl = 'http://localhost:3000';
axios.post(baseUrl+'/api/login',{
    userName: "ing670",
    passWord: "123456",
    email: '346467167@qq.com'
}).then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
