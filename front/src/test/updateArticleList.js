global.host = "http://localhost:3000"
require("babel-register")
const storeFactory =require('../store')
let store = storeFactory.createStore();
let article = {"_id":"5a3c6af80487544de8a90934","title":"我是标题","content":"# 啊2","cover":"/public/upload/cover-1513909077943.png","likeNum":0,"commentNum":0,"readNum":20,"author":"59cf57f64f963522d46e5779","__v":1,"createTime":"1513908984204","like":['59cf57f64f963522d46e5779'],"tags":[],"state":1}
store.dispatch("UPDATE_MY_ARTICLE", {data: article,token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWNmNTdmNjRmOTYzNTIyZDQ2ZTU3NzkiLCJfX3YiOjAsImNyZWF0ZVRpbWUiOiIxNTA2NzYwMjM1NzI1IiwiYXZhdGFyIjoiIiwiZW1haWwiOiIzNDY0NjcxNTZAcXEuY29tIiwicGhvbmUiOiIiLCJuYW1lIjoiMzQ2NDY3MTU2QHFxLmNvbSIsInN0YXRlIjowLCJpYXQiOjE1MTM5MjQ0MTV9.OgzvDt-gTcbY5sg-uTvWA2fZfVx4UxPoG_CoWONDn-0', id: '5a3c6af80487544de8a90934'}).then(() => {
    
})