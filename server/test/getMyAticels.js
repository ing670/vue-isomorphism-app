var Article = require('../models/Article');
var axios = require('axios');
var baseUrl = 'http://localhost:3000';
axios.get(baseUrl+'/api/articles?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWIwZGE4Y2MxY2MyYzIzYjhkZWM0MTUiLCJuYW1lIjoiaW5nNjcwIiwicGhvbmUiOiIxMzI0OTcyNjI3MiIsImVtYWlsIjoiMzQ2NDY3MTY3QHFxLmNvbSIsIl9fdiI6MCwiY3JlYXRlVGltZSI6IjE1MDQ3NjI1MDE2NzkiLCJpYXQiOjE1MDQ3NjI1NTF9.pvvyojPrDvxm_3MYRslrZn2j9VFtpJSFyDVsIv0-hdg').then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
