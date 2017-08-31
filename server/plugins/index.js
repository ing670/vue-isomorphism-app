/**
 * Created by liuqingling on 16/5/18.
 */
var fs = require('fs'),
    Plugins = [];

function readPlugin(path){
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item){
        console.log(path + '/' + item);
        if(fs.statSync(path + '/' + item).isDirectory()){
            var p=path + '/' + item+"/"+"plugin.json";
            var isexists=fs.existsSync(p);
            if(isexists){
                var plugininfo=require(p);
                var isonPlugins =Plugins.find(function(it){
                    return it.id==plugininfo.id;
                });
                if(!isonPlugins){
                    Plugins.push(plugininfo);
                }
            }
        }
    });
}
readPlugin(__dirname);

module.exports=Plugins;
