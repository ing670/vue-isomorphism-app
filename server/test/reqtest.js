/**
 * Created by liuqingling on 16/4/27.
 */
var options = {};
options.data = '{"email": "3116@qq.com", "password": "123111"}';
//var postData = {"email": "34156@qq.com", "password": "123111"};
var reqtool = require('../server/utils/reqtool');

var remoteServer = {
    host: 'localhost',
    port: 3000,
};
options.options = {
    host: remoteServer.host,
    port: remoteServer.port,
    path: '/login',
    method: 'POST',
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'  使用这种方式需要用querystring转换一下json
        'Content-Type': 'application/json'
    }
};
options.data = '{"name": "qingling","password": "123456"}';
reqtool(options, function (req, data) {
    console.log(data);

})


//var req = http.request(options, function (res) {
////        console.log(`STATUS: ${res.statusCode}`);
////console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//    res.setEncoding('utf8');
//    res.on('data', function (chunk) {
//        console.log('BODY: ' + chunk);
//    });
//    res.on('end', function () {
//        console.log('No more data in response.')
//    })
//});
//
//req.on('error', function (e) {
//    console.log('problem with request: ' + e.message);
//});
//
//// write data to request body
////var tt =querystring.stringify(postData);
////console.log(tt);
////req.write(querystring.stringify(postData));
//req.write(postData);
//
//req.end();