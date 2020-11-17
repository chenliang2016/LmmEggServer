const Service = require('../../core/base_service');

class menuService extends Service {

    async create(entity) {
        const result = await this.app.mysql.insert('a_menu', entity);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess){
            let object = Object.assign({},entity,{id:result.insertId})
            return object;
        }
        return undefined;
    }

    async update(entity) {
        const result = await this.app.mysql.update('a_menu', entity);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess){
            return entity;
        }
        return undefined;
    }

    async delete(id) {
        const result = await this.app.mysql.delete('a_menu', {id});
        const deleteSuccess = result.affectedRows === 1;
        return deleteSuccess;
    }

    async detail(id) {
        const result = await this.app.mysql.get('a_menu',{id});
        return result;
    }

    

    async list(page,size,name,menuParentId) {

        let sql = `select *  from a_menu where 1 = 1`

        if (name != undefined){
            sql = sql + ` and name like '%${name}%'`
        }

        if (menuParentId != undefined){
            sql = sql + ` and menuParentId = ${menuParentId}`
        }

        sql = sql + ` order by orderNum desc`

        if (page != undefined){
            let offset = (page - 1) * size;
            sql = sql + ` limit ${offset},${size}`
        }
        const results = await this.app.mysql.query(sql);
        return results;
    }

    async count(name,menuParentId) {

        let sql = `select count(1) as count from a_menu where 1 = 1`

        if (name != undefined){
            sql = sql + ` and name like '%${name}%'`
        }

        if (menuParentId != undefined){
            sql = sql + ` and menuParentId = ${menuParentId}`
        }

        const results = await this.app.mysql.query(sql);
     
        return results[0].count;
    }

    async getMenuByRoleIds(roleIds) {
        let sql = `select m.*  from a_menu m inner join a_menu_role mr on m.id = mr.menuId where mr.roleId in (${roleIds}) group by mr.menuId`
        console.log(sql);
        const results = await this.app.mysql.query(sql);
        return results;
    }

}

module.exports = menuService;