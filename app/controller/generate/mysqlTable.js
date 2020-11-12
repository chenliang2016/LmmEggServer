'use strict';
const Controller = require('../../core/base_controller');
class MysqlTableController extends Controller {

    async list() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        const page = parseInt(data.page);
        const size = parseInt(data.size);
      
        let list = await ctx.service.generate.mysqlTable.tableList(page, size);
        let count = await ctx.service.generate.mysqlTable.count();
        this.success({list,count});
    }

    // 同步表
    async syncTable() {
        const {
            ctx,
            app
        } = this;
        const data = ctx.request.body;
        const page = parseInt(data.page);
        const size = parseInt(data.size);
      
        let list = await ctx.service.generate.mysqlTable.tableList(page, size);
        let count = await ctx.service.generate.mysqlTable.count();
        this.success({list,count});
    }
    
    
}

module.exports = MysqlTableController;