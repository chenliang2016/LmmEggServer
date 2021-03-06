'use strict';
const Controller = require('../../core/base_controller');
class aconfigController extends Controller {

    async list() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
      
        let list = await ctx.service.admin.aconfig.list(data.page, data.size,data.configKey);
        let count = await ctx.service.admin.aconfig.count();
        this.success({list,count});
    }

    async detail() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        let detail = await ctx.service.admin.aconfig.detail(data.id);

        if (detail != undefined) {
            this.success(detail);
        } else {
            this.error('记录不存在')
        }
    }

    async add() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        let res = await ctx.service.admin.aconfig.create(data);
        if (res) {
            this.success(res)
        } else {
            this.error('添加失败')
        }
    }

    async update() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        let res = await ctx.service.admin.aconfig.update(data);
        if (res) {
            this.success('修改成功')
        } else {
            this.error(res.message)
        }
    }

    async delete() {
        const { ctx, app } = this;
        var data = ctx.request.body;
        let id = data.id;
        let res = await ctx.service.admin.aconfig.delete(id);
        this.success(res);
    }
    
}

module.exports = aconfigController;