/**
 * Created by liuqingling on 16/6/1.
 */
var ccap = require('ccap');
var captcha = ccap({
    width: 200,//set width,default is 256
    height: 60,//set height,default is 60
    offset: 50,//set text spacing,default is 40
    quality: 100,//set pic quality,default is 50
    fontsize: 57,//set font size,default is 57
    _text_len: 4,
    generate: function () {//Custom the function to generate captcha text
        var str_ary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var str_num = 4,
            r_num = str_ary.length,
            text = '';
        for (var i = 0; i < str_num; i++) {
            var pos = Math.floor(Math.random() * r_num)
            text += str_ary[pos];//生成随机数
        }
        return text;

    }

});
module.exports = captcha;