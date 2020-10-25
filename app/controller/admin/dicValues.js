'use strict';
const Controller = require('../../core/base_controller');
class dicValuesController extends Controller {

    async list() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        const page = parseInt(data.page);
        const size = parseInt(data.size);
        const dicNameId = parseInt(data.dicNameId);
        const dicName = data.dicName;
      
        let list = await ctx.service.admin.dicValues.list(page, size,dicNameId,dicName);
        let count = await ctx.service.admin.dicValues.count(dicNameId,dicName);
        this.success({list,count});
    }

    async detail() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        let detail = await ctx.service.admin.dicValues.detail(data.id);

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
        let res = await ctx.service.admin.dicValues.create(data);
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
        let res = await ctx.service.admin.dicValues.update(data);
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
        let res = await ctx.service.admin.dicValues.delete(id);
        this.success(res);
    }
    
}

module.exports = dicValuesController;