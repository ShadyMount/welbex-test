const { Op } = require("sequelize")

const items = require("../settings/db").items
const dbPool = require("../settings/db").pool


// const whereConditions = (sortBy, sortValue, sortCompare) => {
//     let conditions = {}
//     console.log('sortValue: ', sortValue);

//     if(sortBy === 'name'){
//         if(sortCompare === 'equal'){
//             conditions = {...conditions, 'name': {[Op.eq]: sortValue}}
//         }
//         if(sortCompare === 'contains'){
//             conditions = {...conditions, 'name': {[Op.substring]: sortValue}}
//         }
//     }
//     if(sortBy === 'quantity' && sortValue !== ''){
//         console.log('where:',sortCompare);
//         if(sortCompare === 'more'){
//             conditions = {...conditions, 'quantity': {[Op.gt]: sortValue}}
//         }
//         if(sortCompare === 'less'){
//             conditions = {...conditions, 'quantity': {[Op.lt]: sortValue}}
//         }
//         if(sortCompare === 'contains'){
//             conditions = {...conditions, 'quantity': {[Op.substring]: sortValue}}
//         }
//         if(sortCompare === 'equal'){
//             conditions = {...conditions, 'quantity': {[Op.eq]: sortValue}}
//         }
//     }
//     if(sortBy === 'distance' && sortValue !== ''){
//         if(sortCompare === 'more'){
//             conditions = {...conditions, 'distance': {[Op.gt]: sortValue}}
//         }
//         if(sortCompare === 'less'){
//             conditions = {...conditions, 'distance': {[Op.lt]: sortValue}}
//         }
//         if(sortCompare === 'contains'){
//             conditions = {...conditions, 'distance': {[Op.substring]: sortValue}}
//         }
//         if(sortCompare === 'equal'){
//             conditions = {...conditions, 'distance': {[Op.eq]: sortValue}}
//         }
//     }
//     return conditions
// }

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
            // console.log(itemsFromDb.rows)
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
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