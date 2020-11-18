const Service = require('../../core/base_service');

class WxMiniService extends Service {
    async getOpenIdByCode(code){
        // getappId & secret 
        const miniAppId = await this.ctx.service.admin.aconfig.getConfigByKey("miniAppId");
        if (miniAppId == undefined){
            return this.returnError("请再配置中添加miniAppId此配置参数")
        }
        const miniSecret = await this.ctx.service.admin.aconfig.getConfigByKey("miniSecret");
        if (miniSecret == undefined){
            return this.returnError("请再配置中添加miniSecret此配置参数")
        }
        const wxRs = await this.wxRequestCode(miniAppId,miniSecret,code);
        return wxRs;
    }

    async wxRequestCode(appId,appSecret,code){
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
        const result = await this.request(url,"get");
        console.log(result);

        if (result.success){
            return this.returnSuccess({openid:result.data.openid,unionid:result.data.unionid});
        }else{
            return result;
        }
    }
}

module.exports = WxMiniService;