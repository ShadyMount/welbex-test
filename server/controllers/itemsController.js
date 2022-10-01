'use strict'

const response = require('../response')
const itemsService = require('../services/itemsService')


class tasksController {

    async getItems (req, res, next){
            const currentPage = Number(req.query.currentPage) || 1
            const pageSize = Number(req.query.pageSize) || 15 
            const filterBy = req.query?.filterBy
            const filterValue = Number(req.query?.filterValue) || req.query?.filterValue || ''
            const filterCompare = req.query?.filterCompare
            const orderBy = req.query?.orderBy || 'id'
            const orderDir = req.query?.orderDir || 'ASC' // DESC
            try {
                const items = await itemsService.findItems({filterBy, filterValue, filterCompare, currentPage, pageSize, orderBy, orderDir})
                const itemsAmount = await itemsService.countItems({filterBy, filterValue, filterCompare})     
                response.status(200, {items, itemsAmount}, res)
            } catch (e) {
                next(e);
            }
    }

    async countItems (req, res, next){
        try {
            const sort = req.query?.sort
            const filterValue = req.query?.filterValue
            const sortDir = req.query?.sortDir
            const itemsAmount = await itemsService.countItems({sort, filterValue, sortDir})   
            response.status(200, itemsAmount, res)
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new tasksController()

