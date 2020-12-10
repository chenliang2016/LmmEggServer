const Service = require('../../core/base_service');
const {getConfig,addConfig,deleteConfig} = require('../../utils/store')

class aconfigService extends Service {

    async create(entity) {
        entity.createAt = this.app.mysql.literals.now;
        const result = await this.app.mysql.insert('a_config', entity);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess){
            let object = Object.assign({},entity,{id:result.insertId})
            return object;
        }
        return undefined;
    }

    async update(entity) {
        entity.updateAt = this.app.mysql.literals.now;

        let value = await getConfig(entity.configKey);
        console.log(value)
        if (value != undefined){
            await deleteConfig(entity.configKey)
        }

        const result = await this.app.mysql.update('a_config', entity);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess){
            return entity;
        }
        return undefined;
    }

    async delete(id) {
        const result = await this.app.mysql.delete('a_config', {id});
        const deleteSuccess = result.affectedRows === 1;
        return deleteSuccess;
    }

    async detail(id) {
        const result = await this.app.mysql.get('a_config',{id});
        return result;
    }

    
    async getConfigByKey(configKey) {
        let value = await getConfig(configKey);
        console.log(value)
        if (value != undefined){
            return value;
        }
        const result = await this.app.mysql.get('a_config',{configKey});
        console.log(result)
        if (result != undefined){
            await addConfig(configKey,result.configValue)
            return result.configValue;
        }
        return result;
    }


    async list(page,size,configKey) {

        let sql = `select *  from a_config where 1 = 1`

        if (configKey != undefined){
            sql = sql + ` and configKey like '%${configKey}%'`
        }

        sql = sql + ` order by createAt desc`

        if (page != undefined){
            let offset = (page - 1) * size;
            sql = sql + ` limit ${offset},${size}`
        }
        const results = await this.app.mysql.query(sql);
        return results;
    }

    async count(configKey) {

        let sql = `select count(1) as count from a_config where 1 = 1`

        if (configKey != undefined){
            sql = sql + ` and configKey like '%${configKey}%'`
        }

        const results = await this.app.mysql.query(sql);
     
        return results[0].count;
    }

}

module.exports = aconfigService;