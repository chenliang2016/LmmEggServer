'use strict';
const Controller = require('../../core/base_controller');
class AdminController extends Controller {

    async list() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        console.log(data);
        const page = parseInt(data.page);
        const size = parseInt(data.size);
        const username = data.username;
        const deptId = data.deptId;
      
        let list = await ctx.service.admin.admin.list(page, size,username,deptId);
        let count = await ctx.service.admin.admin.count(username,deptId);
        this.success({list,count});
    }

    async detail() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        let detail = await ctx.service.admin.admin.detail(data.id);

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
        let res = await ctx.service.admin.admin.create(data);
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
        let res = await ctx.service.admin.admin.update(data);
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
        let res = await ctx.service.admin.admin.delete(id);
        this.success(res);
    }

    async login() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        let user = await ctx.service.admin.admin.login(data);
        if (user != undefined) {
            this.success(user)
        } else {
            this.error('添加失败')
        }
    }
    
    
}

module.exports = AdminController;