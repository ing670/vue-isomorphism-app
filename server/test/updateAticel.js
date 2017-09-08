var Article = require('../models/Article');
var querystring = require('querystring');
var axios = require('axios');
var baseUrl = 'http://localhost:3000';


var article = {
   state:0
};
axios.patch(baseUrl+'/api/article/59b20ba4cdfd521fc4afbbd7',article).then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
