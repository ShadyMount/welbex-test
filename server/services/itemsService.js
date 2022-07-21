const { Op } = require("sequelize")

const items = require("../settings/db").items

const whereConditions = (sortBy, sortValue, sortCompare) => {
    let conditions = {}
    console.log('sortValue: ', sortValue);

    if(sortBy === 'name'){
        if(sortCompare === 'equal'){
            conditions = {...conditions, 'name': {[Op.eq]: sortValue}}
        }
        if(sortCompare === 'contains'){
            conditions = {...conditions, 'name': {[Op.substring]: sortValue}}
        }
    }
    if(sortBy === 'quantity' && sortValue !== ''){
        console.log('where:',sortCompare);
        if(sortCompare === 'more'){
            conditions = {...conditions, 'quantity': {[Op.gt]: sortValue}}
        }
        if(sortCompare === 'less'){
            conditions = {...conditions, 'quantity': {[Op.lt]: sortValue}}
        }
        if(sortCompare === 'contains'){
            conditions = {...conditions, 'quantity': {[Op.substring]: sortValue}}
        }
        if(sortCompare === 'equal'){
            conditions = {...conditions, 'quantity': {[Op.eq]: sortValue}}
        }
    }
    if(sortBy === 'distance' && sortValue !== ''){
        if(sortCompare === 'more'){
            conditions = {...conditions, 'distance': {[Op.gt]: sortValue}}
        }
        if(sortCompare === 'less'){
            conditions = {...conditions, 'distance': {[Op.lt]: sortValue}}
        }
        if(sortCompare === 'contains'){
            conditions = {...conditions, 'distance': {[Op.substring]: sortValue}}
        }
        if(sortCompare === 'equal'){
            conditions = {...conditions, 'distance': {[Op.eq]: sortValue}}
        }
    }
    return conditions
}

class TasksService {

    async findItems({ sortBy, sortValue, sortCompare, currentPage, pageSize }) {
        const skip = (currentPage - 1) * pageSize
        const itemsFromDb = await items.findAll({
            where: whereConditions(sortBy, sortValue, sortCompare),
            offset: skip,
            limit: pageSize
        })

        return itemsFromDb
    }

        async countItems({ sortBy, sortValue, sortCompare }) {
                const count = await items.count({
                    where: whereConditions(sortBy, sortValue, sortCompare)
                })
                return count
        }

        async addItem(item) {
            await items.create(item)
        }
}

module.exports = new TasksService()