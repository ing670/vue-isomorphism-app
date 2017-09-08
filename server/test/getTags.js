var Article = require('../models/Article');
var querystring = require('querystring');
var axios = require('axios');
var baseUrl = 'http://localhost:3000';


axios.get(baseUrl+'/api/tags').then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
