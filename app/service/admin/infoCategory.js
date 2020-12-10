const Service = require('../../core/base_service');

class infoCategoryService extends Service {

    async create(entity) {
        entity.createAt = this.app.mysql.literals.now;
        const result = await this.app.mysql.insert('a_info_category', entity);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess){
            let object = Object.assign({},entity,{id:result.insertId})
            return object;
        }
        return undefined;
    }

    async update(entity) {
        entity.updateAt = this.app.mysql.literals.now;
        const result = await this.app.mysql.update('a_info_category', entity);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess){
            return entity;
        }
        return undefined;
    }

    async delete(id) {
        const result = await this.app.mysql.delete('a_info_category', {id});
        const deleteSuccess = result.affectedRows === 1;
        return deleteSuccess;
    }

    async detail(id) {
        const result = await this.app.mysql.get('a_info_category',{id});
        return result;
    }

    

    async list(page,size,categoryName,deptId) {

        let sql = `select *  from a_info_category where 1 = 1`

        if (categoryName != undefined){
            sql = sql + ` and categoryName like '%${categoryName}%'`
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

    async count(categoryName,appletId) {

        let sql = `select count(1) as count from a_info_category where 1 = 1`

        if (categoryName != undefined){
            sql = sql + ` and categoryName like '%${categoryName}%'`
        }

        if (appletId != undefined){
            sql = sql + ` and appletId = ${appletId}`
        }

        const results = await this.app.mysql.query(sql);
     
        return results[0].count;
    }

}

module.exports = infoCategoryService;