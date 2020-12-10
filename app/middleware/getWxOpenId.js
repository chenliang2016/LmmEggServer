module.exports = options => {
    return async function getWxOpenId(ctx, next) {
        let app = ctx.app;
        let q = ctx.query;

        console.log(ctx.query);

        if (q.openid == undefined){
            let url = ctx.request.originalUrl;
            let host = ctx.request.host;
            let redirectUrl = '';
            // if (ctx.app.config.app.isHttps){
            //   redirectUrl = `https://${host}${url}`
            // }else{
              redirectUrl = `http://${host}${url}`
            // }
            let redirect = encodeURIComponent(redirectUrl)

            const appSecret = ctx.app.config.app.wxAppSecret;
            const appId = ctx.app.config.app.wxAppId;

            console.log(`${app.config.app.wxprex}?appId=${appId}&appSecret=${appSecret}&redirect=${redirect}`)

            await ctx.redirect(`${app.config.app.wxprex}?appId=${appId}&appSecret=${appSecret}&redirect=${redirect}`)
           
        }else{
            console.log("获取到了openid")
            await next();
        }
    };
  };
  