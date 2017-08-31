/**
 * Created by liuqingling on 16/6/1.
 */
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var User = require('../models/User');
passport.use(new Strategy({
        usernameField: 'userName',
        passwordField: 'passWord',
        session: false
}, function(username, password, cb) {
        User.findOne({name:username}, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            user.comparePassword(password,function(isMatch){
                console.log(isMatch);
                if(isMatch){
                    return cb(null, user);
                }else {
                    return cb(null, false);
                }
            });

        });
    }));
passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});
passport.deserializeUser(function(id, cb) {
    User.findOne({_id:id}, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});
module.exports=passport;