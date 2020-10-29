const Service = require('../../core/base_service');

class AFileService extends Service {

    async create(entity) {
        const result = await this.app.mysql.insert('a_file', entity);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess){
            let object = Object.assign({},entity,{id:result.insertId})
            return object;
        }
        return undefined;
    }

    async update(entity) {
        const result = await this.app.mysql.update('a_file', entity);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess){
            return entity;
        }
        return undefined;
    }

    async delete(id) {
        const result = await this.app.mysql.delete('a_file', {id});
        const deleteSuccess = result.affectedRows === 1;
        return deleteSuccess;
    }

    async detail(id) {
        const result = await this.app.mysql.get('a_file',{id});
        return result;
    }

    

    async list(page,size,fileName) {

        let sql = `select *  from a_file where 1 = 1`

        if (fileName != undefined){
            sql = sql + ` and fileName like '%${fileName}%'`
        }

        sql = sql + ` order by createAt desc`

        if (page != undefined){
            let offset = (page - 1) * size;
            sql = sql + ` limit ${offset},${size}`
        }

        const results = await this.app.mysql.query(sql);
        return results;
    }

    async count(fileName) {

        let sql = `select count(1) as count from a_file where 1 = 1`
        if (fileName != fileName){
            sql = sql + ` and fileName like '%${fileName}%'`
        }

        const results = await this.app.mysql.query(sql);
     
        return results[0].count;
    }

}

module.exports = AFileService;