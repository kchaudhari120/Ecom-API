const express = require('express')
const { getProducts, createProduct } = require('../controller/product-controller')
const { adminAuthMiddleware } = require('../middlewares/user-auth-middleware')
const productRouter = express.Router()

productRouter.get('', getProducts)
productRouter.post('', adminAuthMiddleware,createProduct)


module.exports = { productRouter }