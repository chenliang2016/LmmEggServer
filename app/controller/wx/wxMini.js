const Controller = require('../../core/base_controller');
class WxMiniController extends Controller {
    async getOpenId() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        const code = data.code;
        let result = await ctx.service.wx.wxMini.getOpenIdByCode(code);
        console.log(result);
        ctx.body = result;
    }
}
module.exports = WxMiniController