/**
 * Created by liuqingling on 16/12/16.
 */
let axios = require('axios');
let baseUrl = 'http://localhost:3000';
// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers
    .common['authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWFhNTA4ZjZjN2RmMDBhOTBlMTQzZmUiLCJuYW1lIjoiaW5nNjcwIiwicGhvbmUiOiIxMzI0OTcyNjI3MiIsImVtYWlsIjoiMzQ2NDY3MTY3QHFxLmNvbSIsImF2YXRhciI6Imh0dHA6Ly93eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvZXQyenJRenJxQlpaODBvdldFZkEwZDZzMlFrNzRJQ3AwbUVvMmNPV1N6VjZndm5wUmNJUHJmZEQwSTBsNUJyeVdpY2FDY0IzbWVPWGtxNkNpYkVpY1VMZVEvMCIsIl9fdiI6MCwiY3JlYXRlVGltZSI6IjE1MDQzMzM2ODAyNTciLCJpYXQiOjE1MDQ1NDUzNjF9.SAahyXZwxaH0j3IGtrri5M6psJRCjGHACh8So-YvijY";
// axios.get(baseUrl + '/api/getUserInfo?eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWFhNTA4ZjZjN2RmMDBhOTBlMTQzZmUiLCJuYW1lIjoiaW5nNjcwIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJwaG9uZSI6IjEzMjQ5NzI2MjcyIiwiZW1haWwiOiIzNDY0NjcxNjdAcXEuY29tIiwiYXZhdGFyIjoiaHR0cDovL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9ldDJ6clF6cnFCWlo4MG92V0VmQTBkNnMyUWs3NElDcDBtRW8yY09XU3pWNmd2bnBSY0lQcmZkRDBJMGw1QnJ5V2ljYUNjQjNtZU9Ya3E2Q2liRWljVUxlUS8wIiwiX192IjowLCJjcmVhdGVUaW1lIjoiMTUwNDMzMzY4MDI1NyIsImlhdCI6MTUwNDUzOTkwM30.eZ6bsWFklp_HpQ8HflNyU8OnOHMgQ3YE8w9hd0Gct84').then(function (res) {
//     console.log(res.data);
// }).catch(err => console.log(err));
axios.get(baseUrl + '/api/getUserInfo').then(function (res) {
    console.log(res.data);
}).catch(err => console.log(err));