/**
 * Created by liuqingling on 16/4/8.
 */
var assert = require('assert');
//var db = require('./server/database/db');
var User = require('./server/models/User');
var request = require('request');
var baseUrl='http://localhost:3000/';
describe('User saved', function() {
    describe('#saved()', function () {
        //说明
        it('save a user',function(done){
            var u = new User({
                'name':'qingling',
                'phone':'13247262122',
                'email': 'qinglin@173.com',
                'captcha':'123',
                'date':new Date()
            })
            u.save(function(err,user){
                //assert.ok(users,"okokoko");
                if(err)
                    throw new Error(JSON.stringify(err));
                done();
            });
        })
    });
});

describe('Find users', function() {
    describe('#find()', function () {
        //说明
        it('find  users',function(done){
            User.find({'name':'ing670'},function(err,users){
                //console.log(users);
                if(err)
                    throw new Error(JSON.stringify(err));
                assert.ok(users,'ok');
                done();
            });
        })
    });
});
describe('/ 主页', function() {
        //说明
        it('主页get请求',function(done){
            request(baseUrl,function(err,data){
                if(err)
                    throw new Error(JSON.stringify(err));
                //console.log(data);
                done();
            });
            //User.find({'name':'qingling'},function(err,users){
            //    //console.log(users);
            //    if(err)
            //        throw new Error(JSON.stringify(err));
            //    assert.ok(users,'ok');
            //    done();
            //});
        })
});