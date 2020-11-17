'use strict';
const Controller = require('../../core/base_controller');
class menuRoleController extends Controller {

    async list() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        const page = parseInt(data.page);
        const size = parseInt(data.size);
      
        let list = await ctx.service.admin.menuRole.list(page, size);
        let count = await ctx.service.admin.menuRole.count();
        this.success({list,count});
    }

    async detail() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        let detail = await ctx.service.admin.menuRole.detail(data.id);

        if (detail != undefined) {
            this.success(detail);
        } else {
            this.error('记录不存在')
        }
    }

    async configRole() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        let res = await ctx.service.admin.menuRole.configRole(data.roleId,data.menuIds);
        if (res == 1) {
            this.success(res)
        } else {
            this.error('配置失败')
        }
    }

    async getRoleMenu() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        let res = await ctx.service.admin.menuRole.getRoleMenu(data.roleId);
        if (res) {
            this.success(res)
        } else {
            this.error('获取失败')
        }
    }

    

    async add() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        let res = await ctx.service.admin.menuRole.create(data);
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
        let res = await ctx.service.admin.menuRole.update(data);
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
        let res = await ctx.service.admin.menuRole.delete(id);
        this.success(res);
    }
    
}

module.exports = menuRoleController;