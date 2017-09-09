const Tag = require('./models/Tag');
const User = require('./models/User');
const Article = require('./models/Article');

console.log("初始化超级用户")

var admin = new User({
    'state':0,
    'name': 'admin',
    'password':'123456',
    'phone': '13247262122',
    'email': 'qinglin@163.com',
    'date': new Date().getTime()
});
admin.save()
console.log("初始化tag")
var tag1 = new Tag({
    'icon':'https://dn-mhke0kuv.qbox.me/0d614af263aa63aa6a77.png?imageView2/2/w/200/h/64/q/85/interlace/1',
    'title': "nodeJS",
    'createTime': new Date().getTime()
});
tag1.save();

