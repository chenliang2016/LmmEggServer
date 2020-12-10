const Service = require('../../core/base_service');

class infoService extends Service {

    async create(entity) {
    
        const bo = {
            url:entity.url,
            title:entity.title,
            categoryId:entity.categoryId,
            contentType:entity.contentType,
            isFouce:entity.isFouce,
            img:entity.img,
            shortDes:entity.shortDes,
            createAt:this.app.mysql.literals.now
        }

        const result = await this.app.mysql.insert('a_info', bo);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess){
            let object = Object.assign({},entity,{id:result.insertId})

            const infoDetail = {
                content:entity.content,
                infoId:result.insertId
            }

            await this.ctx.service.admin.infoDetail.create(infoDetail);

            return object;
        }
        return undefined;
    }

    async update(entity) {
        const bo = {
            id:entity.id,
            url:entity.url,
            title:entity.title,
            categoryId:entity.categoryId,
            contentType:entity.contentType,
            isFouce:entity.isFouce,
            img:entity.img,
            shortDes:entity.shortDes,
            updateAt:this.app.mysql.literals.now
        }
        const result = await this.app.mysql.update('a_info', bo);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess){
            await this.ctx.service.admin.infoDetail.updateDetail(entity.id,entity.content);
            return entity;
        }
        return undefined;
    }

    async delete(id) {
        const result = await this.app.mysql.delete('a_info', {id});
        const deleteSuccess = result.affectedRows === 1;
        return deleteSuccess;
    }

    async detail(id) {
        let result = await this.app.mysql.get('a_info',{id});
        if (result != undefined){
            const detailResult =   await this.ctx.service.admin.infoDetail.detailByInfoId(result.id);
            if (detailResult != undefined){
                result.content = detailResult.content;
            }
        }
        console.log(result)
        return result;
    }

    

    async list(page,size,title,deptId) {

        let sql = `select *  from a_info where 1 = 1`

        if (title != undefined){
            sql = sql + ` and title like '%${title}%'`
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

    async count(title,appletId) {

        let sql = `select count(1) as count from a_info where 1 = 1`

        if (title != undefined){
            sql = sql + ` and title like '%${title}%'`
        }

        if (appletId != undefined){
            sql = sql + ` and appletId = ${appletId}`
        }

        const results = await this.app.mysql.query(sql);
     
        return results[0].count;
    }

}

module.exports = infoService;