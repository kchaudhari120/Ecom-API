const express = require('express')
const { 
    getUsers,
    saveUser, 
    loginUser, 
    updateUser, 
    updateUserById,
    getOrdersById
} = require('../controller/user-controller')
const { userAuthMiddleware , adminAuthMiddleware} = require('../middlewares/user-auth-middleware')
const userRouter = express.Router()

//api/user/

userRouter.get('/', getUsers)
userRouter.post('/', saveUser)
userRouter.put('/', userAuthMiddleware, updateUser)
//api/user/:id
userRouter.put('/:user_id', adminAuthMiddleware, updateUserById)
//api/user/:id/orders
userRouter.get('/:user_id/orders', userAuthMiddleware, getOrdersById)
userRouter.post('/login', loginUser)
module.exports = { userRouter }