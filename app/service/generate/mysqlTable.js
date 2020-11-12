const Service = require('../../core/base_service');

class MysqlTableService extends Service {

    async tableList(page,size) {

        let sql = `select table_name ,create_time , engine, table_collation, table_comment from information_schema.tables where table_schema = (select database()) order by create_time desc `

        if (page != undefined){
            let offset = (page - 1) * size;
            sql = sql + ` limit ${offset},${size}`
        }

        const results = await this.app.mysql.query(sql);
        return results;
    }

    async count() {
        let sql = `select count(table_name) as count from information_schema.tables where table_schema = (select database()) order by create_time desc `
        const results = await this.app.mysql.query(sql);
        return results[0].count;
    }

    async columns(tableName) {
        let sql = `select column_name, is_nullable, data_type, column_comment, column_key, extra from information_schema.columns where table_name = '${tableName}' and table_schema = (select database()) order by ordinal_position`
        const results = await this.app.mysql.query(sql);
        return results;
    }


    

}

module.exports = MysqlTableService;

