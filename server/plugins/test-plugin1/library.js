/**
 * Created by liuqingling on 16/5/19.
 */
var test={};
test.info=require('./plugin.json');
test.deleteUserData=function(req,res,next){
    console.log("deleteUserData1");
    next();
};
test.getStrategy=function(req,res,next){
    console.log("getStrategy1");
    next();
};
module.exports=test;