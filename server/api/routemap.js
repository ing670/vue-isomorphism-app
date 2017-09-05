/**
 * Created by liuqingling on 16/5/19.
 */
//src覆盖des
let user = require('./user')
let article = require('./article')
let category = require('./tag')

var routemap = [
    ...user,
    ...article,
    ...category
];
module.exports = routemap;
