const Service = require('../../core/base_service');

class dicNameService extends Service {

    async create(entity) {
        const result = await this.app.mysql.insert('a_dic_name', entity);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess){
            let object = Object.assign({},entity,{id:result.insertId})
            return object;
        }
        return undefined;
    }

    async update(entity) {
        const result = await this.app.mysql.update('a_dic_name', entity);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess){
            return entity;
        }
        return undefined;
    }

    async delete(id) {
        const result = await this.app.mysql.delete('a_dic_name', {id});
        const deleteSuccess = result.affectedRows === 1;
        return deleteSuccess;
    }

    async detail(id) {
        const result = await this.app.mysql.get('a_dic_name',{id});
        return result;
    }

    

    async list(page,size,username,deptId) {

        let sql = `select *  from a_dic_name where 1 = 1`

        if (username != undefined){
            sql = sql + ` and username like '%${username}%'`
        }

        if (deptId != undefined){
            sql = sql + ` and deptId = ${deptId}`
        }

        sql = sql + ` order by createAt desc`

        if (page != undefined){
            let offset = (page - 1) * size;
            sql = sql + ` limit ${offset},${size}`
        }
        const results = await this.app.mysql.query(sql);
        return results;
    }

    async count(shopId,appletId) {

        let sql = `select count(1) as count from a_dic_name where 1 = 1`

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

module.exports = dicNameService;