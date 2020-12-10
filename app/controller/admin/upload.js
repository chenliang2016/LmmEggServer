const path = require("path");
const Controller = require('../../core/base_controller');
const fs = require("fs");
const mkdirp = require("mkdirp");
const qiniu = require("qiniu")

class UploaderController extends Controller {

    async qiniuToken(){
        const {ctx} = this;

        var accessKey = ctx.app.config.qiniu.ak;
        var secretKey = ctx.app.config.qiniu.sk;
        var bucket = ctx.app.config.qiniu.bucket;
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var options = {
            scope: bucket,
          };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken=putPolicy.uploadToken(mac);
        this.success(uploadToken);
    }
    

  async isFileExite(fileAbsoluteName) {
    return new Promise((resolve, reject) => {
      fs.exists(fileAbsoluteName, function(exists) {
        if (exists) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async uploadFile() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const name = path.basename(stream.filename);
    const mimeType = stream.mimeType;
    ctx.logInfo("上传文件fileName", name);

    console.log(stream)

    let __distFileFolder = __dirname.replace("/controller/admin","") + "/public/upload" ;

    let outPutFile = __distFileFolder + "/" + name ;

    try {
      fs.accessSync(__distFileFolder, fs.constants.W_OK);
    } catch (err) {
      mkdirp.sync(__distFileFolder);
    } finally {
    }

    ctx.logInfo("上传文件保存的位置", outPutFile);
    const isFileExite = await this.isFileExite(outPutFile);
    if (isFileExite) {
      ctx.body = {
        status: "fail",
        msg: "文件已存在",
        name:"",
        url: ""
      };
    } else {

        try{
            const fileWriteStream = fs.createWriteStream(outPutFile);
            stream.pipe(fileWriteStream);
            fileWriteStream.on("close", function() {
                console.log("上传成功");
            });

            let url = "/upload/" + name;

            let fileParams = {
                fileName:name,
                fileUrl:url,
                fileType:mimeType,
            }
            let res = await ctx.service.admin.aFile.create(fileParams);
            if (res) {
                ctx.body = {
                    status: "success",
                    name:name,
                    url: url
                };
            } else {
                ctx.body = {
                    status: "fail",
                    msg: "添加到数据库异常",
                    name:"",
                    url: ""
                };
            }

            
        }catch{
            console.log("异常")
            ctx.body = {
                status: "fail",
                msg: "上传异常",
                name:"",
                url: ""
            };
        }
    }
  }

}

module.exports = UploaderController;
