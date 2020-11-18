const Service = require('../../core/base_service');
const md5 = require('md5')

class AdminService extends Service {

    async create(entity) {
        const result = await this.app.mysql.insert('a_admin', entity);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess){
            let object = Object.assign({},entity,{id:result.insertId})
            return object;
        }
        return undefined;
    }

    async update(entity) {
        const result = await this.app.mysql.update('a_admin', entity);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess){
            return entity;
        }
        return undefined;
    }

    async delete(id) {
        const result = await this.app.mysql.delete('a_admin', {id});
        const deleteSuccess = result.affectedRows === 1;
        return deleteSuccess;
    }

    async detail(id) {
        const result = await this.app.mysql.get('a_admin',{id});
        return result;
    }

    async login(params) {
        const result = await this.app.mysql.get('a_admin',
            params
        );
        return result;
    }

    async changePassword(params) {
        let entity = await this.app.mysql.get('a_admin',
        {loginId:params.loginId,password:params.oldPassword}
        );
        if (entity == undefined){
            return this.returnError("用户不存在或原始密码不对");
        }
        entity.password = params.newPassword;
        await this.update(entity)
        
        return this.returnSuccess("修改密码成功");
    }

    async resetPassword(id) {
        let entity = await this.app.mysql.get('a_admin',
        {id}
        );
        if (entity == undefined){
            return this.returnError("用户不存在");
        }
        entity.password = md5('11111');
        await this.update(entity)
        
        return this.returnSuccess("重置密码成功");
    }

    async list(page,size,username,deptId) {

        let sql = `select *  from a_admin where 1 = 1`

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

    async count(username,deptId) {

        let sql = `select count(1) as count from a_admin where 1 = 1`

        if (username != undefined){
            sql = sql + ` and username = '${username}'`
        }

        if (deptId != undefined){
            sql = sql + ` and deptId = ${deptId}`
        }

        const results = await this.app.mysql.query(sql);
     
        return results[0].count;
    }

}

module.exports = AdminService;