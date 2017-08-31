var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/User');
var session = require('express-session');
var reqtool = require('../utils/reqtool');
var util = require('util');
var plugins=require('../plugins');

var routeMap=require("./routemap");

var Route={};
Route.initRoutes=function(app){
    app.use(function(req,res,next){
        res.plugins={};
        next();
    });
    var plugin=plugins.filter(function(p){
        return p.installed===true;
    });
    routeMap.forEach(function(r){
        if(util.isArray(plugin)){
            console.log("========"+r.path);
            plugin.forEach(function(pg){
                app.use(express.static(path.join(__dirname, '../plugins/'+pg.id+"/public")));
                console.log(path.join(__dirname, '../plugins/'+pg.id+"/public"));
                pg.hooks.forEach(function(hk){
                    if(hk.hook=== r.action){
                        router[r.method](r.path,require(__dirname+"/../plugins/"+pg.id+"/"+pg.main)[hk.method]);
                    }
                });
            });
            if(r.mid){
                router[r.method](r.path,r.mid,r.callback);
            }else{
                router[r.method](r.path,r.callback);
            }
        }
    });
    return router;
};
module.exports = Route;
