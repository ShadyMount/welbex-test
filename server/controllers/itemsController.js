'use strict'

const response = require('../response')
const itemsService = require('../services/itemsService')


class tasksController {


    async getItems (req, res, next){
            console.log('controller req: ', req.query);
            const currentPage = Number(req.query.page) || 1
            const pageSize = Number(req.query.pagesize) || 15 
            const sort = req.query?.sort
            try {
                const items = await itemsService.findItems({sort, currentPage, pageSize})  
                response.status(200, items, res)
            } catch (e) {
                next(e);
            }
            
    }

    // async countTasks (req, res, next){
    //     try {
    //         const status = req.query?.status
    //         const master = req.query?.master
    //         const date = req.query?.date 
    //         const totalTasksCount = await TasksService.countTasks(status, date, master)   
    //         console.log('totalTasksCount: ', totalTasksCount);
    //         response.status(200, totalTasksCount, res)
    //     } catch (e) {
    //         next(e);
    //     }
    // }


    // async sumOfTasksByDateRange(req, res, next){
    //     try {
    //         const master = req.query.master
    //         const startdate = req.query.startdate
    //         const finishdate = req.query.finishdate
    //         const sum = await TasksService.sumOfTasksByDateRange(master, startdate, finishdate)

    //         response.status(200, sum, res)
    //     } catch (e) {
    //         next(e)
    //     }
    // }

    // async add (req, res, next){
    //     try {
    //         await TasksService.addTask(req.body)
    //         console.log('req.body: ', req.body);
    //         await longpoll.publish("/poll", { message: "task added" })
    //         response.status(200, {message: 'task added'}, res)
    //     } catch (e) {
    //         next(e);
    //     }
    // }



    // async update (req, res, next){

    //     try {
    //         console.log('BODY: ', req.body);
    //         await TasksService.updateTask(req.body)
    //         await longpoll.publish("/poll", { message: `task ${req.body.id} updated` })
    //         response.status(200, {message: `task ${req.body.id} updated`}, res)
    //     } catch (e) {
    //         next(e);
    //     }

    // }

    // async updateTaskMaster (req, res, next){

    //     try {
    //         await TasksService.updateTaskMaster(req.query.master, req.query.masterId)
    //         await longpoll.publish("/poll", { message: `task ${req.body.id} updated` })
    //         response.status(200, {message: `task updated`}, res)
    //     } catch (e) {
    //         next(e);
    //     }

    // }

    

}

module.exports = new tasksController()

