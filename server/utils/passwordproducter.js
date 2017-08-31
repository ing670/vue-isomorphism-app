/**
 * Created by liuqingling on 16/4/27.
 */
var psw={};
psw.ramPassword= function (charsLength,chars) {

    var length = charsLength?charsLength:6;
    if (!chars)
        var chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ123456789";
    var randomChars = "";
    for(x=0; x<length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        randomChars += chars.charAt(i);
    }
    return randomChars;
};
module.exports=psw;