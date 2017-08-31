/**
 * Created by liuqingling on 16/12/16.
 */
var axios = require('axios');
var baseUrl = 'http://localhost:3000';
// axios.get(baseUrl+'/api/invitecode').then(function () {
//     axios.post(baseUrl+'/api/register',{
//         userName:"ing670",
//         passWord:"123456",
//         captcha:"123456",
//         email:'346467167@qq.com'
//     }).then(function (res) {
//         console.log(res.data);
//     });
// })
axios.post(baseUrl+'/api/register',{
    userName: "ing670",
    passWord: "123456",
    captcha: "123456",
    email: '346467167@qq.com'
}).then(function (res) {
    console.log(res.data);
});
