const express = require('express')
const {userAuthMiddleware, adminAuthMiddleware} = require('../middlewares/user-auth-middleware')
const { getOrders, placeOrder, deleteOrder, updateOrder} = require('../controller/order-controller')
const orderRouter = express.Router()
// api/orders/ 
orderRouter.get('', adminAuthMiddleware,getOrders)
orderRouter.post('', userAuthMiddleware ,placeOrder)
orderRouter.delete('/:orderId', userAuthMiddleware ,deleteOrder)
orderRouter.put('/:orderId', adminAuthMiddleware ,updateOrder)


module.exports = { orderRouter }