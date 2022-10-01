const dbPool = require("../settings/db").pool

const whereConditions = (filterBy, filterValue, filterCompare, orderBy, orderDir) => {
    let whereConditions = ''
    let likeConditions = ''
    let orderConditions = ` ORDER BY ${orderBy} ${orderDir}`

    if (filterBy === 'name' && filterValue) {
        if (filterCompare === 'equal') {
            whereConditions = 'WHERE item.name'
            likeConditions = `= '${filterValue}'`
        } else if (filterCompare === 'contains' && filterValue) {
            whereConditions = 'WHERE item.name'
            likeConditions = `ILIKE '%${filterValue}%'`
        }
    }

    if (filterBy === 'quantity' && filterValue && Number(filterValue)) {
        if (filterCompare === 'more') {
            whereConditions = 'WHERE item.quantity'
            likeConditions = `> ${Number(filterValue)}`
        }
        if (filterCompare === 'less') {
            whereConditions = 'WHERE item.quantity'
            likeConditions = `< ${Number(filterValue)}`
        }
        if (filterCompare === 'contains') {
            whereConditions = 'WHERE item.quantity'
            likeConditions = `ILIKE '%${Number(filterValue)}%'`
        }
        if (filterCompare === 'equal') {
            whereConditions = 'WHERE item.quantity'
            likeConditions = `= ${Number(filterValue)}`
        }
    }


    if (filterBy === 'distance' && filterValue && Number(filterValue)) {
        if (filterCompare === 'more') {
            whereConditions = 'WHERE item.distance'
            likeConditions = `> ${Number(filterValue)}`
        }
        if (filterCompare === 'less') {
            whereConditions = 'WHERE item.distance'
            likeConditions = `< ${Number(filterValue)}`
        }
        if (filterCompare === 'contains') {
            whereConditions = 'WHERE item.distance'
            likeConditions = `ILIKE '%${Number(filterValue)}%`
        }
        if (filterCompare === 'equal') {
            whereConditions = 'WHERE item.distance'
            likeConditions = `= ${Number(filterValue)}`
        }
    }

console.log(whereConditions + ' ' + likeConditions + orderConditions);
    if(!orderBy){return whereConditions + ' ' + likeConditions}

    return whereConditions + ' ' + likeConditions + orderConditions
}




class TasksService {

    async findItems({ filterBy, filterValue, filterCompare, currentPage, pageSize, orderBy, orderDir }) {
        const skip = (currentPage - 1) * pageSize
        const text = `SELECT "id", "name", "quantity", "distance", "date"
            FROM "public"."items" AS "item" ${whereConditions(filterBy, filterValue, filterCompare, orderBy, orderDir)} LIMIT ${pageSize} OFFSET ${skip}`
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

    async countItems({ filterBy, filterValue, filterCompare }) {
        const text = `SELECT count(*) AS "count" FROM "public"."items" AS "item" ${whereConditions(filterBy, filterValue, filterCompare)}`
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