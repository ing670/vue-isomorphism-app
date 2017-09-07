/**
 * Created by sdsd on 2017/9/1.
 */
global.host = "http://localhost:3000"
require("babel-register")
const storeFactory =require('../store')
let store = storeFactory.createStore();
store.dispatch("GET_MY_ARTICLES","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWIwZGE4Y2MxY2MyYzIzYjhkZWM0MTUiLCJuYW1lIjoiaW5nNjcwIiwicGhvbmUiOiIxMzI0OTcyNjI3MiIsImVtYWlsIjoiMzQ2NDY3MTY3QHFxLmNvbSIsIl9fdiI6MCwiY3JlYXRlVGltZSI6IjE1MDQ3NjI1MDE2NzkiLCJpYXQiOjE1MDQ3NjI1NTF9.pvvyojPrDvxm_3MYRslrZn2j9VFtpJSFyDVsIv0-hdg").then(res=>{
    console.log(JSON.stringify(store.state.post))
})