const express = require('express')
const { getUsers, saveUser, loginUser, updateUser} = require('../controller/user-controller')
const { userAuthMiddleware } = require('../middlewares/user-auth-middleware')
const userRouter = express.Router()
//api/user/


userRouter.get('/', getUsers)
userRouter.post('/', saveUser)
userRouter.put('/', userAuthMiddleware, updateUser)
userRouter.post('/login', loginUser)
module.exports = {userRouter}