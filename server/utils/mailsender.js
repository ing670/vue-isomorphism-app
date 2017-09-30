/**
 * Created by liuqingling on 16/4/27.
 */
'use strict';

var nodemailer = require('nodemailer');
// Create a SMTP transporter object
var mailsender = {};
mailsender.send = function (mail, msg,callback) {
    var smtpConfig = {
        service: '163',
        //host: 'mail.163.com',
        //port: 465,
        //ignoreTLS: true,
        //secure:false,
        //rejectUnauthorized: false,
        auth: {
            user: 'ing670@163.com',
            pass: 'qingling670'
        }
    };
// create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(smtpConfig);

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Coder World<ing670@163.com>', // sender address
        to: mail, // list of receivers
        subject: '用户验证', // Subject line
        html: msg // html body
        // html: '<p>恭喜您,移动+内测申请通过,账号为'+user.email+',密码为'+user.psw+',您可登陆<a href="http://mobileplus.yonyou.com">http://mobileplus.yonyou.com</a>使用移动+</p>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        callback&&callback(error,info);
        //console.log('Message sent: ' + info.response);
    });
}
module.exports = mailsender;