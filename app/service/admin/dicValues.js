const Service = require('../../core/base_service');

class dicValuesService extends Service {

    async create(entity) {
        const result = await this.app.mysql.insert('a_dic_values', entity);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess){
            let object = Object.assign({},entity,{id:result.insertId})
            return object;
        }
        return undefined;
    }

    async update(entity) {
        const result = await this.app.mysql.update('a_dic_values', entity);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess){
            return entity;
        }
        return undefined;
    }

    async delete(id) {
        const result = await this.app.mysql.delete('a_dic_values', {id});
        const deleteSuccess = result.affectedRows === 1;
        return deleteSuccess;
    }

    async detail(id) {
        const result = await this.app.mysql.get('a_dic_values',{id});
        return result;
    }
    
    async list(page,size,dicNameId,tag) {

        let sql = `select v.*,n.name  from a_dic_values v inner join a_dic_name n on v.dicNameId = n.id where 1 = 1`

        if (dicNameId != undefined){
            sql = sql + ` and dicNameId = ${dicNameId}`
        }

        if (tag != undefined){
            sql = sql + ` and tag = '${tag}'`
        }

        sql = sql + ` order by orderNum desc`

        if (page != undefined){
            let offset = (page - 1) * size;
            sql = sql + ` limit ${offset},${size}`
        }
        const results = await this.app.mysql.query(sql);
        return results;
    }

    async count(dicNameId,tag) {

        let sql = `select count(1) as count from a_dic_values where 1 = 1`

        if (dicNameId != undefined){
            sql = sql + ` and dicNameId = ${dicNameId}`
        }

        if (tag != undefined){
            sql = sql + ` and tag = '${tag}'`
        }

        const results = await this.app.mysql.query(sql);
     
        return results[0].count;
    }

}

module.exports = dicValuesService;