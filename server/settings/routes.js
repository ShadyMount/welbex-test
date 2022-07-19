'use strict'



module.exports = (app) => {
    
    const itemsController = require('../controllers/itemsController')
    
    app.route('/api/items').get(itemsController.getItems)


 }