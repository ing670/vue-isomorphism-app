/**
 * Created by liuqingling on 16/12/16.
 */
var axios = require('axios');
var baseUrl = 'http://localhost:3000';
axios.defaults.headers
    .common['authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWFhNTA4ZjZjN2RmMDBhOTBlMTQzZmUiLCJuYW1lIjoiaW5nNjcwIiwicGhvbmUiOiIxMzI0OTcyNjI3MiIsImVtYWlsIjoiMzQ2NDY3MTY3QHFxLmNvbSIsImF2YXRhciI6Imh0dHA6Ly93eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvZXQyenJRenJxQlpaODBvdldFZkEwZDZzMlFrNzRJQ3AwbUVvMmNPV1N6VjZndm5wUmNJUHJmZEQwSTBsNUJyeVdpY2FDY0IzbWVPWGtxNkNpYkVpY1VMZVEvMCIsIl9fdiI6MCwiY3JlYXRlVGltZSI6IjE1MDQzMzM2ODAyNTciLCJpYXQiOjE1MDQ1NDUzNjF9.SAahyXZwxaH0j3IGtrri5M6psJRCjGHACh8So-YvijY";
axios.get(baseUrl+'/api/logOut').then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
