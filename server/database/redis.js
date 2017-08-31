/**
 * Created by liuqingling on 16/6/3.
 */

var redis = require('redis');
var redisClient = redis.createClient();

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

redisClient.on('connect', function () {
    console.log('Redis is ready');
});

exports.redis = redis;
exports.redisClient = redisClient;