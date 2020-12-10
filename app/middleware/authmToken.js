const md5 = require("md5");

module.exports = options => {
  return async function authmToken(ctx, next) {
    let data = ctx.request.body;
    let headers = ctx.request.headers;
    let token = headers['authorization'];
    console.log(token);
    if (token == undefined){
        ctx.body = {
            success: false,
            msg:"token不存在"
        }
    }else{
        let tokenArray = token.split(" ");
        // console.log(tokenArray[1]);
        try{
            let userInfo = ctx.app.jwt.verify(tokenArray[1], ctx.app.config.jwt.msecret);
            ctx.request.body = Object.assign({}, data, {
                uid: userInfo.uid,
                openId:userInfo.openId,
            });
            await next();
        }catch(e){
            console.log("错误信息",e);
            ctx.body = {
                success: false,
                msg:"token解析出错"
            }
        }
    }
    
  };
};
