/**
 * Created by sdsd on 2017/9/9.
 */
var multer  = require('multer')
const path  = require('path')
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹不会自动创建。
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../front/public/upload/'));
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({
    storage: storage
});
module.exports = [
    {
        path: '/upload',
        method: 'post',
        mid:upload.single('cover'),
        action: "upload",
        callback: function (req, res) {
            res.json({code:0,cover:`/public/upload/${req.file.filename}`})
        }
    }
]