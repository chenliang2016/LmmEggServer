const Service = require('../../core/base_service');

class UserService extends Service {

    async create(entity) {
        const result = await this.app.mysql.insert('', entity);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess){
            let object = Object.assign({},entity,{id:result.insertId})
            return object;
        }
        return undefined;
    }

    async update(entity) {
        const result = await this.app.mysql.update('', entity);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess){
            return entity;
        }
        return undefined;
    }

    async delete(id) {
        const result = await this.app.mysql.delete('', {id});
        const deleteSuccess = result.affectedRows === 1;
        return deleteSuccess;
    }

    async detail(id) {
        const result = await this.app.mysql.get('',{id});
        return result;
    }

    async list(page,size,shopId,appletId) {

        let where = {};

        if (shopId != undefined){
            where.shopId = shopId;
        }

        if (appletId != undefined){
            where.appletId = appletId;
        }

        let options = { 
            where: where, 
            orders: [['createAt','desc']], // 排序方式
        }

        if (page != undefined){
            let offset = (page - 1) * size;
            options.limit = size
            options.offset = offset
        }

        const results = await this.app.mysql.select('', options);
     
        return results;
    }

    async count(shopId,appletId) {

        let sql = `select count(1) as count from  where 1 = 1`

        if (shopId != undefined){
            sql = sql + ` and shopId = ${shopId}`
        }

        if (appletId != undefined){
            sql = sql + ` and appletId = ${appletId}`
        }

        const results = await this.app.mysql.query(sql);
     
        return results[0].count;
    }

}

module.exports = UserService;