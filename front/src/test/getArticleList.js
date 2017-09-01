/**
 * Created by sdsd on 2017/9/1.
 */

require("babel-register")
const storeFactory =require('../store')
let store = storeFactory.createStore();
store.dispatch("GET_HOME_DATA").then(res=>{
    console.log(JSON.stringify(store.state.home))
})
