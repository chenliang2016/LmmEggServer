const Service = require('egg').Service;
class BaseService extends Service {

    async returnSuccess(data){
        return { 
            success: true,
            data
        }
    }

    async returnError(msg) {
        return {
            success: false,
            message:msg
        }
    }

    async query(sqlString) {
        return await this.app.mysql.query(sqlString);
    }

    async get(tableName, whereParams) {
        return await this.app.mysql.get(tableName,
            whereParams
        );
    }

    async delete(tableName, params) {
        const result = await this.app.mysql.delete(tableName, params);
        return result;
    }

    async add(tableName, data) {
        const result = await this.app.mysql.insert(tableName, data);
        const insertSuccess = result.affectedRows === 1;
        return insertSuccess;
    }

    async addNew(tableName, data) {
        const result = await this.app.mysql.insert(tableName, data);
        const insertSuccess = result.affectedRows === 1;
        return {
            insertSuccess,
            result
        };
    }

    async update(tableName, data, whereParams) {
        const result = await this.app.mysql.update(tableName, data, {
            where: whereParams,
        });
        const updateSuccess = result.affectedRows === 1;
        return updateSuccess;
    }

    async updateNew(tableName, data, whereParams) {
        const result = await this.app.mysql.update(tableName, data, {
            where: whereParams,
        });
        const updateSuccess = result.affectedRows === 1;
        return {
            updateSuccess,
            result
        };
    }

    async updateNormal(tableName, data) {
        const result = await this.app.mysql.update(tableName, data);
        const updateSuccess = result.affectedRows === 1;
        return updateSuccess;
    }
}

module.exports = BaseService;