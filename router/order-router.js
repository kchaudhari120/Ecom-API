const express = require('express')
const {userAuthMiddleware, adminAuthMiddleware} = require('../middlewares/user-auth-middleware')
const { getOrders, placeOrder} = require('../controller/order-controller')
const orderRouter = express.Router()
// api/orders/ 
orderRouter.get('', adminAuthMiddleware,getOrders)
orderRouter.post('', userAuthMiddleware ,placeOrder)

module.exports = { orderRouter }