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
            msg:msg
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

    async request(url,method,params){
        let options = {
            // 必须指定 method
            method: method,
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
            dataType: 'json',
        }
        if (params != undefined){
            options.data = params;
        }
        const result = await this.ctx.curl(url, options);
        if (result.status == 200){
            console.log(result.data)
            // return result.data;
            return this.returnSuccess(result.data);
        }else {
            return this.returnError("网络异常");
        }
    }
}

module.exports = BaseService;