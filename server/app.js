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
global.tokenMap={"59aa508f6c7df00a90e143fe":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWFhNTA4ZjZjN2RmMDBhOTBlMTQzZmUiLCJuYW1lIjoiaW5nNjcwIiwicGhvbmUiOiIxMzI0OTcyNjI3MiIsImVtYWlsIjoiMzQ2NDY3MTY3QHFxLmNvbSIsImF2YXRhciI6Imh0dHA6Ly93eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvZXQyenJRenJxQlpaODBvdldFZkEwZDZzMlFrNzRJQ3AwbUVvMmNPV1N6VjZndm5wUmNJUHJmZEQwSTBsNUJyeVdpY2FDY0IzbWVPWGtxNkNpYkVpY1VMZVEvMCIsIl9fdiI6MCwiY3JlYXRlVGltZSI6IjE1MDQzMzM2ODAyNTciLCJpYXQiOjE1MDQ1NDUzNjF9.SAahyXZwxaH0j3IGtrri5M6psJRCjGHACh8So-YvijY"};

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
