/**
 * Created by liuqingling on 16/4/27.
 */

'use strict';

var nodemailer = require('../server/node_modules/nodemailer');
// Create a SMTP transporter object
var smtpConfig = {
    host: 'mail.yonyou.com',
    //port: 465,
    ignoreTLS: true,
    //secure:false,
    rejectUnauthorized: false,
    auth: {
        user: 'mobileplus@yonyou.com',
        pass: 'yonyou2015%'
    }
};


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '移动+<mobileplus@yonyou.com>', // sender address
    to: '346467156@qq.com', // list of receivers
    subject: '移动+内测申请通过', // Subject line
    html: '<p>恭喜您,移动+内测申请通过,账号为xxxx,密码为xxxx,您可登陆<a href="http://mobileplus.yonyou.com">http://mobileplus.yonyou.com</a>使用移动+</p>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});