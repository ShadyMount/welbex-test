'use strict'

const response = require('../response')
const itemsService = require('../services/itemsService')


class tasksController {

    async getItems (req, res, next){
            const currentPage = Number(req.query.currentPage) || 1
            const pageSize = Number(req.query.pageSize) || 15 
            const sortBy = req.query?.sortBy
            const sortValue = Number(req.query?.sortValue) || req.query?.sortValue || ''
            const sortCompare = req.query?.sortCompare
            try {
                const items = await itemsService.findItems({sortBy, sortValue, sortCompare, currentPage, pageSize})
                const itemsAmount = await itemsService.countItems({sortBy, sortValue, sortCompare})     
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

}

module.exports = new tasksController()

