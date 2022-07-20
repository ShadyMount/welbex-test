'use strict'

const response = require('../response')
const itemsService = require('../services/itemsService')


class tasksController {

    async getItems (req, res, next){
            const currentPage = Number(req.query.page) || 1
            const pageSize = Number(req.query.pagesize) || 15 
            const sort = req.query?.sort
            const sortValue = req.query?.sortValue
            const sortDir = req.query?.sortDir
            try {
                const items = await itemsService.findItems({sort, sortValue, sortDir, currentPage, pageSize})
                const itemsAmount = await itemsService.countItems({sort, sortValue, sortDir})     
                response.status(200, {items, itemsAmount}, res)
            } catch (e) {
                next(e);
            }
    }

    async countItems (req, res, next){
        try {
            const sort = req.query?.sort
            const sortValue = req.query?.sortValue
            const sortDir = req.query?.sortDir
            const itemsAmount = await itemsService.countItems({sort, sortValue, sortDir})   
            response.status(200, itemsAmount, res)
        } catch (e) {
            next(e);
        }
    }

    // async add (req, res, next){
    //     try {
    //         await itemsService.addTask(req.body)
    //         response.status(200, {message: 'item added'}, res)
    //     } catch (e) {
    //         next(e);
    //     }
    // }

}

module.exports = new tasksController()

