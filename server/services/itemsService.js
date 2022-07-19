const items = require("../settings/db").items


class TasksService {

    async findItems({ sort = 'all', currentPage, pageSize }) {
        console.log(items);
        const skip = (currentPage - 1) * pageSize
        const itemsFromDb = await items.findAll({
            // where: whereConditions(sort),
            offset: skip,
            limit: pageSize
        })

        return itemsFromDb
    }

        async countItems() {
                const count = await items.count()
                return count
    
        }

        async addItem(item) {
            await items.create(item)
        }


}

module.exports = new TasksService()