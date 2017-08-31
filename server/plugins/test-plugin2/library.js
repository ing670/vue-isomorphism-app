/**
 * Created by liuqingling on 16/5/19.
 */
var fs=require("fs");
var test={};
test.info=require('./plugin.json');

test.deleteUserData=function(req,res,next){
    console.log("deleteUserData2");
    next();
};
test.getStrategy=function(req,res,next){
    console.log("getStrategy2");
    res.plugins["title"]="<div>真的好吗</div>";
    res.plugins["content"]="<div>content</div>";

    //res.sendfile(__dirname+"/public/html/html.html");123
    //var abc=res.renderFile(__dirname+"/html/html.html");
    //console.log(abc);
    next();

};
module.exports=test;