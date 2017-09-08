var axios = require('axios');
var baseUrl = 'http://localhost:3000';


axios.get(baseUrl+'/api/searchTag/n').then(function (res) {
    console.log(res.data);
}).catch(err=>console.log(err));
