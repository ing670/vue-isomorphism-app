/**
 * Created by sdsd on 2017/9/9.
 */
var multer  = require('multer')
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../../front/public/uploads')
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
            console.log(req.file)
            res.json(req.file)
        }
    }
]