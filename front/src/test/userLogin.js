/**
 * Created by sdsd on 2017/9/1.
 */
global.host = "http://localhost:3000"
require("babel-register")
const storeFactory =require('../store')
let store = storeFactory.createStore();
let user = {
    userName: "ing670",
    passWord: "123456",
}
store.dispatch("LOGIN",user).then(res=>{
    console.log("userinfo",JSON.stringify(store.state.user))
})