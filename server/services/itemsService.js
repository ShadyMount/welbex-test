const { Op } = require("sequelize")

const items = require("../settings/db").items

const whereConditions = (sort, sortValue, sortDir) => {
    let conditions = {}

    if(sort === 'name'){
        if(sortDir === 'contains'){
            conditions = {...conditions, 'name': {[Op.substring]: sortValue}}
        }else{
            conditions = {...conditions, 'name': {[Op.eq]: sortValue}}
        }
    }
    if(sort === 'quantity'){
        if(sortDir === 'more'){
            conditions = {...conditions, 'quantity': {[Op.gt]: sortValue}}
        }
        if(sortDir === 'less'){
            conditions = {...conditions, 'quantity': {[Op.lt]: sortValue}}
        }
        if(sortDir === 'contains'){
            conditions = {...conditions, 'quantity': {[Op.substring]: sortValue}}
        }
        else{
            conditions = {...conditions, 'quantity': {[Op.eq]: sortValue}}
        }
    }
    if(sort === 'distance'){
        if(sortDir === 'more'){
            conditions = {...conditions, 'distance': {[Op.gt]: sortValue}}
        }
        if(sortDir === 'less'){
            conditions = {...conditions, 'distance': {[Op.lt]: sortValue}}
        }
        if(sortDir === 'contains'){
            conditions = {...conditions, 'distance': {[Op.substring]: sortValue}}
        }
        else{
            conditions = {...conditions, 'distance': {[Op.eq]: sortValue}}
        }
    }
    return conditions
}

class TasksService {

    async findItems({ sort, sortValue, sortDir, currentPage, pageSize }) {
        const skip = (currentPage - 1) * pageSize
        const itemsFromDb = await items.findAll({
            where: whereConditions(sort, sortValue, sortDir),
            offset: skip,
            limit: pageSize
        })

        return itemsFromDb
    }

        async countItems({ sort, sortValue, sortDir }) {
                const count = await items.count({
                    where: whereConditions(sort, sortValue, sortDir,)
                })
                return count
        }

        async addItem(item) {
            await items.create(item)
        }
}

module.exports = new TasksService()