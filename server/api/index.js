/**
 * Created by sdsd on 2017/8/29.
 */
const routemap =require("./routemap")
module.exports =function(app){
    routemap.forEach((router)=>{
        if(router.mid){
            app[router.method]("/api"+router.path,router.mid,router.callback);
        }else{
            app[router.method]("/api"+router.path,router.callback);
        }
    })
    //app.post("/api/register")
}