const Service = require('../../core/base_service');

class menuRoleService extends Service {

    async create(entity) {
        const result = await this.app.mysql.insert('a_menu_role', entity);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess){
            let object = Object.assign({},entity,{id:result.insertId})
            return object;
        }
        return undefined;
    }

    async configRole(roleId,menuIds) {
        await this.deleteRoleMenus(roleId);
        let menuIdArray = menuIds.split(";");
        for(let menuId of menuIdArray){
            let p = {
                roleId :roleId,
                menuId:menuId,
            }
            await this.create(p)
        }
        return 1;
    }

    async getRoleMenu(roleId) {
        let sql = `select * from a_menu_role where roleId = ${roleId}`
        return await this.app.mysql.query(sql);
    }

    async deleteRoleMenus(roleId){
        let sql = `delete from a_menu_role where roleId = ${roleId}`
         await this.app.mysql.query(sql);
    }

    async update(entity) {
        const result = await this.app.mysql.update('a_menu_role', entity);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess){
            return entity;
        }
        return undefined;
    }

    async delete(id) {
        const result = await this.app.mysql.delete('a_menu_role', {id});
        const deleteSuccess = result.affectedRows === 1;
        return deleteSuccess;
    }

    async detail(id) {
        const result = await this.app.mysql.get('a_menu_role',{id});
        return result;
    }

    

    async list(page,size,username,deptId) {

        let sql = `select *  from a_menu_role where 1 = 1`

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

        let sql = `select count(1) as count from a_menu_role where 1 = 1`

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

module.exports = menuRoleService;