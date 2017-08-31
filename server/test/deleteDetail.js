var Article = require('../models/Article');
var querystring = require('querystring');
var axios = require('axios');
var baseUrl = 'http://localhost:3000';


axios.delete(baseUrl+'/api/article/59a63c8a2631052f9cc20676').then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
