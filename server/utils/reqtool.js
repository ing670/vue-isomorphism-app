/**
 * Created by liuqingling on 16/4/25.
 */
var http = require('http');
//var querystring = require('querystring');
//仅仅支持application/json;charset=utf-8
module.exports = function(options,success) {
    //var headers = req.headers;
    //headers.host = 'www.xxx.com';
    //var options = {
    //    host: 'www.xxx.com',
    //    port: 80,
    //    path: '/getUser',
    //    method: 'GET',
    //    //headers: headers
    //};
    var req = http.request(options.options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            //var data = JSON.parse(data);
            success(res, data);
        });
    });
    req.on('error', function (e) {
        console.log("error: " + e.message);
    });
    if(options.data){
        req.write(options.data);
    }
    //console.log(options.data);
    req.end();
}