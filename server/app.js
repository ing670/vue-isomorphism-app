/**
 * 主要做几个事情
 * 1、引入express
 * 2、初始化log
 * 3、初始化bodyParser
 * 4、初始化router
 * 5、express-session
 * 6、cookie-parser
 * 7、db
 * 8、设置视图
 */
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var plugins = require(__dirname + '/plugins');
var routes = require('./routes/index');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('./database/db');
var passport = require(__dirname + '/middleware/PassportMid');
var initApi = require('./api');
global.tokenMap={
    //家里电脑
    "59aa508f6c7df00a90e143fe":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWFhNTA4ZjZjN2RmMDBhOTBlMTQzZmUiLCJuYW1lIjoiaW5nNjcwIiwicGhvbmUiOiIxMzI0OTcyNjI3MiIsImVtYWlsIjoiMzQ2NDY3MTY3QHFxLmNvbSIsImF2YXRhciI6Imh0dHA6Ly93eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvZXQyenJRenJxQlpaODBvdldFZkEwZDZzMlFrNzRJQ3AwbUVvMmNPV1N6VjZndm5wUmNJUHJmZEQwSTBsNUJyeVdpY2FDY0IzbWVPWGtxNkNpYkVpY1VMZVEvMCIsIl9fdiI6MCwiY3JlYXRlVGltZSI6IjE1MDQzMzM2ODAyNTciLCJpYXQiOjE1MDQ2MTY4MTR9.yK6zfH6o05EnouQ7ZVSYQhKVuoIbxlzQe3UZjfHP-dQ",
    "59a528ee76b03c6351746b09":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWE1MjhlZTc2YjAzYzYzNTE3NDZiMDkiLCJuYW1lIjoiaW5nNjcwIiwiZW1haWwiOiIzNDY0NjcxNjdAcXEuY29tIiwiX192IjowLCJjcmVhdGVUaW1lIjoiMTUwMzk5NjE0MjY0NSIsImlhdCI6MTUwNDU5OTAxMn0.8VbcqBA43WUfl53mfarv4O5RDQLzGnerF2upsxVQkcM",
    "59b0da8cc1cc2c23b8dec415":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWIwZGE4Y2MxY2MyYzIzYjhkZWM0MTUiLCJuYW1lIjoiaW5nNjcwIiwicGhvbmUiOiIxMzI0OTcyNjI3MiIsImVtYWlsIjoiMzQ2NDY3MTY3QHFxLmNvbSIsIl9fdiI6MCwiY3JlYXRlVGltZSI6IjE1MDQ3NjI1MDE2NzkiLCJpYXQiOjE1MDQ3NjI1NTF9.pvvyojPrDvxm_3MYRslrZn2j9VFtpJSFyDVsIv0-hdg"
};
// view engine setup
// app.set('views', path.join(__dirname, '../public/views'));
// app.set('view engine', 'ejs');
function appInit(app) {
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(session({
        secret: 'abcdefg123456789',
        resave: true,
        saveUninitialized: true,
        rolling: true,
        cookie: {maxAge: 24 * 60 * 60000},
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());
// app.use(express.static(path.join(__dirname, '../public')));
    initApi(app)
}
module.exports = appInit;
