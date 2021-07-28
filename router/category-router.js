const express = require('express')
const { 
    getCategories, 
    createCategory 
} = require('../controller/categoty-controller')
const {adminAuthMiddleware} = require('../middlewares/user-auth-middleware')
const categoryRouter = express.Router()

//api/categories/
categoryRouter.get('/', getCategories)
categoryRouter.post('/', adminAuthMiddleware, createCategory)




module.exports = {categoryRouter}