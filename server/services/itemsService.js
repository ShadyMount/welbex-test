const dbPool = require("../settings/db").pool

const whereConditions = (sortBy, sortValue, sortCompare) => {
    let whereConditions = ''
    let likeConditions = ''

    if (sortBy === 'name' && sortValue) {
        if (sortCompare === 'equal') {
            whereConditions = 'WHERE item.name'
            likeConditions = `= '${sortValue}'`
        } else if (sortCompare === 'contains' && sortValue) {
            whereConditions = 'WHERE item.name'
            likeConditions = `LIKE '%${sortValue}%'`
        }
    }

    if (sortBy === 'quantity' && sortValue) {
        if (sortCompare === 'more') {
            whereConditions = 'WHERE item.quantity'
            likeConditions = `> ${sortValue}`
        }
        if (sortCompare === 'less') {
            whereConditions = 'WHERE item.quantity'
            likeConditions = `< ${sortValue}`
        }
        if (sortCompare === 'contains') {
            whereConditions = 'WHERE item.quantity'
            likeConditions = `LIKE '%${sortValue}%'`
        }
        if (sortCompare === 'equal') {
            whereConditions = 'WHERE item.quantity'
            likeConditions = `= ${sortValue}`
        }
    }

    if (sortBy === 'distance' && sortValue !== '') {
        if (sortCompare === 'more') {
            whereConditions = 'WHERE item.distance'
            likeConditions = `> ${sortValue}`
        }
        if (sortCompare === 'less') {
            whereConditions = 'WHERE item.distance'
            likeConditions = `< ${sortValue}`
        }
        if (sortCompare === 'contains') {
            whereConditions = 'WHERE item.distance'
            likeConditions = `LIKE '%${sortValue}%`
        }
        if (sortCompare === 'equal') {
            whereConditions = 'WHERE item.distance'
            likeConditions = `= ${sortValue}`
        }
    }

    return whereConditions + ' ' + likeConditions
}



class TasksService {

    async findItems({ sortBy, sortValue, sortCompare, currentPage, pageSize }) {
        const skip = (currentPage - 1) * pageSize
        const text = `SELECT "id", "name", "quantity", "distance", "date"
            FROM "public"."items" AS "item" ${whereConditions(sortBy, sortValue, sortCompare)} LIMIT ${pageSize} OFFSET ${skip}`
        try {
            const itemsFromDb = await dbPool.query(text)
            if(itemsFromDb.rows){
                return itemsFromDb.rows
            }else{
                return []
            }
        } catch (err) {
            console.log(err.stack)
        }
    }

    async countItems({ sortBy, sortValue, sortCompare }) {
        const text = `SELECT count(*) AS "count" FROM "public"."items" AS "item" ${whereConditions(sortBy, sortValue, sortCompare)}`
        try {
            const count = await dbPool.query(text)
            if(count.rows[0].count){
                return count.rows[0].count
            }else{
                return []
            }
        } catch (err) {
            console.log(err.stack)
        }
    }
}

module.exports = new TasksService()