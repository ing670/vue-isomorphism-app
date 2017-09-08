/**
 * Created by sdsd on 2017/9/1.
 */
global.host = "http://localhost:3000"
require("babel-register")
const storeFactory =require('../store')
let store = storeFactory.createStore();
store.dispatch("GET_TAG_LIST",{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWFhNTA4ZjZjN2RmMDBhOTBlMTQzZmUiLCJuYW1lIjoiaW5nNjcwIiwicGhvbmUiOiIxMzI0OTcyNjI3MiIsImVtYWlsIjoiMzQ2NDY3MTY3QHFxLmNvbSIsImF2YXRhciI6Imh0dHA6Ly93eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvZXQyenJRenJxQlpaODBvdldFZkEwZDZzMlFrNzRJQ3AwbUVvMmNPV1N6VjZndm5wUmNJUHJmZEQwSTBsNUJyeVdpY2FDY0IzbWVPWGtxNkNpYkVpY1VMZVEvMCIsIl9fdiI6MCwiY3JlYXRlVGltZSI6IjE1MDQzMzM2ODAyNTciLCJpYXQiOjE1MDQ2MTY4MTR9.yK6zfH6o05EnouQ7ZVSYQhKVuoIbxlzQe3UZjfHP-dQ"}).then(res=>{
    console.log(JSON.stringify(store.state.home))
})