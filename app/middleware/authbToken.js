module.exports = options => {
  return async function authbToken(ctx, next) {
    let data = ctx.request.body;

    console.log(ctx.request.url)

    if (ctx.request.url.indexOf("/api/b/admin/login") > -1){
        console.log("登录接口排除")
        await next();
        return;
    }

    let headers = ctx.request.headers;
    let token = headers['authorization'];
    console.log(token);
    if (token == undefined){
        ctx.body = {
            code:401,
            success: false,
            msg:"token不存在"
        }
    }else{
        let tokenArray = token.split(" ");
        // console.log(tokenArray[1]);
        try{
            let userInfo = ctx.app.jwt.verify(tokenArray[1], ctx.app.config.jwt.bsecret);
            ctx.uid = userInfo.uid;
            await next();
        }catch(e){
            console.log("错误信息",e);
            ctx.body = {
                code:401,
                success: false,
                msg:"token解析出错"
            }
        }
    }
    
  };
};
