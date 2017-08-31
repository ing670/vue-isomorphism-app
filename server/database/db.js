/**
 * Created by liuqingling on 16/4/11.
 */
var mongoose = require('mongoose');
var config = require('../config.json');
mongoose.connect(config.URI,{useMongoClient:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function (callback) {
    console.log('db is connected');
});
console.log('====================================================>')
module.exports=mongoose;