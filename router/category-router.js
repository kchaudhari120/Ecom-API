const express = require('express')
const { 
    getCategories, 
    createCategory,
    getCategory,
    getProductByCategory 
} = require('../controller/categoty-controller')
const {adminAuthMiddleware} = require('../middlewares/user-auth-middleware')
const categoryRouter = express.Router()

//api/categories/
categoryRouter.get('/', getCategories)
categoryRouter.get('/:categoryId', getCategory)
categoryRouter.get('/:categoryId/products', getProductByCategory)

categoryRouter.post('/', adminAuthMiddleware, createCategory)




module.exports = {categoryRouter}